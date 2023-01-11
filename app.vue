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
  <div id="canvas-container">
    <canvas id="main-canvas-2d" ref="canvas2d" class="canvas-ui" />
    <canvas id="main-canvas-3d" ref="canvas3d" class="canvas-ui" />
  </div>
  <NuxtLayout>
    <LazyTheDarkScrollbar />
    <LazyTheDebugger />
    <TheHeader />
    <TheFloatingMenu />

    <TheSplash />

    <!-- <NuxtPage /> -->
  </NuxtLayout>
</template>

<style>
#canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  background-color: blueviolet;
}
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
