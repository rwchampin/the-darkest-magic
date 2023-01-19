export const Noise = {
  // https://gist.github.com/banksean/304522
  //
  // Simplex noise in 2D, 3D and 4D
  simplex2(xin, yin) {
    const grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]]
    const p = [151, 160, 137, 91, 90, 15,
      131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
      190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88,
      237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146,
      158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
      65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188,
      159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126,
      255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
      152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 90, 244, 176, 116,
      188, 167, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]
    // To remove the need for index wrapping, double the permutation table length
    const perm = new Array(512)
    const gradP = new Array(512)
    // This isn't a very good seeding function, but it works ok. It supports 2^16
    // different seed values. Write something better if you need more seeds.
    const seed = function (seed) {
      if (seed > 0 && seed < 1) {
        // Scale the seed out
        seed *= 65536
      }
      seed = Math.floor(seed)
      if (seed < 256)
        seed |= seed << 8

      for (let i = 0; i < 256; i++) {
        var v
        if (i & 1)
          v = p[i] ^ (seed & 255)
        else
          v = p[i] ^ ((seed >> 8) & 255)

        perm[i] = perm[i + 256] = v
        gradP[i] = gradP[i + 256] = grad3[v % 12]
      }
    }
    seed(0)
    // Skewing and unskewing factors for 2, 3, and 4 dimensions
    const F2 = 0.5 * (Math.sqrt(3) - 1)
    const G2 = (3 - Math.sqrt(3)) / 6
    // 2D simplex noise
    const simplex2 = function (xin, yin) {
      let n0, n1, n2 // Noise contributions from the three corners
      // Skew the input space to determine which simplex cell we're in
      const s = (xin + yin) * F2 // Hairy factor for 2D
      let i = Math.floor(xin + s)
      let j = Math.floor(yin + s)
      const t = (i + j) * G2
      const x0 = xin - i + t // The x,y distances from the cell origin, unskewed.
      const y0 = yin - j + t
      // For the 2D case, the simplex shape is an equilateral triangle.
      // Determine which simplex we are in.
      let i1, j1 // Offsets for second (middle) corner of simplex in (i,j) coords
      if (x0 > y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        i1 = 1; j1 = 0
      }
      else { // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        i1 = 0; j1 = 1
      }
      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
      // c = (3-sqrt(3))/6
      const x1 = x0 - i1 + G2 // Offsets for middle corner in (x,y) unskewed coords
      const y1 = y0 - j1 + G2
      const x2 = x0 - 1.0 + 2.0 * G2 // Offsets for last corner in (x,y) unskewed coords
      const y2 = y0 - 1.0 + 2.0 * G2
      // Work out the hashed gradient indices of the three simplex corners
      i &= 255
      j &= 255
      const gi0 = gradP[i + perm[j]]
      const gi1 = gradP[i + i1 + perm[j + j1]]
      const gi2 = gradP[i + 1 + perm[j + 1]]
      // Calculate the contribution from the three corners
      let t0 = 0.5 - x0 * x0 - y0 * y0
      if (t0 < 0) {
        n0 = 0.0
      }
      else {
        t0 *= t0
        n0 = t0 * t0 * dot2(gi0, x0, y0) // (x,y) of grad3 used for 2D gradient
      }
      let t1 = 0.5 - x1 * x1 - y1 * y1
      if (t1 < 0) {
        n1 = 0.0
      }
      else {
        t1 *= t1
        n1 = t1 * t1 * dot2(gi1, x1, y1)
      }
      let t2 = 0.5 - x2 * x2 - y2 * y2
      if (t2 < 0) {
        n2 = 0.0
      }
      else {
        t2 *= t2
        n2 = t2 * t2 * dot2(gi2, x2, y2)
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to return values in the interval [-1,1].
      return 70.0 * (n0 + n1 + n2)
    }
    // ##### Perlin noise stuff
    function fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10)
    }
    function lerp(a, b, t) {
      return (1 - t) * a + t * b
    }
    // 2D Perlin Noise
    const perlin2 = function (x, y) {
      // Find unit grid cell containing point
      let X = Math.floor(x); let Y = Math.floor(y)
      // Get relative xy coordinates of point within that cell
      x = x - X; y = y - Y
      // Wrap the integer cells at 255 (smaller integer period can be introduced here)
      X = X & 255; Y = Y & 255
      // Calculate noise contributions from each of the four corners
      const n00 = dot2(gradP[X + perm[Y]], x, y)
      const n01 = dot2(gradP[X + perm[Y + 1]], x, y - 1)
      const n10 = dot2(gradP[X + 1 + perm[Y]], x - 1, y)
      const n11 = dot2(gradP[X + 1 + perm[Y + 1]], x - 1, y - 1)
      // Compute the fade curve value for x
      const u = fade(x)
      // Interpolate the four results
      return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
        fade(y))
    }
    // ##### Perlin noise stuff

    // ##### Voronoi stuff
    function dist2(v, w) {
      return (v.x - w.x) ** 2 + (v.y - w.y) ** 2
    }
    function distToSegmentSquared(p, v, w) {
      const l2 = dist2(v, w)
      if (l2 == 0)
        return dist2(p, v)
      let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2
      t = Math.max(0, Math.min(1, t))
      return dist2(p, {
        x: v.x + t * (w.x - v.x),
        y: v.y + t * (w.y - v.y),
      })
    }
    function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)) }
    // 2D Voronoi Noise
    const voronoi2 = function (x, y) {
      let n = Math.floor(x) + Math.floor(y) * 57
      n = (n << 13) ^ n
      const nn = (n * (n * n * 15731 + 789221) + 1376312589) & 0x7FFFFFFF
      return 1.0 - (nn / 1073741824.0)
    }
    // 2D Voronoi Noise with distance
    const voronoi2d = function (x, y) {
      const X = Math.floor(x); const Y = Math.floor(y)
      x = x - X; y = y - Y
      let minDist = 99999
      let xCandidate = 0
      let yCandidate = 0
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const xCorner = i + voronoi2(X + i, Y + j)
          const yCorner = j + voronoi2(X + i, Y + j)
          const dist = dist2({ x, y }, { x: xCorner, y: yCorner })
          if (dist < minDist) {
            minDist = dist
            xCandidate = xCorner
            yCandidate = yCorner
          }
        }
      }
      return { distance: Math.sqrt(minDist), x: xCandidate, y: yCandidate }
    }
    // 2D Voronoi Noise with distance and gradient
    const voronoi2g = function (x, y) {
      const X = Math.floor(x); const Y = Math.floor(y)
      x = x - X; y = y - Y
      let minDist = 99999
      let xCandidate = 0
      let yCandidate = 0
      let xGradient = 0
      let yGradient = 0
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const xCorner = i + voronoi2(X + i, Y + j)
          const yCorner = j + voronoi2(X + i, Y + j)
          const xg = xCorner - Math.floor(xCorner)
          const yg = yCorner - Math.floor(yCorner)
          const dist = dist2({ x, y }, { x: xCorner, y: yCorner })
          if (dist < minDist) {
            minDist = dist
            xCandidate = xCorner
            yCandidate = yCorner
            xGradient = xg
            yGradient = yg
          }
        }
      }
      return { distance: Math.sqrt(minDist), x: xCandidate, y: yCandidate, xg: xGradient, yg: yGradient }
    }
    // 2D Voronoi Noise with distance and gradient
    const voronoi2g2 = function (x, y) {
      const X = Math.floor(x); const Y = Math.floor(y)
      x = x - X; y = y - Y
      let minDist = 99999
      let xCandidate = 0
      let yCandidate = 0
      let xGradient = 0
      let yGradient = 0
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const xCorner = i + voronoi2(X + i, Y + j)
          const yCorner = j + voronoi2(X + i, Y + j)
          const xg = xCorner - Math.floor(xCorner)
          const yg = yCorner - Math.floor(yCorner)
          const dist = dist2({ x, y }, { x: xCorner, y: yCorner })
          if (dist < minDist) {
            minDist = dist
            xCandidate = xCorner
            yCandidate = yCorner
            xGradient = xg
            yGradient = yg
          }
        }
      }
      return { distance: Math.sqrt(minDist), x: xCandidate, y: yCandidate, xg: xGradient, yg: yGradient }
    }
    // 2D Voronoi Noise with distance and gradient
    const voronoi2g3 = function (x, y) {
      const X = Math.floor(x); const Y = Math.floor(y)
      x = x - X; y = y - Y
      let minDist = 99999
      let xCandidate = 0
      let yCandidate = 0
      let xGradient = 0
      let yGradient = 0
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const xCorner = i + voronoi2(X + i, Y + j)
          const yCorner = j + voronoi2(X + i, Y + j)
          const xg = xCorner - Math.floor(xCorner)
          const yg = yCorner - Math.floor(yCorner)
          const dist = dist2({ x, y }, { x: xCorner, y: yCorner })
          if (dist < minDist) {
            minDist = dist
            xCandidate = xCorner
            yCandidate = yCorner
            xGradient = xg
            yGradient = yg
          }
        }
      }
      return { distance: Math.sqrt(minDist), x: xCandidate, y: yCandidate, xg: xGradient, yg: yGradient }
    }
  },

}
