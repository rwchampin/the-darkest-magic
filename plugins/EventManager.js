/* eslint-disable no-undef */
/* eslint-disable no-console */
// /* eslint-disable no-console */
// /* eslint-disable no-undef */
import * as THREE from 'three'
import { useEventListener } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Utils } from '~/utils/Utils'

import { EventEmitter } from '~/utils/EventEmitter'
import { useTick } from '~/composables/useTick'
const { add } = useTick()
const em = new EventEmitter()

em.on('core:singletons:complete', () => {
  // if (nuxtApp.$appStore.getDebugMode)
  console.log('core:singletons:complete')
})

export default defineNuxtPlugin((nuxtApp) => {
  // const { buildUI } = useUIManager(nuxtApp);
  // Doing something with nuxtApp

  function createCoreSingletons(nuxtApp) {
    const canvas = document.querySelector('.main-canvas-3d')
    const clock = new THREE.Clock()
    const time = clock.getElapsedTime()
    const scene = new THREE.Scene()
    if (nuxtApp.$appStore.getDebugMode) {
      const axesHelper = new THREE.AxesHelper(100)
      scene.add(axesHelper)
    }
    scene.name = `CoreScene: ${time}`
    // scene.background = new THREE.Color(0xF0F0F0)
    scene.fog = new THREE.Fog(0xFFFFFF, 50, 500)
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    // const orthographicCamera = new THREE.OrthographicCamera(
    //   window.innerWidth / -2,
    //   window.innerWidth / 2,
    //   window.innerHeight / 2,
    //   window.innerHeight / -2,
    //   10,
    //   150,
    // // )
    camera.position.set(100, 100, 100)
    camera.lookAt(0, 0, 0)
    camera.name = `CoreCamera: ${time}`

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.physicallyCorrectLights = true
    // renderer.gammaFactor = 2.2
    // renderer.gammaOutput = true
    // renderer.outputEncoding = THREE.sRGBEncoding
    renderer.name = `CoreRenderer: ${time}`
    renderer.setSize(window.innerWidth, window.innerHeight)

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
    ambientLight.name = `CoreAmbientLight: ${time}`
    const pointLight = Utils.three.createLight({
      color: 0xFFFFFF,
      intensity: 100,
    })

    pointLight.name = `CorePointLight: ${time}`
    pointLight.position.set(0, 10, 10)
    pointLight.castShadow = true
    // const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1)

    const pointLight2 = new THREE.PointLight(0xFF0000, 0.5)
    const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.1)
    pointLight2.name = `CorePointLight2: ${time}`
    pointLight2.position.set(0, 0, 0)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.name = `Corecontrols: ${time}`
    controls.enableDamping = true
    controls.update()

    scene.add(ambientLight, pointLight, pointLight2, pointLightHelper2, camera)
    const animate = () => {
      renderer.render(scene, camera)
      controls.update()
      requestAnimationFrame(animate)
    }
    animate()
    // const flyControls = new FlyControls(cameras.activeCamera, renderer.domElement)
    // flyControls.name = `CoreFlyControls: ${time}`
    // flyControls.movementSpeed = 10
    // flyControls.rollSpeed = Math.PI / 24
    // flyControls.dragToLook = true
    // flyControls.update()

    // const controls = {
    //   orbitControls,
    //   // flyControls,
    //   activeControls: orbitControls,
    // }

    useEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    SUPERGLOBAL.core = {}
    SUPERGLOBAL.core = {}
    SUPERGLOBAL.core.scene = scene
    SUPERGLOBAL.core.camera = camera
    SUPERGLOBAL.core.renderer = renderer
    SUPERGLOBAL.core.lights = {
      ambientLight,
      pointLight,
      pointLight2,
    }
    SUPERGLOBAL.core.controls = controls
    SUPERGLOBAL.core.clock = clock

    em.trigger('core:singletons:complete')
  }
  nuxtApp.hook('app:created', () => {
    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:created')
  })
  nuxtApp.hook('app:error', (err) => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log('app:error')

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
