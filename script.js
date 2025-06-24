document.addEventListener('DOMContentLoaded', () => {
  const stepsInput = document.getElementById('steps');
  const heightInput = document.getElementById('stepHeight');
  const depthInput = document.getElementById('stepDepth');
  const widthInput = document.getElementById('stairWidth');
  const container = document.getElementById('previewContainer');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(1, 2, 3);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const stepsGroup = new THREE.Group();
  scene.add(stepsGroup);

  camera.position.set(200, 150, 200);
  camera.lookAt(0, 0, 0);

  function buildStairs() {
    while (stepsGroup.children.length > 0) {
      const child = stepsGroup.children[0];
      stepsGroup.remove(child);
    }

    const steps = parseInt(stepsInput.value, 10);
    const stepHeight = parseInt(heightInput.value, 10);
    const stepDepth = parseInt(depthInput.value, 10);
    const width = parseInt(widthInput.value, 10);

    for (let i = 0; i < steps; i++) {
      const geometry = new THREE.BoxGeometry(width, stepHeight, stepDepth);
      const material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = i * stepHeight + stepHeight / 2;
      mesh.position.z = -i * stepDepth - stepDepth / 2;
      stepsGroup.add(mesh);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  stepsInput.addEventListener('input', buildStairs);
  heightInput.addEventListener('input', buildStairs);
  depthInput.addEventListener('input', buildStairs);
  widthInput.addEventListener('input', buildStairs);

  buildStairs();
});
