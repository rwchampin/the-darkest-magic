import { Pane } from 'tweakpane'
import { onMounted, onUnmounted, ref } from 'vue'

const pane = new Pane()
let currFolder = null
export const useTweakPane = () => {
  onMounted(() => {
    document.body.appendChild(pane.el)
  })

  const folder = (name) => {
    currFolder = pane.addFolder({ title: name })
    return currFolder
  }

  const add = ({ folder, object, attr, min, max }) => {
    const r = folder.addInput(object, attr)
    if (min && max)
      return folder.addInput(object, attr, { min, max })

    return r
  }

  onUnmounted(() => {
    pane.value.destroy()
  })

  return { add, folder }
}
