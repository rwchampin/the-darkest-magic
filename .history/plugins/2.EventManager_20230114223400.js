/* eslint-disable no-console */
/* eslint-disable no-undef */
import * as THREE from 'three'
import { useDevicePixelRatio, useEventListener, useWindowSize } from '@vueuse/core'
import useScene from '~composables/useScene'
import useCamera from '~composables/useCamera'
import useCanvas from '~composables/useCanvas'
import useRenderer from '~composables/useRenderer'
// import vertex from '~shaders/blackGooBall/vertex.glsl'
// import fragment from '~shaders/blackGooBall/fragment.glsl'
import { useBlackEnergy } from '~composables/useBlackEnergy'
import { useEventEmitter } from '~composables/useEventEmitter'

const { on, trigger } = useEventEmitter()
const ratio = useDevicePixelRatio()
const { width, height } = useWindowSize()
on('core:singletons:complete', () => {
  // if (nuxtApp.$appStore.getDebugMode)
  console.log('core:singletons:complete')
})

export default defineNuxtPlugin((nuxtApp) => {
  // const { buildUI } = useUIManager(nuxtApp);
  // Doing something with nuxtApp

  function createCoreSingletons(nuxtApp) {
    const scene = useScene(nuxtApp, {
      name: `CoreScene:${Date.now()}`,
    })
    const camera = useCamera(nuxtApp, {
      name: `CoreCamera:${Date.now()}`,
      width,
      height,
      fov: 45,
      near: 0.1,
      far: 1000,
    })
    const { canvas2d, canvas3d } = useCanvas(nuxtApp, {
      name: `CoreCanvas:${Date.now()}`,
      width,
      height,
    })
    const renderer = useRenderer(nuxtApp, {
      name: `CoreRenderer:${Date.now()}`,
      canvas3d,
      antialias: false,
      alpha: false,
      width,
      height,
      ratio,
    })

    const geometry = new THREE.SphereGeometry(15, 32, 16)
    const material = new THREE.MeshPhongMaterial({
      color: 0x00FF00,
      shininess: 100,
      specular: 0x111111,

    })
    // const material = new THREE.ShaderMaterial({
    //   vertexShader: vertex,
    //   fragmentShader: fragment,
    //   uniforms: {
    //     u_time: { type: 'f', value: 0 },
    //     u_resolution: { type: 'v2', value: new THREE.Vector2() },
    //   },
    // })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.05)
    ambientLight.name = `CoreAmbientLight: ${time}`
    const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100)
    pointLight.castShadow = true

    pointLight.name = `CorePointLight: ${time}`
    pointLight.position.set(0, 10, 10)
    pointLight.castShadow = true
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1)

    // const pointLight2 = new THREE.PointLight(0xFF0000, 1, 100)
    // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.1)
    // const pointLight2 = Utils.three.createLight({ color: 0xFF0000, intensity: 100 })
    // pointLight2.name = `CorePointLight2: ${time}`
    // pointLight2.position.set(20, 10, 10)
    // pointLight2.castShadow = true
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.name = `Corecontrols: ${time}`
    controls.enableDamping = true
    controls.update()

    const { planet, starLights, stars } = useBlackEnergy()
    scene.add(planet, starLights, stars, ambientLight, pointLight, pointLight2, camera, pointLightHelper, pointLightHelper2)
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
