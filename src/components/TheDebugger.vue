<script setup>

import { Utils } from '~/utils'
import { useCore } from '~~/composables/useCore'

const nuxtApp = useNuxtApp()
const { $appStore } = nuxtApp
const { gsap, Draggable, GSDevTools, OrbitControls, Stats } = nuxtApp.$plugins
const { getDebugMode, getOrbitControlsCreated } = $appStore
let scene, camera, renderer, getInfo
/*********************************
 * REGISTER GSAP PLUGINS
 *********************************/
gsap.registerPlugin(Draggable, GSDevTools)
const draggable = ref(null); let boxStyles
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

/*********************************
** ON MOUNTED
*********************************/

onMounted(() => {
  var stats = new Stats();
  stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  // window.messageApi.success('Debugger mounted Bitch')
  // GSDevTools.create({
  //   visibility: 'auto',
  //   paused: false,
  //   loop: false,
  // })

  /*********************************
  ** CORE
  *********************************/

  ({ scene, camera, renderer } = useCore())
  getInfo = (key) => {
    const r = renderer.info
    if (r.memory[key])
      return r.memory[key]
    else
      return r.render[key]
  }


  /*********************************
  ** ORBIT CONTROLS
  *********************************/
  if (!getOrbitControlsCreated) {
    $appStore.orbitControlsCreated.value = true
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.screenSpacePanning = false
    controls.minDistance = 1
    controls.maxDistance = 100
    controls.maxPolarAngle = Math.PI / 2
    controls.update()
  }

  initHoverOutlines()

  gsap.ticker.add(() => {
    stats.update()
  })
})
onUnmounted(() => {
  gsap.ticker.remove(stats.update)

  const t = document.getElementById('tweakpane-container')
  if (t)
    t.remove()
})
</script>

<template>
  <div id="tweakpane-container" />
  <div :style="boxStyles" class="fixed z-9999" border="1" />
  <section v-if="isSupported && memory" id="debugger" ref="draggable" class="debugger draggable">
    <div v-if="getDebugMode" class="debugger-content shadow-lg hover:shadow-xl">
      <NCard class="flex flex-column">
        <NSpace justify="space-between" class="flex gap-5">
          <NStatistic label="App Loaded">
            {{ store.getAppLoadingStatus }}
          </NStatistic>
          <NStatistic label="Assets Loaded">
            {{ store.getAssetLoadingStatus }}
          </NStatistic>
          <NStatistic label="FPS">
            {{ fps }}
          </NStatistic>
          <NStatistic label="Used">
            {{ Utils.math.kbToMB(memory.usedJSHeapSize) }}
          </NStatistic>
          <NStatistic label="Allocated">
            {{ Utils.math.kbToMB(memory.totalJSHeapSize) }}
          </NStatistic>
          <NStatistic label="Limit">
            {{ Utils.math.kbToMB(memory.jsHeapSizeLimit) }}
          </NStatistic>
          <NStatistic label="Geometries">
            {{ renderer.info.memory.geometries }}
          </NStatistic>
          <NStatistic label="Textures">
            {{ renderer.info.memory.textures }}
          </NStatistic>
          <NStatistic label="Calls">
            {{ renderer.info.render.calls }}

          </NStatistic>
          <NStatistic label="Frame">
            {{ renderer.info.render.frame }}

          </NStatistic>
          <NStatistic label="Triangles">
            {{ renderer.info.render.triangles }}
          </NStatistic>
          <NStatistic label="Points">
            {{ renderer.info.render.points }}
          </NStatistic>
          <NDivider vertical type="center" style="height: 100%;" />
          <NStatistic label="Camera Position">
            {{ camPos.x.value }}, {{ camPos.y.value }}, {{ camPos.z.value }}
          </NStatistic>
        </NSpace>
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

.n-card {
  border-radius: var(--radius-3);
  /* background-color: var(--gray-9); */
  border: none;
  padding: 0;
}

.n-statistic {
  flex: 1;
  border-radius: 12px;
  padding: 3px;
}

.n-statistic .n-statistic__label {
  color: var(--gray-5);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 4px;
}

.n-statistic .n-n-statistic-value__content {
  color: var(--gray-1);
  /* font-size: 16px; */
  font-weight: 500;
  line-height: 1.5;
}

/*
.dark .debugger .debugger-content {
  background-color: #222222;
}

.light .debugger .debugger-content {
  background-color: #f7f7f7;
} */

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

.stats,
.stats * {
  width: 300px !important;
  height: auto !important;
}

.draggable:active {
  cursor: grabbing;
}
</style>
