
const 
const flow = new Float32Array(((WIDTH * HEIGHT) / CELLSIZE / CELLSIZE) * 2)
const CELLS_X = WIDTH / 20
const floor = Math.floor

export class ChaosParticle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.ctx = document.querySelector('.main-canvas-2d').getContext('2d')
    this.color = `#${new THREE.Color().setHSL(0.5 + (Math.random() * 255) / 3 * 0.25, 0.6, 0.7).getHexString()}`
    this.WIDTH = window.innerWidth
    this.HEIGHT = window.innerHeight
    this.particles = new Float32Array(NPARTICLES * 4)
    this.CELLSIZE = 20
    this.flow = new Float32Array(((this.WIDTH * this.HEIGHT) / this.CELLSIZE / this.CELLSIZE) * 2)
    this.init()
  }

  init() {
    for (let i = 0; i < particles.length;) {
      particles[i++] = Math.random() * WIDTH
      particles[i++] = Math.random() * HEIGHT
      particles[i++] = 0
      particles[i++] = 0
    }
    for (let g = 0; g < flow.length; g++)
      flow[g] = 0

    const start = { x: 0, y: 0 }
    let down = false
    canvas.onmousedown = function (e) {
      start.x = (e.clientX - canvas.offsetLeft) * screenRatio
      start.y = e.clientY - canvas.offsetTop * screenRatio
      down = true
    }
    canvas.ontouchstart = function (e) {
      canvas.onmousedown(e.touches[0])
      return false
    }
    canvas.onmouseup = canvas.ontouchend = function () {
      down = false
    }
    canvas.ontouchmove = function (e) {
      canvas.onmousemove(e.touches[0])
    }

    canvas.onmousemove = function (e) {
      const mx = (e.clientX - canvas.offsetLeft) * screenRatio
      const my = (e.clientY - canvas.offsetTop) * screenRatio
      if (!down || (mx === start.x && my === start.y))
        return
      const ai
    = (floor(mx / CELLSIZE) + floor(my / CELLSIZE) * floor(WIDTH / CELLSIZE)) * 2
      flow[ai] += (mx - start.x) * 0.4
      flow[ai + 1] += (my - start.y) * 0.4
      start.x = mx
      start.y = my
    }

    setInterval(() => {
      let x
      let y
      let vx
      let vy
      const vd = 0.95
      let ax
      let ay
      let ai
      const ad = 0.95
      const ar = 0.004
      const w1 = WIDTH - 1
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
      this.ctx.globalCompositeOperation = 'source-over'
      this.ctx.fillRect(0, 0, WIDTH, HEIGHT)
      this.ctx.fillStyle = 'rgba(100, 100, 255, 0.8)'
      this.ctx.globalCompositeOperation = 'lighter'
      for (let i = 0, l = particles.length; i < l; i += 4) {
        x = particles[i]
        y = particles[i + 1]
        vx = particles[i + 2]
        vy = particles[i + 3]
        ai = (~~(x / CELLSIZE) + ~~(y / CELLSIZE) * CELLS_X) * 2
        ax = flow[ai]
        ay = flow[ai + 1]

        ax = (ax + vx * ar) * ad
        ay = (ay + vy * ar) * ad
        vx = (vx + ax) * vd
        vy = (vy + ay) * vd
        x += vx
        y += vy
        this.ctx.fillRect(~~x, ~~y, 2, 2)

        if (x < 0) {
          vx *= -1
          x = 0
        }
        else if (x > w1) {
          x = w1
          vx *= -1
        }

        if (y < 0) {
          vy *= -1
          y = 0
        }
        else if (y > HEIGHT) {
          y = HEIGHT - 1
          vy *= -1
        }

        particles[i] = x
        particles[i + 1] = y
        particles[i + 2] = vx
        particles[i + 3] = vy
        flow[ai] = ax
        flow[ai + 1] = ay
      }
    }, 33)
  }
}
