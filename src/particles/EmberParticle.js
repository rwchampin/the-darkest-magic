import * as THREE from 'three'
import gsap from 'gsap'
import { Utils } from '~~/src/utils'

// const improved = new Utils.noise.ImprovedNoise()
// type Coords = (x: number, y: number, z: number) => number
// const noise: Coords = improved.noise
// const centerX = window.innerWidth / 2
// const centerY = window.innerHeight / 2

// const radius = 100
// const pi = (Math.PI * 2)
// const angle = Math.random() * Math.PI * 2

export default class EmberParticle {
  constructor({ scene, camera, renderer }) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.size = THREE.MathUtils.randFloat(0.5, 2.0)
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
      opacity: 1, // THREE.MathUtils.randFloat(0.85, 1.0),
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
      const x = this.width / 2
      const y = this.height / 2
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
    this.scene.add(this.points)
    gsap.ticker.add(this.move)
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

  setColour(hex) {
    this.material.color.setHex(hex)
  }

  move() {
    for (let i = 0; i < this.count; i += 3) {
      // Find curl value at particle location
      const curl = Utils.noise.computeCurl(
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
      const dist = Math.sqrt(
        this.particles[i] * this.particles[i]
        + this.particles[i + 1] * this.particles[i + 1]
        + this.particles[i + 2] * this.particles[i + 2],
      )
      if (dist > 5.0 * this.width) {
        this.particles[i] = this.width / 2 - Math.random() * this.width
        this.particles[i + 1] = this.height / 2 - Math.random() * this.height
        this.particles[i + 2] = this.depth / 2 - Math.random() * this.depth
      }
    }

    this.geometry.setAttribute('position', this.particles)
    this.geometry.computeVertexNormals()
    this.geometry.getAttribute('position').needsUpdate = true
  }
}
