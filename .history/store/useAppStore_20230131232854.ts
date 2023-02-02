import { acceptHMRUpdate, defineStore } from 'pinia'

// const storeLoadingStatus = ref(false)

export const useAppStore = defineStore('app', () => {
  // shit needed for preloading
  const appLoadingStatus = ref(true)
  const assetLoadingStatus = ref(true)

  const debugMode = ref(true)

  // const getAppLoadingStatus = computed(() => appLoadingStatus.value)
  // const getDebugMode = computed(() => debugMode.value)
  // const getAssetLoadingStatus = computed(() => assetLoadingStatus.value)

  const setAssetsLoaded = (bool: boolean) => {
    if (bool && typeof bool === 'boolean') {
      assetLoadingStatus.value = bool
      return
    }
    assetLoadingStatus.value = true
  }

  const setAppLoaded = (bool: boolean) => {
    if (bool && typeof bool === 'boolean') {
      appLoadingStatus.value = bool
      return
    }
    else if (!bool || typeof bool !== 'boolean') {
      throw createError({
        statusCode: 500,
        statusMessage: 'INVALID BOOLEAN ARG::setAppLoaded() called with invalid arg, expects valid boolean',
      })
    }
    appLoadingStatus.value = true
  }

  function setDebugMode() {
    debugMode.value = true
  }

  const s = {
    getAppLoadingStatus,
    getDebugMode,
    getAssetLoadingStatus,

    setAssetsLoaded,
    setAppLoaded,
    setDebugMode,
  }

  return s
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
