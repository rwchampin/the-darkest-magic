import { Pane } from 'tweakpane'
import { onMounted, onUnmounted, ref } from 'vue'

const pane = new Pane()
const paneJson = {}
export const useTweakPane = () => {
  onMounted(() => {
    document.body.appendChild(pane.el)
  })

  const folder = (name) => {
    return pane.addFolder({ title: name })
  }

  const add = (object, attr, min, max) => {
    return pane.addInput(object, attr)
    if (min && max)
      return pane.addInput(object, attr, { min, max })
  }

  onUnmounted(() => {
    pane.value.destroy()
  })

  return { add, folder }
}
