import * as THREE from 'three'
import Utils from '~/utils/'

const nuxtApp = useNuxtApp()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

export const useCamera = () => {
  if (nuxtApp.$appStore.getDebugMode)
    Utils.tweakpane.addScene(scene)

  return camera
}
