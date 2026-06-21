(function(){
var pageKey='pkc-progress-'+location.pathname;
var completed=JSON.parse(localStorage.getItem(pageKey)||'{}');

var s=document.createElement('style');
s.textContent='\
.ch-share{display:inline-flex;align-items:center;gap:4px;padding:6px 12px;border-radius:10px;background:#25d366;color:white;border:1.5px solid #25d366;font-size:10px;font-weight:800;text-decoration:none;transition:all 0.2s;white-space:nowrap;cursor:pointer;}\
.ch-share:hover{background:#128c7e;border-color:#128c7e;transform:translateY(-1px);box-shadow:0 2px 8px rgba(37,211,102,0.3);}\
[data-theme="dark"] .ch-share{background:#128c7e;border-color:#128c7e;}\
[data-theme="dark"] .ch-share:hover{background:#0e7460;border-color:#0e7460;}\
\
.ch-done-btn{width:30px;height:30px;border-radius:50%;border:2.5px solid #d1d5db;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.3s;flex-shrink:0;padding:0;font-weight:800;color:transparent;}\
.ch-done-btn:hover{border-color:#22c55e;background:#f0fdf4;}\
.ch-done-btn.done{background:#22c55e;border-color:#22c55e;color:white;box-shadow:0 2px 8px rgba(34,197,94,0.3);}\
[data-theme="dark"] .ch-done-btn{background:#334155 !important;border-color:#475569 !important}\
[data-theme="dark"] .ch-done-btn:hover{border-color:#22c55e !important}\
[data-theme="dark"] .ch-done-btn.done{background:#22c55e !important;border-color:#22c55e !important;color:white !important}\
\
.pkc-progress{background:white;border-radius:16px;padding:16px 20px;box-shadow:0 3px 14px rgba(0,0,0,0.06);margin-bottom:20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;}\
[data-theme="dark"] .pkc-progress{background:#1e293b !important;box-shadow:0 3px 14px rgba(0,0,0,0.4) !important}\
.pkc-progress-track{flex:1;height:12px;background:#e5e7eb;border-radius:6px;overflow:hidden;min-width:120px;}\
[data-theme="dark"] .pkc-progress-track{background:#334155 !important}\
.pkc-progress-fill{height:100%;background:linear-gradient(90deg,#22c55e,#4ade80);border-radius:6px;transition:width 0.5s ease;}\
.pkc-progress-text{font-size:14px;font-weight:800;color:#166534;white-space:nowrap;}\
[data-theme="dark"] .pkc-progress-text{color:#4ade80 !important}\
.pkc-progress-label{font-size:12px;font-weight:700;color:#6b7280;}\
[data-theme="dark"] .pkc-progress-label{color:#94a3b8 !important}\
';
document.head.appendChild(s);

var cards=document.querySelectorAll('.chapter-card:not(.disabled)');
if(cards.length===0)return;

var total=cards.length;
var container=document.querySelector('.container');
var chapterList=document.querySelector('.chapter-list');
if(!container||!chapterList)return;

var bar=document.createElement('div');
bar.className='pkc-progress';
bar.innerHTML='<span class="pkc-progress-label">Your Progress</span><div class="pkc-progress-track"><div class="pkc-progress-fill" id="pkcFill" style="width:0%"></div></div><span class="pkc-progress-text" id="pkcText">0/'+total+' done</span>';
container.insertBefore(bar,chapterList);

function getId(card){
  var t=card.querySelector('.ch-title');
  return t?t.textContent.trim():'';
}

function update(){
  var done=0;
  cards.forEach(function(c){if(completed[getId(c)])done++;});
  var pct=total>0?Math.round((done/total)*100):0;
  var fill=document.getElementById('pkcFill');
  var txt=document.getElementById('pkcText');
  if(fill)fill.style.width=pct+'%';
  if(txt)txt.textContent=done+'/'+total+' done';
}

cards.forEach(function(card){
  var id=getId(card);
  var actions=card.querySelector('.ch-actions');
  if(!actions){
    actions=document.createElement('div');
    actions.className='ch-actions';
    actions.style.cssText='display:flex;gap:6px;flex-shrink:0;align-items:center;';
    card.appendChild(actions);
  }

  var titleEl=card.querySelector('.ch-title');
  var chName=titleEl?titleEl.textContent.trim():'this chapter';
  var linkEl=card.querySelector('a[href]');
  var chUrl=linkEl?new URL(linkEl.href,location.href).href:location.href;

  var shareText='Check out notes for '+chName+' on Preeti Kushwah Classes!';
  var shareBtn=document.createElement('button');
  shareBtn.className='ch-share';
  shareBtn.textContent='📤 Share';
  shareBtn.addEventListener('click',function(e){
    e.preventDefault();e.stopPropagation();
    if(navigator.share){navigator.share({title:chName,text:shareText,url:chUrl});}
    else{navigator.clipboard.writeText(shareText+'\n'+chUrl).then(function(){alert('Link copied!');});}
  });
  actions.appendChild(shareBtn);

  var doneBtn=document.createElement('button');
  doneBtn.className='ch-done-btn'+(completed[id]?' done':'');
  doneBtn.title=completed[id]?'Mark as not done':'Mark as done';
  doneBtn.textContent=completed[id]?'✓':'';
  doneBtn.onclick=function(e){
    e.preventDefault();
    e.stopPropagation();
    if(completed[id]){
      delete completed[id];
      doneBtn.classList.remove('done');
      doneBtn.textContent='';
      doneBtn.title='Mark as done';
    }else{
      completed[id]=true;
      doneBtn.classList.add('done');
      doneBtn.textContent='✓';
      doneBtn.title='Mark as not done';
    }
    localStorage.setItem(pageKey,JSON.stringify(completed));
    update();
  };
  actions.appendChild(doneBtn);
});

update();
})();
