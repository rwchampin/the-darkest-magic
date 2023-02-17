import * as THREE from 'three'
import gsap from 'gsap'
import chroma from 'chroma-js'

import dotTexture from '~/assets/particles/dotTexture.png?url'

export const usePoints = ({ scene, camera, renderer, nuxtApp }) => {
  const particlesDelay = 50
  let material; const positions = []; const sizes = []; const colors = []; let particles
  const clock = new THREE.Clock()
  scene.fog = new THREE.FogExp2(0x000000, 0.001)
  const colorList = chroma.scale(['black', 'darkblue', 'lightblue', 'violet']).colors(20)
  const geometry = new THREE.BufferGeometry()

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xFF0000) },
      pointTexture: { value: new THREE.TextureLoader().load(dotTexture) },
    },
    vertexShader: `
           attribute float size;
			attribute vec3 customColor;

			varying vec3 vColor;

			void main() {

				vColor = customColor;

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

				gl_PointSize = size * ( 300.0 / -mvPosition.z );

				gl_Position = projectionMatrix * mvPosition;

			}

        `,
    fragmentShader: `
            uniform vec3 color;
			uniform sampler2D pointTexture;

			varying vec3 vColor;

			void main() {

				gl_FragColor = vec4( color * vColor, 1.0 );
				gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

			}
        `,
    sizeAttenuation: true,
    depthTest: false,
    transparent: true,
    vertexColors: true,
    // map: texture
  })
  material = new THREE.PointsMaterial({
    // size: .1,
    sizeAttenuation: true,
    depthTest: false,
    transparent: true,
    vertexColors: true,
    // map: texture
  })
  const radius = 1.5
  const tits = []
  let theta = 0; let phi = 0
  for (let i = 0; i < 50; i++) {
    const t = clock.getElapsedTime() * 0.0001
    theta = 2 * Math.PI * Math.random()
    phi = Math.acos(2 * Math.random() - 1)

    const px = radius * Math.cos(theta) * Math.sin(phi)
    const py = radius * Math.sin(theta) * Math.sin(phi)
    const pz = radius * Math.cos(phi)

    const vertex = new THREE.Vector3(px, py, pz)
    vertex.delay = Date.now() + (particlesDelay * i)
    vertex.rotationAxis = new THREE.Vector3(0, Math.random() * 2 - 1, Math.random() * 2 - 1)
    vertex.rotationAxis.normalize()

    tits.push(vertex)

    positions.push(vertex.x, vertex.y, vertex.z)
    sizes.push(Math.random() * 5)
    const hex = colorList[Math.round(Math.random() * colorList.length)]
    const rgb = new THREE.Color(hex)
    colors.push(rgb.r, rgb.g, rgb.b)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
  geometry.computeBoundingSphere()

  const positionAttribute = geometry.getAttribute('position')
  positionAttribute.setUsage(THREE.DynamicDrawUsage)

  const sizeAttribute = geometry.getAttribute('size')
  sizeAttribute.setUsage(THREE.DynamicDrawUsage)

  particles = new THREE.Points(geometry, shaderMaterial)
  scene.add(particles)

  const posAttribute = particles.geometry.getAttribute('position')
  const c = posAttribute.count
  const ps = posAttribute.array

  // write function to update vectors around the sphere
  const updateParticleOrbit = (particle, index) => {
    const t = clock.getElapsedTime() * 0.0001
    theta = 2 * Math.PI * Math.random()
    phi = Math.acos(2 * Math.random() - 1)

    const px = radius * Math.cos(theta) * Math.sin(phi)
    const py = radius * Math.sin(theta) * Math.sin(phi)
    const pz = radius * Math.cos(phi)

    const vertex = new THREE.Vector3(px, py, pz)
    vertex.delay = Date.now() + (particlesDelay * i)
    vertex.rotationAxis = new THREE.Vector3(0, Math.random() * 2 - 1, Math.random() * 2 - 1)
    vertex.rotationAxis.normalize()
  }

  const updateParticles = () => {
    const posAttribute = particles.geometry.getAttribute('position')
    const c = posAttribute.count
    const ps = posAttribute.array

    for (let i = 0; i < c; i++) {
      const x = ps[i * 3]
      const y = ps[i * 3 + 1]
      const z = ps[i * 3 + 2]

      const r = Math.sqrt(x * x + y * y + z * z)
      const theta = Math.atan2(y, x)
      const phi = Math.acos(z / r)

      const newTheta += theta * 0.0001
      const newPhi += phi * 0.0001

      ps[i * 3] = 5 * Math.cos(newTheta + i) * Math.sin(newPhi + i)
      ps[i * 3 + 1] = 5 * Math.sin(newTheta + i) * Math.sin(newPhi + i)
      ps[i * 3 + 2] = 5 * Math.cos(newPhi + i)
    }

    particles.geometry.attributes.position.needsUpdate = true
  }

  const updateSizes = () => {
    const sizes = particles.geometry.attributes.size.array
    for (let i = 0; i < sizes.length; i++)
      sizes[i] = Math.random() * 0.1

    particles.geometry.attributes.size.needsUpdate = true
  }

  return updateParticles
}

