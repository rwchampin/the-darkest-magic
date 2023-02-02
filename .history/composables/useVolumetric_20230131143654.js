import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { Utils } from '~/utils'

export const useVolumetric = (scene, camera, renderer) => {
  // eslint-disable-next-line no-undef
  onMounted(() => {
    const volumetericLightShader = {
      uniforms: {
        tDiffuse: { value: null },
        lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
        exposure: { value: 0.18 },
        decay: { value: 0.95 },
        density: { value: 0.8 },
        weight: { value: 0.4 },
        samples: { value: 50 },
      },

      vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}',
      ].join('\n'),

      fragmentShader: [
        'varying vec2 vUv;',
        'uniform sampler2D tDiffuse;',
        'uniform vec2 lightPosition;',
        'uniform float exposure;',
        'uniform float decay;',
        'uniform float density;',
        'uniform float weight;',
        'uniform int samples;',
        'const int MAX_SAMPLES = 100;',
        'void main()',
        '{',
        'vec2 texCoord = vUv;',
        'vec2 deltaTextCoord = texCoord - lightPosition;',
        'deltaTextCoord *= 1.0 / float(samples) * density;',
        'vec4 color = texture2D(tDiffuse, texCoord);',
        'float illuminationDecay = 1.0;',
        'for(int i=0; i < MAX_SAMPLES; i++)',
        '{',
        'if(i == samples){',
        'break;',
        '}',
        'texCoord -= deltaTextCoord;',
        'vec4 sample = texture2D(tDiffuse, texCoord);',
        'sample *= illuminationDecay * weight;',
        'color += sample;',
        'illuminationDecay *= decay;',
        '}',
        'gl_FragColor = color * exposure;',
        '}',
      ].join('\n'),
    }

    const additiveBlendingShader = {
      uniforms: {
        tDiffuse: { value: null },
        tAdd: { value: null },
      },

      vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}',
      ].join('\n'),

      fragmentShader: [
        'uniform sampler2D tDiffuse;',
        'uniform sampler2D tAdd;',
        'varying vec2 vUv;',
        'void main() {',
        'vec4 color = texture2D( tDiffuse, vUv );',
        'vec4 add = texture2D( tAdd, vUv );',
        'gl_FragColor = color + add;',
        '}',
      ].join('\n'),
    }

    const passThroughShader = {
      uniforms: {
        tDiffuse: { value: null },
      },

      vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
		  'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}',
      ].join('\n'),

      fragmentShader: [
        'uniform sampler2D tDiffuse;',
        'varying vec2 vUv;',
        'void main() {',
        'gl_FragColor = texture2D( tDiffuse, vec2( vUv.x, vUv.y ) );',
        '}',
      ].join('\n'),
    }

    let scene; let camera; let renderer; let composer; let box; let pointLight
    let occlusionComposer; let occlusionRenderTarget; let occlusionBox; let lightSphere
    let volumetericLightShaderUniforms
    const DEFAULT_LAYER = 0
    const OCCLUSION_LAYER = 1
    let renderScale = 0.5
    let angle = 0
    const gui = new dat.GUI()

    function setupScene() {
      let ambientLight,
        geometry,
        material, points

      const geom = new THREE.SphereGeometry(15, 32, 16); debugger
      const count = geom.attributes.position.count

      for (let i = 0; i < count; i++) {

      }

      ambientLight = new THREE.AmbientLight(0x2C3E50)
      scene.add(ambientLight)

      pointLight = new THREE.PointLight(0xFFFFFF)
      scene.add(pointLight)

      geometry = new THREE.SphereBufferGeometry(1, 16, 16)
      material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
      lightSphere = new THREE.Mesh(geometry, material)
      lightSphere.layers.set(OCCLUSION_LAYER)
      scene.add(lightSphere)

      geometry = new THREE.BoxBufferGeometry(1, 1, 1)
      material = new THREE.MeshPhongMaterial({ color: 0xE74C3C })
      box = new THREE.Mesh(geometry, material)
      box.position.z = 2
      scene.add(box)

      material = new THREE.MeshBasicMaterial({ color: 0x000000 })
      occlusionBox = new THREE.Mesh(geometry, material)
      occlusionBox.position.z = 2
      occlusionBox.layers.set(OCCLUSION_LAYER)
      scene.add(occlusionBox)

      camera.position.z = 6
    }

    function setupPostprocessing() {
      let pass

      occlusionRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth * renderScale, window.innerHeight * renderScale)
      occlusionComposer = new THREE.EffectComposer(renderer, occlusionRenderTarget)
      occlusionComposer.addPass(new THREE.RenderPass(scene, camera))
      pass = new THREE.ShaderPass(volumetericLightShader)
      pass.needsSwap = false
      occlusionComposer.addPass(pass)

      volumetericLightShaderUniforms = pass.uniforms

      composer = new THREE.EffectComposer(renderer)
      composer.addPass(new THREE.RenderPass(scene, camera))
      pass = new THREE.ShaderPass(THREE.AdditiveBlendingShader)
      pass.uniforms.tAdd.value = occlusionRenderTarget.texture
      composer.addPass(pass)
      pass.renderToScreen = true
    }

    function onFrame() {
      requestAnimationFrame(onFrame)
      update()
      render()
    }

    function update() {
      const radius = 2.5
      const xpos = Math.sin(angle) * radius
      const zpos = Math.cos(angle) * radius

      box.position.set(xpos, 0, zpos)
      box.rotation.x += 0.01
      box.rotation.y += 0.01

      occlusionBox.position.copy(box.position)
      occlusionBox.rotation.copy(box.rotation)

      angle += 0.02
    }

    function render() {
      camera.layers.set(OCCLUSION_LAYER)
      renderer.setClearColor(0x000000)
      occlusionComposer.render()

      camera.layers.set(DEFAULT_LAYER)
      renderer.setClearColor(0x090611)
      composer.render()
    }

    function setupGUI() {
      let folder
      let min
      let max
      let step
      const updateShaderLight = function () {
        const p = lightSphere.position.clone()
        const vector = p.project(camera)
        const x = (vector.x + 1) / 2
        const y = (vector.y + 1) / 2
        volumetericLightShaderUniforms.lightPosition.value.set(x, y)
        pointLight.position.copy(lightSphere.position)
      }

      folder = gui.addFolder('Light Position')
      folder.add(lightSphere.position, 'x').min(-10).max(10).step(0.1).onChange(updateShaderLight)
      folder.add(lightSphere.position, 'y').min(-10).max(10).step(0.1).onChange(updateShaderLight)
      folder.add(lightSphere.position, 'z').min(-10).max(10).step(0.1).onChange(updateShaderLight)
      folder.open()

      folder = gui.addFolder('Volumeteric Light Shader')
      Object.keys(volumetericLightShaderUniforms).forEach((key) => {
        if (key !== 'tDiffuse' && key != 'lightPosition') {
          prop = volumetericLightShaderUniforms[key]

          switch (key) {
            case 'exposure':
              min = 0
              max = 1
              step = 0.01
              break
            case 'decay':
              min = 0.8
              max = 1
              step = 0.001
              break
            case 'density':
              min = 0
              max = 1
              step = 0.01
              break
            case 'weight':
              min = 0
              max = 1
              step = 0.01
              break
            case 'samples':
              min = 1
              max = 100
              step = 1.0
              break
          }

          folder.add(prop, 'value').min(min).max(max).step(step).name(key)
        }
      })
      folder.open()
    }

    function addRenderTargetImage() {
      let material,
        mesh,
        folder

      material = new THREE.ShaderMaterial(THREE.PassThroughShader)
      material.uniforms.tDiffuse.value = occlusionRenderTarget.texture

      mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), material)
      composer.passes[1].scene.add(mesh)
      mesh.visible = false

      folder = gui.addFolder('Light Pass Render Image')
      folder.add(mesh, 'visible')
      folder.add({ scale: 0.5 }, 'scale', { Full: 1, Half: 0.5, Quarter: 0.25 })
        .onChange((value) => {
          renderScale = value
          window.dispatchEvent(new Event('resize'))
        })
      folder.open()
    }

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)

      const pixelRatio = renderer.getPixelRatio()
      const newWidth = Math.floor(window.innerWidth / pixelRatio) || 1
      const newHeight = Math.floor(window.innerHeight / pixelRatio) || 1

      composer.setSize(newWidth, newHeight)
      occlusionComposer.setSize(newWidth * renderScale, newHeight * renderScale)
    }, false)

    setupScene()
    setupPostprocessing()
    setupGUI()
    addRenderTargetImage()
    onFrame()
  })
}

