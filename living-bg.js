/*
  living-bg.js — shared low-poly, flat-shaded ambient background for SE Stump Jumpers.
  Usage: <canvas id="living-bg" data-theme="prairie|bayou|oak"></canvas>
         <script src="three.min.js (r128)"></script>
         <script src="./living-bg.js"></script>
  Each theme has its own palette, accent geometry, particle behavior, and camera motion.
  Pages layer a dark scrim on top for text legibility.
*/
(function () {
  const canvas = document.getElementById('living-bg');
  if (!window.THREE || !canvas) return;

  const theme = (canvas.dataset.theme || 'prairie').toLowerCase();

  const THEMES = {
    // Sunny, dense coastal prairie
    prairie: {
      bg: 0x8fc0e6, fog: 0xbcd8ee, fogDensity: 0.012,
      ground: 0x2c4a1b,
      grass: [0x4f7a26, 0x6f9433, 0x9aab3d],
      ambient: 0xcfe0bd, ambIntensity: 1.55,
      sun: 0xfff3cc, sunIntensity: 2.2, sunPos: [-7, 13, 6], rim: 0.6,
      bladeCount: 1500, spreadX: 70, spreadZ: 36, bladeH: [1.0, 1.7],
      particle: 'pollen', mote: 0xfff2b0, accent: 'none', camera: 'drift'
    },
    // Hazy bayou edge: water, mist, fireflies, cypress
    bayou: {
      bg: 0x18342c, fog: 0x1f4034, fogDensity: 0.024,
      ground: 0x1c3c2d,
      grass: [0x2f6052, 0x3f8a5a, 0x52a86a],
      ambient: 0x3e6256, ambIntensity: 2.0,
      sun: 0xd8f2df, sunIntensity: 1.7, sunPos: [-6, 11, -1], rim: 0.45,
      bladeCount: 320, spreadX: 60, spreadZ: 30, bladeH: [1.2, 2.2],
      particle: 'fireflies', mote: 0xffd56b, accent: 'cypress', water: true, camera: 'slow'
    },
    // Warm live-oak: a big oak, falling leaves, gentle orbit
    oak: {
      bg: 0x2a2012, fog: 0x352818, fogDensity: 0.02,
      ground: 0x35291a,
      grass: [0x5a6e2e, 0x7e7a34, 0x99883e],
      ambient: 0x6a5a3a, ambIntensity: 1.7,
      sun: 0xffd79a, sunIntensity: 2.0, sunPos: [8, 11, 5], rim: 0.4,
      bladeCount: 260, spreadX: 50, spreadZ: 26, bladeH: [0.8, 1.5],
      particle: 'leaves', mote: 0xd8b56a, accent: 'oak', camera: 'orbit'
    }
  };
  const C = THEMES[theme] || THEMES.prairie;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(C.bg);
  scene.fog = new THREE.FogExp2(C.fog, C.fogDensity);

  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 280);
  camera.position.set(0, 3.6, 16);
  camera.lookAt(0, 1.8, -6);

  scene.add(new THREE.AmbientLight(C.ambient, C.ambIntensity));
  const sun = new THREE.DirectionalLight(C.sun, C.sunIntensity);
  sun.position.set(C.sunPos[0], C.sunPos[1], C.sunPos[2]);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0x9fc0e0, C.rim);
  rim.position.set(4, 6, -8);
  scene.add(rim);

  // Ground — gently displaced low-poly plane
  const groundGeo = new THREE.PlaneGeometry(220, 160, 24, 18);
  const gp = groundGeo.attributes.position;
  for (let i = 0; i < gp.count; i++) {
    gp.setZ(i, Math.sin(gp.getX(i) * 0.12) * 0.6 + Math.cos(gp.getY(i) * 0.1) * 0.5);
  }
  groundGeo.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({ color: C.ground, roughness: 1, flatShading: true }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.2;
  scene.add(ground);

  // ---- Grass (instanced for density) ----
  const bladeGeo = new THREE.ConeGeometry(0.05, 1, 3);
  bladeGeo.translate(0, 0.5, 0);
  const grassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.96, flatShading: true });
  const COUNT = C.bladeCount;
  const grass = new THREE.InstancedMesh(bladeGeo, grassMat, COUNT);
  grass.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const gdat = [];
  const dummy = new THREE.Object3D();
  const tmpCol = new THREE.Color();
  const pal = C.grass.map((h) => new THREE.Color(h));
  for (let i = 0; i < COUNT; i++) {
    const x = (Math.random() - 0.5) * C.spreadX;
    const z = -8 + Math.random() * C.spreadZ;
    const depth = (z + 8) / C.spreadZ;
    const h = C.bladeH[0] + Math.random() * (C.bladeH[1] - C.bladeH[0]) + depth * 0.7;
    const sx = 0.7 + Math.random() * 0.8;
    const yRot = Math.random() * Math.PI;
    const d = { x, z, h, sx, yRot, phase: Math.random() * Math.PI * 2, rate: 0.6 + Math.random() * 0.9, tilt: (Math.random() - 0.5) * 0.12 };
    gdat.push(d);
    dummy.position.set(x, -0.2, z);
    dummy.rotation.set(0, yRot, d.tilt);
    dummy.scale.set(sx, h, sx);
    dummy.updateMatrix();
    grass.setMatrixAt(i, dummy.matrix);
    tmpCol.copy(pal[i % pal.length]);
    grass.setColorAt(i, tmpCol);
  }
  if (grass.instanceColor) grass.instanceColor.needsUpdate = true;
  scene.add(grass);

  // ---- Theme accents ----
  let water = null;
  if (C.water) {
    const wGeo = new THREE.PlaneGeometry(160, 80, 44, 26);
    water = new THREE.Mesh(wGeo, new THREE.MeshStandardMaterial({ color: 0x103029, roughness: 0.22, metalness: 0.0, transparent: true, opacity: 0.92 }));
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, -0.05, -16);
    water.userData.base = wGeo.attributes.position.array.slice(0);
    scene.add(water);
  }

  function addTreeline() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x274a1c, roughness: 1, flatShading: true });
    for (let i = 0; i < 12; i++) {
      const tr = new THREE.Mesh(new THREE.ConeGeometry(3 + Math.random() * 2, 7 + Math.random() * 5, 5), mat);
      tr.position.set(-50 + i * 9 + (Math.random() - 0.5) * 4, 2.6, -50 - Math.random() * 8);
      scene.add(tr);
    }
  }
  function addCypress() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x0a1512, roughness: 1, flatShading: true });
    for (let i = 0; i < 6; i++) {
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 1.0, 16, 6), mat);
      trunk.position.y = 8; g.add(trunk);
      for (let k = 0; k < 4; k++) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(4 - k * 0.7, 5, 6), mat);
        cone.position.y = 7 + k * 3.4; g.add(cone);
      }
      g.position.set(-30 + i * 12 + (Math.random() - 0.5) * 5, 0, -32 - Math.random() * 12);
      scene.add(g);
    }
  }
  function addOak() {
    const bark = new THREE.MeshStandardMaterial({ color: 0x4a3320, roughness: 1, flatShading: true });
    const leaf = new THREE.MeshStandardMaterial({ color: 0x4f7322, roughness: 1, flatShading: true });
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.6, 11, 8), bark);
    trunk.position.y = 5.5; g.add(trunk);
    const crown = [[0, 11, 0, 4.2], [-3.5, 10, 1, 3.2], [3.5, 10, -1, 3.2], [0, 13.5, 0, 3.4], [-2.5, 12.5, 2, 2.6], [3, 12.5, -2, 2.6]];
    crown.forEach(([x, y, z, r]) => { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), leaf); b.position.set(x, y, z); g.add(b); });
    g.position.set(2, -0.2, -8); g.scale.setScalar(1.1);
    scene.add(g);
  }
  if (C.accent === 'treeline') addTreeline();
  else if (C.accent === 'cypress') addCypress();
  else if (C.accent === 'oak') addOak();

  // ---- Particles (behavior per theme) ----
  const PCOUNT = C.particle === 'pollen' ? 280 : 170;
  const pgeo = new THREE.BufferGeometry();
  const ppos = new Float32Array(PCOUNT * 3);
  const pseed = [];
  for (let i = 0; i < PCOUNT; i++) {
    ppos[i * 3] = (Math.random() - 0.5) * 70;
    ppos[i * 3 + 1] = Math.random() * 16;
    ppos[i * 3 + 2] = -24 + Math.random() * 42;
    pseed.push({ sx: Math.random() * 6.28, sy: Math.random() * 6.28, sp: 0.3 + Math.random() * 0.7 });
  }
  pgeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3));
  const pmat = new THREE.PointsMaterial({
    color: C.mote,
    size: C.particle === 'leaves' ? 0.34 : C.particle === 'fireflies' ? 0.17 : 0.1,
    transparent: true,
    opacity: C.particle === 'fireflies' ? 0.9 : 0.65,
    depthWrite: false,
    blending: C.particle === 'leaves' ? THREE.NormalBlending : THREE.AdditiveBlending
  });
  const parts = new THREE.Points(pgeo, pmat);
  scene.add(parts);

  // ---- Animation ----
  const clock = new THREE.Clock();
  let t = 0, wind = 0.5, gust = 0, lastScroll = window.scrollY;
  addEventListener('scroll', () => {
    const dy = Math.abs(window.scrollY - lastScroll);
    lastScroll = window.scrollY;
    gust = Math.min(1.5, gust + dy * 0.01);
  }, { passive: true });
  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    t += dt; gust *= 0.94;
    wind = 0.4 + Math.sin(t * 0.6) * 0.18 + gust;

    for (let i = 0; i < COUNT; i++) {
      const d = gdat[i];
      dummy.position.set(d.x, -0.2, d.z);
      dummy.rotation.set(Math.cos(t * d.rate * 0.7 + d.phase) * 0.05 * wind, d.yRot, d.tilt + Math.sin(t * d.rate + d.phase) * 0.14 * wind);
      dummy.scale.set(d.sx, d.h, d.sx);
      dummy.updateMatrix();
      grass.setMatrixAt(i, dummy.matrix);
    }
    grass.instanceMatrix.needsUpdate = true;

    if (water) {
      const wp = water.geometry.attributes.position;
      const base = water.userData.base;
      for (let i = 0; i < wp.count; i++) {
        const bx = base[i * 3], by = base[i * 3 + 1];
        wp.setZ(i, Math.sin(bx * 0.3 + t * 1.4) * 0.25 + Math.cos(by * 0.4 + t * 1.1) * 0.2);
      }
      wp.needsUpdate = true;
      water.geometry.computeVertexNormals();
    }

    const arr = parts.geometry.attributes.position.array;
    for (let i = 0; i < PCOUNT; i++) {
      const s = pseed[i];
      if (C.particle === 'leaves') {
        arr[i * 3] += Math.sin(t * 0.8 + s.sx) * 0.02 + 0.006 * wind;
        arr[i * 3 + 1] -= 0.02 + s.sp * 0.02;
        arr[i * 3 + 2] += Math.cos(t * 0.6 + s.sy) * 0.012;
        if (arr[i * 3 + 1] < 0.2) arr[i * 3 + 1] = 14 + Math.random() * 3;
      } else if (C.particle === 'fireflies') {
        arr[i * 3] += Math.sin(t * 0.5 + s.sx) * 0.012;
        arr[i * 3 + 1] += Math.sin(t * s.sp + s.sy) * 0.006;
        arr[i * 3 + 2] += Math.cos(t * 0.4 + s.sx) * 0.01;
      } else {
        arr[i * 3] += Math.sin(t * 0.3 + s.sx) * 0.01 + 0.004 * wind;
        arr[i * 3 + 1] += 0.004 + Math.sin(t * s.sp + s.sy) * 0.004;
        if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = 0.3;
      }
      if (arr[i * 3] > 36) arr[i * 3] = -36;
      else if (arr[i * 3] < -36) arr[i * 3] = 36;
    }
    parts.geometry.attributes.position.needsUpdate = true;
    if (C.particle === 'fireflies') pmat.opacity = 0.6 + Math.sin(t * 2.0) * 0.3;

    if (C.camera === 'orbit') {
      const a = Math.sin(t * 0.06) * 0.5;
      camera.position.set(2 + Math.sin(a) * 23, 6.8 + Math.sin(t * 0.05) * 0.6, -8 + Math.cos(a) * 23);
      camera.lookAt(2, 5.5, -8);
    } else if (C.camera === 'slow') {
      camera.position.x = Math.sin(t * 0.05) * 0.8;
      camera.position.y = 2.6 + Math.sin(t * 0.04) * 0.2;
      camera.lookAt(0, 1.4, -8);
    } else {
      camera.position.x = Math.sin(t * 0.08) * 1.2;
      camera.position.y = 3.6 + Math.sin(t * 0.06) * 0.25;
      camera.lookAt(0, 1.8, -6);
    }

    renderer.render(scene, camera);
  }
  animate();
})();
