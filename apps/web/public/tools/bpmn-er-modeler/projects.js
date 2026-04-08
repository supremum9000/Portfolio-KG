// === PROJECTS MODULE ===
// Project tree panel, file system access, manifest management

// --- Global State ---
var projects = [];
var activeProjectIndex = -1;
var projectPanelOpen = false;

var ALLOWED_EXTENSIONS = {
  'processes': ['bpmn', 'xml'],
  'data-models': ['erdsl']
};

var INVALID_FILENAME_CHARS = /[\/\\:*?"<>|]/;

// --- Manifest I/O ---

async function readManifest(dirHandle) {
  var handle = await dirHandle.getFileHandle('project.json');
  var file = await handle.getFile();
  var text = await file.text();
  return JSON.parse(text);
}

async function writeManifest(dirHandle, manifest) {
  var handle = await dirHandle.getFileHandle('project.json', { create: true });
  var writable = await handle.createWritable();
  await writable.write(JSON.stringify(manifest, null, 2));
  await writable.close();
}

// --- File Scanning ---

async function scanSubDirectory(subDirHandle, folderName) {
  var allowed = ALLOWED_EXTENSIONS[folderName] || [];
  var files = [];
  for await (var entry of subDirHandle.values()) {
    if (entry.kind !== 'file') continue;
    var ext = entry.name.split('.').pop().toLowerCase();
    if (allowed.indexOf(ext) === -1) continue;
    var type = (ext === 'bpmn' || ext === 'xml') ? 'bpmn' : 'er';
    files.push({
      name: entry.name,
      path: folderName + '/' + entry.name,
      type: type,
      handle: entry,
      folder: folderName
    });
  }
  return files;
}

function syncManifestWithDisk(manifest, diskFiles) {
  var changed = false;

  // Дедупликация
  var seen = {};
  var deduped = [];
  manifest.files.forEach(function(f) {
    if (seen[f.path]) { changed = true; return; }
    seen[f.path] = true;
    deduped.push(f);
  });

  // Валидация path
  var validated = deduped.filter(function(f) {
    var valid = f.path &&
      (f.path.indexOf('processes/') === 0 || f.path.indexOf('data-models/') === 0) &&
      f.path.indexOf('..') === -1;
    if (!valid) changed = true;
    return valid;
  });

  var manifestPaths = {};
  validated.forEach(function(f) { manifestPaths[f.path] = f; });

  var diskPaths = {};
  diskFiles.forEach(function(f) { diskPaths[f.path] = f; });

  // Файлы на диске, которых нет в манифесте → добавить
  var newFiles = validated.slice();
  diskFiles.forEach(function(df) {
    if (!manifestPaths[df.path]) {
      newFiles.push({ path: df.path });
      changed = true;
    }
  });

  // Файлы в манифесте, которых нет на диске → удалить
  newFiles = newFiles.filter(function(mf) {
    if (!diskPaths[mf.path]) {
      changed = true;
      return false;
    }
    return true;
  });

  return { files: newFiles, changed: changed };
}

function buildFileList(manifestFiles, diskFiles) {
  var diskMap = {};
  diskFiles.forEach(function(df) { diskMap[df.path] = df; });
  return manifestFiles.map(function(mf) {
    var df = diskMap[mf.path];
    if (!df) return null;
    return {
      name: df.name,
      path: mf.path,
      label: mf.label || null,
      description: mf.description || null,
      type: df.type,
      handle: df.handle,
      folder: df.folder
    };
  }).filter(Boolean);
}

// --- Validation ---

function validateFileName(name) {
  if (!name || !name.trim()) return 'Имя не может быть пустым';
  name = name.trim();
  if (INVALID_FILENAME_CHARS.test(name)) return 'Имя содержит недопустимые символы: / \\ : * ? " < > |';
  if (name.startsWith('.')) return 'Имя не может начинаться с точки';
  if (name.length > 200) return 'Слишком длинное имя';
  return null; // валидно
}

// --- Tab Lookup ---

function findTabByProjectFile(projectIndex, filePath) {
  return tabs.find(function(t) {
    return t.projectIndex === projectIndex && t.projectFilePath === filePath;
  }) || null;
}

// --- Project Creation ---

async function createNewProject() {
  if (!('showDirectoryPicker' in window)) {
    toast('⚠️', 'Требуется Chrome или Edge');
    return;
  }
  try {
    var dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });

    if ((await dirHandle.requestPermission({ mode: 'readwrite' })) !== 'granted') {
      toast('⚠️', 'Нет прав на запись в эту папку');
      return;
    }

    // Проверить существующий project.json
    var hasManifest = false;
    try {
      await dirHandle.getFileHandle('project.json');
      hasManifest = true;
    } catch (e) { /* не найден */ }

    if (hasManifest) {
      if (confirm('Папка «' + dirHandle.name + '» уже содержит проект. Открыть его?')) {
        await openExistingProject(dirHandle);
      }
      return;
    }

    // Создать структуру
    var processesHandle = await dirHandle.getDirectoryHandle('processes', { create: true });
    var dataModelsHandle = await dirHandle.getDirectoryHandle('data-models', { create: true });

    var manifest = {
      name: dirHandle.name,
      description: '',
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      version: 1,
      files: []
    };
    await writeManifest(dirHandle, manifest);

    var project = {
      name: manifest.name,
      description: '',
      created: manifest.created,
      modified: manifest.modified,
      handle: dirHandle,
      processesHandle: processesHandle,
      dataModelsHandle: dataModelsHandle,
      collapsed: false,
      files: []
    };
    projects.push(project);
    activeProjectIndex = projects.length - 1;
    if (!projectPanelOpen) toggleProjectPanel();
    renderProjectTree();
    toast('📁', 'Проект «' + manifest.name + '» создан');
  } catch (e) {
    if (e.name === 'AbortError') return;
    console.error('createNewProject error:', e);
    toast('❌', 'Ошибка создания проекта');
  }
}

async function createProjectInDirectory(dirHandle) {
  var processesHandle = await dirHandle.getDirectoryHandle('processes', { create: true });
  var dataModelsHandle = await dirHandle.getDirectoryHandle('data-models', { create: true });

  var manifest = {
    name: dirHandle.name,
    description: '',
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    version: 1,
    files: []
  };
  await writeManifest(dirHandle, manifest);

  var project = {
    name: manifest.name,
    description: '',
    created: manifest.created,
    modified: manifest.modified,
    handle: dirHandle,
    processesHandle: processesHandle,
    dataModelsHandle: dataModelsHandle,
    collapsed: false,
    files: []
  };
  projects.push(project);
  activeProjectIndex = projects.length - 1;
  if (!projectPanelOpen) toggleProjectPanel();
  renderProjectTree();
  toast('📁', 'Проект «' + manifest.name + '» создан');
}

// --- Project Opening ---

async function openProjectFolder() {
  if (!('showDirectoryPicker' in window)) {
    toast('⚠️', 'Требуется Chrome или Edge');
    return;
  }
  try {
    var dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
    await openExistingProject(dirHandle);
  } catch (e) {
    if (e.name === 'AbortError') return;
    console.error('openProjectFolder error:', e);
    toast('❌', 'Ошибка открытия проекта');
  }
}

async function openExistingProject(dirHandle) {
  // Проверить дубликат
  for (var i = 0; i < projects.length; i++) {
    if (await projects[i].handle.isSameEntry(dirHandle)) {
      activeProjectIndex = i;
      renderProjectTree();
      toast('📁', 'Проект уже открыт');
      return;
    }
  }

  // Запросить права
  if ((await dirHandle.requestPermission({ mode: 'readwrite' })) !== 'granted') {
    toast('⚠️', 'Нет прав на запись');
    return;
  }

  // Читаем манифест
  var manifest = null;
  try {
    manifest = await readManifest(dirHandle);
  } catch (e) {
    if (confirm('В папке «' + dirHandle.name + '» нет project.json. Создать проект?')) {
      await createProjectInDirectory(dirHandle);
    }
    return;
  }

  // Досоздать подпапки
  var processesHandle = await dirHandle.getDirectoryHandle('processes', { create: true });
  var dataModelsHandle = await dirHandle.getDirectoryHandle('data-models', { create: true });

  // Сканировать
  var diskFiles = [];
  diskFiles = diskFiles.concat(await scanSubDirectory(processesHandle, 'processes'));
  diskFiles = diskFiles.concat(await scanSubDirectory(dataModelsHandle, 'data-models'));

  // Синхронизировать
  if (!manifest.files) manifest.files = [];
  var synced = syncManifestWithDisk(manifest, diskFiles);
  if (synced.changed) {
    manifest.files = synced.files;
    manifest.modified = new Date().toISOString();
    await writeManifest(dirHandle, manifest);
  }

  var project = {
    name: manifest.name || dirHandle.name,
    description: manifest.description || '',
    created: manifest.created,
    modified: manifest.modified,
    handle: dirHandle,
    processesHandle: processesHandle,
    dataModelsHandle: dataModelsHandle,
    collapsed: false,
    files: buildFileList(synced.changed ? synced.files : manifest.files, diskFiles)
  };

  projects.push(project);
  activeProjectIndex = projects.length - 1;
  if (!projectPanelOpen) toggleProjectPanel();
  renderProjectTree();
  updateBpmnPaletteOffset();
  toast('📁', 'Проект «' + project.name + '» открыт');
}

// --- Project Refresh ---

async function refreshProject(index) {
  var project = projects[index];
  if (!project) return;
  try {
    var processesHandle = await project.handle.getDirectoryHandle('processes', { create: true });
    var dataModelsHandle = await project.handle.getDirectoryHandle('data-models', { create: true });
    project.processesHandle = processesHandle;
    project.dataModelsHandle = dataModelsHandle;

    var diskFiles = [];
    diskFiles = diskFiles.concat(await scanSubDirectory(processesHandle, 'processes'));
    diskFiles = diskFiles.concat(await scanSubDirectory(dataModelsHandle, 'data-models'));

    var manifest = await readManifest(project.handle);
    if (!manifest.files) manifest.files = [];
    var synced = syncManifestWithDisk(manifest, diskFiles);
    if (synced.changed) {
      manifest.files = synced.files;
      manifest.modified = new Date().toISOString();
      await writeManifest(project.handle, manifest);
    }

    project.name = manifest.name || project.name;
    project.description = manifest.description || '';
    project.modified = manifest.modified;
    project.files = buildFileList(synced.changed ? synced.files : manifest.files, diskFiles);

    renderProjectTree();
    toast('✅', 'Проект обновлён');
  } catch (e) {
    console.error('refreshProject error:', e);
    toast('❌', 'Ошибка обновления проекта');
  }
}

// --- Close Project ---

function closeProject(index) {
  var project = projects[index];
  if (!project) return;

  // Собрать табы проекта
  var projectTabs = tabs.filter(function(t) { return t.projectIndex === index; });
  var hasModified = projectTabs.some(function(t) { return t.modified; });

  if (hasModified && !confirm('Проект «' + project.name + '» содержит несохранённые изменения. Закрыть?')) return;

  // Закрыть связанные табы в обратном порядке
  var tabIds = projectTabs.map(function(t) { return t.id; });
  for (var i = tabIds.length - 1; i >= 0; i--) {
    var tab = tabs.find(function(t) { return t.id === tabIds[i]; });
    if (tab) {
      tab.modified = false; // Чтобы closeTab не показывал повторный confirm
      closeTab(tab.id);
    }
  }

  // Удалить из projects
  projects.splice(index, 1);

  // Обновить projectIndex в оставшихся табах
  tabs.forEach(function(t) {
    if (t.projectIndex !== undefined && t.projectIndex > index) {
      t.projectIndex--;
    }
  });

  if (activeProjectIndex >= projects.length) {
    activeProjectIndex = projects.length - 1;
  }
  renderProjectTree();
  updateBpmnPaletteOffset();
}

// --- Create File in Project ---

async function createFileInProject(projectIndex, type) {
  var project = projects[projectIndex];
  if (!project) return;
  try {
    var ext = type === 'bpmn' ? '.bpmn' : '.erdsl';
    var defaultName = type === 'bpmn' ? 'new-process' : 'new-schema';
    var name = prompt('Имя файла:', defaultName);
    if (!name) return;
    name = name.trim();
    if (!name.endsWith(ext)) name += ext;

    // Валидация
    var error = validateFileName(name);
    if (error) { toast('⚠️', error); return; }

    var targetDirHandle = type === 'bpmn' ? project.processesHandle : project.dataModelsHandle;
    var folderName = type === 'bpmn' ? 'processes' : 'data-models';

    // Проверка: файл уже существует?
    var exists = false;
    try {
      await targetDirHandle.getFileHandle(name);
      exists = true;
    } catch (e) { /* не найден — ок */ }

    if (exists) {
      if (!confirm('Файл «' + name + '» уже существует. Перезаписать?')) return;
    }

    // Создать файл
    var fileHandle = await targetDirHandle.getFileHandle(name, { create: true });
    var writable = await fileHandle.createWritable();
    var content = type === 'bpmn'
      ? (typeof getDefaultBpmnXml === 'function' ? getDefaultBpmnXml() : '')
      : (typeof getDefaultErDsl === 'function' ? getDefaultErDsl() : DEFAULT_ER_DSL);
    await writable.write(content);
    await writable.close();

    // Обновить манифест
    var manifest = await readManifest(project.handle);
    var filePath = folderName + '/' + name;
    manifest.files = manifest.files.filter(function(f) { return f.path !== filePath; });
    manifest.files.push({ path: filePath });
    manifest.modified = new Date().toISOString();
    await writeManifest(project.handle, manifest);

    // Обновить модель
    project.files = project.files.filter(function(f) { return f.path !== filePath; });
    project.files.push({
      name: name,
      path: filePath,
      label: null,
      description: null,
      type: type === 'bpmn' ? 'bpmn' : 'er',
      handle: fileHandle,
      folder: folderName
    });
    project.modified = manifest.modified;
    renderProjectTree();

    // Открыть в редакторе
    var tabType = type === 'bpmn' ? 'bpmn' : 'er';
    await createNewTab(name, content, fileHandle, tabType, projectIndex, filePath);
    toast('✅', '«' + name + '» создан');
  } catch (e) {
    if (e.name === 'AbortError') return;
    console.error('createFileInProject error:', e);
    toast('❌', 'Ошибка создания файла');
  }
}

// --- Open File from Tree ---

async function openFileFromTree(projectIndex, fileIndex) {
  var project = projects[projectIndex];
  var file = project.files[fileIndex];
  if (!file) return;

  // Проверить: уже открыт в табе?
  var existingTab = findTabByProjectFile(projectIndex, file.path);
  if (existingTab) {
    await switchTab(existingTab.id);
    return;
  }

  // Попытка прочитать файл
  var content;
  try {
    var fileObj = await file.handle.getFile();
    content = await fileObj.text();
  } catch (e) {
    toast('⚠️', 'Файл не найден или недоступен. Нажмите ↻ для обновления дерева.');
    console.error('openFileFromTree: file read failed:', e);
    return;
  }

  var displayName = file.label || file.name.replace(/\.[^.]+$/, '');

  if (file.type === 'bpmn') {
    await createNewTab(displayName, content, file.handle, 'bpmn', projectIndex, file.path);
  } else if (file.type === 'er') {
    await createNewTab(displayName, content, file.handle, 'er', projectIndex, file.path);
  }
}

// --- Rename Label ---

async function renameFileLabel(projectIndex, fileIndex) {
  var project = projects[projectIndex];
  var file = project.files[fileIndex];
  if (!file) return;

  var currentLabel = file.label || file.name.replace(/\.[^.]+$/, '');
  var newLabel = prompt('Отображаемое имя:', currentLabel);
  if (!newLabel || newLabel === currentLabel) return;

  file.label = newLabel.trim() || null;

  // Обновить манифест
  try {
    var manifest = await readManifest(project.handle);
    var entry = manifest.files.find(function(f) { return f.path === file.path; });
    if (entry) {
      entry.label = file.label;
      manifest.modified = new Date().toISOString();
      await writeManifest(project.handle, manifest);
      project.modified = manifest.modified;
    }
  } catch (e) {
    console.error('renameFileLabel error:', e);
  }
  renderProjectTree();
}

// --- Render Project Tree ---

function renderProjectTree() {
  var container = document.getElementById('projectTreeEl');
  if (!container) return;
  container.innerHTML = '';

  if (projects.length === 0) {
    // Показать подсказку из localStorage
    var html = '<div style="padding:16px;color:var(--text-muted);font-size:11px;text-align:center;">';
    html += 'Нет открытых проектов.<br><br>';
    try {
      var recent = JSON.parse(localStorage.getItem('bpmn-recent-projects') || '[]');
      if (recent.length > 0) {
        html += '<div style="text-align:left;margin-top:8px;"><b>Последние:</b><br>';
        recent.forEach(function(r) {
          html += '<div style="padding:2px 0;color:var(--text-secondary);">📁 ' + escHtml(r.name) + '</div>';
        });
        html += '<div style="margin-top:6px;font-size:10px;">Откройте папку заново</div></div>';
      }
    } catch (e) {}
    html += '</div>';
    container.innerHTML = html;
    return;
  }

  projects.forEach(function(project, pi) {
    var isActive = (pi === activeProjectIndex);
    var projectDiv = document.createElement('div');

    // Заголовок проекта
    var header = document.createElement('div');
    header.className = 'pt-project-header' + (isActive ? ' active-project' : '');
    if (project.description) header.title = project.description;

    var nameSpan = document.createElement('span');
    nameSpan.textContent = (project.collapsed ? '▸' : '▾') + ' 📁 ' + project.name;
    nameSpan.style.cursor = 'pointer';
    nameSpan.style.flex = '1';
    nameSpan.style.overflow = 'hidden';
    nameSpan.style.textOverflow = 'ellipsis';
    nameSpan.style.whiteSpace = 'nowrap';
    nameSpan.onclick = function() {
      project.collapsed = !project.collapsed;
      renderProjectTree();
    };
    header.appendChild(nameSpan);

    var btns = document.createElement('span');
    btns.style.cssText = 'display:flex;gap:2px;flex-shrink:0;';
    btns.innerHTML = '<span class="pt-group-add" title="Сохранить проект" onclick="event.stopPropagation();saveProject(' + pi + ')">💾</span>'
      + '<span class="pt-group-add" title="Обновить" onclick="event.stopPropagation();refreshProject(' + pi + ')">↻</span>'
      + '<span class="pt-group-add" title="Закрыть проект" onclick="event.stopPropagation();closeProject(' + pi + ')">✕</span>';
    header.appendChild(btns);
    projectDiv.appendChild(header);

    if (!project.collapsed) {
      // Группа: Процессы
      var bpmnFiles = project.files.filter(function(f) { return f.folder === 'processes'; });
      projectDiv.appendChild(renderGroup('Процессы', bpmnFiles, pi, 'bpmn'));

      // Группа: Модели данных
      var erFiles = project.files.filter(function(f) { return f.folder === 'data-models'; });
      projectDiv.appendChild(renderGroup('Модели данных', erFiles, pi, 'er'));
    }

    container.appendChild(projectDiv);
  });

  // Сохранить последние проекты в localStorage
  saveRecentProjects();
}

function renderGroup(title, files, projectIndex, type) {
  var group = document.createElement('div');

  var groupHeader = document.createElement('div');
  groupHeader.className = 'pt-group';
  var titleSpan = document.createElement('span');
  titleSpan.textContent = '📂 ' + title;
  groupHeader.appendChild(titleSpan);

  var addBtn = document.createElement('span');
  addBtn.className = 'pt-group-add';
  addBtn.textContent = '＋';
  addBtn.title = 'Создать файл';
  addBtn.onclick = function(e) {
    e.stopPropagation();
    createFileInProject(projectIndex, type);
  };
  groupHeader.appendChild(addBtn);
  group.appendChild(groupHeader);

  files.forEach(function(file, fi) {
    // Найти реальный индекс файла в project.files
    var project = projects[projectIndex];
    var realIndex = project.files.indexOf(file);

    var fileEl = document.createElement('div');
    fileEl.className = 'pt-file';

    // Проверка: файл открыт в табе?
    var openTab = findTabByProjectFile(projectIndex, file.path);
    if (openTab) fileEl.classList.add('active');

    var displayName = file.label || file.name.replace(/\.[^.]+$/, '');
    var icon = file.type === 'bpmn' ? '📄' : '📐';
    fileEl.textContent = icon + ' ' + displayName;

    // Тултип
    var tooltip = file.name;
    if (file.description) tooltip = file.description + '\n' + file.name;
    fileEl.title = tooltip;

    // Click — visual highlight
    fileEl.addEventListener('click', function(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        renameFileLabel(projectIndex, realIndex);
        return;
      }
      // Убрать выделение со всех файлов
      var allFiles = document.querySelectorAll('.pt-file');
      for (var j = 0; j < allFiles.length; j++) allFiles[j].classList.remove('selected');
      fileEl.classList.add('selected');
      activeProjectIndex = projectIndex;
    });

    // Dblclick — open file
    fileEl.addEventListener('dblclick', function() {
      openFileFromTree(projectIndex, realIndex);
    });

    group.appendChild(fileEl);
  });

  return group;
}

// --- Recent Projects (localStorage) ---

function saveRecentProjects() {
  try {
    var recent = projects.map(function(p) {
      return { name: p.name, lastOpened: new Date().toISOString() };
    });
    localStorage.setItem('bpmn-recent-projects', JSON.stringify(recent));
  } catch (e) {}
}

// --- Update Project Modified ---

async function updateProjectModified() {
  if (activeProjectIndex === -1) return;
  var project = projects[activeProjectIndex];
  if (!project) return;
  try {
    var manifest = await readManifest(project.handle);
    manifest.modified = new Date().toISOString();
    await writeManifest(project.handle, manifest);
    project.modified = manifest.modified;
  } catch (e) {
    console.error('updateProjectModified error:', e);
  }
}

// --- Save Project ---

async function saveProject(index) {
  var project = projects[index];
  if (!project) return;

  // Sync active BPMN tab state so tab.xml is fresh
  if (activeTabId) {
    try { await saveCurrentTabState(); } catch (e) {}
  }

  var saveQueue = [];

  // Collect modified tabs for this project (both BPMN and ER)
  tabs.forEach(function(tab) {
    if (tab.projectIndex === index && tab.modified && tab.fileHandle) {
      var content = tab.type === 'er' ? tab.dsl : tab.xml;
      saveQueue.push({
        name: tab.name,
        fileHandle: tab.fileHandle,
        content: content,
        clearModified: function() { tab.modified = false; }
      });
    }
  });

  if (saveQueue.length === 0) {
    toast('💾', 'Нет несохранённых файлов');
    return;
  }

  var saved = 0;
  var errors = [];

  for (var i = 0; i < saveQueue.length; i++) {
    var item = saveQueue[i];
    try {
      await writeToFileHandle(item.fileHandle, item.content);
      item.clearModified();
      saved++;
    } catch (e) {
      console.error('saveProject: failed to save ' + item.name, e);
      errors.push(item.name);
    }
  }

  renderTabs();

  // Update project.json timestamp
  try {
    var manifest = await readManifest(project.handle);
    manifest.modified = new Date().toISOString();
    await writeManifest(project.handle, manifest);
    project.modified = manifest.modified;
  } catch (e) {
    console.error('saveProject: manifest update error', e);
  }

  // Russian plural for "файл"
  function pluralFiles(n) {
    if (n % 10 === 1 && n % 100 !== 11) return 'файл';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'файла';
    return 'файлов';
  }

  if (errors.length === 0) {
    toast('💾', 'Сохранено ' + saved + ' ' + pluralFiles(saved));
  } else {
    toast('⚠️', 'Сохранено ' + saved + ' из ' + saveQueue.length + ' ' + pluralFiles(saveQueue.length));
  }
}

// --- Toggle & Resize ---

function toggleProjectPanel() {
  projectPanelOpen = !projectPanelOpen;
  var panel = document.getElementById('projectPanelEl');
  var handle = document.getElementById('projectResizeEl');
  if (panel) panel.classList.toggle('open', projectPanelOpen);
  if (handle) handle.classList.toggle('open', projectPanelOpen);
  updateBpmnPaletteOffset();
  // Уведомить bpmn-js о ресайзе
  setTimeout(function() {
    try { bpmnModeler.get('canvas').resized(); } catch (e) {}
  }, 50);
}

function updateBpmnPaletteOffset() {
  var palette = document.querySelector('.djs-palette');
  if (!palette) return;
  var panel = document.getElementById('projectPanelEl');
  if (panel && panel.classList.contains('open')) {
    palette.style.left = (panel.offsetWidth + 24) + 'px';
  } else {
    palette.style.left = '16px';
  }
}

// --- Init ---

function initProjectPanel() {
  // Resize handle
  var handle = document.getElementById('projectResizeEl');
  var panel = document.getElementById('projectPanelEl');
  if (!handle || !panel) return;

  var dragging = false, startX = 0, startW = 0;

  handle.addEventListener('mousedown', function(e) {
    if (!projectPanelOpen) return;
    dragging = true;
    startX = e.clientX;
    startW = panel.offsetWidth;
    handle.classList.add('dragging');
    e.preventDefault();
  });

  window.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    var w = Math.max(180, Math.min(500, startW + (e.clientX - startX)));
    panel.style.width = w + 'px';
  });

  window.addEventListener('mouseup', function() {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    updateBpmnPaletteOffset();
    try { bpmnModeler.get('canvas').resized(); } catch (e) {}
  });

  // Показать подсказку с последними проектами при старте
  renderProjectTree();
}
