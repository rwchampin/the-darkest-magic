import { DefaultLoadingManager } from 'three'
import { Vue } from 'vue'

export default class LoadingManager extends Vue {
  constructor() {
    this.loadingManager = new DefaultLoadingManager()
    this.itemsLoaded = 0
    this.itemsTotal = 0
    this.loadingManager.onStart = this.onStart
    this.loadingManager.onProgress = this.onProgress
    this.loadingManager.onError = this.onError
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

  onError = function (url) {
    console.log(`There was an error loading ${url}`)
  }
}

