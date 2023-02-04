import * as THREE from 'three'

export const useCounter = () => useState<number>('counter', () => 0)
export const useDebugMode = () => useState<Boolean>('debugMode', () => true)
