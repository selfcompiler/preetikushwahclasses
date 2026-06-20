(function(){
var s=document.createElement('style');
s.textContent='.btt-btn{position:fixed;top:72px;right:20px;z-index:190;width:44px;height:44px;border-radius:50%;border:none;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:white;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(124,58,237,0.35);opacity:0;transform:translateY(-10px);transition:all 0.3s;pointer-events:none;font-family:sans-serif;}.btt-btn.visible{opacity:1;transform:translateY(0);pointer-events:auto;}.btt-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 6px 24px rgba(124,58,237,0.5);}@media(max-width:640px){.btt-btn{top:64px;right:12px;width:40px;height:40px;font-size:18px;}}';
document.head.appendChild(s);

var btn=document.createElement('button');
btn.className='btt-btn';
btn.setAttribute('aria-label','Back to top');
btn.innerHTML='&#8593;';
btn.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};
document.body.appendChild(btn);

var ticking=false;
window.addEventListener('scroll',function(){
  if(!ticking){
    window.requestAnimationFrame(function(){
      if(window.scrollY>400){btn.classList.add('visible');}
      else{btn.classList.remove('visible');}
      ticking=false;
    });
    ticking=true;
  }
});
})();
