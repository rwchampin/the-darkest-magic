import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import DarkParticle from '~~/composables/darkMouse/DarkParticle'

export const usePoints = ({ scene, camera, renderer, nuxtApp }) => {
  const { gsap, THREE, chroma } = nuxtApp.$plugins

  const MAX_PARTICLES = 5000
  const positions = []
  const sizes = []
  const colors = []
  const vectors = []

  const colorList = chroma.scale(['black', 'darkblue', 'lightblue', 'violet']).colors(20)
  const geometry = new THREE.BufferGeometry()
  let posAttribute, ps, particles

  const PARTICLE_SIZE = 20
  const dotTexture = new THREE.TextureLoader().load('~/assets/particles/dotTexture.png')
  let raycaster, intersects
  let pointer, INTERSECTED
  let shaderMaterial = new THREE.ShaderMaterial({
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
    blending: THREE.AdditiveBlending,
    map: new THREE.TextureLoader().load(dotTexture),

  })
  shaderMaterial = new THREE.PointsMaterial({
    sizeAttenuation: true,
    depthTest: false,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    map: new THREE.TextureLoader().load(dotTexture),
  })
  //* ***************************************************************/
  //* ogl
  //* ***************************************************************/
  const vertex = /* glsl */ `
                attribute vec3 position;
                attribute vec4 random;
                uniform mat4 modelMatrix;
                uniform mat4 viewMatrix;
                uniform mat4 projectionMatrix;
                uniform float uTime;
                varying vec4 vRandom;
                void main() {
                    vRandom = random;
                    
                    // positions are 0->1, so make -1->1
                    vec3 pos = position * 2.0 - 1.0;
                    
                    // Scale towards camera to be more interesting
                    pos.z *= 10.0;
                    
                    // modelMatrix is one of the automatically attached uniforms when using the Mesh class
                    vec4 mPos = modelMatrix * vec4(pos, 1.0);
                    // add some movement in world space
                    float t = uTime * 0.6;
                    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
                    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
                    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
                    
                    // get the model view position so that we can scale the points off into the distance
                    vec4 mvPos = viewMatrix * mPos;
                    gl_PointSize = 300.0 / length(mvPos.xyz) * (random.x + 0.1);
                    gl_Position = projectionMatrix * mvPos;
                }
            `

  const fragment = /* glsl */ `
                precision highp float;
                uniform float uTime;
                varying vec4 vRandom;
                void main() {
                    vec2 uv = gl_PointCoord.xy;
                    
                    float circle = smoothstep(0.5, 0.4, length(uv - 0.5)) * 0.8;
                    
                    gl_FragColor.rgb = 0.8 + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28) + vec3(0.1, 0.0, 0.3);
                    gl_FragColor.a = circle;
                }
            `

  const testMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    transparent: true,
    depthTest: false,
  })
  const createParticles = () => {
    const radius = 1.5
    let theta = 0; let phi = 0
    const color = new THREE.Color()
    for (let i = 0; i < MAX_PARTICLES; i++) {
      theta = 2 * Math.PI * Math.random()
      phi = Math.acos(2 * Math.random() - 1)

      const px = radius * Math.cos(theta) * Math.sin(phi)
      const py = radius * Math.sin(theta) * Math.sin(phi)
      // const pz = 0
      const pz = radius * Math.cos(phi)

      const vertex = new DarkParticle(px, py, pz)
      vectors[i] = vertex

      positions.push(vertex.position.x, vertex.position.y, vertex.position.z)
      sizes.push(Math.random() * 0.1)

      const hex = colorList[Math.round(Math.random() * colorList.length)]
      const rgb = color.setHex(hex).toArray()
      colors.push(rgb.r, rgb.g, rgb.b)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

    particles = new THREE.Points(geometry, testMaterial)

    scene.add(particles)
    posAttribute = particles.geometry.getAttribute('position')
    ps = posAttribute.array
  }

  const updateParticles = () => {
    // loop over vectors and animate around sphere
    for (let i = 0; i < vectors.length; i++) {
      const vector = vectors[i]
      if (Date.now() < vector.delay)
        continue

      vector.applyAxisAngle()

      // if (i % 22 === 0) {
      //   ps[i * 3] = vector.position.x + Utils.noise.simplex3(vector.position.x, vector.position.y, vector.position.z) * 0.1
      //   ps[i * 3 + 1] = vector.position.y + Utils.noise.simplex3(vector.position.x, vector.position.y, vector.position.z) * 0.1
      //   ps[i * 3 + 2] = vector.position.z + Utils.noise.simplex3(vector.position.x, vector.position.y, vector.position.z) * 0.1
      // }
      // else {
      ps[i * 3] = vector.position.x
      ps[i * 3 + 1] = vector.position.y
      ps[i * 3 + 2] = vector.position.z + 10
      // }
    }

    particles.geometry.getAttribute('position').needsUpdate = true
  }

  function render() {
    particles.rotation.x += 0.0005
    particles.rotation.y += 0.001

    const geometry = particles.geometry
    const attributes = geometry.attributes

    raycaster.setFromCamera(pointer, camera)

    intersects = raycaster.intersectObject(particles)

    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].index) {
        attributes.size.array[INTERSECTED] = PARTICLE_SIZE

        INTERSECTED = intersects[0].index

        attributes.size.array[INTERSECTED] = PARTICLE_SIZE * 1.25
        attributes.size.needsUpdate = true
      }
    }
    else if (INTERSECTED !== null) {
      attributes.size.array[INTERSECTED] = PARTICLE_SIZE
      attributes.size.needsUpdate = true
      INTERSECTED = null
    }

    renderer.render(scene, camera)
  }
  createParticles()
  gsap.ticker.add(updateParticles)
}

