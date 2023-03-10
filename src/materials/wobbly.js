import * as THREE from 'three'

export const wobblyShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
                uniform float time;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    pos.y += sin(pos.x * 10.0 + time) * 0.05;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
  fragmentShader: `
                uniform vec2 resolution;
                varying vec2 vUv;
                void main() {
                    vec2 st = gl_FragCoord.xy / resolution.xy;
                    vec3 color = vec3(0.0);
                    color.r = vUv.x;
                    color.g = vUv.y;
                    color.b = 0.0;
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
})

