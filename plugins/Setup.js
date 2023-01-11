/* eslint-disable no-undef */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { SplitText } from 'gsap/SplitText'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { storeToRefs } from 'pinia'
import { useResources } from '~/composables/useResources'
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
      resources: useResources(),
    },
  }
})
