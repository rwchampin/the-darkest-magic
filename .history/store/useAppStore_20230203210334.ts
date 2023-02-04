import { acceptHMRUpdate, defineStore } from 'pinia'

// const storeLoadingStatus = ref(false)
export const useCounter = defineStore('app', {
  state: () => ({
      appLoadingStatus : true,
   assetLoadingStatus: true,
    debugMode: true

    n: 2,
    incrementedTimes: 0,
    decrementedTimes: 0,
    numbers: [] as number[],
  }),

  getters: {
    double: (state) => state.n * 2,
  },

  actions: {
    increment(amount = 1) {
      this.incrementedTimes++
      this.n += amount
    },

    changeMe() {
      console.log('change me to test HMR')
    },

    async fail() {
      const n = this.n
      await delay(1000)
      this.numbers.push(n)
      await delay(1000)
      if (this.n !== n) {
        throw new Error('Someone changed n!')
      }

      return n
    },

    async decrementToZero(interval: number = 300) {
      if (this.n <= 0) return

      while (this.n > 0) {
        this.$patch((state) => {
          state.n--
          state.decrementedTimes++
        })
        await delay(interval)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounter, import.meta.hot))
}
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
