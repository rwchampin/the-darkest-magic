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
}
