import { createSharedComposable } from '@vueuse/core'
import { readonly, ref } from 'vue'


const useCanvasContext = () => {

  c2.value = document.querySelector('main-canvas-2d')


  if (!c2.value && !c3.value)
    init()

  return {

  }
}

