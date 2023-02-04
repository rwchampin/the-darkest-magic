import * as THREE from 'three'
import { createSharedComposable } from '@vueuse/core'

const coreFN = () => {
  function createRenderer(canvas) {
    if (!document)
      throw new Error('document is not defined')

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      canvas,
    })
    renderer.setClearColor(0x000000, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding
    // renderer.autoClear = false

    document.body.appendChild(renderer.domElement)
    return renderer
  }

  function createScene() {
    const scene = new THREE.Scene()
    // scene.fog = new THREE.Fog(0xFFFFFF, 0.1, 150)
    // scene.background = new THREE.Color(0x222222)
    const floorGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    const floorMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: '0xFFC0CB',
      shininess: 0x000000,
      specular: 0x111111,
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI * 0.5
    floor.receiveShadow = true
    floor.position(0, 0, 0)
    scene.add(floor)

    return scene
  }

  function createCamera() {
    const camera = new THREE.PerspectiveCamera(
      70, // fov = Field Of View
      window.innerWidth / window.innerHeight, // aspect ratio (dummy value)
      0.001, // near clipping plane
      1000, // far clipping plane
    )
    camera.castShadow = true
    camera.position.set(0, 0, 1)
    camera.lookAt(0, 0, 0)
    return camera
  }

  function createLights() {
    const ambientLight = new THREE.AmbientLight(0x000000, 0.50)
    const pointLight = new THREE.PointLight(0x000000, 0.50)
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
    pointLight.add(pointLightHelper)

    return {
      ambientLight,
      pointLight,
    }
  }

  function createCore() {
    if (!window)
      throw new Error('window is not defined')

    const canvas = document.querySelector('.main-canvas-2d')

    const renderer = createRenderer(canvas)
    const scene = createScene()
    const camera = createCamera()
    const { ambientLight, pointLight } = createLights()

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    })

    return {
      renderer,
      scene,
      camera,
      ambientLight,
      pointLight,
    }
  }

  return {
    createCore,
  }
}

export const useCore = createSharedComposable(coreFN)

