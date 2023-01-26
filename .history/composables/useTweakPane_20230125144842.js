import { Pane } from 'tweakpane'
import { onMounted, onUnmounted, ref } from 'vue'

const pane = new Pane()
export const useTweakPane = () => {

  onMounted(() => {
   
  })

  const add = (name, options) => {


  onUnmounted(() => {
    pane.value.destroy()
  })

  return pane
}
