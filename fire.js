const canvas = document.getElementById("fire-canvas");
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.bottom = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "150px";
canvas.style.zIndex = "9999";
canvas.style.pointerEvents = "none";

canvas.width = window.innerWidth;
canvas.height = 150;

let particles = [];

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height,
    size: Math.random() * 3 + 1,
    speedY: Math.random() * -1.5 - 0.5,
    alpha: 1,
    color: `rgb(${Math.floor(255)}, ${Math.floor(Math.random() * 150)}, 0)`
  };
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.y += p.speedY;
    p.alpha -= 0.01;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
  while (particles.length < 200) {
    particles.push(createParticle());
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function animate() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

animate();
