import { type } from 'os'
import * as THREE from 'three'
import { ref, toRefs } from 'vue'
import { Utils } from '~~/utils/Utils'

type CameraType = THREE.Camera | any

const camera = new THREE.PerspectiveCamera()
let cameraHelper: THREE.CameraHelper
const useCameraFN = (nuxtApp: any, _options: CameraType) => {
  // if (nuxtApp.$appStore.getDebugMode) {
  //   // Utils.tweakpane.addCamera(camera)
  //   cameraHelper = new THREE.CameraHelper(camera)
  // }
  // cam/era.name = _options.name
  debugger
  camera.fov = _options.fov
  camera.aspect = _options.width / _options.height
  camera.near = _options.near
  camera.far = _options.far

  return {
    camera: nuxtApp.$appStore.getDebugMode ? cameraHelper : camera,
  }
}

const useCamera = createSharedComposable(useCameraFN)

export default useCamera
