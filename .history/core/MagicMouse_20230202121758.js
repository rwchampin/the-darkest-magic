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
let that
export default class MagicMouse {
  constructor({ camera, scene, renderer }) {
    /*******************
     * 1. Setup
     * *****************/
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    that = this
    this.camera = camera
    this.scene = scene
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
    this.sphereSize = 0.005
    this.mouseLightIntensity = 1000
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

    /*******************
     * 4. Init
     * *****************/
    this.animate.bind(this)
    this.init.bind(this)
    this.setPositionsAddScene.bind(this)
    this.postProcessing.bind(this)
    this.attachHandlers.bind(this)

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
    // this.mouseLight.position.set(this.mouse.x, this.mouse.y, 0)
    // this.mouseLight.add(this.mouseLightSphere)
    this.scene.add(this.mouseLightPlane)
    this.scene.add(this.mouseLight)
  }

  init() {
    this.cursor.setAttribute('id', 'cursor')
    this.cursor.style.position = 'fixed'
    this.cursor.style.width = '20px'
    this.cursor.style.height = '20px'
    this.cursor.style.background = 'red'
    this.cursor.style.borderRadius = '50%'
    // this.cursor.style.transform = 'translate(-50%, -50%)'
    this.cursor.style.zIndex = 99999999999
    document.body.appendChild(this.cursor)

    /**********************
     * Mouse Light Plane
     * @type {THREE.PlaneGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
    */
    const planeGeometry = new THREE.PlaneGeometry(2, 1, 2, 2)
    const planeMaterial = this.material
    this.mouseLightPlane = new THREE.Mesh(planeGeometry, planeMaterial)
    this.mouseLightPlane.receiveShadow = true
    /**********************
     * Mouse Light Sphere
     * @type {THREE.SphereGeometry}
     *  @type {THREE.MeshBasicMaterial}
      * @type {THREE.Mesh}
      * **/
    const sphereGeometry = new THREE.SphereGeometry(this.sphereSize, 32, 32)
    const sphereMaterial = this.material
    // sphereMaterial.color.multiplyScalar(this.lightIntensity)
    this.mouseLightSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    this.mouseLightSphere.castShadow = true

    /**********************
     * Mouse Light
     * @type {THREE.PointLight}
     * @type {THREE.SphereGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
      */
    this.mouseLight = new THREE.PointLight(0xFFFFFF, 100, 100)
    this.mouseLight.intensity = this.lightIntensity
    // this.mouseLight.color.multiplyScalar(this.lightIntensity)
    this.mouseLight.castShadow = true
    this.mouseLight.shadow.bias = -0.005
    this.mouseLight.shadow.mapSize.width = 1024
    this.mouseLight.shadow.mapSize.height = 1024
    this.mouseLight.shadow.camera.near = 0.1
    this.mouseLight.shadow.camera.far = 500
    this.mouseLight.shadow.camera.fov = 30
    this.mouseLight.add(this.mouseLightSphere)
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

      this.elasticMouse.x = event.clientX
      this.elasticMouse.y = event.clientY

      this.intersects = this.raycaster.intersectObjects([this.mouseLightPlane])
      if (this.intersects.length > 0) {
        const p = this.intersects[0].point
        this.eMouse.x = p.x
        this.eMouse.y = p.y
      }
    })
  }

  animate() {
    if (!that.cursor || !that.temp || !that.eMouse || !that.elasticMouse || !that.elasticMouseVel) {
      throw createError({
        statusMessage: 'No cursor element found in MagicMouse.animate()',
        statusCode: 500,
        cause: 'One or more cursor variables are undefined in MagicMouse.animate()',
      })
    }
    that.cursor.style.transform = `translate(${that.elasticMouse.x}px, ${that.elasticMouse.y}px)`

    that.temp.copy(that.eMouse).sub(that.elasticMouse).multiplyScalar(0.15)
    that.elasticMouseVel.add(that.temp)
    that.elasticMouseVel.multiplyScalar(0.85)
    that.elasticMouse.add(that.elasticMouseVel)

    that.mouseLight.position.set(that.elasticMouse.x, that.elasticMouse.y, 0)

    that.material.uniforms.uLight.value = that.mouseLight.position
    that.material.uniforms.time.value = Date.now() * 0.0005

    that.renderer.render(that.scene, that.camera)
  }
}
