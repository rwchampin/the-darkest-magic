import * as THREE from 'three'

export default function useBlobs() {
  const blobs = []

  const createBlob = (x, y, z) => {
    const geometry = new THREE.IcosahedronGeometry(1, 32, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
    const blob = new THREE.Mesh(geometry, material)
    blob.position.set(x, y, z)
    blobs.push(blob)
  }

  return { blobs, createBlob }
}
