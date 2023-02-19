import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import room from '~/assets/models/room.glb?url'
export const useRoom = ({ scene, camera, renderer }) => {
  const loader = new GLTFLoader()
  loader.load(room, (gltf) => {
    debugger
    scene.add(gltf.scene)
  })
}
