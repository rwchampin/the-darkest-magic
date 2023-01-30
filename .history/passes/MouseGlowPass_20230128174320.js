import fragment from '~/shaders/mouseGlow/fragment.glsl'
import vertex from '~/shaders/mouseGlow/vertex.glsl'

export default {
  uniforms: {

    progress: { type: 'float', value: 0 },
    texture1: { type: 't', value: null },
    resolution: { type: 'v2', value: null },
    time: { type: 'float', value: 0 },
  },
  vertexShader: vertex,
  fragmentShader: fragment,
}
