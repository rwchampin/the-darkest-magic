import * as THREE from 'three'

export const useRoom = ({ scene, camera, renderer }) => {
  const s = 30
  const geometry = new THREE.BoxGeometry(s, s / 2, s)

  const material = new THREE.MeshPhongMaterial({
    color: 0xA0ADAF,
    shininess: 10,
    specular: 0x111111,
    side: THREE.BackSide,
    // wireframe: true,
  })

  const room = new THREE.Mesh(geometry, material)
  room.position.y = 0 // s / 2
  room.receiveShadow = true

  return { room }
}
