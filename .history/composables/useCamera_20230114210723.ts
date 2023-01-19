import * as THREE from 'three'
import { ref, toRefs } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Utils } from '~~/utils/Utils'

const nuxtApp = useNuxtApp()
const { width, height } = useWindowSize()
const camera = ref(new THREE.PerspectiveCamera(75, width.value / height.value, 0.1, 1000))
let cameraHelper: THREE.CameraHelper
export const useCamera = (nuxtApp, _options) => {
  if (nuxtApp.$appStore.getDebugMode) {
    Utils.tweakpane.addCamera(camera)
    cameraHelper = new THREE.CameraHelper(camera.value)
  }
  camera.value.name = _options.name
  return {
    camera: nuxtApp.$appStore.getDebugMode ? cameraHelper : toRefs(camera),
  }
}
