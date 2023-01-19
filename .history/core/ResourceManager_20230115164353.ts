/* eslint-disable no-console */
import { DefaultLoadingManager } from 'three'
import EventEmitter from '~/core/helpers/EventEmitter'

export default class ResourceManager extends EventEmitter {
  loadingManager: any
  itemsLoaded: number
  itemsTotal: number
  constructor() {
    super()
    this.loadingManager = DefaultLoadingManager
    this.itemsLoaded = 0
    this.itemsTotal = 0
    this.loadingManager.onStart = this.onStart
    this.loadingManager.onProgress = this.onProgress
    this.loadingManager.onError = this.onError
  }

  onStart =  (url: any, itemsLoaded: number, itemsTotal: number) => {
    this.itemsLoaded = itemsLoaded
    this.itemsTotal = itemsTotal
    this.trigger("asset:load:start")
    console.log(`Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
  }

  onProgress =  (url: any, itemsLoaded: number, itemsTotal: number) => {
    this.itemsLoaded = itemsLoaded
    this.itemsTotal = itemsTotal
    this.trigger("asset:load:progress", { itemsLoaded/itemsTotal })
    console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
  }

onError = function (url) {
    console.log(`There was an error loading ${url}`)
    throw createError({
      statusCode: 500,
      message: `There was an error loading ${url} in ResourceManager.ts`
    })
  }
}

