<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

onMounted(() => {
  nextTick(() => {
    init()
  })
})

const init = () => {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 10000)
  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true
  camera.position.set(0, 20, 2000)
  controls.update()
  const o = new THREE.DirectionalLight(16777215, 0.8)
  o.position.set(1, 1, 100),
  scene.add(o)
  const light = new THREE.AmbientLight(0x404040, 2) // soft white light
  scene.add(light)
  const particle_plane = new THREE.Object3D()
  const particles = 500
  scene.add(particle_plane)

  for (var i = 0; i < particles; i++) {
    const geo = new THREE.SphereGeometry(10, 10, 10)
    const mat = new THREE.MeshStandardMaterial({
      color: 7040624,
      emissive: 0x30225F,
      side: THREE.DoubleSide,
      transparent: !0,
      opacity: 0.8,
      metalness: 1,
      roughness: 0.4,
      shading: THREE.FlatShading,
    })
    const all = new THREE.Mesh(geo, mat)
    var n = Math.acos(-1 + (2 * i) / particles)
    var t = Math.sqrt(particles * Math.PI) * n
    all.position.x = 500 * Math.cos(n) * Math.sin(t)
    all.position.y = 500 * Math.sin(n) * Math.sin(t) + Math.floor(Math.random() * 100 + 1)
    all.position.z = 900 * Math.cos(n) + Math.floor(Math.random() * 30 + 1) + Math.floor(Math.random() * 100 + 1)
    // all.rotation.y= Math.floor(Math.random()*30+1);
    particle_plane.add(all)
  }
  const particle_plane2 = new THREE.Object3D()
  const particles2 = 50
  scene.add(particle_plane2)
  for (var i = 0; i < particles2; i++) {
    const random = Math.floor(Math.random() * 300 + 50)
    const geo2 = new THREE.SphereGeometry(random, 20, 20)
    const mat2 = new THREE.MeshStandardMaterial({
      color: 0x30225F,
      emissive: 0xFF0000,
      side: THREE.BackSide,
      transparent: !0,
      opacity: 0.1,
      metalness: 1,
      roughness: 1,
      shading: THREE.SmoothShading,
    })
    const all2 = new THREE.Mesh(geo2, mat2)
    var n = Math.acos(-1 + (2 * i) / particles2)
    var t = Math.sqrt(particles2 * Math.PI) * n
    all2.position.x = 500 * Math.cos(n) * Math.sin(t)
    all2.position.y = 500 * Math.sin(n) * Math.sin(t)
    all2.position.z = 1000 * Math.cos(n)
    // all2.rotation.y= Math.floor(Math.random()*30+1);
    particle_plane2.add(all2)
  }

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
}
</script>
