import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { Utils } from '~/utils'
let additiveBlendingShader, volumetericLightShader, passThroughShader, mesh, material
export const useVolumetric = ({ scene, camera, renderer }) => {
  // eslint-disable-next-line no-undef
  onMounted(() => {
    volumetericLightShader = {
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

    additiveBlendingShader = {
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

    passThroughShader = {
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

    let composer; let box
    let occlusionComposer; let occlusionRenderTarget; let occlusionBox; let lightSphere
    let volumetericLightShaderUniforms
    const DEFAULT_LAYER = 0
    const OCCLUSION_LAYER = 1
    const renderScale = 0.5
    let angle = 0

    function setupScene() {
      let geometry

      sgeometry = new THREE.SphereGeometry(1, 16, 16)
      const boxHelper = new THREE.BoxHelper(new THREE.Mesh(geometry))
      smaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
      lightSphere = new THREE.Mesh(sgeometry, smaterial)
      lightSphere.layers.set(OCCLUSION_LAYER)

      const pgeometry = new THREE.PlaneGeometry(50, 50, 1, 1)
      const pmaterial = new THREE.MeshPhongMaterial({ fog: true, color: 0x555555, emissive: 0x000000, specular: 0x333333, side: THREE.DoubleSide })
      const plane = new THREE.Mesh(pgeometry, pmaterial)
      plane.rotation.x = -Math.PI / 2
      plane.position.set(0, 0, 0)
      scene.add(plane, lightSphere, boxHelper)

      const bgeometry = new THREE.BoxBufferGeometry(1, 1, 1)
      const bmaterial = new THREE.MeshPhongMaterial({ color: 0xE74C3C })
      box = new THREE.Mesh(bgeometry, bmaterial)
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
      occlusionComposer = new EffectComposer(renderer, occlusionRenderTarget)
      occlusionComposer.addPass(new RenderPass(scene, camera))
      pass = new ShaderPass(volumetericLightShader)
      pass.needsSwap = false
      occlusionComposer.addPass(pass)

      volumetericLightShaderUniforms = pass.uniforms

      composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      pass = new ShaderPass(additiveBlendingShader)
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

    function addRenderTargetImage() {
      material = new THREE.ShaderMaterial(THREE.PassThroughShader)
      material.uniforms.tDiffuse.value = occlusionRenderTarget.texture

      mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), material)
      composer.passes[1].scene.add(mesh)
      mesh.visible = false
    }

    setupScene()
    setupPostprocessing()
    // setupGUI()
    addRenderTargetImage()
    onFrame()
  })
}

