/* eslint-disable no-undef */
import { storeToRefs } from 'pinia'
imort 
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

    },
  }
})