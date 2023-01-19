import useScene from '~composables/useScene'
import useCamera from '~composables/useCamera'
import useCanvas from '~composables/useCanvas'
import useRenderer from '~composables/useRenderer'

export const useCore = () => {
//   const sceneE = useScene()
  const camera = useCamera()
  const renderer = useRenderer()
  const lights = useLight()
  //   debugger
  return {
    scene,
    camera,
    lights: {
      ambient: lights.createAmbientLight(0xFFFFFF, 0.5),
      spot: lights.createSpotlight(0xFFFFFF, 5, 100, Math.PI / 6, 1, 2),
    },
    renderer,
  }
}
