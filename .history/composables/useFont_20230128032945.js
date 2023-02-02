import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import * as THREE from 'three'
import { Pane } from 'tweakpane'
import { WhiteBlackOutlineLogo } from '~/composables/Base64Logos'
import heavenly from '~~/assets/heavenly.typeface.json?url'

THREE.Cache.enabled = true

export const useFont = ({ scene, camera, renderer }) => {
  onMounted(() => {
    let container

    let camera, cameraTarget, scene, renderer

    let group, textMesh1, textMesh2, textGeo, materials

    let firstLetter = true

    let text = 'three.js'

    let bevelEnabled = true

    let font

    let fontName = 'optimer' // helvetiker, optimer, gentilis, droid sans, droid serif
    let fontWeight = 'bold' // normal bold

    const height = 20
    const size = 70
    const hover = 30

    const curveSegments = 4

    const bevelThickness = 2
    const bevelSize = 1.5

    const mirror = true

    const fontMap = {

      'helvetiker': 0,
      'optimer': 1,
      'gentilis': 2,
      'droid/droid_sans': 3,
      'droid/droid_serif': 4,

    }

    const weightMap = {

      regular: 0,
      bold: 1,

    }

    const reverseFontMap = []
    const reverseWeightMap = []

    for (const i in fontMap) reverseFontMap[fontMap[i]] = i
    for (const i in weightMap) reverseWeightMap[weightMap[i]] = i

    let targetRotation = 0
    let targetRotationOnPointerDown = 0

    let pointerX = 0
    let pointerXOnPointerDown = 0

    let windowHalfX = window.innerWidth / 2

    let fontIndex = 1

    init()
    animate()

    function init() {
      container = document.createElement('div')
      document.body.appendChild(container)

      // CAMERA

      camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500)
      camera.position.set(0, 400, 700)

      cameraTarget = new THREE.Vector3(0, 150, 0)

      // SCENE

      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000000)
      scene.fog = new THREE.Fog(0x000000, 250, 1400)

      // LIGHTS

      const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.125)
      dirLight.position.set(0, 0, 1).normalize()
      scene.add(dirLight)

      const pointLight = new THREE.PointLight(0xFFFFFF, 1.5)
      pointLight.color.setHSL(Math.random(), 1, 0.5)
      pointLight.position.set(0, 100, 90)
      scene.add(pointLight)

      materials = [
        new THREE.MeshPhongMaterial({ color: 0xFFFFFF, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xFFFFFF }), // side
      ]

      group = new THREE.Group()
      group.position.y = 100

      scene.add(group)

      loadFont()

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10000, 10000),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF, opacity: 0.5, transparent: true }),
      )
      plane.position.y = 100
      plane.rotation.x = -Math.PI / 2
      scene.add(plane)

      // RENDERER

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)

      // EVENTS

      container.style.touchAction = 'none'
      container.addEventListener('pointerdown', onPointerDown)

      document.addEventListener('keypress', onDocumentKeyPress)
      document.addEventListener('keydown', onDocumentKeyDown)

      //

      const params = {
        changeColor() {
          pointLight.color.setHSL(Math.random(), 1, 0.5)
        },
        changeFont() {
          fontIndex++

          fontName = reverseFontMap[fontIndex % reverseFontMap.length]

          loadFont()
        },
        changeWeight() {
          if (fontWeight === 'bold')

            fontWeight = 'regular'

						 else

            fontWeight = 'bold'

          loadFont()
        },
        changeBevel() {
          bevelEnabled = !bevelEnabled

          refreshText()
        },
      }

      //

      const gui = new GUI()

      gui.add(params, 'changeColor').name('change color')
      gui.add(params, 'changeFont').name('change font')
      gui.add(params, 'changeWeight').name('change weight')
      gui.add(params, 'changeBevel').name('change bevel')
      gui.open()

      //

      window.addEventListener('resize', onWindowResize)
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    //

    function onDocumentKeyDown(event) {
      if (firstLetter) {
        firstLetter = false
        text = ''
      }

      const keyCode = event.keyCode

      // backspace

      if (keyCode == 8) {
        event.preventDefault()

        text = text.substring(0, text.length - 1)
        refreshText()

        return false
      }
    }

    function onDocumentKeyPress(event) {
      const keyCode = event.which

      // backspace

      if (keyCode == 8) {
        event.preventDefault()
      }
      else {
        const ch = String.fromCharCode(keyCode)
        text += ch

        refreshText()
      }
    }

    function loadFont() {
      const loader = new FontLoader()
      loader.load(`fonts/${fontName}_${fontWeight}.typeface.json`, (response) => {
        font = response

        refreshText()
      })
    }

    function createText() {
      textGeo = new TextGeometry(text, {

        font,

        size,
        height,
        curveSegments,

        bevelThickness,
        bevelSize,
        bevelEnabled,

      })

      textGeo.computeBoundingBox()

      const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)

      textMesh1 = new THREE.Mesh(textGeo, materials)

      textMesh1.position.x = centerOffset
      textMesh1.position.y = hover
      textMesh1.position.z = 0

      textMesh1.rotation.x = 0
      textMesh1.rotation.y = Math.PI * 2

      group.add(textMesh1)

      if (mirror) {
        textMesh2 = new THREE.Mesh(textGeo, materials)

        textMesh2.position.x = centerOffset
        textMesh2.position.y = -hover
        textMesh2.position.z = height

        textMesh2.rotation.x = Math.PI
        textMesh2.rotation.y = Math.PI * 2

        group.add(textMesh2)
      }
    }

    function refreshText() {
      group.remove(textMesh1)
      if (mirror)
        group.remove(textMesh2)

      if (!text)
        return

      createText()
    }

    function onPointerDown(event) {
      if (event.isPrimary === false)
        return

      pointerXOnPointerDown = event.clientX - windowHalfX
      targetRotationOnPointerDown = targetRotation

      document.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerup', onPointerUp)
    }

    function onPointerMove(event) {
      if (event.isPrimary === false)
        return

      pointerX = event.clientX - windowHalfX

      targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02
    }

    function onPointerUp() {
      if (event.isPrimary === false)
        return

      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }

    //

    function animate() {
      requestAnimationFrame(animate)

      render()
    }

    function render() {
      group.rotation.y += (targetRotation - group.rotation.y) * 0.05

      camera.lookAt(cameraTarget)

      renderer.clear()
      renderer.render(scene, camera)
    }
  })

  return {
    group,
  }
}