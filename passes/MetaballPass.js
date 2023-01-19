import * as THREE from 'three'
import shaderFragment from '~/shaders/metaballs/metaballs/fragment.glsl'
import shaderVertex from '~/shaders/metaballs/metaballs/vertex.glsl'

export default {
  uniforms:
    {
      u_color: { type: 'v3', value: new THREE.Vector3(1, 0, 0) },
    },
  vertexShader: shaderVertex,
  fragmentShader: shaderFragment,
}
