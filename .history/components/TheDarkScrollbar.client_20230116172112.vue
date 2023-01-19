<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import gsap from 'gsap'
import chalk from 'chalk'

const track = ref(null)
const nuxtApp = useNuxtApp()
// const {
//   debug
// } = nuxtApp.$appStore

// const { gsap } = nuxtApp.$plugins
const tl = gsap.timeline()

onMounted(() => {
  gsap.set(track.value, { alpha: 0, height: 0 })
  tl.to('.scrollbar-track', { alpha: 1, height: window.innerHeight * 0.9, duration: 0.5, ease: '.5,-.9,.1,1.5' })
})

useEventListener(document, 'scroll', (e) => {
  console.log('scrolling')
  const max = document.body.offsetHeight - window.innerHeight
  const current = window.pageYOffset || document.documentElement.scrollTop
  const value = current / max * 100
  // if (debug.value)
  //   console.log(chalk.bgBlack.green(`SCROLLBAR POSITION:: ${value}`));

  tl.to('.scrollbar', { height: `${value}%`, ease: '.5,-.9,.1,1.5' })
})
</script>

<template>
  <div ref="track" class="scrollbar-track">
    <div class="scrollbar" />
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
/* opacity: 0; */
  width: 2px;
  bottom: 0;
}

.scrollbar {
  width: 2px;
  right: 20px;
  top: 0;
  position: fixed;
  z-index: 600;
  background: var(--gradient-14);
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none !important;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
