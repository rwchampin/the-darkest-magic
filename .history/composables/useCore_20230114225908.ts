import { useDevicePixelRatio, useEventListener, useWindowSize } from '@vueuse/core'
import useScene from '~composables/useScene'
import useCamera from '~composables/useCamera'
import useCanvas from '~composables/useCanvas'
import useRenderer from '~composables/useRenderer'

const ratio = useDevicePixelRatio()
const { width, height } = useWindowSize()
const nuxtApp = useNuxtApp()

const useCoreFN = () => {
  const scene = useScene(nuxtApp, {
    name: `CoreScene:${Date.now()}`,
  })
  const camera = useCamera(nuxtApp, {
    name: `CoreCamera:${Date.now()}`,
    width,
    height,
    fov: 45,
    near: 0.1,
    far: 1000,
  })
  const { canvas2d, canvas3d } = useCanvas(nuxtApp, {
    name: `CoreCanvas:${Date.now()}`,
    width,
    height,
  })
  const renderer = useRenderer(nuxtApp, {
    name: `CoreRenderer:${Date.now()}`,
    canvas3d,
    antialias: false,
    alpha: false,
    width,
    height,
    ratio,
  })

  //   debugger
  return {
    scene,
    camera,
    canvas: {
      canvas2d,
      canvas3d,
    },
    renderer,

  }
}

const useCore = createSharedComposable(useCoreFN)

export default useCore
