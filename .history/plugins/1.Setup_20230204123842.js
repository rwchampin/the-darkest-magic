/* eslint-disable no-undef */
import gsap, { ScrollSmoother } from 'gsap/all'
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/store/useAppStore'

export default defineNuxtPlugin(() => {
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
