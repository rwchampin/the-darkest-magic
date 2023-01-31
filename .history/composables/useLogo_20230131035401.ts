import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import logoUrl from '~/assets/models/SEX.glb?url'

const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        sampler2D: { value:  },

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
