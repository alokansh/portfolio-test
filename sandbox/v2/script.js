// Cursor glow
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  if (cursorGlow) {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
  }
  requestAnimationFrame(animateGlow);
}
animateGlow();

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Tilt card
const tiltCard = document.getElementById('tiltCard');
if (tiltCard) {
  const inner = tiltCard.querySelector('.tilt-card-inner');
  
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (0.5 - y) * 8;
    const rotateY = (x - 0.5) * 8;
    
    tiltCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  });
  
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  });
}

// Nav scroll effect
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (nav) {
    if (window.scrollY > 100) {
      nav.style.borderColor = 'rgba(232,135,90,0.3)';
    } else {
      nav.style.borderColor = 'var(--border)';
    }
  }
  lastScrollY = window.scrollY;
}, { passive: true });
