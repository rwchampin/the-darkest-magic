<script setup>
onMounted(() => {
  nextTick(() => {
    const c = document.getElementById('canv')
    const $ = c.getContext('2d')
    let att_ = true
    const fric = 0.009
    let dots_

    const w = c.width = window.innerWidth
    const h = c.height = window.innerHeight
    $.globalCompositeOperation = 'lighter'

    const Sys = function (w, h) {
      this.num = 400
      this.dots_ = []
      this.rep_ = false
      this.w = w
      this.h = h
      this.ms = {
        x: 0,
        y: 0,
      }
    }

    Sys.prototype.go = function () {
      for (let i = 0; i < this.num; i++)
        this.dots_.push(new Dot())

      this.spawn()
    }

    Sys.prototype.spawn = function () {
      let p
      for (let i = 0; i < this.num; i++) {
        p = this.dots_[i]
        p.x = p.ax = Math.random() * this.w
        p.y = p.ay = Math.random() * this.h
      }
    }

    Sys.prototype.step = function () {
      let p; let dx; let dy; let _sqd; let _frc; let _ang
      const msX = this.ms.x
      const msY = this.ms.y

      for (let i = 0; i < this.num; i++) {
        p = this.dots_[i]
        dx = msX - p.ax
        dy = msY - p.ay
        _sqd = dx * dx + dy * dy
        if (_sqd < p.minSqd) {
          dx = msX - p.x
          dy = msY - p.y
          _sqd = dx * dx + dy * dy
          _frc = _sqd / p.minSqd
          _frc = _frc < 0 ? 0 : _frc > 1 ? 1 : _frc
          _ang = Math.atan2(dy, dx)
          if (this.rep_)
            _frc = -_frc

          p.fx += Math.cos(_ang) * _frc
          p.fy += Math.sin(_ang) * _frc
        }
        p.fx += (p.ax - p.x) * fric * p.mass
        p.fy += (p.ay - p.y) * fric * p.mass
        p.vx += p.fx / p.mass
        p.vy += p.fy / p.mass
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99
        p.fx = p.fy = 0
      }
    }

    Sys.prototype.draw = function ($) {
      let p
      for (let i = 0; i < this.num; i++) {
        p = this.dots_[i]
        $.beginPath()
        $.arc(p.x, p.y, p.mass * 8, 0, Math.PI * 2, false)
        $.closePath()
        $.fillStyle = `hsla(${i * 5},70%, 50%,1)`
        $.fill()
      }
    }

    const Dot = function (x, y) {
      this.x = this.ax = x || 0
      this.y = this.ay = y || 0
      this.fx = 0
      this.fy = 0
      this.vx = 0
      this.vy = 0
      this.mass = 0.25 + Math.random() * 1.25
      this.minDist = 100 + Math.random() * 100
      this.minSqd = this.minDist * this.minDist
    }
    const upd = function () {
      if (att_ = !att_) {
        dots_.step()
      }
      else {
        c.width = c.width
        dots_.draw($)
      }
    }

    const run = function () {
      window.requestAnimationFrame(run)
      upd()
    }
    dots_ = new Sys(c.width, c.height)
    dots_.go()
    run()

    /* _________Events_________ */
    window.addEventListener('resize', () => {
      c.width = dots_.w = window.innerWidth
      c.height = dots_.h = window.innerHeight
      dots_.spawn()
    })

    window.addEventListener('mousedown', () => {
      dots_.rep_ = !dots_.rep_
    })

    window.addEventListener('mouseup', () => {
      dots_.rep_ = !dots_.rep_
    })

    window.addEventListener('mousemove', (e) => {
      dots_.ms.x = e.clientX
      dots_.ms.y = e.clientY
    })
    window.addEventListener('touchmove', (e) => {
      e.preventDefault()
      dots_.ms.x = e.touches[0].clientX
      dots_.ms.y = e.touches[0].clientY
    })
    window.addEventListener('touchstart', (e) => {
      e.preventDefault()
      dots_.ms.x = e.touches[0].clientX
      dots_.ms.y = e.touches[0].clientY
      dots_.rep_ = !dots_.rep_
    })
    window.addEventListener('touchend', (e) => {
      e.preventDefault()
      dots_.rep_ = !dots_.rep_
    })

    console.log('With ❤ Always, @tmrDevelops')
  })
})
</script>

<template>
  <canvas id="canv" />
  <h1>GloppyGoop</h1>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="goop">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -9" />
      </filter>
    </defs>
  </svg>
</template>

<style scoped>
canvas {
    position: absolute;
    -webkit-filter: url("#goop");
    filter: url("#goop");
    z-index: -1;
}
</style>
