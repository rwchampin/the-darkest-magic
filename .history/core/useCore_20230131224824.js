import * as THREE from 'three'
import { createSharedComposable } from '@vueuse/core'

export const coreFN = () => {
  function createRenderer() {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    return renderer
  }

  function createScene() {
    const scene = new THREE.Scene()

    scene.background = new THREE.Color('0x555555')

    return scene
  }

  function createCamera() {
    const camera = new THREE.PerspectiveCamera(
      35, // fov = Field Of View
      window.innerWidth / window.innerHeight, // aspect ratio (dummy value)
      0.1, // near clipping plane
      100, // far clipping plane
    )

    // move the camera back so we can view the scene
    camera.position.set(0, 0, 10)

    return camera
  }

  function createCore() {
    const renderer = createRenderer()
    const scene = createScene()
    const camera = createCamera()

    return {
      renderer,
      scene,
      camera,
    }
  }

  return {
    createCore,
  }
}

export const useCore = createSharedComposable(coreFN)
