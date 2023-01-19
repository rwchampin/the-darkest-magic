export const Noise = {
  createPerlinNoise2D(width, height, seed) {
    const noise = new Array(width * height)
    const random = new Random(seed)
    const gradients = new Array(width * height)
    for (let i = 0; i < gradients.length; i++)
      gradients[i] = new Vector2(random.nextFloat() * 2 - 1, random.nextFloat() * 2 - 1)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const x0 = x - 1
        const x1 = x
        const x2 = x + 1
        const x3 = x + 2
        const y0 = y - 1
        const y1 = y
        const y2 = y + 1
        const y3 = y + 2
        const xs = 0
        const ys = 0
        const xf = x - xs
        const yf = y - ys
        const d00 = gradients[x1 + y1 * width].dot(xf, yf)
        const d01 = gradients[x1 + y2 * width].dot(xf, yf - 1)
        const d02 = gradients[x2 + y1 * width].dot(xf - 1, yf)
        const d03 = gradients[x2 + y2 * width].dot(xf - 1, yf - 1)
        const d10 = gradients[x1 + y0 * width].dot(xf, yf)
        const d11 = gradients[x1 + y3 * width].dot(xf, yf - 1)
        const d12 = gradients[x2 + y0 * width].dot(xf - 1, yf)
        const d13 = gradients[x2 + y3 * width].dot(xf - 1, yf - 1)
        const d20 = gradients[x0 + y1 * width].dot(xf, yf)
        const d21 = gradients[x0 + y2 * width].dot(xf, yf - 1)
        const d22 = gradients[x3 + y1 * width].dot(xf - 1, yf)
        const d23 = gradients[x3 + y2 * width].dot(xf - 1, yf
                    - 1)
        const d30 = gradients[x0 + y0 * width].dot(xf, yf)
        const d31 = gradients[x0 + y3 * width].dot(xf, yf - 1)
        const d32 = gradients[x3 + y0 * width].dot(xf - 1, yf)
        const d33 = gradients[x3 + y3 * width].dot(xf - 1, yf - 1)
        const n0 = Noise.lerp(Noise.lerp(d00, d01, Noise.fade(yf)), Noise.lerp(d02, d03, Noise.fade(yf)), Noise.fade(xf))
        const n1 = Noise.lerp(Noise.lerp(d10, d11, Noise.fade(yf - 1)), Noise.lerp(d12, d13, Noise.fade(yf - 1)), Noise.fade(xf))
        const n2 = Noise.lerp(Noise.lerp(d20, d21, Noise.fade(yf)), Noise.lerp(d22, d23, Noise.fade(yf)), Noise.fade(xf - 1))
        const n3 = Noise.lerp(Noise.lerp(d30, d31, Noise.fade(yf - 1)), Noise.lerp(d32, d33, Noise.fade(yf - 1)), Noise.fade(xf - 1))
        noise[x + y * width] = Noise.lerp(Noise.lerp(n0, n1, Noise.fade(yf)), Noise.lerp(n2, n3, Noise.fade(yf)), Noise.fade(xf))
      }
    }
    return noise
  },
  trilinearInterpolation(noise, x, y, z, width, height, depth) {
    const x0 = Math.floor(x)
    const x1 = x0 + 1
    const y0 = Math.floor(y)
    const y1 = y0 + 1
    const z0 = Math.floor(z)
    const z1 = z0 + 1
    const xd = x - x0
    const yd = y - y0
    const zd = z - z0
    const n000 = Noise.lerp(Noise.lerp(noise[x0 + y0 * width + z0 * width * height], noise[x1 + y0 * width + z0 * width * height], xd), Noise.lerp(noise[x0 + y1 * width + z0 * width * height], noise[x1 + y1 * width + z0 * width * height], xd), yd)
    const n001 = Noise.lerp(Noise.lerp(noise[x0 + y0 * width + z1 * width * height], noise[x1 + y0 * width + z1 * width * height], xd), Noise.lerp(noise[x0 + y1 * width + z1 * width * height], noise[x1 + y1 * width + z1 * width * height], xd), yd)
    const n010 = Noise.lerp(Noise.lerp(noise[x0 + y0 * width + z0 * width * height], noise[x1 + y0 * width + z0 * width * height], xd), Noise.lerp(noise[x0 + y1 * width + z0 * width * height], noise[x1 + y1 * width + z0 * width * height], xd), yd - 1)
    const n011 = Noise.lerp(Noise.lerp(noise[x0 + y0 * width + z1 * width * height], noise[x1 + y0 * width + z1 * width * height], xd), Noise.lerp(noise[x0 + y1 * width + z1 * width * height], noise[x1 + y1 * width + z1 * width * height], xd), yd - 1)
    const n100 = Noise.lerp(Noise.lerp(noise[x0 + y0 * width + z0 * width * height], noise[x1 + y0 * width + z0 * width * height], xd - 1), Noise.lerp(noise[x0 + y1 * width + z0 * width * height], noise[x1 + y1 * width + z0 * width * height], xd - 1), yd)
    const n101 = Noise.lerp(Noise.lerp(noise[x0 + y0 * width + z1 * width * height], noise[x1 + y0 * width + z1 * width * height], xd - 1), Noise.lerp(noise[x0 + y1 * width + z1 * width * height], noise[x1 + y1 * width + z1 * width * height], xd - 1), yd)
    const n110 = Noise.lerp(Noise.lerp(noise[x0 + y0 * width + z0 * width * height], noise[x1 + y0 * width + z0 * width * height], xd - 1), Noise.lerp(noise[x0 + y1 * width + z0 * width * height], noise[x1 + y1 * width + z0 * width * height], xd - 1), yd - 1)
    const n111 = Noise.lerp(Noise.lerp(noise[x0 + y0 * width + z1 * width * height], noise[x1 + y0 * width + z1 * width * height], xd - 1), Noise.lerp(noise[x0 + y1 * width + z1 * width * height], noise[x1 + y1 * width + z1 * width * height], xd - 1), yd - 1)
    return Noise.lerp(Noise.lerp(Noise.lerp(n000, n001, zd), Noise.lerp(n010, n011, zd), yd), Noise.lerp(Noise.lerp(n100, n101, zd), Noise.lerp(n110, n111, zd), yd - 1), xd)
  },
  createNoiseSphereGeometry(width, height, depth, scale) {
    const geometry = new THREE.SphereGeometry(1, width, height)
    const noise = Noise.createNoise(width, height, depth, scale)
    Noise.addNoiseToBufferGeometry(geometry, noise, width, height, depth, scale)
    return geometry
  },
  createNoiseBoxGeometry(width, height, depth, scale) {
    const geometry = new THREE.BoxGeometry(1, 1, 1, width, height, depth)
    const noise = Noise.createNoise(width, height, depth, scale)
    Noise.addNoiseToBufferGeometry(geometry, noise, width, height, depth, scale)
    return geometry
  },
  createWobblyMaterial() {
    const material = new THREE.MeshStandardMaterial({
      color: 0x00FF00,
      roughness: 0.5,
      metalness: 0.5,
      flatShading: true,
    })
    material.onBeforeCompile = (shader) => {
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
    return material
  },
  createTwistingCubeMesh() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)
    const material = new THREE.MeshStandardMaterial({
      color: 0x00FF00,
      roughness: 0.5,
      metalness: 0.5,
      flatShading: true,
    })
    material.onBeforeCompile = (shader) => {
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
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
  },
  createTwistShader() {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() },
      },
      vertexShader: `
                uniform float time;
                uniform vec2 resolution;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    pos.x += sin(position.y * 10.0 + time) * 0.05;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
      fragmentShader: `
                uniform vec2 resolution;
                varying vec2 vUv;
                void main() {
                    gl_FragColor = vec4(vUv, 0.0, 1.0);
                }
            `,
    })
    return material
  },
  createTwistingCubeMesh() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)
    const material = this.createTwistShader()
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
  },
  createCirclePoints(radius, count) {
    const points = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      points.push(new THREE.Vector2(x, y))
    }
    return points
  },
  createCircleGeometry(radius, count) {
    const points = this.createCirclePoints(radius, count)
    const geometry = new THREE.LatheGeometry(points, 32)
    return geometry
  },
  createCircleMesh(radius, count) {
    const geometry = this.createCircleGeometry(radius, count)
    const material = new THREE.MeshStandardMaterial({
      color: 0x00FF00,
      roughness: 0.5,
      metalness: 0.5,
      flatShading: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
  },

  addNoiseToBufferGeometry(geometry, noise, width, height, depth, scale) {
    const vertices = geometry.attributes.position.array
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]
      const z = vertices[i + 2]
      const nx = (x / width + 0.5) * scale
      const ny = (y / height + 0.5) * scale
      const nz = (z / depth + 0.5) * scale
      const n = Noise.trilinearInterpolation(noise, nx, ny, nz, width, height, depth)
      vertices[i] += n * 0.1
      vertices[i + 1] += n * 0.1
      vertices[i + 2] += n * 0.1
    }
    geometry.attributes.position.needsUpdate = true
  },
},
