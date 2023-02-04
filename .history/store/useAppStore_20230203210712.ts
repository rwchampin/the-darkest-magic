import { acceptHMRUpdate, defineStore } from 'pinia'

// const storeLoadingStatus = ref(false)
export const useCounter = defineStore('app', {
  state: () => ({
    appLoadingStatus: true,
    assetLoadingStatus: true,
    debugMode: true,
  }),

  getters: {
    loadingStatus: state => state.appLoadingStatus,
    debugMode: state => state.debugMode,
    assetLoadingStatus: state => state.assetLoadingStatus,
  },

  actions: {
    setAssetsLoaded(bool = true) {
      if (bool && typeof bool === 'boolean') {
        this.assetLoadingStatus = bool
        return this.assetLoadingStatus
      }
    },
    setAppLoaded(bool = true) {
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
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCounter, import.meta.hot))

//

export const useAppStore = defineStore('app', () => {
  // shit needed for preloading
  const appLoadingStatus = ref(true)
  const assetLoadingStatus = ref(true)

  const debugMode = ref(true)

  // const getAppLoadingStatus = computed(() => appLoadingStatus.value)
  // const getDebugMode = computed(() => debugMode.value)
  // const getAssetLoadingStatus = computed(() => assetLoadingStatus.value)

  // const setAssetsLoaded = (bool: boolean) => {
  //   if (bool && typeof bool === 'boolean') {
  //     assetLoadingStatus.value = bool
  //     return
  //   }
  //   assetLoadingStatus.value = true
  // }

  // const setAppLoaded = (bool: boolean) => {
  //   if (bool && typeof bool === 'boolean') {
  //     appLoadingStatus.value = bool
  //     return
  //   }
  //   else if (!bool || typeof bool !== 'boolean') {
  //     throw createError({
  //       statusCode: 500,
  //       statusMessage: 'INVALID BOOLEAN ARG::setAppLoaded() called with invalid arg, expects valid boolean',
  //     })
  //   }
  //   appLoadingStatus.value = true
  // }

  // function setDebugMode() {
  //   debugMode.value = true
  // }

  return {
    appLoadingStatus,
    assetLoadingStatus,
    debugMode,
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
