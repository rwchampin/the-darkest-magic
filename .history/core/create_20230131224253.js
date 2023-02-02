import * as THREE from 'three'

function createRenderer() {
  const renderer = new THREE.WebGLRenderer()

  return renderer
}

function createScene() {
  const scene = new Scene()

  scene.background = new Color('skyblue')

  return scene
}

export { createRenderer }
