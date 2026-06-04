(function(){
var css=document.createElement("style");
css.textContent=".wa-float{position:fixed;bottom:28px;right:28px;z-index:200;display:flex;flex-direction:column;align-items:flex-end;gap:10px;}.wa-float-btn{width:62px;height:62px;border-radius:50%;border:none;cursor:pointer;background:#25d366;color:white;font-size:32px;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(37,211,102,0.45);transition:all 0.3s;position:relative;text-decoration:none;}.wa-float-btn:hover{transform:scale(1.1);box-shadow:0 8px 28px rgba(37,211,102,0.55);}.wa-float-btn svg{width:34px;height:34px;fill:white;}.wa-pulse{position:absolute;inset:-4px;border-radius:50%;border:3px solid #25d366;animation:waPulse 2s ease-out infinite;opacity:0;}@keyframes waPulse{0%{transform:scale(1);opacity:0.6;}100%{transform:scale(1.5);opacity:0;}}.wa-badge{position:absolute;top:-2px;right:-2px;width:20px;height:20px;background:#ef4444;border-radius:50%;border:2.5px solid white;font-size:10px;font-weight:800;color:white;display:flex;align-items:center;justify-content:center;font-family:sans-serif;}.wa-tooltip{background:white;color:#1f2937;padding:10px 16px;border-radius:14px;box-shadow:0 4px 20px rgba(0,0,0,0.12);font-size:13px;font-weight:700;font-family:sans-serif;white-space:nowrap;opacity:0;transform:translateY(8px);transition:all 0.3s;pointer-events:none;position:relative;}.wa-tooltip::after{content:\"\";position:absolute;right:24px;bottom:-6px;width:12px;height:12px;background:white;transform:rotate(45deg);box-shadow:2px 2px 4px rgba(0,0,0,0.06);}.wa-float:hover .wa-tooltip{opacity:1;transform:translateY(0);}@media(max-width:640px){.wa-float{bottom:20px;right:16px;}.wa-float-btn{width:56px;height:56px;}.wa-float-btn svg{width:30px;height:30px;}}";
document.head.appendChild(css);

var d=document.createElement("div");
d.className="wa-float";
var t=document.createElement("div");
t.className="wa-tooltip";
t.textContent="Chat with Preeti Ma’am 💬";
var a=document.createElement("a");
a.href="https://wa.me/919005687354?text=Hi%20Preeti%20Ma%27am!%20I%20found%20your%20notes%20portal%20and%20I%27m%20interested%20in%20your%20classes.";
a.target="_blank";
a.rel="noopener";
a.className="wa-float-btn";
a.setAttribute("aria-label","Chat on WhatsApp");
a.innerHTML='<div class="wa-pulse"></div><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.914 15.914 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.39 1.1-2.282 2.108-3.148 2.188-.792.074-1.776.106-2.868-.18a26.205 26.205 0 0 1-2.594-.96c-4.566-1.97-7.546-6.596-7.774-6.902-.226-.306-1.854-2.468-1.854-4.708s1.174-3.34 1.592-3.798c.418-.458.912-.572 1.216-.572.304 0 .608.002.874.016.28.014.656-.106 1.026.782.39.936 1.326 3.234 1.44 3.47.114.234.19.508.038.814-.152.308-.228.498-.456.77-.226.27-.478.604-.682.81-.228.228-.466.476-.2.934.266.458 1.182 1.95 2.538 3.16 1.742 1.554 3.21 2.034 3.666 2.264.458.228.724.19.99-.114.266-.306 1.14-1.33 1.444-1.788.304-.458.608-.382 1.026-.228.418.152 2.654 1.252 3.11 1.48.458.228.762.342.876.532.114.19.114 1.1-.276 2.2z"/></svg><span class="wa-badge">1</span>';
d.appendChild(t);
d.appendChild(a);
document.body.appendChild(d);
})();
