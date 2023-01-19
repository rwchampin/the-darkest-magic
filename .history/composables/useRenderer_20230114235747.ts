import * as THREE from 'three'
// import { ref, toRefs } from 'vue'
// import { Utils } from '~~/util/ssssss/Util/s'

const renderer = new THREE.WebGLRenderer()

const useRendererFN = (nuxtApp: any, _options: RendererType) => {
  // if (nuxtApp.$appStore.getDebugMode)
  //   Utils.tweakpane.addRenderer(renderer)

  renderer.setPixelRatio(_options.ratio)
  renderer.setSize(_options.width, _options.height)
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding

  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

  return { renderer }
}

const useRenderer = createSharedComposable(useRendererFN)

export default useRenderer
