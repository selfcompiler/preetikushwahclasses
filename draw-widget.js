(function() {
  'use strict';
  var css = document.createElement('style');
  css.textContent = [
    '.dw-fab{position:fixed;bottom:90px;right:24px;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;cursor:pointer;z-index:9999;box-shadow:0 4px 16px rgba(124,58,237,0.4);display:flex;align-items:center;justify-content:center;font-size:24px;transition:all 0.3s;font-family:sans-serif;}',
    '.dw-fab:hover{transform:scale(1.1);box-shadow:0 6px 24px rgba(124,58,237,0.5);}',
    '.dw-fab.open{background:linear-gradient(135deg,#dc2626,#f87171);border-radius:14px;width:44px;height:44px;font-size:20px;}',
    '.dw-panel{position:fixed;bottom:0;right:0;width:420px;height:70vh;max-height:600px;background:#fff;border-radius:18px 0 0 0;box-shadow:-4px -4px 30px rgba(0,0,0,0.18);z-index:9998;display:none;flex-direction:column;overflow:hidden;transition:all 0.3s;}',
    '.dw-panel.visible{display:flex;animation:dwSlideIn 0.3s ease;}',
    '.dw-panel.minimized{height:48px;min-height:48px;max-height:48px;border-radius:18px 0 0 0;}',
    '@keyframes dwSlideIn{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}',
    '.dw-header{display:flex;align-items:center;gap:8px;padding:10px 14px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;flex-shrink:0;cursor:default;user-select:none;}',
    '.dw-header-title{flex:1;font-size:14px;font-weight:800;font-family:"Nunito",sans-serif;}',
    '.dw-hbtn{background:rgba(255,255,255,0.2);border:none;color:#fff;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;font-family:sans-serif;}',
    '.dw-hbtn:hover{background:rgba(255,255,255,0.35);}',
    '.dw-toolbar{display:flex;gap:4px;padding:8px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb;flex-shrink:0;flex-wrap:wrap;align-items:center;}',
    '.dw-tbtn{padding:5px 10px;border-radius:8px;border:1.5px solid #e5e7eb;background:#fff;cursor:pointer;font-size:12px;font-weight:700;color:#374151;transition:all 0.2s;font-family:"Nunito",sans-serif;}',
    '.dw-tbtn:hover{border-color:#a78bfa;background:#faf5ff;}',
    '.dw-tbtn.active{background:#7c3aed;color:#fff;border-color:#7c3aed;}',
    '.dw-color{width:24px;height:24px;border-radius:50%;border:2.5px solid #e5e7eb;cursor:pointer;transition:all 0.2s;flex-shrink:0;}',
    '.dw-color:hover{transform:scale(1.15);}',
    '.dw-color.active{border-color:#1f2937;box-shadow:0 0 0 2px #a78bfa;}',
    '.dw-sep{width:1px;height:24px;background:#d1d5db;margin:0 4px;flex-shrink:0;}',
    '.dw-size{width:32px;padding:4px;border-radius:6px;border:1.5px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;font-family:"Nunito",sans-serif;}',
    '.dw-canvas-wrap{flex:1;position:relative;overflow:hidden;background:#fff;cursor:crosshair;}',
    '.dw-canvas-wrap.erasing{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'none\' stroke=\'%23999\' stroke-width=\'1.5\'/%3E%3C/svg%3E") 10 10, auto;}',
    '.dw-canvas{display:block;touch-action:none;}',
    '@media(max-width:500px){.dw-panel{width:100%;border-radius:18px 18px 0 0;}.dw-fab{bottom:80px;right:16px;width:46px;height:46px;font-size:20px;}}'
  ].join('\n');
  document.head.appendChild(css);

  var fab = document.createElement('button');
  fab.className = 'dw-fab';
  fab.innerHTML = '✏️';
  fab.title = 'Open Drawing Board';
  document.body.appendChild(fab);

  var panel = document.createElement('div');
  panel.className = 'dw-panel';
  panel.innerHTML = [
    '<div class="dw-header">',
    '  <span class="dw-header-title">✏️ Drawing Board</span>',
    '  <button class="dw-hbtn" id="dwMinBtn" title="Minimize">—</button>',
    '  <button class="dw-hbtn" id="dwCloseBtn" title="Close">✕</button>',
    '</div>',
    '<div class="dw-toolbar" id="dwToolbar">',
    '  <button class="dw-tbtn active" data-tool="pen">✏️ Pen</button>',
    '  <button class="dw-tbtn" data-tool="highlighter">🖍️ Highlight</button>',
    '  <button class="dw-tbtn" data-tool="eraser">⬜ Eraser</button>',
    '  <span class="dw-sep"></span>',
    '  <span class="dw-color active" data-color="#1f2937" style="background:#1f2937;" title="Black"></span>',
    '  <span class="dw-color" data-color="#dc2626" style="background:#dc2626;" title="Red"></span>',
    '  <span class="dw-color" data-color="#2563eb" style="background:#2563eb;" title="Blue"></span>',
    '  <span class="dw-color" data-color="#16a34a" style="background:#16a34a;" title="Green"></span>',
    '  <span class="dw-color" data-color="#d97706" style="background:#d97706;" title="Orange"></span>',
    '  <span class="dw-color" data-color="#7c3aed" style="background:#7c3aed;" title="Purple"></span>',
    '  <span class="dw-sep"></span>',
    '  <label style="font-size:11px;font-weight:700;color:#6b7280;">Size</label>',
    '  <input type="range" min="1" max="20" value="3" id="dwSizeSlider" style="width:60px;accent-color:#7c3aed;">',
    '  <span class="dw-sep"></span>',
    '  <button class="dw-tbtn" id="dwUndo">↩️ Undo</button>',
    '  <button class="dw-tbtn" id="dwClear" style="color:#dc2626;">🗑️ Clear</button>',
    '  <button class="dw-tbtn" id="dwSave">💾 Save</button>',
    '</div>',
    '<div class="dw-canvas-wrap" id="dwCanvasWrap">',
    '  <canvas class="dw-canvas" id="dwCanvas"></canvas>',
    '</div>'
  ].join('\n');
  document.body.appendChild(panel);

  var canvas = document.getElementById('dwCanvas');
  var ctx = canvas.getContext('2d');
  var wrap = document.getElementById('dwCanvasWrap');
  var isOpen = false, isMin = false, drawing = false;
  var tool = 'pen', color = '#1f2937', size = 3;
  var STORAGE_KEY = 'dw_strokes';
  var history = loadHistory(), currentPath = [];

  function loadHistory() {
    try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; }
    catch(e) { return []; }
  }
  function saveHistory() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); } catch(e) {}
  }

  function resizeCanvas() {
    var r = wrap.getBoundingClientRect();
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = r.width * 2;
    canvas.height = r.height * 2;
    canvas.style.width = r.width + 'px';
    canvas.style.height = r.height + 'px';
    ctx.scale(2, 2);
    ctx.putImageData(data, 0, 0);
    redraw();
  }

  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history.forEach(function(stroke) { drawStroke(stroke); });
  }

  function drawStroke(stroke) {
    if (stroke.points.length < 2) return;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (stroke.tool === 'highlighter') {
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size * 4;
    } else if (stroke.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = stroke.size * 5;
    } else {
      ctx.globalAlpha = 1;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
    }
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (var i = 1; i < stroke.points.length; i++) {
      var p0 = stroke.points[i - 1];
      var p1 = stroke.points[i];
      var mx = (p0.x + p1.x) / 2;
      var my = (p0.y + p1.y) / 2;
      ctx.quadraticCurveTo(p0.x, p0.y, mx, my);
    }
    ctx.stroke();
    ctx.restore();
  }

  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    var sx = canvas.width / 2 / rect.width;
    var sy = canvas.height / 2 / rect.height;
    var touch = e.touches ? e.touches[0] : e;
    return { x: (touch.clientX - rect.left) * sx, y: (touch.clientY - rect.top) * sy };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    var p = getPos(e);
    currentPath = [p];
  }
  function moveDraw(e) {
    if (!drawing) return;
    e.preventDefault();
    var p = getPos(e);
    currentPath.push(p);
    var stroke = { tool: tool, color: color, size: size, points: currentPath };
    redraw();
    drawStroke(stroke);
  }
  function endDraw(e) {
    if (!drawing) return;
    drawing = false;
    if (currentPath.length > 1) {
      history.push({ tool: tool, color: color, size: size, points: currentPath.slice() });
      saveHistory();
    }
    currentPath = [];
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', moveDraw);
  canvas.addEventListener('mouseup', endDraw);
  canvas.addEventListener('mouseleave', endDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', moveDraw, { passive: false });
  canvas.addEventListener('touchend', endDraw);

  fab.addEventListener('click', function() {
    if (!isOpen) {
      panel.classList.add('visible');
      panel.classList.remove('minimized');
      fab.classList.add('open');
      fab.innerHTML = '✕';
      fab.title = 'Close Drawing Board';
      isOpen = true;
      isMin = false;
      history = loadHistory();
      setTimeout(resizeCanvas, 50);
    } else {
      panel.classList.remove('visible');
      fab.classList.remove('open');
      fab.innerHTML = '✏️';
      fab.title = 'Open Drawing Board';
      isOpen = false;
      isMin = false;
    }
  });

  document.getElementById('dwMinBtn').addEventListener('click', function() {
    isMin = !isMin;
    if (isMin) {
      panel.classList.add('minimized');
      this.textContent = '□';
      this.title = 'Expand';
    } else {
      panel.classList.remove('minimized');
      this.textContent = '—';
      this.title = 'Minimize';
      setTimeout(resizeCanvas, 50);
    }
  });

  document.getElementById('dwCloseBtn').addEventListener('click', function() {
    panel.classList.remove('visible');
    fab.classList.remove('open');
    fab.innerHTML = '✏️';
    isOpen = false;
    isMin = false;
  });

  document.getElementById('dwToolbar').addEventListener('click', function(e) {
    var btn = e.target.closest('[data-tool]');
    if (btn) {
      tool = btn.dataset.tool;
      document.querySelectorAll('.dw-tbtn[data-tool]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      wrap.classList.toggle('erasing', tool === 'eraser');
    }
    var col = e.target.closest('[data-color]');
    if (col) {
      color = col.dataset.color;
      document.querySelectorAll('.dw-color').forEach(function(c) { c.classList.remove('active'); });
      col.classList.add('active');
    }
  });

  document.getElementById('dwSizeSlider').addEventListener('input', function() {
    size = parseInt(this.value);
  });

  document.getElementById('dwUndo').addEventListener('click', function() {
    history.pop();
    saveHistory();
    redraw();
  });

  document.getElementById('dwClear').addEventListener('click', function() {
    if (history.length === 0 || confirm('Clear the entire drawing?')) {
      history = [];
      saveHistory();
      redraw();
    }
  });

  document.getElementById('dwSave').addEventListener('click', function() {
    var link = document.createElement('a');
    link.download = 'drawing-' + Date.now() + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  window.addEventListener('resize', function() { if (isOpen && !isMin) resizeCanvas(); });
})();
