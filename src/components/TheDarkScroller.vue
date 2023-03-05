<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
const nuxtApp = useNuxtApp()
const { gsap, ScrollSmoother, ScrollTrigger } = nuxtApp.$plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
const tl = gsap.timeline()
const setHeight = () => {
  gsap.set('.scrollbar-track', { alpha: 1, height: window.innerHeight * 0.9 })
}

useEventListener(window, 'scroll', (e) => {
  const max = document.body.offsetHeight - window.innerHeight
  if (max <= 0)
    return
  const current = window.pageYOffset || document.documentElement.scrollTop
  const value = current / max
  tl.to('.scrollbar', { height: `${value}%`, duration: 0 })
})

useEventListener(window, 'resize', (e) => {
  setHeight()
})

onMounted(() => {
  ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    smoothTouch: 0.1,
    normalizeScroll: true,
  })
  gsap.set('.scrollbar-track', { alpha: 0, height: 0 })
  gsap.to('.scrollbar-track', { alpha: 1, height: window.innerHeight * 0.9, duration: 0.5, ease: '.5,-.9,.1,1.5' })
})
</script>

<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <slot />
      <div class="scrollbar-track">
        <div class="scrollbar" />
      </div>
    </div>
  </div>
</template>

<style>
.scrollbar-track {
  position: fixed;
  z-index: 500;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: #eee;
  height: 0;
  width: 2px;
  bottom: 0;
  z-index: 99999;
}

.scrollbar {
  width: 2px;
  top: 0;
  position: fixed;
  z-index: 600;
  background: black;
}

::-webkit-scrollbar {
  display: none !important;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
