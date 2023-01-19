import * as THREE from 'three'
import { Utils } from '~~/utils/Utils'

const nuxtApp = useNuxtApp()
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
})

export const useRenderer = () => {
  if (nuxtApp.$appStore.getDebugMode)
    Utils.tweakpane.addRenderer(renderer)

  renderer.setPixelRatio(ratio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding

  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

  return renderer
}
