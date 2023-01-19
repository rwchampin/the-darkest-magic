<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'

const nuxtApp = useNuxtApp()
const canvas2d = ref(null)
const canvas3d = ref(null)
// const mode = nuxtApp.$colorMode.preference
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
  createCoreSingletons(nuxtApp)

  gsap.to('.canvas-ui', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  })
})
</script>

<template>
  <NuxtLayout>
    <LazyTheDarkScrollbar />
    <LazyTheDebugger v-if="getDebugMode" />
    <Teleport to="body">
      <div id="canvas-container">
        <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
        <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
      </div>
    </Teleport>

    <ClientOnly>
      <TheFloatingMenu />
      <TheSplash />
    </ClientOnly>
    <!-- <NuxtPage /> -->
  </NuxtLayout>
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

html, body , #__nuxt{
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
