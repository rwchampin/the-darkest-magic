export default class {
  constructor() {
    this.isLoading = false
    this.itemsLoaded = 0
    this.itemsTotal = 0
    this.onProgress = null
    this.onError = null
    this.onLoad = null
  }

  onProgress(url, itemsLoaded, itemsTotal) {
    this.itemsLoaded = itemsLoaded
    this.itemsTotal = itemsTotal
  } 

    onError(url) {
    console.error('LoadingManager: Couldn\'t load', url)

    this.itemEnd(url)
}
