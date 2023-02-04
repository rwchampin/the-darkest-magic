import * as THREE from 'three'
// import { ref, toRefs } from 'vue'
// import { Utils } from '~~/util/ssssss/Util/s'

const useRendererFN = (opts) => {
  if (!document || !window)
    debugger
    // throw createError({
    //   statusMessage: 'document is not defined',
    //   statusCode: 500,
    // })

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
    canvas,
  })
  renderer.setClearColor(0x000000, 1)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.BasicShadowMap
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = THREE.sRGBEncoding
  // renderer.autoClear = false

  document.body.appendChild(renderer.domElement)
  return renderer
}

export const useRenderer = createSharedComposable(useRendererFN)

