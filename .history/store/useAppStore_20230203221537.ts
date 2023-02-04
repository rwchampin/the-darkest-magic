import { acceptHMRUpdate, defineStore } from 'pinia'

// const storeLoadingStatus = ref(false)
export const useAppStore = defineStore('appStore', {
  state: () => ({
    appLoadingStatus: true,
    assetLoadingStatus: true,
    debugMode: true,
  }),

  getters: {
    appLoadingStatus: state => state.appLoadingStatus,
    debugMode: state => state.debugMode,
    assetLoadingStatus: state => state.assetLoadingStatus,
  },

  actions: {
    setAssetsLoadingStatus(bool = true) {
      if (bool && typeof bool === 'boolean') {
        this.assetLoadingStatus = bool
        return this.assetLoadingStatus
      }
    },
    setAppLoadingStatus(bool = true) {
      if (bool && typeof bool === 'boolean') {
        this.appLoadingStatus = bool
        return this.appLoadingStatus
      }
    },
    setDebugMode(bool = true) {
      if (bool && typeof bool === 'boolean') {
        this.debugMode = bool
        return this.debugMode
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))

