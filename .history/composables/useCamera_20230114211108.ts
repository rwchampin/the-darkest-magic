import { type } from 'os'
import * as THREE from 'three'
import { ref, toRefs } from 'vue'
import { Utils } from '~~/utils/Utils'

type CameraType = THREE.Camera | any
type NuxtApp = any

const camera = ref(new THREE.PerspectiveCamera())
let cameraHelper: THREE.CameraHelper
export const useCamera = (nuxtApp, _options: CameraType) => {
  if (nuxtApp.$appStore.getDebugMode) {
    Utils.tweakpane.addCamera(camera)
    cameraHelper = new THREE.CameraHelper(camera.value)
  }
  camera.value.name = _options.name
  camera.value.fov = _options.fov
  camera.value.aspect = _options.width / _options.height
  camera.value.near = _options.near
  camera.value.far = _options.far
  return {
    camera: nuxtApp.$appStore.getDebugMode ? cameraHelper : toRefs(camera),
  }
}
