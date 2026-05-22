document.addEventListener('DOMContentLoaded',()=>{

// ── TIME ──────────────────────────────────────────────────
function tick(){
  const n=new Date();
  let h=n.getHours(),m=n.getMinutes().toString().padStart(2,'0');
  const ap=h>=12?'PM':'AM'; h=h%12||12;
  const el=document.getElementById('time-display');
  const de=document.getElementById('date-display');
  if(el) el.textContent=`${h}:${m} ${ap}`;
  if(de) de.textContent=n.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
}
tick(); setInterval(tick,1000);

// ── CALENDAR ──────────────────────────────────────────────
let calDate=new Date();
function renderCalendar(){
  const y=calDate.getFullYear(),mo=calDate.getMonth();
  const monthEl=document.getElementById('current-month');
  if(!monthEl)return;
  monthEl.textContent=calDate.toLocaleDateString('en-US',{month:'long',year:'numeric'});
  const grid=document.getElementById('calender-days');
  if(!grid)return;
  const first=new Date(y,mo,1).getDay();
  const days=new Date(y,mo+1,0).getDate();
  const today=new Date();
  let html='';
  for(let i=0;i<first;i++) html+=`<div class="calendar-day empty"></div>`;
  for(let d=1;d<=days;d++){
    const isT=d===today.getDate()&&mo===today.getMonth()&&y===today.getFullYear();
    html+=`<div class="calendar-day${isT?' today':''}">${d}</div>`;
  }
  grid.innerHTML=html;
}
renderCalendar();
document.querySelectorAll('.cal-nav-btn').forEach(b=>{
  b.addEventListener('click',()=>{
    calDate=new Date(calDate.getFullYear(),calDate.getMonth()+(b.dataset.dir==='next'?1:-1),1);
    renderCalendar();
  });
});

// ── SPOTLIGHT ─────────────────────────────────────────────
const spotlight=document.getElementById('spotlight-overlay');
const spotInput=document.getElementById('spotlight-input');
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();toggleSpotlight();}
  if(e.key==='Escape'){if(spotlight&&spotlight.classList.contains('show')) hideSpotlight();}
});
function toggleSpotlight(){if(spotlight){spotlight.classList.toggle('show');if(spotlight.classList.contains('show'))spotInput.focus();}}
function hideSpotlight(){if(spotlight)spotlight.classList.remove('show');}
if(spotlight) spotlight.addEventListener('click',e=>{if(e.target===spotlight)hideSpotlight();});

const apps=['Calculator','Notes','Finder','Maps','App Store','Safari','Terminal'];
if(spotInput) spotInput.addEventListener('input',()=>{
  const q=spotInput.value.toLowerCase();
  const res=document.getElementById('spotlight-results');
  if(!res)return;
  if(!q){res.innerHTML='';return;}
  const matches=apps.filter(a=>a.toLowerCase().includes(q));
  res.innerHTML=matches.map(a=>`<div class="spotlight-result" onclick="openFromSpotlight('${a.toLowerCase().replace(' ','')}')"><span>🖥 ${a}</span></div>`).join('');
});
window.openFromSpotlight=(app)=>{openApp(app);hideSpotlight();spotInput.value='';};

// ── DROPDOWN MENUS ─────────────────────────────────────────
window.toggleDropdown=(id)=>{
  document.querySelectorAll('.dropdown').forEach(d=>{if(d.id!==id)d.classList.remove('active');});
  document.getElementById(id)?.classList.toggle('active');
};
document.addEventListener('click',e=>{
  if(!e.target.closest('.menu-item-container')&&!e.target.closest('.apple-logo-container'))
    document.querySelectorAll('.dropdown').forEach(d=>d.classList.remove('active'));
});

// ── DOCK ──────────────────────────────────────────────────
document.querySelectorAll('.dock-item').forEach(item=>{
  item.addEventListener('click',function(){
    const app=this.dataset.app;
    if(app==='launchpad'){toggleLaunchpad();return;}
    openApp(app);
    document.querySelectorAll('.dock-item').forEach(i=>i.classList.remove('active'));
    this.classList.add('active');
  });
  // tooltip
  const tip=document.createElement('div');
  tip.className='dock-tooltip';
  tip.textContent=item.title||item.dataset.app;
  item.appendChild(tip);
});

// ── LAUNCHPAD ─────────────────────────────────────────────
const lp=document.getElementById('launchpad');
function toggleLaunchpad(){lp?.classList.toggle('show');}
document.querySelector('.launchpad-close')?.addEventListener('click',()=>lp?.classList.remove('show'));
lp?.addEventListener('click',e=>{if(e.target===lp)lp.classList.remove('show');});

// ── WINDOW MANAGEMENT ─────────────────────────────────────
let zIdx=200;
const wc=document.getElementById('window-container');

function openApp(app){
  const win=document.createElement('div');
  win.className='window active window-open';
  win.dataset.app=app;
  win.style.zIndex=zIdx++;
  win.style.top=(60+Math.random()*80)+'px';
  win.style.left=(80+Math.random()*120)+'px';

  const sizes={calculator:'width:320px;height:auto',notes:'width:680px;height:480px',
    finder:'width:720px;height:460px',maps:'width:760px;height:500px',
    appstore:'width:680px;height:500px',safari:'width:820px;height:560px',
    terminal:'width:640px;height:420px'};
  if(sizes[app]) win.style.cssText+=';'+sizes[app];

  // header
  const hdr=document.createElement('div'); hdr.className='window-header';
  const ctrl=document.createElement('div'); ctrl.className='window-controls';
  const close=document.createElement('div'); close.className='window-control close';
  const mini=document.createElement('div'); mini.className='window-control minimize';
  const maxi=document.createElement('div'); maxi.className='window-control maximize';
  close.onclick=()=>{win.classList.remove('active');setTimeout(()=>win.remove(),220);document.querySelector(`.dock-item[data-app="${app}"]`)?.classList.remove('active');};
  mini.onclick=()=>{win.style.display='none';document.querySelector(`.dock-item[data-app="${app}"]`)?.classList.remove('active');};
  maxi.onclick=()=>{
    win.classList.toggle('maximized');
    if(!win.classList.contains('maximized')){win.style.cssText='';if(sizes[app])win.style.cssText=sizes[app];}
  };
  ctrl.append(close,mini,maxi);
  const ttl=document.createElement('div'); ttl.className='window-title';
  ttl.textContent=app.charAt(0).toUpperCase()+app.slice(1).replace('appstore','App Store').replace('safari','Safari');
  hdr.append(ctrl,ttl);

  const cnt=document.createElement('div'); cnt.className='window-content';
  cnt.style.cssText='padding:0;overflow:hidden;height:100%;';

  switch(app){
    case 'calculator': buildCalc(cnt); break;
    case 'notes': buildNotes(cnt); break;
    case 'finder': buildFinder(cnt); break;
    case 'maps': buildMaps(cnt); break;
    case 'appstore': buildAppStore(cnt); break;
    case 'safari': buildSafari(cnt); break;
    case 'terminal': buildTerminal(cnt); break;
  }
  win.append(hdr,cnt);
  wc.appendChild(win);
  makeDraggable(win,hdr);
  win.addEventListener('mousedown',()=>{win.style.zIndex=zIdx++;});
}

function makeDraggable(el,handle){
  let x=0,y=0,mx=0,my=0;
  handle.onmousedown=e=>{
    if(e.target.closest('.window-controls'))return;
    e.preventDefault();
    mx=e.clientX;my=e.clientY;
    document.onmouseup=()=>{document.onmouseup=document.onmousemove=null;};
    document.onmousemove=e2=>{
      x=mx-e2.clientX;y=my-e2.clientY;mx=e2.clientX;my=e2.clientY;
      el.style.top=(el.offsetTop-y)+'px';el.style.left=(el.offsetLeft-x)+'px';
    };
  };
}

// ── CALCULATOR ────────────────────────────────────────────
function buildCalc(c){
  let cur='0',prev='',op=null,reset=false,expr='';
  c.style.background='#1c1c1e';
  c.innerHTML=`<div class="calculator">
    <div class="calculator-display"><div class="calc-expression" id="ce"></div><div id="cd">0</div></div>
    <button class="calculator-btn func" id="ac">AC</button>
    <button class="calculator-btn func" id="pm">+/−</button>
    <button class="calculator-btn func" id="pct">%</button>
    <button class="calculator-btn operator" data-op="/">÷</button>
    ${[7,8,9].map(n=>`<button class="calculator-btn num">${n}</button>`).join('')}
    <button class="calculator-btn operator" data-op="*">×</button>
    ${[4,5,6].map(n=>`<button class="calculator-btn num">${n}</button>`).join('')}
    <button class="calculator-btn operator" data-op="-">−</button>
    ${[1,2,3].map(n=>`<button class="calculator-btn num">${n}</button>`).join('')}
    <button class="calculator-btn operator" data-op="+">+</button>
    <button class="calculator-btn num zero">0</button>
    <button class="calculator-btn num" id="dot">.</button>
    <button class="calculator-btn operator" id="eq">=</button>
  </div>`;
  const disp=()=>{c.querySelector('#cd').textContent=parseFloat(cur).toLocaleString('en',{maximumFractionDigits:9});c.querySelector('#ce').textContent=expr;};
  c.querySelectorAll('.num').forEach(b=>b.addEventListener('click',()=>{
    const v=b.textContent==='0'&&b.classList.contains('zero')?'0':b.textContent;
    if(cur==='0'||reset){cur=v;reset=false;}else cur+=v;
    disp();
  }));
  c.querySelector('#dot').addEventListener('click',()=>{if(!cur.includes('.'))cur+='.';disp();});
  c.querySelectorAll('[data-op]').forEach(b=>b.addEventListener('click',()=>{
    if(prev&&op&&!reset){cur=String(eval(`${prev}${op}${cur}`));prev='';}
    c.querySelectorAll('.operator').forEach(x=>x.classList.remove('active-op'));
    b.classList.add('active-op');
    prev=cur;op=b.dataset.op;expr=`${cur} ${b.textContent}`;reset=true;disp();
  }));
  c.querySelector('#eq').addEventListener('click',()=>{
    if(!op)return;
    const r=eval(`${prev}${op}${cur}`);
    expr=`${prev} ${op==='*'?'×':op==='/'?'÷':op} ${cur} =`;
    cur=String(parseFloat(r.toFixed(9)));prev='';op=null;reset=true;disp();
    c.querySelectorAll('.operator').forEach(x=>x.classList.remove('active-op'));
  });
  c.querySelector('#ac').addEventListener('click',()=>{cur='0';prev='';op=null;reset=false;expr='';c.querySelectorAll('.operator').forEach(x=>x.classList.remove('active-op'));disp();});
  c.querySelector('#pm').addEventListener('click',()=>{cur=String(-parseFloat(cur));disp();});
  c.querySelector('#pct').addEventListener('click',()=>{cur=String(parseFloat(cur)/100);disp();});
}

// ── NOTES ─────────────────────────────────────────────────
function buildNotes(c){
  const notes=[{title:'Welcome 👋',body:'This is your Notes app. Click to edit or add new notes!',date:'Today'},
    {title:'Meeting Notes',body:'Team standup at 10am. Review Q2 roadmap and design sprint.',date:'Yesterday'},
    {title:'Ideas 💡',body:'Build a portfolio site. Learn Three.js. Ship the macOS UI project!',date:'Mon'}];
  let active=0;
  function render(){
    c.innerHTML=`<div class="notes-app">
      <div class="notes-sidebar">
        <div class="notes-sidebar-header">Notes (${notes.length})</div>
        ${notes.map((n,i)=>`<div class="note-list-item${i===active?' active':''}" data-i="${i}">
          <div class="note-list-title">${n.title}</div>
          <div class="note-list-preview">${n.body}</div>
        </div>`).join('')}
      </div>
      <div class="notes-main">
        <div class="notes-toolbar">
          <button onclick="document.execCommand('bold')"><i class="fas fa-bold"></i></button>
          <button onclick="document.execCommand('italic')"><i class="fas fa-italic"></i></button>
          <button onclick="document.execCommand('underline')"><i class="fas fa-underline"></i></button>
          <button onclick="addNote()" style="margin-left:auto;background:#0071e3;color:#fff;">+ New</button>
        </div>
        <div class="notes-editor" contenteditable="true" id="ne">${notes[active].body}</div>
      </div>
    </div>`;
    c.querySelectorAll('.note-list-item').forEach(el=>el.addEventListener('click',()=>{active=+el.dataset.i;render();}));
    c.querySelector('#ne').addEventListener('input',e=>notes[active].body=e.target.innerHTML);
  }
  window.addNote=()=>{notes.push({title:'New Note',body:'',date:'Now'});active=notes.length-1;render();};
  render();
}

// ── FINDER ────────────────────────────────────────────────
function buildFinder(c){
  const items=[['🏠','Home'],['🖥','Desktop'],['📁','Documents'],['⬇️','Downloads'],['🖼','Pictures'],['🎵','Music'],['🎬','Movies'],['🗑','Trash']];
  c.innerHTML=`<div class="finder" style="display:flex;flex-direction:column;height:100%;">
    <div class="finder-toolbar">
      <div style="display:flex;gap:6px">
        <button style="padding:4px 10px;border:none;border-radius:7px;background:#e5e5ea;cursor:pointer;font-size:12px">⊞</button>
        <button style="padding:4px 10px;border:none;border-radius:7px;background:#e5e5ea;cursor:pointer;font-size:12px">≡</button>
      </div>
      <input class="finder-search" placeholder="🔍  Search" style="flex:1;margin:0 10px;">
      <span style="font-size:12px;color:#86868b">${items.length} items</span>
    </div>
    <div style="display:flex;flex:1;overflow:hidden">
      <div class="finder-sidebar">
        <div class="finder-section-title">Favourites</div>
        ${items.map((it,i)=>`<div class="finder-item${i===0?' active':''}">${it[0]} ${it[1]}</div>`).join('')}
      </div>
      <div class="finder-content" id="fc">
        ${items.map(it=>`<div class="folder-tile"><div style="font-size:52px">${it[0]}</div><span>${it[1]}</span></div>`).join('')}
      </div>
    </div>
  </div>`;
  c.querySelectorAll('.finder-item').forEach(el=>{
    el.addEventListener('click',()=>{c.querySelectorAll('.finder-item').forEach(x=>x.classList.remove('active'));el.classList.add('active');});
  });
}

// ── MAPS ──────────────────────────────────────────────────
function buildMaps(c){
  c.innerHTML=`<div id="mapbox" style="width:100%;height:100%;min-height:400px"></div>`;
  if(window.L){initMap();}else{
    const s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.onload=initMap;document.head.appendChild(s);
  }
  function initMap(){
    const m=L.map('mapbox').setView([40.7128,-74.0060],12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(m);
    L.marker([40.7128,-74.0060]).addTo(m).bindPopup('<b>New York City</b>').openPopup();
    L.marker([40.7580,-73.9855]).addTo(m).bindPopup('Times Square ✨');
    L.marker([40.6892,-74.0445]).addTo(m).bindPopup('Statue of Liberty 🗽');
  }
}

// ── APP STORE ─────────────────────────────────────────────
function buildAppStore(c){
  const apps=[
    {n:'VS Code',d:'Code editor',r:'4.9',p:'Free',e:'💻',tag:'Dev'},
    {n:'Notion',d:'All-in-one workspace',r:'4.8',p:'Free',e:'📓',tag:'Productivity'},
    {n:'Spotify',d:'Music streaming',r:'4.7',p:'Free',e:'🎵',tag:'Music'},
    {n:'Figma',d:'Collaborative design',r:'4.8',p:'Free',e:'🎨',tag:'Design'},
    {n:'Slack',d:'Team communication',r:'4.6',p:'Free',e:'💬',tag:'Social'},
    {n:'1Password',d:'Password manager',r:'4.9',p:'$2.99',e:'🔐',tag:'Security'},
  ];
  c.innerHTML=`<div class="app-store">
    <div class="app-store-header">
      <div class="as-search"><i class="fas fa-search"></i><input placeholder="Search Apps…"></div>
      <div class="as-cats">
        <button class="as-cat active">Featured</button>
        <button class="as-cat">Categories</button>
        <button class="as-cat">Top Charts</button>
      </div>
    </div>
    <div class="app-grid-store">
      ${apps.map(a=>`<div class="app-card">
        <div style="font-size:44px;margin-bottom:8px">${a.e}</div>
        <h3>${a.n}</h3>
        <div class="app-desc">${a.d}</div>
        <div class="app-stars">★ ${a.r}</div>
        <button class="download-btn">${a.p}</button>
      </div>`).join('')}
    </div>
  </div>`;
  c.querySelectorAll('.as-cat').forEach(b=>b.addEventListener('click',()=>{c.querySelectorAll('.as-cat').forEach(x=>x.classList.remove('active'));b.classList.add('active');}));
}

// ── SAFARI ────────────────────────────────────────────────
function buildSafari(c){
  c.innerHTML=`<div class="safari-browser" style="display:flex;flex-direction:column;height:100%">
    <div class="safari-toolbar">
      <button class="nav-btn" id="bb">‹</button>
      <button class="nav-btn" id="ff">›</button>
      <button class="nav-btn" id="rr">↻</button>
      <div class="address-bar"><i class="fas fa-lock"></i><input id="url" value="https://www.wikipedia.org"></div>
      <button style="padding:4px 12px;border:none;background:#0071e3;color:#fff;border-radius:8px;cursor:pointer;font-size:13px" id="go">Go</button>
    </div>
    <div style="flex:1;overflow:hidden">
      <iframe id="sf" src="https://en.m.wikipedia.org/wiki/Main_Page" style="width:100%;height:100%;border:none"></iframe>
    </div>
  </div>`;
  const fr=c.querySelector('#sf'),url=c.querySelector('#url');
  c.querySelector('#go').onclick=()=>{let u=url.value;if(!u.startsWith('http'))u='https://'+u;fr.src=u;};
  url.addEventListener('keydown',e=>{if(e.key==='Enter')c.querySelector('#go').click();});
  c.querySelector('#rr').onclick=()=>fr.contentWindow?.location.reload();
}

// ── TERMINAL ──────────────────────────────────────────────
function buildTerminal(c){
  c.style.background='#1a1a1a';
  c.innerHTML=`<div class="terminal-content">
    <div class="terminal-titlebar">bash — 80×24</div>
    <div class="terminal-output" id="to">
      <div class="welcome">Last login: ${new Date().toDateString()} on ttys001</div>
      <div class="welcome">macOS Web Terminal v1.0 — type 'help' for commands</div>
      <br>
    </div>
    <div class="terminal-input-line">
      <span class="prompt">user@macweb ~ %</span>
      <input type="text" id="ti" autocomplete="off" spellcheck="false">
    </div>
  </div>`;
  const out=c.querySelector('#to'),inp=c.querySelector('#ti');
  let hist=[],hi=0;
  const cmds={
    help:{d:'Show commands',fn:()=>'Available: '+Object.keys(cmds).join(', ')},
    ls:{d:'List files',fn:()=>'Desktop  Documents  Downloads  Movies  Music  Pictures'},
    pwd:{d:'Print directory',fn:()=>'/Users/user'},
    date:{d:'Show date',fn:()=>new Date().toString()},
    whoami:{d:'Current user',fn:()=>'user'},
    echo:{d:'Echo text',fn:a=>a.join(' ')},
    clear:{d:'Clear screen',fn:()=>{out.innerHTML='';return null;}},
    uname:{d:'System info',fn:()=>'macOS Web Darwin 23.0.0'},
    neofetch:{d:'System info',fn:()=>`<span style="color:#0071e3">     ████</span>  macOS Web 14.0<br><span style="color:#0071e3">   ████████</span>  Kernel: WebKit 537<br><span style="color:#0071e3">  ██████████</span>  Shell: bash<br><span style="color:#0071e3">  ██████████</span>  Resolution: ${window.innerWidth}x${window.innerHeight}<br><span style="color:#0071e3">   ████████</span>  CPU: Apple M-series<br><span style="color:#0071e3">     ████</span>  Memory: 16 GB`},
    cal:{d:'Show calendar',fn:()=>{const d=new Date();return d.toLocaleDateString('en-US',{month:'long',year:'numeric'})+'\n Su Mo Tu We Th Fr Sa';}},
    exit:{d:'Close terminal',fn:()=>{c.closest('.window')?.querySelector('.window-control.close')?.click();return null;}},
  };
  function addLine(html,cls='output'){const d=document.createElement('div');d.className=`terminal-line ${cls}`;d.innerHTML=html;out.appendChild(d);out.scrollTop=9999;}
  inp.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
      const raw=inp.value.trim();inp.value='';
      if(!raw)return;
      hist.push(raw);hi=hist.length;
      addLine(`<span style="color:#32d74b">user@macweb ~ %</span> ${raw}`,'command');
      const [cmd,...args]=raw.split(' ');
      if(cmds[cmd]){const r=cmds[cmd].fn(args);if(r!==null&&r!==undefined)addLine(r);}
      else addLine(`<span style="color:#ff453a">command not found: ${cmd}</span>`,'error');
    }
    if(e.key==='ArrowUp'){if(hi>0)hi--;inp.value=hist[hi]||'';}
    if(e.key==='ArrowDown'){if(hi<hist.length-1)hi++;inp.value=hist[hi]||'';}
  });
  c.addEventListener('click',()=>inp.focus());
  setTimeout(()=>inp.focus(),100);
}

// ── NOTIFICATIONS ─────────────────────────────────────────
function showNotif(icon,title,msg){
  const n=document.createElement('div');n.className='notif';
  n.innerHTML=`<div class="notif-icon">${icon}</div><div class="notif-body"><h4>${title}</h4><p>${msg}</p></div>`;
  document.body.appendChild(n);
  setTimeout(()=>n.classList.add('show'),50);
  setTimeout(()=>{n.classList.remove('show');setTimeout(()=>n.remove(),400);},4000);
}
setTimeout(()=>showNotif('🍎','macOS Web','Welcome! Click dock icons to open apps.'),1500);
setTimeout(()=>showNotif('⌨️','Spotlight','Press Cmd+K or Ctrl+K to open Spotlight'),4000);

// ── MUSIC WIDGET ──────────────────────────────────────────
let playing=false,playIv=null;
window.togglePlay=()=>{
  playing=!playing;
  const icon=document.getElementById('play-icon');
  if(icon)icon.className=playing?'fas fa-pause':'fas fa-play';
  clearInterval(playIv);
  if(playing){
    playIv=setInterval(()=>{
      const fill=document.getElementById('mpf');
      if(!fill){clearInterval(playIv);return;}
      let w=parseFloat(fill.style.width)||35;
      if(w>=100)w=0;
      fill.style.width=(w+0.08)+'%';
    },100);
  }
};

});// end DOMContentLoaded
