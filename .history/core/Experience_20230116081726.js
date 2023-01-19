import * as THREE from 'three'
import { Pane } from 'tweakpane'

import Time from './helpers/Time.js'
import Sizes from './helpers/Sizes.js'
import Stats from './helpers/Stats.js'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'

import assets from './assets.js'

export default class Experience {
  static instance

  constructor(_options = {}) {
    if (Experience.instance)
      return Experience.instance

    Experience.instance = this

    // Options
    this.targetElement = _options.targetElement
    this.ctx = _options.ctx

    if (!this.targetElement) {
      console.warn('Missing \'targetElement\' property')
      return
    }

    if (!this.ctx) {
      console.warn('Missing \'ctx\' property')
      return
    }
    this.ctx = this.ctx.getContext('2d')
    this.time = new Time()
    this.sizes = new Sizes()
    this.setConfig()
    this.setStats()
    this.setDebug()
    this.setScene()
    this.setCamera()
    this.setRenderer()
    this.setResources()
    this.setWorld()
    // this.setVarsOnNuxtApp()

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.update()
  }

  setConfig() {
    this.config = {}

    // Debug
    this.config.debug = window.location.hash === '#debug'

    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

    // Width and height
    const boundings = this.targetElement.getBoundingClientRect()

    this.config.width = boundings.width
    this.config.height = boundings.height || window.innerHeight
  }

  setStats() {
    if (this.config.debug)
      this.stats = new Stats(true)
  }

  setDebug() {
    if (this.config.debug) {
      this.debug = new Pane()
      this.debug.containerElem_.style.width = '320px'
    }
  }

  setScene() {
    this.scene = new THREE.Scene()
  }

  setCamera() {
    this.camera = new Camera()
  }

  setRenderer() {
    this.renderer = new Renderer({ rendererInstance: this.rendererInstance })

    // this.targetElement.appendChild(this.renderer.instance.domElement)
  }

  setResources() {
    this.resources = new Resources(assets)
  }

  setWorld() {
    this.world = new World()
  }

  update() {
    if (this.stats)
      this.stats.update()

    this.camera.update()

    if (this.world)
      this.world.update()

    if (this.renderer)
      this.renderer.update()

    window.requestAnimationFrame(() => {
      this.update()
    })
  }

  resize() {
    // Config
    const boundings = this.targetElement.getBoundingClientRect()
    this.config.width = boundings.width
    this.config.height = boundings.height

    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

    if (this.camera)
      this.camera.resize()

    if (this.renderer)
      this.renderer.resize()

    if (this.world)
      this.world.resize()
  }

  destroy() {

  }

  // setVarsOnNuxtApp() {
  //   if (this.nuxtApp) {
  //     this.nuxtApp.$config = this.config
  //     this.nuxtApp.$time = this.time
  //     this.nuxtApp.$sizes = this.sizes
  //     this.nuxtApp.$stats = this.stats
  //     this.nuxtApp.$debug = this.debug
  //     this.nuxtApp.$scene = this.scene
  //     this.nuxtApp.$camera = this.camera
  //     this.nuxtApp.$renderer = this.renderer
  //     this.nuxtApp.$resources = this.resources
  //     this.nuxtApp.$world = this.world
  //   }
  // }
}
