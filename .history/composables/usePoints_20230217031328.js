import * as THREE from 'three'
import chroma from 'chroma-js'
import { Utils } from '~/utils/'

import dotTexture from '~/assets/particles/dotTexture.png?url'

export const usePoints = ({ scene, camera, renderer, nuxtApp }) => {
  const particlesDelay = 50
  const positions = []; const sizes = []; const colors = []

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
    // map: texture,
  })

  const radius = 1.5
  const vectors = []
  let theta = 0; let phi = 0
  for (let i = 0; i < 5000; i++) {
    theta = 2 * Math.PI * Math.random()
    phi = Math.acos(2 * Math.random() - 1)

    const px = radius * Math.cos(theta) * Math.sin(phi)
    const py = radius * Math.sin(theta) * Math.sin(phi)
    const pz = radius * Math.cos(phi)

    const vertex = new THREE.Vector3(px, py, pz)
    vertex.delay = Date.now() * 0.5 + (particlesDelay * i)
    vertex.rotationAxis = new THREE.Vector3(0, Math.random() * 2 - 1, Math.random() * 2 - 1)
    vertex.rotationAxis.normalize()
    vertex.rotationSpeed = Math.random() * 0.1
    vectors.push(vertex)

    positions.push(vertex.x, vertex.y, vertex.z)
    sizes.push(Math.random() * 0.1)
    const hex = colorList[Math.round(Math.random() * colorList.length)]
    const rgb = new THREE.Color(hex)
    colors.push(rgb.r, rgb.g, rgb.b)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

  const particles = new THREE.Points(geometry, shaderMaterial)
  scene.add(particles)

  const posAttribute = particles.geometry.getAttribute('position')
  const ps = posAttribute.array

  const updateParticles = () => {
    // loop over vectors and animate around sphere
    for (let i = 0; i < vectors.length; i++) {
      const vector = vectors[i]
      if (Date.now() < vector.delay)
        continue

      vector.applyAxisAngle(vector.rotationAxis, vector.rotationSpeed)

      if (i % 2 === 0) {
        ps[i * 3] = vector.x + Utils.noise.simplex3(vector.x, vector.y, vector.z) * 0.1
        ps[i * 3 + 1] = vector.y + Utils.noise.simplex3(vector.x, vector.y, vector.z) * 0.1
        ps[i * 3 + 2] = vector.z + Utils.noise.simplex3(vector.x, vector.y, vector.z) * 0.1
      }
      else {
        ps[i * 3] = vector.x
        ps[i * 3 + 1] = vector.y
        ps[i * 3 + 2] = vector.z
      }
    }

    particles.geometry.attributes.position.needsUpdate = true
  }

  return updateParticles
}

