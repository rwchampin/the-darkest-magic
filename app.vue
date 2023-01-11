<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
useHead({
  title: 'RYAN THE DEVELOPER',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/public-assets/favicon.png',
    },
  ],
  script: [{ children: 'let scene, camera, renderer, SUPERGLOBAL = {core: { singletons: {}, gui: {} }}' }],
})

const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)

onMounted(() => {
  SUPERGLOBAL.core.singletons.canvasRefs = {
    canvas2d: canvas2d.value,
    canvas3d: canvas3d.value,
  }

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
    <LazyTheDebugger />
    <TheHeader />
    <div id="canvas-container">
      <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
      <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
    </div>
    <ClientOnly>
      <TheFloatingMenu />

      <TheSplash />
    </ClientOnly>
    <!-- <NuxtPage /> -->
  </NuxtLayout>
</template>

<style scoped>
#main-canvas-3d,
#canvas-container {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 100000000 !important;
  background: orange;
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
