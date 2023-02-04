import * as THREE from 'three'
import { createSharedComposable } from '@vueuse/core'
import { inject } from 'vue'
import useRenderer from '~/composables/useRenderer'

import useLogger from '~/composables/useLogger'

// const { count, inc, dec } = useCount()
// count()
const coreFN = () => {
  useLogger('log', 'useCore composable loaded')
  const debugMode = inject('debugMode')

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
    floor.position.set(0, 0, 0)
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
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)
    const pointLight = new THREE.PointLight(0xFFFFFF, 1, 500, 1)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 1024
    pointLight.shadow.mapSize.height = 1024
    pointLight.shadow.camera.near = 0.5
    pointLight.shadow.camera.far = 500

    const spotLight = new THREE.SpotLight(0xFFFFFF, 1, 500, 1)
    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.camera.near = 0.5
    spotLight.shadow.camera.far = 500

    if (debugMode) {
      const spotLightHelper = new THREE.SpotLightHelper(spotLight)
      spotLight.add(spotLightHelper)
    }
    if (debugMode) {
      const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
      pointLight.add(pointLightHelper)
    }

    return {
      ambientLight,
      pointLight,
      spotLight,
    }
  }

  function createCore() {
    if (!window)
      throw new Error('window is not defined')

    const canvas = document.querySelector('.main-canvas-2d')

    const renderer = useRenderer(canvas)
    const scene = createScene()
    const camera = createCamera()
    const { ambientLight, pointLight } = createLights()
    pointLight.position.set(0, 2, 0)
    scene.add(ambientLight, pointLight)
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

