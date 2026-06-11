/*
  living-bg.js — shared low-poly, flat-shaded ambient background for SE Stump Jumpers.
  Usage: <canvas id="living-bg" data-theme="prairie|bayou|oak"></canvas>
         <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
         <script src="./living-bg.js"></script>
  Kept deliberately dim; pages layer a dark scrim on top for text legibility.
*/
(function () {
  const canvas = document.getElementById('living-bg');
  if (!window.THREE || !canvas) return;

  const theme = (canvas.dataset.theme || 'prairie').toLowerCase();

  const THEMES = {
    prairie: {
      bg: 0x0f1a12, fog: 0x121f14, fogDensity: 0.03,
      ground: 0x16240f,
      grass: [0x3f5a23, 0x6f7a2c, 0xb6913e],
      ambient: 0x33402a, ambIntensity: 1.0,
      sun: 0xffd27f, sunIntensity: 1.2, sunPos: [-9, 10, 4],
      mote: 0xe8d9a0, accent: 'hills'
    },
    bayou: {
      bg: 0x09130f, fog: 0x0b1814, fogDensity: 0.05,
      ground: 0x0e1d16,
      grass: [0x20403a, 0x2c5340, 0x39674a],
      ambient: 0x16302a, ambIntensity: 0.85,
      sun: 0x8fb6a0, sunIntensity: 0.75, sunPos: [-6, 9, -3],
      mote: 0xffd070, accent: 'cypress'
    },
    oak: {
      bg: 0x130e07, fog: 0x17110a, fogDensity: 0.032,
      ground: 0x241a0f,
      grass: [0x4a5a2a, 0x7c6f32, 0x9c7b3a],
      ambient: 0x3a2c1a, ambIntensity: 1.05,
      sun: 0xffc070, sunIntensity: 1.25, sunPos: [8, 9, 3],
      mote: 0xd8b56a, accent: 'oak'
    }
  };
  const C = THEMES[theme] || THEMES.prairie;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(C.bg);
  scene.fog = new THREE.FogExp2(C.fog, C.fogDensity);

  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 220);
  camera.position.set(0, 3.6, 16);
  camera.lookAt(0, 1.6, -6);

  scene.add(new THREE.AmbientLight(C.ambient, C.ambIntensity));
  const sun = new THREE.DirectionalLight(C.sun, C.sunIntensity);
  sun.position.set(C.sunPos[0], C.sunPos[1], C.sunPos[2]);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0x8ea9c0, 0.3);
  rim.position.set(4, 6, -8);
  scene.add(rim);

  // Ground — gently displaced low-poly plane
  const groundGeo = new THREE.PlaneGeometry(160, 120, 24, 18);
  const gp = groundGeo.attributes.position;
  for (let i = 0; i < gp.count; i++) {
    gp.setZ(i, Math.sin(gp.getX(i) * 0.12) * 0.6 + Math.cos(gp.getY(i) * 0.1) * 0.5);
  }
  groundGeo.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({ color: C.ground, roughness: 1, flatShading: true }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.2;
  scene.add(ground);

  // Grass blades — faceted tapered cones, swaying
  const bladeGeo = new THREE.ConeGeometry(0.05, 1, 3);
  bladeGeo.translate(0, 0.5, 0); // base at origin
  const grassMats = C.grass.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.95, flatShading: true }));
  const blades = [];
  const BLADE_COUNT = 260;
  for (let i = 0; i < BLADE_COUNT; i++) {
    const m = new THREE.Mesh(bladeGeo, grassMats[i % grassMats.length]);
    const x = (Math.random() - 0.5) * 60;
    const z = -8 + Math.random() * 26;      // mostly in front of / around camera
    const depth = (z + 8) / 34;             // 0 far .. 1 near
    const h = 1.1 + Math.random() * 1.9 + depth * 0.8;
    m.position.set(x, -0.2, z);
    m.scale.set(0.8 + Math.random() * 0.8, h, 0.8 + Math.random() * 0.8);
    m.rotation.y = Math.random() * Math.PI;
    m.userData = {
      phase: Math.random() * Math.PI * 2,
      rate: 0.6 + Math.random() * 0.9,
      baseTilt: (Math.random() - 0.5) * 0.12
    };
    blades.push(m);
    scene.add(m);
  }

  // Accent silhouettes per theme
  function addHills() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x0c160c, roughness: 1, flatShading: true });
    for (let i = 0; i < 4; i++) {
      const hill = new THREE.Mesh(new THREE.IcosahedronGeometry(10 + Math.random() * 6, 0), mat);
      hill.position.set(-30 + i * 20 + (Math.random() - 0.5) * 6, -8, -40 - Math.random() * 10);
      hill.scale.set(2.2, 0.7, 1);
      scene.add(hill);
    }
  }
  function addCypress() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x0a1512, roughness: 1, flatShading: true });
    for (let i = 0; i < 5; i++) {
      const g = new THREE.Group();
      const tx = -26 + i * 12 + (Math.random() - 0.5) * 6;
      const tz = -34 - Math.random() * 12;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 1.0, 16, 6), mat);
      trunk.position.set(0, 8, 0);
      g.add(trunk);
      for (let k = 0; k < 4; k++) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(4 - k * 0.7, 5, 6), mat);
        cone.position.set(0, 7 + k * 3.4, 0);
        g.add(cone);
      }
      g.position.set(tx, 0, tz);
      scene.add(g);
    }
    // low mist sheet
    const mist = new THREE.Mesh(
      new THREE.PlaneGeometry(140, 60),
      new THREE.MeshBasicMaterial({ color: 0x16302a, transparent: true, opacity: 0.18 })
    );
    mist.rotation.x = -Math.PI / 2;
    mist.position.set(0, 0.6, -18);
    scene.add(mist);
  }
  function addOak() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x140d07, roughness: 1, flatShading: true });
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.8, 12, 8), mat);
    trunk.position.set(0, 6, 0);
    g.add(trunk);
    const crownPos = [[0, 13, 0, 7], [-5, 12, 1, 5], [5, 12, -1, 5], [0, 16, 0, 5], [-3, 15, 2, 4], [4, 15, -2, 4]];
    crownPos.forEach(([x, y, z, r]) => {
      const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat);
      blob.position.set(x, y, z);
      g.add(blob);
    });
    g.position.set(16, -0.2, -16);
    g.scale.setScalar(1.15);
    scene.add(g);
  }
  if (C.accent === 'hills') addHills();
  else if (C.accent === 'cypress') addCypress();
  else if (C.accent === 'oak') addOak();

  // Drifting motes / fluff / fireflies
  const MOTES = 200;
  const moteGeo = new THREE.BufferGeometry();
  const mpos = new Float32Array(MOTES * 3);
  const mseed = [];
  for (let i = 0; i < MOTES; i++) {
    mpos[i * 3] = (Math.random() - 0.5) * 70;
    mpos[i * 3 + 1] = Math.random() * 14;
    mpos[i * 3 + 2] = -20 + Math.random() * 36;
    mseed.push({ sx: Math.random() * Math.PI * 2, sy: Math.random() * Math.PI * 2, sp: 0.3 + Math.random() * 0.6 });
  }
  moteGeo.setAttribute('position', new THREE.BufferAttribute(mpos, 3));
  const moteMat = new THREE.PointsMaterial({
    color: C.mote, size: theme === 'bayou' ? 0.16 : 0.12,
    transparent: true, opacity: theme === 'bayou' ? 0.9 : 0.6,
    depthWrite: false, blending: THREE.AdditiveBlending
  });
  const motes = new THREE.Points(moteGeo, moteMat);
  scene.add(motes);

  // Animation
  const clock = new THREE.Clock();
  let t = 0;
  let wind = 0.5;

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  // gentle wind gusts tied to scroll velocity for a touch of life
  let lastScroll = window.scrollY, gust = 0;
  addEventListener('scroll', () => {
    const dy = Math.abs(window.scrollY - lastScroll);
    lastScroll = window.scrollY;
    gust = Math.min(1.4, gust + dy * 0.01);
  }, { passive: true });

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    t += dt;
    gust *= 0.94;
    wind = 0.45 + Math.sin(t * 0.6) * 0.18 + gust;

    for (const b of blades) {
      const ud = b.userData;
      b.rotation.z = ud.baseTilt + Math.sin(t * ud.rate + ud.phase) * 0.14 * wind;
      b.rotation.x = Math.cos(t * ud.rate * 0.7 + ud.phase) * 0.05 * wind;
    }

    const arr = motes.geometry.attributes.position.array;
    for (let i = 0; i < MOTES; i++) {
      const s = mseed[i];
      arr[i * 3] += Math.sin(t * 0.3 + s.sx) * 0.01 + 0.004 * wind;
      arr[i * 3 + 1] += Math.sin(t * s.sp + s.sy) * 0.006 + 0.003;
      if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = 0.2;
      if (arr[i * 3] > 36) arr[i * 3] = -36;
    }
    motes.geometry.attributes.position.needsUpdate = true;

    camera.position.x = Math.sin(t * 0.08) * 1.2;
    camera.position.y = 3.6 + Math.sin(t * 0.06) * 0.25;
    camera.lookAt(0, 1.6, -6);

    renderer.render(scene, camera);
  }
  animate();
})();
