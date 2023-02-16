import * as THREE from 'three'

export const useRoom = ({scene, camera, renderer}) => {
 
  onMounted(() => {
    const { room, man } = window.$resources;
    scene.add(room, man)
})
}
