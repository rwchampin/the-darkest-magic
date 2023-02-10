import * as THREE from 'three'
import { createSharedComposable, resolveUnref, reactifyObject } from '@vueuse/core'
import { inject } from 'vue'
import useRenderer from '~/composables/useRenderer'
import { useCanvasContext } from './useCanvasContext'
import useLogger from '~/composables/useLogger'
import { useRoom } from './useRoom'

// const { count, inc, dec } = useCount()
// count()
const coreFN = () => {
  useLogger('log', 'useCore composable loaded')
  const debugMode = inject('debugMode')
  const near = 0.1
  const far = 5000
  function createFloor() {
    const floorGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    const floorMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: '0xD30094',
      shininess: 0x000000,
      specular: 0x111111,
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI * 0.5
    floor.receiveShadow = true
    floor.scale.set(10, 10, 10)
    floor.position.set(0, 0, 0)
    return floor
  }
  function createScene() {
     const black = new THREE.Color(0x000000);
    black.convertSRGBToLinear();
    const scene1 = ref(new THREE.Scene())
    const scene2 = new THREE.Scene()

    const rScene = reactifyObject(scene2)
    const unScene = resolveUnref(scene1)
    debugger
    scene.fog = new THREE.Fog(black, near, far)
    if (debugMode) {
      scene.add(new THREE.AxesHelper(5))
    }
      
    return scene
  }

  function createCamera() {
    const distance = 2
    const FOV = (2 * Math.atan(window.innerHeight / (2 * distance)) * 90) / Math.PI

    const camera = new THREE.PerspectiveCamera(
      70, // fov = Field Of View
      window.innerWidth / window.innerHeight, // aspect ratio (dummy value)
      near, // near clipping plane
      far, // far clipping plane
    )
    camera.castShadow = true
   
    if (debugMode) {
      const cameraHelper = new THREE.CameraHelper(camera)
      cameraHelper.visible = true
      scene.add(cameraHelper)
    }
    return camera
  }

  function createLights() {
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, .1)
    const pointLight = new THREE.PointLight(0xFFFFFF, near, far, 2)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 1024
    pointLight.shadow.mapSize.height = 1024
    pointLight.shadow.camera.near = near
    pointLight.shadow.camera.far = far

    const spotLight = new THREE.SpotLight(0x005500, 10, far, 1)
    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.camera.near = near
    spotLight.shadow.camera.far = far
    spotLight.position.set(0, 0, 5)
    spotLight.target.position.set(0, 0, 0)
    spotLight.angle = Math.PI / 4
    spotLight.penumbra = 0.05
    spotLight.decay = 2
    spotLight.distance = 500
    spotLight.shadow.camera.near = near
    spotLight.shadow.camera.far = far
    spotLight.shadow.camera.fov = 70

    if (debugMode) {
      const spotLightHelper = new THREE.SpotLightHelper(spotLight)
      spotLight.add(spotLightHelper)
    }
    if (debugMode) {
      const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
      pointLight.add(pointLightHelper)
    }

    // pointLight.position.set(-1, 2, 0)
    // spotLight.position.set(1, 2, 0)

    return {
      ambientLight,
      pointLight,
      spotLight,
    }
  }

  if (!window)
    throw new Error('window is not defined')

  /********************************
   * 2D Canvas
   *******************************/
  const { canvas2d, ctx } = useCanvasContext()

  /********************************
   * 3D Canvas
   *******************************/
  const white = new THREE.Color(0xffffff);
  white.convertSRGBToLinear();
  const canvas = document.querySelector('.main-canvas-3d')
  const renderer = useRenderer({
    canvas,
    antialias: true,
    // clearColor: white,
    autoClear: false,
  })
 
  const scene = createScene()
  const camera = createCamera()
  const { ambientLight, pointLight, spotLight } = createLights()
  // const floor = createFloor()
  scene.add( ambientLight,camera)

  /*********************************
  ** TETING
  *********************************/
//  const boxGeometry = new THREE.BoxGeometry(100, 100, 100)
//     const boxMaterial = new THREE.MeshPhongMaterial({
//       side: THREE.DoubleSide,
//       color: '0xD30094',
//       shininess: 0x000000,
//       specular: 0x111111,
//     })
//     const box = new THREE.Mesh(boxGeometry, boxMaterial)
//     box.castShadow = true
//     box.receiveShadow = true
//     box.position.set(0, 0, 0)
//  scene.add(box)

  /********************************
   * END TETING
   * ******************************/

  const resize = () => {
  var canvas = renderer.domElement;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  var originalWidth = canvas.width;
  var originalHeight = canvas.height;
    var scale = renderer.getContext().scale;
    debugger
    canvas.width = Math.round(originalWidth*scale);
    canvas.height = Math.round(originalHeight*scale);
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);

}
window.addEventListener('resize', resize);
  return {
    renderer,
    ctx,
    canvas2d,
    scene,
    camera,
    ambientLight
  }
}

export const useCore = createSharedComposable(coreFN)

