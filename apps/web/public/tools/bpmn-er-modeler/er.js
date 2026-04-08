// === ER DIAGRAM MODULE ===
// DSL parser, SVG renderer, interaction, export, file operations

// --- Default ER DSL ---
var DEFAULT_ER_DSL='Table users {\n  id int [pk]\n  username varchar\n  email varchar [unique]\n  password_hash varchar [not null]\n  role_id int [ref: > roles.id]\n  created_at timestamp\n}\n\nTable roles {\n  id int [pk]\n  name varchar [unique]\n  description text\n}\n\nTable posts {\n  id int [pk]\n  title varchar [not null]\n  body text\n  user_id int [ref: > users.id]\n  category_id int [ref: > categories.id]\n  published boolean [default: false]\n  created_at timestamp\n}\n\nTable categories {\n  id int [pk]\n  name varchar [unique]\n  parent_id int\n}\n\nTable comments {\n  id int [pk]\n  text text [not null]\n  post_id int [ref: > posts.id]\n  user_id int [ref: > users.id]\n  created_at timestamp\n}\n\nRef: categories.parent_id > categories.id';

// --- ER DSL Parser ---
function parseErDsl(text){
  var tables=[],refs=[],errors=[];
  var lines=text.split('\n');
  var currentTable=null;
  for(var i=0;i<lines.length;i++){
    var line=lines[i].trim();
    if(!line||line.startsWith('//')||line.startsWith('#'))continue;

    // Table definition start
    var tm=line.match(/^Table\s+(\w+)\s*\{?\s*$/i);
    if(tm){
      currentTable={name:tm[1],fields:[],x:0,y:0};
      tables.push(currentTable);
      continue;
    }

    // Table close
    if(line==='}'){currentTable=null;continue;}

    // Field inside table
    if(currentTable&&line!=='{'){
      var fm=line.match(/^(\w+)\s+(\w[\w()]*(?:\(\d+(?:,\d+)?\))?)\s*(.*)$/);
      if(fm){
        var attrs=fm[3]||'';
        var isPk=false,isUnique=false,isNotNull=false,defaultVal=null,note=null,inlineRef=null;
        var attrMatch=attrs.match(/\[(.*?)\]/g);
        if(attrMatch){
          attrMatch.forEach(function(a){
            var inner=a.slice(1,-1).trim();
            if(inner.toLowerCase()==='pk')isPk=true;
            else if(inner.toLowerCase()==='unique')isUnique=true;
            else if(inner.toLowerCase()==='not null')isNotNull=true;
            else if(inner.toLowerCase().startsWith('default:')){defaultVal=inner.split(':')[1].trim();}
            else if(inner.toLowerCase().startsWith('note:')){note=inner.split(':').slice(1).join(':').trim().replace(/^['"]|['"]$/g,'');}
            else if(inner.toLowerCase().startsWith('ref:')){
              var refPart=inner.substring(4).trim();
              var rm=refPart.match(/^([<>\-]+)\s+(\w+)\.(\w+)$/);
              if(rm)inlineRef={type:rm[1],table:rm[2],field:rm[3]};
            }
          });
        }
        currentTable.fields.push({name:fm[1],type:fm[2],pk:isPk,unique:isUnique,notNull:isNotNull,default:defaultVal,note:note});
        if(inlineRef){
          refs.push({from:currentTable.name,fromField:fm[1],to:inlineRef.table,toField:inlineRef.field,type:inlineRef.type});
        }
      }else{
        errors.push('Строка '+(i+1)+': не распознано «'+line+'»');
      }
      continue;
    }

    // Standalone Ref
    var rm=line.match(/^Ref\s*:\s*(\w+)\.(\w+)\s*([<>\-]+)\s*(\w+)\.(\w+)\s*$/i);
    if(rm){
      refs.push({from:rm[1],fromField:rm[2],to:rm[4],toField:rm[5],type:rm[3]});
      continue;
    }

    if(line!=='{'&&!currentTable){
      errors.push('Строка '+(i+1)+': не распознано «'+line+'»');
    }
  }
  return {tables:tables,refs:refs,errors:errors};
}

// --- ER SVG Renderer ---
var erPan={x:40,y:40},erZoom=1,erDragging=false,erDragStart={x:0,y:0};
var ER_TABLE_W=220,ER_HEADER_H=32,ER_ROW_H=26,ER_PAD=20,ER_COLS=3;

function layoutTables(tables){
  var col=0,row=0,maxH=0;
  tables.forEach(function(t){
    var h=ER_HEADER_H+t.fields.length*ER_ROW_H+4;
    t.w=ER_TABLE_W;
    t.h=h;
    if(erTablePositions[t.name]){
      t.x=erTablePositions[t.name].x;
      t.y=erTablePositions[t.name].y;
    }else{
      t.x=col*(ER_TABLE_W+ER_PAD*3);
      t.y=row;
      if(h>maxH)maxH=h;
      col++;
      if(col>=ER_COLS){col=0;row+=maxH+ER_PAD*2;maxH=0;}
    }
  });
}

function renderErSvg(parsed){
  var svg=document.getElementById('erCanvas');
  var tables=parsed.tables,refs=parsed.refs;
  layoutTables(tables);

  var isDark=document.documentElement.getAttribute('data-theme')==='dark';
  var bgCol=isDark?'#1e2130':'#ffffff';
  var headerBg=isDark?'#2e3450':'#4a6cf7';
  var headerText='#ffffff';
  var rowBg=isDark?'#1a1d27':'#f8f9fb';
  var rowAlt=isDark?'#1f2233':'#f1f3f8';
  var borderCol=isDark?'#2e3450':'#dce0ea';
  var textCol=isDark?'#c8cce0':'#333';
  var typeCol=isDark?'#6c8cff':'#4a6cf7';
  var pkCol=isDark?'#ffc857':'#e6a817';
  var refCol=isDark?'#6c8cff':'#4a6cf7';

  var html='<defs><filter id="erShadow" x="-4%" y="-4%" width="108%" height="116%"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="'+(isDark?'0.4':'0.08')+'"/></filter></defs>';
  html+='<g transform="translate('+erPan.x+','+erPan.y+') scale('+erZoom+')">';

  // Tables
  var tablesHtml='';
  tables.forEach(function(t){
    tablesHtml+='<g class="er-table" data-name="'+t.name+'" style="cursor:move">';
    tablesHtml+='<rect x="'+t.x+'" y="'+t.y+'" width="'+t.w+'" height="'+t.h+'" rx="8" fill="'+rowBg+'" stroke="'+borderCol+'" stroke-width="1.5" filter="url(#erShadow)"/>';
    // Header
    tablesHtml+='<rect x="'+t.x+'" y="'+t.y+'" width="'+t.w+'" height="'+ER_HEADER_H+'" rx="8" fill="'+headerBg+'"/>';
    tablesHtml+='<rect x="'+t.x+'" y="'+(t.y+ER_HEADER_H-8)+'" width="'+t.w+'" height="8" fill="'+headerBg+'"/>';
    tablesHtml+='<text x="'+(t.x+t.w/2)+'" y="'+(t.y+21)+'" text-anchor="middle" fill="'+headerText+'" font-weight="700" font-size="13" font-family="DM Sans,sans-serif">'+escHtml(t.name)+'</text>';
    // Fields
    t.fields.forEach(function(f,fi){
      var fy=t.y+ER_HEADER_H+fi*ER_ROW_H;
      var bg=fi%2===0?rowBg:rowAlt;
      tablesHtml+='<rect x="'+t.x+'" y="'+fy+'" width="'+t.w+'" height="'+ER_ROW_H+'" fill="'+bg+'"/>';
      var label='';
      if(f.pk)label='🔑 ';
      else if(f.unique)label='◆ ';
      tablesHtml+='<text x="'+(t.x+12)+'" y="'+(fy+17)+'" fill="'+textCol+'" font-size="12" font-family="JetBrains Mono,monospace">'+label+escHtml(f.name)+'</text>';
      tablesHtml+='<text x="'+(t.x+t.w-12)+'" y="'+(fy+17)+'" text-anchor="end" fill="'+typeCol+'" font-size="11" font-family="JetBrains Mono,monospace">'+escHtml(f.type)+'</text>';
    });
    tablesHtml+='<rect x="'+t.x+'" y="'+(t.y+t.h-8)+'" width="'+t.w+'" height="8" rx="0" fill="'+(t.fields.length%2===0?rowBg:rowAlt)+'"/>';
    tablesHtml+='<rect x="'+t.x+'" y="'+(t.y+t.h-8)+'" width="'+t.w+'" height="8" rx="8" fill="transparent" stroke="'+borderCol+'" stroke-width="1.5"/>';
    tablesHtml+='</g>';
  });

  // Refs (connections)
  var tableMap={};
  tables.forEach(function(t){tableMap[t.name]=t;});

  var refsHtml='';
  refs.forEach(function(r){
    var fromT=tableMap[r.from],toT=tableMap[r.to];
    if(!fromT||!toT)return;
    var fromFi=-1,toFi=-1;
    var broken=false;
    fromT.fields.forEach(function(f,i){if(f.name===r.fromField)fromFi=i;});
    toT.fields.forEach(function(f,i){if(f.name===r.toField)toFi=i;});
    if(fromFi<0){fromFi=0;broken=true;parsed.errors.push('Поле «'+r.fromField+'» не найдено в таблице «'+r.from+'»');}
    if(toFi<0){toFi=0;broken=true;parsed.errors.push('Поле «'+r.toField+'» не найдено в таблице «'+r.to+'»');}
    var brokenStroke=broken?'stroke="#e74c3c" stroke-dasharray="4,3"':'stroke="'+refCol+'"';
    var brokenDot=broken?'#e74c3c':refCol;
    var fy=fromT.y+ER_HEADER_H+fromFi*ER_ROW_H+ER_ROW_H/2;
    var ty=toT.y+ER_HEADER_H+toFi*ER_ROW_H+ER_ROW_H/2;

    // Self-reference (same table)
    if(fromT===toT){
      var fx2=fromT.x+fromT.w;
      var loopW=50;
      refsHtml+='<path d="M'+fx2+' '+fy+' C'+(fx2+loopW)+' '+fy+' '+(fx2+loopW)+' '+ty+' '+fx2+' '+ty+'" fill="none" '+brokenStroke+' stroke-width="2"/>';
      var label=r.type==='>'?'N:1':r.type==='<'?'1:N':r.type==='-'?'1:1':r.type==='<>'?'N:N':'';
      if(label) refsHtml+='<text x="'+(fx2+loopW+4)+'" y="'+((fy+ty)/2+4)+'" fill="'+brokenDot+'" font-size="10" font-weight="600" font-family="JetBrains Mono,monospace">'+label+'</text>';
      refsHtml+='<circle cx="'+fx2+'" cy="'+fy+'" r="3" fill="'+brokenDot+'"/>';
      refsHtml+='<circle cx="'+fx2+'" cy="'+ty+'" r="3" fill="'+brokenDot+'"/>';
      return;
    }

    var fx,tx;
    if(fromT.x+fromT.w+10<toT.x){
      fx=fromT.x+fromT.w; tx=toT.x;
    }else if(toT.x+toT.w+10<fromT.x){
      fx=fromT.x; tx=toT.x+toT.w;
    }else{
      fx=fromT.x+fromT.w; tx=toT.x+toT.w;
    }
    var dx=Math.abs(fx-tx);
    var cpOffset=Math.max(40,dx*0.4);
    var cpfx=fx+(fx<tx?cpOffset:-cpOffset);
    var cptx=tx+(tx<fx?cpOffset:-cpOffset);
    var dashAttr=broken?'':(r.type==='<>'?' stroke-dasharray="6,3"':'');
    refsHtml+='<path d="M'+fx+' '+fy+' C'+cpfx+' '+fy+' '+cptx+' '+ty+' '+tx+' '+ty+'" fill="none" '+brokenStroke+' stroke-width="2"'+dashAttr+'/>';
    var label=r.type==='>'?'N:1':r.type==='<'?'1:N':r.type==='-'?'1:1':r.type==='<>'?'N:N':'';
    if(label){
      var lx=(fx+tx)/2,ly=(fy+ty)/2-8;
      refsHtml+='<text x="'+lx+'" y="'+ly+'" text-anchor="middle" fill="'+brokenDot+'" font-size="10" font-weight="600" font-family="JetBrains Mono,monospace">'+label+'</text>';
    }
    refsHtml+='<circle cx="'+fx+'" cy="'+fy+'" r="3" fill="'+brokenDot+'"/>';
    refsHtml+='<circle cx="'+tx+'" cy="'+ty+'" r="3" fill="'+brokenDot+'"/>';
  });

  html+=refsHtml+tablesHtml;
  html+='</g>';
  svg.innerHTML=html;
}

var erRenderTimer=null;
function renderErDiagram(){
  if(erRenderTimer)clearTimeout(erRenderTimer);
  erRenderTimer=setTimeout(function(){
    renderErDiagramImmediate();
  },150);
}

// --- Syntax Highlighting ---
function highlightErDsl(text){
  var lines=text.split('\n');
  return lines.map(function(line){
    if(line.trim().startsWith('//')||line.trim().startsWith('#'))
      return '<span class="hl-comment">'+escHtml(line)+'</span>';
    var m=line.match(/^(\s*)(Table)(\s+)(\w+)(.*)/i);
    if(m) return escHtml(m[1])+'<span class="hl-kw">'+escHtml(m[2])+'</span>'+escHtml(m[3])+'<span class="hl-tname">'+escHtml(m[4])+'</span><span class="hl-punct">'+escHtml(m[5])+'</span>';
    var rm=line.match(/^(\s*)(Ref)(\s*:\s*)(\w+\.\w+)(\s*[<>\-]+\s*)(\w+\.\w+)(.*)/i);
    if(rm) return escHtml(rm[1])+'<span class="hl-kw">'+escHtml(rm[2])+'</span><span class="hl-punct">'+escHtml(rm[3])+'</span><span class="hl-ref">'+escHtml(rm[4])+'</span><span class="hl-punct">'+escHtml(rm[5])+'</span><span class="hl-ref">'+escHtml(rm[6])+'</span>'+escHtml(rm[7]);
    if(line.trim()==='}') return '<span class="hl-punct">'+escHtml(line)+'</span>';
    var fm=line.match(/^(\s+)(\w+)(\s+)(\w[\w()]*(?:\(\d+(?:,\d+)?\))?)(.*)$/);
    if(fm){
      var rest=fm[5];
      rest=rest.replace(/\[([^\]]*)\]/g,function(match,inner){
        return '<span class="hl-bracket">[</span><span class="hl-attr">'+escHtml(inner)+'</span><span class="hl-bracket">]</span>';
      });
      return escHtml(fm[1])+'<span class="hl-field">'+escHtml(fm[2])+'</span>'+escHtml(fm[3])+'<span class="hl-type">'+escHtml(fm[4])+'</span>'+rest;
    }
    return escHtml(line);
  }).join('\n');
}

function updateErHighlight(){
  var text=document.getElementById('erDslEditor').value;
  document.getElementById('erHighlight').innerHTML=highlightErDsl(text)+'\n';
  var lines=text.split('\n');
  var numsHtml='';
  for(var i=1;i<=lines.length;i++) numsHtml+=i+'\n';
  var ln=document.getElementById('erLineNumbers');
  ln.textContent=numsHtml;
  var ed=document.getElementById('erDslEditor');
  ln.style.paddingTop=(14-ed.scrollTop)+'px';
}

// --- ER Canvas Interaction (pan, zoom, table drag) ---
var erTablePositions={};
var erDragTable=null,erDragTableStart={x:0,y:0},erDragMouseStart={x:0,y:0};
var erLastParsed=null;

function getErTablePosition(tName){
  if(erTablePositions[tName])return erTablePositions[tName];
  if(erLastParsed){
    var t=erLastParsed.tables.find(function(tt){return tt.name===tName});
    if(t)return{x:t.x,y:t.y};
  }
  return{x:0,y:0};
}

function renderErDiagramImmediate(){
  var text=document.getElementById('erDslEditor').value;
  var parsed=parseErDsl(text);
  if(!parsed.errors.length){
    var validNames={};
    parsed.tables.forEach(function(t){validNames[t.name]=true;});
    Object.keys(erTablePositions).forEach(function(k){
      if(!validNames[k])delete erTablePositions[k];
    });
  }
  layoutTables(parsed.tables);
  erLastParsed=parsed;
  renderErSvg(parsed);
  document.getElementById('erStatus').textContent=parsed.tables.length+' таблиц, '+parsed.refs.length+' связей';
  var errEl=document.getElementById('erError');
  if(parsed.errors.length){errEl.textContent=parsed.errors.length>1?(parsed.errors.length+' ошибок:\n'+parsed.errors.join('\n')):parsed.errors[0];errEl.className='er-error';}
  else{errEl.textContent='';errEl.className='';}
}

// --- ER Canvas Event Listeners ---
function initErCanvasEvents(){
  var svg=document.getElementById('erCanvas');
  var pane=document.getElementById('erPreviewPane');
  var panDragging=false,sx=0,sy=0;

  function findTableGroup(target){
    var el=target;
    while(el&&el!==svg&&el.tagName!=='svg'){
      if(el.getAttribute&&el.getAttribute('data-name')&&el.classList&&el.classList.contains('er-table'))return el;
      el=el.parentNode;
    }
    return null;
  }

  svg.addEventListener('mousedown',function(e){
    var tableG=findTableGroup(e.target);
    if(tableG){
      var tName=tableG.getAttribute('data-name');
      if(tName){
        if(erLastParsed){
          erLastParsed.tables.forEach(function(t){
            if(!erTablePositions[t.name]){
              erTablePositions[t.name]={x:t.x,y:t.y};
            }
          });
        }
        var pos=getErTablePosition(tName);
        erDragTable=tName;
        erDragTableStart={x:pos.x,y:pos.y};
        erDragMouseStart={x:e.clientX,y:e.clientY};
        e.preventDefault();e.stopPropagation();
        svg.style.cursor='grabbing';
        return;
      }
    }
    panDragging=true;sx=e.clientX-erPan.x;sy=e.clientY-erPan.y;
  });

  window.addEventListener('mousemove',function(e){
    if(currentMode!=='er')return;
    if(erDragTable){
      var dx=(e.clientX-erDragMouseStart.x)/erZoom;
      var dy=(e.clientY-erDragMouseStart.y)/erZoom;
      erTablePositions[erDragTable]={x:erDragTableStart.x+dx,y:erDragTableStart.y+dy};
      renderErDiagramImmediate();
      return;
    }
    if(!panDragging)return;
    erPan.x=e.clientX-sx;erPan.y=e.clientY-sy;
    renderErDiagramImmediate();
  });

  window.addEventListener('mouseup',function(){
    if(erDragTable){
      erDragTable=null;
      document.getElementById('erCanvas').style.cursor='';
    }
    panDragging=false;
  });

  pane.addEventListener('wheel',function(e){
    e.preventDefault();
    var delta=e.deltaY>0?-0.1:0.1;
    erZoom=Math.max(0.2,Math.min(3,erZoom+delta));
    renderErDiagramImmediate();
  },{passive:false});
}

// --- ER Resize Handle ---
function initErResizeHandle(){
  var handle=document.getElementById('erResizeHandle');
  var pane=document.getElementById('erEditorPane');
  var dragging=false,startX=0,startW=0;
  handle.addEventListener('mousedown',function(e){
    dragging=true;startX=e.clientX;startW=pane.offsetWidth;handle.classList.add('dragging');
    e.preventDefault();
  });
  window.addEventListener('mousemove',function(e){
    if(!dragging)return;
    var w=Math.max(200,Math.min(800,startW+(e.clientX-startX)));
    pane.style.width=w+'px';
  });
  window.addEventListener('mouseup',function(){dragging=false;handle.classList.remove('dragging');});
}

// --- ER DSL Editor Events ---
function initErEditorEvents(){
  var editor=document.getElementById('erDslEditor');

  editor.addEventListener('input',function(){markModified();renderErDiagram();updateErHighlight();});

  editor.addEventListener('keydown',function(e){
    if(e.key==='Tab'){
      e.preventDefault();
      var s=this.selectionStart,end=this.selectionEnd;
      this.value=this.value.substring(0,s)+'  '+this.value.substring(end);
      this.selectionStart=this.selectionEnd=s+2;
      markModified();renderErDiagram();updateErHighlight();
    }
  });

  editor.addEventListener('scroll',function(){
    var hl=document.getElementById('erHighlight');
    var ln=document.getElementById('erLineNumbers');
    hl.style.top=(-this.scrollTop)+'px';
    hl.style.left=(-this.scrollLeft)+'px';
    ln.style.paddingTop=(14-this.scrollTop)+'px';
  });
}

// --- ER Controls ---
function toggleErHelp(){document.getElementById('erHelp').classList.toggle('open')}

function toggleErExportMenu(){var m=document.getElementById('erExportMenu');m.classList.toggle('open')}
function closeErExportMenu(){document.getElementById('erExportMenu').classList.remove('open')}

function erResetLayout(){
  erTablePositions={};
  erPan={x:40,y:40};
  erZoom=1;
  renderErDiagramImmediate();
  toast('✅','Позиции сброшены');
}

function erZoomFit(){
  if(!erLastParsed||!erLastParsed.tables.length)return;
  var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  erLastParsed.tables.forEach(function(t){
    if(t.x<minX)minX=t.x;
    if(t.y<minY)minY=t.y;
    if(t.x+t.w>maxX)maxX=t.x+t.w;
    if(t.y+t.h>maxY)maxY=t.y+t.h;
  });
  var pane=document.getElementById('erPreviewPane');
  var pw=pane.clientWidth,ph=pane.clientHeight;
  var dw=maxX-minX+80,dh=maxY-minY+80;
  erZoom=Math.min(pw/dw,ph/dh,2);
  erPan.x=-minX*erZoom+40;
  erPan.y=-minY*erZoom+40;
  renderErDiagramImmediate();
}

// --- ER Tab State Save/Restore ---
function saveErTabState(tab){
  var ed=document.getElementById('erDslEditor');
  tab.dsl=ed.value;
  tab.erState={
    pan:{x:erPan.x,y:erPan.y},
    zoom:erZoom,
    tablePositions:JSON.parse(JSON.stringify(erTablePositions)),
    scrollTop:ed.scrollTop
  };
}

function restoreErTabState(tab){
  var ed=document.getElementById('erDslEditor');
  ed.value=tab.dsl||'';
  erPan=tab.erState?{x:tab.erState.pan.x,y:tab.erState.pan.y}:{x:40,y:40};
  erZoom=tab.erState?tab.erState.zoom:1;
  erTablePositions=tab.erState?JSON.parse(JSON.stringify(tab.erState.tablePositions)):{};
  erLastParsed=null;
  renderErDiagramImmediate();
  updateErHighlight();
  ed.scrollTop=tab.erState?tab.erState.scrollTop:0;
}

// --- ER Tab Save ---
async function saveErTab(tab){
  if(!tab)tab=getActiveTab();
  if(!tab||tab.type!=='er')return;
  saveErTabState(tab);
  try{
    if(tab.fileHandle){
      await writeToFileHandle(tab.fileHandle,tab.dsl);
      tab.modified=false;renderTabs();
      if(typeof updateProjectModified==='function')updateProjectModified();
      toast('💾','Сохранено в «'+tab.name+'»');
    }else{
      await saveErAsDialog(tab);
    }
  }catch(e){
    if(e.name==='AbortError')return;
    console.error(e);toast('❌','Ошибка сохранения');
  }
}

async function saveErAsDialog(tab){
  if(!tab)tab=getActiveTab();
  if(!tab||tab.type!=='er')return;
  saveErTabState(tab);
  try{
    if(window.showSaveFilePicker){
      var fh=await window.showSaveFilePicker({
        suggestedName:tab.name,
        types:[{description:'ER DSL',accept:{'text/plain':['.erdsl']}}]
      });
      await writeToFileHandle(fh,tab.dsl);
      tab.fileHandle=fh;
      tab.name=fh.name;
      tab.modified=false;renderTabs();
      if(typeof updateProjectModified==='function')updateProjectModified();
      toast('💾','Сохранено как «'+fh.name+'»');
    }else{
      download(tab.dsl,tab.name,'text/plain');
      tab.modified=false;renderTabs();
      toast('💾','Файл скачан');
    }
  }catch(e){
    if(e.name==='AbortError')return;
    console.error(e);toast('❌','Ошибка сохранения');
  }
}

// --- ER File Operations ---
// erFileHandle, erModified, erProjectIndex, erProjectFilePath — now in tab object

function erSaveDsl(){
  // Deprecated — delegates to new tab-based save
  var tab=typeof getActiveTab==='function'?getActiveTab():null;
  if(tab&&tab.type==='er'){saveErTab(tab);return;}
  // Fallback for standalone mode
  var text=document.getElementById('erDslEditor').value;
  if(window.showSaveFilePicker){
    (async function(){
      try{
        var opts={types:[{description:'ER DSL',accept:{'text/plain':['.erdsl']}}]};
        var fh=await window.showSaveFilePicker(opts);
        await writeToFileHandle(fh,text);
        toast('✅','ER-диаграмма сохранена');
      }catch(e){if(e.name!=='AbortError')toast('❌','Ошибка сохранения');}
    })();
  }else{
    download(text,'diagram.erdsl','text/plain');
    toast('✅','ER-диаграмма скачана');
  }
}

function erOpenDsl(){
  if(window.showOpenFilePicker){
    (async function(){
      try{
        var opts={types:[{description:'ER DSL',accept:{'text/plain':['.erdsl','.txt','.sql']}}]};
        var [fh]=await window.showOpenFilePicker(opts);
        var file=await fh.getFile();
        var text=await file.text();
        await createNewTab(file.name,text,fh,'er');
        toast('✅','Файл загружен: '+file.name);
      }catch(e){if(e.name!=='AbortError')toast('❌','Ошибка открытия');}
    })();
  }else{
    document.getElementById('er-file-input').click();
  }
}

function initErFileInput(){
  document.getElementById('er-file-input').addEventListener('change',function(e){
    var file=e.target.files[0];
    if(!file)return;
    var reader=new FileReader();
    reader.onload=function(){
      createNewTab(file.name,reader.result,null,'er');
      toast('✅','Файл загружен: '+file.name);
    };
    reader.readAsText(file);
    e.target.value='';
  });
}

// --- ER Export ---
function erGetSvgContent(){
  var parsed=erLastParsed;
  if(!parsed)return null;
  var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  parsed.tables.forEach(function(t){
    if(t.x<minX)minX=t.x;
    if(t.y<minY)minY=t.y;
    if(t.x+t.w>maxX)maxX=t.x+t.w;
    if(t.y+t.h>maxY)maxY=t.y+t.h;
  });
  var pad=60;
  minX-=pad;minY-=pad;maxX+=pad;maxY+=pad;
  var w=maxX-minX,h=maxY-minY;
  var svgEl=document.getElementById('erCanvas');
  var inner=svgEl.innerHTML;
  inner=inner.replace(/transform="translate\([^)]+\)\s*scale\([^)]+\)"/,'transform="translate('+(-minX)+','+(-minY)+')"');
  var isDark=document.documentElement.getAttribute('data-theme')==='dark';
  var bgColor=isDark?'#0f1117':'#f5f6f8';
  var svgStr='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'">';
  svgStr+='<rect width="'+w+'" height="'+h+'" fill="'+bgColor+'"/>';
  svgStr+=inner;
  svgStr+='</svg>';
  return{svg:svgStr,width:w,height:h};
}

function erExportSVG(){
  var result=erGetSvgContent();
  if(!result)return toast('❌','Нет диаграммы');
  var blob=new Blob([result.svg],{type:'image/svg+xml'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='er-diagram.svg';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('✅','SVG экспортирован');
}

function erExportPNG(scale){
  scale=scale||2;
  var result=erGetSvgContent();
  if(!result)return toast('❌','Нет диаграммы');
  var canvas=document.createElement('canvas');
  canvas.width=result.width*scale;
  canvas.height=result.height*scale;
  var ctx=canvas.getContext('2d');
  var img=new Image();
  img.onload=function(){
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    canvas.toBlob(function(blob){
      var a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download='er-diagram'+(scale>1?'@'+scale+'x':'')+'.png';
      a.click();
      URL.revokeObjectURL(a.href);
      toast('✅','PNG экспортирован');
    },'image/png');
  };
  img.onerror=function(){toast('❌','Ошибка рендера PNG');};
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(result.svg);
}

function erExportPDF(){
  var result=erGetSvgContent();
  if(!result)return toast('❌','Нет диаграммы');
  var win=window.open('','_blank');
  if(!win)return toast('❌','Popup заблокирован');
  var pdfTitle=(typeof getModelerLocale==='function'&&getModelerLocale()!=='ru')?'ER Diagram — PDF':'ER-диаграмма — PDF';
  win.document.write('<!DOCTYPE html><html><head><title>'+pdfTitle+'</title><style>@page{size:landscape;margin:10mm}body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh}</style></head><body>');
  win.document.write(result.svg);
  win.document.write('</body></html>');
  win.document.close();
  setTimeout(function(){win.print();},400);
  toast('✅','PDF: используйте печать');
}

// --- ER Initialization ---
function initEr(){
  initErCanvasEvents();
  initErResizeHandle();
  initErEditorEvents();
  initErFileInput();
  // Default DSL content comes from createNewTab via DEFAULT_ER_DSL
}
