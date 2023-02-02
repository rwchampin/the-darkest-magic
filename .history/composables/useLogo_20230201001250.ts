import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import * as THREE from 'three'
import fragment from '~/shaders/twist/fragment.glsl'
import vertex from '~/shaders/twist/vertex.glsl'
import matcap from '~/assets/matcaps/soul-matcap.jpeg?url'
import logoUrl from '~/assets/models/best.glb?url'

export const useLogo = ({ scene, camera, renderer }) => {
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

    const normals = []
    for (let i = 0; i < geometry.attributes.position.count; i++)
      normals.push(0, 0, 1)

    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))

    const colors = []
    for (let i = 0; i < geometry.attributes.position.count; i++)
      colors.push(1, 1, 1)

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    return geometry
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
      if (child.isMesh) {
        const g = new THREE.BufferGeometry().fromGeometry(child.geometry)
        fillGeometryWithPoints(g, 1000)
      }
      child.material = material
    })
    logo.rotation.x = Math.PI / 2
    scene.add(logo)
  })
}