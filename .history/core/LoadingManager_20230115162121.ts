import { DefaultLoadingManager } from 'three'
import { Vue } from 'vue'

export default class LoadingManager extends Vue {
  constructor() {
    this.loadingManager = DefaultLoadingManager
  }

  get loadingManager() {
    return this._loadingManager
  }

  set loadingManager(loadingManager) {
    this._loadingManager = loadingManager
  }
}
const lm = new DefaultLoadingManager()
const loadingManagerFN = () => {
  THREE.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(`Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
  }

  THREE.DefaultLoadingManager.onLoad = function () {
    console.log('Loading Complete!')
  }

  THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
  }

  THREE.DefaultLoadingManager.onError = function (url) {
    console.log(`There was an error loading ${url}`)
  }
}

const useLoadingManager = createSharedComposable(loadingManagerFN)

export default useLoadingManager
