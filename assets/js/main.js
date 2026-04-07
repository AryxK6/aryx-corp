/* ── LOADER ── */
(function(){
  var p=0,b=document.getElementById('ldrBar'),t=document.getElementById('ldrPct'),l=document.getElementById('ldr');
  document.body.style.overflow='hidden';
  var iv=setInterval(function(){
    p+=Math.random()*14+5;if(p>=100)p=100;
    if(b)b.style.width=p+'%';
    if(t)t.textContent=Math.floor(p)+'%';
    if(p>=100){clearInterval(iv);setTimeout(function(){l.classList.add('gone');document.body.style.overflow='';},380);}
  },70);
})();

/* ── PARTICLES ── */
(function(){
  var c=document.getElementById('pts'),ctx=c.getContext('2d'),W,H,pts=[];
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}
  resize();window.addEventListener('resize',function(){resize();init();});
  function init(){pts=[];var n=Math.floor(W*H/22000);for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.2+.3,a:Math.random()});}
  init();
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<pts.length;i++)for(var j=i+1;j<pts.length;j++){var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){ctx.beginPath();ctx.strokeStyle='rgba(0,212,255,'+(0.05*(1-d/110))+')';ctx.lineWidth=.5;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();}}
    pts.forEach(function(p){ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(0,212,255,'+(p.a*.4)+')';ctx.fill();p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;});
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── SCROLL ── */
window.addEventListener('scroll',function(){
  var h=document.documentElement,sy=h.scrollTop||document.body.scrollTop;
  document.getElementById('spb').style.width=(sy/(h.scrollHeight-h.clientHeight)*100)+'%';
  document.getElementById('nb').classList.toggle('s',sy>60);
  document.getElementById('btt').classList.toggle('sh',sy>400);
  /* aurora parallax */
  document.querySelectorAll('.aorb').forEach(function(o,i){o.style.transform='translateY('+(sy*[0.05,0.03,0.07,0.04][i])+'px)';});
  /* nav active */
  var ids=['home','about','services','projects','testimonials','contact'],act='home';
  ids.forEach(function(id){var s=document.getElementById(id);if(s&&s.getBoundingClientRect().top<=80)act=id;});
  document.querySelectorAll('.navl a').forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+act);});
});

/* ── BACK TO TOP ── */
document.getElementById('btt').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});

/* ── HAMBURGER ── */
var hb=document.getElementById('hbg'),mb=document.getElementById('mob');
hb.addEventListener('click',function(){hb.classList.toggle('o');mb.classList.toggle('o');});
document.querySelectorAll('.ml').forEach(function(a){a.addEventListener('click',function(){hb.classList.remove('o');mb.classList.remove('o');});});

/* ── 3D TILT ── */
document.querySelectorAll('.pc').forEach(function(card){
  card.addEventListener('mousemove',function(e){
    var r=card.getBoundingClientRect();
    var rx=((e.clientY-r.top)/r.height-.5)*14;
    var ry=-((e.clientX-r.left)/r.width-.5)*14;
    card.style.transition='transform 0.08s ease';
    card.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-10px)';
  });
  card.addEventListener('mouseleave',function(){
    card.style.transition='transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    card.style.transform='perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* ── SCROLL REVEAL ── */
var obs=new IntersectionObserver(function(entries){
  entries.forEach(function(e,i){if(e.isIntersecting)setTimeout(function(){e.target.classList.add('in');},i*90);});
},{threshold:0.07});
document.querySelectorAll('.rv,.rvl,.rvr,.rvs,.revup').forEach(function(el){obs.observe(el);});

/* ── TYPED TEXT ── */
(function(){
  var el=document.getElementById('td');
  var text='ARYX Co. is an independent digital studio building niche content platforms that connect people with the right knowledge. From AI tools to wellness, every project is built with purpose and clarity.';
  var i=0,cur=document.createElement('span');
  cur.className='tcursor';el.appendChild(cur);
  function type(){if(i<text.length){el.insertBefore(document.createTextNode(text[i]),cur);i++;setTimeout(type,20);}}
  setTimeout(type,2000);
})();

/* ── HERO STATS ── */
document.querySelectorAll('[data-count]').forEach(function(el){
  var t=+el.dataset.count,c=0;
  var iv=setInterval(function(){c++;el.textContent=String(c).padStart(2,'0');if(c>=t)clearInterval(iv);},1800/t);
});

/* ── BENTO COUNTERS ── */
var co=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      var el=e.target,t=+el.dataset.target,s=Math.max(10,Math.floor(2000/t)),c=0;
      var iv=setInterval(function(){c++;el.textContent=c;if(c>=t)clearInterval(iv);},s);
      co.unobserve(el);
    }
  });
},{threshold:0.3});
document.querySelectorAll('.cnum').forEach(function(el){co.observe(el);});

/* ── EMAIL REVEAL ── */
function showEmail(){
  var btn=document.getElementById('erb'),lbl=document.getElementById('el');
  if(btn.classList.contains('done'))return;
  var em='aryx.k6'+'@'+'gmail.com';
  lbl.style.opacity='0';
  setTimeout(function(){
    lbl.textContent=em;
    lbl.style.opacity='1';
    lbl.style.color='var(--glow)';
    lbl.style.letterSpacing='2px';
    btn.classList.add('done');
    btn.style.borderColor='rgba(0,212,255,0.5)';
    btn.style.color='var(--glow)';
    btn.onclick=function(){window.location.href='mailto:'+em;};
  },200);
}