/* eslint-disable no-undef */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {

  InertiaPlugin,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
  gsap,
} from 'gsap/all'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/store/useAppStore'

n

export default defineNuxtPlugin(() => {
  const registerPlugins = () => {
    gsap.registerPlugin(
      ScrollSmoother,
      ScrollTrigger,

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
        InertiaPlugin,
        THREE,
        GLTFLoader,
        OrbitControls,
      },
      appStore,

    },
  }
})
