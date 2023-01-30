import fragment from '~/shaders/mouseGlow/fragment.glsl'
import vertex from '~/shaders/mouseGlow/vertex.glsl'

export default {
  uniforms: {
    u_Resolution: { type: 'v2', value: null },
    u_time: { type: 'float', value: 0 },
  },
  vertexShader: vertex,
  fragmentShader: fragment,
}
