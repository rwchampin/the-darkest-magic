import { useScene } from './useScene'
import { useCamera } from './useCamera'
import { useRenderer } from './useRenderer'
import { useLight } from './useLight'
import { reactive } from 'vue'

type SceneElements = {
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    lights: {
        ambient: THREE.AmbientLight,
        spot: THREE.SpotLight,
    },
    renderer: THREE.WebGLRenderer,
    light: THREE.Light,
}
export const useSceneElements = ():SceneElements => {
    const scene = useScene()
    const camera = useCamera()
    const renderer = useRenderer()
    const lights = useLight()
    debugger;
    return {
        scene,
        camera,
        lights: {
            ambient: lights.createAmbientLight(0xffffff, 0.5),
            spot: lights.createSpotlight(0xffffff, 5, 100, Math.PI / 6, 1, 2),
        },
        renderer
    }

}