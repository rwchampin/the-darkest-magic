/* eslint-disable no-undef */
/* eslint-disable no-console */
// /* eslint-disable no-console */
// /* eslint-disable no-undef */
import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { useEventListener } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import chalk from 'chalk'
import { EventEmitter } from '~/utils/EventEmitter'

const em = new EventEmitter()

export default defineNuxtPlugin((nuxtApp) => {
  // const { buildUI } = useUIManager(nuxtApp);
  // Doing something with nuxtApp
  em.on('app:loading:complete', () => {
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.green.bgBlack('app:loading:complete'))
  })
  em.on('asset:loading:complete', () => {
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.green.bgBlack('asset:loading:complete'))
  })
  em.on('asset:progress', () => {
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.green.bgBlack('asset:progress'))
  })
  em.on('core:singletons:complete', () => {
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.green.bgBlack('core:singletons:complete'))
  })

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
    scene.background = new THREE.Color(0xF0F0F0)
    scene.fog = new THREE.Fog(0xFFFFFF, 50, 500)
    const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500)
    const orthographicCamera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      10,
      150,
    )
    perspectiveCamera.position.set(0, 0, 1000)
    perspectiveCamera.lookAt(0, 0, 0)
    perspectiveCamera.name = `CoreCamera: ${time}`
    orthographicCamera.name = `CoreCamera: ${time}`
    const cameras = {
      perspective: perspectiveCamera,
      orthographic: orthographicCamera,
      activeCamera: perspectiveCamera,
    }
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // renderer.physicallyCorrectLights = true
    // renderer.gammaFactor = 2.2
    // renderer.gammaOutput = true
    // renderer.outputEncoding = THREE.sRGBEncoding
    renderer.name = `CoreRenderer: ${time}`
    renderer.setSize(window.innerWidth, window.innerHeight)

    const ambientLight = new THREE.AmbientLight(0xFF0000, 10.5)
    ambientLight.name = `CoreAmbientLight: ${time}`
    const pointLight = new THREE.PointLight(0xFFFFFF, 20)
    pointLight.name = `CorePointLight: ${time}`
    pointLight.position.set(0, 0, 0)
    pointLight.castShadow = true

    const pointLight2 = new THREE.PointLight(0xFF0000, 10)
    pointLight2.name = `CorePointLight2: ${time}`
    pointLight2.position.set(100, 100, 100)

    const orbitControls = new OrbitControls(cameras.activeCamera, renderer.domElement)
    orbitControls.name = `CoreOrbitControls: ${time}`
    orbitControls.enableDamping = true
    orbitControls.dampingFactor = 0.05
    orbitControls.enableZoom = true
    orbitControls.autoRotate = true
    orbitControls.autoRotateSpeed = 0.5
    orbitControls.maxPolarAngle = Math.PI / 2
    orbitControls.minDistance = 10
    orbitControls.maxDistance = 100
    orbitControls.update()

    const flyControls = new FlyControls(cameras.activeCamera, renderer.domElement)
    flyControls.name = `CoreFlyControls: ${time}`
    flyControls.movementSpeed = 10
    flyControls.rollSpeed = Math.PI / 24
    flyControls.dragToLook = true
    flyControls.update()

    const controls = {
      orbitControls,
      flyControls,
      activeControls: orbitControls,
    }

    scene.add(perspectiveCamera, ambientLight, pointLight, pointLight2)
    useEventListener('resize', () => {
      cameras.perspective.aspect = window.innerWidth / window.innerHeight
      cameras.perspective.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })
    const animate = () => {
      requestAnimationFrame(animate)
      controls.activeControls.update(0.01)

      renderer.render(scene, cameras.activeCamera)
    }

    animate()

    SUPERGLOBAL.core = {}
    SUPERGLOBAL.core.singletons = {}
    SUPERGLOBAL.core.singletons.scene = scene
    SUPERGLOBAL.core.singletons.cameras = cameras
    SUPERGLOBAL.core.singletons.renderer = renderer
    SUPERGLOBAL.core.singletons.lights = {
      ambientLight,
      pointLight,
      pointLight2,
    }
    SUPERGLOBAL.core.singletons.controls = controls
    SUPERGLOBAL.core.singletons.clock = clock

    em.trigger('core:singletons:complete')
  }
  nuxtApp.hook('app:created', () => {
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.green.bgBlack('app:created'))
  })
  nuxtApp.hook('app:error', (err) => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.black.bgRed('app:error'))

    throw createError({
      statusCode: 500,
      statusMessage: `Vue error during setup${err}`,
    })
  })
  nuxtApp.hook('app:error:cleared', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.blue.bgBlack('app:error:cleared'))
  })
  nuxtApp.hook('app:data:refresh', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.blue.bgBlack('app:data:refresh'))
  })
  nuxtApp.hook('vue:setup', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.blue.bgBlack('vue:setup'))
  })
  nuxtApp.hook('vue:setup:done', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.green.bgBlack('vue:setup:done'))
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
      console.log(chalk.green.bgBlack('vue:setup:error:cleared'))
  })
  nuxtApp.hook('vue:setup:done', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.getDebugMode)
    console.log(chalk.green.bgBlack('vue:setup:done'))
  })

  nuxtApp.hook('app:rendered', () => {
    /* your code goes here */

    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.green.bgBlack('app:rendered'))
  })
  nuxtApp.hook('app:redirected', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.blue.bgBlack('app:redirected'))
  })
  nuxtApp.hook('app:beforeMount', () => {
    /* your code goes here */
    nuxtApp.$appStore.appLoadingStatus.value = true
    // nuxtApp.$resources.init()

    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.blue.bgBlack('app:beforeMount'))
  })
  nuxtApp.hook('app:mounted', () => {
    /* your code goes here */

    createCoreSingletons(nuxtApp)
    nuxtApp.$registerPlugins()
    // buildUI();
    nuxtApp.$appStore.appLoadingStatus.value = false
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.green.bgBlack('app:mounted'))
  })
  nuxtApp.hook('app:suspense:resolve', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.green.bgBlack('app:suspense:resolve'))
  })
  nuxtApp.hook('link:prefetch', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.getDebugMode)
      console.log(chalk.blue.bgBlack('link:prefetch'))
  })
})
