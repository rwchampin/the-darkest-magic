import * as THREE from 'three'
import { ref, toRefs } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Utils } from '~~/utils/Utils'

const nuxtApp = useNuxtApp()
const { width, height } = useWindowSize()
const camera = ref(new THREE.PerspectiveCamera(75, width.value / height.value, 0.1, 1000))

export const useCamera = () => {
  if (nuxtApp.$appStore.getDebugMode) {
    Utils.tweakpane.addCamera(camera)
    const cameraHelper = new THREE.CameraHelper(camera.value)
  }

  const t = {
    camera: toRefs(camera),
  }
  debugger
  return t
}
