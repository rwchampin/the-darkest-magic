import { createSharedComposable } from '@vueuse/core'
import { readonly, ref } from 'vue'


const useCanvasContext = () => {

  c2.value = document.getElementById('canvas2d')


  if (!c2.value && !c3.value)
    init()

  return {

  }
}

