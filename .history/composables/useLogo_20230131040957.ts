import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import fragment from '~/shaders/twist/fragment.glsl'
import vertex from '~/shaders/twist/vertex.glsl'

import logoUrl from '~/assets/models/sex.glb?url'

export const useLogo = ({ scene, camera, renderer }) => {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      progress: { value: 0 },
      sampler2D: { value: 0 },
      resolution: { value: new THREE.Vector2() },
      flatNormals: { value: 0 },
      axis: { value: new THREE.Vector3(0, 0, 0) },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    side: THREE.DoubleSide,
  })
  const loader = new GLTFLoader()
  loader.load(logoUrl, (gltf) => {
    const logo = gltf.scene
    logo.traverse((child) => {
      if (child.isMesh)
        child.material = material
    })
    logo.rotation.x = Math.PI / 2
    scene.add(logo)
  })
}
