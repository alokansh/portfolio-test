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

/* === 3D Orbiting Project Sphere (test site) === */
(function () {
  const sphere = document.getElementById("projectSphere");
  if (!sphere) return;
  const items = Array.from(sphere.querySelectorAll(".sphere-item"));
  const RADIUS = 130;

  // Distribute items evenly on a sphere (Fibonacci sphere)
  const n = items.length;
  const pts = items.map((_, i) => {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;        // 1 -> -1
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * Math.PI * (3 - Math.sqrt(5));       // golden angle
    return { x: Math.cos(phi) * r, y: y, z: Math.sin(phi) * r };
  });

  let angleX = 0.4, angleY = 0;
  let velX = 0.002, velY = 0.004;       // idle auto-spin
  let dragging = false, lastX = 0, lastY = 0;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;                    // fallback CSS layout handles it

  function rotate() {
    const cx = Math.cos(angleX), sx = Math.sin(angleX);
    const cy = Math.cos(angleY), sy = Math.sin(angleY);
    items.forEach((el, i) => {
      let { x, y, z } = pts[i];
      // rotate around X
      let y1 = y * cx - z * sx;
      let z1 = y * sx + z * cx;
      // rotate around Y
      let x2 = x * cy + z1 * sy;
      let z2 = -x * sy + z1 * cy;
      const scale = (z2 + 1.6) / 2.6;     // 0.2..1 depth scale
      const opacity = 0.45 + scale * 0.55;
      el.style.transform =
        `translate3d(${x2 * RADIUS}px, ${y1 * RADIUS}px, ${z2 * RADIUS}px) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = Math.round(scale * 100);
    });
  }

  function tick() {
    if (!dragging) { angleX += velX; angleY += velY; }
    rotate();
    requestAnimationFrame(tick);
  }

  sphere.addEventListener("pointerdown", (e) => {
    dragging = true; lastX = e.clientX; lastY = e.clientY;
    sphere.setPointerCapture(e.pointerId);
  });
  sphere.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    angleY += dx * 0.01;
    angleX += dy * 0.01;
  });
  const stop = () => { dragging = false; };
  sphere.addEventListener("pointerup", stop);
  sphere.addEventListener("pointerleave", stop);

  rotate();
  requestAnimationFrame(tick);
})();
