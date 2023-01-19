import * as THREE from 'three'
const nuxtApp = useNuxtApp()
const scene = ref(new THREE.Scene())

// const fog = new THREE.Fog(0x000000, 0, 100)
// scene.isFog = fog

export const useScene = () => {
  if (nuxtApp.$appStore.getDebugMode) {
    debugger
    const sceneFolder = nuxtApp.$tp.addFolder('Scene');
    sceneFolder.addInput(scene, 'isFog')
    sceneFolder.addInput(scene, 'fog')
    sceneFolder.addInput(scene.fog, 'color')
    sceneFolder.addInput(scene.fog, 'near')
    sceneFolder.addInput(scene.fog, 'far')
    sceneFolder.addInput(scene, 'background');
    debugger
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
