import * as THREE from 'three'
// import { ref, toRefs } from 'vue'
// import { Utils } from '~~/util/ssssss/Util/s'

const useRendererFN = ({
  canvas = document.querySelector('.main-canvas-3d') || null,
  clearColor = 0xFFFFFF,
  toneMapping = THREE.ReinhardToneMapping,
  shadowMapEnabled = true,
  shadowMapType = THREE.PCFSoftShadowMap,
  physicallyCorrectLights = true,
  outputEncoding = THREE.sRGBEncoding,
  autoClear = true,
}) => {
  // if (!document || !window)

  // throw createError({
  //   statusMessage: 'document is not defined',
  //   statusCode: 500,
  // })
  if (!canvas) {
    debugger
    canvas = document.createElement('canvas')
    canvas.classList.add('canvas-ui').add('main-canvas-3d').add('fake')
  }

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
    canvas,
  })

  renderer.setClearColor(clearColor, 1)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = toneMapping
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.physicallyCorrectLights = physicallyCorrectLights
  renderer.outputEncoding = outputEncoding
  renderer.autoClear = autoClear

  return renderer
}

const useRenderer = createSharedComposable(useRendererFN)

export default useRenderer

