/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable block-scoped-var */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-undef */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Utils } from '~~/src/utils'
import fboFrag from '~/shaders/perlinParticles/fboFrag.glsl'
import fboVert from '~/shaders/perlinParticles/fboVert.glsl'
import fboRenderFrag from '~/shaders/perlinParticles/fboRenderFrag.glsl'
import fboRenderVert from '~/shaders/perlinParticles/fboRenderVert.glsl'

export default function FBOPerlinParticles({ _scene, _camera, _renderer }) {
  //   const { FboUtils, GeometryUtils } = Utils
  let camera, scene
  let geometry, material, mesh, mesh2, material2
  const texSize = 512
  const dispSize = {
    x: window.innerWidth,
    y: window.innerHeight,
  }
  let data
  let texture
  let simulationShader
  let rtTexturePos, rtTexturePos2
  let fboParticles
  const renderer = _renderer
  const timer = 0
  let stats

  function init() {
    camera = _camera // new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.z = 2

    scene = _scene

    // INIT FBO
    const data = new Float32Array(texSize * texSize * 3)
    for (var i = 0; i < data.length; i += 3) {
      data[i] = Math.random() * 2 - 1
      data[i + 1] = Math.random() * 2 - 1
      data[i + 2] = 0.0
    }
    texture = new THREE.DataTexture(data, texSize, texSize, THREE.RGBFormat, THREE.FloatType)
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.needsUpdate = true

    rtTexturePos = new THREE.WebGLRenderTarget(texSize, texSize, {
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBFormat,
      type: THREE.FloatType,
      stencilBuffer: false,
    })

    rtTexturePos2 = rtTexturePos.clone()

    simulationShader = new THREE.ShaderMaterial({

      uniforms: {
        tPositions: {
          type: 't',
          value: texture,
        },
        origin: {
          type: 't',
          value: texture,
        },
        timer: {
          type: 'f',
          value: 0,
        },
      },

      vertexShader: fboVert,
      fragmentShader: fboFrag,

    })

    fboParticles = Utils.FboUtils(texSize, renderer, simulationShader)
    fboParticles.renderToTexture(rtTexturePos, rtTexturePos2)

    fboParticles.in = rtTexturePos
    fboParticles.out = rtTexturePos2

    geometry2 = new THREE.Geometry()
    debugger
    for (var i = 0, l = texSize * texSize; i < l; i++) {
      const vertex = new THREE.Vector3()
      vertex.x = (i % texSize) / texSize
      vertex.y = Math.floor(i / texSize) / texSize
      geometry2.vertices.push(vertex)
    }

    material2 = new THREE.ShaderMaterial({

      uniforms: {

        map: {
          type: 't',
          value: rtTexturePos,
        },
        width: {
          type: 'f',
          value: texSize,
        },
        height: {
          type: 'f',
          value: texSize,
        },
        pointSize: {
          type: 'f',
          value: 3,
        },
        effector: {
          type: 'f',
          value: 0,
        },

      },
      vertexShader: fboRenderVert,
      fragmentShader: fboRenderFrag,
      depthTest: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    mesh2 = new THREE.PointCloud(geometry2, material2)
    scene.add(mesh2)
  }

  function animate(t) {
    requestAnimationFrame(animate)

    simulationShader.uniforms.timer.value = t

    // swap
    const tmp = fboParticles.in
    fboParticles.in = fboParticles.out
    fboParticles.out = tmp

    simulationShader.uniforms.tPositions.value = fboParticles.in
    fboParticles.simulate(fboParticles.out)
    material2.uniforms.map.value = fboParticles.out
    controls.update()
    renderer.render(scene, camera)
    stats.update()
  }
  debugger
  init()
  animate(new Date().getTime())
}

