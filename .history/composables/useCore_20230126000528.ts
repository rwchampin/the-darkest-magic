import { useDevicePixelRatio, useWindowSize } from '@vueuse/core'
import { useScene } from '~composables/useScene'
import { useCamera } from '~composables/useCamera'
import useCanvas from '~composables/useCanvas'
import { s } from '~composables/useRenderer'
import useLights from '~composables/useLights'

const ratio = useDevicePixelRatio()
const { width, height } = useWindowSize()

const useCoreFN = (nuxtApp: any) => {
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
  const { canvas2d, canvas3d } = useCanvas()
  const renderer = useRenderer(nuxtApp, {
    name: `CoreRenderer:${Date.now()}`,
    canvas3d,
    antialias: false,
    alpha: false,
    width,
    height,
    ratio,
  })

  const lights = useLights()

  return {
    scene,
    camera,
    canvas2d,
    canvas3d,
    renderer,
    pointLight: lights.pointLight,
    ambientLight: lights.ambientLight,
    hemisphereLight: lights.hemisphereLight,
    directionalLight: lights.directionalLight,
    rectAreaLight: lights.rectAreaLight,
    spotLight: lights.spotLight,
  }
}

const useCore = createSharedComposable(useCoreFN)

export default useCore
