import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import assets from '~/core/assets.js'
// import Experience from '~/core/Experience.js'
import * as THREE from 'three'
import EventEmitter from '~/core/helpers/EventEmitter.js'
export default class ResourceLoader extends EventEmitter {
  /**
     * Constructor
     */
  constructor() {
    super()

    // this.renderer = renderer
    // this.nuxtApp = nuxtApp
    this.lm = new THREE.LoadingManager((url, itemsLoaded, itemsTotal) => { 
        console.log("LOADED::", itemsLoaded/itemsTotal*100)
    }, (url, itemsLoaded, itemsTotal) => {
      console.log('PROGRESS::', itemsLoaded/itemsTotal*100)
    }, (url) => {
      console.log("ERROR", url)
    });
      
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

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    this.loaders.push({
      extensions: ['png', 'jpg'],
      action: (_resource) => {
        cubeTextureLoader.setPath(_resource.path).load(_resource.source, (_data) => {
          this.fileLoadEnd(_resource, _data)
         })
      }
    })
    this.load();
  }

  /**
     * Load
     */
  load(_resources = []) {
    this.toLoad = _resources.length;
    for (const _resource of _resources) {
      if (!_resource.source || !_resource.source.match) {
        throw createError({
          statusCode: 500,
          statusMessage: `Error loading resource in ResourceLoader.js.\nFailed on ${_resource.name}`
        })
      }
      const extensionMatch = _resource.source.match(/\.([a-z]+)$/)
      if (typeof extensionMatch[1] !== 'undefined') {
        const extension = extensionMatch[1]
        let loader;
        if (Array.isArray(_resource.source) && (extension === 'png' || extension === 'jpg')) {
          // If this resource is of type cubetextureloader, grab the last loader in the
          // loaders array bc that one is the cube texture loader
          loader = this.loaders[this.loaders.length - 1]
        } else {
          loader = this.loaders.find(_loader => _loader.extensions.find(_extension => _extension === extension))
        }
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

    this.trigger('assets:progress:fileEnd', [_resource, _data])

    if (this.loaded === this.toLoad) {
      this.trigger('assets:progress:complete', this.items)
    }
  }
}
