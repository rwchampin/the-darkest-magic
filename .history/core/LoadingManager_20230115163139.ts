import { DefaultLoadingManager } from 'three'
import EventEmitter from '~/core/helpers/EventEmitter'

export default class ResourceManager extends EventEmitter {
  loadingManager: any
  itemsLoaded: number
  itemsTotal: number
  constructor() {
    super()
    this.loadingManager = DefaultLoadingManager
    debugger
    this.itemsLoaded = 0
    this.itemsTotal = 0
    this.loadingManager.onStart = this.onStart
    this.loadingManager.onProgress = this.onProgress
    this.loadingManager.onError = this.onError
  }

  onStart = function (url, itemsLoaded, itemsTotal) {
   
    const str= `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`;
     this.trigger("asset:load:start",str)
    console.log(str)
  }

  onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
  }

  onError = function (url) {
    console.log(`There was an error loading ${url}`)
  }
}

