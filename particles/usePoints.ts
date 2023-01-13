import * as THREE from 'three'
import fragment from '~/components/shaders/yuri/fragment.glsl'
import vertex from '~/components/shaders/yuri/vertex.glsl'

export const usePoints = () => {
  // const planeGeometry = new THREE.PlaneGeometry(10, 10)
  // const bufferGeometry = new THREE.BufferGeometry()
  // const positions = new Float32Array(planeGeometry.attributes.position.array)
  // bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  // bufferGeometry.setAttribute('uv', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))
  // bufferGeometry.setAttribute('color', new THREE.BufferAttribute(planeGeometry.attributes.color.array, 3))
  // bufferGeometry.setIndex(planeGeometry.index)

  const material = new THREE.ShaderMaterial({
    fragmentShader: `
  varying vec2 vCoordinates;
  void main() {

      gl_FragColor = vec4(vCoordinates.x/512,vCoordinates.y/512,0.,1.);

  }
  `,
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vCoordinates;
    attribute vec3 aCoordinates;
    void main(void) {
        vUv = uv;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 50. * ( 1. / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;

    }
  `,

    uniforms: {
      progress: { type: 'f', value: 0 },
    },
    side: THREE.DoubleSide,
  })

  const number = 512 * 512
  const geometry = new THREE.BufferGeometry()
  const positions = new THREE.BufferAttribute(new Float32Array(number * 3), 3)
  const coordinates = new THREE.BufferAttribute(new Float32Array(number * 3), 3)
  let index = 0
  for (let i = 0; i < 512; i++) {
    const posX = i - 256
    for (let j = 0; j < 512; j++) {
      positions.setXYZ(index, posX * 2, j - 256, 0)
      coordinates.setXYZ(index, i, j, 0)
      index++
    }
  }
  geometry.setAttribute('position', positions)
  geometry.setAttribute('aCoordinates', coordinates)
  geometry.computeBoundingSphere()

  const points = new THREE.Points(geometry, material)

  return points
}
