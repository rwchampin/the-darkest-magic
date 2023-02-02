import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { Utils } from '~/utils'

let composer; let material; let box; let pointLight
let occlusionComposer; let occlusionRenderTarget; let occlusionBox; let lightSphere
let volumetericLightShaderUniforms
const DEFAULT_LAYER = 0
const OCCLUSION_LAYER = 1
const renderScale = 0.5
let angle = 0; let mesh
export const useVolumetric = ({ scene, camera, renderer }) => {
//   onMounted(() => {
  const volumetricMaterial = {
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
      'vec4 samplet = texture2D(tDiffuse, texCoord);',
      'samplet *= illuminationDecay * weight;',
      'color += samplet;',
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

  function setupScene() {
    let geometry,
      material

      const shaderMaterial = new THREE.ShaderMaterial({
        extensions: {
          derivatives: '#extension GL_OES_standard_derivatives : enable',
        },
        uniforms: {
          time: { value: 0 },
          texturePosition: { value: null },
          resolution: { value: new THREE.Vector4() },
        },
        fragmentShader: `
         vec3 curl(float x, float y , float z){
          float eps = 0.0001;
          float n1 = noise(vec3(x+eps,y,z));
          float n2 = noise(vec3(x-eps,y,z));
          float n3 = noise(vec3(x,y+eps,z));
          float n4 = noise(vec3(x,y-eps,z));

          float n5 = noise(vec3(x,y,z+eps));
          float n6 = noise(vec3(x,y,z-eps));

          float x1 = (n1-n2)/(2.0*eps);
          float y1 = (n3-n4)/(2.0*eps);
          float z1 = (n5-n6)/(2.0*eps);

          return vec3(x1,y1,z1);
        }

        void main(){

          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec4 tempPos =  texture2D(texturePosition, uv);
          vec3 position =   tempPos.xyz;

          vec3 curlValue = curl(position.x,position.y,position.z);

          gl_FragColor = vec4(curlValue,1.0);
        }
        `,
        vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform sampler2D texturePosition;
        attribute vec2 reference;
        float PI = 3.1415926535897932384626433832795;

        void main() {
          vUv = reference;

          vec3 pos = texture2D(texturePosition, reference).xyz;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

          gl_PointSize = 30. * (1. / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }

        `,
        vertexParticle: `
          uniform float time;
          varying vec2 vUv;
          varying vec3 vPosition;
          uniform sampler2D texturePosition;
          attribute vec2 reference;
          float PI = 3.1415926535897932384626433832795;

          void main() {
            vUv = reference;

            vec3 pos = texture2D(texturePosition, reference).xyz;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

            gl_PointSize = 30. * (1. / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentParticle: `
          uniform float time;
          uniform float delta;
          uniform sampler2D texturePosition;
          
          vec3 curl(float x, float y , float z){
            float eps = 0.0001;
            float n1 = noise(vec3(x+eps,y,z));
            float n2 = noise(vec3(x-eps,y,z));
            float a = (n1-n2)/(2.0*eps);

            n1 = noise(vec3(x,y+eps,z));
            n2 = noise(vec3(x,y-eps,z));
            float b = (n1-n2)/(2.0*eps);

            n1 = noise(vec3(x,y,z+eps));
            n2 = noise(vec3(x,y,z-eps));
            float c = (n1-n2)/(2.0*eps);

            return vec3(a,b,c);
          }

          void main() {

            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec4 tmpPos = texture2D(texturePosition, uv);
            vec3 pos = tmpPos.xyz;
            float f = 1.;
            float amplitude = 0.002;
            vec3 target = pos + amplitude * curl(f*pos.x,f*pos.y,f*pos.z);

            gl_FragColor = vec4(position + vec3(0.0001), 1.0);
          }
        `


    const ambientLight = new THREE.AmbientLight(0x2C3E50)
    scene.add(ambientLight)

    pointLight = new THREE.PointLight(0xFFFFFF)
    scene.add(pointLight)

    geometry = new THREE.SphereGeometry(1, 16, 16)
    material = new THREE.MeshBasicMaterial({ color: 0xFF0000 })
    lightSphere = new THREE.Mesh(geometry, material)
    lightSphere.layers.set(OCCLUSION_LAYER)
    scene.add(lightSphere)

    geometry = new THREE.BoxGeometry(1, 1, 1)
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
    occlusionComposer = new EffectComposer(renderer, occlusionRenderTarget)
    occlusionComposer.addPass(new RenderPass(scene, camera))
    pass = new ShaderPass(volumetricMaterial)
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

  //   function setupGUI() {
  //     let min
  //     let max
  //     let step
  //     const updateShaderLight = function () {
  //       const p = lightSphere.position.clone()
  //       const vector = p.project(camera)
  //       const x = (vector.x + 1) / 2
  //       const y = (vector.y + 1) / 2
  //       volumetericLightShaderUniforms.lightPosition.value.set(x, y)
  //       pointLight.position.copy(lightSphere.position)
  //     }

  //     //   const tp = Utils.tweakpane.get()
  //     //   folder = tp.addFolder('Light Position')
  //     //   folder.addInput(lightSphere.position, 'x').min(-10).max(10).step(0.1).onChange(updateShaderLight)
  //     //   folder.addInput(lightSphere.position, 'y').min(-10).max(10).step(0.1).onChange(updateShaderLight)
  //     //   folder.addInput(lightSphere.position, 'z').min(-10).max(10).step(0.1).onChange(updateShaderLight)
  //     //   folder.open()

  //     //   folder = tp.addInputFolder('Volumeteric Light Shader')
  //     //   Object.keys(volumetericLightShaderUniforms).forEach((key) => {
  //     //     if (key !== 'tDiffuse' && key !== 'lightPosition') {
  //     //       prop = volumetericLightShaderUniforms[key]

  //     //       switch (key) {
  //     //         case 'exposure':
  //     //           min = 0
  //     //           max = 1
  //     //           step = 0.01
  //     //           break
  //     //         case 'decay':
  //     //           min = 0.8
  //     //           max = 1
  //     //           step = 0.001
  //     //           break
  //     //         case 'density':
  //     //           min = 0
  //     //           max = 1
  //     //           step = 0.01
  //     //           break
  //     //         case 'weight':
  //     //           min = 0
  //     //           max = 1
  //     //           step = 0.01
  //     //           break
  //     //         case 'samples':
  //     //           min = 1
  //     //           max = 100
  //     //           step = 1.0
  //     //           break
  //     //       }

  //     //       folder.add(prop, 'value').min(min).max(max).step(step).name(key)
  //     //     }
  //     //   })
  //     //   folder.open()
  //   }

  function addRenderTargetImage() {
    material = new THREE.ShaderMaterial(passThroughShader)
    material.uniforms.tDiffuse.value = occlusionRenderTarget.texture

    mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    composer.passes[0].scene.add(mesh)
    mesh.visible = false

    // const folder = gui.addFolder('Light Pass Render Image')
    // folder.add(mesh, 'visible')
    // folder.add({ scale: 0.5 }, 'scale', { Full: 1, Half: 0.5, Quarter: 0.25 })
    //   .onChange((value) => {
    //     renderScale = value
    //     window.dispatchEvent(new Event('resize'))
    //   })
    // folder.open()
  }

  setupScene()
  setupPostprocessing()
  // setupGUI()
  addRenderTargetImage()
  onFrame()

//   })
}
