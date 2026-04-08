// === BPMN MODULE ===
// Modeler instance, tabs, file I/O, palette, properties, clipboard, events

// --- Default BPMN XML ---
function getDefaultBpmnXml(){
  var labels=typeof getDefaultBpmnLabels==='function'?getDefaultBpmnLabels():{
    start:'Начало',
    task:'Задача 1',
    gateway:'Условие?',
    optionA:'Вариант A',
    optionB:'Вариант B',
    end:'Конец',
    yes:'Да',
    no:'Нет'
  };

  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">\n'
    + '  <process id="Process_1" isExecutable="false">\n'
    + '    <startEvent id="StartEvent_1" name="' + labels.start + '"><outgoing>Flow_1</outgoing></startEvent>\n'
    + '    <task id="Task_1" name="' + labels.task + '"><incoming>Flow_1</incoming><outgoing>Flow_2</outgoing></task>\n'
    + '    <exclusiveGateway id="Gateway_1" name="' + labels.gateway + '"><incoming>Flow_2</incoming><outgoing>Flow_3</outgoing><outgoing>Flow_4</outgoing></exclusiveGateway>\n'
    + '    <task id="Task_2" name="' + labels.optionA + '"><incoming>Flow_3</incoming><outgoing>Flow_5</outgoing></task>\n'
    + '    <task id="Task_3" name="' + labels.optionB + '"><incoming>Flow_4</incoming><outgoing>Flow_6</outgoing></task>\n'
    + '    <endEvent id="EndEvent_1" name="' + labels.end + '"><incoming>Flow_5</incoming><incoming>Flow_6</incoming></endEvent>\n'
    + '    <sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>\n'
    + '    <sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Gateway_1"/>\n'
    + '    <sequenceFlow id="Flow_3" name="' + labels.yes + '" sourceRef="Gateway_1" targetRef="Task_2"/>\n'
    + '    <sequenceFlow id="Flow_4" name="' + labels.no + '" sourceRef="Gateway_1" targetRef="Task_3"/>\n'
    + '    <sequenceFlow id="Flow_5" sourceRef="Task_2" targetRef="EndEvent_1"/>\n'
    + '    <sequenceFlow id="Flow_6" sourceRef="Task_3" targetRef="EndEvent_1"/>\n'
    + '  </process>\n'
    + '  <bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n'
    + '    <bpmndi:BPMNShape id="S1_di" bpmnElement="StartEvent_1"><dc:Bounds x="180" y="200" width="36" height="36"/></bpmndi:BPMNShape>\n'
    + '    <bpmndi:BPMNShape id="T1_di" bpmnElement="Task_1"><dc:Bounds x="280" y="178" width="100" height="80"/></bpmndi:BPMNShape>\n'
    + '    <bpmndi:BPMNShape id="G1_di" bpmnElement="Gateway_1" isMarkerVisible="true"><dc:Bounds x="445" y="193" width="50" height="50"/></bpmndi:BPMNShape>\n'
    + '    <bpmndi:BPMNShape id="T2_di" bpmnElement="Task_2"><dc:Bounds x="560" y="100" width="100" height="80"/></bpmndi:BPMNShape>\n'
    + '    <bpmndi:BPMNShape id="T3_di" bpmnElement="Task_3"><dc:Bounds x="560" y="260" width="100" height="80"/></bpmndi:BPMNShape>\n'
    + '    <bpmndi:BPMNShape id="E1_di" bpmnElement="EndEvent_1"><dc:Bounds x="732" y="200" width="36" height="36"/></bpmndi:BPMNShape>\n'
    + '    <bpmndi:BPMNEdge id="F1_di" bpmnElement="Flow_1"><di:waypoint x="216" y="218"/><di:waypoint x="280" y="218"/></bpmndi:BPMNEdge>\n'
    + '    <bpmndi:BPMNEdge id="F2_di" bpmnElement="Flow_2"><di:waypoint x="380" y="218"/><di:waypoint x="445" y="218"/></bpmndi:BPMNEdge>\n'
    + '    <bpmndi:BPMNEdge id="F3_di" bpmnElement="Flow_3"><di:waypoint x="470" y="193"/><di:waypoint x="470" y="140"/><di:waypoint x="560" y="140"/></bpmndi:BPMNEdge>\n'
    + '    <bpmndi:BPMNEdge id="F4_di" bpmnElement="Flow_4"><di:waypoint x="470" y="243"/><di:waypoint x="470" y="300"/><di:waypoint x="560" y="300"/></bpmndi:BPMNEdge>\n'
    + '    <bpmndi:BPMNEdge id="F5_di" bpmnElement="Flow_5"><di:waypoint x="660" y="140"/><di:waypoint x="750" y="140"/><di:waypoint x="750" y="200"/></bpmndi:BPMNEdge>\n'
    + '    <bpmndi:BPMNEdge id="F6_di" bpmnElement="Flow_6"><di:waypoint x="660" y="300"/><di:waypoint x="750" y="300"/><di:waypoint x="750" y="236"/></bpmndi:BPMNEdge>\n'
    + '  </bpmndi:BPMNPlane></bpmndi:BPMNDiagram>\n'
    + '</definitions>';
}

// --- Modeler Instance ---
var bpmnModeler=new BpmnJS({container:'#canvas'});

// --- Extended Palette ---
var EXT_ELEMENTS=[
  {group:'Начальные события',items:[
    {type:'bpmn:StartEvent',label:'Начальное событие',icon:'○'},
    {type:'bpmn:StartEvent',eventDef:'bpmn:MessageEventDefinition',label:'Начальное событие (Сообщение)',icon:'✉'},
    {type:'bpmn:StartEvent',eventDef:'bpmn:TimerEventDefinition',label:'Начальное событие (Таймер)',icon:'⏲'},
    {type:'bpmn:StartEvent',eventDef:'bpmn:ConditionalEventDefinition',label:'Начальное событие (Условие)',icon:'◇'},
    {type:'bpmn:StartEvent',eventDef:'bpmn:SignalEventDefinition',label:'Начальное событие (Сигнал)',icon:'△'},
  ]},
  {group:'Промежуточные события',items:[
    {type:'bpmn:IntermediateThrowEvent',label:'Промежуточное событие',icon:'◎'},
    {type:'bpmn:IntermediateThrowEvent',eventDef:'bpmn:MessageEventDefinition',label:'Отправка сообщения',icon:'✉'},
    {type:'bpmn:IntermediateThrowEvent',eventDef:'bpmn:EscalationEventDefinition',label:'Эскалация (throw)',icon:'↑'},
    {type:'bpmn:IntermediateThrowEvent',eventDef:'bpmn:LinkEventDefinition',label:'Ссылка (throw)',icon:'→'},
    {type:'bpmn:IntermediateThrowEvent',eventDef:'bpmn:CompensateEventDefinition',label:'Компенсация (throw)',icon:'⟲'},
    {type:'bpmn:IntermediateThrowEvent',eventDef:'bpmn:SignalEventDefinition',label:'Сигнал (throw)',icon:'△'},
    {type:'bpmn:IntermediateCatchEvent',eventDef:'bpmn:MessageEventDefinition',label:'Получение сообщения',icon:'✉'},
    {type:'bpmn:IntermediateCatchEvent',eventDef:'bpmn:TimerEventDefinition',label:'Таймер (catch)',icon:'⏲'},
    {type:'bpmn:IntermediateCatchEvent',eventDef:'bpmn:ConditionalEventDefinition',label:'Условие (catch)',icon:'◇'},
    {type:'bpmn:IntermediateCatchEvent',eventDef:'bpmn:LinkEventDefinition',label:'Ссылка (catch)',icon:'→'},
    {type:'bpmn:IntermediateCatchEvent',eventDef:'bpmn:SignalEventDefinition',label:'Сигнал (catch)',icon:'△'},
  ]},
  {group:'Конечные события',items:[
    {type:'bpmn:EndEvent',label:'Конечное событие',icon:'●'},
    {type:'bpmn:EndEvent',eventDef:'bpmn:MessageEventDefinition',label:'Конечное (Сообщение)',icon:'✉'},
    {type:'bpmn:EndEvent',eventDef:'bpmn:EscalationEventDefinition',label:'Конечное (Эскалация)',icon:'↑'},
    {type:'bpmn:EndEvent',eventDef:'bpmn:ErrorEventDefinition',label:'Конечное (Ошибка)',icon:'⚡'},
    {type:'bpmn:EndEvent',eventDef:'bpmn:CompensateEventDefinition',label:'Конечное (Компенсация)',icon:'⟲'},
    {type:'bpmn:EndEvent',eventDef:'bpmn:SignalEventDefinition',label:'Конечное (Сигнал)',icon:'△'},
    {type:'bpmn:EndEvent',eventDef:'bpmn:TerminateEventDefinition',label:'Конечное (Терминация)',icon:'◉'},
  ]},
  {group:'Шлюзы',items:[
    {type:'bpmn:ExclusiveGateway',label:'Исключающий шлюз (XOR)',icon:'◇'},
    {type:'bpmn:ParallelGateway',label:'Параллельный шлюз (AND)',icon:'✚'},
    {type:'bpmn:InclusiveGateway',label:'Включающий шлюз (OR)',icon:'◈'},
    {type:'bpmn:ComplexGateway',label:'Сложный шлюз',icon:'✱'},
    {type:'bpmn:EventBasedGateway',label:'Шлюз на основе событий',icon:'⬡'},
  ]},
  {group:'Задачи',items:[
    {type:'bpmn:Task',label:'Задача',icon:'☐'},
    {type:'bpmn:UserTask',label:'Пользовательская задача',icon:'👤'},
    {type:'bpmn:ServiceTask',label:'Сервисная задача',icon:'⚙'},
    {type:'bpmn:ScriptTask',label:'Скриптовая задача',icon:'📜'},
    {type:'bpmn:BusinessRuleTask',label:'Бизнес-правило',icon:'📋'},
    {type:'bpmn:SendTask',label:'Задача отправки',icon:'📤'},
    {type:'bpmn:ReceiveTask',label:'Задача получения',icon:'📥'},
    {type:'bpmn:ManualTask',label:'Ручная задача',icon:'✋'},
    {type:'bpmn:CallActivity',label:'Вызов процесса',icon:'↗'},
  ]},
  {group:'Подпроцессы',items:[
    {type:'bpmn:SubProcess',expanded:true,label:'Подпроцесс (развёрнутый)',icon:'▣'},
    {type:'bpmn:SubProcess',expanded:false,label:'Подпроцесс (свёрнутый)',icon:'▢'},
    {type:'bpmn:Transaction',expanded:true,label:'Транзакция',icon:'⊞'},
  ]},
  {group:'Данные',items:[
    {type:'bpmn:DataObjectReference',label:'Объект данных',icon:'📄'},
    {type:'bpmn:DataStoreReference',label:'Хранилище данных',icon:'🗄'},
  ]},
  {group:'Участники',items:[
    {type:'bpmn:Participant',label:'Пул (Участник)',icon:'═'},
    {type:'bpmn:Participant',label:'Пустой пул (Empty pool)',icon:'▭',emptyPool:true},
  ]},
  {group:'Аннотации',items:[
    {type:'bpmn:TextAnnotation',label:'Текстовая аннотация',icon:'📝'},
    {type:'bpmn:Group',label:'Группа',icon:'⬜'},
  ]},
];

function openExtPalette(){
  var overlay=document.getElementById('extPaletteOverlay');
  var panel=document.getElementById('extPalette');
  var paletteEl=document.querySelector('.djs-palette');
  if(paletteEl){
    var rect=paletteEl.getBoundingClientRect();
    panel.style.left=(rect.right+8)+'px';
    panel.style.top=rect.top+'px';
  }else{
    panel.style.left='80px';panel.style.top='80px';
  }
  overlay.classList.add('open');
  renderExtPalette('');
  setTimeout(function(){document.getElementById('extPaletteSearch').focus()},50);
}

function closeExtPalette(){
  document.getElementById('extPaletteOverlay').classList.remove('open');
  document.getElementById('extPaletteSearch').value='';
}

function filterExtPalette(){
  renderExtPalette(document.getElementById('extPaletteSearch').value);
}

function renderExtPalette(query){
  var list=document.getElementById('extPaletteList');
  list.innerHTML='';
  var q=query.toLowerCase().trim();
  var found=false;
  EXT_ELEMENTS.forEach(function(group){
    var items=group.items.filter(function(it){
      var localizedLabel=typeof localizeText==='function'?localizeText(it.label):it.label;
      return !q||localizedLabel.toLowerCase().indexOf(q)>=0;
    });
    if(!items.length)return;
    found=true;
    var gEl=document.createElement('div');
    gEl.className='ext-palette-group';
    gEl.textContent=typeof localizeText==='function'?localizeText(group.group):group.group;
    list.appendChild(gEl);
    items.forEach(function(item){
      var el=document.createElement('div');
      el.className='ext-palette-item';
      var localizedLabel=typeof localizeText==='function'?localizeText(item.label):item.label;
      el.innerHTML='<span class="ep-icon">'+item.icon+'</span><span>'+escHtml(localizedLabel)+'</span>';
      el.addEventListener('mousedown',function(e){
        e.preventDefault();e.stopPropagation();
        createElementFromExtPalette(item);
        closeExtPalette();
      });
      list.appendChild(el);
    });
  });
  if(!found){
    var emp=document.createElement('div');
    emp.className='ext-palette-empty';emp.textContent='Ничего не найдено';
    list.appendChild(emp);
  }
}

function createElementFromExtPalette(item){
  try{
    var create=bpmnModeler.get('create');
    var elementFactory=bpmnModeler.get('elementFactory');
    var attrs={type:item.type};
    if(item.eventDef){
      attrs.eventDefinitionType=item.eventDef;
    }
    if(item.type==='bpmn:SubProcess'||item.type==='bpmn:Transaction'){
      attrs.isExpanded=item.expanded!==false;
    }
    if(item.type==='bpmn:Participant'){
      var pShape=elementFactory.createParticipantShape(item.emptyPool?{isExpanded:false}:undefined);
      create.start(lastMouseEvent||new MouseEvent('click'),pShape);
      return;
    }
    var shape=elementFactory.createShape(attrs);
    create.start(lastMouseEvent||new MouseEvent('click'),shape);
  }catch(e){console.error('Extended palette create error:',e);}
}

var lastMouseEvent=null;
document.addEventListener('mousemove',function(e){lastMouseEvent=e;});

function injectPaletteMoreButton(){
  var palette=document.querySelector('.djs-palette .djs-palette-entries');
  if(!palette)return;
  if(palette.querySelector('.entry-more'))return;
  var sep=document.createElement('hr');
  sep.className='separator';
  palette.appendChild(sep);
  var btn=document.createElement('div');
  btn.className='entry entry-more';
  btn.title='Все элементы (N)';
  btn.style.cssText='text-align:center;font-size:18px;letter-spacing:2px;cursor:pointer;padding:6px 0;line-height:1;color:var(--text-muted,#8b90a5)';
  btn.textContent='•••';
  btn.addEventListener('click',function(e){e.stopPropagation();openExtPalette();});
  palette.appendChild(btn);
}

// --- Tabs System ---
var tabs=[];
var activeTabId=null;
var tabCounter=0;

function genTabId(){return 'tab_'+(++tabCounter)}

async function saveCurrentTabState(){
  var tab=tabs.find(function(t){return t.id===activeTabId});
  if(!tab)return;
  if(tab.type==='er'){
    saveErTabState(tab);
  }else{
    try{tab.xml=(await bpmnModeler.saveXML({format:true})).xml;}catch(e){}
    try{tab.viewbox=bpmnModeler.get('canvas').viewbox();}catch(e){}
  }
}

async function createNewTab(name,content,fileHandle,type,projectIndex,projectFilePath){
  if(activeTabId)await saveCurrentTabState();
  var id=genTabId();
  type=type||'bpmn';
  var tab;
  if(type==='er'){
    tab={id:id,name:name||'diagram-'+tabCounter+'.erdsl',type:'er',dsl:content||(typeof getDefaultErDsl==='function'?getDefaultErDsl():DEFAULT_ER_DSL),modified:false,erState:{pan:{x:40,y:40},zoom:1,tablePositions:{},scrollTop:0},fileHandle:fileHandle||null,projectIndex:projectIndex,projectFilePath:projectFilePath};
  }else{
    tab={id:id,name:name||'diagram-'+tabCounter+'.bpmn',type:'bpmn',xml:content||getDefaultBpmnXml(),modified:false,viewbox:null,fileHandle:fileHandle||null,projectIndex:projectIndex,projectFilePath:projectFilePath};
  }
  tabs.push(tab);
  try{
    await switchTab(id);
  }catch(e){
    console.error('createNewTab error:',e);
    tabs.splice(tabs.indexOf(tab),1);
    toast('❌','Ошибка создания вкладки');
    return null;
  }
  renderTabs();
  return id;
}

async function switchTab(id){
  if(activeTabId===id)return;
  try{
    if(activeTabId)await saveCurrentTabState();
    activeTabId=id;
    var tab=tabs.find(function(t){return t.id===id});
    if(!tab)return;
    // Auto-switch mode if needed
    var targetMode=tab.type==='er'?'er':'bpmn';
    if(currentMode!==targetMode)switchMode(targetMode);
    if(tab.type==='er'){
      // Use requestAnimationFrame so DOM layout recalculates after switchMode
      requestAnimationFrame(function(){restoreErTabState(tab);});
    }else{
      await bpmnModeler.importXML(tab.xml);
      propsSelectedElement=null;
      if(propsPanelOpen)renderProps();
      if(tab.viewbox){
        bpmnModeler.get('canvas').viewbox(tab.viewbox);
      }else{
        bpmnModeler.get('canvas').zoom('fit-viewport');
      }
      updateZoomDisplay();updateElementCount();
    }
  }catch(e){console.error('switchTab error:',e);}
  renderTabs();
}

async function closeTab(id){
  var tab=tabs.find(function(t){return t.id===id});
  if(!tab)return;
  if(tab.modified&&!confirm('«'+tab.name+'» изменён. Закрыть без сохранения?'))return;
  var idx=tabs.indexOf(tab);
  tabs.splice(idx,1);
  try{
    if(tabs.length===0){
      await createNewTab();return;
    }
    if(activeTabId===id){
      var nextIdx=Math.min(idx,tabs.length-1);
      activeTabId=null;
      await switchTab(tabs[nextIdx].id);
    }
  }catch(e){
    console.error('closeTab error:',e);
    toast('❌','Ошибка при закрытии вкладки');
  }
  renderTabs();
}

function markModified(){
  var tab=tabs.find(function(t){return t.id===activeTabId});
  if(tab&&!tab.modified){tab.modified=true;renderTabs();}
}

function renderTabs(){
  var container=document.getElementById('tabsScroll');
  container.innerHTML='';
  tabs.forEach(function(tab){
    var el=document.createElement('div');
    el.className='tab'+(tab.id===activeTabId?' active':'');
    var typeIcon=tab.type==='er'?'📐':'📄';
    el.innerHTML='<span style="opacity:.5;margin-right:3px" title="'+(tab.type==='er'?'ER-диаграмма':'BPMN-процесс')+'">'+typeIcon+'</span>'+(tab.fileHandle?'<span style="opacity:.4;margin-right:2px" title="Привязан к файлу">📎</span>':'')+'<span class="tab-name">'+escHtml(tab.name)+'</span>'+(tab.modified?'<span class="tab-modified">•</span>':'')+'<button class="tab-close" data-id="'+tab.id+'" title="Закрыть">×</button>';
    el.addEventListener('click',function(e){
      if(e.target.classList.contains('tab-close')){closeTab(e.target.getAttribute('data-id'));return;}
      switchTab(tab.id);
    });
    container.appendChild(el);
  });
  if(typeof applyLocaleToDom==='function')applyLocaleToDom(container);
}

function getActiveTab(){return tabs.find(function(t){return t.id===activeTabId})}

// --- File System Access API ---
var hasFileSystemAccess=('showOpenFilePicker' in window);
var lastDirectoryHandle=null;

function getStartIn(){
  if(lastDirectoryHandle)return lastDirectoryHandle;
  var tab=getActiveTab();
  if(tab&&tab.fileHandle)return tab.fileHandle;
  return 'documents';
}

async function openFile(){
  if(hasFileSystemAccess){
    try{
      var handles=await window.showOpenFilePicker({
        multiple:true,
        startIn:getStartIn(),
        types:[{description:'BPMN files',accept:{'application/xml':['.bpmn','.xml']}},{description:'ER DSL files',accept:{'text/plain':['.erdsl']}}]
      });
      for(var i=0;i<handles.length;i++){
        var file=await handles[i].getFile();
        var content=await file.text();
        var type=file.name.match(/\.erdsl$/i)?'er':'bpmn';
        await createNewTab(file.name,content,handles[i],type);
        toast('✅','«'+file.name+'» открыт');
      }
      if(handles.length>0) lastDirectoryHandle=handles[handles.length-1];
    }catch(e){if(e.name!=='AbortError')console.error(e);}
  }else{
    document.getElementById('file-input').click();
  }
}

function initBpmnFileInput(){
  document.getElementById('file-input').addEventListener('change',async function(e){
    var files=Array.from(e.target.files);
    for(var i=0;i<files.length;i++){
      var file=files[i];
      var content=await readFileText(file);
      var type=file.name.match(/\.erdsl$/i)?'er':'bpmn';
      await createNewTab(file.name,content,null,type);
      toast('✅','«'+file.name+'» открыт');
    }
    e.target.value='';
  });
}

function readFileText(file){return new Promise(function(resolve){var r=new FileReader();r.onload=function(e){resolve(e.target.result)};r.readAsText(file)})}

// --- Save ---
async function saveBPMN(){
  var tab=getActiveTab();if(!tab)return;
  try{
    var r=await bpmnModeler.saveXML({format:true});
    if(tab.fileHandle){
      await writeToFileHandle(tab.fileHandle,r.xml);
      tab.modified=false;renderTabs();
      if(typeof updateProjectModified==='function')updateProjectModified();
      toast('💾','Сохранено в «'+tab.name+'»');
    }else{
      await saveAsDialog();
    }
  }catch(e){
    if(e.name==='AbortError')return;
    console.error(e);toast('❌','Ошибка сохранения');
  }
}

async function saveAsDialog(){
  var tab=getActiveTab();if(!tab)return;
  try{
    var r=await bpmnModeler.saveXML({format:true});
    if(hasFileSystemAccess){
      var handle=await window.showSaveFilePicker({
        suggestedName:tab.name,
        startIn:getStartIn(),
        types:[{description:'BPMN file',accept:{'application/xml':['.bpmn']}},{description:'XML file',accept:{'text/xml':['.xml']}}]
      });
      await writeToFileHandle(handle,r.xml);
      tab.fileHandle=handle;
      tab.name=handle.name;
      tab.modified=false;renderTabs();
      if(typeof updateProjectModified==='function')updateProjectModified();
      lastDirectoryHandle=handle;
      toast('💾','Сохранено как «'+handle.name+'»');
    }else{
      download(r.xml,tab.name,'application/xml');
      tab.modified=false;renderTabs();
      toast('💾','Файл скачан');
    }
  }catch(e){
    if(e.name==='AbortError')return;
    console.error(e);toast('❌','Ошибка сохранения');
  }
}

async function saveActiveTab(){
  var tab=getActiveTab();if(!tab)return;
  if(tab.type==='er'){await saveErTab(tab);}else{await saveBPMN();}
}

async function writeToFileHandle(handle,content){
  var writable=await handle.createWritable();
  try{
    await writable.write(content);
    await writable.close();
  }catch(e){
    try{await writable.close();}catch(ignore){}
    throw e;
  }
}

// --- Export ---
async function saveSVG(){
  try{
    var r=await bpmnModeler.saveSVG();
    var tab=getActiveTab();
    download(r.svg,(tab?tab.name:'diagram').replace(/\.bpmn$/i,'')+'.svg','image/svg+xml');
    toast('🖼️','SVG экспортирован');
  }catch(e){toast('❌','Ошибка');}
}

async function exportPNG(scale){
  scale=scale||1;
  try{
    var result=await bpmnModeler.saveSVG();
    var svgStr=result.svg;
    var parser=new DOMParser();
    var svgDoc=parser.parseFromString(svgStr,'image/svg+xml');
    var svgEl=svgDoc.querySelector('svg');
    var vb=svgEl.getAttribute('viewBox');
    var parts=vb?vb.split(/[\s,]+/).map(Number):[0,0,800,600];
    var w=parts[2]*scale, h=parts[3]*scale;
    var canvas=document.createElement('canvas');
    canvas.width=w;canvas.height=h;
    var ctx=canvas.getContext('2d');
    ctx.fillStyle='#ffffff';
    ctx.fillRect(0,0,w,h);
    var img=new Image();
    var blob=new Blob([svgStr],{type:'image/svg+xml;charset=utf-8'});
    var url=URL.createObjectURL(blob);
    img.onload=function(){
      ctx.drawImage(img,0,0,w,h);
      URL.revokeObjectURL(url);
      canvas.toBlob(function(pngBlob){
        var tab=getActiveTab();
        var fn=(tab?tab.name:'diagram').replace(/\.bpmn$/i,'')+(scale>1?'@'+scale+'x':'')+'.png';
        var a=document.createElement('a');
        a.href=URL.createObjectURL(pngBlob);
        a.download=fn;a.click();
        URL.revokeObjectURL(a.href);
        toast('🖼️','PNG'+(scale>1?' @'+scale+'x':'')+' экспортирован');
      },'image/png');
    };
    img.onerror=function(){toast('❌','Ошибка рендера PNG');URL.revokeObjectURL(url);};
    img.src=url;
  }catch(e){console.error(e);toast('❌','Ошибка экспорта PNG');}
}

async function exportPDF(){
  try{
    var result=await bpmnModeler.saveSVG();
    var tab=getActiveTab();
    var title=tab?tab.name:'diagram';
    var win=window.open('','_blank','width=900,height=700');
    win.document.write('<!DOCTYPE html><html><head><title>'+escHtml(title)+'</title><style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh}svg{max-width:100%;max-height:100vh}</style></head><body>'+result.svg+'<script>setTimeout(function(){window.print()},400)<\/script></body></html>');
    win.document.close();
    toast('📄','PDF — используйте «Сохранить как PDF» в диалоге печати');
  }catch(e){toast('❌','Ошибка');}
}

function toggleExportMenu(){document.getElementById('exportMenu').classList.toggle('open')}
function closeExportMenu(){document.getElementById('exportMenu').classList.remove('open')}

// --- Undo/Redo ---
function undo(){bpmnModeler.get('commandStack').undo()}
function redo(){bpmnModeler.get('commandStack').redo()}

// --- Clipboard ---
var crossTabClipboard=null;

function getSelectedElements(){
  var sel=bpmnModeler.get('selection').get();
  return sel.filter(function(e){return e.id!=='Process_1'&&e.type!=='bpmn:Process'&&e.parent});
}

function doCopy(){
  var selected=getSelectedElements();
  if(!selected.length){toast('⚠️','Выберите элементы для копирования');return;}
  try{
    var copyPaste=bpmnModeler.get('copyPaste');
    var tree=copyPaste.copy(selected);
    var clipboard=bpmnModeler.get('clipboard');
    crossTabClipboard={data:clipboard.get(),count:selected.length,sourceTabId:activeTabId};
    toast('📋','Скопировано: '+selected.length+' эл.');
  }catch(e){console.error(e);toast('❌','Ошибка копирования');}
}

function doCut(){
  var selected=getSelectedElements();
  if(!selected.length){toast('⚠️','Выберите элементы для вырезания');return;}
  try{
    var copyPaste=bpmnModeler.get('copyPaste');
    copyPaste.copy(selected);
    var clipboard=bpmnModeler.get('clipboard');
    crossTabClipboard={data:clipboard.get(),count:selected.length,sourceTabId:activeTabId};
    var modeling=bpmnModeler.get('modeling');
    modeling.removeElements(selected);
    toast('✂️','Вырезано: '+selected.length+' эл.');
  }catch(e){console.error(e);toast('❌','Ошибка вырезания');}
}

function doPaste(){
  if(!crossTabClipboard||!crossTabClipboard.data){toast('⚠️','Буфер обмена пуст');return;}
  try{
    var clipboard=bpmnModeler.get('clipboard');
    clipboard.set(crossTabClipboard.data);
    var copyPaste=bpmnModeler.get('copyPaste');
    var canvas=bpmnModeler.get('canvas');
    var vb=canvas.viewbox();
    var centerX=vb.x+vb.width/2;
    var centerY=vb.y+vb.height/2;
    copyPaste.paste({point:{x:centerX,y:centerY}});
    toast('📌','Вставлено: '+crossTabClipboard.count+' эл.');
  }catch(e){console.error(e);toast('❌','Ошибка вставки');}
}

// --- Zoom ---
function zoomIn(){bpmnModeler.get('zoomScroll').stepZoom(1);updateZoomDisplay()}
function zoomOut(){bpmnModeler.get('zoomScroll').stepZoom(-1);updateZoomDisplay()}
function zoomFit(){bpmnModeler.get('canvas').zoom('fit-viewport');updateZoomDisplay()}
function zoomReset(){bpmnModeler.get('canvas').zoom(1);updateZoomDisplay()}
function updateZoomDisplay(){try{document.getElementById('zoom-level').textContent=Math.round(bpmnModeler.get('canvas').zoom()*100)+'%'}catch(e){}}
function updateElementCount(){try{document.getElementById('element-count').textContent=bpmnModeler.get('elementRegistry').getAll().length+' элементов'}catch(e){}}

// --- XML Panel ---
function toggleXmlPanel(){var p=document.getElementById('xmlPanel');if(p.classList.toggle('open'))refreshXml();}
async function refreshXml(){try{document.getElementById('xmlEditor').value=(await bpmnModeler.saveXML({format:true})).xml}catch(e){}}
async function applyXml(){try{await bpmnModeler.importXML(document.getElementById('xmlEditor').value);bpmnModeler.get('canvas').zoom('fit-viewport');updateZoomDisplay();updateElementCount();toast('✅','XML применён');}catch(e){toast('❌','Ошибка: '+(e.message||e));}}

// --- Properties Panel ---
var propsPanelOpen=false;
var propsSelectedElement=null;

function togglePropsPanel(){
  propsPanelOpen=!propsPanelOpen;
  document.getElementById('propsPanel').classList.toggle('open',propsPanelOpen);
  if(propsPanelOpen)renderProps();
}

function renderProps(){
  var body=document.getElementById('propsPanelBody');
  if(!propsSelectedElement){
    body.innerHTML='<div class="props-empty"><div class="props-empty-icon">🖱️</div>Выберите элемент<br>на диаграмме</div>';
    return;
  }
  var el=propsSelectedElement;
  var bo=el.businessObject;
  if(!bo){body.innerHTML='<div class="props-empty">Нет данных</div>';return;}
  var type=bo.$type||el.type||'';
  var typeName=type.replace('bpmn:','');
  var html='<div class="props-section"><div class="props-section-title">Общие</div>';
  html+='<div class="props-field"><label>Тип</label><div style="padding:4px 0"><span class="props-type-badge">'+escHtml(typeName)+'</span></div></div>';
  html+='<div class="props-field"><label>ID</label><input type="text" id="prop-id" value="'+escHtml(bo.id||'')+'" data-prop="id"></div>';
  html+='<div class="props-field"><label>Имя</label><input type="text" id="prop-name" value="'+escHtml(bo.name||'')+'" data-prop="name"></div>';
  html+='</div>';

  var docs=bo.documentation&&bo.documentation.length?bo.documentation[0].text:'';
  html+='<div class="props-section"><div class="props-section-title">Документация</div>';
  html+='<div class="props-field"><label>Описание</label><textarea id="prop-doc" rows="3">'+escHtml(docs)+'</textarea></div>';
  html+='</div>';

  if(type==='bpmn:Process'){
    html+='<div class="props-section"><div class="props-section-title">Процесс</div>';
    html+='<div class="props-field"><label>Исполняемый</label><select id="prop-executable" data-prop="isExecutable"><option value="true"'+(bo.isExecutable?' selected':'')+'>Да</option><option value="false"'+(!bo.isExecutable?' selected':'')+'>Нет</option></select></div>';
    html+='</div>';
  }

  var isActivity=type==='bpmn:Task'||type==='bpmn:UserTask'||type==='bpmn:ServiceTask'||type==='bpmn:ScriptTask'||type==='bpmn:SendTask'||type==='bpmn:ReceiveTask'||type==='bpmn:ManualTask'||type==='bpmn:BusinessRuleTask'||type==='bpmn:SubProcess'||type==='bpmn:CallActivity'||type==='bpmn:Transaction';
  if(isActivity){
    html+='<div class="props-section"><div class="props-section-title">Задача</div>';
    if(type!=='bpmn:SubProcess'&&type!=='bpmn:CallActivity'&&type!=='bpmn:Transaction'){
      html+='<div class="props-field"><label>Преобразовать в</label><select id="prop-tasktype">';
      var taskTypes=[
        ['bpmn:Task','Задача'],['bpmn:UserTask','Пользовательская'],['bpmn:ServiceTask','Сервисная'],
        ['bpmn:ScriptTask','Скриптовая'],['bpmn:SendTask','Отправка'],['bpmn:ReceiveTask','Получение'],
        ['bpmn:ManualTask','Ручная'],['bpmn:BusinessRuleTask','Бизнес-правило']
      ];
      taskTypes.forEach(function(tt){
        html+='<option value="'+tt[0]+'"'+(type===tt[0]?' selected':'')+'>'+tt[1]+'</option>';
      });
      html+='</select></div>';
    }
    html+='<div class="props-field"><label>Компенсация</label><select id="prop-compensation"><option value="false"'+(bo.isForCompensation?'':' selected')+'>Нет</option><option value="true"'+(bo.isForCompensation?' selected':'')+'>Да</option></select></div>';
    html+='</div>';

    var loopChars=bo.loopCharacteristics;
    var loopType='none';
    if(loopChars){
      if(loopChars.$type==='bpmn:MultiInstanceLoopCharacteristics'){
        loopType=loopChars.isSequential?'sequential':'parallel';
      }else if(loopChars.$type==='bpmn:StandardLoopCharacteristics'){
        loopType='loop';
      }
    }
    html+='<div class="props-section"><div class="props-section-title">Многоэкземплярность</div>';
    html+='<div class="props-field"><label>Тип цикла</label><select id="prop-looptype">';
    html+='<option value="none"'+(loopType==='none'?' selected':'')+'>Нет</option>';
    html+='<option value="parallel"'+(loopType==='parallel'?' selected':'')+'>Параллельный (|||)</option>';
    html+='<option value="sequential"'+(loopType==='sequential'?' selected':'')+'>Последовательный (≡)</option>';
    html+='<option value="loop"'+(loopType==='loop'?' selected':'')+'>Стандартный цикл (↻)</option>';
    html+='</select></div>';
    if(loopType==='parallel'||loopType==='sequential'){
      var loopCard=loopChars.loopCardinality;
      var loopCond=loopChars.completionCondition;
      html+='<div class="props-field"><label>Кардинальность</label><input type="text" id="prop-loopcard" value="'+escHtml(loopCard?loopCard.body||'':'')+'" placeholder="3 или ${count}"></div>';
      html+='<div class="props-field"><label>Условие завершения</label><input type="text" id="prop-loopcond" value="'+escHtml(loopCond?loopCond.body||'':'')+'" placeholder="${allDone}"></div>';
    }
    if(loopType==='loop'){
      var stdCond=loopChars.loopCondition;
      html+='<div class="props-field"><label>Условие цикла</label><input type="text" id="prop-stdloopcond" value="'+escHtml(stdCond?stdCond.body||'':'')+'" placeholder="${notDone}"></div>';
      html+='<div class="props-field"><label>Максимум итераций</label><input type="number" id="prop-loopmaxiter" value="'+(loopChars.loopMaximum||'')+'"></div>';
    }
    html+='</div>';

    if(type==='bpmn:ScriptTask'){
      html+='<div class="props-section"><div class="props-section-title">Скрипт</div>';
      html+='<div class="props-field"><label>Язык (scriptFormat)</label><input type="text" id="prop-scriptformat" value="'+escHtml(bo.scriptFormat||'')+'" placeholder="javascript, groovy, python..."></div>';
      html+='<div class="props-field"><label>Тело скрипта</label><textarea id="prop-script" rows="6" style="font-family:\'JetBrains Mono\',monospace;font-size:11px">'+escHtml(bo.script||'')+'</textarea></div>';
      html+='<div class="props-field"><label>Результат (resultVariable)</label><input type="text" id="prop-scriptresult" value="'+escHtml(bo.get&&bo.get('camunda:resultVariable')||'')+'" placeholder="myResult"></div>';
      html+='</div>';
    }
  }

  if(type.indexOf('Gateway')>=0){
    html+='<div class="props-section"><div class="props-section-title">Шлюз</div>';
    html+='<div class="props-field"><label>Преобразовать в</label><select id="prop-gwtype">';
    var gwTypes=[
      ['bpmn:ExclusiveGateway','Исключающий (XOR)'],['bpmn:ParallelGateway','Параллельный (AND)'],
      ['bpmn:InclusiveGateway','Включающий (OR)'],['bpmn:ComplexGateway','Сложный'],
      ['bpmn:EventBasedGateway','На основе событий']
    ];
    gwTypes.forEach(function(gt){
      html+='<option value="'+gt[0]+'"'+(type===gt[0]?' selected':'')+'>'+gt[1]+'</option>';
    });
    html+='</select></div>';
    if(type==='bpmn:ExclusiveGateway'||type==='bpmn:InclusiveGateway'||type==='bpmn:ComplexGateway'){
      var outgoing=bo.outgoing||[];
      var defaultFlow=bo.default;
      var defaultFlowId=defaultFlow?defaultFlow.id:'';
      html+='<div class="props-field"><label>Поток по умолчанию</label><select id="prop-defaultflow">';
      html+='<option value=""'+(!defaultFlowId?' selected':'')+'>— нет —</option>';
      outgoing.forEach(function(f){
        var fname=f.name||f.id;
        html+='<option value="'+f.id+'"'+(defaultFlowId===f.id?' selected':'')+'>'+escHtml(fname)+'</option>';
      });
      html+='</select></div>';
    }
    html+='</div>';
  }

  if(type.indexOf('Event')>=0){
    var eventDefs=bo.eventDefinitions;
    var currentDef=eventDefs&&eventDefs.length?eventDefs[0].$type:'none';
    var evDefObj=eventDefs&&eventDefs.length?eventDefs[0]:null;
    html+='<div class="props-section"><div class="props-section-title">Событие</div>';
    html+='<div class="props-field"><label>Определение события</label><select id="prop-eventdef">';
    var evDefs=[
      ['none','Без определения'],['bpmn:MessageEventDefinition','Сообщение'],['bpmn:TimerEventDefinition','Таймер'],
      ['bpmn:ConditionalEventDefinition','Условие'],['bpmn:SignalEventDefinition','Сигнал'],
      ['bpmn:ErrorEventDefinition','Ошибка'],['bpmn:EscalationEventDefinition','Эскалация'],
      ['bpmn:CompensateEventDefinition','Компенсация'],['bpmn:LinkEventDefinition','Ссылка'],
      ['bpmn:TerminateEventDefinition','Терминация']
    ];
    evDefs.forEach(function(ed){
      html+='<option value="'+ed[0]+'"'+(currentDef===ed[0]?' selected':'')+'>'+ed[1]+'</option>';
    });
    html+='</select></div>';

    if(currentDef==='bpmn:TimerEventDefinition'&&evDefObj){
      var timerType='none',timerValue='';
      if(evDefObj.timeDuration){timerType='duration';timerValue=evDefObj.timeDuration.body||'';}
      else if(evDefObj.timeDate){timerType='date';timerValue=evDefObj.timeDate.body||'';}
      else if(evDefObj.timeCycle){timerType='cycle';timerValue=evDefObj.timeCycle.body||'';}
      html+='<div class="props-field"><label>Тип таймера</label><select id="prop-timertype">';
      html+='<option value="none"'+(timerType==='none'?' selected':'')+'>Не задан</option>';
      html+='<option value="duration"'+(timerType==='duration'?' selected':'')+'>Длительность (Duration)</option>';
      html+='<option value="date"'+(timerType==='date'?' selected':'')+'>Дата (Date)</option>';
      html+='<option value="cycle"'+(timerType==='cycle'?' selected':'')+'>Цикл (Cycle)</option>';
      html+='</select></div>';
      html+='<div class="props-field"><label>Значение</label><input type="text" id="prop-timervalue" value="'+escHtml(timerValue)+'" placeholder="'+(timerType==='duration'?'PT30M / P1D':timerType==='date'?'2025-12-31T23:59:59Z':timerType==='cycle'?'R3/PT10M':'')+'"></div>';
    }
    if(currentDef==='bpmn:MessageEventDefinition'&&evDefObj){
      var msgRef=evDefObj.messageRef;
      html+='<div class="props-field"><label>Имя сообщения</label><input type="text" id="prop-msgname" value="'+escHtml(msgRef?msgRef.name||'':'')+'" placeholder="OrderReceived"></div>';
    }
    if(currentDef==='bpmn:SignalEventDefinition'&&evDefObj){
      var sigRef=evDefObj.signalRef;
      html+='<div class="props-field"><label>Имя сигнала</label><input type="text" id="prop-signame" value="'+escHtml(sigRef?sigRef.name||'':'')+'" placeholder="PaymentCompleted"></div>';
    }
    if(currentDef==='bpmn:ErrorEventDefinition'&&evDefObj){
      var errRef=evDefObj.errorRef;
      html+='<div class="props-field"><label>Код ошибки</label><input type="text" id="prop-errcode" value="'+escHtml(errRef?errRef.errorCode||'':'')+'" placeholder="ERR_001"></div>';
      html+='<div class="props-field"><label>Имя ошибки</label><input type="text" id="prop-errname" value="'+escHtml(errRef?errRef.name||'':'')+'" placeholder="ValidationError"></div>';
    }
    if(currentDef==='bpmn:EscalationEventDefinition'&&evDefObj){
      var escRef=evDefObj.escalationRef;
      html+='<div class="props-field"><label>Код эскалации</label><input type="text" id="prop-esccode" value="'+escHtml(escRef?escRef.escalationCode||'':'')+'" placeholder="ESC_001"></div>';
    }
    if(currentDef==='bpmn:LinkEventDefinition'&&evDefObj){
      html+='<div class="props-field"><label>Имя ссылки</label><input type="text" id="prop-linkname" value="'+escHtml(evDefObj.name||'')+'" placeholder="GoToStep2"></div>';
    }
    if(currentDef==='bpmn:ConditionalEventDefinition'&&evDefObj){
      var condObj=evDefObj.condition;
      html+='<div class="props-field"><label>Условие (FormalExpression)</label><input type="text" id="prop-condevent" value="'+escHtml(condObj?condObj.body||'':'')+'" placeholder="${x > 100}"></div>';
    }
    html+='</div>';
  }

  if(type==='bpmn:SequenceFlow'){
    var condExpr=bo.conditionExpression;
    html+='<div class="props-section"><div class="props-section-title">Поток</div>';
    html+='<div class="props-field"><label>Условие (Expression)</label><input type="text" id="prop-condition" value="'+escHtml(condExpr?condExpr.body||'':'')+'" placeholder="${condition}"></div>';
    html+='</div>';
  }

  if(el.width!==undefined){
    html+='<div class="props-section"><div class="props-section-title">Размеры и позиция</div>';
    html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 8px">';
    html+='<div class="props-field"><label>X</label><input type="number" id="prop-x" value="'+Math.round(el.x||0)+'"></div>';
    html+='<div class="props-field"><label>Y</label><input type="number" id="prop-y" value="'+Math.round(el.y||0)+'"></div>';
    if(el.type!=='label'){
      html+='<div class="props-field"><label>Ширина</label><input type="number" id="prop-w" value="'+Math.round(el.width||0)+'"></div>';
      html+='<div class="props-field"><label>Высота</label><input type="number" id="prop-h" value="'+Math.round(el.height||0)+'"></div>';
    }
    html+='</div></div>';
  }

  if(el.type!=='bpmn:Process'&&el.type!=='bpmn:Collaboration'&&!el.type.match(/^label/)){
    var di=getDiElement(el);
    var curStroke=(di&&di.get('color:border-color'))||(di&&di.get('bioc:stroke'))||'';
    var curFill=(di&&di.get('color:background-color'))||(di&&di.get('bioc:fill'))||'';
    var isConnection=!!el.waypoints;

    html+='<div class="props-section"><div class="props-section-title">Цвет</div>';
    html+='<div class="props-color-row"><label>Обводка</label><div class="props-color-group">';
    html+='<input type="color" class="props-color-input" id="prop-stroke-color" value="'+(curStroke||'#000000')+'">';
    html+='<input type="text" class="props-color-hex" id="prop-stroke-hex" value="'+escHtml(curStroke||'')+'" placeholder="#000000">';
    html+='<button class="props-color-reset" id="prop-stroke-reset" title="Сбросить">✕</button>';
    html+='</div></div>';

    if(!isConnection){
      html+='<div class="props-color-row"><label>Заливка</label><div class="props-color-group">';
      html+='<input type="color" class="props-color-input" id="prop-fill-color" value="'+(curFill||'#ffffff')+'">';
      html+='<input type="text" class="props-color-hex" id="prop-fill-hex" value="'+escHtml(curFill||'')+'" placeholder="#ffffff">';
      html+='<button class="props-color-reset" id="prop-fill-reset" title="Сбросить">✕</button>';
      html+='</div></div>';
    }

    var presets=[
      {stroke:'#831311',fill:'#ffcdd2',name:'Красный'},
      {stroke:'#e65100',fill:'#ffe0b2',name:'Оранжевый'},
      {stroke:'#827717',fill:'#f0f4c3',name:'Жёлтый'},
      {stroke:'#1b5e20',fill:'#c8e6c9',name:'Зелёный'},
      {stroke:'#0d4372',fill:'#bbdefb',name:'Синий'},
      {stroke:'#4a148c',fill:'#e1bee7',name:'Фиолетовый'},
      {stroke:'#455a64',fill:'#cfd8dc',name:'Серый'},
      {stroke:'#000000',fill:'#ffffff',name:'Стандарт'},
    ];
    html+='<div class="props-color-presets" title="Быстрый выбор">';
    presets.forEach(function(p,i){
      var isActive=(curStroke===p.stroke&&curFill===p.fill);
      html+='<div class="props-color-preset'+(isActive?' active':'')+'" data-idx="'+i+'" style="background:'+p.fill+';border-color:'+(isActive?p.stroke:'transparent')+';box-shadow:inset 0 0 0 1px '+p.stroke+'" title="'+p.name+'"></div>';
    });
    html+='</div>';
    html+='</div>';
  }

  body.innerHTML=html;

  // --- Bind property events ---
  bindPropInput('prop-id',function(v){
    if(v&&v!==bo.id){
      try{bpmnModeler.get('modeling').updateProperties(el,{id:v})}catch(e){toast('❌','ID уже используется')}
    }
  });
  bindPropInput('prop-name',function(v){
    bpmnModeler.get('modeling').updateLabel(el,v);
  });
  bindPropTextarea('prop-doc',function(v){
    var modeling=bpmnModeler.get('modeling');
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    if(v){
      var doc=bpmnFactory.create('bpmn:Documentation',{text:v});
      modeling.updateProperties(el,{documentation:[doc]});
    }else{
      modeling.updateProperties(el,{documentation:[]});
    }
  });
  bindPropSelect('prop-executable',function(v){
    bpmnModeler.get('modeling').updateProperties(el,{isExecutable:v==='true'});
  });
  bindPropSelect('prop-tasktype',function(v){
    if(v!==type){
      var bpmnReplace=bpmnModeler.get('bpmnReplace');
      var newEl=bpmnReplace.replaceElement(el,{type:v});
      propsSelectedElement=newEl;
      setTimeout(function(){renderProps()},50);
    }
  });
  bindPropSelect('prop-gwtype',function(v){
    if(v!==type){
      var bpmnReplace=bpmnModeler.get('bpmnReplace');
      var newEl=bpmnReplace.replaceElement(el,{type:v});
      propsSelectedElement=newEl;
      setTimeout(function(){renderProps()},50);
    }
  });
  bindPropSelect('prop-eventdef',function(v){
    var bpmnReplace=bpmnModeler.get('bpmnReplace');
    var newType=el.type;
    var opts={type:newType};
    if(v!=='none')opts.eventDefinitionType=v;
    var newEl=bpmnReplace.replaceElement(el,opts);
    propsSelectedElement=newEl;
    setTimeout(function(){renderProps()},50);
  });
  bindPropInput('prop-condition',function(v){
    var modeling=bpmnModeler.get('modeling');
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    if(v){
      var expr=bpmnFactory.create('bpmn:FormalExpression',{body:v});
      modeling.updateProperties(el,{conditionExpression:expr});
    }else{
      modeling.updateProperties(el,{conditionExpression:undefined});
    }
  });
  bindPropSelect('prop-compensation',function(v){
    bpmnModeler.get('modeling').updateProperties(el,{isForCompensation:v==='true'});
  });
  bindPropSelect('prop-looptype',function(v){
    var modeling=bpmnModeler.get('modeling');
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    if(v==='none'){
      modeling.updateProperties(el,{loopCharacteristics:undefined});
    }else if(v==='parallel'){
      var lc=bpmnFactory.create('bpmn:MultiInstanceLoopCharacteristics',{isSequential:false});
      modeling.updateProperties(el,{loopCharacteristics:lc});
    }else if(v==='sequential'){
      var lc=bpmnFactory.create('bpmn:MultiInstanceLoopCharacteristics',{isSequential:true});
      modeling.updateProperties(el,{loopCharacteristics:lc});
    }else if(v==='loop'){
      var lc=bpmnFactory.create('bpmn:StandardLoopCharacteristics');
      modeling.updateProperties(el,{loopCharacteristics:lc});
    }
    setTimeout(function(){renderProps()},50);
  });
  bindPropInput('prop-loopcard',function(v){
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    var lc=bo.loopCharacteristics;
    if(lc){
      if(v){lc.loopCardinality=bpmnFactory.create('bpmn:FormalExpression',{body:v});}
      else{lc.loopCardinality=undefined;}
      bpmnModeler.get('modeling').updateProperties(el,{loopCharacteristics:lc});
    }
  });
  bindPropInput('prop-loopcond',function(v){
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    var lc=bo.loopCharacteristics;
    if(lc){
      if(v){lc.completionCondition=bpmnFactory.create('bpmn:FormalExpression',{body:v});}
      else{lc.completionCondition=undefined;}
      bpmnModeler.get('modeling').updateProperties(el,{loopCharacteristics:lc});
    }
  });
  bindPropInput('prop-stdloopcond',function(v){
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    var lc=bo.loopCharacteristics;
    if(lc){
      if(v){lc.loopCondition=bpmnFactory.create('bpmn:FormalExpression',{body:v});}
      else{lc.loopCondition=undefined;}
      bpmnModeler.get('modeling').updateProperties(el,{loopCharacteristics:lc});
    }
  });
  bindPropNumber('prop-loopmaxiter',function(v){
    var lc=bo.loopCharacteristics;
    if(lc){
      lc.loopMaximum=v||undefined;
      bpmnModeler.get('modeling').updateProperties(el,{loopCharacteristics:lc});
    }
  });
  bindPropInput('prop-scriptformat',function(v){
    bpmnModeler.get('modeling').updateProperties(el,{scriptFormat:v||undefined});
  });
  bindPropTextarea('prop-script',function(v){
    bpmnModeler.get('modeling').updateProperties(el,{script:v||undefined});
  });
  bindPropInput('prop-scriptresult',function(v){
    try{bpmnModeler.get('modeling').updateProperties(el,{'camunda:resultVariable':v||undefined})}catch(e){}
  });
  bindPropSelect('prop-defaultflow',function(v){
    var modeling=bpmnModeler.get('modeling');
    if(v){
      var registry=bpmnModeler.get('elementRegistry');
      var flowEl=registry.get(v);
      if(flowEl)modeling.updateProperties(el,{'default':flowEl.businessObject});
    }else{
      modeling.updateProperties(el,{'default':undefined});
    }
  });
  bindPropSelect('prop-timertype',function(v){
    var evDefObj=bo.eventDefinitions&&bo.eventDefinitions[0];
    if(!evDefObj)return;
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    evDefObj.timeDuration=undefined;evDefObj.timeDate=undefined;evDefObj.timeCycle=undefined;
    var curVal=document.getElementById('prop-timervalue');
    var val=curVal?curVal.value:'';
    if(v==='duration'&&val)evDefObj.timeDuration=bpmnFactory.create('bpmn:FormalExpression',{body:val});
    if(v==='date'&&val)evDefObj.timeDate=bpmnFactory.create('bpmn:FormalExpression',{body:val});
    if(v==='cycle'&&val)evDefObj.timeCycle=bpmnFactory.create('bpmn:FormalExpression',{body:val});
    bpmnModeler.get('modeling').updateProperties(el,{eventDefinitions:bo.eventDefinitions});
    setTimeout(function(){renderProps()},50);
  });
  bindPropInput('prop-timervalue',function(v){
    var evDefObj=bo.eventDefinitions&&bo.eventDefinitions[0];
    if(!evDefObj)return;
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    var timerSel=document.getElementById('prop-timertype');
    var tt=timerSel?timerSel.value:'none';
    evDefObj.timeDuration=undefined;evDefObj.timeDate=undefined;evDefObj.timeCycle=undefined;
    if(v){
      var expr=bpmnFactory.create('bpmn:FormalExpression',{body:v});
      if(tt==='duration')evDefObj.timeDuration=expr;
      else if(tt==='date')evDefObj.timeDate=expr;
      else if(tt==='cycle')evDefObj.timeCycle=expr;
    }
    bpmnModeler.get('modeling').updateProperties(el,{eventDefinitions:bo.eventDefinitions});
  });
  bindPropInput('prop-msgname',function(v){
    var evDefObj=bo.eventDefinitions&&bo.eventDefinitions[0];
    if(!evDefObj)return;
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    var moddle=bpmnModeler.get('moddle');
    if(v){
      if(!evDefObj.messageRef){
        var msg=bpmnFactory.create('bpmn:Message',{name:v});
        var defs=moddle.ids&&bpmnModeler._definitions;
        if(defs&&defs.rootElements)defs.rootElements.push(msg);
        evDefObj.messageRef=msg;
      }else{
        evDefObj.messageRef.name=v;
      }
    }
    bpmnModeler.get('modeling').updateProperties(el,{eventDefinitions:bo.eventDefinitions});
  });
  bindPropInput('prop-signame',function(v){
    var evDefObj=bo.eventDefinitions&&bo.eventDefinitions[0];
    if(!evDefObj)return;
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    var defs=bpmnModeler._definitions;
    if(v){
      if(!evDefObj.signalRef){
        var sig=bpmnFactory.create('bpmn:Signal',{name:v});
        if(defs&&defs.rootElements)defs.rootElements.push(sig);
        evDefObj.signalRef=sig;
      }else{
        evDefObj.signalRef.name=v;
      }
    }
    bpmnModeler.get('modeling').updateProperties(el,{eventDefinitions:bo.eventDefinitions});
  });
  bindPropInput('prop-errcode',function(v){
    var evDefObj=bo.eventDefinitions&&bo.eventDefinitions[0];
    if(!evDefObj)return;
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    var defs=bpmnModeler._definitions;
    if(!evDefObj.errorRef){
      var err=bpmnFactory.create('bpmn:Error',{errorCode:v,name:''});
      if(defs&&defs.rootElements)defs.rootElements.push(err);
      evDefObj.errorRef=err;
    }else{evDefObj.errorRef.errorCode=v;}
    bpmnModeler.get('modeling').updateProperties(el,{eventDefinitions:bo.eventDefinitions});
  });
  bindPropInput('prop-errname',function(v){
    var evDefObj=bo.eventDefinitions&&bo.eventDefinitions[0];
    if(!evDefObj||!evDefObj.errorRef)return;
    evDefObj.errorRef.name=v;
    bpmnModeler.get('modeling').updateProperties(el,{eventDefinitions:bo.eventDefinitions});
  });
  bindPropInput('prop-esccode',function(v){
    var evDefObj=bo.eventDefinitions&&bo.eventDefinitions[0];
    if(!evDefObj)return;
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    var defs=bpmnModeler._definitions;
    if(!evDefObj.escalationRef){
      var esc=bpmnFactory.create('bpmn:Escalation',{escalationCode:v});
      if(defs&&defs.rootElements)defs.rootElements.push(esc);
      evDefObj.escalationRef=esc;
    }else{evDefObj.escalationRef.escalationCode=v;}
    bpmnModeler.get('modeling').updateProperties(el,{eventDefinitions:bo.eventDefinitions});
  });
  bindPropInput('prop-linkname',function(v){
    var evDefObj=bo.eventDefinitions&&bo.eventDefinitions[0];
    if(!evDefObj)return;
    evDefObj.name=v;
    bpmnModeler.get('modeling').updateProperties(el,{eventDefinitions:bo.eventDefinitions});
  });
  bindPropInput('prop-condevent',function(v){
    var evDefObj=bo.eventDefinitions&&bo.eventDefinitions[0];
    if(!evDefObj)return;
    var bpmnFactory=bpmnModeler.get('bpmnFactory');
    if(v){evDefObj.condition=bpmnFactory.create('bpmn:FormalExpression',{body:v});}
    else{evDefObj.condition=undefined;}
    bpmnModeler.get('modeling').updateProperties(el,{eventDefinitions:bo.eventDefinitions});
  });
  bindPropNumber('prop-x',function(v){moveElement(el,v-el.x,0)});
  bindPropNumber('prop-y',function(v){moveElement(el,0,v-el.y)});
  bindPropNumber('prop-w',function(v){resizeElement(el,v,el.height)});
  bindPropNumber('prop-h',function(v){resizeElement(el,el.width,v)});

  // Color bindings
  (function(){
    var strokePicker=document.getElementById('prop-stroke-color');
    var strokeHex=document.getElementById('prop-stroke-hex');
    var fillPicker=document.getElementById('prop-fill-color');
    var fillHex=document.getElementById('prop-fill-hex');
    var strokeReset=document.getElementById('prop-stroke-reset');
    var fillReset=document.getElementById('prop-fill-reset');

    function applyColor(stroke,fill){
      try{
        var modeling=bpmnModeler.get('modeling');
        var opts={};
        if(stroke!==undefined)opts.stroke=stroke;
        if(fill!==undefined)opts.fill=fill;
        modeling.setColor([el],opts);
      }catch(e){console.error('setColor error:',e);}
    }

    if(strokePicker){
      strokePicker.addEventListener('input',function(){
        if(strokeHex)strokeHex.value=this.value;
        applyColor(this.value,undefined);
      });
    }
    if(strokeHex){
      strokeHex.addEventListener('change',function(){
        var v=this.value.trim();
        if(/^#[0-9a-fA-F]{6}$/.test(v)){
          if(strokePicker)strokePicker.value=v;
          applyColor(v,undefined);
        }
      });
    }
    if(fillPicker){
      fillPicker.addEventListener('input',function(){
        if(fillHex)fillHex.value=this.value;
        applyColor(undefined,this.value);
      });
    }
    if(fillHex){
      fillHex.addEventListener('change',function(){
        var v=this.value.trim();
        if(/^#[0-9a-fA-F]{6}$/.test(v)){
          if(fillPicker)fillPicker.value=v;
          applyColor(undefined,v);
        }
      });
    }
    if(strokeReset){
      strokeReset.addEventListener('click',function(){
        applyColor(null,undefined);
        if(strokePicker)strokePicker.value='#000000';
        if(strokeHex)strokeHex.value='';
      });
    }
    if(fillReset){
      fillReset.addEventListener('click',function(){
        applyColor(undefined,null);
        if(fillPicker)fillPicker.value='#ffffff';
        if(fillHex)fillHex.value='';
      });
    }

    var presets=[
      {stroke:'#831311',fill:'#ffcdd2'},{stroke:'#e65100',fill:'#ffe0b2'},
      {stroke:'#827717',fill:'#f0f4c3'},{stroke:'#1b5e20',fill:'#c8e6c9'},
      {stroke:'#0d4372',fill:'#bbdefb'},{stroke:'#4a148c',fill:'#e1bee7'},
      {stroke:'#455a64',fill:'#cfd8dc'},{stroke:'#000000',fill:'#ffffff'},
    ];
    document.querySelectorAll('.props-color-preset').forEach(function(pre){
      pre.addEventListener('click',function(){
        var idx=parseInt(this.getAttribute('data-idx'));
        var p=presets[idx];
        if(!p)return;
        applyColor(p.stroke,p.fill);
        if(strokePicker)strokePicker.value=p.stroke;
        if(strokeHex)strokeHex.value=p.stroke;
        if(fillPicker)fillPicker.value=p.fill;
        if(fillHex)fillHex.value=p.fill;
        document.querySelectorAll('.props-color-preset').forEach(function(pp){pp.classList.remove('active')});
        this.classList.add('active');
      });
    });
  })();
}

function bindPropInput(id,cb){var el=document.getElementById(id);if(el)el.addEventListener('change',function(){cb(this.value)})}
function bindPropTextarea(id,cb){var el=document.getElementById(id);if(el)el.addEventListener('change',function(){cb(this.value)})}
function bindPropSelect(id,cb){var el=document.getElementById(id);if(el)el.addEventListener('change',function(){cb(this.value)})}
function bindPropNumber(id,cb){var el=document.getElementById(id);if(el)el.addEventListener('change',function(){cb(parseFloat(this.value)||0)})}

function getDiElement(element){
  try{
    var di=bpmnModeler.get('canvas')._elementRegistry&&element.di;
    if(di)return di;
    if(element.businessObject&&element.businessObject.di)return element.businessObject.di;
    return null;
  }catch(e){return null;}
}

function moveElement(el,dx,dy){
  if(dx===0&&dy===0)return;
  bpmnModeler.get('modeling').moveElements([el],{x:dx,y:dy});
}

function resizeElement(el,w,h){
  if(w<10)w=10;if(h<10)h=10;
  try{
    bpmnModeler.get('modeling').resizeShape(el,{x:el.x,y:el.y,width:w,height:h});
  }catch(e){}
}

function setupPropsListeners(){
  bpmnModeler.on('selection.changed',function(e){
    var sel=e.newSelection;
    propsSelectedElement=sel&&sel.length===1?sel[0]:null;
    if(propsPanelOpen)renderProps();
  });
  var renderPropsOnChange=debounce(function(){
    if(propsSelectedElement&&propsPanelOpen)renderProps();
  },120);
  bpmnModeler.on('element.changed',function(e){
    if(propsSelectedElement&&e.element&&e.element.id===propsSelectedElement.id){
      renderPropsOnChange();
    }
  });
}

// --- Drag & Drop ---
function initBpmnDragDrop(){
  var dropOverlay=document.getElementById('dropOverlay'),dragCounter=0;
  document.addEventListener('dragenter',function(e){e.preventDefault();dragCounter++;dropOverlay.classList.add('active')});
  document.addEventListener('dragleave',function(e){e.preventDefault();dragCounter--;if(dragCounter<=0){dropOverlay.classList.remove('active');dragCounter=0}});
  document.addEventListener('dragover',function(e){e.preventDefault()});
  document.addEventListener('drop',async function(e){
    e.preventDefault();dragCounter=0;dropOverlay.classList.remove('active');
    var files=Array.from(e.dataTransfer.files).filter(function(f){return f.name.match(/\.(bpmn|xml|erdsl)$/i)});
    if(!files.length){toast('⚠️','Только .bpmn, .xml и .erdsl');return;}
    try{
      for(var i=0;i<files.length;i++){
        var content=await readFileText(files[i]);
        var type=files[i].name.match(/\.erdsl$/i)?'er':'bpmn';
        await createNewTab(files[i].name,content,null,type);
        toast('✅','«'+files[i].name+'» открыт');
      }
    }catch(err){
      console.error('Drop error:',err);
      toast('❌','Ошибка при открытии файла');
    }
  });
}

// --- Keyboard ---
function initBpmnKeyboard(){
  document.addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'){var ctrl2=e.ctrlKey||e.metaKey;if(ctrl2&&(e.key==='s'||e.key==='S'||e.key==='w'||e.key==='W')){/* fall through to handlers below */}else{if(e.key==='Escape'){e.target.blur();hideShortcuts();document.getElementById('xmlPanel').classList.remove('open');closeExtPalette()}return;}}
    var ctrl=e.ctrlKey||e.metaKey;
    if(ctrl&&e.shiftKey&&(e.key==='s'||e.key==='S')){e.preventDefault();if(typeof activeProjectIndex!=='undefined'&&activeProjectIndex>=0){saveProject(activeProjectIndex)}else{saveAsDialog()}return}
    if(ctrl&&e.shiftKey&&(e.key==='t'||e.key==='T')){e.preventDefault();toggleTheme();return}
    if(ctrl&&e.key==='n'){e.preventDefault();createNewTab()}
    if(ctrl&&e.key==='o'){e.preventDefault();openFile()}
    if(ctrl&&e.key==='s'){e.preventDefault();saveActiveTab()}
    if(ctrl&&e.key==='w'){e.preventDefault();if(activeTabId)closeTab(activeTabId)}
    if(ctrl&&e.key==='e'){e.preventDefault();toggleXmlPanel()}
    if(ctrl&&e.key==='p'){e.preventDefault();togglePropsPanel()}
    if(ctrl&&e.key==='c'){e.preventDefault();doCopy()}
    if(ctrl&&e.key==='x'){e.preventDefault();doCut()}
    if(ctrl&&e.key==='v'){e.preventDefault();doPaste()}
    if(e.key==='Escape'){hideShortcuts();document.getElementById('xmlPanel').classList.remove('open');closeExtPalette()}
    if(!ctrl&&e.key==='n'&&!e.shiftKey){var ep=document.getElementById('extPaletteOverlay');if(!ep.classList.contains('open')){openExtPalette();e.preventDefault()}}
  });
}

// --- BPMN Events ---
function initBpmnEvents(){
  bpmnModeler.on('commandStack.changed',function(){var tab=getActiveTab();if(tab&&tab.type==='bpmn')markModified();updateElementCount()});
  bpmnModeler.on('canvas.viewbox.changed',function(){updateZoomDisplay()});


  window.addEventListener('beforeunload',function(e){if(tabs.some(function(t){return t.modified})){e.preventDefault();e.returnValue=''}});

  document.addEventListener('click',function(e){if(!e.target.closest('.dropdown'))closeExportMenu()});
}

// --- BPMN Initialization ---
async function initBpmn(){
  initBpmnFileInput();
  initBpmnDragDrop();
  initBpmnKeyboard();
  initBpmnEvents();
  try{
    await createNewTab();
  }catch(e){
    console.error('initBpmn error:',e);
    toast('❌','Ошибка инициализации');
  }
  setupPropsListeners();
  var injectRetry=setInterval(function(){
    injectPaletteMoreButton();
    if(document.querySelector('.entry-more'))clearInterval(injectRetry);
  },200);
}
