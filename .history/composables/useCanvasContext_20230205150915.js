import { createSharedComposable } from '@vueuse/core'
import { readonly, ref } from 'vue'

let canvas2d = ref(null);
const useCanvasContext = () => {
  if (canvas2d.value) {
    return canvas2d;
  }
  canvas2d = document.querySelector('main-canvas-2d')


  if (!c2.value && !c3.value)
    init()

  return {

  }
}

