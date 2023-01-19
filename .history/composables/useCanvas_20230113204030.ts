import { createSharedComposable } from '@vueuse/core'
import { readonly, ref } from 'vue'

type CanvasType = '2d' | '3d' | any

const c2: CanvasType = ref()
const c3: CanvasType = ref()

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

const useCanvas = createSharedComposable(useCanvasFN)

export { useCanvas }
