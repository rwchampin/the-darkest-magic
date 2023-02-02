import * as THREE from 'three'
import { createSharedComposable } from '@vueuse/core'

export const coreFN = () => {
  function createRenderer(canvas) {
    if (!document)
      throw new Error('document is not defined')

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap

    document.body.appendChild(renderer.domElement)
    return renderer
  }

  function createScene() {
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xFF0000, 1, 100)
    scene.background = new THREE.Color('rgb(245, 255, 255)')

    return scene
  }

  function createCamera() {
    const camera = new THREE.PerspectiveCamera(
      45, // fov = Field Of View
      window.innerWidth / window.innerHeight, // aspect ratio (dummy value)
      0.1, // near clipping plane
      100, // far clipping plane
    )
    camera.position.set(0, 10, 10)
    return camera
  }

  function createLights() {
    const ambientLight = new THREE.AmbientLight(0x000000, 50)
    const pointLight = new THREE.PointLight(0x000000, 50)
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
