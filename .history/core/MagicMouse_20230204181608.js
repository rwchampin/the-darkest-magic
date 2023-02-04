import * as THREE from 'three'
import gsap from 'gsap'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { createError } from '#app'
import { Vector2 } from '~/utils/Vector'
import fragment from '~/shaders/mouseGlow/fragment.glsl'
import vertex from '~/shaders/mouseGlow/vertex.glsl'
// import { Utils } from '~/utils'
let instance = null

export default class MagicMouse {
  constructor({ camera, scene, renderer }) {
    /*******************
     * 1. Setup
     * *****************/
    if (instance) {
      return instance
    }
    instance = this
    this.camera = camera
    this.scene = scene
    this.scene1 = new THREE.Scene()
    this.renderer = renderer

    /*******************
     * 2. Properties
     * *****************/
    this.mouse = new THREE.Vector2(0, 0)
    this.elasticMouse = new THREE.Vector2(0, 0)
    this.elasticMouseVel = new THREE.Vector2(0, 0)
    this.eMouse = new THREE.Vector2(0, 0)
    this.temp = new THREE.Vector2(0, 0)
    this.cursor = document.createElement('div')
    this.prevPos = new THREE.Vector2(0, 0)
    this.radius = Vector2.random2D()
    this.vel = Vector2.random2D()
    this.acc = new THREE.Vector2(0, 0)
    this.maxSpeed = 5
    this.maxForce = 0.1
    this.color = 0xFFFFFF
    this.sphereSize = 5
    this.lightIntensity = 1000
    this.params = {
      exposure: 1,
      bloomStrength: 5,
      bloomThreshold: 0,
      bloomRadius: 0,
      scene: 'Scene with Glow',
    }
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      uniforms: {
        uLight: { value: new THREE.Vector3() },
        resolution: { value: new THREE.Vector4() },
        time: { value: 0 },
        // texture  1: { value: new THREE.TextureLoader().load('/textures/texture1.jpg') },
        progress: { value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    this.intersects = []
    this.time = 0
    /*******************
     * 4. Init
     * *****************/
    this.init()
    this.setPositionsAddScene()
    // this.postProcessing()
    this.attachHandlers()
  }

  postProcessing() {
    const renderScene = new RenderPass(this.scene, this.camera)

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
    bloomPass.threshold = this.params.bloomThreshold
    bloomPass.strength = this.params.bloomStrength
    bloomPass.radius = this.params.bloomRadius

    const bloomComposer = new EffectComposer(this.renderer)
    bloomComposer.renderToScreen = false
    bloomComposer.addPass(renderScene)
    bloomComposer.addPass(bloomPass)

    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        defines: {},
      }), 'baseTexture',
    )
    finalPass.needsSwap = true

    const finalComposer = new EffectComposer(this.renderer)
    finalComposer.addPass(renderScene)
    finalComposer.addPass(finalPass)
  }

  setPositionsAddScene() {
    // this.light.position.set(this.mouse.x, this.mouse.y, 0)
    // this.light.add(this.lightSphere)
    this.scene1.add(this.lightPlane)
    this.scene.add(this.light)
  }

  init() {
    this.camera.position.z = 2
    // document.body.appendChild(this.cursor)

    /**********************
     * Mouse Light Plane
     * @type {THREE.PlaneGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
    */
    const planeGeometry = new THREE.PlaneGeometry(10,10)
    const planeMaterial = this.material
    this.lightPlane = new THREE.Mesh(planeGeometry, planeMaterial)
    this.lightPlane.receiveShadow = true

    /**********************
     * Mouse Light Sphere
     * @type {THREE.SphereGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
      */
    const sphereGeometry = new THREE.SphereGeometry(0.02, 20, 20)
    const sphereMaterial = this.material
    this.light = new THREE.Mesh(sphereGeometry, sphereMaterial)
    this.light.castShadow = true

    /**********************
     * Raycaster
     * @type {THREE.Raycaster}
     * @type {THREE.Vector2}
     **/
    this.raycaster = new THREE.Raycaster()
    gsap.ticker.add(this.animate)
  }

  attachHandlers() {
    window.addEventListener('mousemove', (event) => {
      this.prevPos.x = this.mouse.x
      this.prevPos.y = this.mouse.y
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.raycaster.setFromCamera(this.mouse, this.camera)

      this.eMouse.x = event.clientX
      this.eMouse.y = event.clientY

      this.intersects = this.raycaster.intersectObjects([this.lightPlane])
      if (this.intersects.length > 0) {
        const p = this.intersects[0].point
        this.eMouse.x = p.x
        this.eMouse.y = p.y
      }
    })
  }

  animate() {
    instance.time += 0.05
    // if (!instance.cursor || !instance.temp || !instance.eMouse || !instance.elasticMouse || !instance.elasticMouseVel) {
    //   throw createError({
    //     statusMessage: 'No cursor element found in MagicMouse.animate()',
    //     statusCode: 500,
    //     cause: 'One or more cursor variables are undefined in MagicMouse.animate()',
    //   })
    // }
    document.getElementById("cursor").style.transform = `translate(${instance.elasticMouse.x}px, ${instance.elasticMouse.y}px)`
    instance.temp.copy(instance.eMouse).sub(instance.elasticMouse).multiplyScalar(0.15)
    instance.elasticMouseVel.add(instance.temp)
    instance.elasticMouseVel.multiplyScalar(0.8)
    instance.elasticMouse.add(instance.elasticMouseVel)

    instance.light.position.x = instance.elasticMouse.x
    instance.light.position.y = instance.elasticMouse.y

    instance.material.uniforms.uLight.value = instance.light.position
    instance.material.uniforms.time.value = instance.time

    instance.renderer.clear()
    instance.renderer.render(instance.scene1, instance.camera)
    instance.renderer.clearDepth()
    instance.renderer.render(instance.scene, instance.camera)
  }

  /*********************************
  * GETTERS
  *********************************/
  getMouse() {
    return this.mouse
  }

}
