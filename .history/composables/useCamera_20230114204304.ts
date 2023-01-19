import * as THREE from 'three'
import { useWindowSize } from '@vueuse/core'
import Utils from '~/utils/'

const nuxtApp = useNuxtApp()
const { width, height } = useWindowSize()
const camera = ref(new THREE.PerspectiveCamera(75, width.value / height.value, 0.1, 1000))

export const useCamera = () => {
  if (nuxtApp.$appStore.getDebugMode)
    Utils.tweakpane.addCamera(camera)

  return camera
}
