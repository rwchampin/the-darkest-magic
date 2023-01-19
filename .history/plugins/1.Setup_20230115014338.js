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
import Experience from './core/Experience'
import { useResources } from '~~/composables/useResources'
import { useAppStore } from '~/store/useAppStore'

export default defineNuxtPlugin(() => {
  const Experience = new Experience({
    targetElement: document.querySelector('#canvas3d'),
  })
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
