/* eslint-disable no-console */
/* eslint-disable no-undef */
import * as THREE from 'three'
import useCore from '~composables/useCore'

export default defineNuxtPlugin((nuxtApp) => {
  // const { buildUI } = useUIManager(nuxtApp);
  // Doing something with nuxtApp

  function createCoreSingletons(nuxtApp) {
    const { canvas2d, canvas3d, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight } = useCore(nuxtApp)

    useEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    SUPERGLOBAL.core = {}
    SUPERGLOBAL.core.scene = scene
    SUPERGLOBAL.core.camera = camera
    SUPERGLOBAL.core.renderer = renderer
    SUPERGLOBAL.core.lights = {
      ambientLight,
      pointLight,
      directionalLight,
      rectAreaLight,
      spotLight,
      hemisphereLight,
    }
    SUPERGLOBAL.core.controls = controls
    SUPERGLOBAL.core.clock = clock
    SUPERGLOBAL.core.canvas = {
      canvas2d,
      canvas3d,
    }
    SUPERGLOBAL.gui = {}
    SUPERGLOBAL.gui.instance = new Panel()
    SUPERGLOBAL.gui.sceneFolder = gui.addFolder('Scene')
    SUPERGLOBAL.gui.cameraFolder = gui.addFolder('Camera')
    SUPERGLOBAL.gui.lightsFolder = gui.addFolder('Lights')
    SUPERGLOBAL.gui.rendererFolder = gui.addFolder('Renderer')
    SUPERGLOBAL.gui.controlsFolder = gui.addFolder('Controls')
    SUPERGLOBAL.gui.canvasFolder = gui.addFolder('Canvas')

    trigger('core:singletons:complete')
  }
  nuxtApp.hook('app:created', () => {
    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:created')
  })
  nuxtApp.hook('app:error', (err) => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:error')
    debugger
    throw createError({
      statusCode: 500,
      statusMessage: `Vue error during setup${err}`,
    })
  })
  nuxtApp.hook('app:error:cleared', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:error:cleared')
  })
  nuxtApp.hook('app:data:refresh', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:data:refresh')
  })
  nuxtApp.hook('vue:setup', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('vue:setup')
  })
  nuxtApp.hook('vue:setup:done', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('vue:setup:done')
  })
  nuxtApp.hook('vue:setup:error', (err) => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.red.bgBlack('vue:setup:error'))

    throw createError({
      statusCode: 500,
      statusMessage: `Vue error during setup${err}`,
    })
  })
  nuxtApp.hook('vue:setup:error:cleared', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('vue:setup:error:cleared')
  })
  nuxtApp.hook('vue:setup:done', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.getDebugMode)
    console.log('vue:setup:done')
  })

  nuxtApp.hook('app:rendered', () => {
    /* your code goes here */

    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:rendered')
  })
  nuxtApp.hook('app:redirected', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:redirected')
  })
  nuxtApp.hook('app:beforeMount', () => {
    /* your code goes here */
    nuxtApp.$appStore.appLoadingStatus.value = true
    // nuxtApp.$resources.init()

    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:beforeMount')
  })
  nuxtApp.hook('app:mounted', () => {
    /* your code goes here */

    createCoreSingletons(nuxtApp)
    nuxtApp.$registerPlugins()
    // buildUI();
    nuxtApp.$appStore.appLoadingStatus.value = false
    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:mounted')
  })
  nuxtApp.hook('app:suspense:resolve', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:suspense:resolve')
  })
  nuxtApp.hook('link:prefetch', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('link:prefetch')
  })
})
