import { Pane } from 'tweakpane'
import { onMounted, onUnmounted, ref } from 'vue'

export const useTweakPane = () => {
  const pane = ref(null)

  onMounted(() => {
    pane.value = new Pane()
  })

  onUnmounted(() => {
    pane.value.destroy()
  })

  return pane
}
