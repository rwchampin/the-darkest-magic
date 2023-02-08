import { createSharedComposable } from '@vueuse/core'
import { readonly, ref } from 'vue'


const useCanvasContext = () => {
  const init = () => {
    c2.value = document.getElementById('canvas2d')
    c3.value = document.getElementById('canvas3d')
  }

  if (!c2.value && !c3.value)
    init()

  return {

  }
}

