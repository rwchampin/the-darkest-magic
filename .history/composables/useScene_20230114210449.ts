import * as THREE from 'three'
import { ref, toRefs } from 'vue'
import { Utils } from '~~/utils/Utils'

const nuxtApp = useNuxtApp()
const scene = ref(new THREE.Scene())

const axesHelper = new THREE.AxesHelper(50)
// const fog = new THREE.Fog(0x000000, 0, 100)
// scene.isFog = fog

export const useScene = (_options) => {
  if (nuxtApp.$appStore.getDebugMode) {
    Utils.tweakpane.addScene(scene)
    scene.value.add(axesHelper)
  }
  scene.value.name = _options.name
  return {
    scene: toRefs(scene),
  }
}
