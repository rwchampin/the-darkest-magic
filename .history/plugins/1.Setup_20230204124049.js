/* eslint-disable no-undef */
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import gsap from 'gsap'
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/store/useAppStore'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollSmoother)
  const registerPlugins = () => {
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
      appStore,

    },
  }
})
