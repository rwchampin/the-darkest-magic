/* eslint-disable no-undef */
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/store/useAppStore'

export default defineNuxtPlugin(() => {

  const store = useAppStore()
  const appStore = storeToRefs(store)

  return {
    provide: {
      appStore,

    },
  }
})
