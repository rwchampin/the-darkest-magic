/* eslint-disable no-undef */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {
  Draggable,
  InertiaPlugin,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
  gsap,
} from 'gsap/all'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { storeToRefs } from 'pinia'

import Stats from 'stats.js'
import { useAppStore } from '~/store/useAppStore'

export default defineNuxtPlugin(() => {
  const registerPlugins = () => {
    gsap.registerPlugin(
      ScrollSmoother,
      ScrollTrigger,
      Draggable,
      InertiaPlugin,
      SplitText,
    )

    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      smoothTouch: 0.1,
      normalizeScroll: true,
    })

    const stats = new Stats()
    stats.setMode(0) // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.bottom = '0px'
    stats.domElement.style.width = '200'

    document.body.appendChild(stats.domElement)
  }

  const store = useAppStore()
  const appStore = storeToRefs(store)

  return {
    provide: {
      registerPlugins,
      plugins: {
        gsap,
        ScrollSmoother,
        ScrollTrigger,
        Draggable,
        InertiaPlugin,
        THREE,
        GLTFLoader,
        OrbitControls,
      },
      appStore,

    },
  }
})
