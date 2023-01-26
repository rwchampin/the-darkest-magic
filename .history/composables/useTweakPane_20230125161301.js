import { Pane } from 'tweakpane'
import { onMounted, onUnmounted, ref } from 'vue'
const nuxtApp = useNuxtApp()
const pane = new Pane()
let currFolder = null
export const useTweakPane = () => {
  onMounted(() => {
if(!nuxtApp.$appStore.debug) {
    return throw createError({
        statusCode: 500,
        message: 'Debug mode is not enabled'
    })
}   
 document.body.appendChild(pane.el)
  })
VA-TNS-12816_DGTL week 1/8 - 1/14

VA-SK-8859_LMS_DGTL - SK Life 2021 Live 2022 STM - 1/15 - 1/21

holay 1/16

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
