<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import gsap from 'gsap'
import chalk from 'chalk'

const nuxtApp = useNuxtApp()
// const {
//   debug
// } = nuxtApp.$appStore

// const { gsap } = nuxtApp.$plugins

const tl = gsap.timeline()

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
  <div class="scrollbar-track">
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

  width: 2px;
  height: 0;
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
