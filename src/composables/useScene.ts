import * as THREE from 'three'
// import { shallowReactive, toRefs } from 'vue'
import { createSharedComposable } from '@vueuse/core'
// import { Utils } from '~/utils'

type SceneType = THREE.Scene | any

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(50)
// const fog = new THREE.Fog(0x000000, 0, 100)
// scene.isFog = fog

const useSceneFN = (nuxtApp: any, _options: SceneType) => {
  if (nuxtApp.$appStore.getDebugMode) {
    // Utils.tweakpane.addScene(scene)
    scene.add(axesHelper)
  }
  scene.name = _options.name
  return scene
}

export const useScene = createSharedComposable(useSceneFN)
