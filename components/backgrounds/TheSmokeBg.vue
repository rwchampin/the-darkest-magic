<script setup lang="ts">
let camera, scene, renderer,
  geometry, material, mesh

onMounted(() => {
  init()
  animate()
})

function init() {
  const { scene, camera, renderer } = SUPERGLOBAL.core.singletons
  debugger
  camera.position.z = 1000

  geometry = new THREE.CubeGeometry(200, 200, 200)
  material = new THREE.MeshLambertMaterial({ color: 0xAA6666, wireframe: false })
  mesh = new THREE.Mesh(geometry, material)
  // scene.add( mesh );
  cubeSineDriver = 0

  textGeo = new THREE.PlaneGeometry(300, 300)
  THREE.ImageUtils.crossOrigin = '' // Need this to pull in crossdomain images from AWS
  textTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png')
  textMaterial = new THREE.MeshLambertMaterial({ color: 0x00FFFF, opacity: 1, map: textTexture, transparent: true, blending: THREE.AdditiveBlending })
  text = new THREE.Mesh(textGeo, textMaterial)
  text.position.z = 800
  scene.add(text)

  light = new THREE.DirectionalLight(0xFFFFFF, 0.5)
  light.position.set(-1, 0, 1)
  scene.add(light)

  smokeTexture = window.assets.smoke2d

  smokeMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: smokeTexture, transparent: true })
  smokeGeo = new THREE.PlaneGeometry(300, 300)
  smokeParticles = []

  for (p = 0; p < 150; p++) {
    const particle = new THREE.Mesh(smokeGeo, smokeMaterial)
    particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100)
    particle.rotation.z = Math.random() * 360
    scene.add(particle)
    smokeParticles.push(particle)
  }

  document.body.appendChild(renderer.domElement)
}

function animate() {
  // note: three.js includes requestAnimationFrame shim
  stats.begin()
  delta = clock.getDelta()
  requestAnimationFrame(animate)
  evolveSmoke()
  render()
  stats.end()
}

function evolveSmoke() {
  let sp = smokeParticles.length
  while (sp--)
    smokeParticles[sp].rotation.z += (delta * 0.2)
}

function render() {
  mesh.rotation.x += 0.005
  mesh.rotation.y += 0.01
  cubeSineDriver += 0.01
  mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500)
  renderer.render(scene, camera)
}
</script>
