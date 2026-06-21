(function() {
  'use strict';
  var PAGE_H = 600;
  var GRID_GAP = 20;
  var css = document.createElement('style');
  css.textContent = [
    '.dw-fab{position:fixed;bottom:90px;right:24px;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;cursor:pointer;z-index:9999;box-shadow:0 4px 16px rgba(124,58,237,0.4);display:flex;align-items:center;justify-content:center;font-size:24px;transition:all 0.3s;font-family:sans-serif;}',
    '.dw-fab:hover{transform:scale(1.1);box-shadow:0 6px 24px rgba(124,58,237,0.5);}',
    '.dw-fab.open{background:linear-gradient(135deg,#dc2626,#f87171);border-radius:14px;width:44px;height:44px;font-size:20px;}',
    '.dw-panel{position:fixed;bottom:0;right:0;width:420px;height:70vh;min-width:280px;min-height:250px;max-width:95vw;max-height:95vh;background:#fff;border-radius:18px 0 0 0;box-shadow:-4px -4px 30px rgba(0,0,0,0.18);z-index:9998;display:none;flex-direction:column;overflow:hidden;}',
    '.dw-panel.visible{display:flex;animation:dwSlideIn 0.3s ease;}',
    '.dw-panel.minimized{height:48px!important;min-height:48px!important;max-height:48px!important;}',
    '.dw-panel.resizing{transition:none!important;user-select:none!important;}',
    '@keyframes dwSlideIn{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}',
    '.dw-resize{position:absolute;top:0;left:0;width:18px;height:18px;cursor:nw-resize;z-index:10;display:flex;align-items:center;justify-content:center;}',
    '.dw-resize::before{content:"";width:10px;height:10px;border-top:2.5px solid rgba(255,255,255,0.6);border-left:2.5px solid rgba(255,255,255,0.6);border-radius:2px 0 0 0;}',
    '.dw-header{display:flex;align-items:center;gap:8px;padding:8px 12px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;flex-shrink:0;user-select:none;}',
    '.dw-header-title{flex:1;font-size:13px;font-weight:800;font-family:"Nunito",sans-serif;}',
    '.dw-hbtn{background:rgba(255,255,255,0.2);border:none;color:#fff;width:28px;height:28px;border-radius:8px;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}',
    '.dw-hbtn:hover{background:rgba(255,255,255,0.35);}',
    '.dw-toolbar{display:flex;gap:3px;padding:5px 8px;background:#f9fafb;border-bottom:1px solid #e5e7eb;flex-shrink:0;flex-wrap:wrap;align-items:center;}',
    '.dw-tbtn{padding:3px 7px;border-radius:7px;border:1.5px solid #e5e7eb;background:#fff;cursor:pointer;font-size:10px;font-weight:700;color:#374151;transition:all 0.2s;font-family:"Nunito",sans-serif;white-space:nowrap;}',
    '.dw-tbtn:hover{border-color:#a78bfa;background:#faf5ff;}',
    '.dw-tbtn.active{background:#7c3aed;color:#fff;border-color:#7c3aed;}',
    '.dw-tbtn.toggled{background:#059669;color:#fff;border-color:#059669;}',
    '.dw-tbtn.active[data-tool="laser"]{background:linear-gradient(135deg,#f59e0b,#ef4444);border-color:#f59e0b;animation:dwLaserPulse 1.5s ease-in-out infinite;}',
    '@keyframes dwLaserPulse{0%,100%{box-shadow:0 0 6px rgba(245,158,11,0.4);}50%{box-shadow:0 0 14px rgba(245,158,11,0.7);}}',
    '.dw-color{width:18px;height:18px;border-radius:50%;border:2px solid #e5e7eb;cursor:pointer;transition:all 0.2s;flex-shrink:0;}',
    '.dw-color:hover{transform:scale(1.15);}',
    '.dw-color.active{border-color:#1f2937;box-shadow:0 0 0 2px #a78bfa;}',
    '.dw-sep{width:1px;height:18px;background:#d1d5db;margin:0 2px;flex-shrink:0;}',
    '.dw-angle-in{width:40px;padding:2px 4px;border:1.5px solid #e5e7eb;border-radius:6px;font-size:10px;font-weight:700;font-family:"Nunito",sans-serif;text-align:center;color:#374151;}',
    '.dw-angle-in:focus{outline:none;border-color:#7c3aed;}',
    '.dw-lbl{font-size:9px;font-weight:700;color:#9ca3af;white-space:nowrap;}',
    '.dw-pager{display:flex;align-items:center;gap:4px;padding:4px 8px;background:linear-gradient(135deg,#f3e8ff,#ede9fe);border-bottom:1px solid #c4b5fd;flex-shrink:0;}',
    '.dw-pgbtn{padding:3px 8px;border-radius:6px;border:1px solid #c4b5fd;background:#fff;cursor:pointer;font-size:10px;font-weight:700;color:#7c3aed;transition:all 0.2s;font-family:"Nunito",sans-serif;}',
    '.dw-pgbtn:hover{background:#ede9fe;}',
    '.dw-pgbtn:disabled{opacity:0.3;pointer-events:none;}',
    '.dw-pgbtn.add{background:linear-gradient(135deg,#f0fdf4,#dcfce7);color:#16a34a;border-color:#86efac;}',
    '.dw-pginfo{flex:1;text-align:center;font-size:10px;font-weight:800;color:#5b21b6;}',
    '.dw-scroll{flex:1;overflow-y:auto;overflow-x:hidden;background:#fff;position:relative;-webkit-overflow-scrolling:touch;scroll-behavior:smooth;}',
    '.dw-canvas{display:block;touch-action:none;cursor:crosshair;}',
    '.dw-canvas.selecting{cursor:default;}',
    '.dw-canvas.erasing{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'none\' stroke=\'%23999\' stroke-width=\'1.5\'/%3E%3C/svg%3E") 10 10, auto;}',
    '@media(max-width:500px){.dw-panel{width:100%;border-radius:18px 18px 0 0;}.dw-fab{bottom:80px;right:16px;width:46px;height:46px;font-size:20px;}.dw-hl-fab{bottom:140px!important;right:16px!important;}.dw-tbtn{font-size:9px;padding:3px 5px;}.dw-angle-in{width:32px;}}',
    '.dw-hl-fab{position:fixed;bottom:150px;right:24px;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#fbbf24);color:#78350f;border:none;cursor:pointer;z-index:9999;box-shadow:0 4px 14px rgba(245,158,11,0.4);display:flex;align-items:center;justify-content:center;font-size:20px;transition:all 0.3s;font-family:sans-serif;}',
    '.dw-hl-fab:hover{transform:scale(1.1);box-shadow:0 6px 20px rgba(245,158,11,0.5);}',
    '.dw-hl-fab.active{background:linear-gradient(135deg,#dc2626,#f87171);color:white;animation:dwHlPulse 1.5s ease-in-out infinite;}',
    '@keyframes dwHlPulse{0%,100%{box-shadow:0 4px 14px rgba(220,38,38,0.3);}50%{box-shadow:0 4px 20px rgba(220,38,38,0.6);}}',
    '.dw-page-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9990;pointer-events:none;display:none;}',
    '.dw-page-overlay.active{display:block;pointer-events:auto;cursor:crosshair;}',
    '.dw-page-overlay canvas{display:block;width:100%;height:100%;touch-action:none;}',
    '.dw-hl-bar{position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:9995;display:none;background:white;border-radius:14px;padding:6px 10px;box-shadow:0 4px 20px rgba(0,0,0,0.2);border:2px solid #f59e0b;gap:4px;align-items:center;}',
    '.dw-hl-bar.active{display:flex;}',
    '.dw-hl-bar .dw-tbtn,.dw-hl-bar .dw-color{margin:0;}',
    '.dw-hl-bar-label{font-size:11px;font-weight:800;color:#92400e;}'
  ].join('\n');
  document.head.appendChild(css);

  // === PAGE OVERLAY HIGHLIGHTER ===
  var hlFab = document.createElement('button');
  hlFab.className = 'dw-hl-fab'; hlFab.innerHTML = '🖍️'; hlFab.title = 'Highlight on page';
  document.body.appendChild(hlFab);

  var pageOverlay = document.createElement('div');
  pageOverlay.className = 'dw-page-overlay';
  pageOverlay.innerHTML = '<canvas id="dwPageCanvas"></canvas>';
  document.body.appendChild(pageOverlay);

  var hlBar = document.createElement('div');
  hlBar.className = 'dw-hl-bar';
  hlBar.innerHTML = [
    '<span class="dw-hl-bar-label">🖍️ Page Highlight</span>',
    '<span class="dw-sep"></span>',
    '<span class="dw-color hl-color active" data-hlc="#fbbf24" style="background:#fbbf24;"></span>',
    '<span class="dw-color hl-color" data-hlc="#f87171" style="background:#f87171;"></span>',
    '<span class="dw-color hl-color" data-hlc="#60a5fa" style="background:#60a5fa;"></span>',
    '<span class="dw-color hl-color" data-hlc="#4ade80" style="background:#4ade80;"></span>',
    '<span class="dw-color hl-color" data-hlc="#c084fc" style="background:#c084fc;"></span>',
    '<span class="dw-sep"></span>',
    '<span style="font-size:9px;font-weight:700;color:#6b7280;">Fades in 5s</span>'
  ].join('');
  document.body.appendChild(hlBar);

  var hlOn = false, hlColor = '#fbbf24';
  var pgCanvas = document.getElementById('dwPageCanvas');
  var pgCtx = pgCanvas.getContext('2d');
  var pgStrokes = [], pgDrawing = false, pgCurPath = [];
  var pgFadeTimer = null, PG_FADE_MS = 5000;
  var pgGestureDecided = false, pgGestureIsScroll = false;
  var pgRawStart = null, pgLastScrollY = 0;

  function resizePageCanvas() {
    var dpr = window.devicePixelRatio || 1;
    var vv = window.visualViewport;
    var w, h;
    if (vv) {
      w = vv.width; h = vv.height;
      pageOverlay.style.left = vv.offsetLeft + 'px';
      pageOverlay.style.top = vv.offsetTop + 'px';
      pageOverlay.style.width = w + 'px';
      pageOverlay.style.height = h + 'px';
    } else {
      w = window.innerWidth; h = window.innerHeight;
    }
    pgCanvas.width = w * dpr; pgCanvas.height = h * dpr;
    pgCanvas.style.width = w + 'px'; pgCanvas.style.height = h + 'px';
    pgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    renderPageStrokes();
  }

  function renderPageStrokes() {
    pgCtx.clearRect(0, 0, pgCanvas.width, pgCanvas.height);
    var now = Date.now();
    pgStrokes.forEach(function(s) {
      if (!s.points || s.points.length < 2) return;
      var age = now - s.ts;
      if (age >= PG_FADE_MS) return;
      var fadeStart = PG_FADE_MS * 0.6;
      var alpha = age > fadeStart ? Math.max(0, 1 - (age - fadeStart) / (PG_FADE_MS - fadeStart)) : 1;
      pgCtx.save();
      pgCtx.lineCap = 'round'; pgCtx.lineJoin = 'round';
      pgCtx.globalAlpha = 0.35 * alpha;
      pgCtx.strokeStyle = s.color; pgCtx.lineWidth = 18;
      pgCtx.shadowColor = s.color; pgCtx.shadowBlur = 8 * alpha;
      pgCtx.beginPath();
      pgCtx.moveTo(s.points[0].x, s.points[0].y);
      for (var i = 1; i < s.points.length; i++) {
        var a = s.points[i-1], b = s.points[i];
        pgCtx.quadraticCurveTo(a.x, a.y, (a.x+b.x)/2, (a.y+b.y)/2);
      }
      pgCtx.stroke(); pgCtx.restore();
    });
  }

  function startPgFade() {
    if (pgFadeTimer) return;
    pgFadeTimer = setInterval(function() {
      var now = Date.now();
      pgStrokes = pgStrokes.filter(function(s) { return (now - s.ts) < PG_FADE_MS; });
      renderPageStrokes();
      if (pgStrokes.length === 0) { clearInterval(pgFadeTimer); pgFadeTimer = null; }
    }, 150);
  }

  function getPgPos(e) {
    var t = e.touches ? e.touches[0] : e;
    var rect = pgCanvas.getBoundingClientRect();
    var cssW = parseFloat(pgCanvas.style.width) || rect.width;
    var cssH = parseFloat(pgCanvas.style.height) || rect.height;
    return {
      x: (t.clientX - rect.left) * (cssW / rect.width),
      y: (t.clientY - rect.top) * (cssH / rect.height)
    };
  }

  pgCanvas.addEventListener('mousedown', function(e) { e.preventDefault(); pgDrawing = true; pgCurPath = [getPgPos(e)]; });
  pgCanvas.addEventListener('mousemove', function(e) {
    if (!pgDrawing) return; e.preventDefault();
    pgCurPath.push(getPgPos(e));
    renderPageStrokes();
    pgCtx.save(); pgCtx.lineCap = 'round'; pgCtx.lineJoin = 'round';
    pgCtx.globalAlpha = 0.35; pgCtx.strokeStyle = hlColor; pgCtx.lineWidth = 18;
    pgCtx.shadowColor = hlColor; pgCtx.shadowBlur = 8;
    pgCtx.beginPath(); pgCtx.moveTo(pgCurPath[0].x, pgCurPath[0].y);
    for (var i = 1; i < pgCurPath.length; i++) {
      var a = pgCurPath[i-1], b = pgCurPath[i];
      pgCtx.quadraticCurveTo(a.x, a.y, (a.x+b.x)/2, (a.y+b.y)/2);
    }
    pgCtx.stroke(); pgCtx.restore();
  });
  pgCanvas.addEventListener('mouseup', pgEnd);
  pgCanvas.addEventListener('mouseleave', pgEnd);
  pgCanvas.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) { pgDrawing = false; pgGestureDecided = false; return; }
    e.preventDefault();
    pgGestureDecided = false; pgGestureIsScroll = false; pgDrawing = false;
    pgRawStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    pgCurPath = [getPgPos(e)];
  }, {passive:false});
  pgCanvas.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1 || !pgRawStart) return;
    e.preventDefault();
    var rawX = e.touches[0].clientX, rawY = e.touches[0].clientY;
    if (!pgGestureDecided) {
      var dx = Math.abs(rawX - pgRawStart.x), dy = Math.abs(rawY - pgRawStart.y);
      if (dx < 4 && dy < 4) return;
      if (dy > dx * 1.8 && dy > 6) {
        pgGestureIsScroll = true; pgGestureDecided = true; pgCurPath = []; pgLastScrollY = rawY; return;
      }
      pgGestureDecided = true; pgDrawing = true;
    }
    if (pgGestureIsScroll) {
      window.scrollBy(0, pgLastScrollY - rawY); pgLastScrollY = rawY; return;
    }
    if (!pgDrawing) return;
    pgCurPath.push(getPgPos(e));
    renderPageStrokes();
    pgCtx.save(); pgCtx.lineCap = 'round'; pgCtx.lineJoin = 'round';
    pgCtx.globalAlpha = 0.35; pgCtx.strokeStyle = hlColor; pgCtx.lineWidth = 18;
    pgCtx.shadowColor = hlColor; pgCtx.shadowBlur = 8;
    pgCtx.beginPath(); pgCtx.moveTo(pgCurPath[0].x, pgCurPath[0].y);
    for (var i = 1; i < pgCurPath.length; i++) {
      var a = pgCurPath[i-1], b = pgCurPath[i];
      pgCtx.quadraticCurveTo(a.x, a.y, (a.x+b.x)/2, (a.y+b.y)/2);
    }
    pgCtx.stroke(); pgCtx.restore();
  }, {passive:false});
  pgCanvas.addEventListener('touchend', function() {
    if (pgGestureIsScroll) { pgGestureIsScroll = false; pgGestureDecided = false; pgRawStart = null; return; }
    pgEnd(); pgGestureDecided = false; pgRawStart = null;
  });

  function pgEnd() {
    if (!pgDrawing) return; pgDrawing = false;
    if (pgCurPath.length > 1) {
      pgStrokes.push({ color: hlColor, points: pgCurPath.slice(), ts: Date.now() });
      startPgFade();
    }
    pgCurPath = [];
  }

  hlFab.addEventListener('click', function() {
    hlOn = !hlOn;
    hlFab.classList.toggle('active', hlOn);
    pageOverlay.classList.toggle('active', hlOn);
    hlBar.classList.toggle('active', hlOn);
    hlFab.innerHTML = hlOn ? '✕' : '🖍️';
    hlFab.title = hlOn ? 'Stop highlighting' : 'Highlight on page';
    if (hlOn) resizePageCanvas();
  });

  hlBar.addEventListener('click', function(e) {
    var c = e.target.closest('.hl-color');
    if (c) {
      hlColor = c.dataset.hlc;
      hlBar.querySelectorAll('.hl-color').forEach(function(el) { el.classList.remove('active'); });
      c.classList.add('active');
    }
  });

  window.addEventListener('resize', function() { if (hlOn) resizePageCanvas(); });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', function() { if (hlOn) resizePageCanvas(); });
    window.visualViewport.addEventListener('scroll', function() { if (hlOn) resizePageCanvas(); });
  }

  // === DRAWING BOARD ===
  var FREEHAND_TOOLS = { pen:1, dpen:1, highlighter:1, laser:1, eraser:1 };
  var SHAPE_TOOLS = { line:1, dline:1, arrow:1, rect:1, circle:1, angleline:1 };
  var MULTI_CLICK = { triangle:1 };
  var CLICK_TOOLS = { measure:1, select:1 };

  var fab = document.createElement('button');
  fab.className = 'dw-fab'; fab.innerHTML = '✏️'; fab.title = 'Drawing Board';
  document.body.appendChild(fab);

  var panel = document.createElement('div');
  panel.className = 'dw-panel';
  panel.innerHTML = [
    '<div class="dw-resize" id="dwResize"></div>',
    '<div class="dw-header">',
    '  <span class="dw-header-title">✏️ Drawing Board</span>',
    '  <button class="dw-hbtn" id="dwMinBtn" title="Minimize">—</button>',
    '  <button class="dw-hbtn" id="dwCloseBtn" title="Close">✕</button>',
    '</div>',
    '<div class="dw-toolbar" id="dwToolbar">',
    '  <button class="dw-tbtn active" data-tool="pen">✏️ Pen</button>',
    '  <button class="dw-tbtn" data-tool="dpen">┈ Dash</button>',
    '  <button class="dw-tbtn" data-tool="highlighter">🖍️</button>',
    '  <button class="dw-tbtn" data-tool="laser">🔦</button>',
    '  <button class="dw-tbtn" data-tool="eraser">⬜</button>',
    '  <span class="dw-sep"></span>',
    '  <span class="dw-color active" data-color="#1f2937" style="background:#1f2937;"></span>',
    '  <span class="dw-color" data-color="#dc2626" style="background:#dc2626;"></span>',
    '  <span class="dw-color" data-color="#2563eb" style="background:#2563eb;"></span>',
    '  <span class="dw-color" data-color="#16a34a" style="background:#16a34a;"></span>',
    '  <span class="dw-color" data-color="#7c3aed" style="background:#7c3aed;"></span>',
    '  <span class="dw-color" data-color="#ffffff" style="background:#ffffff;border-color:#aaa;"></span>',
    '  <span class="dw-sep"></span>',
    '  <input type="range" min="1" max="20" value="3" id="dwSizeSlider" style="width:44px;accent-color:#7c3aed;">',
    '  <span class="dw-sep"></span>',
    '  <button class="dw-tbtn" id="dwUndo">↩</button>',
    '  <button class="dw-tbtn" id="dwClear" style="color:#dc2626;">🗑</button>',
    '  <button class="dw-tbtn" id="dwSave">💾</button>',
    '</div>',
    '<div class="dw-toolbar" id="dwToolbar2">',
    '  <button class="dw-tbtn" data-tool="select">↔ Select</button>',
    '  <span class="dw-sep"></span>',
    '  <span class="dw-lbl">Shapes:</span>',
    '  <button class="dw-tbtn" data-tool="line">📏 Line</button>',
    '  <button class="dw-tbtn" data-tool="dline">┈ Line</button>',
    '  <button class="dw-tbtn" data-tool="arrow">→ Arrow</button>',
    '  <button class="dw-tbtn" data-tool="rect">▭ Rect</button>',
    '  <button class="dw-tbtn" data-tool="triangle">△ Tri</button>',
    '  <button class="dw-tbtn" data-tool="circle">○ Circle</button>',
    '  <span class="dw-sep"></span>',
    '  <button class="dw-tbtn" id="dwGridBtn">⊡ Grid</button>',
    '  <button class="dw-tbtn" id="dwLabelBtn">Aa Len</button>',
    '  <span class="dw-sep"></span>',
    '  <span class="dw-lbl">Angle:</span>',
    '  <input type="number" class="dw-angle-in" id="dwAngle" min="0" max="360" value="45">',
    '  <button class="dw-tbtn" data-tool="angleline">⦟°</button>',
    '  <span class="dw-sep"></span>',
    '  <button class="dw-tbtn" data-tool="measure">⦟ Measure</button>',
    '</div>',
    '<div class="dw-pager">',
    '  <button class="dw-pgbtn" id="dwPrevPg" disabled>⬆ Prev</button>',
    '  <span class="dw-pginfo" id="dwPgInfo">Page 1 / 3</span>',
    '  <button class="dw-pgbtn" id="dwNextPg">⬇ Next</button>',
    '  <button class="dw-pgbtn add" id="dwAddPg">+ Page</button>',
    '</div>',
    '<div class="dw-scroll" id="dwScroll">',
    '  <canvas class="dw-canvas" id="dwCanvas"></canvas>',
    '</div>'
  ].join('\n');
  document.body.appendChild(panel);

  var canvas = document.getElementById('dwCanvas');
  var ctx = canvas.getContext('2d');
  var scrollArea = document.getElementById('dwScroll');
  var isOpen = false, isMin = false, drawing = false;
  var tool = 'pen', color = '#1f2937', size = 3;
  var STORAGE_KEY = 'dw_strokes';
  var totalPages = 3, curPage = 1;
  var history = [], currentPath = [];
  var LASER_FADE_MS = 5000;
  var laserTimer = null;

  // Shape state
  var shapeP1 = null, shapeP2 = null;
  var triPoints = [];
  var showGrid = false, showLabels = false;
  var inputAngle = 45;

  // Select/move state
  var selectedIdx = -1;
  var dragMode = 'none'; // 'none', 'move', 'handle'
  var dragHandleIdx = -1;
  var dragStart = null;

  function loadH() { try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; } catch(e) { return []; } }
  function saveH() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); } catch(e) {} }
  history = loadH();
  if (history.length) {
    var maxY = 0;
    history.forEach(function(s) {
      if (s.points) s.points.forEach(function(p) { if (p.y > maxY) maxY = p.y; });
      if (s.p1 && s.p1.y > maxY) maxY = s.p1.y;
      if (s.p2 && s.p2.y > maxY) maxY = s.p2.y;
      if (s.center && s.center.y + (s.radius||0) > maxY) maxY = s.center.y + s.radius;
    });
    totalPages = Math.max(3, Math.ceil((maxY + 150) / PAGE_H));
  }

  function snapPt(p) {
    if (!showGrid) return p;
    return { x: Math.round(p.x / GRID_GAP) * GRID_GAP, y: Math.round(p.y / GRID_GAP) * GRID_GAP };
  }

  function dist(a, b) { return Math.sqrt((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y)); }
  function angleDeg(a, b) { return Math.atan2(b.y-a.y, b.x-a.x) * 180 / Math.PI; }

  function setupCanvas() {
    var w = scrollArea.clientWidth || 300;
    var h = totalPages * PAGE_H;
    canvas.width = w * 2; canvas.height = h * 2;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    redraw();
  }

  function drawGrid(w, h) {
    ctx.save();
    ctx.fillStyle = '#c4b5fd';
    for (var y = 0; y < h; y += GRID_GAP) {
      for (var x = 0; x < w; x += GRID_GAP) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function redraw() {
    var w = canvas.width / 2;
    var h = totalPages * PAGE_H;
    var now = Date.now();
    ctx.clearRect(0, 0, w, h);

    if (showGrid) drawGrid(w, h);

    ctx.save(); ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 0.5; ctx.setLineDash([4, 4]);
    for (var i = 1; i < totalPages; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * PAGE_H); ctx.lineTo(w, i * PAGE_H); ctx.stroke();
      ctx.fillStyle = '#d1d5db'; ctx.font = '10px sans-serif'; ctx.fillText('Page ' + (i + 1), 8, i * PAGE_H + 14);
    }
    ctx.setLineDash([]); ctx.restore();
    history.forEach(function(s) { drawStroke(s, now); });
    if (tool === 'select' && selectedIdx >= 0) drawSelectionHandles(selectedIdx);
  }

  // === STROKE RENDERING ===
  function drawStroke(s, now) {
    if (s.tool in FREEHAND_TOOLS) drawFreehand(s, now);
    else if (s.tool === 'line' || s.tool === 'dline' || s.tool === 'angleline') drawLine(s);
    else if (s.tool === 'arrow') drawArrow(s);
    else if (s.tool === 'rect') drawRect(s);
    else if (s.tool === 'circle') drawCircle(s);
    else if (s.tool === 'triangle') drawTriangle(s);
    else if (s.tool === 'angle-mark') drawAngleMark(s);
    else drawFreehand(s, now);
  }

  function drawFreehand(s, now) {
    if (!s.points || s.points.length < 2) return;
    var alpha = 1;
    if (s.tool === 'laser' && s.ts && now) {
      var age = now - s.ts;
      var fadeStart = LASER_FADE_MS * 0.6;
      if (age >= LASER_FADE_MS) return;
      if (age > fadeStart) alpha = Math.max(0, 1 - (age - fadeStart) / (LASER_FADE_MS - fadeStart));
    }
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (s.tool === 'laser') {
      ctx.globalAlpha = 0.45 * alpha; ctx.strokeStyle = s.color; ctx.lineWidth = s.size * 5;
      ctx.shadowColor = s.color; ctx.shadowBlur = 12 * alpha;
    } else if (s.tool === 'highlighter') {
      ctx.globalAlpha = 0.3; ctx.strokeStyle = s.color; ctx.lineWidth = s.size * 4;
    } else if (s.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'; ctx.strokeStyle = 'rgba(0,0,0,1)'; ctx.lineWidth = s.size * 5;
    } else if (s.tool === 'dpen') {
      ctx.globalAlpha = 1; ctx.strokeStyle = s.color; ctx.lineWidth = s.size; ctx.setLineDash([8, 6]);
    } else {
      ctx.globalAlpha = 1; ctx.strokeStyle = s.color; ctx.lineWidth = s.size;
    }
    ctx.beginPath(); ctx.moveTo(s.points[0].x, s.points[0].y);
    for (var i = 1; i < s.points.length; i++) {
      var a = s.points[i - 1], b = s.points[i];
      ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
    }
    ctx.stroke(); ctx.restore();
  }

  function drawLine(s) {
    if (!s.p1 || !s.p2) return;
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = s.color; ctx.lineWidth = s.size;
    if (s.tool === 'dline') ctx.setLineDash([8, 6]);
    ctx.beginPath(); ctx.moveTo(s.p1.x, s.p1.y); ctx.lineTo(s.p2.x, s.p2.y); ctx.stroke();
    ctx.setLineDash([]);
    if (showLabels) drawLengthLabel(s.p1, s.p2, s.color);
    if (s.angleDeg !== undefined) drawProtractor(s.p1, s.p2, s.color);
    ctx.restore();
  }

  function drawArrow(s) {
    if (!s.p1 || !s.p2) return;
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = s.color; ctx.lineWidth = s.size;
    ctx.beginPath(); ctx.moveTo(s.p1.x, s.p1.y); ctx.lineTo(s.p2.x, s.p2.y); ctx.stroke();
    // arrowhead
    var ang = Math.atan2(s.p2.y - s.p1.y, s.p2.x - s.p1.x);
    var hl = Math.max(10, s.size * 4);
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.moveTo(s.p2.x, s.p2.y);
    ctx.lineTo(s.p2.x - hl * Math.cos(ang - 0.4), s.p2.y - hl * Math.sin(ang - 0.4));
    ctx.lineTo(s.p2.x - hl * Math.cos(ang + 0.4), s.p2.y - hl * Math.sin(ang + 0.4));
    ctx.closePath(); ctx.fill();
    if (showLabels) drawLengthLabel(s.p1, s.p2, s.color);
    ctx.restore();
  }

  function drawRect(s) {
    if (!s.p1 || !s.p2) return;
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = s.color; ctx.lineWidth = s.size;
    if (s.dash) ctx.setLineDash(s.dash);
    var x = Math.min(s.p1.x, s.p2.x), y = Math.min(s.p1.y, s.p2.y);
    var w = Math.abs(s.p2.x - s.p1.x), h = Math.abs(s.p2.y - s.p1.y);
    ctx.strokeRect(x, y, w, h);
    if (showLabels) {
      drawLengthLabel({x:x, y:y}, {x:x+w, y:y}, s.color);
      drawLengthLabel({x:x+w, y:y}, {x:x+w, y:y+h}, s.color);
    }
    ctx.restore();
  }

  function drawCircle(s) {
    if (!s.center || !s.radius) return;
    ctx.save(); ctx.strokeStyle = s.color; ctx.lineWidth = s.size;
    if (s.dash) ctx.setLineDash(s.dash);
    ctx.beginPath(); ctx.arc(s.center.x, s.center.y, s.radius, 0, Math.PI * 2); ctx.stroke();
    // center dot
    ctx.fillStyle = s.color;
    ctx.beginPath(); ctx.arc(s.center.x, s.center.y, 2.5, 0, Math.PI * 2); ctx.fill();
    if (showLabels) {
      ctx.font = 'bold 10px sans-serif'; ctx.fillStyle = s.color;
      ctx.fillText('r=' + Math.round(s.radius) + 'px', s.center.x + 6, s.center.y - 6);
    }
    ctx.restore();
  }

  function drawTriangle(s) {
    if (!s.points || s.points.length < 3) return;
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = s.color; ctx.lineWidth = s.size;
    if (s.dash) ctx.setLineDash(s.dash);
    ctx.beginPath();
    ctx.moveTo(s.points[0].x, s.points[0].y);
    ctx.lineTo(s.points[1].x, s.points[1].y);
    ctx.lineTo(s.points[2].x, s.points[2].y);
    ctx.closePath(); ctx.stroke();
    if (showLabels) {
      drawLengthLabel(s.points[0], s.points[1], s.color);
      drawLengthLabel(s.points[1], s.points[2], s.color);
      drawLengthLabel(s.points[2], s.points[0], s.color);
      drawTriangleAngles(s.points, s.color);
    }
    ctx.restore();
  }

  function drawLengthLabel(a, b, col) {
    var d = Math.round(dist(a, b));
    var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    ctx.save();
    ctx.font = 'bold 9px sans-serif'; ctx.fillStyle = col; ctx.globalAlpha = 0.8;
    ctx.fillText(d + 'px', mx + 4, my - 4);
    ctx.restore();
  }

  function drawTriangleAngles(pts, col) {
    for (var i = 0; i < 3; i++) {
      var p = pts[i], a = pts[(i+2)%3], b = pts[(i+1)%3];
      var ang1 = Math.atan2(a.y - p.y, a.x - p.x);
      var ang2 = Math.atan2(b.y - p.y, b.x - p.x);
      var diff = ang2 - ang1;
      if (diff < -Math.PI) diff += 2 * Math.PI;
      if (diff > Math.PI) diff -= 2 * Math.PI;
      var deg = Math.abs(Math.round(diff * 180 / Math.PI));
      ctx.save(); ctx.font = 'bold 8px sans-serif'; ctx.fillStyle = col; ctx.globalAlpha = 0.7;
      var ox = p.x + 18 * Math.cos((ang1 + ang2) / 2);
      var oy = p.y + 18 * Math.sin((ang1 + ang2) / 2);
      ctx.fillText(deg + '°', ox, oy);
      ctx.restore();
    }
  }

  function drawProtractor(p1, p2, col) {
    var ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    var deg = Math.round(ang * 180 / Math.PI);
    var r = 30;
    ctx.save();
    ctx.strokeStyle = col; ctx.globalAlpha = 0.5; ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    // horizontal reference
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p1.x + r + 10, p1.y); ctx.stroke();
    ctx.setLineDash([]);
    // arc
    var startA = 0, endA = ang;
    if (ang < 0) { startA = ang; endA = 0; }
    ctx.beginPath(); ctx.arc(p1.x, p1.y, r, startA, endA); ctx.stroke();
    // angle text
    ctx.font = 'bold 10px sans-serif'; ctx.fillStyle = col; ctx.globalAlpha = 0.9;
    var tx = p1.x + (r + 12) * Math.cos(ang / 2);
    var ty = p1.y + (r + 12) * Math.sin(ang / 2);
    ctx.fillText(Math.abs(deg) + '°', tx, ty);
    ctx.restore();
  }

  function drawProtractorPreview(p1, p2) {
    drawProtractor(p1, p2, color);
  }

  // === ANGLE MEASUREMENT BETWEEN INTERSECTING LINES ===
  function getSegments() {
    var segs = [];
    history.forEach(function(s) {
      if ((s.tool === 'line' || s.tool === 'dline' || s.tool === 'arrow' || s.tool === 'angleline') && s.p1 && s.p2) {
        segs.push({ a: s.p1, b: s.p2 });
      } else if (s.tool === 'rect' && s.p1 && s.p2) {
        var x1 = Math.min(s.p1.x, s.p2.x), y1 = Math.min(s.p1.y, s.p2.y);
        var x2 = Math.max(s.p1.x, s.p2.x), y2 = Math.max(s.p1.y, s.p2.y);
        segs.push({ a:{x:x1,y:y1}, b:{x:x2,y:y1} });
        segs.push({ a:{x:x2,y:y1}, b:{x:x2,y:y2} });
        segs.push({ a:{x:x2,y:y2}, b:{x:x1,y:y2} });
        segs.push({ a:{x:x1,y:y2}, b:{x:x1,y:y1} });
      } else if (s.tool === 'triangle' && s.points && s.points.length >= 3) {
        segs.push({ a:s.points[0], b:s.points[1] });
        segs.push({ a:s.points[1], b:s.points[2] });
        segs.push({ a:s.points[2], b:s.points[0] });
      }
    });
    return segs;
  }

  function segIntersect(s1, s2) {
    var dx1 = s1.b.x - s1.a.x, dy1 = s1.b.y - s1.a.y;
    var dx2 = s2.b.x - s2.a.x, dy2 = s2.b.y - s2.a.y;
    var denom = dx1 * dy2 - dy1 * dx2;
    if (Math.abs(denom) < 0.0001) return null;
    var t = ((s2.a.x - s1.a.x) * dy2 - (s2.a.y - s1.a.y) * dx2) / denom;
    var u = ((s2.a.x - s1.a.x) * dy1 - (s2.a.y - s1.a.y) * dx1) / denom;
    if (t < -0.05 || t > 1.05 || u < -0.05 || u > 1.05) return null;
    return { x: s1.a.x + t * dx1, y: s1.a.y + t * dy1 };
  }

  function ptToSegDist(p, seg) {
    var dx = seg.b.x - seg.a.x, dy = seg.b.y - seg.a.y;
    var len2 = dx * dx + dy * dy;
    if (len2 < 0.01) return dist(p, seg.a);
    var t = Math.max(0, Math.min(1, ((p.x - seg.a.x) * dx + (p.y - seg.a.y) * dy) / len2));
    return dist(p, { x: seg.a.x + t * dx, y: seg.a.y + t * dy });
  }

  function segDirection(seg) {
    return Math.atan2(seg.b.y - seg.a.y, seg.b.x - seg.a.x);
  }

  function findNearestIntersection(click) {
    var segs = getSegments();
    if (segs.length < 2) return null;
    var RADIUS = 40;
    var best = null, bestDist = RADIUS;

    // Pass 1: exact segment intersections near click
    for (var i = 0; i < segs.length; i++) {
      for (var j = i + 1; j < segs.length; j++) {
        var ip = segIntersect(segs[i], segs[j]);
        if (ip) {
          var d = dist(click, ip);
          if (d < bestDist) { bestDist = d; best = { point: ip, seg1: segs[i], seg2: segs[j] }; }
        }
      }
    }

    // Pass 2: shared or nearby endpoints
    if (!best) {
      bestDist = RADIUS;
      for (var i = 0; i < segs.length; i++) {
        for (var j = i + 1; j < segs.length; j++) {
          var pts = [segs[i].a, segs[i].b];
          var pts2 = [segs[j].a, segs[j].b];
          for (var a = 0; a < 2; a++) {
            for (var b = 0; b < 2; b++) {
              var ep = { x: (pts[a].x + pts2[b].x) / 2, y: (pts[a].y + pts2[b].y) / 2 };
              if (dist(pts[a], pts2[b]) < 20) {
                var d = dist(click, ep);
                if (d < bestDist) { bestDist = d; best = { point: ep, seg1: segs[i], seg2: segs[j] }; }
              }
            }
          }
        }
      }
    }

    // Pass 3: two nearest lines to click
    if (!best) {
      var nearby = [];
      for (var i = 0; i < segs.length; i++) {
        var d = ptToSegDist(click, segs[i]);
        if (d < RADIUS) nearby.push({ seg: segs[i], d: d });
      }
      nearby.sort(function(a, b) { return a.d - b.d; });
      if (nearby.length >= 2) {
        best = { point: click, seg1: nearby[0].seg, seg2: nearby[1].seg };
      }
    }

    if (!best) return null;

    // Get the 4 rays from intersection point (2 per line)
    var s1 = best.seg1, s2 = best.seg2, pt = best.point;
    var r1a = Math.atan2(s1.a.y - pt.y, s1.a.x - pt.x);
    var r1b = Math.atan2(s1.b.y - pt.y, s1.b.x - pt.x);
    var r2a = Math.atan2(s2.a.y - pt.y, s2.a.x - pt.x);
    var r2b = Math.atan2(s2.b.y - pt.y, s2.b.x - pt.x);

    // Pick one direction per segment (away from the point if at endpoint)
    var d1a = dist(pt, s1.a), d1b = dist(pt, s1.b);
    var d2a = dist(pt, s2.a), d2b = dist(pt, s2.b);
    var dirA = d1a > d1b ? r1a : r1b;
    var dirB = d1a > d1b ? r1b : r1a;
    var dirC = d2a > d2b ? r2a : r2b;
    var dirD = d2a > d2b ? r2b : r2a;

    // Sort 4 rays clockwise to build the 4 angles
    var rays = [
      { a: dirA, from: 1 },
      { a: dirB, from: 1 },
      { a: dirC, from: 2 },
      { a: dirD, from: 2 }
    ];
    rays.sort(function(x, y) { return x.a - y.a; });

    // Build all 4 consecutive angles
    best.angles = [];
    for (var k = 0; k < 4; k++) {
      var ra = rays[k].a;
      var rb = rays[(k + 1) % 4].a;
      var diff = rb - ra;
      if (diff < 0) diff += 2 * Math.PI;
      if (diff < 0.01) continue;
      var deg = Math.round(diff * 180 / Math.PI);
      if (deg === 0 || deg === 360) continue;
      best.angles.push({ ray1: ra, ray2: rb, angleDeg: deg });
    }

    return best;
  }

  function drawAngleMark(s) {
    if (!s.point) return;
    var r = s.arcR || 22;
    ctx.save();
    ctx.strokeStyle = s.color || '#dc2626';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.85;
    var sa = s.ray1, ea = s.ray2;
    var sweep = ea - sa;
    if (sweep < 0) sweep += 2 * Math.PI;
    if (s.angleDeg === 90) {
      var sq = Math.min(r, 14);
      var mx = Math.cos(sa), my = Math.sin(sa);
      var nx = Math.cos(ea), ny = Math.sin(ea);
      ctx.beginPath();
      ctx.moveTo(s.point.x + sq * mx, s.point.y + sq * my);
      ctx.lineTo(s.point.x + sq * mx + sq * nx, s.point.y + sq * my + sq * ny);
      ctx.lineTo(s.point.x + sq * nx, s.point.y + sq * ny);
      ctx.stroke();
      ctx.fillStyle = s.color || '#dc2626';
      ctx.beginPath();
      ctx.arc(s.point.x + sq * mx + sq * nx, s.point.y + sq * my + sq * ny, 1.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(s.point.x, s.point.y, r, sa, sa + sweep);
      ctx.stroke();
    }
    var mid = sa + sweep / 2;
    var labelR = r + 10;
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = s.color || '#dc2626';
    ctx.globalAlpha = 1;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(s.angleDeg + '°', s.point.x + labelR * Math.cos(mid), s.point.y + labelR * Math.sin(mid));
    ctx.restore();
  }

  // === LASER FADE ===
  function startLaserFade() {
    if (laserTimer) return;
    laserTimer = setInterval(function() {
      var now = Date.now();
      var hadLaser = history.some(function(s) { return s.tool === 'laser'; });
      history = history.filter(function(s) {
        return s.tool !== 'laser' || (now - s.ts) < LASER_FADE_MS;
      });
      if (hadLaser) { redraw(); saveH(); }
      if (!history.some(function(s) { return s.tool === 'laser'; })) {
        clearInterval(laserTimer); laserTimer = null;
      }
    }, 200);
  }

  // === DRAWING INTERACTION ===
  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    var sx = (canvas.width / 2) / rect.width, sy = (canvas.height / 2) / rect.height;
    var t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - rect.left) * sx, y: (t.clientY - rect.top) * sy };
  }

  function isShapeTool() { return tool in SHAPE_TOOLS; }
  function isMultiClick() { return tool in MULTI_CLICK; }
  function isFreehand() { return tool in FREEHAND_TOOLS; }

  // === SELECT / MOVE / DRAG ===
  function hitTestStroke(p, s) {
    if (s.tool === 'angle-mark') return 999;
    if (s.p1 && s.p2) {
      return ptToSegDist(p, { a: s.p1, b: s.p2 });
    }
    if (s.tool === 'circle' && s.center) {
      return Math.abs(dist(p, s.center) - s.radius);
    }
    if (s.tool === 'triangle' && s.points && s.points.length >= 3) {
      var d0 = ptToSegDist(p, { a: s.points[0], b: s.points[1] });
      var d1 = ptToSegDist(p, { a: s.points[1], b: s.points[2] });
      var d2 = ptToSegDist(p, { a: s.points[2], b: s.points[0] });
      return Math.min(d0, d1, d2);
    }
    if (s.tool === 'rect' && s.p1 && s.p2) {
      var x1 = Math.min(s.p1.x, s.p2.x), y1 = Math.min(s.p1.y, s.p2.y);
      var x2 = Math.max(s.p1.x, s.p2.x), y2 = Math.max(s.p1.y, s.p2.y);
      var d0 = ptToSegDist(p, { a:{x:x1,y:y1}, b:{x:x2,y:y1} });
      var d1 = ptToSegDist(p, { a:{x:x2,y:y1}, b:{x:x2,y:y2} });
      var d2 = ptToSegDist(p, { a:{x:x2,y:y2}, b:{x:x1,y:y2} });
      var d3 = ptToSegDist(p, { a:{x:x1,y:y2}, b:{x:x1,y:y1} });
      return Math.min(d0, d1, d2, d3);
    }
    if (s.points && s.points.length >= 2) {
      var best = 999;
      for (var i = 1; i < s.points.length; i++) {
        var d = ptToSegDist(p, { a: s.points[i-1], b: s.points[i] });
        if (d < best) best = d;
      }
      return best;
    }
    return 999;
  }

  function hitTest(p) {
    var bestIdx = -1, bestDist = 12;
    for (var i = history.length - 1; i >= 0; i--) {
      var d = hitTestStroke(p, history[i]);
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    }
    return bestIdx;
  }

  function getHandles(s) {
    if (!s) return [];
    if (s.p1 && s.p2) return [{ x: s.p1.x, y: s.p1.y, key: 'p1' }, { x: s.p2.x, y: s.p2.y, key: 'p2' }];
    if (s.tool === 'circle' && s.center) {
      return [
        { x: s.center.x, y: s.center.y, key: 'center' },
        { x: s.center.x + s.radius, y: s.center.y, key: 'edge' }
      ];
    }
    if (s.tool === 'triangle' && s.points) {
      return s.points.map(function(pt, i) { return { x: pt.x, y: pt.y, key: 'pt' + i }; });
    }
    if (s.tool === 'rect' && s.p1 && s.p2) return [{ x: s.p1.x, y: s.p1.y, key: 'p1' }, { x: s.p2.x, y: s.p2.y, key: 'p2' }];
    return [];
  }

  function findHandle(p, handles) {
    for (var i = 0; i < handles.length; i++) {
      if (dist(p, handles[i]) < 10) return i;
    }
    return -1;
  }

  function moveStroke(s, dx, dy) {
    if (s.p1) { s.p1 = { x: s.p1.x + dx, y: s.p1.y + dy }; }
    if (s.p2) { s.p2 = { x: s.p2.x + dx, y: s.p2.y + dy }; }
    if (s.center) { s.center = { x: s.center.x + dx, y: s.center.y + dy }; }
    if (s.point) { s.point = { x: s.point.x + dx, y: s.point.y + dy }; }
    if (s.tool === 'triangle' && s.points) {
      s.points = s.points.map(function(pt) { return { x: pt.x + dx, y: pt.y + dy }; });
    }
    if (s.points && s.tool !== 'triangle') {
      s.points = s.points.map(function(pt) { return { x: pt.x + dx, y: pt.y + dy }; });
    }
  }

  function dragHandle(s, handleIdx, p) {
    var handles = getHandles(s);
    if (handleIdx < 0 || handleIdx >= handles.length) return;
    var h = handles[handleIdx];
    p = snapPt(p);
    if (s.tool === 'circle') {
      if (h.key === 'center') { s.center = { x: p.x, y: p.y }; }
      else { s.radius = Math.max(5, dist(s.center, p)); }
    } else if (s.tool === 'triangle' && s.points) {
      var idx = parseInt(h.key.replace('pt', ''));
      s.points[idx] = { x: p.x, y: p.y };
    } else if (h.key === 'p1') {
      s.p1 = { x: p.x, y: p.y };
    } else if (h.key === 'p2') {
      s.p2 = { x: p.x, y: p.y };
    }
  }

  function drawSelectionHandles(idx) {
    if (idx < 0 || idx >= history.length) return;
    var s = history[idx];
    var handles = getHandles(s);
    ctx.save();
    handles.forEach(function(h) {
      ctx.fillStyle = '#2563eb';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(h.x, h.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    // highlight the shape with a blue glow
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.4)';
    ctx.lineWidth = s.size + 4;
    ctx.setLineDash([6, 4]);
    if (s.p1 && s.p2) {
      ctx.beginPath(); ctx.moveTo(s.p1.x, s.p1.y); ctx.lineTo(s.p2.x, s.p2.y); ctx.stroke();
    } else if (s.tool === 'circle' && s.center) {
      ctx.beginPath(); ctx.arc(s.center.x, s.center.y, s.radius, 0, Math.PI * 2); ctx.stroke();
    } else if (s.tool === 'triangle' && s.points && s.points.length >= 3) {
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      ctx.lineTo(s.points[1].x, s.points[1].y);
      ctx.lineTo(s.points[2].x, s.points[2].y);
      ctx.closePath(); ctx.stroke();
    } else if (s.tool === 'rect' && s.p1 && s.p2) {
      var x = Math.min(s.p1.x, s.p2.x), y = Math.min(s.p1.y, s.p2.y);
      var w = Math.abs(s.p2.x - s.p1.x), h = Math.abs(s.p2.y - s.p1.y);
      ctx.strokeRect(x, y, w, h);
    }
    ctx.restore();
  }

  function startDraw(e) {
    e.preventDefault();
    var p = getPos(e);

    if (tool === 'select') {
      var handles = selectedIdx >= 0 ? getHandles(history[selectedIdx]) : [];
      var hIdx = findHandle(p, handles);
      if (hIdx >= 0) {
        dragMode = 'handle';
        dragHandleIdx = hIdx;
        dragStart = p;
        drawing = true;
      } else {
        var hit = hitTest(p);
        if (hit >= 0) {
          selectedIdx = hit;
          dragMode = 'move';
          dragStart = p;
          drawing = true;
          redraw();
          drawSelectionHandles(selectedIdx);
        } else {
          selectedIdx = -1;
          dragMode = 'none';
          redraw();
        }
      }
      return;
    }

    if (tool === 'measure') {
      var result = findNearestIntersection(p);
      if (result && result.angles && result.angles.length) {
        var radii = [18, 24, 30, 36];
        for (var ai = 0; ai < result.angles.length; ai++) {
          history.push({
            tool: 'angle-mark', point: result.point,
            angleDeg: result.angles[ai].angleDeg,
            ray1: result.angles[ai].ray1, ray2: result.angles[ai].ray2,
            arcR: radii[ai % radii.length],
            color: color, size: size
          });
        }
        saveH(); redraw();
      }
      return;
    }

    if (isMultiClick()) {
      p = snapPt(p);
      triPoints.push(p);
      redraw();
      // Draw placed dots
      triPoints.forEach(function(pt) {
        ctx.save(); ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      // Draw edges so far
      if (triPoints.length >= 2) {
        ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round';
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(triPoints[0].x, triPoints[0].y);
        for (var i = 1; i < triPoints.length; i++) ctx.lineTo(triPoints[i].x, triPoints[i].y);
        ctx.stroke(); ctx.restore();
      }
      if (triPoints.length >= 3) {
        history.push({ tool: 'triangle', color: color, size: size, points: triPoints.slice() });
        saveH();
        triPoints = [];
        redraw();
      }
      return;
    }

    if (isShapeTool()) {
      shapeP1 = snapPt(p);
      shapeP2 = null;
      drawing = true;
      return;
    }

    drawing = true;
    currentPath = [p];
  }

  function moveDraw(e) {
    if (!drawing) return;
    e.preventDefault();
    var p = getPos(e);

    if (tool === 'select' && selectedIdx >= 0 && dragStart) {
      var p2 = getPos(e);
      if (dragMode === 'move') {
        var dx = p2.x - dragStart.x, dy = p2.y - dragStart.y;
        moveStroke(history[selectedIdx], dx, dy);
        dragStart = p2;
      } else if (dragMode === 'handle') {
        dragHandle(history[selectedIdx], dragHandleIdx, p2);
      }
      redraw();
      drawSelectionHandles(selectedIdx);
      return;
    }

    if (isShapeTool() && shapeP1) {
      shapeP2 = snapPt(p);
      redraw();
      // Preview shape
      var preview = buildShapeStroke(shapeP1, shapeP2);
      if (preview) {
        drawStroke(preview);
        // Show protractor for line tools
        if (tool === 'line' || tool === 'dline' || tool === 'angleline' || tool === 'arrow') {
          drawProtractorPreview(shapeP1, shapeP2);
        }
      }
      return;
    }

    // Freehand
    p = isFreehand() ? p : p;
    currentPath.push(p);
    if (p.y > totalPages * PAGE_H - 100) { totalPages++; setupCanvas(); }
    redraw();
    drawStroke({ tool: tool, color: color, size: size, points: currentPath });
  }

  function endDraw(e) {
    if (!drawing) return;
    drawing = false;

    if (tool === 'select') {
      if (dragMode === 'move' || dragMode === 'handle') {
        saveH();
        redraw();
        drawSelectionHandles(selectedIdx);
      }
      dragMode = 'none';
      dragStart = null;
      dragHandleIdx = -1;
      drawing = false;
      return;
    }

    if (isShapeTool() && shapeP1) {
      if (shapeP2 && dist(shapeP1, shapeP2) > 3) {
        var stroke = buildShapeStroke(shapeP1, shapeP2);
        if (stroke) { history.push(stroke); saveH(); }
      }
      shapeP1 = null; shapeP2 = null;
      redraw();
      return;
    }

    // Freehand
    if (currentPath.length > 1) {
      var stroke = { tool: tool, color: color, size: size, points: currentPath.slice() };
      if (tool === 'laser') { stroke.ts = Date.now(); startLaserFade(); }
      history.push(stroke);
      saveH();
    }
    currentPath = [];
  }

  function buildShapeStroke(p1, p2) {
    if (tool === 'line') return { tool: 'line', color: color, size: size, p1: p1, p2: p2 };
    if (tool === 'dline') return { tool: 'dline', color: color, size: size, p1: p1, p2: p2 };
    if (tool === 'arrow') return { tool: 'arrow', color: color, size: size, p1: p1, p2: p2 };
    if (tool === 'angleline') {
      var rad = inputAngle * Math.PI / 180;
      var len = dist(p1, p2);
      var ep = { x: p1.x + len * Math.cos(rad), y: p1.y - len * Math.sin(rad) };
      return { tool: 'angleline', color: color, size: size, p1: p1, p2: ep, angleDeg: inputAngle };
    }
    if (tool === 'rect') return { tool: 'rect', color: color, size: size, p1: p1, p2: p2 };
    if (tool === 'circle') {
      var r = dist(p1, p2);
      return { tool: 'circle', color: color, size: size, center: p1, radius: r };
    }
    return null;
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', moveDraw);
  canvas.addEventListener('mouseup', endDraw);
  canvas.addEventListener('mouseleave', endDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', moveDraw, { passive: false });
  canvas.addEventListener('touchend', endDraw);

  // Delete selected shape with Delete/Backspace key
  document.addEventListener('keydown', function(e) {
    if (!isOpen || tool !== 'select' || selectedIdx < 0) return;
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
      e.preventDefault();
      history.splice(selectedIdx, 1);
      selectedIdx = -1;
      saveH(); redraw();
    }
    if (e.key === 'Escape') {
      selectedIdx = -1;
      redraw();
    }
  });

  // === PAGE NAVIGATION ===
  function updatePg() {
    curPage = Math.max(1, Math.min(totalPages, Math.floor(scrollArea.scrollTop / PAGE_H) + 1));
    document.getElementById('dwPgInfo').textContent = 'Page ' + curPage + ' / ' + totalPages;
    document.getElementById('dwPrevPg').disabled = curPage <= 1;
  }
  document.getElementById('dwPrevPg').addEventListener('click', function() {
    scrollArea.scrollTop = (Math.max(1, curPage - 1) - 1) * PAGE_H; updatePg();
  });
  document.getElementById('dwNextPg').addEventListener('click', function() {
    scrollArea.scrollTop = (Math.min(totalPages, curPage + 1) - 1) * PAGE_H; updatePg();
  });
  document.getElementById('dwAddPg').addEventListener('click', function() {
    totalPages++; setupCanvas();
    scrollArea.scrollTop = (totalPages - 1) * PAGE_H; updatePg();
  });
  scrollArea.addEventListener('scroll', updatePg);

  // === PANEL OPEN/CLOSE ===
  fab.addEventListener('click', function() {
    if (!isOpen) {
      panel.classList.add('visible'); panel.classList.remove('minimized');
      fab.classList.add('open'); fab.innerHTML = '✕';
      isOpen = true; isMin = false; history = loadH();
      setTimeout(function() { setupCanvas(); updatePg(); }, 50);
    } else {
      panel.classList.remove('visible'); fab.classList.remove('open');
      fab.innerHTML = '✏️'; isOpen = false; isMin = false;
    }
  });
  document.getElementById('dwMinBtn').addEventListener('click', function() {
    isMin = !isMin;
    panel.classList.toggle('minimized', isMin);
    this.textContent = isMin ? '□' : '—';
    if (!isMin) setTimeout(function() { setupCanvas(); updatePg(); }, 50);
  });
  document.getElementById('dwCloseBtn').addEventListener('click', function() {
    panel.classList.remove('visible'); fab.classList.remove('open');
    fab.innerHTML = '✏️'; isOpen = false; isMin = false;
  });

  // === TOOLBAR EVENTS ===
  function setActiveTool(t) {
    tool = t;
    triPoints = [];
    document.querySelectorAll('#dwToolbar .dw-tbtn[data-tool], #dwToolbar2 .dw-tbtn[data-tool]').forEach(function(b) { b.classList.remove('active'); });
    var sel = document.querySelector('.dw-tbtn[data-tool="' + t + '"]');
    if (sel) sel.classList.add('active');
    canvas.classList.toggle('erasing', t === 'eraser');
    canvas.classList.toggle('selecting', t === 'select');
    if (t !== 'select') { selectedIdx = -1; dragMode = 'none'; redraw(); }
  }

  document.getElementById('dwToolbar').addEventListener('click', function(e) {
    var btn = e.target.closest('[data-tool]');
    if (btn) setActiveTool(btn.dataset.tool);
    var col = e.target.closest('[data-color]');
    if (col) {
      color = col.dataset.color;
      document.querySelectorAll('#dwToolbar .dw-color').forEach(function(c) { c.classList.remove('active'); });
      col.classList.add('active');
    }
  });

  document.getElementById('dwToolbar2').addEventListener('click', function(e) {
    var btn = e.target.closest('[data-tool]');
    if (btn) setActiveTool(btn.dataset.tool);
  });

  document.getElementById('dwSizeSlider').addEventListener('input', function() { size = parseInt(this.value); });

  document.getElementById('dwAngle').addEventListener('input', function() {
    inputAngle = parseInt(this.value) || 0;
  });

  document.getElementById('dwGridBtn').addEventListener('click', function() {
    showGrid = !showGrid;
    this.classList.toggle('toggled', showGrid);
    redraw();
  });

  document.getElementById('dwLabelBtn').addEventListener('click', function() {
    showLabels = !showLabels;
    this.classList.toggle('toggled', showLabels);
    redraw();
  });

  document.getElementById('dwUndo').addEventListener('click', function() {
    selectedIdx = -1; history.pop(); saveH(); redraw();
  });
  document.getElementById('dwClear').addEventListener('click', function() {
    if (!history.length || confirm('Clear the entire drawing?')) {
      selectedIdx = -1; history = []; saveH(); totalPages = 3; triPoints = []; setupCanvas(); updatePg();
    }
  });
  document.getElementById('dwSave').addEventListener('click', function() {
    var a = document.createElement('a');
    a.download = 'drawing-' + Date.now() + '.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });

  // === RESIZE HANDLE ===
  var rh = document.getElementById('dwResize'), resizing = false, rX, rY, rW, rH;
  function rsStart(e) { if (isMin) return; e.preventDefault(); e.stopPropagation(); resizing = true; var t = e.touches ? e.touches[0] : e; rX = t.clientX; rY = t.clientY; rW = panel.offsetWidth; rH = panel.offsetHeight; panel.classList.add('resizing'); }
  function rsMove(e) { if (!resizing) return; e.preventDefault(); var t = e.touches ? e.touches[0] : e; panel.style.width = Math.max(280, Math.min(window.innerWidth * 0.95, rW + (rX - t.clientX))) + 'px'; panel.style.height = Math.max(250, Math.min(window.innerHeight * 0.95, rH + (rY - t.clientY))) + 'px'; }
  function rsEnd() { if (!resizing) return; resizing = false; panel.classList.remove('resizing'); setTimeout(function() { setupCanvas(); updatePg(); }, 30); }
  rh.addEventListener('mousedown', rsStart); document.addEventListener('mousemove', rsMove); document.addEventListener('mouseup', rsEnd);
  rh.addEventListener('touchstart', rsStart, { passive: false }); document.addEventListener('touchmove', rsMove, { passive: false }); document.addEventListener('touchend', rsEnd);

  window.addEventListener('resize', function() { if (isOpen && !isMin) { setupCanvas(); updatePg(); } });
})();
