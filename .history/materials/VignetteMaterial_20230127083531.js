import * as THREE from 'three'
import { Vignette } from 'three/examples/jsm/shaders/VignetteShader.js'

export default const VignetteMaterial = new THREE.ShaderMaterial(Vignette)
