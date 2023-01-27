import * as THREE from 'three'
import { BlackGooBallMaterial } from '~~/materials/BlackGooBall'
export default function createIcosahedron() {
  const clock = new THREE.Clock()
  const icosGeometry = new THREE.IcosahedronGeometry(2, 20)
  const icosMaterial = new THREE.ShaderMaterial({
    uniforms: {
      u_intensity: { type: 'f', value: 0.5 },
      u_time: { type: 'f', value: 0 },

    },
    vertexShader: `
      varying vec2 vUv;
      varying float vDisplacement;

      uniform float u_time;
      uniform float u_intensity;

      void main() {
        vUv = uv;
        vec3 newPosition = position + normal * vec3(u_intensity * sin(position.y * 10.0 + u_time));
        vDisplacement = length(newPosition - position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vDisplacement;

       uniform float u_time;
      uniform float u_intensity;

      void main() {
         float distort = 2. * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
        vec3 color = vec3(abs(vUv - 0.5) * 2. * (1. - distort), 1.0);
        color.r += vDisplacement;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    shininess: 100,
    specular: 0x111111,
    side: THREE.BackSide,
    // wireframe: true,
  })
  const icosahedron = new THREE.Mesh(icosGeometry, icosMaterial)
  const animateIcosahedron = () => {
    // icosahedron.rotation.x += 0.1
    // icosahedron.rotation.y += 0.1
    icosahedron.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime()
    icosahedron.material.uniforms.u_intensity.value = THREE.MathUtils.lerp(
      icosahedron.material.uniforms.u_intensity.value,
      hover ? 0.01 : 0.15,
      0.02,
    )
  }
  return { icosahedron, animateIcosahedron }
}
