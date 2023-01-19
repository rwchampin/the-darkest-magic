import { fragment } from "~/shaders/blackGooBall/fragment.frag";
import { vertex } from "~/shaders/blackGooBall/vertex.vert";

export default {
  uniforms: {
    u_Resolution: { type: "v2", value: null },
    u_time: { type: "float", value: 0 },
  },
  vertexShader: shaderVertex,
  fragmentShader: shaderFragment,
};
