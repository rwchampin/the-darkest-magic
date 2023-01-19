/* eslint-disable no-console */
import { createNoise2D, createNoise3D, createNoise4D } from 'simplex-noise'
import * as THREE from 'three'
import { Pane } from 'tweakpane'

const gui = new Pane()
export const Utils = {
  errorMessages: {
    304: 'Not modified',
    404: 'Page not found',
    500: 'Internal server error',
    503: 'Service unavailable',
    undefined: 'Unknown error',
  },

  createCanvas: () => {
    const canvas = document.createElement('canvas')

    const context = canvas.getContext('2d')
    return {
      canvas,
      context,
    }
  },

  math: {
    PI: Math.PI,
    PI2: Math.PI / 2,
    Deg: Math.PI / 180,
    Random: Math.random,
    Min: Math.min,
    Max: Math.max,
    Sin: Math.sin,
    Cos: Math.cos,
    Sqrt: Math.sqrt,
    Acos: Math.acos,
    Atan2: Math.atan2,
    Abs: Math.abs,
    degToRad: (deg) => {
      return (deg * Math.PI) / 180
    },
    kbToMB: (v) => {
      const kb = v / 1024 / 1024
      return `${kb.toFixed(2)} MB`
    },
    v2: {
      get: (x, y) => new THREE.Vector2(x, y),
      add: (v1, v2) => {
        v1.x = v1.x + v2.x
        v1.y = v1.y + v2.y
      },
      sub: (v1, v2) => {
        v1.x = v1.x - v2.x
        v1.y = v1.y - v2.y
      },
      mult: (v1, v2) => {
        v1.x = v1.x * v2.x
        v1.y = v1.y * v2.y
      },
      div: (v1, v2) => {
        v1.x = v1.x / v2.x
        v1.y = v1.y / v2.y
      },
      mag: (v1) => {
        return Math.sqrt(v1.x * v1.x + v1.y * v1.y)
      },
      distanceTo: (v1, v2) => {
        const x = v2.x - v1.x
        const y = v2.y - v1.y
        return Math.sqrt(x * x + y * y)
      },
      normalize: (v1) => {
        const mag = Utils.math.v2.mag(v1)
        v1.x = v1.x / mag
        v1.y = v1.y / mag
      },
      angle: (v1) => {
        return Math.atan2(v1.y, v1.x)
      },
      rotate: (v1, angle) => {
        const x = v1.x * Math.cos(angle) - v1.y * Math.sin(angle)
        const y = v1.x * Math.sin(angle) + v1.y * Math.cos(angle)
        v1.x = x
        v1.y = y
      },
      rotateAround: (v1, v2, angle) => {
        const x = v1.x - v2.x
        const y = v1.y - v2.y
        const x1 = x * Math.cos(angle) - y * Math.sin(angle)
        const y1 = x * Math.sin(angle) + y * Math.cos(angle)
        v1.x = x1 + v2.x
        v1.y = y1 + v2.y
      },
      angleBetween: (v1, v2) => {
        return Math.atan2(v2.y - v1.y, v2.x - v1.x)
      },

      lerp: (v1, v2, t) => {
        v1.x = v1.x + (v2.x - v1.x) * t
        v1.y = v1.y + (v2.y - v1.y) * t
      },

      lerpAngle: (v1, v2, t) => {
        const angle = Utils.math.v2.angleBetween(v1, v2)
        const x = v1.x + Math.cos(angle) * t
        const y = v1.y + Math.sin(angle) * t
        v1.x = x
        v1.y = y
      },

      lerpDistance: (v1, v2, t) => {
        // const distance = Utils.math.v2.distanceTo(v1, v2)
        const x = v1.x + (v2.x - v1.x) * t
        const y = v1.y + (v2.y - v1.y) * t
        v1.x = x
        v1.y = y
      },

      randomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
      },

      getVelocity: (angle, speed) => {
        return {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        }
      },

      getAngle: (v1, v2) => {
        return Math.atan2(v2.y - v1.y, v2.x - v1.x)
      },

      getSpeed: (v1, v2) => {
        return Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2)
      },

      getDistance: (v1, v2) => {
        return Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2)
      },

      getDistanceSquared: (v1, v2) => {
        // used for comparing distances
        return (v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2
      },

      circlePack: (v1, v2, radius) => {
        const distance = Utils.math.v2.distanceTo(v1, v2)
        const x = v1.x + ((v2.x - v1.x) * radius) / distance
        const y = v1.y + ((v2.y - v1.y) * radius) / distance
        v1.x = x
        v1.y = y
      },

      isOnScreen: (v1) => {
        const w = window.innerWidth
        const h = window.innerHeight
        return v1.x > 0 && v1.x < w && v1.y > 0 && v1.y < h
      },

      raymarchingSmoothUnion: (d1, d2, k) => {
        // d1 and d2 are the distances to the two objects
        // k is the smoothness
        // use this to get the distance to the closest object
        // render inside the object by checking if the distance is less than 0
        const h = Math.max(k - Math.abs(d1 - d2), 0) / k
        return Math.min(d1, d2) - h * h * k * (1.0 / 4.0)
      },
    },
    v3: {
      get: (x, y, z) => new THREE.Vector3(x, y, z),
      add: (v1, v2) => {
        v1.x = v1.x + v2.x
        v1.y = v1.y + v2.y
        v1.z = v1.z + v2.z
      },
      sub: (v1, v2) => {
        v1.x = v1.x - v2.x
        v1.y = v1.y - v2.y
        v1.z = v1.z - v2.z
      },
      mult: (v1, v2) => {
        v1.x = v1.x * v2.x
        v1.y = v1.y * v2.y
        v1.z = v1.z * v2.z
      },
      div: (v1, v2) => {
        v1.x = v1.x / v2.x
        v1.y = v1.y / v2.y
        v1.z = v1.z / v2.z
      },
      mag: (v1) => {
        return Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z)
      },
      distanceTo: (v1, v2) => {
        const x = v2.x - v1.x
        const y = v2.y - v1.y
        const z = v2.z - v1.z
        return Math.sqrt(x * x + y * y + z * z)
      },
      isOnScreen: (v1) => {
        const w = window.innerWidth
        const h = window.innerHeight
        return v1.x > 0 && v1.x < w && v1.y > 0 && v1.y < h
      },
      reverseDirectionBasedOnEdge: (v1) => {
        const w = window.innerWidth
        const h = window.innerHeight
        if (v1.x < 0)
          v1.x = 0
        if (v1.x > w)
          v1.x = w
        if (v1.y < 0)
          v1.y = 0
        if (v1.y > h)
          v1.y = h
      },
      createPerlinNoiseFields: (v1, v2, v3, v4) => {
        const x = Utils.math.v3.get(
          Utils.math.noise.simplex2(v1.x, v1.y),
          Utils.math.noise.simplex2(v2.x, v2.y),
          Utils.math.noise.simplex2(v3.x, v3.y),
        )
        const y = Utils.math.v3.get(
          Utils.math.noise.simplex2(v1.x, v1.y),
          Utils.math.noise.simplex2(v2.x, v2.y),
          Utils.math.noise.simplex2(v3.x, v3.y),
        )
        const z = Utils.math.v3.get(
          Utils.math.noise.simplex2(v1.x, v1.y),
          Utils.math.noise.simplex2(v2.x, v2.y),
          Utils.math.noise.simplex2(v3.x, v3.y),
        )
        const lerpPerlins = Utils.math.v3.get(
          Utils.math.lerp(x.x, y.x, v4.x),
          Utils.math.lerp(x.y, y.y, v4.x),
          Utils.math.lerp(x.z, y.z, v4.x),
        )
        return Utils.math.v3.get(
          Utils.math.lerp(lerpPerlins.x, z.x, v4.y),
          Utils.math.lerp(lerpPerlins.y, z.y, v4.y),
          Utils.math.lerp(lerpPerlins.z, z.z, v4.y),
        )
      },

      createPerlinNoiseField: (v1, v2, v3) => {
        const x = Utils.math.noise.simplex2(v1.x, v1.y)
        const y = Utils.math.noise.simplex2(v2.x, v2.y)
        const z = Utils.math.noise.simplex2(v3.x, v3.y)
        return Utils.math.v3.get(x, y, z)
      },

      normalize: (v1) => {
        const mag = Utils.math.v3.mag(v1)
        v1.x = v1.x / mag
        v1.y = v1.y / mag
        v1.z = v1.z / mag
      },
      cross: (v1, v2) => {
        const x = v1.y * v2.z - v1.z * v2.y
        const y = v1.z * v2.x - v1.x * v2.z
        const z = v1.x * v2.y - v1.y * v2.x
        return new THREE.Vector3(x, y, z)
      },
      dot: (v1, v2) => {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
      },
      angleBetween: (v1, v2) => {
        const dot = Utils.math.v3.dot(v1, v2)
        const mag1 = Utils.math.v3.mag(v1)
        const mag2 = Utils.math.v3.mag(v2)
        const angle = Math.acos(dot / (mag1 * mag2))
        return angle
      },
      angle: (v1) => {
        return Math.atan2(v1.y, v1.x)
      },
    },
    v4: {
      get: (x, y, z, w) => new THREE.Vector2(x, y, z, w),
      set: (vOut, x, y, z, w) => {
        vOut.x = x || 0
        vOut.y = y || 0
        vOut.z = z || 0

        vOut.w = w || 0
      },
      distanceTo: (v1, v2) => {
        const x = v2.x - v1.x
        const y = v2.y - v1.y
        const z = v2.z - v1.z
        const w = v2.w - v1.w
        return Math.sqrt(x * x + y * y + z * z + w * w)
      },
      addVectorTo: (vOut, vTarget) => {
        vOut.x = vOut.x + vTarget.x
        vOut.y = vOut.y + vTarget.y
        vOut.z = vOut.z + vTarget.z
        vOut.w = vOut.w + vTarget.w
      },
      getAngleBetween: (v1, v2) => {
        const x = v2.x - v1.x
        const y = v2.y - v1.y
        // const z = v2.z - v1.z
        // const w = v2.w - v1.w
        return Math.atan2(y, x)
      },
    },
    resetVector: (vOut, x, y) => {
      vOut.x = x || 0
      vOut.y = y || 0
    },

    distanceTo: (v1, v2) => {
      const x = v2.x - v1.x
      const y = v2.y - v1.y
      return Utils.math.Sqrt(x * x + y * y)
    },

    addVectorTo: (vOut, vTarget) => {
      vOut.x = vOut.x + vTarget.x
      vOut.y = vOut.y + vTarget.y
    },

    getAngleBetween: (v1, v2) => {
      const x = v2.x - v1.x
      const y = v2.y - v1.y
      return Utils.math.Atan2(y, x)
    },

    randomInteger: (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    noise2d: () => {
      const noise2d = createNoise2D()
      return noise2d
    },
    noise3d: () => {
      const noise3d = createNoise3D()
      return noise3d
    },
    noise4d: () => {
      const noise4d = createNoise4D()
      return noise4d
    },
    morphMesh: () => {
      const particlesMax = 10000

      // const w2 = window.innerWidth / 2
      // const h2 = window.innerHeight / 2

      // const geometry = new THREE.BufferGeometry()
      // const positions = []
      // const count = mesh.geometry.attributes.position.count
      //* * POSITION IN ROTATING SHERE IN MIDDLE OF SCREEN */

      for (let i = 0; i < particlesMax; i++) {
        // const x = mesh.geometry.attributes.position.getX(i)
        // const y = mesh.geometry.attributes.position.getY(i)
        // const z = mesh.geometry.attributes.position.getZ(i)
        //* * ROTATE PRTICLES IN SHERE HAPE */
      }
      // const geo = new THREE.BufferGeometry()
      // const material = new THREE.PointsMaterial({
      //   size: 0.1,
      //   color: 0xFFFFFF,
      // })

      // mesh.geometry.attributes.position.forEach((v, i) => {
      //   const tv = target.geometry.vertices[i]
      //   v.x += (tv.x - v.x) * speed
      //   v.y += (tv.y - v.y) * speed
      //   v.z += (tv.z - v.z) * speed
      // })
      // mesh.geometry.verticesNeedUpdate = true
    },
  },

  color: {
    lerpColor: (color1, color2, amount) => {
      if (!amount)
        amount = 0.5
      const c1 = new THREE.Color(color1)
      const c2 = new THREE.Color(color2)
      return c1.lerp(c2, amount)
    },
    getColorsBetween: (color1, color2, steps) => {
      const colors = []
      const step = 1 / steps
      for (let i = 0; i < steps; i++) {
        const color = Utils.color.lerpColor(color1, color2, step * i)
        colors.push(color)
      }
      return colors
    },
    isFormattedCssColor: (color) => {
      return (
        color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) || color.match(/^rgb/)
      )
    },

    recursivelyGetBg: (element) => {
      const bg = window.getComputedStyle(element).background

      if (
        (!Utils.color.isFormattedCssColor(bg) && bg.includes('initial'))
        || bg.includes('transparent')
        || bg.includes('rgba(0, 0, 0, 0)')
        || bg.includes('rgba(0, 0, 0, 0.5)')
      )
        return Utils.color.recursivelyGetBg(element.parentElement)

      return bg
    },
    checkContrast: (el) => {
      let bg = Utils.color.recursivelyGetBg(el)
      //*  Variables for red, green, blue values
      let r
      let g
      let b

      //*  Check the format of the color, HEX or RGB?
      if (bg.match(/^rgb/)) {
        //*  If RGB --> store the red, green, blue values in separate variables
        bg = bg.match(/rgba?\(([^)]+)\)/)[1]
        bg = bg.split(/ *, */).map(Number);
        [r, g, b] = bg
      }
      else {
        //*  If hex --> Convert it to RGB: http://* gist.github.com/983661
        bg = +`0x${bg.slice(1).replace(bg.length < 5 && /./g, '$&$&')}`
        r = bg >> 16
        g = (bg >> 8) & 255
        b = bg & 255
      }

      //*  HSP (Highly Sensitive Poo) equation from http://* alienryderflex.com/hsp.html
      const hsp = Math.sqrt(
        0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b),
      )
      let v
      //*  Using the HSP value, determine whether the color is light or dark
      if (hsp > 127.5)
        v = 'light'

      else
        v = 'dark'

      console.log(v)
      return v
    },
    rgb: (r, g, b) => {
      return new THREE.Vector3(r, g, b)
    },
    rgbToHex: (r, g, b) => {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    },

    randomColor: () => {
      return `rgb(${Utils.math.randomInt(0, 255)}, ${Utils.math.randomInt(
        0,
        255,
      )}, ${Utils.math.randomInt(0, 255)})`
    },

    randomColorRGB: () => {
      return `rgb(${Utils.math.randomInt(0, 255)}, ${Utils.math.randomInt(
        0,
        255,
      )}, ${Utils.math.randomInt(0, 255)})`
    },

    randomColorRGBA: (a) => {
      return `rgba(${Utils.math.randomInt(0, 255)}, ${Utils.math.randomInt(
        0,
        255,
      )}, ${Utils.math.randomInt(0, 255)}, ${a})`
    },

    randomColorHSL: () => {
      return `hsl(${Utils.math.randomInt(0, 360)}, ${Utils.math.randomInt(
        0,
        100,
      )}%, ${Utils.math.randomInt(0, 100)}%)`
    },

    randomColorHSLA: (a) => {
      return `hsla(${Utils.math.randomInt(0, 360)}, ${Utils.math.randomInt(
        0,
        100,
      )}%, ${Utils.math.randomInt(0, 100)}%, ${a})`
    },

    randomColorHex: () => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    },

    randomColorHexA: (a) => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}${a}`
    },
  },
  animation: {
    shaderMaterials: {
      //*  Volumetric Light Approximation (Godrays)
      GodrayMatrial: new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: { type: 't', value: 0, texture: null },
          fX: { type: 'f', value: 0.5 },
          fY: { type: 'f', value: 0.5 },
          fExposure: { type: 'f', value: 0.6 },
          fDecay: { type: 'f', value: 0.93 },
          fDensity: { type: 'f', value: 0.96 },
          fWeight: { type: 'f', value: 0.4 },
          fClamp: { type: 'f', value: 1.0 },
        },

        vertexShader: [
          'constying vec2 vUv;',

          'void main() {',

          'vUv = uv;',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

          '}',
        ].join('\n'),

        fragmentShader: [
          'constying vec2 vUv;',
          'uniform sampler2D tDiffuse;',

          'uniform float fX;',
          'uniform float fY;',
          'uniform float fExposure;',
          'uniform float fDecay;',
          'uniform float fDensity;',
          'uniform float fWeight;',
          'uniform float fClamp;',

          'const int iSamples = 20;',

          'void main()',
          '{',
          'vec2 deltaTextCoord = vec2(vUv - vec2(fX,fY));',
          'deltaTextCoord *= 1.0 /  float(iSamples) * fDensity;',
          'vec2 coord = vUv;',
          'float illuminationDecay = 1.0;',
          'vec4 FragColor = vec4(0.0);',

          'for(int i=0; i < iSamples ; i++)',
          '{',
          'coord -= deltaTextCoord;',
          'vec4 texel = texture2D(tDiffuse, coord);',
          'texel *= illuminationDecay * fWeight;',

          'FragColor += texel;',

          'illuminationDecay *= fDecay;',
          '}',
          'FragColor *= fExposure;',
          'FragColor = clamp(FragColor, 0.0, fClamp);',
          'gl_FragColor = FragColor;',
          '}',
        ].join('\n'),
      }),

      //*  Coeff'd additive buffer blending
      Additive: {
        uniforms: {
          tDiffuse: { type: 't', value: 0, texture: null },
          tAdd: { type: 't', value: 1, texture: null },
          fCoeff: { type: 'f', value: 1.0 },
        },

        vertexShader: [
          'constying vec2 vUv;',

          'void main() {',

          'vUv = uv;',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

          '}',
        ].join('\n'),

        fragmentShader: [
          'uniform sampler2D tDiffuse;',
          'uniform sampler2D tAdd;',
          'uniform float fCoeff;',

          'constying vec2 vUv;',

          'void main() {',

          'vec4 texel = texture2D( tDiffuse, vUv );',
          'vec4 add = texture2D( tAdd, vUv );',
          'gl_FragColor = texel + add * fCoeff;',

          '}',
        ].join('\n'),
      },
    },
    lerp: (current, target, speed = 0.1, limit = 0.001) => {
      let change = (target - current) * speed
      if (Math.abs(change) < limit)
        change = target - current

      return change
    },
  },
  three: {
    getCameraDirection: (camera) => {
      const direction = new THREE.Vector3(0, 0, -1)
      const rotation = new THREE.Euler()
      const quaternion = new THREE.Quaternion()

      return (direction) => {
        rotation.set(
          camera.rotation.x,
          camera.rotation.y,
          camera.rotation.z,
          'YXZ',
        )

        quaternion.setFromEuler(rotation)
        return direction.applyQuaternion(quaternion)
      }
    },
    getDistanceFromCamera: (camera, object) => {
      const cameraPosition = new THREE.Vector3()
      camera.getWorldPosition(cameraPosition)

      const objectPosition = new THREE.Vector3()
      object.getWorldPosition(objectPosition)

      return cameraPosition.distanceTo(objectPosition)
    },
    meshFollowMouse: (mesh, mouse, camera, distance = 10) => {
      /* mesh: THREE.Mesh
        * mouse: THREE.Vector2
        * camera: THREE.Camera
        * distance: number
        * returns: function
        */
      const direction = new THREE.Vector3()
      const raycaster = new THREE.Raycaster()
      const cameraDirection = this.getCameraDirection(camera)

      return () => {
        direction.copy(cameraDirection(mouse))
        direction.multiplyScalar(distance)
        direction.add(camera.position)

        raycaster.set(camera.position, direction.sub(camera.position).normalize())
        const intersects = raycaster.intersectObject(mesh, true)

        if (intersects.length > 0)
          mesh.position.copy(intersects[0].point)
      }
    },
    createLight: ({ color, intensity }) => {
      const light = new THREE.PointLight(color, intensity, 20)
      light.castShadow = true
      light.shadow.bias = -0.005 // reduces self-shadowing on double-sided objects

      let geometry = new THREE.SphereGeometry(0.3, 12, 6)
      let material = new THREE.MeshBasicMaterial({ color })
      material.color.multiplyScalar(intensity)
      const sphere = new THREE.Mesh(geometry, material)
      light.add(sphere)

      // const texture = new THREE.CanvasTexture(generateTexture())
      // texture.magFilter = THREE.NearestFilter
      // texture.wrapT = THREE.RepeatWrapping
      // texture.wrapS = THREE.RepeatWrapping
      // texture.repeat.set(1, 4.5)

      geometry = new THREE.SphereGeometry(2, 32, 8)
      material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        // alphaMap: texture,
        alphaTest: 0.5,
      })

      // sphere = new THREE.Mesh(geometry, material)
      // sphere.castShadow = true
      // sphere.receiveShadow = true
      // light.add(sphere)

      return light
    },
  },
  geometry: {

    computeCurl: (x, y, z) => {
      const eps = 0.0001

      const curl = new THREE.Vector3()

      // Find rate of change in YZ plane
      let n1 = Utils.math.noise2d(x, y + eps, z)
      let n2 = Utils.math.noise2d(x, y - eps, z)
      // Average to find approximate derivative
      let a = (n1 - n2) / (2 * eps)
      n1 = Utils.math.noise2d(x, y, z + eps)
      n2 = Utils.math.noise2d(x, y, z - eps)
      // Average to find approximate derivative
      let b = (n1 - n2) / (2 * eps)
      curl.x = a - b

      // Find rate of change in XZ plane
      n1 = Utils.math.noise2d(x, y, z + eps)
      n2 = Utils.math.noise2d(x, y, z - eps)
      a = (n1 - n2) / (2 * eps)
      n1 = Utils.math.noise2d(x + eps, y, z)
      n2 = Utils.math.noise2d(x - eps, y, z)
      b = (n1 - n2) / (2 * eps)
      curl.y = a - b

      // Find rate of change in XY plane
      n1 = Utils.math.noise2d(x + eps, y, z)
      n2 = Utils.math.noise2d(x - eps, y, z)
      a = (n1 - n2) / (2 * eps)
      n1 = Utils.math.noise2d(x, y + eps, z)
      n2 = Utils.math.noise2d(x, y - eps, z)
      b = (n1 - n2) / (2 * eps)
      curl.z = a - b

      return curl
    },
    //*  Merge two geometries or geometry and geometry from object (using object's transform)
    addShape: (shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) => {
      //*  flat shape with texture
      //*  note: default UVs generated by THREE.ShapeGeometry are simply the x- and y-coordinates of the vertices
      const group = new THREE.Group()
      let geometry = new THREE.ShapeGeometry(shape)

      let mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({
          side: THREE.DoubleSide,
          color: 0x000000,
        }),
      )
      mesh.position.set(x, y, z)
      mesh.rotation.set(rx, ry, rz)
      mesh.scale.set(s, s, s)
      group.add(mesh)

      //*  flat shape

      geometry = new THREE.ShapeGeometry(shape)

      mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide }),
      )
      mesh.position.set(x, y, z)
      mesh.rotation.set(rx, ry, rz)
      mesh.scale.set(s, s, s)
      group.add(mesh)

      //*  extruded shape

      geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

      mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color }))
      mesh.position.set(x, y, z - 75)
      mesh.rotation.set(rx, ry, rz)
      mesh.scale.set(s, s, s)
      group.add(mesh)

      return { mesh, group, geometry }
      //*  addLineShape(shape, color, x, y, z, rx, ry, rz, s)
    },

    merge: (geometry1, geometry2, materialIndexOffset) => {
      console.warn(
        'THREE.Geometry .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.',
      )

      let matrix

      if (geometry2 instanceof THREE.Mesh) {
        geometry2.matrixAutoUpdate && geometry2.updateMatrix()

        matrix = geometry2.matrix
        geometry2 = geometry2.geometry
      }

      geometry1.merge(geometry2, matrix, materialIndexOffset)
    },

    randomPointInTriangle: () => {
      const vector = new THREE.Vector3()

      return function (vectorA, vectorB, vectorC) {
        const point = new THREE.Vector3()

        let a = Math.random()
        let b = Math.random()

        if (a + b > 1) {
          a = 1 - a
          b = 1 - b
        }

        const c = 1 - a - b

        point.copy(vectorA)
        point.multiplyScalar(a)

        vector.copy(vectorB)
        vector.multiplyScalar(b)

        point.add(vector)

        vector.copy(vectorC)
        vector.multiplyScalar(c)

        point.add(vector)

        return point
      }
    },

    //*  Get random point in face (triangle)
    //*  (uniform distribution)

    randomPointInFace: (face, geometry) => {
      const vA = geometry.vertices[face.a]
      const vB = geometry.vertices[face.b]
      const vC = geometry.vertices[face.c]
      return Utils.geometry.randomPointInTriangle(vA, vB, vC)
    },

    randomPointsInGeometry: (geometry, n) => {
      let face
      let i
      const faces = geometry.faces
      const vertices = geometry.vertices
      const il = faces.length
      let totalArea = 0
      const cumulativeAreas = []
      let vA
      let vB
      let vC

      //*  precompute face areas

      for (i = 0; i < il; i++) {
        face = faces[i]

        vA = vertices[face.a]
        vB = vertices[face.b]
        vC = vertices[face.c]

        face._area = Utils.geometry.triangleArea(vA, vB, vC)

        totalArea += face._area

        cumulativeAreas[i] = totalArea
      }

      //*  binary search cumulative areas array

      function binarySearchIndices(value) {
        function binarySearch(start, end) {
          //*  return closest larger index
          //*  if exact number is not found

          if (end < start)
            return start

          const mid = start + Math.floor((end - start) / 2)

          if (cumulativeAreas[mid] > value)
            return binarySearch(start, mid - 1)
          else if (cumulativeAreas[mid] < value)
            return binarySearch(mid + 1, end)
          else return mid
        }

        const result = binarySearch(0, cumulativeAreas.length - 1)
        return result
      }

      //*  pick random face weighted by face area

      let r
      let index
      const result = []

      const stats = {}

      for (i = 0; i < n; i++) {
        r = Math.random() * totalArea

        index = binarySearchIndices(r)

        result[i] = Utils.geometry.randomPointInFace(faces[index], geometry)

        if (!stats[index])
          stats[index] = 1
        else stats[index] += 1
      }

      return result
    },
    getCurve: (start) => {
      const points = []
      points.push(start)
      points.push(new THREE.Vector3(start.x + 0.1, start.y + 0.1, start.z))
      points.push(new THREE.Vector3(start.x + 0.2, start.y + 0.2, start.z))
      points.push(new THREE.Vector3(start.x + 0.3, start.y + 0.3, start.z))
      points.push(new THREE.Vector3(start.x + 0.4, start.y + 0.4, start.z))
      points.push(new THREE.Vector3(start.x + 0.5, start.y + 0.5, start.z))
      points.push(new THREE.Vector3(start.x + 0.6, start.y + 0.6, start.z))
      points.push(new THREE.Vector3(start.x + 0.7, start.y + 0.7, start.z))
      points.push(new THREE.Vector3(start.x + 0.8, start.y + 0.8, start.z))
      points.push(new THREE.Vector3(start.x + 0.9, start.y + 0.9, start.z))
      points.push(new THREE.Vector3(start.x + 1, start.y + 1, start.z))
      return points
    },
    createCurves: () => {
      const curves = []
      for (let i = 0; i < 10; i++) {
        const path = new THREE.CatmullRomCurve3(Utils.math.getCurve(new THREE.Vector3(i / 100, 0, 0)))
        const geometry = new THREE.TubeGeometry(path, 600, 0.005, 8, false)
        const material = new THREE.MeshPhongMaterial({ color: 0x000000 })
        const mesh = new THREE.Mesh(geometry, material)
        curves.push(mesh)
      }
      return curves
    },
    randomPointsInBufferGeometry: (geometry, n) => {
      let i
      const vertices = geometry.attributes.position.array
      let totalArea = 0
      const cumulativeAreas = []

      //*  precompute face areas
      const vA = new THREE.Vector3()
      const vB = new THREE.Vector3()
      const vC = new THREE.Vector3()

      //*  geometry._areas = [];
      const il = vertices.length / 9

      for (i = 0; i < il; i++) {
        vA.set(vertices[i * 9 + 0], vertices[i * 9 + 1], vertices[i * 9 + 2])
        vB.set(vertices[i * 9 + 3], vertices[i * 9 + 4], vertices[i * 9 + 5])
        vC.set(vertices[i * 9 + 6], vertices[i * 9 + 7], vertices[i * 9 + 8])

        totalArea += Utils.geometry.triangleArea(vA, vB, vC)

        cumulativeAreas.push(totalArea)
      }

      //*  binary search cumulative areas array

      function binarySearchIndices(value) {
        function binarySearch(start, end) {
          //*  return closest larger index
          //*  if exact number is not found

          if (end < start)
            return start

          const mid = start + Math.floor((end - start) / 2)

          if (cumulativeAreas[mid] > value)
            return binarySearch(start, mid - 1)
          else if (cumulativeAreas[mid] < value)
            return binarySearch(mid + 1, end)
          else return mid
        }

        const result = binarySearch(0, cumulativeAreas.length - 1)
        return result
      }

      //*  pick random face weighted by face area

      let r
      let index
      const result = []

      for (i = 0; i < n; i++) {
        r = Math.random() * totalArea

        index = binarySearchIndices(r)

        //*  result[ i ] = Utils.geometry.randomPointInFace( faces[ index ], geometry, true );
        vA.set(
          vertices[index * 9 + 0],
          vertices[index * 9 + 1],
          vertices[index * 9 + 2],
        )
        vB.set(
          vertices[index * 9 + 3],
          vertices[index * 9 + 4],
          vertices[index * 9 + 5],
        )
        vC.set(
          vertices[index * 9 + 6],
          vertices[index * 9 + 7],
          vertices[index * 9 + 8],
        )
        result[i] = Utils.geometry.randomPointInTriangle(vA, vB, vC)
      }

      return result
    },

    //*  Get triangle area (half of parallelogram)
    //*  http://* mathworld.wolfram.com/TriangleArea.html

    triangleArea: () => {
      const vector1 = new THREE.Vector3()
      const vector2 = new THREE.Vector3()

      return function (vectorA, vectorB, vectorC) {
        vector1.subVectors(vectorB, vectorA)
        vector2.subVectors(vectorC, vectorA)
        vector1.cross(vector2)

        return 0.5 * vector1.length()
      }
    },

    center: (geometry) => {
      console.warn(
        'THREE.Geometry .center() has been moved to Geometry. Use geometry.center() instead.',
      )
      return geometry.center()
    },
  },
  tweakpane: {
    addScene: (scene) => {
      const folder = gui.addFolder({
        title: 'Scene',
      })

      // folder.addInput(scene.fog, 'fog', {
      //   label: 'Fog',
      // })

      // folder.addInput(scene.fog, 'fogColor', {
      //   label: 'Fog Color',
      // })

      // folder.addInput(scene.fog, 'fogNear', {
      //   label: 'Fog Near',
      // })

      // folder.addInput(scene.fog, 'fogFar', {
      //   label: 'Fog Far',
      // })

      folder.addInput(scene.background, 'background', {
        label: 'Background',
      })
    },
    addCamera: (camera) => {
      const folder = gui.addFolder({
        title: 'Camera',
      })

      folder.addInput(camera.position, 'x', {
        label: 'Position X',
      })
      folder.addInput(camera.position, 'y', {
        label: 'Position Y',
      })
      folder.addInput(camera.position, 'z', {
        label: 'Position Z',
      })
      folder.addInput(camera.rotation, 'x', {
        label: 'Rotation X',
      })
      folder.addInput(camera.rotation, 'y', {
        label: 'Rotation Y',
      })
      folder.addInput(camera.rotation, 'z', {
        label: 'Rotation Z',
      })
    },
    addRenderer: (renderer) => {
      const folder = gui.addFolder({
        title: 'Renderer',
      })
      folder.addInput(renderer, 'shadowMap.enabled', {
        label: 'Shadow map enabled',
      })
      folder.addInput(renderer, 'shadowMap.type', {
        label: 'Shadow map type',
        options: {
          Basic: THREE.BasicShadowMap,
          PCF: THREE.PCFShadowMap,
          PCFSoft: THREE.PCFSoftShadowMap,
          VSM: THREE.VSMShadowMap,
        },
      })
      folder.addInput(renderer, 'shadowMap.autoUpdate', {
        label: 'Shadow map auto update',
      })
      folder.addInput(renderer, 'antialias', {
        label: 'Antialias',
      })
      folder.addInput(renderer, 'alpha', {
        label: 'Alpha',
      })
      folder.addInput(renderer, 'toneMapping', {
        label: 'Tone mapping',
        options: {
          None: THREE.NoToneMapping,
          Linear: THREE.LinearToneMapping,
          Reinhard: THREE.ReinhardToneMapping,
          Uncharted2: THREE.Uncharted2ToneMapping,
          Cineon: THREE.CineonToneMapping,
        },
      })
      folder.addInput(renderer, 'toneMappingExposure', {
        label: 'Tone mapping exposure',
        min: 0,
        max: 2,
      })
      folder.addInput(renderer, 'toneMappingWhitePoint', {
        label: 'Tone mapping white point',
        min: 0,
        max: 2,
      })
      folder.addInput(renderer, 'gammaFactor', {
        label: 'Gamma factor',
        min: 0,
        max: 2,
      })
      folder.addInput(renderer, 'gammaOutput', {
        label: 'Gamma output',
      })
      folder.addInput(renderer, 'physicallyCorrectLights', {
        label: 'Physically correct lights',
      })
    },
    addPointLight: (light) => {
      const folder = gui.addFolder({
        title: 'Point light',
      })

      folder.addInput(light, 'intensity', {
        label: 'Intensity',
        min: 0,
        max: 2,
      })
      folder.addInput(light, 'distance', {
        label: 'Distance',
        min: 0,
        max: 1000,
      })
      folder.addInput(light, 'decay', {
        label: 'Decay',
        min: 0,
        max: 2,
      })
      folder.addInput(light.position, 'x', {
        label: 'Position X',
      })
      folder.addInput(light.position, 'y', {
        label: 'Position Y',
      })
      folder.addInput(light.position, 'z', {
        label: 'Position Z',
      })
      folder.addInput(light.color, 'r', {
        label: 'Color R',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'g', {
        label: 'Color G',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'b', {
        label: 'Color B',
        min: 0,
        max: 1,
      })
    },
    addDirectionalLight: (light) => {
      const folder = gui.addFolder({
        title: 'Directional light',
      })

      folder.addInput(light, 'intensity', {
        label: 'Intensity',
        min: 0,
        max: 2,
      })
      folder.addInput(light.position, 'x', {
        label: 'Position X',
      })
      folder.addInput(light.position, 'y', {
        label: 'Position Y',
      })
      folder.addInput(light.position, 'z', {
        label: 'Position Z',
      })
      folder.addInput(light.color, 'r', {
        label: 'Color R',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'g', {
        label: 'Color G',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'b', {
        label: 'Color B',
        min: 0,
        max: 1,
      })
    },
    addSpotLight: (light) => {
      const folder = gui.addFolder({
        title: 'Spot light',
      })

      folder.addInput(light, 'intensity', {
        label: 'Intensity',
        min: 0,
        max: 2,
      })
      folder.addInput(light, 'distance', {
        label: 'Distance',
        min: 0,
        max: 1000,
      })
      folder.addInput(light, 'angle', {
        label: 'Angle',
        min: 0,
        max: Math.PI / 2,
      })
      folder.addInput(light, 'penumbra', {
        label: 'Penumbra',
        min: 0,
        max: 1,
      })
      folder.addInput(light, 'decay', {
        label: 'Decay',
        min: 0,
        max: 2,
      })
      folder.addInput(light.position, 'x', {
        label: 'Position X',
      })
      folder.addInput(light.position, 'y', {
        label: 'Position Y',
      })
      folder.addInput(light.position, 'z', {
        label: 'Position Z',
      })
      folder.addInput(light.color, 'r', {
        label: 'Color R',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'g', {
        label: 'Color G',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'b', {
        label: 'Color B',
        min: 0,
        max: 1,
      })
    },
    addHemisphereLight: (light) => {
      const folder = gui.addFolder({
        title: 'Hemisphere light',
      })

      folder.addInput(light, 'intensity', {
        label: 'Intensity',
        min: 0,
        max: 2,
      })
      folder.addInput(light.position, 'x', {
        label: 'Position X',
      })
      folder.addInput(light.position, 'y', {
        label: 'Position Y',
      })
      folder.addInput(light.position, 'z', {
        label: 'Position Z',
      })
      folder.addInput(light.color, 'r', {
        label: 'Color R',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'g', {
        label: 'Color G',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'b', {
        label: 'Color B',
        min: 0,
        max: 1,
      })
      folder.addInput(light.groundColor, 'r', {
        label: 'Ground color R',
        min: 0,
        max: 1,
      })
      folder.addInput(light.groundColor, 'g', {
        label: 'Ground color G',
        min: 0,
        max: 1,
      })
      folder.addInput(light.groundColor, 'b', {
        label: 'Ground color B',
        min: 0,
        max: 1,
      })
    },
    addAmbientLight: (light) => {
      const folder = gui.addFolder({
        title: 'Ambient light',
      })

      folder.addInput(light, 'intensity', {
        label: 'Intensity',
        min: 0,
        max: 2,
      })
      folder.addInput(light.color, 'r', {
        label: 'Color R',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'g', {
        label: 'Color G',
        min: 0,
        max: 1,
      })
      folder.addInput(light.color, 'b', {
        label: 'Color B',
        min: 0,
        max: 1,
      })
    },
    addOrbitControls: (controls) => {
      const folder = gui.addFolder({
        title: 'Orbit controls',
      })

      folder.addInput(controls, 'enableDamping', {
        label: 'Enable damping',
      })
      folder.addInput(controls, 'dampingFactor', {
        label: 'Damping factor',
        min: 0,
        max: 1,
      })
      folder.addInput(controls, 'enableZoom', {
        label: 'Enable zoom',
      })
      folder.addInput(controls, 'enablePan', {
        label: 'Enable pan',
      })
      folder.addInput(controls, 'enableRotate', {
        label: 'Enable rotate',
      })
    },

  },
}
