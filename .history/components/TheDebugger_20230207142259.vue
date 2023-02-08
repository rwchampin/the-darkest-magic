<script setup>
import { useFps, useMemory } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable';
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
onMounted(() => {
  window.messageApi.success('Debugger mounted Bitch')
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
  const { memory, render, programs } = renderer.info
  const info = {
    geometries: memory.geometries,
    textures: memory.textures,
    calls: render.calls,
    triangles: render.triangles,
    points: render.points,
    lines: render.lines,
    frame: render.frame,
    programs
  }
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
})
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
    <div class="debugger-content shadow-md hover:shadow-xl">
      <NCard class="flex flex-column">
        <div class="flex gap-5">
          <NSpace class="flex gap-5">
            <NStatistic label="App Loaded">
              <h1>{{ store.getAppLoadingStatus }}</h1>
            </NStatistic>
            <NStatistic label="Assets Loaded">
              <h1>{{ store.getAssetLoadingStatus }}</h1>
            </NStatistic>
            <NStatistic label="FPS">
              <h1>{{ fps }}</h1>
            </NStatistic>
            <NStatistic label="Used">
              <h1>{{ Utils.math.kbToMB(memory.usedJSHeapSize) }}</h1>
            </NStatistic>
            <NStatistic label="Allocated">
              <h1>{{ Utils.math.kbToMB(memory.totalJSHeapSize) }}</h1>
            </NStatistic>
            <NStatistic label="Limit">
              <h1>{{ Utils.math.kbToMB(memory.jsHeapSizeLimit) }}</h1>
            </NStatistic>
            <NStatistic label="Geometries">
              <h1>{{ info.geometries }}</h1>
            </NStatistic>
            <NStatistic label="Textures">
              <h1>{{ info.textures }}</h1>
            </NStatistic>
            <NStatistic label="Calls">
              <h1>{{ info.render.calls }}</h1>
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
  color: #b0b0b0;
  font-weight: 100 !important;

}

.debugger {
  background-color: transparent;
  position: fixed;
  bottom: 200px;
  left: 0;
  right: 0;
  z-index: 99999999999999999;
  opacity: 0;
  animation: ver(--animation-fade-in) .3s var(--ease-in-out-quad);
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
