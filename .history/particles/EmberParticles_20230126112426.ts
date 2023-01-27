import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'

type Coords = (x: number, y: number, z: number) => number
const noise: Coords = createNoise2D(Date.now)

const computeCurl = (x: number, y: number, z: number): {} => {
  const eps = 0.0001
  const n_x0 = noise(x - eps, y, z)
  const n_x1 = noise(x + eps, y, z)
  const n_y0 = noise(x, y - eps, z)
  const n_y1 = noise(x, y + eps, z)
  const n_z0 = noise(x, y, z - eps)
  const n_z1 = noise(x, y, z + eps)

  const curl = {
    x: n_y1 - n_y0 - n_z1 + n_z0,
    y: n_z1 - n_z0 - n_x1 + n_x0,
    z: n_x1 - n_x0 - n_y1 + n_y0,
  }

  return curl
}
const positionPointsInCircle = (points: THREE.Points) => {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  const radius = 100
  const angle = 0
  const x = centerX + radius * Math.cos(angle)
  const y = centerY + radius * Math.sin(angle)
  points.position.set(x, y, 0)
}
export default class Ember {
  size: number
  velocities: any[]
  particles: any[]
  points: any
  loader: THREE.TextureLoader
  texture: any
  colour: THREE.Color
  colour2: THREE.Color
  material: THREE.PointsMaterial
  TWO_PI: number
  mobile: RegExpMatchArray | null
  width: number
  height: number
  depth: number
  particleCount: number
  speed: number
  step: number
  count: number
  offset: number
  geometry: THREE.BufferGeometry

  constructor() {
    this.size = Math.random() * 0.5
    this.velocities = []
    this.particles = [this.velocities]
    this.points = []
    this.loader = new THREE.TextureLoader()

    this.texture = this.loader.load(
      'https://al-ro.github.io/images/embers/ember_texture.png',
    )
    this.colour = new THREE.Color('red')
    this.colour2 = new THREE.Color(0x330201)
    this.material = new THREE.PointsMaterial({
      color: this.colour,
      size: this.size,
      transparent: true,
      opacity: 1.0,
      map: this.texture,
      // Other particles show through transparent sections of texture
      depthTest: false,
      // For glow effect
      blending: THREE.AdditiveBlending,
    })

    this.TWO_PI = Math.PI * 2
    this.mobile
      = navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)

    // Spatial variables
    this.width = 500
    this.height = 500
    this.depth = 500

    this.particleCount = 8000

    this.speed = 5
    // Noise field zoom
    this.step = 1000

    this.count = this.particleCount * 3.0
    // Offset to counteract noise flattening when sampling on three planes
    this.offset = 0
    this.geometry = new THREE.BufferGeometry()
    this.init()
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      const x = this.width / 2 - Math.random() * this.width
      const y = this.height / 2 - Math.random() * this.height
      const z = this.depth / 2 - Math.random() * this.depth
      const vel_x = 0.5 - Math.random()
      const vel_y = 0.5 - Math.random()
      const vel_z = 0.5 - Math.random()

      this.particles.push(x, y, z)
      this.velocities.push(vel_x, vel_y, vel_z)
    }

    this.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(this.particles, 3),
    )

    this.points = new THREE.Points(this.geometry, this.material)
    this.points.position.set(0, 0, 0)
    // this.move()
    try {
      // noise.seed(Math.random())
    }
    catch (err) {
      // console.log(err.message)
    }
  }

  get() {
    return this.points
  }

  setSize() {
    this.material.size = this.size
  }

  setColour() {
    this.material.color.setHex(this.colour)
  }

  move() {
    for (let i = 0; i < this.count; i += 3) {
      // Find curl value at particle location
      const curl = computeCurl(
        this.particles[i] / this.step,
        this.particles[i + 1] / this.step,
        this.particles[i + 2] / this.step,
      )

      // Update particle velocity according to curl value and speed
      this.velocities[i] = this.speed * curl.x
      this.velocities[i + 1] = this.speed * curl.y
      this.velocities[i + 2] = this.speed * curl.z

      // Update particle position based on velocity
      this.particles[i] += this.velocities[i]
      this.particles[i + 1] += this.velocities[i + 1]
      this.particles[i + 2] += this.velocities[i + 2]

      // Boudnary conditions
      // If a particle gets too far away from (0,0,0), reset it to a random location
      // const dist = Math.sqrt(
      //   this.particles[i] * this.particles[i]
      //     + this.particles[i + 1] * this.particles[i + 1]
      //     + this.particles[i + 2] * this.particles[i + 2],
      // )
      // if (dist > 5.0 * this.width) {
      //   this.particles[i] = this.width / 2 - Math.random() * this.width
      //   this.particles[i + 1] = this.height / 2 - Math.random() * this.height
      //   this.particles[i + 2] = this.depth / 2 - Math.random() * this.depth
      // }
    }

    this.geometry.setAttribute('position', this.particles)
    this.geometry.computeVertexNormals()
    this.geometry.getAttribute('position').needsUpdate = true
  }
}