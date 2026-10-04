(function(){
  var root=document.documentElement;
  // Theme toggle (remembered when storage is available)
  try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
  document.getElementById('theme').addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches);
    var next=dark?'light':'dark';root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
  });
  document.getElementById('yr').textContent=new Date().getFullYear();

  // Typing roles
  var roles=['web developer','software developer','software tester '],el=document.getElementById('typed'),r=0,c=0,del=false;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=roles[0]}
  else(function tick(){
    var w=roles[r];c+=del?-1:1;el.textContent=w.slice(0,c);
    var d=del?40:85;
    if(!del&&c===w.length){del=true;d=1400}else if(del&&c===0){del=false;r=(r+1)%roles.length;d=300}
    setTimeout(tick,d);
  })();

  // Highlight current section in nav
  var links=[].slice.call(document.querySelectorAll('nav a'));
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)});
  })},{rootMargin:'-40% 0px -55% 0px'});
  document.querySelectorAll('section[id]').forEach(function(s){io.observe(s)});

  // Copy email
  var cb=document.getElementById('copy');
  cb.addEventListener('click',function(){
    var m='subhashsenthilnathan007@gmail.com';
    var done=function(){cb.textContent='Copied';setTimeout(function(){cb.textContent='Copy email'},1800)};
    if(navigator.clipboard)navigator.clipboard.writeText(m).then(done,function(){cb.textContent=m});else cb.textContent=m;
  });
  // Resume download
  var pdf=Uint8Array.from(atob(RESUME_B64),function(c){return c.charCodeAt(0)});
  var blob=new Blob([pdf],{type:'application/pdf'}),rl=document.getElementById('resume'),dl=null;
  rl.href=URL.createObjectURL(blob);
  if(window.claude&&claude.use){claude.use('downloads').then(function(d){dl=d},function(){})}
  rl.addEventListener('click',function(e){
    if(!dl)return;
    e.preventDefault();
    dl.save({filename:'Subhash_S_Resume.pdf',data:blob}).catch(function(){});
  });

  // Certificate links: show a note until a real link replaces href="#"
  document.querySelectorAll('a.cert').forEach(function(a){
    a.addEventListener('click',function(e){
      if(a.getAttribute('href')==='#'){
        e.preventDefault();
        document.getElementById('certmsg').textContent='Certificate for "'+a.textContent.split(',')[0]+'" will be added soon.';
      }
    });
  });
})();