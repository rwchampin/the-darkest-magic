import shaderFragment from '~/shaders/zoom/fragment.glsl'
import shaderVertex from '~/shaders/zoom/vertex.glsl'

export default {
  uniforms:
    {
      u_mouse: {
        value: 0,
      },
      u_time: {
        value: 0.00,
      },
      u_noise: {
        value: null,
      },
      u_buffer: {
        value: null,
      },
      u_renderpass: {
        value: null,
      },
      u_frame: {
        value: 0,
      },
    },
  vertexShader: shaderVertex,
  fragmentShader: shaderFragment,
}
