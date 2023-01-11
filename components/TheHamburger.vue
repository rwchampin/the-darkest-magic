<script setup>
import * as THREE from 'three'
import { useMounted } from '@vueuse/core'
import { useUIManager } from '~~/composables/useUIManager.ts'
const hamburger = ref(null)
const renderer = ref(null)
const camera = ref(null)
const scene = ref(null)
const controls = ref(null)
const light = ref(null)
const light2 = ref(null)
const box = ref(null)
const nuxtApp = useNuxtApp()
const { gsap } = nuxtApp.$plugins
const { addUIElement } = useUIManager(nuxtApp)
// const buildNav = (scene) => {
//   const g = new THREE.SphereGeometry(15, 32, 16);
//   const ma = new THREE.MeshPhongMaterial({
//     color: 0x00FF00,
//   })
//   const pos = [{
//     x: 0, y: 0, z: 1
//   }, {
//     x: 0, y: 0, z: 1
//   }, {
//     x: 0, y: 0, z: 1
//   }, {
//     x: 0, y: 0, z: 1
//   }, {
//     x: 0, y: 0, z: 1
//   }]

// const m = new THREE.InstancedMesh(g, ma, 5);
// scene.add(m)

// const dummy = new THREE.Object3D();
// for (let i = 0; i < 5; i++) {

//   dummy.position.set(pos[i].x, pos[i].y, pos[i].z)
//   dummy.updateMatrix();
//   m.setMatrixAt(i, dummy.matrix);
// }

// }
onMounted(() => {
  // const { scene, camera, renderer, controls, light, light2 } = Utils.three.getSceneElements({ h: 100, w: 100, name: "hamburger-canvas", canvas: hamburger.value })

  // addUIElement({
  //   name: 'hamburger',
  //   node: hamburger.value,
  //   element: "hamburger",
  //   order: 2
  // })
  // scene.add(camera, light, light2)
  // camera.position.set(0, 0, -50)
  // buildNav(scene);

})
</script>

<template>
  <div class="blobs">
    <div class="blob" />
    <div class="blob" />
    <div class="blob" />
    <div class="blob" />
    <div class="blob" />
  </div>
</template>

<style scoped>
.hamburger-canvas {
  background: red;
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  height: 100px;
  width: 100px;
}

.blobs {
  z-index: 500;
  position: relative;

  /* transition: transform .3s var(--ease-squish-5); */
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius: var(--radius-blob-4); */
  margin-left: auto;
  transform-origin: center center;
  right: 20px;
}

.blobs:hover {
  cursor: pointer;
  transform: scale(1.5) perspective(100px) translateZ(200px);
}

.blobs:hover .blob,
.blobs:active .blob {
  filter: drop-shadow(5px 5px 3px #000);
}

.blob {
  background: var(--gradient-14);
  position: absolute;
  border-radius: var(--radius-blob-4);

  z-index: 900;
}

.blob-1 {
  top: 25px;
  left: 25px;
  height: 10px;
  width: 12px;
  border-radius: var(--radius-blob-4);
}

.blob-2 {
  top: 30px;
  left: 55px;
  height: 5px;
  width: 3px;
  transform: rotate(120deg);
  border-radius: var(--radius-blob-2);
}

.blob-3 {
  top: 40px;
  left: 40px;
  height: 7px;
  width: 9px;
  border-radius: var(--radius-blob-3);
}

.blob-4 {
  top: 50px;
  left: 25px;
  height: 5px;
  width: 8px;
  border-radius: var(--radius-blob-1);
}

.blob-5 {
  top: 50px;
  left: 55px;
  height: 9px;
  width: 5px;
  transform: rotate(231deg);
  border-radius: var(--radius-blob-3);
}

.blob-6 {
  top: 32px;
  left: 42px;
  height: 3px;
  width: 2px;
  transform: rotate(231deg);
  border-radius: var(--radius-blob-3);
  opacity: .5;
}

.blob-7 {
  top: 54px;
  left: 40px;
  height: 2px;
  width: 3px;
  transform: rotate(231deg);
  border-radius: var(--radius-blob-5);
  opacity: .5;
}

.blob-8 {
  top: 40px;
  left: 27px;
  height: 2px;
  width: 3px;
  transform: rotate(231deg);
  border-radius: var(--radius-blob-1);
  opacity: .5;
}

.blob-9 {
  top: 45px;
  left: 52px;
  height: 2px;
  width: 3px;
  transform: rotate(231deg);
  border-radius: var(--radius-blob-2);
  opacity: .5;
}

/* .blobs:hover {
  cursor: pointer;
  border-radius: var(--radius-blob-1);
} */
.blob.w {
  background-color: var(--gradient-16);
}
</style>
