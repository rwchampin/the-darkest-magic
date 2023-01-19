export const Noise = {
  createNoise2D(width, height, seed) {
    const noise = new Array(width * height)
    const random = new Random(seed)
    for (let i = 0; i < noise.length; i++)
      noise[i] = random.nextFloat()

    return noise
  },
  createNoise3D(width, height, depth, seed) {
    const noise = new Array(width * height * depth)
    const random = new Random(seed)
    for (let i = 0; i < noise.length; i++)
      noise[i] = random.nextFloat()

    return noise
  },
  createNoise4D(width, height, depth, w, seed) {
    const noise = new Array(width * height * depth * w)
    const random = new Random(seed)
    for (let i = 0; i < noise.length; i++)
      noise[i] = random.nextFloat()

    return noise
  },
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
