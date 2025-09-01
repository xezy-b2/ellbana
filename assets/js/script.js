// ===== CONFIGURATION =====
const twitchChannel = 'Ellbana';

// Détection du domaine et du port
let host = location.hostname;
if(host === 'localhost' && location.port) {
  host += `:${location.port}`;
}

const twitchParents = [host];

const youtubePlaylistId = 'PLDemo'; 
const socials = {
  Twitch:'#',
  YouTube:'#',
  Discord:'#'
};
const donations = '#';
const schedule = [
  {jour:'Lundi',heure:'20h-23h'},
  {jour:'Mercredi',heure:'20h-23h'},
  {jour:'Samedi',heure:'15h-18h'}
];

// ===== TWITCH PLAYER & CHAT via Script Officiel =====
const twitchScript = document.createElement('script');
twitchScript.src = "https://embed.twitch.tv/embed/v1.js";
twitchScript.defer = true;
document.body.appendChild(twitchScript);

twitchScript.onload = () => {
  new Twitch.Embed("twitch-player", {
      width: "100%",
      height: 480,
      channel: twitchChannel,
      parent: twitchParents
  });

  new Twitch.Embed("twitch-chat", {
      width: "100%",
      height: 480,
      layout: "chat",
      channel: twitchChannel,
      parent: twitchParents
  });
};

// ===== PLANNING DYNAMIQUE =====
const scheduleBody = document.getElementById('scheduleBody');
schedule.forEach(s => {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${s.jour}</td><td>${s.heure}</td>`;
  scheduleBody.appendChild(tr);
});

// ===== REDIFS YOUTUBE =====
const vodGrid = document.getElementById('vodGrid');
for(let i=0;i<6;i++){
  const div = document.createElement('div');
  div.className='panel';
  div.innerHTML = `<iframe src="https://www.youtube.com/embed/videoseries?list=${youtubePlaylistId}" frameborder="0" allowfullscreen></iframe>`;
  vodGrid.appendChild(div);
}

// ===== RESEAUX SOCIAUX =====
const socialDiv = document.getElementById('socialLinks');
for(const [name,url] of Object.entries(socials)){
  const a = document.createElement('a');
  a.href = url;
  a.textContent = name;
  a.target = '_blank';
  socialDiv.appendChild(a);
}

// ===== BOUTONS DONATION =====
document.getElementById('donateBtn').href = donations;
document.getElementById('donateTop').href = donations;

// ===== ANNEE DYNAMIQUE =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== BULLES ANIMEES =====
const canvas = document.getElementById('bubbles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let bubbles = [];
for(let i=0;i<50;i++){
  bubbles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*8 + 2,
    d: Math.random()*2
  });
}

function drawBubbles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  bubbles.forEach(b => {
    ctx.moveTo(b.x,b.y);
    ctx.arc(b.x,b.y,b.r,0,Math.PI*2,true);
  });
  ctx.fill();
  moveBubbles();
}

function moveBubbles(){
  bubbles.forEach(b => {
    b.y -= b.d;
    if(b.y < 0){
      b.y = canvas.height;
      b.x = Math.random()*canvas.width;
    }
  });
}

setInterval(drawBubbles,50);
