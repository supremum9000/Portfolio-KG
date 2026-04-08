// === SHARED UTILITIES ===
// Common functions used by both BPMN and ER modules

// --- Theme ---
var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-label').textContent = theme === 'dark' ? 'Тёмная' : 'Светлая';
  document.getElementById('toggleThumb').innerHTML = theme === 'dark' ? MOON : SUN;
  if (typeof applyLocaleToDom === 'function') {
    applyLocaleToDom(document.body);
  }
}

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme');
  var next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem('bpmn-theme', next);
  } catch (error) {
    // Ignore storage errors in embedded mode.
  }
  toast(next === 'dark' ? '🌙' : '☀️', next === 'dark' ? 'Тёмная тема' : 'Светлая тема');
}

// --- Utilities ---
function escHtml(value) {
  value = String(value ?? '');
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function debounce(fn, waitMs) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, waitMs);
  };
}

function download(data, filename, type) {
  var blob = new Blob([data], { type: type });
  var url = URL.createObjectURL(blob);
  var anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

// --- Toast ---
var toastTimer;
function toast(icon, message) {
  var toastEl = document.getElementById('toastEl');
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent = message;
  toastEl.classList.add('show');
  if (typeof applyLocaleToDom === 'function') {
    applyLocaleToDom(toastEl);
  }
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toastEl.classList.remove('show');
  }, 2500);
}

// --- Modal ---
function showShortcuts() {
  document.getElementById('shortcutsModal').classList.add('active');
}

function hideShortcuts() {
  document.getElementById('shortcutsModal').classList.remove('active');
}

// --- Mode Switch ---
var currentMode = 'bpmn';

function switchMode(mode) {
  currentMode = mode;
  document.getElementById('modeBpmn').classList.toggle('active', mode === 'bpmn');
  document.getElementById('modeEr').classList.toggle('active', mode === 'er');
  document.getElementById('bpmnWorkspace').style.display = mode === 'bpmn' ? '' : 'none';
  document.getElementById('erWorkspace').classList.toggle('active', mode === 'er');
  document.getElementById('bpmnToolbar').style.display = mode === 'bpmn' ? '' : 'none';
  document.getElementById('erToolbar').style.display = mode === 'er' ? '' : 'none';
  document.title = typeof getModelerWindowTitle === 'function'
    ? getModelerWindowTitle(mode)
    : (mode === 'bpmn' ? 'BPMN Modeler' : 'ER Diagram');
  if (typeof applyLocaleToDom === 'function') {
    applyLocaleToDom(document.body);
  }
  if (typeof updateBpmnPaletteOffset === 'function') {
    updateBpmnPaletteOffset();
  }
}

function switchModeByButton(mode) {
  var targetType = mode === 'er' ? 'er' : 'bpmn';
  var active = typeof getActiveTab === 'function' ? getActiveTab() : null;
  if (active && active.type === targetType) {
    return;
  }
  var found = tabs.find(function (tab) { return tab.type === targetType; });
  if (found) {
    switchTab(found.id);
  } else {
    createNewTab(
      targetType === 'er' ? 'new-schema.erdsl' : undefined,
      targetType === 'er'
        ? (typeof getDefaultErDsl === 'function' ? getDefaultErDsl() : DEFAULT_ER_DSL)
        : undefined,
      null,
      targetType
    );
  }
}
