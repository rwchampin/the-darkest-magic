/* eslint-disable no-undef */
import { storeToRefs } from 'pinia'
import gsap, { ScrollSmoother, ScrollTrigger } from 'gsap/all'
gsap.registerPlugins(ScrollTrigger, ScrollSmoother);
import { useAppStore } from '~/store/useAppStore'

export default defineNuxtPlugin(() => {

  const store = useAppStore()
  const appStore = storeToRefs(store)
  const registerPlugins = () => {



    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      smoothTouch: 0.1,
      normalizeScroll: true,
    })
  }
  return {
    provide: {
      appStore,
registerPlugins
    },
  }
})
