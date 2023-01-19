import { readonly, ref } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const toLoad = ref(0)
const loaded = ref(0)
const items = ref({})
const loaders = ref([])

export const useResources = () => {
  /**
     * Set loaders
     */
  const setLoaders = () => {
    loaders.value = []

    // Images
    loaders.value.push({
      extensions: ['jpg', 'png'],
      action: (_resource) => {
        const image = new Image()

        image.addEventListener('load', () => {
          fileLoadEnd(_resource, image)
        })

        image.addEventListener('error', () => {
          fileLoadEnd(_resource, image)
        })

        image.src = _resource.source
      },
    })

    // Basis images
    // const basisLoader = new BasisTextureLoader()
    // basisLoader.setTranscoderPath('basis')
    // basisLoader.detectSupport(renderer)

    // loaders.value.push({
    //   extensions: ['basis'],
    //   action: (_resource) => {
    //     basisLoader.load(_resource.source, (_data) => {
    //       fileLoadEnd(_resource, _data)
    //     })
    //   },
    // })

    // Draco
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco')
    dracoLoader.setDecoderConfig({ type: 'js' })

    loaders.value.push({
      extensions: ['drc'],
      action: (_resource) => {
        dracoLoader.load(_resource.source, (_data) => {
          fileLoadEnd(_resource, _data)

          DRACOLoader.releaseDecoderModule()
        })
      },
    })

    // GLTF
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    loaders.value.push({
      extensions: ['glb', 'gltf'],
      action: (_resource) => {
        gltfLoader.load(_resource.source, (_data) => {
          fileLoadEnd(_resource, _data)
        })
      },
    })

    // FBX
    const fbxLoader = new FBXLoader()

    loaders.value.push({
      extensions: ['fbx'],
      action: (_resource) => {
        fbxLoader.load(_resource.source, (_data) => {
          fileLoadEnd(_resource, _data)
        })
      },
    })

    // RGBE | HDR
    const rgbeLoader = new RGBELoader()

    loaders.value.push({
      extensions: ['hdr'],
      action: (_resource) => {
        rgbeLoader.load(_resource.source, (_data) => {
          fileLoadEnd(_resource, _data)
        })
      },
    })
  }
  setLoaders()

  /**
     * Load
     */
  const load = (_resources = []) => {
    for (const _resource of _resources) {
      toLoad.value++
      const extensionMatch = _resource.source.match(/\.([a-z]+)$/)

      if (typeof extensionMatch[1] !== 'undefined') {
        const extension = extensionMatch[1]
        const loader = loaders.value.find(_loader => _loader.extensions.find(_extension => _extension === extension))

        if (loader)
          loader.action(_resource)

        else
          console.warn(`Cannot found loader for ${_resource}`)
      }
      else {
        console.warn(`Cannot found extension of ${_resource}`)
      }
    }
  }

  /**
     * File load end
     */
  const fileLoadEnd = (_resource, _data) => {
    loaded.value++
    items[_resource.name] = _data

    trigger('fileEnd', [_resource, _data])

    if (loaded.value === toLoad.value)
      trigger('end')
  }
}
