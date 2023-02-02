<script setup>
import { useFps, useMemory } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import gsap from 'gsap'
import * as THREE from 'three'
import { GSDevTools } from 'gsap/GSDevTools.js'
import Stats from 'stats.js'
import { useCore } from '~~/composables/useCore'
let scene, camera, renderer
const draggable = ref(null)
// const props = defineProps({
//   debug: {
//     type: String,

//   },
// })
// const rendererInfo = JSON.parse(props.debug)

// gsap.registerPlugin(GSDevTools)
const nuxtApp = useNuxtApp()
let boxStyles
const { isSupported, memory } = useMemory()
const fps = useFps()

const initStats = () => {
  const stats = new Stats()
  stats.setMode(0)
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'
  stats.domElement.style.width = '300'
  document.body.appendChild(stats.domElement)
  // gsap.ticker.add(stats.update)
}
const initHoverOutlines = () => {
  const { x, y } = usePointer({ type: 'client' })
  const { element } = useElementByPoint({ x, y })
  const bounding = reactive(useElementBounding(element))
  useEventListener(window, 'scroll', bounding.update, true)
  boxStyles = computed(() => {
    if (element.value) {
      return {
        display: 'block',
        width: `${bounding.width}px`,
        height: `${bounding.height}px`,
        left: `${bounding.left}px`,
        top: `${bounding.top}px`,
        border: '2px dashed #0A7CFA',
        transition: 'all 0.05s linear',
      }
    }
    return {
      display: 'none',
    }
  })
}
onMounted(() => {
  // GSDevTools.create({
  //   visibility: 'auto',
  //   paused: true,
  //   loop: true,
  // })
  const { createCore } = useCore()
  const core = createCore()
  scene = core.scene
  camera = core.camera
  renderer = core.renderer
  const controls = new OrbitControls(camera, renderer.domElement)

  // initStats()
  // initHoverOutlines()
})
onUnmounted(() => {
  // gsap.ticker.remove(stats.update)
})
</script>

<template>
  <div v-if="nuxtApp.$appStore.debugMode" id="tweakpane-container" />
  <div :style="boxStyles" class="fixed z-9999" border="1" />
  <section v-if="nuxtApp.$appStore.debugMode && isSupported && memory" id="debugger" ref="draggable" class="debugger draggable">
    <div class="debugger-content shadow-md hover:shadow-xl">
      <!-- <n-card class="flex flex-column"> -->
      <div class="flex gap-5">
        <div class="title" />
        <!-- <n-space class="flex gap-5">
            <n-statistic label="FPS"> -->
        <h1>{{ fps }}</h1>
        <!-- </n-statistic>
            <n-statistic label="Used"> -->
        <h1>{{ size(memory.usedJSHeapSize) }}</h1>
        <!-- </n-statistic>
            <n-statistic label="Allocated"> -->
        <h1>{{ size(memory.totalJSHeapSize) }}</h1>
        <!-- </n-statistic>
            <n-statistic label="Limit"> -->
        <h1>{{ size(memory.jsHeapSizeLimit) }}</h1>
        <!-- </n-statistic>
            <n-statistic label="Limit"> -->
        <h1>{{ rendererInfo }}</h1>
        <!-- </n-statistic>
          </n-space> -->
      </div>
      <!-- </n-card> -->
    </div>
  </section>
</template>

<style>
#tweakpane-container {
  position: fixed;
  top: 20px;

  right: 20px;
  z-index: 99999999999;
}
.n-statistic {
  flex: 1;
  border-radius: var(--radius-3);
  padding: 10px;
  color: white;
  font-size: 10px;
  /* background-color: rgba(255, 255, 255, .1); */
}
.n-statistic .n-statistic__label {
  font-size: 14px;
  color: white;
  font-weight: bold;
}
 h1 {
  font-size: 12px;
  color:#b0b0b0;
font-weight: 100 !important;

}

.debugger {
  background-color: transparent;
  position: fixed;
  bottom: 200px;
  left: 0;
  right: 0;
  z-index: 99999999999999999;
}

.debugger-content {
  background-color: linear-gradient(90deg #222222, #3d3d3d) !important;
  border-radius: 16px;
  color: ghostwhite;
  width: 80vw !important;
  font-size: 10px;
  margin: 0 auto;
  border: 5px solid black;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, .8);
}

.title {
  display: block;
  flex: none;
  color: white;
  font-weight: 400;
  font-size: 1rem;
}

.draggable:active {
  cursor: grabbing;
}

.draggable.n-card>.n-card-header {
  padding: 0px !important
}

.n-card {
  border-radius: var(--radius-3);

  background-color: var(--gray-9);
  border-color: black;
}
</style>
