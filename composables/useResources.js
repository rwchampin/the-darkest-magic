import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { useLogger } from '~~/composables/useLogger.js'
import { EventEmitter } from '~/utils/EventEmitter.js'
import { sources } from '~/utils/sources.js'

const { log, warn, error, debug } = useLogger()
const em = new EventEmitter()

em.on('app:loading:complete', () => {
  // if (nuxtApp.$appStore.getDebugMode)
  console.log('app:loading:complete')
})
em.on('assets:loading:complete', () => {
  // if (nuxtApp.$appStore.getDebugMode)
  console.log('asset:loading:complete')
})
em.on('assets:progress', () => {
  // if (nuxtApp.$appStore.getDebugMode)
  console.log('asset:progress')
})
export const useResources = (nuxtApp) => {
  let loaders = {}
  let progress = 0
  const items = {}
  let loaded = 0

  // const THREE = nuxtApp.$plugins.THREE;
  const loadingManager = new THREE.LoadingManager(
    () => {
      debugger
      window.assets = items
      em.trigger('assets:loading:complete', items)
      // nuxtApp.$appStore.appLoadingStatus.value = false
    },
    (url, itemsLoaded, itemsTotal) => {
      // onLoad Progress
      progress = Math.round((itemsLoaded / itemsTotal) * 100)
      // console.log("progress", progress);

      em.trigger('assets:loading:progress', progress)
    },
    () => {
      // onError
      log('Error loading assets')
    },
  )
  const sourceLoaded = (source, file) => {
    items[source.name] = file
    loaded++
  }

  const startLoading = () => {
    try {
      for (const source of sources) {
        if (source.type === 'image' || source.type === 'img') {
          const img = new Image()

          img.src = source.path
          sourceLoaded(source, img)
        }
        else if (source.type === 'gltfModel') {
          loaders.gltfLoader.load(source.path, (file) => {
            sourceLoaded(source, file)
          })
        }
        else if (source.type === 'texture') {
          loaders.textureLoader.load(source.path, (file) => {
            sourceLoaded(source, file)
          })
        }
        else if (source.type === 'cubeTexture') {
          loaders.cubeTextureLoader.load(source.path, (file) => {
            sourceLoaded(source, file)
          })
        }
      }
    }
    catch (err) {
      error('Error loading assets:: ', err)
      throw createError({
        statusCode: 500,
        statusMessage: `Error loading assets.  Check 'useResources.js'.${err}`,
      })
    }
  }

  const init = () => {
    loaders = {}
    loaders.gltfLoader = new GLTFLoader(loadingManager)

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader(loadingManager)

    dracoLoader.setDecoderPath('/draco/')
    loaders.gltfLoader.setDRACOLoader(dracoLoader)

    loaders.textureLoader = new THREE.TextureLoader(loadingManager)
    loaders.cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
    startLoading()
  }

  return { init, items, loadingManager, progress, loaded }
}

// export const useResources = createSharedComposable(useResourcesFN);
