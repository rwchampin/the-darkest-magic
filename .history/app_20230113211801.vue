<script setup>
import Naive from 'naive-ui'

const nuxtApp = useNuxtApp()

// const mode = nuxtApp.$colorMode.preference

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
  SUPERGLOBAL.core.refs = {
    ...SUPERGLOBAL.core.refs,
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
    <LazyTheDebugger v-if="getDebugMode" />
    <Teleport to="body">
      <div id="canvas-container">
        <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
        <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
      </div>
    </Teleport>

    <ClientOnly>
      <TheFloatingMenu />
      <TheLogo />
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
