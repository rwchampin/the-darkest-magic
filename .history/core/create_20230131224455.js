import * as THREE from 'three'

export const coreFN = () => {
  function createRenderer() {
    const renderer = new THREE.WebGLRenderer()

    return renderer
  }

  function createScene() {
    const scene = new THREE.Scene()

    scene.background = new THREE.Color('skyblue')

    return scene
  }

  function createCamera() {
    const camera = new THREE.PerspectiveCamera(
      35, // fov = Field Of View
      1, // aspect ratio (dummy value)
      0.1, // near clipping plane
      100, // far clipping plane
    )

    // move the camera back so we can view the scene
    camera.position.set(0, 0, 10)

    return camera
  }

  return {
    createScene,
    createCamera,
    createRenderer,
  }
}
