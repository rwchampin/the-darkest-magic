import fragment from "~/shaders/skull/fragment.glsl";
import vertex from "~/shaders/skull/vertex.glsl";
import * as THREE from "three";

export const SkullPass = {
  uniforms: {
    tDiffuse: { type: "t", value: null },
    uTime: { type: "f", value: 0 },
    uResolution: { type: "v2", value: new THREE.Vector2() },
    uMouse: { type: "v2", value: new THREE.Vector2() },
  },
  vertexShader: vertex,
  fragmentShader: fragment,
};
