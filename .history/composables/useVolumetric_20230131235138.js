import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import gsap from 'gsap'
import { Utils } from '~/utils'
export const useVolumetric = ({ scene, camera, renderer }) => {
  let volumetericLightShaderUniforms;

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

    // const pointsAnimateSphere = (points) => {
    //   const count = points.geometry.attributes.position.count
    //   const positions = points.geometry.attributes.position.array
    //   const scales = points.geometry.attributes.scale.array
    //   for (let i = 0; i < count; i++) {
    //     const i3 = i * 3
    //     const x = positions[i3]
    //     const y = positions[i3 + 1]
    //     const z = positions[i3 + 2]
    //     const scale = scales[i]
    //     const vec = Utils.noise.simplex3(x / 10, y / 10, z / 10)
    //     positions[i3] = x + vec * scale
    //     positions[i3 + 1] = y + vec * scale
    //     positions[i3 + 2] = z + vec * scale
    //   }
    //   points.geometry.attributes.position.needsUpdate = true
    // }
    // const animatePointsAroundSphere = () => {
    //   const sphere = new THREE.SphereGeometry(1, 32, 32)

    //   const count = sphere.geometry.attributes.position.count
    //   const bufferGeometry = new THREE.BufferGeometry()
    //   const positions = new Float32Array(count * 3)

    //   for (let i = 0; i < count; i++) {
    //     const i3 = i * 3
    //     const x = sphere.attributes.position.getX(i)
    //     const y = sphere.attributes.position.getY(i)
    //     const z = sphere.attributes.position.getZ(i)
    //     positions[i3] = x
    //     positions[i3 + 1] = y
    //     positions[i3 + 2] = z
    //   }
    //   bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    //   const material = new THREE.PointsMaterial({
    //     color: 0xFFFFFF,
    //     size: 0.1,
    //     transparent: true,
    //     opacity: 0.5,
    //     blending: THREE.AdditiveBlending,
    //     depthWrite: false,
    //   })
    //   const points = new THREE.Points(bufferGeometry, material)
    //   points.position.set(0, 0, 0)
    //   points.scale.set(10, 10, 10)
    //   scene.add(points)
    //   points.geometry.attributes.position.needsUpdate = true
    // }

    let composer; let box; let pointLight
    let occlusionComposer; let occlusionRenderTarget; let occlusionBox; let lightSphere
    const DEFAULT_LAYER = 0
    const OCCLUSION_LAYER = 1
    const renderScale = 0.5
    let angle = 0

    function setupScene() {
      let geometry,
        material

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
      pass = new THREE.ShaderPass(additiveBlendingShader)
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

    const render = () => {
      camera.layers.set(OCCLUSION_LAYER)
      renderer.setClearColor(0x000000)
      occlusionComposer.render()

      camera.layers.set(DEFAULT_LAYER)
      renderer.setClearColor(0x090611)
      composer.render()
    }

    function addRenderTargetImage() {
      const material = new THREE.ShaderMaterial(passThroughShader)
      material.uniforms.tDiffuse.value = occlusionRenderTarget.texture

      const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), material)
      composer.passes[1].scene.add(mesh)
      mesh.visible = false
    }

    setupScene()
    setupPostprocessing()

    addRenderTargetImage()

    gsap.ticker.add(onFrame)
  })
}

