import type { AmbientLight, ColorRepresentation, DirectionalLight, HemisphereLight, PointLight, RectAreaLight, SpotLight } from 'three'
imort * as THREE from 'three'

let ambientLight: AmbientLight, spotLight: SpotLight, lightHelper, hemisphereLight: HemisphereLight, directionalLight: DirectionalLight, pointLight: PointLight, rectAreaLight: RectAreaLight, light
const useLights = () => {
  const createSpotlight = (color: number, intensity: number, distance: number, angle: number, penumbra: number, decay: number) => {
    spotLight = new THREE.SpotLight(0xFFFFFF, 5)
    spotLight.shadow.camera.fov = 30

    spotLight.angle = Math.PI / 6
    spotLight.penumbra = 1
    spotLight.decay = 2
    spotLight.distance = 100
    // spotLight.map = textures[ 'disturb.jpg' ];

    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.camera.near = 10
    spotLight.shadow.camera.far = 200
    spotLight.shadow.focus = 1
    return spotLight
  }

  const createAmbientLight = (color: ColorRepresentation | undefined, intensity: number | undefined) => {
    ambientLight = new THREE.AmbientLight(color, intensity)
    return ambientLight
  }

  const createDirectionalLight = (color: ColorRepresentation | undefined, intensity: number | undefined) => {
    directionalLight = new THREE.DirectionalLight(color, intensity)
    return directionalLight
  }

  const createHemisphereLight = (color: ColorRepresentation | undefined, groundColor: ColorRepresentation | undefined, intensity: number | undefined) => {
    hemisphereLight = new THREE.HemisphereLight(color, groundColor, intensity)
    return hemisphereLight
  }

  const createPointLight = (color: ColorRepresentation | undefined, intensity: number | undefined, distance: number | undefined, decay: number | undefined) => {
    pointLight = new THREE.PointLight(color, intensity, distance, decay)
    return pointLight
  }

  const createRectAreaLight = (color: ColorRepresentation | undefined, intensity: number | undefined, width: number | undefined, height: number | undefined) => {
    rectAreaLight = new THREE.RectAreaLight(color, intensity, width, height)
    return rectAreaLight
  }

  const init = () => {
    ambientLight = createAmbientLight(0xFFFFFF, 0.5)
    spotLight = createSpotlight(0xFFFFFF, 5, 100, Math.PI / 6, 1, 2)
    pointLight = createPointLight(0xFFFFFF, 5, 100, 2)
    directionalLight = createDirectionalLight(0xFFFFFF, 5)
    hemisphereLight = createHemisphereLight(0xFFFFFF, 0xFFFFFF, 5)
    rectAreaLight = createRectAreaLight(0xFFFFFF, 5, 10, 10)
  }
  init()

  return {
    ambientLight,
    spotLight,
    pointLight,
    directionalLight,
    hemisphereLight,
    rectAreaLight,
  }
}
