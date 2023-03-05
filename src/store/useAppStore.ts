import { acceptHMRUpdate, defineStore } from '~~/src/node_modules/pinia/dist/pinia'

// const storeLoadingStatus = ref(false)
export const useAppStore = defineStore('appStore', () => {
  const appLoadingStatus = ref(false);
  const assetLoadingStatus = ref(false);
  const debugMode = ref(true);
  const isNavOpen = ref(false);
  const mousePosition = ref({ x: 0, y: 0 });
  const mouseState = ref('base');
  const orbitControlsCreated = ref(false);

  const getAppLoadingStatus = computed(() => appLoadingStatus.value)
  const getDebugMode = computed(() => debugMode.value)
  const getAssetLoadingStatus = computed(() => assetLoadingStatus.value)
  const getIsNavOpen = computed(() => isNavOpen.value)
  const getMousePosition = computed(() => mousePosition.value)
  const getOrbitControlsCreated = computed(() => orbitControlsCreated.value)

  async function setAssetsLoadingStatus(bool = true): boolean {
    if (bool && typeof bool === 'boolean')
      assetLoadingStatus.value = bool

    return assetLoadngStatus
  }
  async function setAppLoadingStatus(bool = true): boolean {
    if (bool && typeof bool === 'boolean')
      appLoadingStatus.value = bool

    return appLoadingStatus
  }
  async function setDebugMode(bool = true): boolean {
    if (bool && typeof bool === 'boolean')
      debugMode.value = bool

    return debugMode
  }
  async function setIsNavOpen(bool = true): boolean {
    if (bool && typeof bool === 'boolean')
      isNavOpen.value = bool

    return isNavOpen
  }

  async function setMousePosition(pos): Vector3 {
    if (pos && typeof pos === Vector3)
      mousePosition.value = pos

    return mousePosition
  }

  // state: () => ({
  //     appLoadingStatus: false,
  //     assetLoadingStatus: false,
  //     debugMode: true,
  //     isNavOpen: false,
  //     mousePosition: { x: 0, y: 0 },
  //     mouseState: 'base',
  //     orbitControlsCreated: false,
  // }),

  // getters: {
  //   getAppLoadingStatus: state => state.appLoadingStatus,
  //   getDebugMode:  state => state.debugMode,
  //   getAssetLoadingStatus: state => state.assetLoadingStatus,
  //   getMenuOpenStatus: state => state.isNavOpen,
  //   getMousePosition: state => state.mousePosition,
  //   getMouseState: state => state.mouseState,
  //   getOrbitControlsCreated: state => state.orbitControlsCreated,
  // },

  // actions: {
  //   setAssetsLoadingStatus(bool = true): boolean {
  //     if (bool && typeof bool === 'boolean')
  //       assetLoadingStatus = bool

  //     return this.assetLoadngStatus
  //   },
  //   setAppLoadingStatus(bool = true): boolean {
  //     if (bool && typeof bool === 'boolean')
  //       this.appLoadingStatus.value = bool

  //     return this.appLoadingStatus
  //   },
  //   setDebugMode(bool = true): boolean {
  //     if (bool && typeof bool === 'boolean')
  //       this.debugMode.value = bool

  //     return this.debugMode
  //   },
  //   setIsNavOpen(bool = true): boolean {
  //     if (bool && typeof bool === 'boolean')
  //       this.isNavOpen.value = bool

  //     return this.isNavOpen
  //   },
  // },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))

