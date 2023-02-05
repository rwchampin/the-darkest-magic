import * as THREE from 'three'

// export const useCounter = () => useState<number>('counter', () => 0)
export const useDebugMode = () => useState<Boolean>('debugMode', () => false)
export const useAssetsLoaded = () => useState < Boolean > ('assetsLoaded', () => false)
export const useAppLoaded = () => useState<Boolean>('appLoaded', () => false)

