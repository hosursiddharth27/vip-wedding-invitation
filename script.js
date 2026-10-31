/* ===== EDIT YOUR DETAILS HERE ===== */
const W = {
  names: "Aarav & Meera",
  city: "Udaipur · Rajasthan",
  dateLine: "20 · 12 · 2026",
  dateShort: "20 December 2026",
  venue: "The Royal Palace, Udaipur",
  dress: "Black Tie · Gold Accents",
  pass: "Pass No. 001",
  target: "2026-12-20T19:00:00+05:30",
  whatsapp: "919999999999",            // country code + number, no + or spaces
  mapLink: "https://maps.google.com/?q=Udaipur+City+Palace",
  moments: ["Meet","Moments","Love","Proposal","Forever"],   // photos: images/1.jpg ... 5.jpg
  events: [
    ["18 Dec","Welcome Dinner"],
    ["19 Dec","Mehendi & Sangeet"],
    ["20 Dec","Wedding Ceremony"],
    ["20 Dec","Reception Gala"]
  ]
};
/* =================================== */
const $ = s => document.querySelector(s);
document.querySelectorAll("[data-k]").forEach(e => e.textContent = W[e.dataset.k]);
$("#reel").innerHTML = W.moments.map((m,i)=>`<div class="card"><img src="images/${i+1}.jpg" alt="${m}" loading="lazy"><span>${m}</span></div>`).join("");
$("#events").innerHTML = W.events.map(e=>`<li class="rv"><em>${e[0]}</em><b>${e[1]}</b></li>`).join("");
$("#wa").href = `https://wa.me/${W.whatsapp}?text=${encodeURIComponent("Yes, I will be attending the wedding of "+W.names+" ✨")}`;
$("#map").href = W.mapLink;

// countdown
function tick(){
  let d = Math.max(0,(new Date(W.target)-Date.now())/1000);
  $("#timer").innerHTML = [["Days",86400],["Hours",3600],["Mins",60],["Secs",1]].map(([l,s])=>{
    const n=Math.floor(d/s); d-=n*s; return `<div><b>${String(n).padStart(2,"0")}</b><small>${l}</small></div>`}).join("");
}
tick(); setInterval(tick,1000);

// scroll reveal
const io = new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("in")),{threshold:.15});
const reveal = () => document.querySelectorAll(".rv").forEach(el=>io.observe(el));

// music
const bgm = $("#bgm"), snd = $("#sound");
bgm.volume = .55;
function setSound(on){ on ? bgm.play().catch(()=>{}) : bgm.pause(); snd.classList.toggle("off",!on); }
snd.onclick = () => setSound(bgm.paused);

// enter
$("#enter").onclick = () => {
  $("#gate").classList.add("out");
  $("#site").classList.remove("hide");
  window.scrollTo(0,0); reveal(); setSound(true);
};

// gold dust
const cv=$("#dust"),cx=cv.getContext("2d"); let w,h;
const rs=()=>{w=cv.width=innerWidth;h=cv.height=innerHeight}; rs(); addEventListener("resize",rs);
const P=Array.from({length:55},()=>({x:Math.random()*w,y:Math.random()*h,r:.5+Math.random()*1.6,v:.15+Math.random()*.4,a:Math.random()}));
(function f(){
  cx.clearRect(0,0,w,h);
  P.forEach(p=>{p.y-=p.v;p.a+=.02;if(p.y<-5){p.y=h+5;p.x=Math.random()*w}
    cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.3);cx.fillStyle=`rgba(232,198,110,${.15+.45*Math.abs(Math.sin(p.a))})`;cx.fill()});
  requestAnimationFrame(f);
})();
