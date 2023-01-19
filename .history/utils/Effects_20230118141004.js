import * as THREE from 'three'

export const Effects = {
  createSphereFromPoints: (points, radius, color) => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(points.length * 3)
    const colors = new Float32Array(points.length * 3)
    const colorObj = new THREE.Color(color)
    for (let i = 0; i < points.length; i++) {
      positions[i * 3] = points[i].x
      positions[i * 3 + 1] = points[i].y
      positions[i * 3 + 2] = points[i].z
      colors[i * 3] = colorObj.r
      colors[i * 3 + 1] = colorObj.g
      colors[i * 3 + 2] = colorObj.b
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({
      size: radius,
      vertexColors: true,
    })
    const sphere = new THREE.Points(geometry, material)
    return sphere
  },
  // createGroundFogShader() {
  //   const material = new THREE.ShaderMaterial({
  //     uniforms: {
  //       time: { value: 0 },
  //       resolution: { value: new THREE.Vector2() },
  //     },
  //     vertexShader: `

  //               uniform float time;
  //               uniform vec2 resolution;

  //               varying vec2 vUv;

  //               void main() {
  //                   vUv = uv;
  //                   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  //               }
  //           `,
  //     fragmentShader: `
  //               uniform float time;
  //               uniform vec2 resolution;

  //               varying vec2 vUv;

  //               void main() {
  //                   vec2 st = gl_FragCoord.xy / resolution.xy;
  //                   vec3 color = vec3(0.0);
  //                   color.r = smoothstep(0.0, 0.1, st.y);
  //                   color.g = smoothstep(0.0, 0.1, st.y);
  //                   color.b = smoothstep(0.0, 0.1, st.y);
  //                   gl_FragColor = vec4(color, 1.0);
  //               }
  //           `,
  //   })
  //   return material
  // },
  // create2dNoise: (width, height) => {
  //   /***********
  //    * 2D Noise
  //    * ********
  //    * width: width of the noise texture
  //    * height: height of the noise texture
  //    * scale: scale of the noise
  //    * */
  //   const noise = new Float32Array(width * height)
  //   for (let i = 0; i < width; i++) {
  //     for (let j = 0; j < height; j++)
  //       noise[i + j * width] = Math.random()
  //   }
  //   return noise
  // },
  // createNoise: (width, height, depth) => {
  //   /***********
  //    * 3D Noise
  //    * ********
  //    * width: width of the noise texture
  //    * height: height of the noise texture
  //    * depth: depth of the noise texture
  //    * scale: scale of the noise
  //    *
  //    */
  //   const noise = new Float32Array(width * height * depth)
  //   for (let i = 0; i < width; i++) {
  //     for (let j = 0; j < height; j++) {
  //       for (let k = 0; k < depth; k++)
  //         noise[i + j * width + k * width * height] = Math.random()
  //     }
  //   }
  //   return noise
  // },
  // createNoiseSphereGeometry(width, height, depth, scale) {
  //   const geometry = new THREE.SphereGeometry(1, width, height)
  //   const noise = Effects.createNoise(width, height, depth, scale)
  //   Noise.addNoiseToBufferGeometry(geometry, noise, width, height, depth, scale)
  //   return geometry
  // },
  // createNoiseBoxGeometry(width, height, depth, scale) {
  //   const geometry = new THREE.BoxGeometry(1, 1, 1, width, height, depth)
  //   const noise = Noise.createNoise(width, height, depth, scale)
  //   Noise.addNoiseToBufferGeometry(geometry, noise, width, height, depth, scale)
  //   return geometry
  // },
  createWobblyMaterial() {
    let uniforms
    const material = new THREE.MeshStandardMaterial({
      color: 0x00FF00,
      roughness: 0.5,
      metalness: 0.5,
      flatShading: true,
    })
    material.onBeforeCompile = (shader) => {
      uniforms = shader.uniforms
      shader.uniforms.time = { value: 0 }
      shader.vertexShader = `
        uniform float time;
        ${shader.vertexShader}
        `
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        transformed += normal * sin(position.y * 10.0 + time) * 0.05;
        `,
      )
    }

    debugger
    return {
      material,
      uniforms,
    }
  },
  // createTwistingCubeMesh() {
  //   const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)
  //   const material = new THREE.MeshStandardMaterial({
  //     color: 0x00FF00,
  //     roughness: 0.5,
  //     metalness: 0.5,
  //     flatShading: true,
  //   })
  //   material.onBeforeCompile = (shader) => {
  //     shader.uniforms.time = { value: 0 }
  //     shader.vertexShader = `
  //       uniform float time;
  //       ${shader.vertexShader}
  //       `
  //     shader.vertexShader = shader.vertexShader.replace(
  //       '#include <begin_vertex>',
  //       `
  //       #include <begin_vertex>
  //       transformed += normal * sin(position.y * 10.0 + time) * 0.05;
  //       `,
  //     )
  //   }
  //   const mesh = new THREE.Mesh(geometry, material)
  //   return mesh
  // },
  // createTwistShader() {
  //   const material = new THREE.ShaderMaterial({
  //     uniforms: {
  //       time: { value: 0 },
  //       resolution: { value: new THREE.Vector2() },
  //     },
  //     vertexShader: `
  //               uniform float time;
  //               uniform vec2 resolution;
  //               varying vec2 vUv;
  //               void main() {
  //                   vUv = uv;
  //                   vec3 pos = position;
  //                   pos.x += sin(position.y * 10.0 + time) * 0.05;
  //                   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  //               }
  //           `,
  //     fragmentShader: `
  //               uniform vec2 resolution;
  //               varying vec2 vUv;
  //               void main() {
  //                   gl_FragColor = vec4(vUv, 0.0, 1.0);
  //               }
  //           `,
  //   })
  //   return material
  // },
  // createTwistingCubeMesh() {
  //   const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)
  //   const material = this.createTwistShader()
  //   const mesh = new THREE.Mesh(geometry, material)
  //   return mesh
  // },
  // createCirclePoints(radius, count) {
  //   const points = []
  //   for (let i = 0; i < count; i++) {
  //     const angle = (i / count) * Math.PI * 2
  //     const x = Math.cos(angle) * radius
  //     const y = Math.sin(angle) * radius
  //     points.push(new THREE.Vector2(x, y))
  //   }
  //   return points
  // },
  // createCircleGeometry(radius, count) {
  //   const points = this.createCirclePoints(radius, count)
  //   const geometry = new THREE.LatheGeometry(points, 32)
  //   return geometry
  // },
  // createCircleMesh(radius, count) {
  //   const geometry = this.createCircleGeometry(radius, count)
  //   const material = new THREE.MeshStandardMaterial({
  //     color: 0x00FF00,
  //     roughness: 0.5,
  //     metalness: 0.5,
  //     flatShading: true,
  //   })
  //   const mesh = new THREE.Mesh(geometry, material)
  //   return mesh
  // },

  // addNoiseToBufferGeometry(geometry, noise, width, height, depth, scale) {
  //   const vertices = geometry.attributes.position.array
  //   for (let i = 0; i < vertices.length; i += 3) {
  //     const x = vertices[i]
  //     const y = vertices[i + 1]
  //     const z = vertices[i + 2]
  //     const nx = (x / width + 0.5) * scale
  //     const ny = (y / height + 0.5) * scale
  //     const nz = (z / depth + 0.5) * scale
  //     const n = Noise.trilinearInterpolation(noise, nx, ny, nz, width, height, depth)
  //     vertices[i] += n * 0.1
  //     vertices[i + 1] += n * 0.1
  //     vertices[i + 2] += n * 0.1
  //   }
  //   geometry.attributes.position.needsUpdate = true
  // },
}
