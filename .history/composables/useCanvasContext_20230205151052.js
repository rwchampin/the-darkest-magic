import { createSharedComposable } from '@vueuse/core'
import { readonly, ref } from 'vue'

let canvas2d = ref(null);
let ctx = ref(null);

export const useCanvasContext = () => {
  if (canvas2d.value && ctx.value) {
    return {
      canvas2d: readonly(canvas2d),
      ctx: readonly(ctx),
    }
  }

  canvas2d = document.querySelector('main-canvas-2d')
  ctx = canvas2d.getContext('2d')

  return {
    canvas2d: readonly(canvas2d),
    ctx: readonly(ctx),
  }
}

