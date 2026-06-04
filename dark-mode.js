(function(){
var s=document.createElement('style');
s.textContent='\
[data-theme="dark"] body{background:#0f172a !important;color:#e2e8f0 !important}\
[data-theme="dark"] .navbar{background:#1e293b !important;box-shadow:0 2px 10px rgba(0,0,0,0.4) !important}\
[data-theme="dark"] .nav-title{color:#e2e8f0 !important}\
[data-theme="dark"] .nav-title small{color:#94a3b8 !important}\
[data-theme="dark"] .nav-back{background:#334155 !important;color:#e2e8f0 !important}\
[data-theme="dark"] .nav-back:hover{background:#7c3aed !important;color:white !important}\
[data-theme="dark"] .nav-cta a:not([style*="background"]){background:#334155 !important;color:#e2e8f0 !important}\
\
[data-theme="dark"] .class-card{background:#1e293b !important;box-shadow:0 4px 20px rgba(0,0,0,0.4) !important}\
[data-theme="dark"] .class-card:hover{box-shadow:0 12px 36px rgba(0,0,0,0.5) !important}\
[data-theme="dark"] .class-body p{color:#94a3b8 !important}\
\
[data-theme="dark"] .subject-card{background:#1e293b !important;box-shadow:0 4px 20px rgba(0,0,0,0.4) !important}\
[data-theme="dark"] .subject-card .card-chapters{color:#94a3b8 !important}\
[data-theme="dark"] .subject-card .card-chapters strong{color:#a78bfa !important}\
[data-theme="dark"] .subject-card .card-arrow{background:#0f172a !important;color:#a78bfa !important}\
[data-theme="dark"] .subject-card:hover .card-arrow{background:#334155 !important}\
\
[data-theme="dark"] .chapter-card{background:#1e293b !important;box-shadow:0 3px 14px rgba(0,0,0,0.4) !important}\
[data-theme="dark"] .chapter-card:hover{box-shadow:0 6px 22px rgba(0,0,0,0.5) !important}\
[data-theme="dark"] .chapter-card .ch-title{color:#e2e8f0 !important}\
[data-theme="dark"] .chapter-card .ch-desc{color:#94a3b8 !important}\
[data-theme="dark"] .chapter-card .ch-badge{background:#334155 !important;color:#94a3b8 !important}\
[data-theme="dark"] .chapter-card .ch-arrow{color:#a78bfa !important}\
\
[data-theme="dark"] .features-bg{background:#1e293b !important}\
[data-theme="dark"] .feature-card{background:#0f172a !important;border-color:#334155 !important}\
[data-theme="dark"] .feature-title{color:#a78bfa !important}\
[data-theme="dark"] .feature-desc{color:#94a3b8 !important}\
\
[data-theme="dark"] .about-bg{background:linear-gradient(135deg,#0f172a,#1e293b) !important}\
[data-theme="dark"] .about-card{background:#1e293b !important;box-shadow:0 4px 30px rgba(0,0,0,0.4) !important}\
[data-theme="dark"] .teacher-info h3{color:#a78bfa !important}\
[data-theme="dark"] .teacher-info .title{color:#fbbf24 !important}\
[data-theme="dark"] .teacher-info p{color:#cbd5e1 !important}\
[data-theme="dark"] .teacher-badge{background:#334155 !important;color:#a78bfa !important}\
\
[data-theme="dark"] .section-title{color:#a78bfa !important}\
[data-theme="dark"] .section-subtitle,[data-theme="dark"] .section-sub{color:#94a3b8 !important}\
\
[data-theme="dark"] footer{background:#020617 !important;color:rgba(255,255,255,0.7) !important}\
\
[data-theme="dark"] .modal-box{background:#1e293b !important}\
[data-theme="dark"] .form-input{background:#0f172a !important;border-color:#334155 !important;color:#e2e8f0 !important}\
[data-theme="dark"] .form-input:focus{background:#020617 !important;border-color:#7c3aed !important}\
[data-theme="dark"] .form-input::placeholder{color:#64748b !important}\
[data-theme="dark"] .form-label{color:#e2e8f0 !important}\
[data-theme="dark"] .cls-chip{background:#0f172a !important;border-color:#334155 !important;color:#94a3b8 !important}\
[data-theme="dark"] .cls-chip:hover{border-color:#7c3aed !important;background:#1e293b !important;color:#a78bfa !important}\
[data-theme="dark"] .subj-chip span,[data-theme="dark"] .mode-chip span{background:#0f172a !important;border-color:#334155 !important;color:#94a3b8 !important}\
[data-theme="dark"] .subj-chip span:hover,[data-theme="dark"] .mode-chip span:hover{border-color:#7c3aed !important;background:#1e293b !important;color:#a78bfa !important}\
[data-theme="dark"] .modal-close-btn{border-color:#334155 !important;color:#94a3b8 !important}\
[data-theme="dark"] .modal-close-btn:hover{background:#0f172a !important;color:#e2e8f0 !important}\
\
[data-theme="dark"] .ch-study{background:linear-gradient(135deg,#422006,#78350f) !important;border-color:#92400e !important;color:#fbbf24 !important}\
[data-theme="dark"] .ch-notes{background:linear-gradient(135deg,#052e16,#14532d) !important;border-color:#166534 !important;color:#86efac !important}\
\
[data-theme="dark"] .top-nav{background:#1e293b !important;box-shadow:0 2px 8px rgba(0,0,0,0.4) !important}\
[data-theme="dark"] .tn-home{background:linear-gradient(135deg,#312e81,#3730a3) !important;color:#a78bfa !important;border-color:#4c1d95 !important}\
[data-theme="dark"] .tn-prev{background:linear-gradient(135deg,#1e3a5f,#1e40af) !important;color:#93c5fd !important;border-color:#2563eb !important}\
[data-theme="dark"] .tn-next{background:linear-gradient(135deg,#052e16,#14532d) !important;color:#86efac !important;border-color:#166534 !important}\
[data-theme="dark"] .tn-share{background:linear-gradient(135deg,#422006,#78350f) !important;color:#fbbf24 !important;border-color:#92400e !important}\
\
[data-theme="dark"] .section-block{background:#1e293b !important;box-shadow:0 4px 24px rgba(0,0,0,0.4) !important}\
[data-theme="dark"] .section-bd{color:#e2e8f0 !important}\
[data-theme="dark"] .section-bd p{color:#cbd5e1 !important}\
[data-theme="dark"] .subtitle{color:#a78bfa !important}\
\
[data-theme="dark"] .info-card{background:#0f172a !important;color:#e2e8f0 !important}\
[data-theme="dark"] .kt{background:#854d0e !important;color:#fef08a !important}\
\
[data-theme="dark"] .mcq-card,[data-theme="dark"] .blank-card,[data-theme="dark"] .qa-card{background:#0f172a !important;border-color:#334155 !important}\
[data-theme="dark"] .mcq-card h4,[data-theme="dark"] .blank-card h4,[data-theme="dark"] .qa-card h4{color:#e2e8f0 !important}\
[data-theme="dark"] .opt-btn{background:#334155 !important;color:#e2e8f0 !important;border-color:#475569 !important}\
[data-theme="dark"] .opt-btn:hover{background:#475569 !important}\
\
[data-theme="dark"] .summary-list li,[data-theme="dark"] .summary-grid .sg-item{background:#0f172a !important;color:#cbd5e1 !important}\
[data-theme="dark"] .act-card{background:#0f172a !important}\
[data-theme="dark"] .act-card h4{color:#e2e8f0 !important}\
[data-theme="dark"] .act-card p,[data-theme="dark"] .act-card li{color:#cbd5e1 !important}\
\
[data-theme="dark"] table{background:#0f172a !important;color:#e2e8f0 !important}\
[data-theme="dark"] th{background:#334155 !important;color:#e2e8f0 !important}\
[data-theme="dark"] td{border-color:#334155 !important;color:#cbd5e1 !important}\
[data-theme="dark"] tr:nth-child(even){background:#1e293b !important}\
\
[data-theme="dark"] .diagram-wrap,[data-theme="dark"] .anim-wrap{background:#0f172a !important;border-color:#334155 !important}\
\
.dm-toggle{background:#f3f4f6;border:none;width:38px;height:38px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all 0.3s;flex-shrink:0;}\
.dm-toggle:hover{background:#e5e7eb;transform:scale(1.1);}\
[data-theme="dark"] .dm-toggle{background:#334155 !important}\
[data-theme="dark"] .dm-toggle:hover{background:#475569 !important}\
';
document.head.appendChild(s);

var isDark=document.documentElement.getAttribute('data-theme')==='dark';
var btn=document.createElement('button');
btn.className='dm-toggle';
btn.setAttribute('aria-label','Toggle dark mode');
btn.textContent=isDark?'☀️':'🌙';

btn.onclick=function(){
  var dark=document.documentElement.getAttribute('data-theme')==='dark';
  if(dark){
    document.documentElement.removeAttribute('data-theme');
    btn.textContent='🌙';
    localStorage.setItem('pkc-dark-mode','false');
  }else{
    document.documentElement.setAttribute('data-theme','dark');
    btn.textContent='☀️';
    localStorage.setItem('pkc-dark-mode','true');
  }
};

var navbar=document.querySelector('.navbar');
var topNav=document.querySelector('.top-nav');

if(navbar){
  var navCta=navbar.querySelector('.nav-cta');
  var navBack=navbar.querySelector('.nav-back');
  if(navCta){
    navCta.insertBefore(btn,navCta.firstChild);
  }else if(navBack){
    var wrap=document.createElement('div');
    wrap.style.cssText='display:flex;align-items:center;gap:8px;';
    navBack.parentNode.insertBefore(wrap,navBack);
    wrap.appendChild(btn);
    wrap.appendChild(navBack);
  }else{
    navbar.appendChild(btn);
  }
}else if(topNav){
  var spacer=topNav.querySelector('.nav-spacer');
  if(spacer){
    topNav.insertBefore(btn,spacer);
  }else{
    topNav.appendChild(btn);
  }
}else{
  document.body.insertBefore(btn,document.body.firstChild);
  btn.style.cssText='position:fixed;top:8px;right:8px;z-index:999;';
}
})();
