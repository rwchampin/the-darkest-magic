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

    if (this.onError) {
        this.onError(url)
        }
    }
}

    onLoad() {
    this.isLoading = false
        
    if (this.onLoad) {
        this.onLoad()
        }

    itemStart(url) {
    this.itemsTotal++
        
    if (this.isLoading === false) {
        this.isLoading = true
        }
    }

    itemEnd(url) {
    this.itemsLoaded++
        
    if (this.itemsLoaded === this.itemsTotal) {
        this.isLoading = false
        }
    }

    resolveURL(url) {
        return url
    }

    setURLModifier(modifier) {
    this.resolveURL = modifier
    }
    dispose() {
    this.onProgress = null
    this.onError = null
    this.onLoad = null
    }
}
