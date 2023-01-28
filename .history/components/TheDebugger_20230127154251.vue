<script setup>
import { useFps, useMemory } from '@vueuse/core'
import { Pane } from 'tweakpane'
import gsap from 'gsap'
import { GSDevTools } from 'gsap/GSDevTools.js'
import Stats from 'stats.js'
const props = defineProps({
  modules: {
    type: Object,
    required: true,
  },
})
const nuxtApp = useNuxtApp()
const size = (v) => {
  const kb = v / 1024 / 1024
  return `${kb.toFixed(2)} MB`
}

const { isSupported, memory } = useMemory()

const fps = useFps()

const draggable = ref(null)
onMounted(() => {
  alert('debugger mounted')
  // GSDevTools.create()
  // const pane = new Pane({
  //   container: document.getElementById('tweakpane-container'),
  //   title: 'DVLPR.',
  //   expanded: true,
  // })

  const stats = new Stats()
  stats.setMode(0)
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'

  stats.domElement.style.width = '200'
  document.body.appendChild(stats.domElement)

  gsap.ticker.add(() => {
    stats.update()
  })
  // const sceneFolder = pane.addFolder({
  //   title: 'Scene',
  //   expanded: true,
  // })
  // sceneFolder.addInput(SUPERGLOBAL.core.singletons.scene, 'background', {
  //   label: 'Background',
  // })
  // debugger
  // sceneFolder.addInput(SUPERGLOBAL.core.singletons.scene.fog, 'isFog', {
  //   label: 'Scene Fog',
  // })
  // sceneFolder.addInput(SUPERGLOBAL.core.singletons.scene.fog, 'color', {
  //   label: 'Color',
  // })
  // sceneFolder.addInput(SUPERGLOBAL.core.singletons.scene.fog, 'near', {
  //   label: 'Near',
  // })
  // sceneFolder.addInput(SUPERGLOBAL.core.singletons.scene.fog, 'far', {
  //   label: 'Far',
  // })
  // const cameraFolder = pane.addFolder({
  //   title: 'Camera',
  //   expanded: true,
  // })
  // cameraFolder.addInput(SUPERGLOBAL.core.singletons.camera, 'position', {
  //   label: 'Position',
  // })
  // cameraFolder.addInput(SUPERGLOBAL.core.singletons.camera, 'rotation', {
  //   label: 'Rotation',
  // })
  // cameraFolder.addInput(SUPERGLOBAL.core.singletons.camera, 'scale', {
  //   label: 'Scale',
  // })
  // const rendererFolder = pane.addFolder({
  //   title: 'Renderer',
  //   expanded: true,
  // })
  // const lightFolder = pane.addFolder({
  //   title: 'Lights',
  //   expanded: true,
  // })
  // const controlsFolder = pane.addFolder({
  //   title: 'Controls',
  //   expanded: true,
  // })

  // SUPERGLOBAL.core.gui = {
  //   scene: sceneFolder,
  //   camera: cameraFolder,
  //   renderer: rendererFolder,
  //   lights: lightFolder,
  //   controls: controlsFolder,
  // }
})
</script>

<template>
  <div id="tweakpane-container" />
  <!-- <div :style="boxStyles" class="fixed z-9999" border="1" /> -->
  <section v-if="isSupported && memory" ref="draggable" class="debugger draggable">
    <div class="debugger-content shadow-md hover:shadow-xl">
      <n-card class="flex flex-column">
        <div class="flex gap-5">
          <div class="title" />
          <n-space class="flex gap-5">
            <n-statistic label="FPS">
              <h1>{{ fps }}</h1>
            </n-statistic>
            <n-statistic label="Used">
              <h1>{{ size(memory.usedJSHeapSize) }}</h1>
            </n-statistic>
            <n-statistic label="Allocated">
              <h1>{{ size(memory.totalJSHeapSize) }}</h1>
            </n-statistic>
            <n-statistic label="Limit">
              <h1>{{ size(memory.jsHeapSizeLimit) }}</h1>
            </n-statistic>
          </n-space>
        </div>
      </n-card>
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
