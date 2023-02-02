import * as THREE from 'three'
import gsap from 'gsap'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { Vector2 } from '~/utils/Vector'
import fragment from '~/shaders/mouseGlow/fragment.glsl'
import vertex from '~/shaders/mouseGlow/vertex.glsl'
import { Utils } from '~/utils'

export default class MagicMouse {
  constructor({ camera, scene, renderer }) {
    /*******************
     * 1. Setup
     * *****************/
    this.camera = camera
    this.scene = scene
    this.renderer = renderer

    /*******************
     * 2. Properties
     * *****************/
    this.mouse = new Vector2()
    this.elasticMouse = new Vector2()
    this.elasticMouseVel = new Vector2()
    this.eMouse = new Vector2()
    this.temp = new Vector2()
    this.cursor = document.createElement('div')
    this.prevPos = new Vector2()
    this.radius = Vector2.random2D()
    this.vel = Vector2.random2D()
    this.acc = new Vector2(0, 0)
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
      uniforms: {
        uLight: { value: new THREE.Vector3() },
        resolution: { value: new THREE.Vector4() },
        time: { value: 0 },
        texture1: { value: new THREE.TextureLoader().load('/textures/texture1.jpg') },
        progress: { value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    /*******************
     * 3. Methods
     * *****************/
    this.raycaster = null
    this.mouseLight = null
    this.mouseLightPlane = null
    this.mouseLightSphere = null

    this.intersects = []

    /*******************
     * 4. Init
     * *****************/
    this.init()
    this.setPositionsAddScene()
    this.postProcessing()
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

  lerp(start, end, amt) {
    const x = (1 - amt) * start.x + amt * end.x
    const y = (1 - amt) * start.y + amt * end.y
    return new Vector2(x, y)
  }

  setPositionsAddScene() {
    this.mouseLightPlane.position.set(this.pos.x, this.pos.y, 0)
    this.mouseLight.add(this.mouseLightSphere)
    this.scene.add(this.mouseLightPlane)
    this.scene.add(this.mouseLight)
  }

  init() {
    this.cursor.setAttribute('id', 'cursor')
    this.cursor.style.position = 'fixed'
    this.cursor.style.top = '0'
    this.cursor.style.left = '0'
    this.cursor.style.width = '100px'
    this.cursor.style.height = '100px'
    this.cursor.style.background = 'red'
    this.cursor.style.borderRadius = '50%'
    this.cursor.style.transform = 'translate(-50%, -50%)'
    this.cursor.style.zIndex = 99999999999
    document.body.appendChild(this.cursor)
    /**********************
     * Mouse Light
     * @type {THREE.PointLight}
     * @type {THREE.SphereGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
      */
    this.mouseLight = new THREE.PointLight(0xFFFFFF, 100, 100)
    this.mouseLight.intensity = this.lightIntensity
    this.mouseLight.color.multiplyScalar(this.lightIntensity)
    this.mouseLight.castShadow = true
    this.mouseLight.shadow.bias = -0.005
    /**********************
     * Mouse Light Plane
     * @type {THREE.PlaneGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
    */
    const planeGeometry = new THREE.PlaneGeometry(2, 1, 2, 2)
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 0xFFFFFF, specular: 0x333333, side: THREE.DoubleSide })
    this.mouseLightPlane = new THREE.Mesh(planeGeometry, planeMaterial)
    this.mouseLightPlane.receiveShadow = true
    /**********************
     * Mouse Light Sphere
     * @type {THREE.SphereGeometry}
     *  @type {THREE.MeshBasicMaterial}
      * @type {THREE.Mesh}
      * **/
    const sphereGeometry = new THREE.SphereGeometry(this.sphereSize, 32, 32)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    sphereMaterial.color.multiplyScalar(this.lightIntensity)
    this.mouseLightSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    this.mouseLightSphere.castShadow = true

    /**********************
     * Raycaster
     * @type {THREE.Raycaster}
     * @type {THREE.Vector2}
     **/
    this.raycaster = new THREE.Raycaster()
  }

  attachHandlers() {
    window.addEventListener('mousemove', (event) => {
      this.prevPos.x = this.pos.x
      this.prevPos.y = this.pos.y
      this.pos.x = (event.clientX / window.innerWidth) * 2 - 1
      this.pos.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.raycaster.setFromCamera(this.pos, this.camera)
      this.intersects = this.raycaster.intersectObjects(this.scene.children)

      for (let index = 0; index < this.intersects.length; index++) {
        const coords = this.intersects[index].point
        const { x, y } = this.lerp(coords, this.prevPos, 0.05)

        gsap.to(this.mouseLight.position, { x, y, z: 0, easing: 'elastic.inOut(1, 0.3)', duration: 0.5 })
      }

      // this.mouseLightSphere.position.copy(this.intersects[index].point)
    })
  }

  render() {
    this.cursor.style.transform = `translate(${this.elasticMouse.x}px, ${this.elasticMouse.y}px)`

    this.temp.copy(this.eMouse).sub(this.elasticMouse).multiplyScalar(0.15)
    this.elasticMouseVel.add(this.temp)
    this.elasticMouseVel.multiplyScalar(0.85)
    this.elasticMouse.add(this.elasticMouseVel)

    this.mouseLight.position.copy(this.elasticMouse.position)

    this.material.uniforms.uLight.value = this.mouseLight.position
    this.material.uniforms.time.value = this.time

    this.renderer.render(this.scene, this.camera)
  }
}
