import * as THREE from 'three'
import { Utils } from '~/utils/'

const nuxtApp = useNuxtApp()
const scene = ref(new THREE.Scene())

// const fog = new THREE.Fog(0x000000, 0, 100)
// scene.isFog = fog

export const useScene = () => {
  if (nuxtApp.$appStore.getDebugMode)
    Utils.tweakpane.addScene(scene)

  return 
    scene: toRefs(scene),
  
}
