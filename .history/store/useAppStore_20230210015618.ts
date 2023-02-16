import { acceptHMRUpdate, defineStore } from 'pinia'
import { readonly } from 'vue'

// const storeLoadingStatus = ref(false)
export const useAppStore = defineStore('appStore', {
  state: () => ({
    appLoadingStatus: readonly(ref(false)),
    assetLoadingStatus: readonly(ref(false)),
    debugMode: readonly(ref(true)),
    menuOpenStatus: readonly(ref(false))
    // debugMode: readonly(ref(process.env.NODE_ENV === 'development')),
  }),

  getters: {
    getAppLoadingStatus: state => state.appLoadingStatus,
    getDebugMode: state => state.debugMode,
    getAssetLoadingStatus: state => state.assetLoadingStatus,
    getMenuOpenStatus: state => state.menuOpenStatus
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
    setMenuOpenStatus(bool = true) {
      if (bool && typeof bool === 'boolean') {
        this.menuOpenStatus = bool
        return this.menuOpenStatus
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))

