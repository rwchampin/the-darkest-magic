import type { AmbientLight, ColorRepresentation, DirectionalLight, HemisphereLight, PointLight, RectAreaLight, SpotLight } from 'three'
import * as THREE from 'three'
import { createSharedComposable } from '@vueuse/core'

let ambientLight: AmbientLight,
  spotLight: SpotLight,
  hemisphereLight: HemisphereLight,
  directionalLight: DirectionalLight,
  pointLight: PointLight,
  rectAreaLight: RectAreaLight

const useLightsFN = () => {
  const createSpotlight = (color: number, intensity: number, distance: number, angle: number, penumbra: number, decay: number) => {
    spotLight = new THREE.SpotLight(0xFFFFFF, 50)
    spotLight.shadow.camera.fov = 30

    spotLight.angle = Math.PI / 6
    spotLight.penumbra = 1
    spotLight.decay = 2
    spotLight.distance = 1000
    // spotLight.map = textures[ 'disturb.jpg' ];

    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.camera.near = 10
    spotLight.shadow.camera.far = 200
    spotLight.shadow.focus = 1
    return spotLight
  }

  const createAmbientLight = (color: ColorRepresentation | undefined, intensity: number) => {
    ambientLight = new THREE.AmbientLight(color, intensity)
    return ambientLight
  }

  const createDirectionalLight = (color: ColorRepresentation | undefined, intensity: number) => {
    directionalLight = new THREE.DirectionalLight(color, intensity)
    return directionalLight
  }

  const createHemisphereLight = (color: ColorRepresentation | undefined, groundColor: ColorRepresentation | undefined, intensity: number) => {
    hemisphereLight = new THREE.HemisphereLight(color, groundColor, intensity)
    return hemisphereLight
  }

  const createPointLight = (color: ColorRepresentation, intensity: number, distance: number, decay: number) => {
    pointLight = new THREE.PointLight(color, intensity, distance, decay)
    return pointLight
  }

  const createRectAreaLight = (color: ColorRepresentation | undefined, intensity: number, width: number, height: number) => {
    rectAreaLight = new THREE.RectAreaLight(color, intensity, width, height)
    return rectAreaLight
  }

  const init = () => {
    ambientLight = createAmbientLight(0xFFFFFF, 0.5)
    spotLight = createSpotlight(0xFFFFFF, 5, 100, Math.PI / 6, 1, 2)
    pointLight = createPointLight(0xFFFFFF, 5, 100, 2)
    directionalLight = createDirectionalLight(0xFFFFFF, 5)
    hemisphereLight = createHemisphereLight(0xFFFFFF, 0xFFFFFF, 5)
    rectAreaLight = createRectAreaLight(0xFFFFFF, 5, 10, 10, 10)
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

export const useLights = createSharedComposable(useLightsFN)
