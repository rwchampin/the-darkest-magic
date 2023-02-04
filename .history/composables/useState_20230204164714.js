import * as THREE from 'three'

export const useCounter = () => useState<number>('counter', () => 0)
export const useDebugMode = () => useState<Boolean>('debugMode', () => true)
export const useAssetsLoaded = () => useState < Boolean > ('assetsLoaded', () => false)
export const useAppLoaded = () => useState<Boolean>('appLoaded', () => false)

