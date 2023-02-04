import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'dat.gui'
import Stats from 'stats.js'

export default function useTheSpirit() {
 const settings = require(19)
    //   const THREE = require(10)

      let undef

      const shaderParse = require(21)

      let _copyShader
      let _positionShader
      let _textureDefaultPosition
      let _positionRenderTarget
      let _positionRenderTarget2

      let _renderer
      let _mesh
      let _scene
      let _camera
      let _followPoint
      let _followPointTime = 0

      const TEXTURE_WIDTH = exports.TEXTURE_WIDTH = settings.simulatorTextureWidth
      const TEXTURE_HEIGHT = exports.TEXTURE_HEIGHT = settings.simulatorTextureHeight
      const AMOUNT = exports.AMOUNT = TEXTURE_WIDTH * TEXTURE_HEIGHT

      exports.init = init
      exports.update = update
      exports.initAnimation = 0

      exports.positionRenderTarget = undef

      function init(renderer) {
        _renderer = renderer
        _followPoint = new THREE.Vector3()

        const rawShaderPrefix = `precision ${renderer.capabilities.precision} float;\n`

        const gl = _renderer.getContext()
        if (!gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) {
          alert('No support for vertex shader textures!')
          return
        }
        if (!gl.getExtension('OES_texture_float')) {
          alert('No OES_texture_float support for float textures!')
          return
        }

        _scene = new THREE.Scene()
        _camera = new THREE.Camera()
        _camera.position.z = 1

        _copyShader = new THREE.RawShaderMaterial({
          uniforms: {
            resolution: { type: 'v2', value: new THREE.Vector2(TEXTURE_WIDTH, TEXTURE_HEIGHT) },
            texture: { type: 't', value: undef },
          },
          vertexShader: rawShaderPrefix + shaderParse('#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n'),
          fragmentShader: rawShaderPrefix + shaderParse('#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texture;\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    gl_FragColor = texture2D( texture, uv );\n}\n'),
        })

        _positionShader = new THREE.RawShaderMaterial({
          uniforms: {
            resolution: { type: 'v2', value: new THREE.Vector2(TEXTURE_WIDTH, TEXTURE_HEIGHT) },
            texturePosition: { type: 't', value: undef },
            textureDefaultPosition: { type: 't', value: undef },
            mouse3d: { type: 'v3', value: new THREE.Vector3() },
            dieSpeed: { type: 'f', value: 0 },
            radius: { type: 'f', value: 0 },
            attraction: { type: 'f', value: 0 },
            time: { type: 'f', value: 0 },
            initAnimation: { type: 'f', value: 0 },
          },
          vertexShader: rawShaderPrefix + shaderParse('#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n'),
          fragmentShader: rawShaderPrefix + shaderParse('#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texturePosition;\nuniform sampler2D textureDefaultPosition;\nuniform float time;\nuniform float dieSpeed;\nuniform float radius;\nuniform float attraction;\nuniform float initAnimation;\nuniform vec3 mouse3d;\n\nvec4 mod289(vec4 x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nfloat mod289(float x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat permute(float x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt(float r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip) {\n    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n    vec4 p,s;\n\n    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n    s = vec4(lessThan(p, vec4(0.0)));\n    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n    return p;\n}\n\n#define F4 0.309016994374947451\n\nvec4 simplexNoiseDerivatives (vec4 v) {\n    const vec4  C = vec4( 0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);\n\n    vec4 i  = floor(v + dot(v, vec4(F4)) );\n    vec4 x0 = v -   i + dot(i, C.xxxx);\n\n    vec4 i0;\n    vec3 isX = step( x0.yzw, x0.xxx );\n    vec3 isYZ = step( x0.zww, x0.yyz );\n    i0.x = isX.x + isX.y + isX.z;\n    i0.yzw = 1.0 - isX;\n    i0.y += isYZ.x + isYZ.y;\n    i0.zw += 1.0 - isYZ.xy;\n    i0.z += isYZ.z;\n    i0.w += 1.0 - isYZ.z;\n\n    vec4 i3 = clamp( i0, 0.0, 1.0 );\n    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n    vec4 x1 = x0 - i1 + C.xxxx;\n    vec4 x2 = x0 - i2 + C.yyyy;\n    vec4 x3 = x0 - i3 + C.zzzz;\n    vec4 x4 = x0 + C.wwww;\n\n    i = mod289(i);\n    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n    vec4 j1 = permute( permute( permute( permute (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n    vec4 p0 = grad4(j0,   ip);\n    vec4 p1 = grad4(j1.x, ip);\n    vec4 p2 = grad4(j1.y, ip);\n    vec4 p3 = grad4(j1.z, ip);\n    vec4 p4 = grad4(j1.w, ip);\n\n    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    p4 *= taylorInvSqrt(dot(p4,p4));\n\n    vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)); //value of contributions from each corner at point\n    vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));\n\n    vec3 m0 = max(0.5 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0); //(0.5 - x^2) where x is the distance\n    vec2 m1 = max(0.5 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);\n\n    vec3 temp0 = -6.0 * m0 * m0 * values0;\n    vec2 temp1 = -6.0 * m1 * m1 * values1;\n\n    vec3 mmm0 = m0 * m0 * m0;\n    vec2 mmm1 = m1 * m1 * m1;\n\n    float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;\n    float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;\n    float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;\n    float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + mmm1[1] * p4.w;\n\n    return vec4(dx, dy, dz, dw) * 49.0;\n}\n\nvec3 curl( in vec3 p, in float noiseTime, in float persistence ) {\n\n    vec4 xNoisePotentialDerivatives = vec4(0.0);\n    vec4 yNoisePotentialDerivatives = vec4(0.0);\n    vec4 zNoisePotentialDerivatives = vec4(0.0);\n\n    for (int i = 0; i < 3; ++i) {\n\n        float twoPowI = pow(2.0, float(i));\n        float scale = 0.5 * twoPowI * pow(persistence, float(i));\n\n        xNoisePotentialDerivatives += simplexNoiseDerivatives(vec4(p * twoPowI, noiseTime)) * scale;\n        yNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;\n        zNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;\n    }\n\n    return vec3(\n        zNoisePotentialDerivatives[1] - yNoisePotentialDerivatives[2],\n        xNoisePotentialDerivatives[2] - zNoisePotentialDerivatives[0],\n        yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[1]\n    );\n\n}\n\nvoid main() {\n\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n    vec4 positionInfo = texture2D( texturePosition, uv );\n    vec3 position = mix(vec3(0.0, -200.0, 0.0), positionInfo.xyz, smoothstep(0.0, 0.3, initAnimation));\n    float life = positionInfo.a - dieSpeed;\n\n    vec3 followPosition = mix(vec3(0.0, -(1.0 - initAnimation) * 200.0, 0.0), mouse3d, smoothstep(0.2, 0.7, initAnimation));\n\n    if(life < 0.0) {\n        positionInfo = texture2D( textureDefaultPosition, uv );\n        position = positionInfo.xyz * (1.0 + sin(time * 15.0) * 0.2 + (1.0 - initAnimation)) * 0.4 * radius;\n        position += followPosition;\n        life = 0.5 + fract(positionInfo.w * 21.4131 + time);\n    } else {\n        vec3 delta = followPosition - position;\n        position += delta * (0.005 + life * 0.01) * attraction * (1.0 - smoothstep(50.0, 350.0, length(delta)));\n        position += curl(position * 0.02 + 3.0, time, 0.1 + (1.0 - life) * 0.1);\n    }\n\n    gl_FragColor = vec4(position, life);\n\n}\n'),
          blending: THREE.NoBlending,
          transparent: false,
          depthWrite: false,
          depthTest: false,
        })

        _mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), _copyShader)
        _scene.add(_mesh)

        _positionRenderTarget = new THREE.WebGLRenderTarget(TEXTURE_WIDTH, TEXTURE_HEIGHT, {
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
          minFilter: THREE.NearestFilter,
          magFilter: THREE.NearestFilter,
          format: THREE.RGBAFormat,
          type: THREE.FloatType,
          depthWrite: false,
          depthBuffer: false,
          stencilBuffer: false,
        })
        _positionRenderTarget2 = _positionRenderTarget.clone()
        _copyTexture(_createPositionTexture(), _positionRenderTarget)
        _copyTexture(_positionRenderTarget, _positionRenderTarget2)
      }

      function _copyTexture(input, output) {
        _mesh.material = _copyShader
        _copyShader.uniforms.texture.value = input
        _renderer.render(_scene, _camera, output)
      }

      function _updatePosition(dt) {
      // swap
        const tmp = _positionRenderTarget
        _positionRenderTarget = _positionRenderTarget2
        _positionRenderTarget2 = tmp

        _mesh.material = _positionShader
        _positionShader.uniforms.textureDefaultPosition.value = _textureDefaultPosition
        _positionShader.uniforms.texturePosition.value = _positionRenderTarget2
        _positionShader.uniforms.time.value += dt * 0.001
        _renderer.render(_scene, _camera, _positionRenderTarget)
      }

      function _createPositionTexture() {
        const positions = new Float32Array(AMOUNT * 4)
        let i4
        let r, phi, theta
        for (let i = 0; i < AMOUNT; i++) {
          i4 = i * 4
          // r = (0.5 + Math.pow(Math.random(), 0.4) * 0.5) * 50;
          r = (0.5 + Math.random() * 0.5) * 50
          phi = (Math.random() - 0.5) * Math.PI
          theta = Math.random() * Math.PI * 2
          positions[i4 + 0] = r * Math.cos(theta) * Math.cos(phi)
          positions[i4 + 1] = r * Math.sin(phi)
          positions[i4 + 2] = r * Math.sin(theta) * Math.cos(phi)
          positions[i4 + 3] = Math.random()
        }
        const texture = new THREE.DataTexture(positions, TEXTURE_WIDTH, TEXTURE_HEIGHT, THREE.RGBAFormat, THREE.FloatType)
        texture.minFilter = THREE.NearestFilter
        texture.magFilter = THREE.NearestFilter
        texture.needsUpdate = true
        texture.generateMipmaps = false
        texture.flipY = false
        _textureDefaultPosition = texture
        return texture
      }

      function update(dt) {
        const autoClearColor = _renderer.autoClearColor
        const clearColor = _renderer.getClearColor().getHex()
        const clearAlpha = _renderer.getClearAlpha()

        _renderer.autoClearColor = false

        _positionShader.uniforms.dieSpeed.value = settings.dieSpeed
        _positionShader.uniforms.radius.value = settings.radius
        _positionShader.uniforms.attraction.value = settings.attraction
        _positionShader.uniforms.initAnimation.value = exports.initAnimation

        if (settings.followMouse) {
          _positionShader.uniforms.mouse3d.value.copy(settings.mouse3d)
        }
        else {
          _followPointTime += dt * 0.001
          _followPoint.set(
            Math.cos(_followPointTime) * 160.0,
            Math.cos(_followPointTime * 4.0) * 40.0,
            Math.sin(_followPointTime * 2.0) * 160.0,
          )
          _positionShader.uniforms.mouse3d.value.lerp(_followPoint, 0.2)
        }

        // _renderer.setClearColor(0, 0);
        _updatePosition(dt)

        _renderer.setClearColor(clearColor, clearAlpha)
        _renderer.autoClearColor = autoClearColor
        exports.positionRenderTarget = _positionRenderTarget
      }








    4: [function (require, module, exports) {
      const prefix = require(6)
      const toCamelCase = require(11)
      const cache = { float: 'cssFloat' }

      const suffixMap = {}
            ;['top', 'right', 'bottom', 'left',
        'width', 'height', 'fontSize',
        'paddingLeft', 'paddingRight',
        'paddingTop', 'paddingBottom',
        'marginLeft', 'marginRight',
        'marginTop', 'marginBottom',
        'padding', 'margin', 'perspective',
      ].forEach((prop) => {
        suffixMap[prop] = 'px'
      })

      
 
    8: [function (require, module, exports) {
      const now = require(5)
      const global = typeof window === 'undefined' ? {} : window
      const vendors = ['moz', 'webkit']
      const suffix = 'AnimationFrame'
      let raf = global[`request${suffix}`]
      let caf = global[`cancel${suffix}`] || global[`cancelRequest${suffix}`]

      for (let i = 0; i < vendors.length && !raf; i++) {
        raf = global[`${vendors[i]}Request${suffix}`]
        caf = global[`${vendors[i]}Cancel${suffix}`]
                || global[`${vendors[i]}CancelRequest${suffix}`]
      }

      // Some versions of FF have rAF but not cAF
      if (!raf || !caf) {
        let last = 0
        let id = 0
        const queue = []
        const frameDuration = 1000 / 60

        raf = function (callback) {
          if (queue.length === 0) {
            const _now = now()
            const next = Math.max(0, frameDuration - (_now - last))
            last = next + _now
            setTimeout(() => {
              const cp = queue.slice(0)
              // Clear queue here to prevent
              // callbacks from appending listeners
              // to the current frame's queue
              queue.length = 0
              for (let i = 0; i < cp.length; i++) {
                if (!cp[i].cancelled) {
                  try {
                    cp[i].callback(last)
                  }
                  catch (e) {
                    setTimeout(() => { throw e }, 0)
                  }
                }
              }
            }, Math.round(next))
          }
          queue.push({
            handle: ++id,
            callback,
            cancelled: false,
          })
          return id
        }

        caf = function (handle) {
          for (let i = 0; i < queue.length; i++) {
            if (queue[i].handle === handle)
              queue[i].cancelled = true
          }
        }
      }

      module.exports = function (fn) {
      // Wrap in a new function to prevent
      // `cancel` potentially being assigned
      // to the native rAF function
        return raf.call(global, fn)
      }
      module.exports.cancel = function () {
        caf.apply(global, arguments)
      }
    }, { 5: 5 }],
    9: [function (require, module, exports) {
    /**
         * @author mrdoob / http://mrdoob.com/
         */

      const Stats = function () {
        const now = (self.performance && self.performance.now) ? self.performance.now.bind(performance) : Date.now

        let startTime = now(); let prevTime = startTime
        let frames = 0; let mode = 0

        function createElement(tag, id, css) {
          const element = document.createElement(tag)
          element.id = id
          element.style.cssText = css
          return element
        }

        function createPanel(id, fg, bg) {
          const div = createElement('div', id, `padding:0 0 3px 3px;text-align:left;background:${bg}`)

          const text = createElement('div', `${id}Text`, `font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:${fg}`)
          text.innerHTML = id.toUpperCase()
          div.appendChild(text)

          const graph = createElement('div', `${id}Graph`, `width:74px;height:30px;background:${fg}`)
          div.appendChild(graph)

          for (let i = 0; i < 74; i++)

            graph.appendChild(createElement('span', '', `width:1px;height:30px;float:left;opacity:0.9;background:${bg}`))

          return div
        }

        function setMode(value) {
          const children = container.children

          for (let i = 0; i < children.length; i++)

            children[i].style.display = i === value ? 'block' : 'none'

          mode = value
        }

        function updateGraph(dom, value) {
          const child = dom.appendChild(dom.firstChild)
          child.style.height = `${Math.min(30, 30 - value * 30)}px`
        }

        //

        var container = createElement('div', 'stats', 'width:80px;opacity:0.9;cursor:pointer')
        container.addEventListener('mousedown', (event) => {
          event.preventDefault()
          setMode(++mode % container.children.length)
        }, false)

        // FPS

        let fps = 0; let fpsMin = Infinity; let fpsMax = 0

        const fpsDiv = createPanel('fps', '#0ff', '#002')
        const fpsText = fpsDiv.children[0]
        const fpsGraph = fpsDiv.children[1]

        container.appendChild(fpsDiv)

        // MS

        let ms = 0; let msMin = Infinity; let msMax = 0

        const msDiv = createPanel('ms', '#0f0', '#020')
        const msText = msDiv.children[0]
        const msGraph = msDiv.children[1]

        container.appendChild(msDiv)

        // MEM

        if (self.performance && self.performance.memory) {
          var mem = 0; var memMin = Infinity; var memMax = 0

          const memDiv = createPanel('mb', '#f08', '#201')
          var memText = memDiv.children[0]
          var memGraph = memDiv.children[1]

          container.appendChild(memDiv)
        }

        //

        setMode(mode)

        return {

          REVISION: 14,

          domElement: container,

          setMode,

          begin() {
            startTime = now()
          },

          end() {
            const time = now()

            ms = time - startTime
            msMin = Math.min(msMin, ms)
            msMax = Math.max(msMax, ms)

            msText.textContent = `${ms | 0} MS (${msMin | 0}-${msMax | 0})`
            updateGraph(msGraph, ms / 200)

            frames++

            if (time > prevTime + 1000) {
              fps = Math.round((frames * 1000) / (time - prevTime))
              fpsMin = Math.min(fpsMin, fps)
              fpsMax = Math.max(fpsMax, fps)

              fpsText.textContent = `${fps} FPS (${fpsMin}-${fpsMax})`
              updateGraph(fpsGraph, fps / 100)

              prevTime = time
              frames = 0

              if (mem !== undefined) {
                const heapSize = performance.memory.usedJSHeapSize
                const heapSizeLimit = performance.memory.jsHeapSizeLimit

                mem = Math.round(heapSize * 0.000000954)
                memMin = Math.min(memMin, mem)
                memMax = Math.max(memMax, mem)

                memText.textContent = `${mem} MB (${memMin}-${memMax})`
                updateGraph(memGraph, heapSize / heapSizeLimit)
              }
            }

            return time
          },

          update() {
            startTime = this.end()
          },

        }
      }

      if (typeof module === 'object')

        module.exports = Stats
    }, {}],
    10: [function (require, module, exports) {
      module.exports = window.THREE
    }, {}],
    11: [function (require, module, exports) {
      const toSpace = require(13)

      /**
         * Expose `toCamelCase`.
         */

      module.exports = toCamelCase

      /**
         * Convert a `string` to camel case.
         *
         * @param {String} string
         * @return {String}
         */

      function toCamelCase(string) {
        return toSpace(string).replace(/\s(\w)/g, (matches, letter) => {
          return letter.toUpperCase()
        })
      }
    }, { 13: 13 }],
    12: [function (require, module, exports) {
    /**
         * Expose `toNoCase`.
         */

      module.exports = toNoCase

      /**
         * Test whether a string is camel-case.
         */

      const hasSpace = /\s/
      const hasCamel = /[a-z][A-Z]/
      const hasSeparator = /[\W_]/

      /**
         * Remove any starting case from a `string`, like camel or snake, but keep
         * spaces and punctuation that may be important otherwise.
         *
         * @param {String} string
         * @return {String}
         */

      function toNoCase(string) {
        if (hasSpace.test(string))
          return string.toLowerCase()

        if (hasSeparator.test(string))
          string = unseparate(string)
        if (hasCamel.test(string))
          string = uncamelize(string)
        return string.toLowerCase()
      }

      /**
         * Separator splitter.
         */

      const separatorSplitter = /[\W_]+(.|$)/g

      /**
         * Un-separate a `string`.
         *
         * @param {String} string
         * @return {String}
         */

      function unseparate(string) {
        return string.replace(separatorSplitter, (m, next) => {
          return next ? ` ${next}` : ''
        })
      }

      /**
         * Camelcase splitter.
         */

      const camelSplitter = /(.)([A-Z]+)/g

      /**
         * Un-camelcase a `string`.
         *
         * @param {String} string
         * @return {String}
         */

      function uncamelize(string) {
        return string.replace(camelSplitter, (m, previous, uppers) => {
          return `${previous} ${uppers.toLowerCase().split('').join(' ')}`
        })
      }
    }, {}],
    13: [function (require, module, exports) {
      const clean = require(12)

      /**
         * Expose `toSpaceCase`.
         */

      module.exports = toSpaceCase

      /**
         * Convert a `string` to space case.
         *
         * @param {String} string
         * @return {String}
         */

      function toSpaceCase(string) {
        return clean(string).replace(/[\W_]+(.|$)/g, (matches, match) => {
          return match ? ` ${match}` : ''
        })
      }
    }, { 12: 12 }],
    14: [function (require, module, exports) {
      const settings = require(19)
      const THREE = require(10)

      let undef

      exports.mesh = undef
      exports.init = init

      function init() {
        const geometry = new THREE.PlaneBufferGeometry(4500, 4500, 10, 10)
        const planeMaterial = new THREE.MeshStandardMaterial({
          color: settings.bgColor,
          roughness: 0.4,
          metalness: 0.4,
        })
        const mesh = exports.mesh = new THREE.Mesh(geometry, planeMaterial)

        mesh.rotation.x = -1.57
        mesh.castShadow = false
        mesh.receiveShadow = true
      }
    }, { 10: 10, 19: 19 }],
    15: [function (require, module, exports) {
      const settings = require(19)
      const THREE = require(10)

      let undef

      let mesh = exports.mesh = undef
      let pointLight = exports.pointLight = undef
      exports.init = init
      exports.update = update

      let _shadowDarkness = 0.45

      function init() {
        mesh = exports.mesh = new THREE.Object3D()
        mesh.position.set(0, 500, 0)

        const ambient = new THREE.AmbientLight(0x333333)
        mesh.add(ambient)

        pointLight = exports.pointLight = new THREE.PointLight(0xFFFFFF, 1, 700)
        pointLight.castShadow = true
        pointLight.shadowCameraNear = 10
        pointLight.shadowCameraFar = 700
        // pointLight.shadowCameraFov = 90;
        pointLight.shadowBias = 0.1
        // pointLight.shadowDarkness = 0.45;
        pointLight.shadowMapWidth = 4096
        pointLight.shadowMapHeight = 2048
        mesh.add(pointLight)
      }

      function update(dt) {
        pointLight.shadowDarkness = _shadowDarkness += (settings.shadowDarkness - _shadowDarkness) * 0.1
      }
    }, { 10: 10, 19: 19 }],
    16: [function (require, module, exports) {
      const settings = require(19)
      const THREE = require(10)
      const shaderParse = require(21)

      const simulator = require(17)

      let undef

      let container = exports.container = undef
      exports.init = init
      exports.update = update

      let _renderer
      let _particleMesh
      let _triangleMesh
      let _meshes

      let _color1
      let _color2
      let _tmpColor

      const TEXTURE_WIDTH = settings.simulatorTextureWidth
      const TEXTURE_HEIGHT = settings.simulatorTextureHeight
      const AMOUNT = TEXTURE_WIDTH * TEXTURE_HEIGHT

      function init(renderer) {
        container = exports.container = new THREE.Object3D()

        _tmpColor = new THREE.Color()
        _color1 = new THREE.Color(settings.color1)
        _color2 = new THREE.Color(settings.color2)

        _meshes = [
          _triangleMesh = _createTriangleMesh(),
          _particleMesh = _createParticleMesh(),
        ]
        _triangleMesh.visible = false
        _particleMesh.visible = false

        _renderer = renderer
      }

      function _createParticleMesh() {
        const position = new Float32Array(AMOUNT * 3)
        let i3
        for (let i = 0; i < AMOUNT; i++) {
          i3 = i * 3
          position[i3 + 0] = (i % TEXTURE_WIDTH) / TEXTURE_WIDTH
          position[i3 + 1] = ~~(i / TEXTURE_WIDTH) / TEXTURE_HEIGHT
        }
        const geometry = new THREE.BufferGeometry()
        geometry.addAttribute('position', new THREE.BufferAttribute(position, 3))

        const material = new THREE.ShaderMaterial({
          uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.shadowmap,
            {
              texturePosition: { type: 't', value: undef },
              color1: { type: 'c', value: undef },
              color2: { type: 'c', value: undef },
            },
          ]),
          vertexShader: shaderParse('#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\nvarying float vLife;\n// chunk(shadowmap_pars_vertex);\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, position.xy );\n\n    vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    // chunk(shadowmap_vertex);\n\n    vLife = positionInfo.w;\n    gl_PointSize = 1300.0 / length( mvPosition.xyz ) * smoothstep(0.0, 0.2, positionInfo.w);\n\n    gl_Position = projectionMatrix * mvPosition;\n\n}\n'),
          fragmentShader: shaderParse('#define GLSLIFY 1// chunk(common);\r\n// chunk(fog_pars_fragment);\r\n// chunk(shadowmap_pars_fragment);\r\n\nvarying float vLife;\n\nuniform vec3 color1;\n\nuniform vec3 color2;\n\nvoid main() {\n\n    vec3 outgoingLight = mix(color2, color1, smoothstep(0.0, 0.7, vLife));\n\n    // chunk(shadowmap_fragment);\r\n\n    outgoingLight *= shadowMask;//pow(shadowMask, vec3(0.75));\r\n\n    // chunk(fog_fragment);\r\n    // chunk(linear_to_gamma_fragment);\r\n\n    gl_FragColor = vec4( outgoingLight, 1.0 );\n\n}\n\n'),
          blending: THREE.NoBlending,
        })

        material.uniforms.color1.value = _color1
        material.uniforms.color2.value = _color2

        const mesh = new THREE.Points(geometry, material)

        mesh.customDistanceMaterial = new THREE.ShaderMaterial({
          uniforms: {
            lightPos: { type: 'v3', value: new THREE.Vector3(0, 0, 0) },
            texturePosition: { type: 't', value: undef },
          },
          vertexShader: shaderParse('#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\nvarying vec4 vWorldPosition;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, position.xy );\n\n    vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    gl_PointSize = 50.0 / length( mvPosition.xyz );\n\n    vWorldPosition = worldPosition;\n\n    gl_Position = projectionMatrix * mvPosition;\n\n}\n'),
          fragmentShader: shaderParse('#define GLSLIFY 1\nuniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n\n//chunk(common);\n\nvec4 pack1K ( float depth ) {\n\n   depth /= 1000.0;\n   const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n   const vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n   vec4 res = fract( depth * bitSh );\n   res -= res.xxyz * bitMsk;\n   return res;\n\n}\n\nfloat unpack1K ( vec4 color ) {\n\n   const vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n   return dot( color, bitSh ) * 1000.0;\n\n}\n\nvoid main () {\n\n   gl_FragColor = pack1K( length( vWorldPosition.xyz - lightPos.xyz ) );\n\n}\n'),
          depthTest: true,
          depthWrite: true,
          side: THREE.BackSide,
          blending: THREE.NoBlending,
        })
        mesh.castShadow = true
        mesh.receiveShadow = true
        container.add(mesh)

        return mesh
      }

      function _createTriangleMesh() {
        const position = new Float32Array(AMOUNT * 3 * 3)
        const positionFlip = new Float32Array(AMOUNT * 3 * 3)
        const fboUV = new Float32Array(AMOUNT * 2 * 3)

        const PI = Math.PI
        const angle = PI * 2 / 3
        let i6, i9
        for (let i = 0; i < AMOUNT; i++) {
          i6 = i * 6
          i9 = i * 9
          position[i9 + 0] = Math.sin(angle * 2 + PI)
          position[i9 + 1] = Math.cos(angle * 2 + PI)
          position[i9 + 3] = Math.sin(angle + PI)
          position[i9 + 4] = Math.cos(angle + PI)
          position[i9 + 6] = Math.sin(angle * 3 + PI)
          position[i9 + 7] = Math.cos(angle * 3 + PI)

          positionFlip[i9 + 0] = Math.sin(angle * 2)
          positionFlip[i9 + 1] = Math.cos(angle * 2)
          positionFlip[i9 + 3] = Math.sin(angle)
          positionFlip[i9 + 4] = Math.cos(angle)
          positionFlip[i9 + 6] = Math.sin(angle * 3)
          positionFlip[i9 + 7] = Math.cos(angle * 3)

          fboUV[i6 + 0] = fboUV[i6 + 2] = fboUV[i6 + 4] = (i % TEXTURE_WIDTH) / TEXTURE_WIDTH
          fboUV[i6 + 1] = fboUV[i6 + 3] = fboUV[i6 + 5] = ~~(i / TEXTURE_WIDTH) / TEXTURE_HEIGHT
        }
        const geometry = new THREE.BufferGeometry()
        geometry.addAttribute('position', new THREE.BufferAttribute(position, 3))
        geometry.addAttribute('positionFlip', new THREE.BufferAttribute(positionFlip, 3))
        geometry.addAttribute('fboUV', new THREE.BufferAttribute(fboUV, 2))

        const material = new THREE.ShaderMaterial({
          uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.shadowmap,
            {
              texturePosition: { type: 't', value: undef },
              flipRatio: { type: 'f', value: 0 },
              color1: { type: 'c', value: undef },
              color2: { type: 'c', value: undef },
            },
          ]),
          vertexShader: shaderParse('#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\n// chunk(shadowmap_pars_vertex);\n\nvarying float vLife;\nattribute vec3 positionFlip;\nattribute vec2 fboUV;\n\nuniform float flipRatio;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, fboUV );\n    vec3 pos = positionInfo.xyz;\n\n    vec4 worldPosition = modelMatrix * vec4( pos, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    // chunk(shadowmap_vertex);\n    vLife = positionInfo.w;\n\n    gl_Position = projectionMatrix * (mvPosition + vec4((position + (positionFlip - position) * flipRatio) * smoothstep(0.0, 0.2, positionInfo.w), 0.0));\n\n}\n'),
          fragmentShader: shaderParse('#define GLSLIFY 1// chunk(common);\r\n// chunk(fog_pars_fragment);\r\n// chunk(shadowmap_pars_fragment);\r\n\nvarying float vLife;\n\nuniform vec3 color1;\n\nuniform vec3 color2;\n\nvoid main() {\n\n    vec3 outgoingLight = mix(color2, color1, smoothstep(0.0, 0.7, vLife));\n\n    // chunk(shadowmap_fragment);\r\n\n    outgoingLight *= shadowMask;//pow(shadowMask, vec3(0.75));\r\n\n    // chunk(fog_fragment);\r\n    // chunk(linear_to_gamma_fragment);\r\n\n    gl_FragColor = vec4( outgoingLight, 1.0 );\n\n}\n\n'),
          blending: THREE.NoBlending,
        })

        material.uniforms.color1.value = _color1
        material.uniforms.color2.value = _color2

        const mesh = new THREE.Mesh(geometry, material)

        mesh.customDistanceMaterial = new THREE.ShaderMaterial({
          uniforms: {
            lightPos: { type: 'v3', value: new THREE.Vector3(0, 0, 0) },
            texturePosition: { type: 't', value: undef },
            flipRatio: { type: 'f', value: 0 },

            fogDensity: { type: 'f', value: 0.00025 },
            fogNear: { type: 'f', value: 1 },
            fogFar: { type: 'f', value: 2000 },
            fogColor: { type: 'c', value: new THREE.Color(0xFFFFFF) },
          },
          vertexShader: shaderParse('#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\nvarying vec4 vWorldPosition;\n\nattribute vec3 positionFlip;\nattribute vec2 fboUV;\n\nuniform float flipRatio;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, fboUV );\n    vec3 pos = positionInfo.xyz;\n\n    vec4 worldPosition = modelMatrix * vec4( pos, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    vWorldPosition = worldPosition;\n\n    gl_Position = projectionMatrix * (mvPosition + vec4((position + (positionFlip - position) * flipRatio), 0.0));\n\n}\n'),
          fragmentShader: shaderParse('#define GLSLIFY 1\nuniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n\n//chunk(common);\n\nvec4 pack1K ( float depth ) {\n\n   depth /= 1000.0;\n   const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n   const vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n   vec4 res = fract( depth * bitSh );\n   res -= res.xxyz * bitMsk;\n   return res;\n\n}\n\nfloat unpack1K ( vec4 color ) {\n\n   const vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n   return dot( color, bitSh ) * 1000.0;\n\n}\n\nvoid main () {\n\n   gl_FragColor = pack1K( length( vWorldPosition.xyz - lightPos.xyz ) );\n\n}\n'),
          depthTest: true,
          depthWrite: true,
          side: THREE.BackSide,
          blending: THREE.NoBlending,
        })
        mesh.castShadow = true
        mesh.receiveShadow = true
        container.add(mesh)

        return mesh
      }

      function update(dt) {
        let mesh

        _triangleMesh.visible = settings.useTriangleParticles
        _particleMesh.visible = !settings.useTriangleParticles

        _tmpColor.setStyle(settings.color1)
        _color1.lerp(_tmpColor, 0.05)

        _tmpColor.setStyle(settings.color2)
        _color2.lerp(_tmpColor, 0.05)

        for (let i = 0; i < 2; i++) {
          mesh = _meshes[i]
          const lightPos = mesh.customDistanceMaterial.uniforms.lightPos.value
          mesh.material.uniforms.texturePosition.value = simulator.positionRenderTarget
          mesh.customDistanceMaterial.uniforms.texturePosition.value = simulator.positionRenderTarget
          if (mesh.material.uniforms.flipRatio) {
            mesh.material.uniforms.flipRatio.value ^= 1
            mesh.customDistanceMaterial.uniforms.flipRatio.value ^= 1
          }
        }
      }
    }, { 10: 10, 17: 17, 19: 19, 21: 21 }],
    17: [function (require, module, exports) {
      const settings = require(19)
    //   const THREE = require(10)

      let undef

      const shaderParse = require(21)

      let _copyShader
      let _positionShader
      let _textureDefaultPosition
      let _positionRenderTarget
      let _positionRenderTarget2

      let _renderer
      let _mesh
      let _scene
      let _camera
      let _followPoint
      let _followPointTime = 0

      const TEXTURE_WIDTH = exports.TEXTURE_WIDTH = settings.simulatorTextureWidth
      const TEXTURE_HEIGHT = exports.TEXTURE_HEIGHT = settings.simulatorTextureHeight
      const AMOUNT = exports.AMOUNT = TEXTURE_WIDTH * TEXTURE_HEIGHT

      exports.init = init
      exports.update = update
      exports.initAnimation = 0

      exports.positionRenderTarget = undef

      function init(renderer) {
        _renderer = renderer
        _followPoint = new THREE.Vector3()

        const rawShaderPrefix = `precision ${renderer.capabilities.precision} float;\n`

        const gl = _renderer.getContext()
        if (!gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) {
          alert('No support for vertex shader textures!')
          return
        }
        if (!gl.getExtension('OES_texture_float')) {
          alert('No OES_texture_float support for float textures!')
          return
        }

        _scene = new THREE.Scene()
        _camera = new THREE.Camera()
        _camera.position.z = 1

        _copyShader = new THREE.RawShaderMaterial({
          uniforms: {
            resolution: { type: 'v2', value: new THREE.Vector2(TEXTURE_WIDTH, TEXTURE_HEIGHT) },
            texture: { type: 't', value: undef },
          },
          vertexShader: rawShaderPrefix + shaderParse('#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n'),
          fragmentShader: rawShaderPrefix + shaderParse('#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texture;\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    gl_FragColor = texture2D( texture, uv );\n}\n'),
        })

        _positionShader = new THREE.RawShaderMaterial({
          uniforms: {
            resolution: { type: 'v2', value: new THREE.Vector2(TEXTURE_WIDTH, TEXTURE_HEIGHT) },
            texturePosition: { type: 't', value: undef },
            textureDefaultPosition: { type: 't', value: undef },
            mouse3d: { type: 'v3', value: new THREE.Vector3() },
            dieSpeed: { type: 'f', value: 0 },
            radius: { type: 'f', value: 0 },
            attraction: { type: 'f', value: 0 },
            time: { type: 'f', value: 0 },
            initAnimation: { type: 'f', value: 0 },
          },
          vertexShader: rawShaderPrefix + shaderParse('#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n'),
          fragmentShader: rawShaderPrefix + shaderParse('#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texturePosition;\nuniform sampler2D textureDefaultPosition;\nuniform float time;\nuniform float dieSpeed;\nuniform float radius;\nuniform float attraction;\nuniform float initAnimation;\nuniform vec3 mouse3d;\n\nvec4 mod289(vec4 x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nfloat mod289(float x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat permute(float x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt(float r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip) {\n    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n    vec4 p,s;\n\n    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n    s = vec4(lessThan(p, vec4(0.0)));\n    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n    return p;\n}\n\n#define F4 0.309016994374947451\n\nvec4 simplexNoiseDerivatives (vec4 v) {\n    const vec4  C = vec4( 0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);\n\n    vec4 i  = floor(v + dot(v, vec4(F4)) );\n    vec4 x0 = v -   i + dot(i, C.xxxx);\n\n    vec4 i0;\n    vec3 isX = step( x0.yzw, x0.xxx );\n    vec3 isYZ = step( x0.zww, x0.yyz );\n    i0.x = isX.x + isX.y + isX.z;\n    i0.yzw = 1.0 - isX;\n    i0.y += isYZ.x + isYZ.y;\n    i0.zw += 1.0 - isYZ.xy;\n    i0.z += isYZ.z;\n    i0.w += 1.0 - isYZ.z;\n\n    vec4 i3 = clamp( i0, 0.0, 1.0 );\n    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n    vec4 x1 = x0 - i1 + C.xxxx;\n    vec4 x2 = x0 - i2 + C.yyyy;\n    vec4 x3 = x0 - i3 + C.zzzz;\n    vec4 x4 = x0 + C.wwww;\n\n    i = mod289(i);\n    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n    vec4 j1 = permute( permute( permute( permute (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n    vec4 p0 = grad4(j0,   ip);\n    vec4 p1 = grad4(j1.x, ip);\n    vec4 p2 = grad4(j1.y, ip);\n    vec4 p3 = grad4(j1.z, ip);\n    vec4 p4 = grad4(j1.w, ip);\n\n    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    p4 *= taylorInvSqrt(dot(p4,p4));\n\n    vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)); //value of contributions from each corner at point\n    vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));\n\n    vec3 m0 = max(0.5 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0); //(0.5 - x^2) where x is the distance\n    vec2 m1 = max(0.5 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);\n\n    vec3 temp0 = -6.0 * m0 * m0 * values0;\n    vec2 temp1 = -6.0 * m1 * m1 * values1;\n\n    vec3 mmm0 = m0 * m0 * m0;\n    vec2 mmm1 = m1 * m1 * m1;\n\n    float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;\n    float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;\n    float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;\n    float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + mmm1[1] * p4.w;\n\n    return vec4(dx, dy, dz, dw) * 49.0;\n}\n\nvec3 curl( in vec3 p, in float noiseTime, in float persistence ) {\n\n    vec4 xNoisePotentialDerivatives = vec4(0.0);\n    vec4 yNoisePotentialDerivatives = vec4(0.0);\n    vec4 zNoisePotentialDerivatives = vec4(0.0);\n\n    for (int i = 0; i < 3; ++i) {\n\n        float twoPowI = pow(2.0, float(i));\n        float scale = 0.5 * twoPowI * pow(persistence, float(i));\n\n        xNoisePotentialDerivatives += simplexNoiseDerivatives(vec4(p * twoPowI, noiseTime)) * scale;\n        yNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;\n        zNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;\n    }\n\n    return vec3(\n        zNoisePotentialDerivatives[1] - yNoisePotentialDerivatives[2],\n        xNoisePotentialDerivatives[2] - zNoisePotentialDerivatives[0],\n        yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[1]\n    );\n\n}\n\nvoid main() {\n\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n    vec4 positionInfo = texture2D( texturePosition, uv );\n    vec3 position = mix(vec3(0.0, -200.0, 0.0), positionInfo.xyz, smoothstep(0.0, 0.3, initAnimation));\n    float life = positionInfo.a - dieSpeed;\n\n    vec3 followPosition = mix(vec3(0.0, -(1.0 - initAnimation) * 200.0, 0.0), mouse3d, smoothstep(0.2, 0.7, initAnimation));\n\n    if(life < 0.0) {\n        positionInfo = texture2D( textureDefaultPosition, uv );\n        position = positionInfo.xyz * (1.0 + sin(time * 15.0) * 0.2 + (1.0 - initAnimation)) * 0.4 * radius;\n        position += followPosition;\n        life = 0.5 + fract(positionInfo.w * 21.4131 + time);\n    } else {\n        vec3 delta = followPosition - position;\n        position += delta * (0.005 + life * 0.01) * attraction * (1.0 - smoothstep(50.0, 350.0, length(delta)));\n        position += curl(position * 0.02 + 3.0, time, 0.1 + (1.0 - life) * 0.1);\n    }\n\n    gl_FragColor = vec4(position, life);\n\n}\n'),
          blending: THREE.NoBlending,
          transparent: false,
          depthWrite: false,
          depthTest: false,
        })

        _mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), _copyShader)
        _scene.add(_mesh)

        _positionRenderTarget = new THREE.WebGLRenderTarget(TEXTURE_WIDTH, TEXTURE_HEIGHT, {
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
          minFilter: THREE.NearestFilter,
          magFilter: THREE.NearestFilter,
          format: THREE.RGBAFormat,
          type: THREE.FloatType,
          depthWrite: false,
          depthBuffer: false,
          stencilBuffer: false,
        })
        _positionRenderTarget2 = _positionRenderTarget.clone()
        _copyTexture(_createPositionTexture(), _positionRenderTarget)
        _copyTexture(_positionRenderTarget, _positionRenderTarget2)
      }

      function _copyTexture(input, output) {
        _mesh.material = _copyShader
        _copyShader.uniforms.texture.value = input
        _renderer.render(_scene, _camera, output)
      }

      function _updatePosition(dt) {
      // swap
        const tmp = _positionRenderTarget
        _positionRenderTarget = _positionRenderTarget2
        _positionRenderTarget2 = tmp

        _mesh.material = _positionShader
        _positionShader.uniforms.textureDefaultPosition.value = _textureDefaultPosition
        _positionShader.uniforms.texturePosition.value = _positionRenderTarget2
        _positionShader.uniforms.time.value += dt * 0.001
        _renderer.render(_scene, _camera, _positionRenderTarget)
      }

      function _createPositionTexture() {
        const positions = new Float32Array(AMOUNT * 4)
        let i4
        let r, phi, theta
        for (let i = 0; i < AMOUNT; i++) {
          i4 = i * 4
          // r = (0.5 + Math.pow(Math.random(), 0.4) * 0.5) * 50;
          r = (0.5 + Math.random() * 0.5) * 50
          phi = (Math.random() - 0.5) * Math.PI
          theta = Math.random() * Math.PI * 2
          positions[i4 + 0] = r * Math.cos(theta) * Math.cos(phi)
          positions[i4 + 1] = r * Math.sin(phi)
          positions[i4 + 2] = r * Math.sin(theta) * Math.cos(phi)
          positions[i4 + 3] = Math.random()
        }
        const texture = new THREE.DataTexture(positions, TEXTURE_WIDTH, TEXTURE_HEIGHT, THREE.RGBAFormat, THREE.FloatType)
        texture.minFilter = THREE.NearestFilter
        texture.magFilter = THREE.NearestFilter
        texture.needsUpdate = true
        texture.generateMipmaps = false
        texture.flipY = false
        _textureDefaultPosition = texture
        return texture
      }

      function update(dt) {
        const autoClearColor = _renderer.autoClearColor
        const clearColor = _renderer.getClearColor().getHex()
        const clearAlpha = _renderer.getClearAlpha()

        _renderer.autoClearColor = false

        _positionShader.uniforms.dieSpeed.value = settings.dieSpeed
        _positionShader.uniforms.radius.value = settings.radius
        _positionShader.uniforms.attraction.value = settings.attraction
        _positionShader.uniforms.initAnimation.value = exports.initAnimation

        if (settings.followMouse) {
          _positionShader.uniforms.mouse3d.value.copy(settings.mouse3d)
        }
        else {
          _followPointTime += dt * 0.001
          _followPoint.set(
            Math.cos(_followPointTime) * 160.0,
            Math.cos(_followPointTime * 4.0) * 40.0,
            Math.sin(_followPointTime * 2.0) * 160.0,
          )
          _positionShader.uniforms.mouse3d.value.lerp(_followPoint, 0.2)
        }

        // _renderer.setClearColor(0, 0);
        _updatePosition(dt)

        _renderer.setClearColor(clearColor, clearAlpha)
        _renderer.autoClearColor = autoClearColor
        exports.positionRenderTarget = _positionRenderTarget
      }
    }, { 10: 10, 19: 19, 21: 21 }],
    18: [function (require, module, exports) {
    // var THREE = require('three');

      /**
         * @author qiao / https://github.com/qiao
         * @author mrdoob / http://mrdoob.com
         * @author alteredq / http://alteredqualia.com/
         * @author WestLangley / https://github.com/WestLangley
         * @author erich666 / http://erichaines.com
         */
      /* global THREE, console */

      // This set of controls performs orbiting, dollying (zooming), and panning. It maintains
      // the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
      // supported.
      //
      //    Orbit - left mouse / touch: one finger move
      //    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
      //    Pan - right mouse, or arrow keys / touch: three finter swipe

      THREE.OrbitControls = function (object, domElement) {
        this.object = object
        this.domElement = (domElement !== undefined) ? domElement : document

        // API

        this.rotateEaseRatio = 0.02
        this.zoomEaseRatio = 0.05

        // Set to false to disable this control
        this.enabled = true

        // "target" sets the location of focus, where the control orbits around
        // and where it pans with respect to.
        this.target = new THREE.Vector3()

        // center is old, deprecated; use "target" instead
        this.center = this.target

        // This option actually enables dollying in and out; left as "zoom" for
        // backwards compatibility
        this.noZoom = false
        this.zoomSpeed = 1.0

        // Limits to how far you can dolly in and out ( PerspectiveCamera only )
        this.minDistance = 0
        this.maxDistance = Infinity

        // Limits to how far you can zoom in and out ( OrthographicCamera only )
        this.minZoom = 0
        this.maxZoom = Infinity

        // Set to true to disable this control
        this.noRotate = false
        this.rotateSpeed = 1.0

        // Set to true to disable this control
        this.noPan = false
        this.keyPanSpeed = 7.0 // pixels moved per arrow key push

        // Set to true to automatically rotate around the target
        this.autoRotate = false
        this.autoRotateSpeed = 2.0 // 30 seconds per round when fps is 60

        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0 // radians
        this.maxPolarAngle = Math.PI // radians

        // How far you can orbit horizontally, upper and lower limits.
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        this.minAzimuthAngle = -Infinity // radians
        this.maxAzimuthAngle = Infinity // radians

        // Set to true to disable use of the keys
        this.noKeys = false

        // The four arrow keys
        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }

        // Mouse buttons
        this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT }

        ////////////
        // internals

        const scope = this

        const EPS = 0.000001

        const rotateStart = new THREE.Vector2()
        const rotateEnd = new THREE.Vector2()
        const rotateDelta = new THREE.Vector2()

        const panStart = new THREE.Vector2()
        const panEnd = new THREE.Vector2()
        const panDelta = new THREE.Vector2()
        const panOffset = new THREE.Vector3()

        const offset = new THREE.Vector3()

        const dollyStart = new THREE.Vector2()
        const dollyEnd = new THREE.Vector2()
        const dollyDelta = new THREE.Vector2()

        let theta
        let phi
        let phiDelta = 0
        let thetaDelta = 0
        let scale = 1
        const pan = new THREE.Vector3()

        const lastPosition = new THREE.Vector3()
        const lastQuaternion = new THREE.Quaternion()

        const STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 }

        let state = STATE.NONE

        // for reset

        this.target0 = this.target.clone()
        this.position0 = this.object.position.clone()
        this.zoom0 = this.object.zoom

        // so camera.up is the orbit axis

        const quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0))
        const quatInverse = quat.clone().inverse()

        // events

        const changeEvent = { type: 'change' }
        const startEvent = { type: 'start' }
        const endEvent = { type: 'end' }

        this.rotateLeft = function (angle) {
          if (angle === undefined)

            angle = getAutoRotationAngle()

          thetaDelta -= angle
        }

        this.rotateUp = function (angle) {
          if (angle === undefined)

            angle = getAutoRotationAngle()

          phiDelta -= angle
        }

        // pass in distance in world space to move left
        this.panLeft = function (distance) {
          const te = this.object.matrix.elements

          // get X column of matrix
          panOffset.set(te[0], te[1], te[2])
          panOffset.multiplyScalar(-distance)

          pan.add(panOffset)
        }

        // pass in distance in world space to move up
        this.panUp = function (distance) {
          const te = this.object.matrix.elements

          // get Y column of matrix
          panOffset.set(te[4], te[5], te[6])
          panOffset.multiplyScalar(distance)

          pan.add(panOffset)
        }

        // pass in x,y of change desired in pixel space,
        // right and down are positive
        this.pan = function (deltaX, deltaY) {
          const element = scope.domElement === document ? scope.domElement.body : scope.domElement

          if (scope.object instanceof THREE.PerspectiveCamera) {
          // perspective
            const position = scope.object.position
            const offset = position.clone().sub(scope.target)
            let targetDistance = offset.length()

            // half of the fov is center to top of screen
            targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0)

            // we actually don't use screenWidth, since perspective camera is fixed to screen height
            scope.panLeft(2 * deltaX * targetDistance / element.clientHeight)
            scope.panUp(2 * deltaY * targetDistance / element.clientHeight)
          }
          else if (scope.object instanceof THREE.OrthographicCamera) {
          // orthographic
            scope.panLeft(deltaX * (scope.object.right - scope.object.left) / element.clientWidth)
            scope.panUp(deltaY * (scope.object.top - scope.object.bottom) / element.clientHeight)
          }
          else {
          // camera neither orthographic or perspective
            console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.')
          }
        }

        this.dollyIn = function (dollyScale) {
          if (dollyScale === undefined)

            dollyScale = getZoomScale()

          if (scope.object instanceof THREE.PerspectiveCamera) {
            scale /= dollyScale
          }
          else if (scope.object instanceof THREE.OrthographicCamera) {
            scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale))
            scope.object.updateProjectionMatrix()
            scope.dispatchEvent(changeEvent)
          }
          else {
            console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.')
          }
        }

        this.dollyOut = function (dollyScale) {
          if (dollyScale === undefined)

            dollyScale = getZoomScale()

          if (scope.object instanceof THREE.PerspectiveCamera) {
            scale *= dollyScale
          }
          else if (scope.object instanceof THREE.OrthographicCamera) {
            scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale))
            scope.object.updateProjectionMatrix()
            scope.dispatchEvent(changeEvent)
          }
          else {
            console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.')
          }
        }

        this.update = function () {
          const position = this.object.position

          offset.copy(position).sub(this.target)

          // rotate offset to "y-axis-is-up" space
          offset.applyQuaternion(quat)

          // angle from z-axis around y-axis

          theta = Math.atan2(offset.x, offset.z)

          // angle from y-axis

          phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y)

          if (this.autoRotate && state === STATE.NONE)

            this.rotateLeft(getAutoRotationAngle())

          const thetaDeltaBit = thetaDelta * this.rotateEaseRatio
          const phiDeltaBit = phiDelta * this.rotateEaseRatio
          const scaleBit = (scale - 1) * this.zoomEaseRatio
          theta += thetaDeltaBit
          phi += phiDeltaBit

          // restrict theta to be between desired limits
          theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, theta))

          // restrict phi to be between desired limits
          phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi))

          // restrict phi to be betwee EPS and PI-EPS
          phi = Math.max(EPS, Math.min(Math.PI - EPS, phi))

          let radius = offset.length() * (1 + scaleBit)

          // restrict radius to be between desired limits
          radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius))

          // move target to panned location
          this.target.add(pan)

          offset.x = radius * Math.sin(phi) * Math.sin(theta)
          offset.y = radius * Math.cos(phi)
          offset.z = radius * Math.sin(phi) * Math.cos(theta)

          // rotate offset back to "camera-up-vector-is-up" space
          offset.applyQuaternion(quatInverse)

          position.copy(this.target).add(offset)

          this.object.lookAt(this.target)

          thetaDelta -= thetaDeltaBit
          phiDelta -= phiDeltaBit
          scale = scale / (1 + scaleBit)
          pan.set(0, 0, 0)

          // update condition is:
          // min(camera displacement, camera rotation in radians)^2 > EPS
          // using small-angle approximation cos(x/2) = 1 - x^2 / 8

          if (lastPosition.distanceToSquared(this.object.position) > EPS
                    || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS) {
            this.dispatchEvent(changeEvent)

            lastPosition.copy(this.object.position)
            lastQuaternion.copy(this.object.quaternion)
          }
        }

        this.reset = function () {
          state = STATE.NONE

          this.target.copy(this.target0)
          this.object.position.copy(this.position0)
          this.object.zoom = this.zoom0

          this.object.updateProjectionMatrix()
          this.dispatchEvent(changeEvent)

          this.update()
        }

        this.getPolarAngle = function () {
          return phi
        }

        this.getAzimuthalAngle = function () {
          return theta
        }

        function getAutoRotationAngle() {
          return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed
        }

        function getZoomScale() {
          return 0.95 ** scope.zoomSpeed
        }

        function onMouseDown(event) {
          if (scope.enabled === false)
            return
          event.preventDefault()

          if (event.button === scope.mouseButtons.ORBIT) {
            if (scope.noRotate === true)
              return

            state = STATE.ROTATE

            rotateStart.set(event.clientX, event.clientY)
          }
          else if (event.button === scope.mouseButtons.ZOOM) {
            if (scope.noZoom === true)
              return

            state = STATE.DOLLY

            dollyStart.set(event.clientX, event.clientY)
          }
          else if (event.button === scope.mouseButtons.PAN) {
            if (scope.noPan === true)
              return

            state = STATE.PAN

            panStart.set(event.clientX, event.clientY)
          }

          if (state !== STATE.NONE) {
            document.addEventListener('mousemove', onMouseMove, false)
            document.addEventListener('mouseup', onMouseUp, false)
            scope.dispatchEvent(startEvent)
          }
        }

        function onMouseMove(event) {
          if (scope.enabled === false)
            return

          event.preventDefault()

          const element = scope.domElement === document ? scope.domElement.body : scope.domElement

          if (state === STATE.ROTATE) {
            if (scope.noRotate === true)
              return

            rotateEnd.set(event.clientX, event.clientY)
            rotateDelta.subVectors(rotateEnd, rotateStart)

            // rotating across whole screen goes 360 degrees around
            scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed)

            // rotating up and down along whole screen attempts to go 360, but limited to 180
            scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed)

            rotateStart.copy(rotateEnd)
          }
          else if (state === STATE.DOLLY) {
            if (scope.noZoom === true)
              return

            dollyEnd.set(event.clientX, event.clientY)
            dollyDelta.subVectors(dollyEnd, dollyStart)

            if (dollyDelta.y > 0)

              scope.dollyIn()

            else if (dollyDelta.y < 0)

              scope.dollyOut()

            dollyStart.copy(dollyEnd)
          }
          else if (state === STATE.PAN) {
            if (scope.noPan === true)
              return

            panEnd.set(event.clientX, event.clientY)
            panDelta.subVectors(panEnd, panStart)

            scope.pan(panDelta.x, panDelta.y)

            panStart.copy(panEnd)
          }

          if (state !== STATE.NONE)
            scope.update()
        }

        function onMouseUp(/* event */) {
          if (scope.enabled === false)
            return

          document.removeEventListener('mousemove', onMouseMove, false)
          document.removeEventListener('mouseup', onMouseUp, false)
          scope.dispatchEvent(endEvent)
          state = STATE.NONE
        }

        function onMouseWheel(event) {
          if (scope.enabled === false || scope.noZoom === true || state !== STATE.NONE)
            return

          event.preventDefault()
          event.stopPropagation()

          let delta = 0

          if (event.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9
            delta = event.wheelDelta
          }
          else if (event.detail !== undefined) { // Firefox
            delta = -event.detail
          }

          if (delta > 0)

            scope.dollyOut()

          else if (delta < 0)

            scope.dollyIn()

          scope.update()
          scope.dispatchEvent(startEvent)
          scope.dispatchEvent(endEvent)
        }

        function onKeyDown(event) {
          if (scope.enabled === false || scope.noKeys === true || scope.noPan === true)
            return

          switch (event.keyCode) {
            case scope.keys.UP:
              scope.pan(0, scope.keyPanSpeed)
              scope.update()
              break

            case scope.keys.BOTTOM:
              scope.pan(0, -scope.keyPanSpeed)
              scope.update()
              break

            case scope.keys.LEFT:
              scope.pan(scope.keyPanSpeed, 0)
              scope.update()
              break

            case scope.keys.RIGHT:
              scope.pan(-scope.keyPanSpeed, 0)
              scope.update()
              break
          }
        }

        function touchstart(event) {
          if (scope.enabled === false)
            return

          switch (event.touches.length) {
            case 1: // one-fingered touch: rotate

              if (scope.noRotate === true)
                return

              state = STATE.TOUCH_ROTATE

              rotateStart.set(event.touches[0].pageX, event.touches[0].pageY)
              break

            case 2: // two-fingered touch: dolly

              if (scope.noZoom === true)
                return

              state = STATE.TOUCH_DOLLY

              var dx = event.touches[0].pageX - event.touches[1].pageX
              var dy = event.touches[0].pageY - event.touches[1].pageY
              var distance = Math.sqrt(dx * dx + dy * dy)
              dollyStart.set(0, distance)
              break

            case 3: // three-fingered touch: pan

              if (scope.noPan === true)
                return

              state = STATE.TOUCH_PAN

              panStart.set(event.touches[0].pageX, event.touches[0].pageY)
              break

            default:

              state = STATE.NONE
          }

          if (state !== STATE.NONE)
            scope.dispatchEvent(startEvent)
        }

        function touchmove(event) {
          if (scope.enabled === false)
            return

          event.preventDefault()
          event.stopPropagation()

          const element = scope.domElement === document ? scope.domElement.body : scope.domElement

          switch (event.touches.length) {
            case 1: // one-fingered touch: rotate

              if (scope.noRotate === true)
                return
              if (state !== STATE.TOUCH_ROTATE)
                return

              rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY)
              rotateDelta.subVectors(rotateEnd, rotateStart)

              // rotating across whole screen goes 360 degrees around
              scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed)
              // rotating up and down along whole screen attempts to go 360, but limited to 180
              scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed)

              rotateStart.copy(rotateEnd)

              scope.update()
              break

            case 2: // two-fingered touch: dolly

              if (scope.noZoom === true)
                return
              if (state !== STATE.TOUCH_DOLLY)
                return

              var dx = event.touches[0].pageX - event.touches[1].pageX
              var dy = event.touches[0].pageY - event.touches[1].pageY
              var distance = Math.sqrt(dx * dx + dy * dy)

              dollyEnd.set(0, distance)
              dollyDelta.subVectors(dollyEnd, dollyStart)

              if (dollyDelta.y > 0)

                scope.dollyOut()

              else if (dollyDelta.y < 0)

                scope.dollyIn()

              dollyStart.copy(dollyEnd)

              scope.update()
              break

            case 3: // three-fingered touch: pan

              if (scope.noPan === true)
                return
              if (state !== STATE.TOUCH_PAN)
                return

              panEnd.set(event.touches[0].pageX, event.touches[0].pageY)
              panDelta.subVectors(panEnd, panStart)

              scope.pan(panDelta.x, panDelta.y)

              panStart.copy(panEnd)

              scope.update()
              break

            default:

              state = STATE.NONE
          }
        }

        function touchend(/* event */) {
          if (scope.enabled === false)
            return

          scope.dispatchEvent(endEvent)
          state = STATE.NONE
        }

        this.domElement.addEventListener('contextmenu', (event) => { event.preventDefault() }, false)
        this.domElement.addEventListener('mousedown', onMouseDown, false)
        this.domElement.addEventListener('mousewheel', onMouseWheel, false)
        this.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false) // firefox

        this.domElement.addEventListener('touchstart', touchstart, false)
        this.domElement.addEventListener('touchend', touchend, false)
        this.domElement.addEventListener('touchmove', touchmove, false)

        window.addEventListener('keydown', onKeyDown, false)

        // force an update at start
        this.update()
      }

      THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype)
      THREE.OrbitControls.prototype.constructor = THREE.OrbitControls

      module.exports = THREE.OrbitControls
    }, {}],
    19: [function (require, module, exports) {
      exports.useStats = false
      exports.simulatorTextureWidth = 256
      exports.simulatorTextureHeight = 256
      exports.useTriangleParticles = true
      exports.followMouse = true

      exports.dieSpeed = 0.015
      exports.radius = 0.6
      exports.attraction = 1
      exports.shadowDarkness = 0.45

      exports.bgColor = '#dfdfdf'
      exports.color1 = '#ffffff'
      exports.color2 = '#ffffff'
    }, {}],
    20: [function (require, module, exports) {
      const isMobile = /(iPad|iPhone|Android)/i.test(navigator.userAgentData)

      exports.pass = pass

      let _callback

      function pass(func) {
        if (isMobile) {
          _callback = func
          init()
        }
        else {
          func()
        }
      }

      let _container
      let _bypass

      function init() {
        _container = document.querySelector('.mobile')
        _container.style.display = 'block'

        _bypass = document.querySelector('.mobile-bypass')
        if (_bypass)
          _bypass.addEventListener('click', _onByPassClick)
      }

      function _onByPassClick() {
        _container.parentNode.removeChild(_container)
        _callback()
      }
    }, {}],
    21: [function (require, module, exports) {
      const THREE = require(10)

      const threeChunkReplaceRegExp = /\/\/\s?chunk_replace\s(.+)([\d\D]+)\/\/\s?end_chunk_replace/gm
      const threeChunkRegExp = /\/\/\s?chunk\(\s?(\w+)\s?\);/g
      // var glslifyBugFixRegExp = /(_\d+_\d+)(_\d+_\d+)+/g;
      // var glslifyGlobalRegExp = /GLOBAL_VAR_([^_\.\)\;\,\s]+)(_\d+_\d+)?/g;
      const glslifyGlobalRegExp = /GLOBAL_VAR_([^_\.\)\;\,\s]+)(_\d+)?/g

      let _chunkReplaceObj

      function _storeChunkReplaceParse(shader) {
        _chunkReplaceObj = {}
        return shader.replace(threeChunkReplaceRegExp, _storeChunkReplaceFunc)
      }

      function _threeChunkParse(shader) {
        return shader.replace(threeChunkRegExp, _replaceThreeChunkFunc)
      }

      // function _glslifyBugFixParse(shader) {
      //     return shader.replace(glslifyBugFixRegExp, _returnFirst);
      // }

      function _glslifyGlobalParse(shader) {
        return shader.replace(glslifyGlobalRegExp, _returnFirst)
      }

      function _storeChunkReplaceFunc(a, b, c) {
        _chunkReplaceObj[b.trim()] = c
        return ''
      }

      function _replaceThreeChunkFunc(a, b) {
        let str = `${THREE.ShaderChunk[b]}\n`
        for (const id in _chunkReplaceObj)
          str = str.replace(id, _chunkReplaceObj[id])

        return str
      }

      function _returnFirst(a, b) {
        return b
      }

      function parse(shader) {
        shader = _storeChunkReplaceParse(shader)
        shader = _threeChunkParse(shader)
        // shader = _glslifyBugFixParse(shader);
        return _glslifyGlobalParse(shader)
      }

      module.exports = parse
    }, { 10: 10 }],
    22: [function (require, module, exports) {
      const dat = require(1)
      const Stats = require(9)
      const css = require(4)
      const raf = require(8)

      // const THREE = require(10)

      const OrbitControls = require(18)
      const settings = require(19)

      const math = require(24)
      const ease = require(23)
      const mobile = require(20)

      const simulator = require(17)
      const particles = require(16)
      const lights = require(15)
      const floor = require(14)

      let undef
      let _gui
      let _stats

      let _width = 0
      let _height = 0

      let _control
      let _camera
      let _scene
      let _renderer

      let _time = 0
      const _ray = new THREE.Ray()

      let _initAnimation = 0

      let _bgColor
      let _logo
      let _footerItems

      function init() {
        if (settings.useStats) {
          _stats = new Stats()
          css(_stats.domElement, {
            position: 'absolute',
            left: '0px',
            top: '0px',
            zIndex: 2048,
          })

          document.body.appendChild(_stats.domElement)
        }

        _bgColor = new THREE.Color(settings.bgColor)
        settings.mouse = new THREE.Vector2(0, 0)
        settings.mouse3d = _ray.origin

        _renderer = new THREE.WebGLRenderer({
        // transparent : true,
        // premultipliedAlpha : false,
          antialias: true,
        })
        _renderer.setClearColor(settings.bgColor)
        _renderer.shadowMap.type = THREE.PCFSoftShadowMap
        _renderer.shadowMap.enabled = true
        document.body.appendChild(_renderer.domElement)

        _scene = new THREE.Scene()
        _scene.fog = new THREE.FogExp2(settings.bgColor, 0.001)

        _camera = new THREE.PerspectiveCamera(45, 1, 10, 3000)
        _camera.position.set(300, 60, 300).normalize().multiplyScalar(1000)
        settings.cameraPosition = _camera.position

        simulator.init(_renderer)
        particles.init(_renderer)
        _scene.add(particles.container)

        lights.init(_renderer)
        _scene.add(lights.mesh)

        floor.init(_renderer)
        floor.mesh.position.y = -100
        _scene.add(floor.mesh)

        _control = new OrbitControls(_camera, _renderer.domElement)
        _control.maxDistance = 1000
        _control.minPolarAngle = 0.3
        _control.maxPolarAngle = Math.PI / 2 - 0.1
        _control.noPan = true
        _control.update()

        _gui = new dat.GUI()
        const simulatorGui = _gui.addFolder('simulator')
        simulatorGui.add(settings, 'dieSpeed', 0.0005, 0.05)
        simulatorGui.add(settings, 'radius', 0.2, 3)
        simulatorGui.add(settings, 'attraction', -2, 2)
        simulatorGui.add(settings, 'followMouse').name('follow mouse')

        const renderingGui = _gui.addFolder('rendering')
        renderingGui.add(settings, 'shadowDarkness', 0, 1).name('shadow')
        renderingGui.add(settings, 'useTriangleParticles').name('new particle')
        renderingGui.addColor(settings, 'color1').name('base Color')
        renderingGui.addColor(settings, 'color2').name('fade Color')
        renderingGui.addColor(settings, 'bgColor').name('background Color')
        renderingGui.open()

        _logo = document.querySelector('.logo')
        document.querySelector('.footer').style.display = 'block'
        _footerItems = document.querySelectorAll('.footer span')

        window.addEventListener('resize', _onResize)
        window.addEventListener('mousemove', _onMove)
        window.addEventListener('touchmove', _bindTouch(_onMove))

        _time = Date.now()
        _onResize()
        _loop()
      }

      function _bindTouch(func) {
        return function (evt) {
          func(evt.changedTouches[0])
        }
      }

      function _onMove(evt) {
        settings.mouse.x = (evt.pageX / _width) * 2 - 1
        settings.mouse.y = -(evt.pageY / _height) * 2 + 1
      }

      function _onResize() {
        _width = window.innerWidth
        _height = window.innerHeight

        _camera.aspect = _width / _height
        _camera.updateProjectionMatrix()
        _renderer.setSize(_width, _height)
      }

      function _loop() {
        const newTime = Date.now()
        raf(_loop)
        if (settings.useStats)
          _stats.begin()
        _render(newTime - _time)
        if (settings.useStats)
          _stats.end()
        _time = newTime
      }

      function _render(dt) {
        let ratio
        _bgColor.setStyle(settings.bgColor)
        const tmpColor = floor.mesh.material.color
        tmpColor.lerp(_bgColor, 0.05)
        _scene.fog.color.copy(tmpColor)
        _renderer.setClearColor(tmpColor.getHex())

        _initAnimation = Math.min(_initAnimation + dt * 0.00025, 1)
        simulator.initAnimation = _initAnimation

        _control.maxDistance = _initAnimation === 1 ? 1000 : math.lerp(1000, 450, ease.easeOutCubic(_initAnimation))
        _control.update()
        lights.update(dt, _camera)

        // update mouse3d
        _camera.updateMatrixWorld()
        _ray.origin.setFromMatrixPosition(_camera.matrixWorld)
        _ray.direction.set(settings.mouse.x, settings.mouse.y, 0.5).unproject(_camera).sub(_ray.origin).normalize()
        const distance = _ray.origin.length() / Math.cos(Math.PI - _ray.direction.angleTo(_ray.origin))
        _ray.origin.add(_ray.direction.multiplyScalar(distance * 1.0))
        simulator.update(dt)
        particles.update(dt)

        ratio = Math.min((1 - Math.abs(_initAnimation - 0.5) * 2) * 1.2, 1)
        const blur = (1 - ratio) * 10
        _logo.style.display = ratio ? 'block' : 'none'
        if (ratio) {
          _logo.style.opacity = ratio
          _logo.style.webkitFilter = `blur(${blur}px)`
          ratio = (0.8 + _initAnimation ** 1.5 * 0.5)
          if (_width < 580)
            ratio *= 0.5
          _logo.style.transform = `scale3d(${ratio},${ratio},1)`
        }

        for (let i = 0, len = _footerItems.length; i < len; i++) {
          ratio = math.unLerp(0.5 + i * 0.01, 0.6 + i * 0.01, _initAnimation)
          _footerItems[i].style.transform = `translate3d(0,${(1 - ratio ** 3) * 50}px,0)`
        }

        _renderer.render(_scene, _camera)
      }

      mobile.pass(init)
    }, { 1: 1, 10: 10, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 23: 23, 24: 24, 4: 4, 8: 8, 9: 9 }],
    23: [function (require, module, exports) {
    // from https://github.com/kaelzhang/easing-functions/
      var basic = {
        Linear: {
          None(e) {
            return e
          },
        },
        Quad: {
          In(e) {
            return e * e
          },
          Out(e) {
            return e * (2 - e)
          },
          InOut(e) {
            if ((e *= 2) < 1)
              return 0.5 * e * e
            return -0.5 * (--e * (e - 2) - 1)
          },
        },
        Cubic: {
          In(e) {
            return e * e * e
          },
          Out(e) {
            return --e * e * e + 1
          },
          InOut(e) {
            if ((e *= 2) < 1)
              return 0.5 * e * e * e
            return 0.5 * ((e -= 2) * e * e + 2)
          },
        },
        Quart: {
          In(e) {
            return e * e * e * e
          },
          Out(e) {
            return 1 - --e * e * e * e
          },
          InOut(e) {
            if ((e *= 2) < 1)
              return 0.5 * e * e * e * e
            return -0.5 * ((e -= 2) * e * e * e - 2)
          },
        },
        Quint: {
          In(e) {
            return e * e * e * e * e
          },
          Out(e) {
            return --e * e * e * e * e + 1
          },
          InOut(e) {
            if ((e *= 2) < 1)
              return 0.5 * e * e * e * e * e
            return 0.5 * ((e -= 2) * e * e * e * e + 2)
          },
        },
        Sine: {
          In(e) {
            return 1 - Math.cos(e * Math.PI / 2)
          },
          Out(e) {
            return Math.sin(e * Math.PI / 2)
          },
          InOut(e) {
            return 0.5 * (1 - Math.cos(Math.PI * e))
          },
        },
        Expo: {
          In(e) {
            return e === 0 ? 0 : 1024 ** (e - 1)
          },
          Out(e) {
            return e === 1 ? 1 : 1 - 2 ** (-10 * e)
          },
          InOut(e) {
            if (e === 0)
              return 0
            if (e === 1)
              return 1
            if ((e *= 2) < 1)
              return 0.5 * 1024 ** (e - 1)
            return 0.5 * (-(2 ** (-10 * (e - 1))) + 2)
          },
        },
        Circ: {
          In(e) {
            return 1 - Math.sqrt(1 - e * e)
          },
          Out(e) {
            return Math.sqrt(1 - --e * e)
          },
          InOut(e) {
            if ((e *= 2) < 1)
              return -0.5 * (Math.sqrt(1 - e * e) - 1)
            return 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
          },
        },
        Elastic: {
          In(e) {
            let t; let n = 0.1
            const r = 0.4
            if (e === 0)
              return 0
            if (e === 1)
              return 1
            if (!n || n < 1) {
              n = 1
              t = r / 4
            }
            else { t = r * Math.asin(1 / n) / (2 * Math.PI) }
            return -(n * 2 ** (10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r))
          },
          Out(e) {
            let t; let n = 0.1
            const r = 0.4
            if (e === 0)
              return 0
            if (e === 1)
              return 1
            if (!n || n < 1) {
              n = 1
              t = r / 4
            }
            else { t = r * Math.asin(1 / n) / (2 * Math.PI) }
            return n * 2 ** (-10 * e) * Math.sin((e - t) * 2 * Math.PI / r) + 1
          },
          InOut(e) {
            let t; let n = 0.1
            const r = 0.4
            if (e === 0)
              return 0
            if (e === 1)
              return 1
            if (!n || n < 1) {
              n = 1
              t = r / 4
            }
            else {
              t = r * Math.asin(1 / n) / (2 * Math.PI)
            }
            if ((e *= 2) < 1)
              return -0.5 * n * 2 ** (10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r)
            return n * 2 ** (-10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r) * 0.5 + 1
          },
        },
        Back: {
          In(e) {
            const t = 1.70158
            return e * e * ((t + 1) * e - t)
          },
          Out(e) {
            const t = 1.70158
            return --e * e * ((t + 1) * e + t) + 1
          },
          InOut(e) {
            const t = 1.70158 * 1.525
            if ((e *= 2) < 1)
              return 0.5 * e * e * ((t + 1) * e - t)
            return 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
          },
        },
        Bounce: {
          In(e) {
            return 1 - basic.Bounce.Out(1 - e)
          },
          Out(e) {
            if (e < 1 / 2.75)
              return 7.5625 * e * e
            else if (e < 2 / 2.75)
              return 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            else if (e < 2.5 / 2.75)
              return 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
            else
              return 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375
          },
          InOut(e) {
            if (e < 0.5)
              return basic.Bounce.In(e * 2) * 0.5
            return basic.Bounce.Out(e * 2 - 1) * 0.5 + 0.5
          },
        },
      }

      exports.basic = basic
      exports.linear = basic.Linear

      let id, list
      for (id in basic) {
        if (id !== 'Linear') {
          list = basic[id]
          exports[`easeIn${id}`] = list.In
          exports[`easeOut${id}`] = list.Out
          exports[`easeInOut${id}`] = list.InOut
        }
      }
    }, {}],
    24: [function (require, module, exports) {
      for (const id in Math)
        exports[id] = Math[id]

      exports.step = step
      exports.smoothstep = smoothstep
      exports.clamp = clamp
      exports.mix = exports.lerp = mix
      exports.unMix = exports.unLerp = unMix
      exports.unClampedMix = exports.unClampedLerp = unClampedMix
      exports.upClampedUnMix = exports.unClampedUnLerp = upClampedUnMix
      exports.fract = fract
      exports.hash = hash
      exports.hash2 = hash2
      exports.sign = sign

      const PI = Math.PI
      const TAU = exports.TAU = PI * 2

      function step(edge, val) {
        return val < edge ? 0 : 1
      }

      function smoothstep(edge0, edge1, val) {
        val = unMix(edge0, edge1, val)
        return val * val(3 - val * 2)
      }

      function clamp(val, min, max) {
        return val < min ? min : val > max ? max : val
      }

      function mix(min, max, val) {
        return val <= 0 ? min : val >= 1 ? max : min + (max - min) * val
      }

      function unMix(min, max, val) {
        return val <= min ? 0 : val >= max ? 1 : (val - min) / (max - min)
      }

      function unClampedMix(min, max, val) {
        return min + (max - min) * val
      }

      function upClampedUnMix(min, max, val) {
        return (val - min) / (max - min)
      }

      function fract(val) {
        return val - Math.floor(val)
      }

      function hash(val) {
        return fract(Math.sin(val) * 43758.5453123)
      }

      function hash2(val1, val2) {
        return fract(Math.sin(val1 * 12.9898 + val2 * 4.1414) * 43758.5453)
      }

      function sign(val) {
        return val ? val < 0 ? -1 : 1 : 0
      }

}
