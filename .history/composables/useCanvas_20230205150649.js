import { createSharedComposable } from '@vueuse/core'
import { readonly, ref } from 'vue'


const useCanvasFN = () => {
  const init = () => {
    c2.value = document.getElementById('canvas2d')
    c3.value = document.getElementById('canvas3d')
  }

  if (!c2.value && !c3.value)
    init()

  return {
    canvas2d: readonly(c2),
    canvas3d: readonly(c3),
  }
}

export const useCanvas = createSharedComposable(useCanvasFN)
