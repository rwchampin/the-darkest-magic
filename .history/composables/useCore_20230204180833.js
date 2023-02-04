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

  function createFloor() {
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
    return floor
  }
  function createScene() {
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xFFFFFF, 0.1, 150)
    scene.background = new THREE.Color(0x222222)

    return scene
  }

  function createCamera() {
    const distance = 3
    const FOV = (2 * Math.atan(window.innerHeight / (2 * distance)) * 90) / Math.PI

    const camera = new THREE.PerspectiveCamera(
      FOV, // fov = Field Of View
      window.innerWidth / window.innerHeight, // aspect ratio (dummy value)
      1, // near clipping plane
      200000, // far clipping plane
    )
    camera.castShadow = true
    // camera.position.set(0, 0, 1)
    camera.position.set(0, 0, 3)
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

    const spotLight = new THREE.SpotLight(0x005500, 1, 500, 1)
    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.camera.near = 0.5
    spotLight.shadow.camera.far = 500
    spotLight.position.set(0, 5, 0)
    spotLight.target.position.set(0, 0, 0)
    spotLight.angle = Math.PI / 4
    spotLight.penumbra = 0.05
    spotLight.decay = 2
    spotLight.distance = 500
    spotLight.shadow.camera.near = 0.5
    spotLight.shadow.camera.far = 500
    spotLight.shadow.camera.fov = 30

    if (debugMode) {
      const spotLightHelper = new THREE.SpotLightHelper(spotLight)
      spotLight.add(spotLightHelper)
    }
    if (debugMode) {
      const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
      pointLight.add(pointLightHelper)
    }

    pointLight.position.set(-1, 2, 0)
    spotLight.position.set(1, 2, 0)

    return {
      ambientLight,
      pointLight,
      spotLight,
    }
  }

  if (!window)
    throw new Error('window is not defined')


  const canvas = document.querySelector('.main-canvas-2d')

  const renderer = useRenderer({ canvas })
  const scene = createScene()
  const camera = createCamera()
  const { ambientLight, pointLight, spotLight } = createLights()

  const floor = createFloor()
  scene.add(floor, ambientLight, pointLight, spotLight, camera)

  const resize = (function() {
  var canvas = renderer.domElement;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  var originalWidth = canvas.width;
  var originalHeight = canvas.height;
  return function(scale) {
    canvas.width = Math.round(originalWidth*scale);
    canvas.height = Math.round(originalHeight*scale);
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
  }
})();
window.addEventListener('resize', resize);
  return {
    renderer,
    scene,
    camera,
    ambientLight,
    pointLight,
    spotLight,
    floor,
  }
}

export const useCore = createSharedComposable(coreFN)

