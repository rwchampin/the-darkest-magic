import * as THREE from 'three'
// import { ref, toRefs } from 'vue'
import { createSharedComposable } from '@vueuse/core'
// import { Utils } from '~~/utils/Utils'

let cameraHelper: THREE.CameraHelper
const useCameraFN = (nuxtApp: any, _options: {}) => {
  // if (nuxtApp.$appStore.getDebugMode) {
  //   // Utils.tweakpane.addCamera(camera)
  //   cameraHelper = new THREE.CameraHelper(camera)
  // }
  // cam/era.name = _options.name
  const camera = new THREE.PerspectiveCamera(_options.fov, _options.width / _options.height, _options.near, _options.far)

  return {
    camera,
  }
}

const useCamera = createSharedComposable(useCameraFN)

export default useCamera
