(function() {
  'use strict';
  var PAGE_H = 600;
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
    '.dw-toolbar{display:flex;gap:3px;padding:6px 8px;background:#f9fafb;border-bottom:1px solid #e5e7eb;flex-shrink:0;flex-wrap:wrap;align-items:center;}',
    '.dw-tbtn{padding:4px 8px;border-radius:7px;border:1.5px solid #e5e7eb;background:#fff;cursor:pointer;font-size:11px;font-weight:700;color:#374151;transition:all 0.2s;font-family:"Nunito",sans-serif;}',
    '.dw-tbtn:hover{border-color:#a78bfa;background:#faf5ff;}',
    '.dw-tbtn.active{background:#7c3aed;color:#fff;border-color:#7c3aed;}',
    '.dw-tbtn.active[data-tool="laser"]{background:linear-gradient(135deg,#f59e0b,#ef4444);border-color:#f59e0b;animation:dwLaserPulse 1.5s ease-in-out infinite;}',
    '@keyframes dwLaserPulse{0%,100%{box-shadow:0 0 6px rgba(245,158,11,0.4);}50%{box-shadow:0 0 14px rgba(245,158,11,0.7);}}',
    '.dw-color{width:20px;height:20px;border-radius:50%;border:2px solid #e5e7eb;cursor:pointer;transition:all 0.2s;flex-shrink:0;}',
    '.dw-color:hover{transform:scale(1.15);}',
    '.dw-color.active{border-color:#1f2937;box-shadow:0 0 0 2px #a78bfa;}',
    '.dw-sep{width:1px;height:18px;background:#d1d5db;margin:0 2px;flex-shrink:0;}',
    '.dw-pager{display:flex;align-items:center;gap:4px;padding:4px 8px;background:linear-gradient(135deg,#f3e8ff,#ede9fe);border-bottom:1px solid #c4b5fd;flex-shrink:0;}',
    '.dw-pgbtn{padding:3px 8px;border-radius:6px;border:1px solid #c4b5fd;background:#fff;cursor:pointer;font-size:10px;font-weight:700;color:#7c3aed;transition:all 0.2s;font-family:"Nunito",sans-serif;}',
    '.dw-pgbtn:hover{background:#ede9fe;}',
    '.dw-pgbtn:disabled{opacity:0.3;pointer-events:none;}',
    '.dw-pgbtn.add{background:linear-gradient(135deg,#f0fdf4,#dcfce7);color:#16a34a;border-color:#86efac;}',
    '.dw-pginfo{flex:1;text-align:center;font-size:10px;font-weight:800;color:#5b21b6;}',
    '.dw-scroll{flex:1;overflow-y:auto;overflow-x:hidden;background:#fff;position:relative;-webkit-overflow-scrolling:touch;scroll-behavior:smooth;}',
    '.dw-canvas{display:block;touch-action:none;cursor:crosshair;}',
    '.dw-canvas.erasing{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'none\' stroke=\'%23999\' stroke-width=\'1.5\'/%3E%3C/svg%3E") 10 10, auto;}',
    '@media(max-width:500px){.dw-panel{width:100%;border-radius:18px 18px 0 0;}.dw-fab{bottom:80px;right:16px;width:46px;height:46px;font-size:20px;}}'
  ].join('\n');
  document.head.appendChild(css);

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
    '  <button class="dw-tbtn" data-tool="highlighter">🖍️</button>',
    '  <button class="dw-tbtn" data-tool="laser">🔦 Laser</button>',
    '  <button class="dw-tbtn" data-tool="eraser">⬜</button>',
    '  <span class="dw-sep"></span>',
    '  <span class="dw-color active" data-color="#1f2937" style="background:#1f2937;"></span>',
    '  <span class="dw-color" data-color="#dc2626" style="background:#dc2626;"></span>',
    '  <span class="dw-color" data-color="#2563eb" style="background:#2563eb;"></span>',
    '  <span class="dw-color" data-color="#16a34a" style="background:#16a34a;"></span>',
    '  <span class="dw-color" data-color="#7c3aed" style="background:#7c3aed;"></span>',
    '  <span class="dw-sep"></span>',
    '  <input type="range" min="1" max="20" value="3" id="dwSizeSlider" style="width:50px;accent-color:#7c3aed;">',
    '  <span class="dw-sep"></span>',
    '  <button class="dw-tbtn" id="dwUndo">↩</button>',
    '  <button class="dw-tbtn" id="dwClear" style="color:#dc2626;">🗑</button>',
    '  <button class="dw-tbtn" id="dwSave">💾</button>',
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

  function loadH() { try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; } catch(e) { return []; } }
  function saveH() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); } catch(e) {} }
  history = loadH();
  if (history.length) {
    var maxY = 0;
    history.forEach(function(s) { s.points.forEach(function(p) { if (p.y > maxY) maxY = p.y; }); });
    totalPages = Math.max(3, Math.ceil((maxY + 150) / PAGE_H));
  }

  function setupCanvas() {
    var w = scrollArea.clientWidth || 300;
    var h = totalPages * PAGE_H;
    canvas.width = w * 2; canvas.height = h * 2;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    redraw();
  }

  function redraw() {
    var w = canvas.width / 2;
    var now = Date.now();
    ctx.clearRect(0, 0, w, totalPages * PAGE_H);
    ctx.save(); ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 0.5; ctx.setLineDash([4, 4]);
    for (var i = 1; i < totalPages; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * PAGE_H); ctx.lineTo(w, i * PAGE_H); ctx.stroke();
      ctx.fillStyle = '#d1d5db'; ctx.font = '10px sans-serif'; ctx.fillText('Page ' + (i + 1), 8, i * PAGE_H + 14);
    }
    ctx.setLineDash([]); ctx.restore();
    history.forEach(function(s) { drawStroke(s, now); });
  }

  function drawStroke(s, now) {
    if (!s.points || s.points.length < 2) return;
    // Laser fade calculation
    var alpha = 1;
    if (s.tool === 'laser' && s.ts && now) {
      var age = now - s.ts;
      var fadeStart = LASER_FADE_MS * 0.6;
      if (age >= LASER_FADE_MS) return; // fully gone
      if (age > fadeStart) alpha = Math.max(0, 1 - (age - fadeStart) / (LASER_FADE_MS - fadeStart));
    }
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (s.tool === 'laser') {
      ctx.globalAlpha = 0.45 * alpha;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size * 5;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 12 * alpha;
    } else if (s.tool === 'highlighter') {
      ctx.globalAlpha = 0.3; ctx.strokeStyle = s.color; ctx.lineWidth = s.size * 4;
    } else if (s.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'; ctx.strokeStyle = 'rgba(0,0,0,1)'; ctx.lineWidth = s.size * 5;
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

  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    var sx = (canvas.width / 2) / rect.width, sy = (canvas.height / 2) / rect.height;
    var t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - rect.left) * sx, y: (t.clientY - rect.top) * sy };
  }

  function startDraw(e) { e.preventDefault(); drawing = true; currentPath = [getPos(e)]; }
  function moveDraw(e) {
    if (!drawing) return; e.preventDefault();
    var p = getPos(e); currentPath.push(p);
    if (p.y > totalPages * PAGE_H - 100) { totalPages++; setupCanvas(); }
    redraw(); drawStroke({ tool: tool, color: color, size: size, points: currentPath });
  }
  function endDraw() {
    if (!drawing) return; drawing = false;
    if (currentPath.length > 1) {
      var stroke = { tool: tool, color: color, size: size, points: currentPath.slice() };
      if (tool === 'laser') { stroke.ts = Date.now(); startLaserFade(); }
      history.push(stroke);
      saveH();
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

  // Page navigation
  function updatePg() {
    curPage = Math.max(1, Math.min(totalPages, Math.floor(scrollArea.scrollTop / PAGE_H) + 1));
    document.getElementById('dwPgInfo').textContent = 'Page ' + curPage + ' / ' + totalPages;
    document.getElementById('dwPrevPg').disabled = curPage <= 1;
  }
  document.getElementById('dwPrevPg').addEventListener('click', function() {
    var t = Math.max(1, curPage - 1);
    scrollArea.scrollTop = (t - 1) * PAGE_H; updatePg();
  });
  document.getElementById('dwNextPg').addEventListener('click', function() {
    var t = Math.min(totalPages, curPage + 1);
    scrollArea.scrollTop = (t - 1) * PAGE_H; updatePg();
  });
  document.getElementById('dwAddPg').addEventListener('click', function() {
    totalPages++; setupCanvas();
    scrollArea.scrollTop = (totalPages - 1) * PAGE_H; updatePg();
  });
  scrollArea.addEventListener('scroll', updatePg);

  // Panel open/close
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

  // Toolbar
  document.getElementById('dwToolbar').addEventListener('click', function(e) {
    var btn = e.target.closest('[data-tool]');
    if (btn) { tool = btn.dataset.tool; document.querySelectorAll('.dw-tbtn[data-tool]').forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active'); canvas.classList.toggle('erasing', tool === 'eraser'); }
    var col = e.target.closest('[data-color]');
    if (col) { color = col.dataset.color; document.querySelectorAll('.dw-color').forEach(function(c) { c.classList.remove('active'); }); col.classList.add('active'); }
  });
  document.getElementById('dwSizeSlider').addEventListener('input', function() { size = parseInt(this.value); });
  document.getElementById('dwUndo').addEventListener('click', function() { history.pop(); saveH(); redraw(); });
  document.getElementById('dwClear').addEventListener('click', function() {
    if (!history.length || confirm('Clear the entire drawing?')) { history = []; saveH(); totalPages = 3; setupCanvas(); updatePg(); }
  });
  document.getElementById('dwSave').addEventListener('click', function() {
    var a = document.createElement('a'); a.download = 'drawing-' + Date.now() + '.png'; a.href = canvas.toDataURL('image/png'); a.click();
  });

  // Resize handle
  var rh = document.getElementById('dwResize'), resizing = false, rX, rY, rW, rH;
  function rsStart(e) { if (isMin) return; e.preventDefault(); e.stopPropagation(); resizing = true; var t = e.touches ? e.touches[0] : e; rX = t.clientX; rY = t.clientY; rW = panel.offsetWidth; rH = panel.offsetHeight; panel.classList.add('resizing'); }
  function rsMove(e) { if (!resizing) return; e.preventDefault(); var t = e.touches ? e.touches[0] : e; panel.style.width = Math.max(280, Math.min(window.innerWidth * 0.95, rW + (rX - t.clientX))) + 'px'; panel.style.height = Math.max(250, Math.min(window.innerHeight * 0.95, rH + (rY - t.clientY))) + 'px'; }
  function rsEnd() { if (!resizing) return; resizing = false; panel.classList.remove('resizing'); setTimeout(function() { setupCanvas(); updatePg(); }, 30); }
  rh.addEventListener('mousedown', rsStart); document.addEventListener('mousemove', rsMove); document.addEventListener('mouseup', rsEnd);
  rh.addEventListener('touchstart', rsStart, { passive: false }); document.addEventListener('touchmove', rsMove, { passive: false }); document.addEventListener('touchend', rsEnd);

  window.addEventListener('resize', function() { if (isOpen && !isMin) { setupCanvas(); updatePg(); } });
})();
