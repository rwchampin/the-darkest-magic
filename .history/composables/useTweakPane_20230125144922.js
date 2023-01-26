import { Pane } from 'tweakpane'
import { onMounted, onUnmounted, ref } from 'vue'

const pane = new Pane()
export const useTweakPane = () => {
  onMounted(() => {
    document.body.appendChild(pane.el)
  })

  const add = (name, options) => {
    return pane.addInput(options, name)
  }

  onUnmounted(() => {
    pane.value.destroy()
  })

  return pane
}
