import * as THREE from 'three'
import { ref, toRefs } from 'vue'
import { Utils } from '~~/utils/Utils'
type RendererType = THREE.Renderer | any
const renderer = new THREE.WebGLRenderer()

export const useRenderer = (nuxtApp: any, _options: RendererType) => {
  if (nuxtApp.$appStore.getDebugMode)
    Utils.tweakpane.addRenderer(renderer)

  renderer.value.setPixelRatio(_options.ratio)
  renderer.value.setSize(_options.width, _options.height)
  renderer.value.setClearColor(0x000000, 0)
  renderer.value.shadowMap.enabled = true
  renderer.value.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
  renderer.value.outputEncoding = THREE.sRGBEncoding

  renderer.value.toneMapping = THREE.ACESFilmicToneMapping
  renderer.value.toneMappingExposure = 1

  return { renderer: toRefs(renderer) }
}
