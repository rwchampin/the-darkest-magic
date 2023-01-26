import { Pane } from 'tweakpane'
import { onMounted, onUnmounted, ref } from 'vue'

const pane = null;
export const useTweakPane = () => {


  onMounted(() => {
    pane = new Pane()
  })

  const add = (name, options) => {


  onUnmounted(() => {
    pane.value.destroy()
  })

  return pane
}
