import * as THREE from 'three'


const floor = Math.floor

export class ChaosParticle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.ctx = document.querySelector('.main-canvas-2d').getContext('2d')
    this.color = `#${new THREE.Color().setHSL(0.5 + (Math.random() * 255) / 3 * 0.25, 0.6, 0.7).getHexString()}`
    this.WIDTH = window ? window.innerWidth : undefined
    this.HEIGHT = window ? window.innerHeight : undefined
    this.CELLS_X = WIDTH / 20
    this.particles = new Float32Array(NPARTICLES * 4)
    this.CELLSIZE = 20
    this.flow = new Float32Array(((this.WIDTH * this.HEIGHT) / this.CELLSIZE / this.CELLSIZE) * 2)
    this.init()
  }

  init() {
    for (let i = 0; i < this.particles.length;) {
      this.particles[i++] = Math.random() * this.WIDTH
      this.particles[i++] = Math.random() * this.HEIGHT
      this.particles[i++] = 0
      this.particles[i++] = 0
    }
    for (let g = 0; g < this.flow.length; g++)
      this.flow[g] = 0

    const start = { x: 0, y: 0 }
    let down = false
    this.canvas.onmousedown = function (e) {
      start.x = (e.clientX - this.canvas.offsetLeft) * this.screenRatio
      start.y = e.clientY - this.canvas.offsetTop * this.screenRatio
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
    = (floor(mx / this.CELLSIZE) + floor(my / this.CELLSIZE) * floor(this.WIDTH / this.CELLSIZE)) * 2
      this.flow[ai] += (mx - start.x) * 0.4
      this.flow[ai + 1] += (my - start.y) * 0.4
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
      const w1 = this.WIDTH - 1
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
      this.ctx.globalCompositeOperation = 'source-over'
      this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT)
      this.ctx.fillStyle = 'rgba(100, 100, 255, 0.8)'
      this.ctx.globalCompositeOperation = 'lighter'
      for (let i = 0, l = this.particles.length; i < l; i += 4) {
        x = this.particles[i]
        y = this.particles[i + 1]
        vx = this.particles[i + 2]
        vy = this.particles[i + 3]
        ai = (~~(x / this.CELLSIZE) + ~~(y / this.CELLSIZE) * this.CELLS_X) * 2
        ax = this.flow[ai]
        ay = this.flow[ai + 1]

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
        else if (y > this.HEIGHT) {
          y = this.HEIGHT - 1
          vy *= -1
        }

        this.particles[i] = x
        this.particles[i + 1] = y
        this.particles[i + 2] = vx
        this.particles[i + 3] = vy
        this.flow[ai] = ax
        this.flow[ai + 1] = ay
      }
    }, 33)
  }
}
