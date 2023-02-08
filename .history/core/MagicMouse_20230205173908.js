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
let instance = null, finalPass

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
      side: THREE.DoubleSide,
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

     finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: `
          varying vec2 vUv;

			void main() {

				vUv = uv;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}
        `,
        fragmentShader: `
        uniform sampler2D baseTexture;
			uniform sampler2D bloomTexture;

			varying vec2 vUv;

			void main() {

				gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

			}

      `,
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
    this.camera.position.set(0, 1.5, 3)
    // document.body.appendChild(this.cursor)

    /**********************
     * Mouse Light Plane
     * @type {THREE.PlaneGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
    */
    const planeGeometry = new THREE.PlaneGeometry(10,10)
    const planeMaterial = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      uniforms: {
        uLight: { value: new THREE.Vector3() },
        uResolution: { value: new THREE.Vector4() },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3() },
        uColor: { value: new THREE.Color(this.color) },
      },
      side: THREE.DoubleSide,
      vertexShader: `
      #ifdef GL_ES
      precision mediump float;
      #endif
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
      `,
      fragmentShader: `
      #ifdef GL_ES
      precision mediump float;
      #endif
      uniform vec3 uLight;
      uniform vec3 uMouse;
      uniform vec4 uResolution;
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;

      vec3 noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        vec2 uv = (i.xy + vec2(37.0, 17.0) * i.z) + f.xy;
        vec2 rg = texture2D(iChannel0, (uv + 0.5) / 256.0, -100.0).yx;
        return mix(rg.x, rg.y, f.z) * 2.0 - 1.0;
      }

      float fbm(vec3 p) {
        float f = 0.0;
        f += 0.5000 * noise(p); p = p * 2.02;
        f += 0.2500 * noise(p); p = p * 2.03;
        f += 0.1250 * noise(p); p = p * 2.01;
        f += 0.0625 * noise(p); p = p * 2.04;
        f /= 0.9375;
        return f;
      }

      void main() {
        vec2 uv = vUv;
        vec3 pos = vPosition;
        vec3 normal = vNormal;
        vec3 light = normalize(uLight - pos);
        vec3 color = uColor;
        float d = length(uLight - pos);
        float att = 1.0 - smoothstep(0.0, 1.0, d);
        float diff = clamp(dot(normal, light), 0.0, 1.0);
        float spec = pow(clamp(dot(reflect(-light, normal), normalize(-pos)), 0.0, 1.0), 16.0);
        vec3 diffuse = diff * color;
        vec3 specular = spec * vec3(1.0);
        vec3 ambient = vec3(0.03);
        vec3 col = (ambient + diffuse + specular) * att;
        vec3 noisePos = vec3(uv * 2.0, uTime * 0.2);
        float b = fbm(noisePos);
        float displacement = smoothstep(0.0, 0.5, b);
        vec3 newPosition = pos + normal * displacement * 0.1;
        gl_FragColor = vec4(col, 1.0);  
      }
      `,

    })
    this.lightPlane = new THREE.Mesh(planeGeometry, planeMaterial)
    this.lightPlane.receiveShadow = true
    this.lightPlane.position.set(0, 0, 0)
    /**********************
     * Mouse Light Sphere
     * @type {THREE.SphereGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
      */
    const sphereGeometry = new THREE.SphereGeometry(0.02, 20, 20)
    const sphereMaterial = finalPass
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
    // document.getElementById("cursor").style.transform = `translate(${instance.elasticMouse.x}px, ${instance.elasticMouse.y}px)`
    instance.temp.copy(instance.eMouse).sub(instance.elasticMouse).multiplyScalar(0.15)
    instance.elasticMouseVel.add(instance.temp)
    instance.elasticMouseVel.multiplyScalar(0.85)
    instance.elasticMouse.add(instance.elasticMouseVel)

    instance.light.position.x = instance.elasticMouse.x
    instance.light.position.y = instance.elasticMouse.y

    const distance = instance.camera.position.distanceTo(instance.light.position)

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

  getLightVector() {
    return this.light.position
  }

  getLightDistanceFromCamera() {
    return this.camera.position.distanceTo(this.light.position)
  }
}
