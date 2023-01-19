import * as THREE from 'three'
import { toRefs } from 'vue'
import { Utils } from '~~/utils/Utils'
type RendererType = THREE.Renderer | any
const renderer = ref(new THREE.WebGLRenderer())

export const useRenderer = (nuxtApp: any, _options: RendererType) => {
  if (nuxtApp.$appStore.getDebugMode)
    Utils.tweakpane.addRenderer(renderer)

  renderer.setPixelRatio(_options.ratio)
  renderer.setSize(_options.width, _options.height)
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding

  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

  return { renderer: toRefs(renderer) }
}
