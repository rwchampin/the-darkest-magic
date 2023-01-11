import * as THREE from 'three'
import fragment from '~/components/shaders/yuri/fragment.glsl'
import vertex from '~/components/shaders/yuri/vertex.glsl'

export const usePoints = () => {
  const geometry = new THREE.PlaneGeometry(100, 100)

  const materialp = new THREE.MeshNormalMaterial({ color: 0xFF0000, side: THREE.DoubleSide })
  const material = new THREE.ShaderMaterial({
    fragmentShader: fragment,
    vertexShader: vertex,

    uniforms: {
      progress: { type: 'f', value: 0 },
    },
    side: THREE.DoubleSide,
  })
  const points = new THREE.Mesh(geometry, materialp)
  points.position.set(0, 0, -5)
  points.rotation.x = Math.PI * 0.5
  return { points }
}
