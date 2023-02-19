import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import room from '~/assets/models/room.gltf?url'
export const useRoom = ({ scene, camera, renderer }) => {
  const loader = new GLTFLoader()
  onMounted(() => {
    const { room, man } = window.$resources
    scene.add(room, man)
  })
}
