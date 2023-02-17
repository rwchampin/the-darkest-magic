import * as THREE from 'three'
import { createSharedComposable } from '@vueuse/core'

export const useNewPoints = createSharedComposable(({ scene, camera, renderer }) => {
  const createPointsAroundSphere = (radius, count) => {
    const points = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      points.push(new THREE.Vector3(x, y, z))
    }
    scene.add(points)
  }

  const orbitPointsAroundSphere = (points, radius, count) => {
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      points[i].set(x, y, z)
    }
  }

  // create a sphere or points
  // orbit points individually around sphere at different speeds

  const points = createPointsAroundSphere(1, 1000)
  const points2 = createPointsAroundSphere(1, 1000)
  const points3 = createPointsAroundSphere(1, 1000)

  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const geometry2 = new THREE.BufferGeometry().setFromPoints(points2)
  const geometry3 = new THREE.BufferGeometry().setFromPoints(points3)

  const material = new THREE.PointsMaterial({
    color: 0x000000,
    size: 0.01,
    sizeAttenuation: true,
  })

  const material2 = new THREE.PointsMaterial({
    color: 0x000000,
    size: 0.01,
    sizeAttenuation: true,
  })

  const material3 = new THREE.PointsMaterial({
    color: 0x000000,
    size: 0.01,
    sizeAttenuation: true,
  })

  const pointsMesh = new THREE.Points(geometry, material)
  const pointsMesh2 = new THREE.Points(geometry2, material2)
  const pointsMesh3 = new THREE.Points(geometry3, material3)

  const group = new THREE.Group()
  group.add(pointsMesh)
  group.add(pointsMesh2)
  group.add(pointsMesh3)

  const update = () => {
    orbitPointsAroundSphere(points, 1, 1000)
    orbitPointsAroundSphere(points2, 1, 1000)
    orbitPointsAroundSphere(points3, 1, 1000)
    geometry.attributes.position.needsUpdate = true
    geometry2.attributes.position.needsUpdate = true
    geometry3.attributes.position.needsUpdate = true
  }

  return {
    group,
    update,
  }
})
