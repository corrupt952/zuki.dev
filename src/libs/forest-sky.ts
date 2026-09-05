import * as THREE from 'three';
import { createCrowEncounters, type PerchTree } from './forest-crows';

// World units are metres. Keep the pace and head movement deliberately small.
const WALK_SPEED = 0.24;
const TILE_LENGTH = 60;
const TILE_COUNT = 3;

function randomGenerator(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}

/** A branched silhouette built from tapered limbs and individual leaves, not a billboard. */
function treeGeometry(seed: number) {
  const random = randomGenerator(seed);
  const vertices: number[] = [];
  const perches: THREE.Vector3[] = [];
  const up = new THREE.Vector3(0, 1, 0);

  function limb(
    start: THREE.Vector3,
    direction: THREE.Vector3,
    length: number,
    radius: number,
    depth: number,
  ) {
    const end = start.clone().addScaledVector(direction, length);
    if (depth >= 2 && depth <= 4 && direction.y < 0.9) {
      perches.push(start.clone().lerp(end, 0.55));
    }
    const rotation = new THREE.Quaternion().setFromUnitVectors(up, direction);
    const ring = (angle: number, r: number, point: THREE.Vector3) =>
      new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r)
        .applyQuaternion(rotation)
        .add(point);
    for (let side = 0; side < 5; side++) {
      const a = (side / 5) * Math.PI * 2;
      const b = ((side + 1) / 5) * Math.PI * 2;
      const p = ring(a, radius, start);
      const q = ring(b, radius, start);
      const r = ring(a, radius * 0.58, end);
      const s = ring(b, radius * 0.58, end);
      vertices.push(...p, ...q, ...r, ...q, ...s, ...r);
    }

    if (depth <= 2) {
      for (let leaf = 0; leaf < 7; leaf++) {
        const center = start.clone().lerp(end, random());
        center.x += (random() - 0.5) * 0.45;
        center.z += (random() - 0.5) * 0.45;
        const axis = new THREE.Vector3(
          random() - 0.5,
          random() - 0.3,
          random() - 0.5,
        ).normalize();
        const cross = new THREE.Vector3()
          .crossVectors(axis, direction)
          .normalize();
        const size = 0.09 + random() * 0.12;
        const tip = center.clone().addScaledVector(axis, size);
        const base = center.clone().addScaledVector(axis, -size);
        const left = center.clone().addScaledVector(cross, size * 0.45);
        const right = center.clone().addScaledVector(cross, -size * 0.45);
        vertices.push(...tip, ...left, ...base, ...tip, ...base, ...right);
      }
    }
    if (depth === 0) return;

    const children = depth > 3 ? 3 : 2;
    for (let child = 0; child < children; child++) {
      const angle = random() * Math.PI * 2;
      const spread = 0.4 + random() * 0.55;
      const next = direction
        .clone()
        .multiplyScalar(0.8)
        .add(
          new THREE.Vector3(
            Math.cos(angle) * spread,
            0.2 + random() * 0.3,
            Math.sin(angle) * spread,
          ),
        )
        .normalize();
      const fork = start.clone().lerp(end, 0.6 + random() * 0.4);
      limb(
        fork,
        next,
        length * (0.58 + random() * 0.18),
        radius * 0.53,
        depth - 1,
      );
    }
  }

  limb(
    new THREE.Vector3(),
    new THREE.Vector3(
      (random() - 0.5) * 0.16,
      1,
      (random() - 0.5) * 0.16,
    ).normalize(),
    10 + random() * 3,
    0.32,
    6,
  );
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  geometry.computeBoundingSphere();
  if (geometry.boundingSphere) geometry.boundingSphere.radius += 0.4;
  return { geometry, perches };
}

export function mountForest(host: HTMLElement): () => void {
  const canvas = host.querySelector('canvas');
  const button = host.querySelector('button');
  const container = host.parentElement;
  if (!canvas || !button || !container) return () => {};

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#04060a');
  scene.fog = new THREE.Fog('#05070a', 32, 95);
  const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 200);

  const skyGeometry = new THREE.SphereGeometry(140, 24, 16);
  const skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      dark: { value: new THREE.Color('#030407') },
      light: { value: new THREE.Color('#080b10') },
    },
    vertexShader: `
      varying vec3 direction;
      void main() {
        direction = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 dark;
      uniform vec3 light;
      varying vec3 direction;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
          mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
      }
      void main() {
        vec3 d = normalize(direction);
        vec2 p = d.xz / (abs(d.y) + 0.5);
        float cloud = noise(p * vec2(3.0, 7.0)) * 0.6
          + noise(p * vec2(9.0, 19.0)) * 0.3
          + noise(p * 37.0) * 0.1;
        gl_FragColor = vec4(mix(dark, light, cloud * 0.55), 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  const sky = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(sky);

  const geometries = Array.from({ length: 6 }, (_, i) =>
    treeGeometry(1979 + i * 137),
  );
  const material = new THREE.MeshBasicMaterial({
    color: '#010203',
    side: THREE.DoubleSide,
  });
  const windTime = { value: 0 };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.windTime = windTime;
    shader.vertexShader =
      `uniform float windTime;\n${shader.vertexShader}`.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
      // Roots stay planted; the upper branches yield to a slow, uneven breeze.
      float height = clamp(position.y / 25.0, 0.0, 1.0);
      float phase = modelMatrix[3].x * 0.09;
      float breeze = sin(windTime * 0.43 + phase) * 0.11
        + sin(windTime * 0.71 + phase * 1.7) * 0.035;
      float tips = sin(windTime * 1.2 + position.x * 0.7 + position.z * 0.5) * 0.025;
      vec3 windDirection = vec3(0.94, 0.0, 0.34);
      vec3 localWind = vec3(
        dot(normalize(modelMatrix[0].xyz), windDirection),
        0.0,
        dot(normalize(modelMatrix[2].xyz), windDirection)
      );
      transformed += localWind * (breeze * height * height + tips * pow(height, 4.0));`,
      );
  };
  const random = randomGenerator(952);
  const perchTrees: PerchTree[] = [];
  const tiles = Array.from({ length: TILE_COUNT }, () => {
    const tile = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const model = geometries[i % geometries.length];
      const tree = new THREE.Mesh(model.geometry, material);
      const side = i % 2 === 0 ? -1 : 1;
      tree.position.set(
        side * (12 + random() * 12),
        -3,
        (i / 12 - 0.5) * TILE_LENGTH,
      );
      tree.rotation.y = random() * Math.PI * 2;
      tree.scale.setScalar(0.9 + random() * 0.5);
      tile.add(tree);
      perchTrees.push({ mesh: tree, perches: model.perches });
    }
    scene.add(tile);
    return tile;
  });
  const crows = createCrowEncounters(perchTrees);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let visible = true;
  let lost = false;
  let disposed = false;
  let elapsed = 0;
  let lastTime = 0;

  function draw() {
    windTime.value = elapsed;
    camera.position.set(
      Math.sin(elapsed * 0.9) * 0.018,
      1.65 + Math.sin(elapsed * 1.8) * 0.012,
      0,
    );
    camera.rotation.set(
      1.31 + Math.sin(elapsed * 0.9) * 0.0015,
      0,
      Math.sin(elapsed * 0.45) * 0.001,
    );
    sky.position.copy(camera.position);
    tiles.forEach((tile, index) => {
      tile.position.z =
        ((index * TILE_LENGTH + elapsed * WALK_SPEED) %
          (TILE_LENGTH * TILE_COUNT)) -
        TILE_LENGTH * 2;
    });
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    crows.update(elapsed, camera);
    renderer.render(scene, camera);
  }

  function frame(now: number) {
    if (lastTime && now - lastTime < 1000 / 30) return;
    if (lastTime) elapsed += Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    draw();
  }

  function sync() {
    lastTime = 0;
    const active = !disposed && !lost && !document.hidden && visible;
    renderer.setAnimationLoop(active && !paused ? frame : null);
    host.dataset.paused = String(paused);
    button?.setAttribute(
      'aria-label',
      (paused ? host.dataset.play : host.dataset.pause) ?? '',
    );
    if (active) draw();
  }

  function resize() {
    if (disposed || lost || !container) return;
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    // Preserve the open strip of sky and both edges of the canopy on portrait screens.
    camera.fov = THREE.MathUtils.radToDeg(
      2 *
        Math.atan(
          Math.tan(THREE.MathUtils.degToRad(34)) / Math.min(camera.aspect, 1),
        ),
    );
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    if (!document.hidden && visible) draw();
  }

  function toggle() {
    paused = !paused;
    sync();
  }
  function preferenceChanged() {
    paused = reducedMotion.matches;
    sync();
  }
  function contextLost(event: Event) {
    event.preventDefault();
    lost = true;
    if (button) button.hidden = true;
    sync();
  }
  function contextRestored() {
    lost = false;
    if (button) button.hidden = false;
    resize();
    sync();
  }
  function pageHidden() {
    renderer.setAnimationLoop(null);
    lastTime = 0;
  }

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  resizeObserver.observe(container);
  intersectionObserver.observe(canvas);
  button.addEventListener('click', toggle);
  reducedMotion.addEventListener('change', preferenceChanged);
  document.addEventListener('visibilitychange', sync);
  canvas.addEventListener('webglcontextlost', contextLost);
  canvas.addEventListener('webglcontextrestored', contextRestored);
  window.addEventListener('pagehide', pageHidden);
  window.addEventListener('pageshow', sync);
  button.hidden = false;
  resize();
  sync();

  return () => {
    disposed = true;
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    button.removeEventListener('click', toggle);
    reducedMotion.removeEventListener('change', preferenceChanged);
    document.removeEventListener('visibilitychange', sync);
    canvas.removeEventListener('webglcontextlost', contextLost);
    canvas.removeEventListener('webglcontextrestored', contextRestored);
    window.removeEventListener('pagehide', pageHidden);
    window.removeEventListener('pageshow', sync);
    crows.dispose();
    for (const model of geometries) model.geometry.dispose();
    skyGeometry.dispose();
    skyMaterial.dispose();
    material.dispose();
    renderer.dispose();
  };
}
