<script setup>
onMounted(() => {
  const coo = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  const colors = {
    bg: '#210019',
    bg2: '#000000',
    planetFill: '#F092DD',
    planetFill2: '#392F5A',
    planetStroke: '#995D8D',
    cell: [
      {
        fill: ['#FFE1F9', '#FFDAF8', '#FFD3F6'],
        stroke: ['#5D5478', '#4B4169', '#392F5A'],
      },
      {
        fill: ['#EA94D4', '#F3C1E6', '#B7489A'],
        stroke: ['#3B1738', '#662862', '#A84FA2'],
      },
      {
        fill: ['#DB2955', '#E46383', '#A01E3E'],
        stroke: ['#3C0C18'],
      },
    ],
  }

  const draw = SVG()
    .addTo('#container')
    .size('100%', '100%')
    .attr({ viewbox: `0 0${coo.width} ${coo.height}` })

  const bg = draw.gradient('linear', (add) => {
    add.stop(0, colors.bg2)
    add.stop(0.25, colors.bg)
    add.stop(0.75, colors.bg)
    add.stop(1, colors.bg2)
  }).from(0, 0).to(0, 1)

  const rect = draw.rect(coo.width, coo.height).fill(colors.bg).back()

  function randBetween(a, b) {
    return Math.floor(Math.random() * b) + a
  }

  function ellipseToPath(cx, cy, rx, ry) {
    const output = `M${(cx - rx).toString()},${cy.toString()}`
    output += `a${rx.toString()},${ry.toString()} 0 1,0 ${(2 * rx).toString()},0`
    output += `a${rx.toString()},${ry.toString()} 0 1,0 ${(-2 * rx).toString()},0`
    return output
  }

  const planet = draw.path(ellipseToPath(coo.width / 2, coo.height / 2, 50, 50))
    .attr({
      'stroke': colors.planetStroke,
      'stroke-width': 4,
    })
    .css({ cursor: 'pointer' })

  const planetGradient = draw.gradient('radial', (add) => {
    add.stop(0, colors.planetFill)
    add.stop(1, colors.planetFill2)
  })

  planet.fill(planetGradient)

  const planetRunner = planet.animate({ duration: 600 })
    .attr({ d: ellipseToPath(coo.width / 2, coo.height / 2, 45, 55) })
    .animate({ duration: 600 })
    .attr({ d: ellipseToPath(coo.width / 2, coo.height / 2, 55, 45) })
    .loop(true, true, 0)
    .ease('-')

  planet
    .on('mouseover', function () {
      document.getElementById('instructions').style.opacity = '0'
      this.timeline().speed(2.5)
      swarm()
    })
    .on('mouseout', function () {
      this.timeline().speed(1)
      clearInterval(spam)
    })

  let spam
  function swarm() {
    spam = setInterval(asteroidGen, 15)
  }

  function asteroidGen() {
    const x = randBetween(55, 250)
    const y = randBetween(55, 250)
    const rad = randBetween(3, 20)
    const dur = randBetween(7000, 9000)
    const op = randBetween(0, 10) / 10
    const theme = randBetween(0, colors.cell.length - 1)
    const stroke = colors.cell[theme].stroke[randBetween(0, colors.cell[theme].stroke.length - 1)]
    const fill = colors.cell[theme].fill[randBetween(0, colors.cell[theme].fill.length - 1)]
    const path = draw.path(ellipseToPath(coo.width / 2, coo.height / 2, x, y))
      .attr({
        stroke: 'transparent',
        fill: 'transparent',
      })
    const ln = path.length()
    const asteroid = draw.circle(rad).attr({
      'fill': fill,
      'stroke': stroke,
      'stroke-width': 2,
      'cx': coo.width / 2,
      'cy': coo.height / 2,
      'opacity': op,
      'stroke-opacity': 1,
    })

    asteroid.animate({
      duration: 500,
    })
      .attr({
        cx: path.pointAt(0).x,
        cy: path.pointAt(0).y,
      })

    asteroid.animate({
      when: 'now',
      duration: dur,
    })
      .during((pos) => {
        const p = path.pointAt(pos * ln)
        asteroid.center(p.x, p.y)
      })
      .loop(randBetween(1, 2), false)
      .after(() => {
        asteroid.animate({
          duration: 50,
          opacity: 0,
        }).attr({ r: 0 }).after(() => {
          asteroid.parent().remove()
        })
      })

    const grp = draw.group()

    grp.add(path).add(asteroid).rotate(randBetween(1, 360), coo.width / 2, coo.height / 2)
    grp.backward()
    if (Math.random() < 0.5)
      grp.flip('x', { x: coo.width / 2, y: coo.height / 2 })
  }
})
</script>

<template>
  <main class="page-experiments-cell-hover">
    <nuxt />
  </main>
</template>

<style scoped>

</style>
