const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const glow = document.querySelector(".cursor-glow");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

window.addEventListener("pointermove", (event) => {
  if (!glow) return;

  glow.style.transform = `translate3d(${event.clientX - 130}px, ${event.clientY - 130}px, 0)`;
});

document.querySelectorAll(".button, .contact-links a").forEach((link) => {
  link.addEventListener("pointerdown", () => link.classList.add("is-pressed"));
  link.addEventListener("pointerup", () => link.classList.remove("is-pressed"));
  link.addEventListener("pointerleave", () => link.classList.remove("is-pressed"));
});


/* === Circular Card Ring (test site) === */
(function () {
  const ring = document.getElementById("projectRing");
  if (!ring) return;
  const cards = Array.from(ring.querySelectorAll(".ring-card"));
  const RADIUS = 130;

  // angle of each card evenly on the circle
  const n = cards.length;
  const base = cards.map((_, i) => (i / n) * Math.PI * 2);

  let rot = 0;           // current ring rotation
  let vel = 0.0035;      // idle spin speed
  let dragging = false, lastX = 0;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;    // CSS fallback row handles layout

  function render() {
    cards.forEach((el, i) => {
      const a = base[i] + rot;
      const x = Math.cos(a) * RADIUS;
      const y = Math.sin(a) * RADIUS;
      // depth: cards in front (sin>0) bigger/brighter
      const depth = (Math.sin(a) + 1) / 2;       // 0..1
      const scale = 0.72 + depth * 0.4;
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale.toFixed(3)})`;
      el.style.opacity = (0.4 + depth * 0.6).toFixed(3);
      el.style.zIndex = String(Math.round(depth * 100));
    });
  }

  function tick() {
    if (!dragging) rot += vel;
    render();
    requestAnimationFrame(tick);
  }

  ring.addEventListener("pointerdown", (e) => {
    dragging = true; lastX = e.clientX;
    ring.setPointerCapture(e.pointerId);
  });
  ring.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    rot += dx * 0.01;
  });
  const stop = () => { dragging = false; };
  ring.addEventListener("pointerup", stop);
  ring.addEventListener("pointerleave", stop);

  render();
  requestAnimationFrame(tick);
})();
