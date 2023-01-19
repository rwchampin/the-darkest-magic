import * as THREE from 'three'
import { Utils } from '~/utils/utils'
const nuxtApp = useNuxtApp()
const scene = ref(new THREE.Scene())

// const fog = new THREE.Fog(0x000000, 0, 100)
// scene.isFog = fog

export const useScene = () => {
  if (nuxtApp.$appStore.getDebugMode) {

  }


  
    const add = () => {
    // scene.add(obj)
    }
  }

  const remove = () => {
    // scene.remove(obj)
  }

  return {
    scene: toRefs(scene),
    add,
    remove,
  }
}
