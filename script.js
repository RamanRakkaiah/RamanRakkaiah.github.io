(function(){
  var root=document.documentElement;
  try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t)}catch(e){}

  document.getElementById('year').textContent=new Date().getFullYear();

  var nav=document.getElementById('nav'),bar=document.getElementById('progress');
  function onScroll(){
    var y=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
    nav.classList.toggle('scrolled',y>20);
    bar.style.width=(h>0?y/h*100:0)+'%';
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var btn=document.getElementById('menuBtn'),links=document.getElementById('navLinks');
  btn.addEventListener('click',function(){
    var o=links.classList.toggle('open');btn.classList.toggle('open',o);btn.setAttribute('aria-expanded',o);
  });
  links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');btn.classList.remove('open')})});

  document.getElementById('themeBtn').addEventListener('click',function(){
    var next=root.getAttribute('data-theme')==='light'?'dark':'light';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
  });

  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    items.forEach(function(el){io.observe(el)});
  }else{items.forEach(function(el){el.classList.add('in')})}

  document.querySelectorAll('[data-count]').forEach(function(el){
    var end=parseFloat(el.dataset.count),suf=el.dataset.suffix||'',dec=String(end).indexOf('.')>-1?1:0,start=null;
    function step(ts){
      if(!start)start=ts;var p=Math.min((ts-start)/1400,1);
      el.textContent=(end*p).toFixed(dec)+(p===1?suf:'');
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
})();
