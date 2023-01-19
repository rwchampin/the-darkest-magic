import chalk from 'chalk'
import { acceptHMRUpdate, defineStore } from 'pinia'

// const storeLoadingStatus = ref(false)

export const useAppStore = defineStore('app', () => {
  // if (storeLoadingStatus.value === true) {
  //   console.log(chalk.green.bgBlack('OLD useAppStore instance returned'))
  //   return
  // }

  // ** IF `isAppStoreLoaded` IS TRUE, THROW ERROR BC WE SHOULD HAVE
  // ** RETURNED THE EXITING STORE

  // if (storeLoadingStatus.value) {
  //   chalk.green.bgBlack('ERROR::createAppStore() called twice')
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: 'ERROR::createAppStore() called twice',
  //   })
  //   return
  // }

  // shit needed for preloading
  const appLoadingStatus = ref(false)
  const assetLoadingStatus = ref(false)

  const debugMode = ref(false)

  const getAppLoadingStatus = computed(() => appLoadingStatus.value)
  const getDebugMode = computed(() => debugMode.value)
  const getAssetLoadingStatus = computed(() => assetLoadingStatus.value)

  function setAssetsLoaded() {
    assetLoadingStatus.value = true
  }

  function setAppLoaded() {
    appLoadingStatus.value = true
  }

  function setDebugMode() {
    debugMode.value = true
  }

  return {
    getAppLoadingStatus,
    getDebugMode,
    getAssetLoadingStatus,

    setAssetsLoaded,
    setAppLoaded,
    setDebugMode,
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
