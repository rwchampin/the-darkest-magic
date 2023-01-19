if (!window.Float32Array)
  window.Float32Array = Array

let WIDTH = 800 // px
let HEIGHT = 600
let NPARTICLES = 10000
const CELLSIZE = 20
const CELLSIZE2 = CELLSIZE / 2
const canvas = document.getElementById('c')
let screenRatio = 1.0

if (navigator.userAgent.match(/iPad/i)) {
  WIDTH = 320
  HEIGHT = 240
  NPARTICLES /= 5
  screenRatio = WIDTH / 640
  canvas.style.width = '640px'
  canvas.style.height = '480px'
  document.getElementById('d').style.width = canvas.style.width
  document.getElementById('d').style['margin-top'] = '30px'
  document.getElementById('h').style.display = 'none'
}
else if (navigator.userAgent.match(/iPhone|iPod|Android/i)) {
  WIDTH = 320
  HEIGHT = 200
  NPARTICLES /= 5
  screenRatio = WIDTH / window.innerWidth
  canvas.style.width = '100%'
  canvas.style.height = `${innerHeight}px`
  document.getElementById('d').style.width = canvas.style.width
  document.getElementById('d').style.border = 0
  document.getElementById('h').style.display = 'none'
  document.getElementById('header').style.display = 'none'
  // WOW it's that hard to get fullscreen on android
  if (navigator.userAgent.match(/Android/i)) {
    canvas.style.height = '1000px'
    setTimeout(() => {
      window.scrollTo(0, window.innerHeight)
      setTimeout(() => {
        canvas.style.height = `${document.documentElement.clientHeight}px`
      }, 1)
    }, 100)
  }
}

const ctx = canvas.getContext('2d')
const particles = new Float32Array(NPARTICLES * 4)
const flow = new Float32Array(((WIDTH * HEIGHT) / CELLSIZE / CELLSIZE) * 2)
const CELLS_X = WIDTH / 20
const floor = Math.floor

function Particle(x, y) {
  this.x = x
  this.y = y
  this.vx = 0
  this.vy = 0
}

for (var i = 0; i < particles.length;) {
  particles[i++] = Math.random() * WIDTH
  particles[i++] = Math.random() * HEIGHT
  particles[i++] = 0
  particles[i++] = 0
}
for (var i = 0; i < flow.length; i++)
  flow[i] = 0

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
  if (!down || (mx == start.x && my == start.y))
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
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  ctx.fillStyle = 'rgba(100, 100, 255, 0.8)'
  ctx.globalCompositeOperation = 'lighter'
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
    ctx.fillRect(~~x, ~~y, 2, 2)

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

function FPSCounter(ctx) {
  this.t = new Date().getTime() / 1000.0
  this.n = 0
  this.fps = 0.0
  this.draw = function () {
    this.n++
    if (this.n == 10) {
      this.n = 0
      t = new Date().getTime() / 1000.0
      this.fps = Math.round(100 / (t - this.t)) / 10
      this.t = t
    }
    ctx.fillStyle = 'white'
    ctx.fillText(`FPS: ${this.fps}`, 1, 15)
  }
}
const fps = new FPSCounter(ctx)

canvas.width = WIDTH
canvas.height = HEIGHT
