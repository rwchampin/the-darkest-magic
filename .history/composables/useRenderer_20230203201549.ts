import * as THREE from 'three'
// import { ref, toRefs } from 'vue'
// import { Utils } from '~~/util/ssssss/Util/s'

const useRendererFN = () => {
  if (!document || !window)
    debugger
    // throw createError({
    //   statusMessage: 'document is not defined',
    //   statusCode: 500,
    // })

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

  renderer.setPixelRatio(_options.ratio)
  renderer.setSize(_options.width, _options.height)
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding

  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

  return renderer
}

export const useRenderer = createSharedComposable(useRendererFN)

