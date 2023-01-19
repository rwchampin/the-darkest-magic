import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

// import Experience from '~/core/Experience.js'
import * as THREE from 'three'
import EventEmitter from '~/core/helpers/EventEmitter.js'
export default class Resources extends EventEmitter {
  /**
     * Constructor
     */
  constructor({ nuxtApp, renderer }) {
    super()

    this.renderer = renderer
    this.nuxtApp = nuxtApp

    this.setLoaders()

    //* * INIT VARS * *//
    this.progress = 0
    this.toLoad = 0
    this.loaded = 0
    this.items = {}
  }


 

  /**
     * Set loaders
     */
  setLoaders() {
    this.loaders = []
    this.lm = new THREE.LoadingManager(
      () => {
        console.log('All files loaded')
      },
      (url, itemsLoaded, itemsTotal) => {
        console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
        this.onProgress(url, itemsLoaded, itemsTotal)
      },
      (url) => {
        this.onError(url)
      })
    // Images
    this.loaders.push({
      extensions: ['jpg', 'png'],
      action: (_resource) => {
        const image = new Image()

        image.addEventListener('load', () => {
          this.fileLoadEnd(_resource, image)
        })

        image.addEventListener('error', () => {
          this.fileLoadEnd(_resource, image)
        })

        image.src = _resource.source
      },
    })

    // Draco
    const dracoLoader = new DRACOLoader(this.lm)
    dracoLoader.setDecoderPath('draco')
    dracoLoader.setDecoderConfig({ type: 'js' })

    this.loaders.push({
      extensions: ['drc'],
      action: (_resource) => {
        dracoLoader.load(_resource.source, (_data) => {
          this.fileLoadEnd(_resource, _data)

          DRACOLoader.releaseDecoderModule()
        })
      },
    })

    // GLTF
    const gltfLoader = new GLTFLoader(this.lm)
    gltfLoader.setDRACOLoader(dracoLoader)

    this.loaders.push({
      extensions: ['glb', 'gltf'],
      action: (_resource) => {
        gltfLoader.load(_resource.source, (_data) => {
          this.fileLoadEnd(_resource, _data)
        })
      },
    })

    // FBX
    const fbxLoader = new FBXLoader(this.lm)

    this.loaders.push({
      extensions: ['fbx'],
      action: (_resource) => {
        fbxLoader.load(_resource.source, (_data) => {
          this.fileLoadEnd(_resource, _data)
        })
      },
    })

    // RGBE | HDR
    const rgbeLoader = new RGBELoader(this.lm)

    this.loaders.push({
      extensions: ['hdr'],
      action: (_resource) => {
        rgbeLoader.load(_resource.source, (_data) => {
          this.fileLoadEnd(_resource, _data)
        })
      },
    })
  }

  /**
     * Load
     */
  load(_resources = []) {
    for (const _resource of _resources) {
      this.toLoad++

      const extensionMatch = _resource.source.match(/\.([a-z]+)$/)

      if (typeof extensionMatch[1] !== 'undefined') {
        const extension = extensionMatch[1]
        const loader = this.loaders.find(_loader => _loader.extensions.find(_extension => _extension === extension))

        if (loader) { loader.action(_resource) }

        else {
          console.warn(`Cannot found loader for ${_resource}`)
          throw createError({
            statusCode: 404,
            message: `Cannot found loader for ${_resource}`,
          })
        }
      }
      else {
        console.warn(`Cannot found extension for ${_resource}`)
        throw createError({
          statusCode: 404,
          message: `Cannot found extension for ${_resource}`,
        })
      }
    }
  }

  /**
     * File load end
     */
  fileLoadEnd(_resource, _data) {
    this.loaded++
    this.items[_resource.name] = _data

    this.trigger('fileEnd', [_resource, _data])

    if (this.loaded === this.toLoad)
      this.trigger('assets:loaded')
  }
}
