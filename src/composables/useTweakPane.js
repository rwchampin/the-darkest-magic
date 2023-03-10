import { Pane } from 'tweakpane'

let pane = false

export const useTweakPane = ({ scene, camera, renderer, canvas, nuxtApp }) => {
  if (pane === false)
    return pane

  onMounted(() => {
    if (!nuxtApp.$appStore.debug) {
      throw createError({
        statusCode: 500,
        message: 'Debug mode is not enabled',
      })
      return
    }

    init()
  })

  const folder = (name) => {
    const f = pane.value.addFolder({ title: name })
    // folders.value.push(f)
    return f
  }

  const add = ({ folder, object, attr, min, max }) => {
    const r = folder.addInput(object, attr)
    if (min && max)
      return folder.addInput(object, attr, { min, max })

    return r
  }

  const init = () => {
    pane = new Pane()
    document.body.appendChild(pane.elem)
    const sceneFolder = folder('Scene')
    add({ folder: sceneFolder, object: scene, attr: 'background' })
    add({ folder: sceneFolder, object: scene, attr: 'fog', min: 0, max: 100 })
    add({ folder: sceneFolder, object: scene, attr: 'fogColor', min: 0, max: 100 })
    add({ folder: sceneFolder, object: scene, attr: 'fogNear', min: 0, max: 100 })
    add({ folder: sceneFolder, object: scene, attr: 'fogFar', min: 0, max: 100 })

    // const cameraFolder = folder('Camera')
    // add({ folder: cameraFolder, object: camera, attr: 'fov', min: 0, max: 100 })
    // add({ folder: cameraFolder, object: camera, attr: 'near', min: 0, max: 100 })
    // add({ folder: cameraFolder, object: camera, attr: 'far', min: 0, max: 100 })
    // add({ folder: cameraFolder, object: camera, attr: 'position' })
    // add({ folder: cameraFolder, object: camera, attr: 'rotation' })
    // add({ folder: cameraFolder, object: camera, attr: 'zoom', min: 0, max: 100 })
    // add({ folder: cameraFolder, object: camera, attr: 'focus', min: 0, max: 100 })
    // add({ folder: cameraFolder, object: camera, attr: 'aspect', min: 0, max: 100 })
    // add({ folder: cameraFolder, object: camera, attr: 'filmGauge', min: 0, max: 100 })
    // add({ folder: cameraFolder, object: camera, attr: 'filmOffset', min: 0, max: 100 })
    // add({ folder: cameraFolder, object: camera, attr: 'view' })

    // const lightFolder = folder('Light')
    // add({ folder: lightFolder, object: light, attr: 'color' })
    // add({ folder: lightFolder, object: light, attr: 'intensity', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'position' })
    // add({ folder: lightFolder, object: light, attr: 'rotation' })
    // add({ folder: lightFolder, object: light, attr: 'castShadow' })
    // add({ folder: lightFolder, object: light, attr: 'shadow.bias', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.mapSize.width', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.mapSize.height', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.camera.near', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.camera.far', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.camera.left', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.camera.right', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.camera.top', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.camera.bottom', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.radius', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.normalBias', min: 0, max: 100 })
    // add({ folder: lightFolder, object: light, attr: 'shadow.camera.zoom', min: 0, max: 100 })

    // const rendererFolder = folder('Renderer')
    // add({ folder: rendererFolder, object: renderer, attr: 'shadowMap.enabled' })
  }

  return { pane, add, folder }
}
