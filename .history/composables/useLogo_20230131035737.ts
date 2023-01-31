import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import fragment from '~/assets/shaders/twist/fragment.glsl'
import vertex from '~/assets/shaders/twist/vertex.glsl'

import logoUrl from '~/assets/models/SEX.glb?url'

const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        sampler2D: { value:  },
        resolution: { value: new THREE.Vector2() },
        flatNormals: { value: 0 },
        axis: { value: new THREE.Vector3(0, 0, 0) },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    side: THREE.DoubleSide,
})

export const useLogo = ({ scene, camera, renderer }) => {
  const loader = new GLTFLoader()
  loader.load(logoUrl, (gltf) => {
    const logo = gltf.scene
    logo.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: 0xFFFFFF,
        })
      }
    })
    logo.rotation.x = Math.PI / 2
    scene.add(logo)
  })
}
