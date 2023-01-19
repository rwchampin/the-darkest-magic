import { fragment } from '~/shaders/blackGooBall/fragment.glsl'
import { vertex } from '~/shaders/blackGooBall/vertex.glsl'

export default {
  uniforms: {
    u_Resolution: { type: 'v2', value: null },
    u_time: { type: 'float', value: 0 },
  },
  vertexShader: fragment,
  glslmentShader: vertex,
}
