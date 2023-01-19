<script lang="ts" setup>
import useCore from '~/composables/useCore.ts'

let scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight

onMounted(() => {
  scene = useCore.scene
  camera = useCore.camera
  renderer = useCore.renderer
  ambientLight = useCore.ambientLight
  pointLight = useCore.pointLight
  directionalLight = useCore.directionalLight
  rectAreaLight = useCore.rectAreaLight
  spotLight = useCore.spotLight
  hemisphereLight = useCore.hemisphereLight

  const createWobbleMaterial = (color: string) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.5,
      metalness: 0.5,
      side: THREE.DoubleSide,
    })
    material.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 }
      shader.vertexShader = `
      uniform float time;
      ${shader.vertexShader}
    `
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
      `
        #include <begin_vertex>
        vec3 transformed = vec3(position);
        transformed += sin(position.y * 10.0 + time) * 0.1;
      `,
      )
    }
    return material
  }

  const magenta = 0xFF00FF
  const geometry = new THREE.SphereGeometry(100, 32, 32)
  const material = createWobbleMaterial(magenta)
  const sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)
})
</script>

<template />
