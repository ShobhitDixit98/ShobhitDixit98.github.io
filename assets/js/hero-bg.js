/**
 * 3D Neural Network Hero — Three.js
 * AI/ML Engineer theme:
 *   - Floating neural nodes (glowing spheres)
 *   - Pulsing synaptic connections
 *   - Data pulses traveling along edges
 *   - Wireframe icosahedra (background structure)
 *   - Particle cloud
 *   - Smooth mouse parallax + auto-rotation
 */
(function () {
  'use strict';

  function waitForThree() {
    if (typeof THREE === 'undefined') { setTimeout(waitForThree, 50); return; }
    initScene();
  }

  function initScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    /* ── Renderer ─────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0); // transparent — CSS bg shows through

    /* ── Scene & Camera ──────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    camera.position.z = 95;

    /* ── Mouse parallax ──────────────────────────────── */
    let mx = 0, my = 0, lx = 0, ly = 0;
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* ── Brand colour palette ─────────────────────────── */
    const PAL = [0x7c3aed, 0x4f46e5, 0x2563eb, 0x06b6d4, 0xff2525, 0xa855f7, 0x8b5cf6];

    /* ── Main rotation group ─────────────────────────── */
    const group = new THREE.Group();
    scene.add(group);

    /* ── Neural nodes ────────────────────────────────── */
    const NODE_N = 75;
    const nodes = [];
    for (let i = 0; i < NODE_N; i++) {
      const r   = Math.random() * 0.55 + 0.28;
      const col = PAL[i % PAL.length];
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(r, 8, 8),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: Math.random() * 0.5 + 0.4 })
      );
      mesh.position.set(
        (Math.random() - 0.5) * 170,
        (Math.random() - 0.5) * 110,
        (Math.random() - 0.5) * 80
      );
      mesh.userData = {
        vx: (Math.random() - 0.5) * 0.045,
        vy: (Math.random() - 0.5) * 0.045,
        vz: (Math.random() - 0.5) * 0.025,
        phase: Math.random() * Math.PI * 2,
        freq:  Math.random() * 1.2 + 0.5,
        baseOp: Math.random() * 0.5 + 0.4,
        col: new THREE.Color(col),
      };
      group.add(mesh);
      nodes.push(mesh);
    }

    /* ── Synaptic connections ────────────────────────── */
    const MAX_DIST = 40;
    const conns = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < MAX_DIST && Math.random() < 0.3) {
          const c1 = nodes[i].userData.col, c2 = nodes[j].userData.col;
          const pos  = new Float32Array([nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                                          nodes[j].position.x, nodes[j].position.y, nodes[j].position.z]);
          const cols = new Float32Array([c1.r, c1.g, c1.b, c2.r, c2.g, c2.b]);
          const geo  = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(pos,  3));
          geo.setAttribute('color',    new THREE.BufferAttribute(cols, 3));
          const mat  = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.15 });
          group.add(new THREE.Line(geo, mat));
          conns.push({ geo, mat, i, j });
        }
      }
    }

    /* ── Data pulses ─────────────────────────────────── */
    const pulses = [];
    const PULSE_GEO = new THREE.SphereGeometry(0.28, 6, 6);
    function spawnPulse() {
      if (!conns.length) return;
      const c   = conns[Math.floor(Math.random() * conns.length)];
      const mat = new THREE.MeshBasicMaterial({ color: nodes[c.i].userData.col, transparent: true, opacity: 0.95 });
      const mesh = new THREE.Mesh(PULSE_GEO, mat);
      group.add(mesh);
      pulses.push({ mesh, mat, from: nodes[c.i].position, to: nodes[c.j].position, t: 0, spd: 0.012 + Math.random() * 0.02 });
    }
    for (let i = 0; i < 10; i++) setTimeout(spawnPulse, i * 250);

    /* ── Background particle cloud ───────────────────── */
    const PCOUNT = 300;
    const pPos = new Float32Array(PCOUNT * 3), pCol = new Float32Array(PCOUNT * 3);
    for (let i = 0; i < PCOUNT; i++) {
      pPos[i*3]   = (Math.random() - 0.5) * 260;
      pPos[i*3+1] = (Math.random() - 0.5) * 160;
      pPos[i*3+2] = (Math.random() - 0.5) * 100 - 10;
      const c = new THREE.Color(PAL[Math.floor(Math.random() * PAL.length)]);
      pCol[i*3] = c.r; pCol[i*3+1] = c.g; pCol[i*3+2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
    const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({
      vertexColors: true, size: 0.58, transparent: true, opacity: 0.32, sizeAttenuation: true
    }));
    scene.add(pts);

    /* ── Wireframe icosahedra ─────────────────────────── */
    const wire1 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(24, 2),
      new THREE.MeshBasicMaterial({ color: 0x4f46e5, wireframe: true, transparent: true, opacity: 0.055 })
    );
    wire1.position.set(28, -5, -28);
    scene.add(wire1);

    const wire2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(15, 1),
      new THREE.MeshBasicMaterial({ color: 0xff2525, wireframe: true, transparent: true, opacity: 0.04 })
    );
    wire2.position.set(-38, 12, -8);
    scene.add(wire2);

    /* ── Resize ──────────────────────────────────────── */
    new ResizeObserver(() => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }).observe(canvas);

    /* ── Animation loop ──────────────────────────────── */
    let t = 0, autoY = 0, lastPulse = 0;

    function animate(now) {
      requestAnimationFrame(animate);
      t += 0.01; autoY += 0.001;

      // Mouse parallax
      lx += (mx - lx) * 0.04;
      ly += (my - ly) * 0.04;
      group.rotation.y = lx * 0.20 + autoY;
      group.rotation.x = -ly * 0.10;

      // Node drift + pulse
      nodes.forEach(n => {
        const ud = n.userData;
        const p  = Math.sin(t * ud.freq * 2 + ud.phase);
        n.scale.setScalar(1 + p * 0.28);
        n.material.opacity = ud.baseOp * (0.65 + Math.abs(p) * 0.45);
        n.position.x += ud.vx; n.position.y += ud.vy; n.position.z += ud.vz;
        if (Math.abs(n.position.x) > 85) ud.vx *= -1;
        if (Math.abs(n.position.y) > 55) ud.vy *= -1;
        if (Math.abs(n.position.z) > 40) ud.vz *= -1;
      });

      // Update connection geometry + flicker opacity
      conns.forEach(c => {
        const pa = c.geo.attributes.position.array;
        const a = nodes[c.i].position, b = nodes[c.j].position;
        pa[0]=a.x; pa[1]=a.y; pa[2]=a.z; pa[3]=b.x; pa[4]=b.y; pa[5]=b.z;
        c.geo.attributes.position.needsUpdate = true;
        const d = a.distanceTo(b);
        c.mat.opacity = d < MAX_DIST + 8
          ? Math.max(0, 0.18 * (1 - d / (MAX_DIST + 8))) * (0.5 + Math.sin(t + c.i) * 0.5)
          : 0;
      });

      // Data pulses
      if (now - lastPulse > 500) { lastPulse = now; spawnPulse(); }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.spd;
        if (p.t >= 1) { group.remove(p.mesh); pulses.splice(i, 1); }
        else { p.mesh.position.lerpVectors(p.from, p.to, p.t); p.mat.opacity = Math.sin(p.t * Math.PI) * 0.9; }
      }

      // Wireframes
      wire1.rotation.y += 0.003; wire1.rotation.x += 0.001;
      wire2.rotation.y -= 0.004; wire2.rotation.z += 0.002;
      pts.rotation.y   += 0.0003;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }

  waitForThree();
})();
