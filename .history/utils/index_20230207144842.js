/* eslint-disable no-console */

import * as THREE from 'three'
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier'
import { smootherstep } from 'three/src/math/MathUtils'
import { Pane } from 'tweakpane'
import chroma from "chroma-js"
import { GeometryUtils } from '~/utils/GeometryUtils'
import { FboUtils } from '~/utils/FboUtils'
import { Noise } from '~/utils/Noise'
import { Vector2, Vector3 } from '~/utils/Vector'

let pane

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
  noise: Noise,
  vector2: new Vector2(),
  vector3: new Vector3(),
  GeometryUtils,
  FboUtils,
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
    randomFloat: (min, max) => {
      return Math.random() * (max - min + 1) + min
    },
    randomInteger: (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
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

    // renderColorSwatch: (colorObj) => {
    //   let key = Object.keys(colorObj)[0];
    //   const hex = colorObj[key];
    //   if (chroma.valid(hex)) {
    //     const color = chroma(hex).hex()
    //     const swatch = document.createElement('div')
    //     swatch.className = 'swatch'
    //     swatch.style.backgroundColor = color
    //     return swatch
    //   } else {
    //     console.log('invalid color', hex)
    //   }
    // },
    // renderColorSwatchGrid: (colors=Utils.color.colorList) => {
    //   const swatchGrid = document.createElement('div')
    //   let swatchString = ''
    //   swatchGrid.className = 'swatch-grid'
    //   for (let i = 0; i < colors.length; i++) {

    //     if (formattedColor) {
    //       swatchString += `<div class="swatch" style="background-color: #${formattedColor}"></div>`
    //     }

    //   }

    //   swatchGrid.innerHTML = swatchString
    //   return swatchGrid
    // },
    colorList: [
      { "aliceblue": "15792383" },
      { "antiquewhite": "16444375" },
      { "aqua": "65535" },
      { "aquamarine": "8388564" },
      { "azure": "15794175" },
      { "beige": "16119260" },
      { "bisque": "16770244" },
      { "black": "000000" },
      { "blanchedalmond": "16772045" },
      { "blue": "255255" },
      { "blueviolet": "9055202" },
      { "brown": "10824234" },
      { "burlywood": "14596231" },
      { "cadetblue": "6266528" },
      { "chartreuse": "8388352" },
      { "chocolate": "13789470" },
      { "coral": "16744272" },
      { "cornflowerblue": "6591981" },
      { "cornsilk": "16775388" },
      { "crimson": "14423100" },
      { "cyan": "65535" },
      { "darkblue": "139" },
      { "darkcyan": "35723" },
      { "darkgoldenrod": "12092939" },
      { "darkgray": "11119017" },
      { "darkgreen": "25600" },
      { "darkgrey": "11119017" },
      { "darkkhaki": "12433259" },
      { "darkmagenta": "9109643" },
      { "darkolivegreen": "5597999" },
      { "darkorange": "16747520" },
      { "darkorchid": "10040012" },
      { "darkred": "9109504" },
      { "darksalmon": "15308410" },
      { "darkseagreen": "9419919" },
      { "darkslateblue": "4734347" },
      { "darkslategray": "3100495" },
      { "darkslategrey": "3100495" },
      { "darkturquoise": "52945" },
      { "darkviolet": "9699539" },
      { "deeppink": "16716947" },
      { "deepskyblue": "49151" },
      { "dimgray": "6908265" },
      { "dimgrey": "6908265" },
      { "dodgerblue": "2003199" },
      { "firebrick": "11674146" },
      { "floralwhite": "16775920" },
      { "forestgreen": "2263842" },
      { "fuchsia": "16711935" },
      { "gainsboro": "14474460" },
      { "ghostwhite": "16316671" },
      { "gold": "16766720" },
      { "goldenrod": "14329120" },
      { "gray": "8421504" },
      { "green": "32768" },
      { "greenyellow": "11403055" },
      { "grey": "8421504" },
      { "honeydew": "15794160" },
      { "hotpink": "16738740" },
      { "indianred": "13458524" },
      { "indigo": "4915330" },
      { "ivory": "16777200" },
      { "khaki": "15787660" },
      { "lavender": "15132410" },
      { "lavenderblush": "16773365" },
      { "lawngreen": "8190976" },
      { "lemonchiffon": "16775885" },
      { "lightblue": "11393254" },
      { "lightcoral": "15761536" },
      { "lightcyan": "14745599" },
      { "lightgoldenrodyellow": "16448210" },
      { "lightgray": "13882323" },
      { "lightgreen": "9498256" },
      { "lightgrey": "13882323" },
      { "lightpink": "16758465" },
      { "lightsalmon": "16752762" },
      { "lightseagreen": "2142890" },
      { "lightskyblue": "8900346" },
      { "lightslategray": "7833753" },
      { "lightslategrey": "7833753" },
      { "lightsteelblue": "11584734" },
      { "lightyellow": "16777184" },
      { "lime": "65280" },
      { "limegreen": "3329330" },
      { "linen": "16445670" },
      { "magenta": "16711935" },
      { "maroon": "8388608" },
      { "mediumaquamarine": "6737322" },
      { "mediumblue": "205" },
      { "mediumorchid": "12211667" },
      { "mediumpurple": "9662683" },
      { "mediumseagreen": "3978097" },
      { "mediumslateblue": "8087790" },
      { "mediumspringgreen": "64154" },
      { "mediumturquoise": "4772300" },
      { "mediumvioletred": "13047173" },
      { "midnightblue": "1644912" },
      { "mintcream": "16121850" },
      { "mistyrose": "16770273" },
      { "moccasin": "16770229" },
      { "navajowhite": "16768685" },
      { "navy": "128" },
      { "oldlace": "16643558" },
      { "olive": "8421376" },
      { "olivedrab": "7048739" },
      { "orange": "16753920" },
      { "orangered": "16729344" },
      { "orchid": "14315734" },
      { "palegoldenrod": "15657130" },
      { "palegreen": "10025880" },
      { "paleturquoise": "11529966" },
      { "palevioletred": "14381203" },
      { "papayawhip": "16773077" },
      { "peachpuff": "16767673" },
      { "peru": "13468991" },
      { "pink": "16761035" },
      { "plum": "14524637" },
      { "powderblue": "11591910" },
      { "purple": "8388736" },
      { "rebeccapurple": "6697881" },
      { "red": "16711680" },
      { "rosybrown": "12357519" },
      { "royalblue": "4286945" },
      { "saddlebrown": "9127187" },
      { "salmon": "16416882" },
      { "sandybrown": "16032864" },
      { "seagreen": "3050327" },
      { "seashell": "16774638" },
      { "sienna": "10506797" },
      { "silver": "12632256" },
      { "skyblue": "8900331" },
      { "slateblue": "6970061" },
      { "slategray": "7372944" },
      { "slategrey": "7372944" },
      { "snow": "16775930" },
      { "springgreen": "65407" },
      { "steelblue": "4620980" },
      { "tan": "13808780" },
      { "teal": "32896" },
      { "thistle": "14204888" },
      { "tomato": "16737095" },
      { "turquoise": "4251856" },
      { "violet": "15631086" },
      { "wheat": "16113331" },
      { "white": "16777215" },
      { "whitesmoke": "16119285" },
      { "yellow": "16776960" },
      { "yellowgreen": "10145074" }
    ],
    getColorsHSL: (color) => {
      const colorStrings = [
        {
          type: 'green',
          color: i => `#${new THREE.Color().setHSL(0.25 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`,
        },
        {
          type: 'blue',
          color: i => `#${new THREE.Color().setHSL(0.5 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`,
        },
        {
          type: 'red',
          color: i => `#${new THREE.Color().setHSL(0.0 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`,
        },
        {
          type: 'yellow',
          color: i => `#${new THREE.Color().setHSL(0.75 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`,
        },
      ]

      return colorStrings.find(c => c.type === color).color(Math.random() * 5)
    },

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
    mouseHoverShiftCamera: (camera, mouse, shift) => {
      const x = (mouse.x * shift) / 2
      const y = (mouse.y * shift) / 2
      camera.position.x = x
      camera.position.y = y
    },
    rotateAround: (object, point, axis, radians) => {
      const rotObjectMatrix = new THREE.Matrix4()
      rotObjectMatrix.makeRotationAxis(axis.normalize(), radians)
      object.matrix.multiply(rotObjectMatrix)
      object.rotation.setFromRotationMatrix(object.matrix)
      object.position.sub(point)
      object.position.applyMatrix4(rotObjectMatrix)
      object.position.add(point)
    },
    elasticLerp: (v1, v2, t) => {
      v1.x = v1.x + (v2.x - v1.x) * smootherstep(0, 1, t)
      v1.y = v1.y + (v2.y - v1.y) * smootherstep(0, 1, t)
      return v1
    },
    lerp: (v1, v2, t) => {
      v1.x = v1.x + (v2.x - v1.x) * t
      v1.y = v1.y + (v2.y - v1.y) * t
      return v1
    },
    getCircleCoords: (time, angle) => {
      const x = Math.sin(time * Math.PI) * Math.cos(angle)
      const y = Math.cos(time * Math.PI) * Math.sin(angle)
      const z = Math.cos(time * Math.PI) * Math.cos(angle)
      return new THREE.Vector3(x, y, z)
    },
    lerp2: (current, target, speed = 0.1, limit = 0.001) => {
      let change = (target - current) * speed
      if (Math.abs(change) < limit)
        change = target - current

      return change
    },
  },
  shaders: {
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

  },
  three: {
    combineBuffer: (model, bufferName) => {

      let count = 0;

      model.traverse(function (child) {

        if (child.isMesh) {

          const buffer = child.geometry.attributes[bufferName];

          count += buffer.array.length;

        }

      });

      const combined = new Float32Array(count);

      let offset = 0;

      model.traverse(function (child) {

        if (child.isMesh) {

          const buffer = child.geometry.attributes[bufferName];

          combined.set(buffer.array, offset);
          offset += buffer.array.length;

        }

      });

      return new THREE.BufferAttribute(combined, 3);

    },
    createMesh: (positions, scene, scale, x, y, z, color) => {

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', positions.clone());
      geometry.setAttribute('initialPosition', positions.clone());

      geometry.attributes.position.setUsage(THREE.DynamicDrawUsage);

      const clones = [

        [6000, 0, - 4000],
        [5000, 0, 0],
        [1000, 0, 5000],
        [1000, 0, - 5000],
        [4000, 0, 2000],
        [- 4000, 0, 1000],
        [- 5000, 0, - 5000],

        [0, 0, 0]

      ];

      for (let i = 0; i < clones.length; i++) {

        const c = (i < clones.length - 1) ? 0x252525 : color;

        mesh = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 30, color: c }));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;

        mesh.position.x = x + clones[i][0];
        mesh.position.y = y + clones[i][1];
        mesh.position.z = z + clones[i][2];

        parent.add(mesh);

        clonemeshes.push({ mesh: mesh, speed: 0.5 + Math.random() });

      }

      meshes.push({
        mesh: mesh, verticesDown: 0, verticesUp: 0, direction: 0, speed: 15, delay: Math.floor(200 + 200 * Math.random()),
        start: Math.floor(100 + 200 * Math.random()),
      });

    },
    createPoints: ({ geometry, count }) => {
      const vertices = []

      for (let i = 0; i < count; i++) {
        const p = geometry.attributes.position.array[i]
        const p2 = Utils.geometry.randomPointsInBufferGeometry(geometry, 400)
        const p3 = Utils.geometry.randomPointsInBufferGeometry(geometry, 400)
        const p4 = Utils.geometry.randomPointsInBufferGeometry(geometry, 400)
        debugger
        vertices.push(p, p2, p3, p4)
      }

      const pgeometry = new THREE.BufferGeometry()
      pgeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

      const material = new THREE.PointsMaterial({ size: 0.005, color: 0xFFFFFF })

      const points = new THREE.Points(pgeometry, material)

      return points
    },
    sceneAdd: (scene, ...objects) => {
      objects.forEach((object) => {
        if (object instanceof THREE.Object3D)
          scene.add(object)

        else
          console.warn('Object is not a THREE.Object3D')
      })
    },
    createParticleSwarm: ({ count, size, color }) => {
      const g = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      const colorObj = new THREE.Color('0xFFFFFF')

      for (let i = 0; i < 10000 * 3; i += 3) {
        const { x, y, z } = Utils.noise.simplex3(i, i + 1, i + 2)
        positions[i] = x
        positions[i + 1] = y
        positions[i + 2] = z

        colors[i] = colorObj.r
        colors[i + 1] = colorObj.g
        colors[i + 2] = colorObj.b
      }

      g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      g.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 0.01,
        vertexColors: true,
      })

      const p = new THREE.Points(g, material)

      return p
    },
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
      /*
        * mesh: THREE.Mesh
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
    createLight: ({ color = 0xFFFFFF, intensity = 1, distance = 500, decay = 2 }) => {
      const light = new THREE.PointLight(color, intensity, distance, decay)
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
    tessellateGeometry: () => {
      let tessellateGeometry = new THREE.BoxBufferGeometry(40, 40, 40)
      const tessellateMaterial = new THREE.ShaderMaterial({
        uniforms: {
          amplitude: { value: 0 },
        },
        vertexShader: `
          uniform float amplitude;

          attribute vec3 customColor;
          attribute vec3 vel;

          varying vec3 vColor;
          varying vec3 vNormal;


          void main() {
            vNormal = normal;
            vColor = customColor;

            // add velocity to position of vertices
            vec3 newPosition = position + vel * amplitude;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying vec3 vNormal;

          void main() {
            const float ambient = 0.4; //nondirectional light


            vec3 light = vec3(1.0);
            light = normalize(light);

            float directional = max(dot(vNormal, light), 0.0);

            gl_FragColor = vec4(vColor * (ambient + directional), 1.0);
          }
        `,
      })
      const tessellateModifier = new TessellateModifier(8, 6)
      tessellateGeometry = tessellateModifier.modify(tessellateGeometry)
      const numFaces = tessellateGeometry.attributes.position.count / 3
      const colors = new Float32Array(numFaces * 3 * 3)
      const vel = new Float32Array(numFaces * 3 * 3)

      const color = new THREE.Color()
      const l = 0.5
      const s = 1.0

      for (let f = 0; f < numFaces; f++) {
        const index = f * 9
        const h = 0.5 + Math.random(0.5)
        color.setHSL(h, s, l)

        const dirX = Math.random() * 2 - 1
        const dirY = Math.random() * 2 - 1
        const dirZ = Math.random() * 2 - 1

        for (let i = 0; i < 3; i++) {
          colors[index + (i * 3)] = color.r
          colors[index + (i * 3) + 1] = color.g
          colors[index + (i * 3) + 2] = color.b

          vel[index + (i * 3)] = dirX
          vel[index + (i * 3) + 1] = dirY
          vel[index + (i * 3) + 2] = dirZ
        }
      }

      tessellateGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3))
      tessellateGeometry.setAttribute('vel', new THREE.BufferAttribute(vel, 3))

      const tessellateMesh = new THREE.Mesh(tessellateGeometry, tessellateMaterial)

      const animateTessellate = () => {
        tessellateMaterial.uniforms.amplitude.value += 0.1
      }
      return { tessellateMesh, animateTessellate }
    },
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
      debugger
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
    get: () => pane,
    init: () => {
      pane = new Pane({
        container: document.getElementById('tweakpane-container'),
        title: 'DVLPR.',
        expanded: true,
      })
    },
    addScene: (scene) => {
      if (!pane)
        Utils.tweakpane.init()
      const folder = pane.addFolder({
        title: 'Scene',
      })
      // const fog = {
      //   showFog: false,
      //   type: 'None',
      //   color: 0xFFFFFF,
      // }
      // folder.addInput(fog, 'showFog', {
      //   label: 'Show Fog',
      // }).on('change', (bool) => {
      //   fog.showFog = bool
      // })

      // folder.addInput(fog, 'type', {
      //   disabled: () => !fog.showFog,
      //   options: {
      //     None: null,
      //     Fog: new THREE.Fog(0x000000, 0.1, 100),
      //     FogExp2: new THREE.FogExp2(0x000000, 0.1),
      //   },
      //   label: 'Fog Type',
      // })

      // folder.addInput(fog, 'color', {
      //   disabled: () => !fog.showFog,
      //   label: 'Fog Color',
      //   color: { type: 'float' },
      // })

      // folder.addInput(scene.fog, 'fogNear', {
      //   label: 'Fog Near',
      // })

      // folder.addInput(scene.fog, 'fogFar', {
      //   label: 'Fog Far',
      // })
      // folder.addInput(scene, 'background', {
      //   label: 'Background',
      //   color: { type: 'float' },
      // })
      folder.addInput(scene, 'backgroundBlurriness', {
        label: 'Blurriness',
      })
      folder.addInput(scene, 'backgroundIntensity', {
        label: 'Intensity',
      })
    },
    addCamera: (camera) => {
      if (!pane)
        Utils.tweakpane.init()
      const folder = pane.addFolder({
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
    // addRenderer: (renderer) => {
    //   if (!pane)
    //     Utils.tweakpane.init()
    //   const folder = pane.addFolder({
    //     title: 'Renderer',
    //   })
    //   // folder.addInput(renderer, 'shadowMap.enabled', {
    //   //   label: 'Shadow map enabled',
    //   // })
    //   // folder.addInput(renderer, 'shadowMap.type', {
    //   //   label: 'Shadow map type',
    //   //   options: {
    //   //     Basic: THREE.BasicShadowMap,
    //   //     PCF: THREE.PCFShadowMap,
    //   //     PCFSoft: THREE.PCFSoftShadowMap,
    //   //     VSM: THREE.VSMShadowMap,
    //   //   },
    //   // })
    //   // folder.addInput(renderer, 'shadowMap.autoUpdate', {
    //   //   label: 'Shadow map auto update',
    //   // })

    //   folder.addInput(renderer, 'gammaOutput', {
    //     label: 'Gamma output',
    //   })
    //   folder.addInput(renderer, 'physicallyCorrectLights', {
    //     label: 'Physically correct lights',
    //   })
    // },
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
  debug: {
    createBox: () => {
      const boxGeometry = new THREE.BoxGeometry(100, 100, 100)
      const boxMaterial = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: '0xD30094',
        shininess: 0x000000,
        specular: 0x111111,
      })
      const box = new THREE.Mesh(boxGeometry, boxMaterial)
      box.castShadow = true
      box.receiveShadow = true
      box.position.set(0, 0, 0)
      return box;
    }
  }
}
