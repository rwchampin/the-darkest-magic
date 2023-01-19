<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import Experience from './core/Experience'
alert('appmounted')
const nuxtApp = useNuxtApp()
const canvas2d = ref(null)
const canvas3d = ref(null)
// const mode = nuxtApp.$colorMode.preference
function createCoreSingletons(nuxtApp) {
  const { canvas2d, canvas3d, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight } = useCore(nuxtApp)
  const { planet, stars } = useBlackEnergy(nuxtApp)

  scene.add(planet, stars)

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
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

  SUPERGLOBAL.core.canvas = {
    canvas2d,
    canvas3d,
  }
  // SUPERGLOBAL.gui = {}
  // SUPERGLOBAL.gui.instance = new Panel()
  // SUPERGLOBAL.gui.sceneFolder = gui.addFolder('Scene')
  // SUPERGLOBAL.gui.cameraFolder = gui.addFolder('Camera')
  // SUPERGLOBAL.gui.lightsFolder = gui.addFolder('Lights')
  // SUPERGLOBAL.gui.rendererFolder = gui.addFolder('Renderer')
  // SUPERGLOBAL.gui.controlsFolder = gui.addFolder('Controls')
  // SUPERGLOBAL.gui.canvasFolder = gui.addFolder('Canvas')

  // trigger('core:singletons:complete')
}
useHead({
  title: 'RYAN THE DEVELOPER',
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/favicon.ico',
    },
  ],
  script: [{ children: ' SUPERGLOBAL = {core: {}, gui:{}}' }],
})

nuxtApp.vueApp.use(Naive)

const draggable = ref(null)
const { getDebugMode } = nuxtApp.$appStore

onMounted(() => {
  debugger
  const c3 = document.querySelector('.main-canvas-3d')
  const c2 = document.querySelector('.main-canvas-2d')
  debugger
  const experience = new Experience({
    targetElement: c3,
    ctx: c2,

  })
  debugger
  // createCoreSingletons(nuxtApp)

  gsap.to('.canvas-ui', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  })
})
</script>

<template>
  <TheSplash
    v-if="nuxtApp.$appStore.getAppLoadingStatus && nuxtApp.$appStore.getAssetLoadingStatus"
  />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <NuxtLayout>
        <LazyTheDarkScrollbar />

        <LazyTheDebugger v-if="getDebugMode" />
        <Teleport to="body">
          <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
          <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
        </Teleport>

        <ClientOnly>
          <TitleInset title="test" />

          <TheFloatingMenu />
          <TheSplash />
        </ClientOnly>
        <!-- <NuxtPage /> -->
      </NuxtLayout>
    </div>
  </div>
</template>

<style scoped>
.main-canvas-3d,
#canvas-container {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 99 !important;
  background-color: transparent !important;
}

html,
body,
#__nuxt {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
