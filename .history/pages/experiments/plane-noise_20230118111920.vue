<script lang="ts" setup>
class Perlin {
  constructor() {
    this.grad3
            = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
        [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
        [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]]
    this.p = []
    for (var i = 0; i < 256; i++)
      this.p[i] = Math.floor(Math.random() * 256)

    // To remove the need for index wrapping, double the permutation table length
    this.perm = []
    for (i = 0; i < 512; i++)
      this.perm[i] = this.p[i & 255]

    // A lookup table to traverse the simplex around a given point in 4D.
    // Details can be found where this table is used, in the 4D noise method.
    this.simplex = [
      [0, 1, 2, 3], [0, 1, 3, 2], [0, 0, 0, 0], [0, 2, 3, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 2, 3, 0],
      [0, 2, 1, 3], [0, 0, 0, 0], [0, 3, 1, 2], [0, 3, 2, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 3, 2, 0],
      [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
      [1, 2, 0, 3], [0, 0, 0, 0], [1, 3, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 3, 0, 1], [2, 3, 1, 0],
      [1, 0, 2, 3], [1, 0, 3, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 3, 1], [0, 0, 0, 0], [2, 1, 3, 0],
      [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
      [2, 0, 1, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 0, 1, 2], [3, 0, 2, 1], [0, 0, 0, 0], [3, 1, 2, 0],
      [2, 1, 0, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 1, 0, 2], [0, 0, 0, 0], [3, 2, 0, 1], [3, 2, 1, 0]]
  }

  dot(g, x, y) {
    return g[0] * x + g[1] * y
  }

  noise(xin, yin) {
    let n0, n1, n2 // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
    const s = (xin + yin) * F2 // Hairy factor for 2D
    const i = Math.floor(xin + s)
    const j = Math.floor(yin + s)
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0
    const t = (i + j) * G2
    const X0 = i - t // Unskew the cell origin back to (x,y) space
    const Y0 = j - t
    const x0 = xin - X0 // The x,y distances from the cell origin
    const y0 = yin - Y0
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    let i1, j1 // Offsets for second (middle) corner of simplex in (i,j) coords
    if (x0 > y0) { i1 = 1; j1 = 0 } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    else { i1 = 0; j1 = 1 } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    const x1 = x0 - i1 + G2 // Offsets for middle corner in (x,y) unskewed coords
    const y1 = y0 - j1 + G2
    const x2 = x0 - 1.0 + 2.0 * G2 // Offsets for last corner in (x,y) unskewed coords
    const y2 = y0 - 1.0 + 2.0 * G2
    // Work out the hashed gradient indices of the three simplex corners
    const ii = i & 255
    const jj = j & 255
    const gi0 = this.perm[ii + this.perm[jj]] % 12
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12
    const gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12
    // Calculate the contribution from the three corners
    let t0 = 0.5 - x0 * x0 - y0 * y0
    if (t0 < 0) { n0 = 0.0 }
    else {
      t0 *= t0
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0) // (x,y) of grad3 used for 2D gradient
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1
    if (t1 < 0) { n1 = 0.0 }
    else {
      t1 *= t1
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1)
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2
    if (t2 < 0) { n2 = 0.0 }
    else {
      t2 *= t2
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2)
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70.0 * (n0 + n1 + n2)
  }
}

let camera, scene, renderer
let geometry, material, terrain, light, edges, line, lines, lineMaterial
const mouse = new THREE.Vector2()
const target = document.querySelector('.grid')
const width = target.offsetWidth
const height = target.offsetHeight
const perlin = new Perlin()
let theta = 0
const rotation = THREE.Math.degToRad(-90)
const size = width > height ? width : height
const resolution = new THREE.Vector2(width, height)
const gui = new dat.GUI()

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
