<script setup>
import { useFps, useMemory } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable.js';
import * as THREE from 'three'
import { GSDevTools } from 'gsap/GSDevTools.js'
import Stats from 'stats.js'
import { watch } from 'vue'
import { useAppStore } from '~/store/useAppStore'
import { Utils } from '~/utils'
import { useCore } from '~~/composables/useCore'

/*********************************
 * REGISTER GSAP PLUGINS
 *********************************/
gsap.registerPlugin(Draggable, GSDevTools)
const draggable = ref(null)
let scene; let camera; let renderer; let boxStyles; const debugMode = ref(null)


const store = useAppStore()
const { isSupported, memory } = useMemory()
const fps = useFps()


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

// watch(store.getDebugMode, (debugMode) => {
//   alert(debugMode)
//   if (debugMode) {
//     Utils.tweakpane.addScene(scene)
//     Utils.tweakpane.addCamera(camera)
//     const axesHelper = new THREE.AxesHelper(5)
//     scene.add(axesHelper)
//   }
// })
/*********************************
** ON MOUNTED
*********************************/
// onMounted(() => {
// window.messageApi.success('Debugger mounted Bitch')
// GSDevTools.create({
//   visibility: 'auto',
//   paused: true,
//   loop: true,
// })
/*********************************
** CORE
*********************************/
const core = useCore()
camera = core.camera
renderer = core.renderer
scene = core.scene

const info = ref({
  geometries: renderer.info.memory.geometries,
  textures: renderer.info.memory.textures,
  calls: renderer.info.render.calls,
  triangles: renderer.info.render.triangles,
  points: renderer.info.render.points,
  lines: renderer.info.render.lines,
  frame: renderer.info.render.frame,
  programs: renderer.info.programs.length
})

/*********************************
** ORBIT CONTROLS
*********************************/
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 1
controls.maxDistance = 100
controls.maxPolarAngle = Math.PI / 2
controls.update()

// initTweakpane()


initHoverOutlines()
// })
onUnmounted(() => {
  // gsap.ticker.remove(stats.update)

  const t = document.getElementById('tweakpane-container')
  if (t)
    t.remove()
})
</script>

<template>
  <div id="tweakpane-container" />
  <div :style="boxStyles" class="fixed z-9999" border="1" />
  <section v-if="isSupported && memory" id="debugger" ref="draggable" class="debugger draggable">
    <div v-if="store.getDebugMode" class="debugger-content shadow-lg hover:shadow-xl">
      <NCard class="flex flex-column">
        <div class="flex gap-5">
          <NSpace class="flex gap-5">
            <NStatistic label="">
              <h1>App Loaded</h1>
              <h1>{{ store.getAppLoadingStatus }}</h1>
            </NStatistic>
            <NStatistic label="">
              <h1>Assets Loaded</h1>
              <h1>{{ store.getAssetLoadingStatus }}</h1>
            </NStatistic>
            <NStatistic label="">
              <h1>FPS</h1>
              <h1>{{ fps }}</h1>
            </NStatistic>
            <NStatistic label="">
              <h1>Used</h1>
              <h1>{{ Utils.math.kbToMB(memory.usedJSHeapSize) }}</h1>
            </NStatistic>
            <NStatistic label="">
              <h1>Allocated</h1>
              <h1>{{ Utils.math.kbToMB(memory.totalJSHeapSize) }}</h1>
            </NStatistic>
            <NStatistic label="">
              <h1>Limit</h1>
              <h1>{{ Utils.math.kbToMB(memory.jsHeapSizeLimit) }}</h1>
            </NStatistic>
            <NStatistic label="">
              <h1>Geometries</h1>
              <h1>{{ info.geometries }}</h1>
            </NStatistic>
            <NStatistic label="Textures">
              <h1>{{ info.textures }}</h1>
            </NStatistic>
            <NStatistic label="Calls">
              <h1>{{ info.calls }}</h1>
            </NStatistic>
            <NStatistic label="Frame">
              <h1>{{ info.frame }}</h1>
            </NStatistic>
          </NSpace>
        </div>
      </NCard>
    </div>
</section>
</template>

<style scoped>
#tweakpane-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999999999;
}

.n-statistic {
  flex: 1;
  border-radius: 12px;
  padding: 10px;
  background: darkgrey;
}

.n-statistic .n-statistic__label,
.n-statistic .n-statistic-value h1 {
  font-weight: bold;
}

.n-statistic .n-statistic__label {
  font-size: 10.5rem !important;
  color: lightgrey !important;
}

.n-statistic .n-statistic-value h1 {
  color: #000;
  font-size: 1.1rem;
}




.dark .debugger .debugger-content {
  background-color: #222222;
}

.light .debugger .debugger-content {
  background-color: #f7f7f7;
}

.debugger {
  background-color: transparent;
  position: fixed;
  bottom: 200px;
  left: 0;
  right: 0;
  z-index: 99999999999999999;
  opacity: 1;
}

.debugger-content {
  border-radius: 16px;
  width: 80vw !important;
  margin: 0 auto;
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
