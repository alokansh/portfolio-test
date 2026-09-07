import * as THREE from 'three';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-header nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

function setupTiltCards() {
  if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -3.5}deg) rotateY(${x * 3.5}deg) translateZ(4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

function setupScene() {
  const container = document.querySelector('#scene');
  if (!container || reduceMotion) return;
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5.2;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 2),
      new THREE.MeshBasicMaterial({ color: 0xd77751, wireframe: true, transparent: true, opacity: .82 })
    );
    group.add(core);

    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf0d4b8 });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x967b66, transparent: true, opacity: .5 });
    const nodes = [];
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2;
      const radius = 1.65 + (i % 3) * .22;
      const node = new THREE.Mesh(new THREE.SphereGeometry(i % 4 === 0 ? .1 : .055, 12, 12), nodeMaterial);
      node.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.45) * .9, Math.sin(angle) * radius * .55);
      group.add(node);
      nodes.push(node);
      const points = [new THREE.Vector3(0, 0, 0), node.position.clone()];
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial));
    }
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, .008, 8, 100), lineMaterial);
    ring.rotation.x = Math.PI / 2.5;
    group.add(ring);

    const pointer = { x: 0, y: 0 };
    container.addEventListener('pointermove', event => {
      const rect = container.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - .5;
      pointer.y = (event.clientY - rect.top) / rect.height - .5;
    });
    const clock = new THREE.Clock();
    function animate() {
      const elapsed = clock.getElapsedTime();
      group.rotation.y += (pointer.x * .34 + .09 - group.rotation.y) * .025;
      group.rotation.x += (-pointer.y * .24 + Math.sin(elapsed * .35) * .03 - group.rotation.x) * .025;
      core.rotation.x = elapsed * .12;
      core.rotation.z = elapsed * .08;
      ring.rotation.z = elapsed * .1;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
    const resize = () => { camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight); };
    window.addEventListener('resize', resize);
  } catch (error) {
    container.innerHTML = '<div class="scene-fallback">Technology<br><i>meets</i><br>behaviour.</div>';
    console.warn('3D scene fallback active:', error);
  }
}

setupNavigation();
setupReveal();
setupTiltCards();
setupScene();
