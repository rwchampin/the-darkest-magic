import * as THREE from 'three'
import chroma from 'chroma-js'
import { storeToRefs } from 'pinia'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { GSDevTools } from 'gsap/GSDevTools'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Stats from 'stats.js'
import { useAppStore } from '~~/src/store/useAppStore'

export default defineNuxtPlugin(() => {
  const store = useAppStore()
  const appStore = storeToRefs(store)


  const registerPlugins = () => {
    // gsap.registerPlugin(ScrollTrigger, ScrollSmoother, InertiaPlugin, Draggable)
  }
  return {
    provide: {
      appStore,
      registerPlugins,
      plugins: {
        Stats,
        gsap,
        chroma,
        THREE,
        Draggable,
        GSDevTools,
        InertiaPlugin,
        ScrollSmoother,
        ScrollTrigger,
        OrbitControls,
      },
    },
  }
})
