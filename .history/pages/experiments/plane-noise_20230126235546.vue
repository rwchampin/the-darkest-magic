<script lang="ts" setup>
import { Utils } from '~/utils'

let camera, scene, renderer
let geometry, material, terrain, light, edges, line, lines, lineMaterial
const mouse = new THREE.Vector2()
const target = document.querySelector('.grid')
const width = target.offsetWidth
const height = target.offsetHeight
const perlin = Utils.noise.perlin2
let theta = 0
const rotation = THREE.Math.degToRad(-90)
const size = width > height ? width : height
const resolution = new THREE.Vector2(width, height)
const noisePlaneFolder = Utils.tweakpane.addFolder({ title: 'Noise Plane' })

const params = {
  blocks: 27,
  smoothing: 900,
  amplitude: 300,
  speed: 0.0025,
  rotationX: -90,
  rotationZ: 0,
}

gui.add(params, 'blocks').min(10).max(100).onChange(createGeometry)
gui.add(params, 'smoothing').min(100).max(3000).step(1)
gui.add(params, 'amplitude').min(0).max(1000).step(1)
gui.add(params, 'speed').min(0).max(0.01).step(0.00001)
gui.add(params, 'rotationX').min(-359).max(359).step(1).onChange(createGeometry)
gui.add(params, 'rotationZ').min(-359).max(359).step(1).onChange(createGeometry)

function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, 1.2, 0.01, 10000)
  camera.position.z = size
  renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setClearColor(0x333333)
  renderer.setSize(width, height)
  target.appendChild(renderer.domElement)
  window.addEventListener('mousemove', onMouseMove, false)
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function createGeometry() {
  while (scene.children.length > 0)
    scene.remove(scene.children[0])

  geometry = new THREE.PlaneBufferGeometry(size, size, params.blocks, params.blocks)
  material = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  terrain = new THREE.Mesh(geometry, material)
  terrain.rotation.x = THREE.Math.degToRad(params.rotationX)
  terrain.rotation.z = THREE.Math.degToRad(params.rotationZ)
  scene.add(terrain)

  refreshVertices(terrain)

  line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), new THREE.LineBasicMaterial({ color: 0x000000 }))
  line.rotation.x = THREE.Math.degToRad(params.rotationX)
  line.rotation.z = THREE.Math.degToRad(params.rotationZ)
  scene.add(line)
}

function refreshVertices(geom) {
  const vertices = geom.geometry.attributes.position.array
  for (let i = 0; i <= vertices.length; i += 3) {
    const origin = new THREE.Vector3(-mouse.x, -mouse.y, -mouse.x)
    const vector = new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]).normalize()
    const distance = origin.distanceTo(vector)
    vertices[i + 2] = params.amplitude * perlin.noise(
      ((geom.position.x + vertices[i]) / params.smoothing) + theta,
      ((geom.position.z + vertices[i + 1]) / params.smoothing) + theta,
    )
  }

  geom.geometry.attributes.position.needsUpdate = true
  geom.geometry.computeVertexNormals()
}

const clock = new THREE.Clock()
function animate() {
  theta += params.speed

  requestAnimationFrame(animate)
  refreshVertices(line)
  refreshVertices(terrain)
  renderer.render(scene, camera)
}

init()
createGeometry()
animate()

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
})
</script>

<template />
