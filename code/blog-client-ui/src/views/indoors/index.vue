<template>
  <div class="container"></div>
</template>

<script setup>
import { onMounted } from "vue";
import * as THREE from "three";

onMounted(() => {
    init();
});

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  const container = document.querySelector(".container");
  console.log(container);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }
  animate()
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
