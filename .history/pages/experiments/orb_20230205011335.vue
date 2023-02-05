<script setup>
onMounted(() => {
  // https://threejs.org/examples/#webgl_lightprobe
  // https://threejs.org/examples/#webgl_materials
  // https://threejs.org/examples/#webgl_materials_channels
  const yellow = 0xFFED18
  const coral = 0xFF8066
  const red = 0xFF4533
  const orange = 0xFF8833
  const cyan = 0x18FFED
  const green = 0x33FF45
  const magenta = 0xED18FF
  const blue = 0x189EFF
  const dark_blue = 0x4533FF

  const $canvas = $('.coronavirus canvas')
  const canvas = $canvas[0]
  const renderer = new THREE.WebGLRenderer({
    canvas,
    context: canvas.getContext('webgl2'),
    antialias: true,
    alpha: true,
  })
  const simplex = new SimplexNoise()

  renderer.setSize(500, 500)
  renderer.setPixelRatio(window.devicePixelRatio || 1)

  const scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, $canvas.width() / $canvas.height(), 0.1, 1000)
  camera.position.z = 5

  const geometry = new THREE.SphereGeometry(0.8, 128, 128)
  const material = new THREE.MeshPhongMaterial({
    color: blue,
    shininess: 100,
  })

  const lightTop = new THREE.DirectionalLight(0xFFFFFF, 0.7)
  lightTop.position.set(0, 500, 200)
  lightTop.castShadow = true
  scene.add(lightTop)

  const lightBottom = new THREE.DirectionalLight(dark_blue, 0.25)
  lightBottom.position.set(0, -500, 400)
  lightBottom.castShadow = true
  scene.add(lightBottom)

  const ambientLight = new THREE.AmbientLight(0x798296)
  scene.add(ambientLight)

  const sphere = new THREE.Mesh(geometry, material)

  scene.add(sphere)

  const pointLight = new THREE.PointLight(magenta, 0.5)
  pointLight.position.z = 2500
  scene.add(pointLight)

  const pointLight2 = new THREE.PointLight(magenta, 1)
  camera.add(pointLight2)

  const pointLight3 = new THREE.PointLight(magenta, 0.5)
  pointLight3.position.x = -1000
  pointLight3.position.z = 1000
  scene.add(pointLight3)

  const pointLight4 = new THREE.PointLight(magenta, 1)
  pointLight4.position.x = -500
  pointLight4.position.z = 500
  scene.add(pointLight4)

  const pointLight5 = new THREE.PointLight(magenta, 1)
  pointLight5.position.x = 500
  pointLight5.position.z = 500
  scene.add(pointLight5)

  const spotLight = new THREE.SpotLight(magenta)
  spotLight.position.set(100, 1000, 100)
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024
  spotLight.shadow.camera.near = 500
  spotLight.shadow.camera.far = 4000
  spotLight.shadow.camera.fov = 30
  scene.add(spotLight)

  const wiggle = () => {
    const time = performance.now() * 0.00001 * 13 * 1.3 ** 3
    for (let i = 0; i < sphere.geometry.vertices.length; i++) {
      const p = sphere.geometry.vertices[i]
      p.normalize().multiplyScalar(
        1 + 0.3 * simplex.noise3D(p.x * 0.975, p.y * 0.975, p.z * 0.975 + time))
    }

    sphere.geometry.computeVertexNormals()
    sphere.geometry.normalsNeedUpdate = true
    sphere.geometry.verticesNeedUpdate = true
  }

  function animate() {
    wiggle()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
})
</script>

<template>
  <section class="page page-experiments--orb">
    <h1>ORBB</h1>
  </section>
</template>
