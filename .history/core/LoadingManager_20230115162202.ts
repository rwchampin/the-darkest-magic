import { DefaultLoadingManager } from 'three'
import { Vue } from 'vue'

export default class LoadingManager extends Vue {
  constructor() {
    this.loadingManager = new DefaultLoadingManager()
  }

  get loadingManager() {
    return this._loadingManager
  }

  set loadingManager(loadingManager) {
    this._loadingManager = loadingManager
  }

  onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(`Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
  }

  onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
  }
}

const loadingManagerFN = () => {
  THREE.DefaultLoadingManager

    .THREE.DefaultLoadingManager.onLoad = function () {
      console.log('Loading Complete!')
    }

  THREE.DefaultLoadingManager

    .THREE.DefaultLoadingManager.onError = function (url) {
      console.log(`There was an error loading ${url}`)
    }
}

const useLoadingManager = createSharedComposable(loadingManagerFN)

export default useLoadingManager
