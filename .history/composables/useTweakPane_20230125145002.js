import { Pane } from 'tweakpane'
import { onMounted, onUnmounted, ref } from 'vue'

const pane = new Pane()
export const useTweakPane = () => {
  onMounted(() => {
    document.body.appendChild(pane.el)
  })

  const folder = (name) => {
    return pane.addFolder({ title: name })
  }

  const add = (name, options) => {
    return pane.addInput(options, name)
  }

  onUnmounted(() => {
    pane.value.destroy()
  })

  return { add, folder }
}
