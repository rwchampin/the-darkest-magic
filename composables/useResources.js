import chalk from 'chalk'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { EventEmitter } from '~/utils/EventEmitter.js'
import { sources } from '~/utils/sources.js'

const em = new EventEmitter()

export const useResources = (nuxtApp) => {
  let loaders = {}
  let progress = 0
  const items = {}
  let loaded = 0

  em.on('assets:loaded', (items) => {
    console.log(chalk.green.bgBlack('assets:loaded'))
    console.log('items', items)
  })

  em.on('assets:progress', (progress) => {
    console.log(chalk.green.bgBlack('assets:progress'))
    console.log('progress', progress)
  })

  // const THREE = nuxtApp.$plugins.THREE;
  const loadingManager = new THREE.LoadingManager(
    () => {
      window.assets = items
      em.trigger('assets:loaded', items)
      // nuxtApp.$appStore.appLoadingStatus.value = false
    },
    (url, itemsLoaded, itemsTotal) => {
      // onLoad Progress
      progress = Math.round((itemsLoaded / itemsTotal) * 100)
      // console.log("progress", progress);

      em.trigger('assets:progress', progress)
    },
    () => {
      // onError
      console.log(chalk.red.bgBlack('Error loading assets'))
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
      console.log(chalk.black.bgRed.bold('Error loading assets'), err)
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
