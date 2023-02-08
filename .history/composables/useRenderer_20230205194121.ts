import * as THREE from 'three'
// import { ref, toRefs } from 'vue'
// import { Utils } from '~~/util/ssssss/Util/s'

const useRendererFN = ({
  canvas = document.querySelector('.main-canvas-2d') || document.createElement('canvas'),
  clearColor = 0xFFFFFF,
  toneMapping = THREE.ReinhardToneMapping,
  shadowMapEnabled = true,
  shadowMapType = THREE.PCFSoftShadowMap,
  physicallyCorrectLights = true,
  outputEncoding = THREE.sRGBEncoding,
  autoClear = false,
}) => {
  // if (!document || !window)

    // throw createError({
    //   statusMessage: 'document is not defined',
    //   statusCode: 500,
    // })

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
    canvas,
  })

  renderer.gammaFactor = 2.2;
  renderer.setClearColor(clearColor, 1)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = toneMapping
  renderer.shadowMap.enabled = shadowMapEnabled
  renderer.shadowMap.type = shadowMapType
  renderer.physicallyCorrectLights = physicallyCorrectLights
  renderer.outputEncoding = outputEncoding
  renderer.autoClear = autoClear

  return renderer
}

const useRenderer = createSharedComposable(useRendererFN)

export default useRenderer

