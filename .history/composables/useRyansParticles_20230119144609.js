export const useRyansParticles = () => {


  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js'
  document.head.appendChild(script)

  const experience = new Experience({
    targetElement: document.querySelector('.main-canvas-3d'),
    ctx: document.querySelector('.main-canvas-2d'),
  })

  const canvas = experience.canvas2d
  const ctx = experience.ctx

  const display = new Display(canvas)
  display.init()
  const particleSystem = new ParticleSystem().init(display)
  display.start()

  // const gui = new GUI(particleSystem, display)

  particleSystem.addEmitter(new Vector(360, 230), Vector.fromAngle(0, 2))
  particleSystem.addField(new Vector(700, 230), -140)
  particleSystem.addNewParticles()
  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  window.addEventListener('resize', resize); resize()

  const mouse = useMagicMouse({ experience })
