import * as THREE from 'three';

export interface PerchTree {
  mesh: THREE.Mesh;
  perches: THREE.Vector3[];
}

function combine(parts: THREE.BufferGeometry[]) {
  const positions: number[] = [];
  for (const part of parts) {
    const geometry = part.index ? part.toNonIndexed() : part;
    const attribute = geometry.getAttribute('position');
    positions.push(...attribute.array);
    geometry.dispose();
    if (geometry !== part) part.dispose();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.computeBoundingSphere();
  return geometry;
}

/** A small shared model: folded wings, a tapered tail, a beak, and two dim eyes. */
function crowGeometries() {
  const body = combine([
    new THREE.SphereGeometry(1, 8, 6)
      .scale(0.21, 0.36, 0.24)
      .translate(0, 0.42, 0),
    new THREE.SphereGeometry(1, 6, 4)
      .scale(0.09, 0.3, 0.2)
      .rotateX(-0.3)
      .translate(-0.18, 0.38, -0.06),
    new THREE.SphereGeometry(1, 6, 4)
      .scale(0.09, 0.3, 0.2)
      .rotateX(-0.3)
      .translate(0.18, 0.38, -0.06),
    new THREE.ConeGeometry(0.16, 0.55, 4)
      .rotateX(-2.1)
      .translate(0, 0.12, -0.25),
    new THREE.CylinderGeometry(0.018, 0.018, 0.15, 4).translate(
      -0.08,
      0.075,
      0.05,
    ),
    new THREE.CylinderGeometry(0.018, 0.018, 0.15, 4).translate(
      0.08,
      0.075,
      0.05,
    ),
  ]);
  const head = combine([
    new THREE.SphereGeometry(0.19, 8, 6),
    new THREE.ConeGeometry(0.075, 0.27, 4)
      .rotateX(Math.PI / 2)
      .translate(0, -0.035, 0.23),
  ]);
  const eyes = combine([
    new THREE.SphereGeometry(0.022, 6, 4).translate(-0.115, 0.015, 0.145),
    new THREE.SphereGeometry(0.022, 6, 4).translate(0.115, 0.015, 0.145),
  ]);
  return { body, head, eyes };
}

export function createCrowEncounters(trees: PerchTree[], random = Math.random) {
  const geometry = crowGeometries();
  const feathers = new THREE.MeshBasicMaterial({
    color: '#010203',
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const eyes = new THREE.MeshBasicMaterial({
    color: '#8c9094',
    fog: false,
    toneMapped: false,
  });
  const birds = Array.from({ length: 7 }, () => {
    const root = new THREE.Group();
    const head = new THREE.Group();
    const eyeMesh = new THREE.Mesh(geometry.eyes, eyes);
    root.add(new THREE.Mesh(geometry.body, feathers));
    head.add(new THREE.Mesh(geometry.head, feathers), eyeMesh);
    head.position.set(0, 0.76, 0.055);
    root.add(head);
    root.visible = false;
    return { root, head, eyeMesh, perch: new THREE.Vector3() };
  });
  let nextEncounter = 60 + random() * 60;
  let started = -Infinity;
  let duration = 0;
  let selected: PerchTree | undefined;
  const world = new THREE.Vector3();
  const projected = new THREE.Vector3();
  const localCamera = new THREE.Vector3();
  const localWind = new THREE.Vector3();
  const windDirection = new THREE.Vector3(0.94, 0, 0.34);
  const axis = new THREE.Vector3();
  const targetRotation = new THREE.Quaternion();
  const targetAngles = new THREE.Euler(0, 0, 0, 'YXZ');
  let previousTime = 0;

  function stop() {
    for (const bird of birds) {
      bird.root.removeFromParent();
      bird.root.visible = false;
    }
    selected = undefined;
  }

  function update(time: number, camera: THREE.Camera) {
    const delta = THREE.MathUtils.clamp(time - previousTime, 0, 0.1);
    previousTime = time;
    if (!selected && time >= nextEncounter) {
      // Choose actual branch positions already visible at the edges of the sky.
      const candidates = trees.flatMap((tree) => {
        const perches = tree.perches.filter((perch) => {
          world.copy(perch).applyMatrix4(tree.mesh.matrixWorld);
          projected.copy(world).project(camera);
          return (
            world.distanceTo(camera.position) < 42 &&
            projected.z > -1 &&
            projected.z < 1 &&
            Math.abs(projected.x) > 0.4 &&
            Math.abs(projected.x) < 0.92 &&
            Math.abs(projected.y) < 0.78
          );
        });
        return perches.length >= 3 ? [{ tree, perches }] : [];
      });
      const candidate = candidates[Math.floor(random() * candidates.length)];
      if (!candidate) {
        nextEncounter = time + 10;
        return;
      }
      selected = candidate.tree;
      started = time;
      duration = 22 + random() * 12;
      const center =
        candidate.perches[Math.floor(random() * candidate.perches.length)];
      const nearby = candidate.perches
        .filter((perch) => perch.distanceTo(center) < 6)
        .sort((a, b) => a.distanceTo(center) - b.distanceTo(center));
      const occupied: THREE.Vector3[] = [];
      const count = 3 + Math.floor(random() * 5);
      localCamera.copy(camera.position);
      selected.mesh.worldToLocal(localCamera);
      for (const perch of nearby) {
        if (occupied.some((other) => other.distanceTo(perch) < 0.75)) continue;
        const bird = birds[occupied.length];
        bird.perch.copy(perch);
        bird.root.position.copy(perch);
        // Feet and body keep their perch orientation; only the neck follows the walker.
        bird.root.rotation.y = Math.atan2(
          localCamera.x - perch.x,
          localCamera.z - perch.z,
        );
        bird.head.quaternion.identity();
        bird.eyeMesh.visible = false;
        bird.root.scale.setScalar(0.85 + random() * 0.25);
        bird.root.visible = true;
        selected.mesh.add(bird.root);
        occupied.push(perch);
        if (occupied.length === count) break;
      }
    }
    if (!selected) return;
    const age = time - started;
    if (age >= duration) {
      stop();
      nextEncounter = time + 100 + random() * 140;
      return;
    }
    // Slow visibility changes, no flashes, bloom, or sudden entrance.
    const fade =
      THREE.MathUtils.smoothstep(age, 0, 5) *
      (1 - THREE.MathUtils.smoothstep(age, duration - 6, duration));
    feathers.opacity = fade;
    const matrix = selected.mesh.matrixWorld;
    const phase = matrix.elements[12] * 0.09;
    const breeze =
      Math.sin(time * 0.43 + phase) * 0.11 +
      Math.sin(time * 0.71 + phase * 1.7) * 0.035;
    localWind.set(
      axis.setFromMatrixColumn(matrix, 0).normalize().dot(windDirection),
      0,
      axis.setFromMatrixColumn(matrix, 2).normalize().dot(windDirection),
    );
    for (const bird of birds) {
      if (!bird.root.visible) continue;
      const height = THREE.MathUtils.clamp(bird.perch.y / 25, 0, 1);
      const tips =
        Math.sin(time * 1.2 + bird.perch.x * 0.7 + bird.perch.z * 0.5) * 0.025;
      bird.root.position
        .copy(bird.perch)
        .addScaledVector(localWind, breeze * height ** 2 + tips * height ** 4);
      bird.root.position.y += 0.04;
      bird.root.getWorldPosition(world);
      // Trees pass toward +Z as we walk. Let the gaze go as a perch falls behind us.
      const attention =
        1 - THREE.MathUtils.smoothstep(world.z - camera.position.z, 0, 12);
      localCamera.copy(camera.position);
      bird.root.worldToLocal(localCamera).sub(bird.head.position);
      const yaw = THREE.MathUtils.clamp(
        Math.atan2(localCamera.x, localCamera.z),
        -1.15,
        1.15,
      );
      const pitch = THREE.MathUtils.clamp(
        -Math.atan2(localCamera.y, Math.hypot(localCamera.x, localCamera.z)),
        -0.5,
        1.2,
      );
      targetRotation.setFromEuler(
        targetAngles.set(pitch * attention, yaw * attention, 0),
      );
      bird.head.quaternion.slerp(targetRotation, 1 - Math.exp(-delta * 1.4));
      // Eyes switch on once and hold a constant brightness; they do not follow the body fade.
      bird.eyeMesh.visible = age >= 5 && age < duration - 6;
    }
  }

  return {
    update,
    dispose() {
      stop();
      for (const part of Object.values(geometry)) part.dispose();
      feathers.dispose();
      eyes.dispose();
    },
  };
}
