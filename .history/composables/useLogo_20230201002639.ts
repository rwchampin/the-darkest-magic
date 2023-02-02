import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import * as THREE from 'three'
import fragment from '~/shaders/twist/fragment.glsl'
import vertex from '~/shaders/twist/vertex.glsl'
import matcap from '~/assets/matcaps/soul-matcap.jpeg?url'
import logoUrl from '~/assets/models/best.glb?url'

export const useLogo = ({ scene, camera, renderer }) => {
  const createPoints = (geometry, count) => {
    const vertices = []

    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000)
      const y = THREE.MathUtils.randFloatSpread(2000)
      const z = THREE.MathUtils.randFloatSpread(2000)

      vertices.push(x, y, z)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const material = new THREE.PointsMaterial({ color: 0x888888 })

    const points = new THREE.Points(geometry, material)

    scene.add(points)
  }
  const fillGeometryWithPoints = (geometry, count) => {
    const points = []
    for (let i = 0; i < count; i++) {
      const point = new THREE.Vector3()
      point.x = Math.random() * 2 - 1
      point.y = Math.random() * 2 - 1
      point.z = Math.random() * 2 - 1
      point.normalize()
      point.multiplyScalar(Math.random())
      const scale = i / count
      point.multiplyScalar(scale * 0.1 + 0.9)
      points.push(point)
    }
    geometry.setFromPoints(points)

    return { geometry, points }
  }

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      progress: { value: 0 },
      sampler2D: { value: new THREE.TextureLoader().load(matcap) },
      resolution: { value: new THREE.Vector4() },
      flatNormals: { value: 0 },
      axis: { value: new THREE.Vector3(1, 0, 0) },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    side: THREE.DoubleSide,
  })
  const loader = new GLTFLoader()
  loader.load(logoUrl, (gltf) => {
    const logo = gltf.scene

    logo.traverse((child) => {
      if (child.geometry) {
        child.castShadow = true
        const g = child.geometry
        const { geometry, points } = fillGeometryWithPoints(g, 1000)
        const t = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 }))
      }
    })
    scene.add(logo)
  })
}
