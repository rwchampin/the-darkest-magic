const colors = [
  { aliceblue: '15792383' },
  { antiquewhite: '16444375' },
  { aqua: '65535' },
  { aquamarine: '8388564' },
  { azure: '15794175' },
  { beige: '16119260' },
  { bisque: '16770244' },
  { black: '000000' },
  { blanchedalmond: '16772045' },
  { blue: '255255' },
  { blueviolet: '9055202' },
  { brown: '10824234' },
  { burlywood: '14596231' },
  { cadetblue: '6266528' },
  { chartreuse: '8388352' },
  { chocolate: '13789470' },
  { coral: '16744272' },
  { cornflowerblue: '6591981' },
  { cornsilk: '16775388' },
  { crimson: '14423100' },
  { cyan: '65535' },
  { darkblue: '139' },
  { darkcyan: '35723' },
  { darkgoldenrod: '12092939' },
  { darkgray: '11119017' },
  { darkgreen: '25600' },
  { darkgrey: '11119017' },
  { darkkhaki: '12433259' },
  { darkmagenta: '9109643' },
  { darkolivegreen: '5597999' },
  { darkorange: '16747520' },
  { darkorchid: '10040012' },
  { darkred: '9109504' },
  { darksalmon: '15308410' },
  { darkseagreen: '9419919' },
  { darkslateblue: '4734347' },
  { darkslategray: '3100495' },
  { darkslategrey: '3100495' },
  { darkturquoise: '52945' },
  { darkviolet: '9699539' },
  { deeppink: '16716947' },
  { deepskyblue: '49151' },
  { dimgray: '6908265' },
  { dimgrey: '6908265' },
  { dodgerblue: '2003199' },
  { firebrick: '11674146' },
  { floralwhite: '16775920' },
  { forestgreen: '2263842' },
  { fuchsia: '16711935' },
  { gainsboro: '14474460' },
  { ghostwhite: '16316671' },
  { gold: '16766720' },
  { goldenrod: '14329120' },
  { gray: '8421504' },
  { green: '32768' },
  { greenyellow: '11403055' },
  { grey: '8421504' },
  { honeydew: '15794160' },
  { hotpink: '16738740' },
  { indianred: '13458524' },
  { indigo: '4915330' },
  { ivory: '16777200' },
  { khaki: '15787660' },
  { lavender: '15132410' },
  { lavenderblush: '16773365' },
  { lawngreen: '8190976' },
  { lemonchiffon: '16775885' },
  { lightblue: '11393254' },
  { lightcoral: '15761536' },
  { lightcyan: '14745599' },
  { lightgoldenrodyellow: '16448210' },
  { lightgray: '13882323' },
  { lightgreen: '9498256' },
  { lightgrey: '13882323' },
  { lightpink: '16758465' },
  { lightsalmon: '16752762' },
  { lightseagreen: '2142890' },
  { lightskyblue: '8900346' },
  { lightslategray: '7833753' },
  { lightslategrey: '7833753' },
  { lightsteelblue: '11584734' },
  { lightyellow: '16777184' },
  { lime: '65280' },
  { limegreen: '3329330' },
  { linen: '16445670' },
  { magenta: '16711935' },
  { maroon: '8388608' },
  { mediumaquamarine: '6737322' },
  { mediumblue: '205' },
  { mediumorchid: '12211667' },
  { mediumpurple: '9662683' },
  { mediumseagreen: '3978097' },
  { mediumslateblue: '8087790' },
  { mediumspringgreen: '64154' },
  { mediumturquoise: '4772300' },
  { mediumvioletred: '13047173' },
  { midnightblue: '1644912' },
  { mintcream: '16121850' },
  { mistyrose: '16770273' },
  { moccasin: '16770229' },
  { navajowhite: '16768685' },
  { navy: '128' },
  { oldlace: '16643558' },
  { olive: '8421376' },
  { olivedrab: '7048739' },
  { orange: '16753920' },
  { orangered: '16729344' },
  { orchid: '14315734' },
  { palegoldenrod: '15657130' },
  { palegreen: '10025880' },
  { paleturquoise: '11529966' },
  { palevioletred: '14381203' },
  { papayawhip: '16773077' },
  { peachpuff: '16767673' },
  { peru: '13468991' },
  { pink: '16761035' },
  { plum: '14524637' },
  { powderblue: '11591910' },
  { purple: '8388736' },
  { rebeccapurple: '6697881' },
  { red: '16711680' },
  { rosybrown: '12357519' },
  { royalblue: '4286945' },
  { saddlebrown: '9127187' },
  { salmon: '16416882' },
  { sandybrown: '16032864' },
  { seagreen: '3050327' },
  { seashell: '16774638' },
  { sienna: '10506797' },
  { silver: '12632256' },
  { skyblue: '8900331' },
  { slateblue: '6970061' },
  { slategray: '7372944' },
  { slategrey: '7372944' },
  { snow: '16775930' },
  { springgreen: '65407' },
  { steelblue: '4620980' },
  { tan: '13808780' },
  { teal: '32896' },
  { thistle: '14204888' },
  { tomato: '16737095' },
  { turquoise: '4251856' },
  { violet: '15631086' },
  { wheat: '16113331' },
  { white: '16777215' },
  { whitesmoke: '16119285' },
  { yellow: '16776960' },
  { yellowgreen: '10145074' },
]

const _hslA = { h: 0, s: 0, l: 0 }
const _hslB = { h: 0, s: 0, l: 0 }

function hue2rgb(p, q, t) {
  if (t < 0)
    t += 1
  if (t > 1)
    t -= 1
  if (t < 1 / 6)
    return p + (q - p) * 6 * t
  if (t < 1 / 2)
    return q
  if (t < 2 / 3)
    return p + (q - p) * 6 * (2 / 3 - t)
  return p
}

export default class Colorista {
  constructor(r, g, b) {
    this.isColor = true
    this.colors = colors
    this.r = 1
    this.g = 1
    this.b = 1

    if (g === undefined && b === undefined) {
      // r is THREE.Color, hex or string
      return this.set(r)
    }

    return this.setRGB(r, g, b)
  }

  set(value) {
    if (value && value.isColor)

      this.copy(value)

    else if (typeof value === 'number')

      this.setHex(value)

    else if (typeof value === 'string')

      this.setStyle(value)

    return this
  }

  setScalar(scalar) {
    this.r = scalar
    this.g = scalar
    this.b = scalar

    return this
  }

  setHex(hex, colorSpace = SRGBColorSpace) {
    hex = Math.floor(hex)

    this.r = (hex >> 16 & 255) / 255
    this.g = (hex >> 8 & 255) / 255
    this.b = (hex & 255) / 255

    ColorManagement.toWorkingColorSpace(this, colorSpace)

    return this
  }

  setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) {
    this.r = r
    this.g = g
    this.b = b

    ColorManagement.toWorkingColorSpace(this, colorSpace)

    return this
  }

  setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {
    // h,s,l ranges are in 0.0 - 1.0
    h = euclideanModulo(h, 1)
    s = clamp(s, 0, 1)
    l = clamp(l, 0, 1)

    if (s === 0) {
      this.r = this.g = this.b = l
    }
    else {
      const p = l <= 0.5 ? l * (1 + s) : l + s - (l * s)
      const q = (2 * l) - p

      this.r = hue2rgb(q, p, h + 1 / 3)
      this.g = hue2rgb(q, p, h)
      this.b = hue2rgb(q, p, h - 1 / 3)
    }

    ColorManagement.toWorkingColorSpace(this, colorSpace)

    return this
  }

  setStyle(style, colorSpace = SRGBColorSpace) {
    function handleAlpha(string) {
      if (string === undefined)
        return

      if (parseFloat(string) < 1)

        console.warn(`THREE.Color: Alpha component of ${style} will be ignored.`)
    }

    let m

    if (m = /^(\w+)\(([^\)]*)\)/.exec(style)) {
      // rgb / hsl

      let color
      const name = m[1]
      const components = m[2]

      switch (name) {
        case 'rgb':
        case 'rgba':

          if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
            // rgb(255,0,0) rgba(255,0,0,0.5)
            this.r = Math.min(255, parseInt(color[1], 10)) / 255
            this.g = Math.min(255, parseInt(color[2], 10)) / 255
            this.b = Math.min(255, parseInt(color[3], 10)) / 255

            ColorManagement.toWorkingColorSpace(this, colorSpace)

            handleAlpha(color[4])

            return this
          }

          if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
            // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
            this.r = Math.min(100, parseInt(color[1], 10)) / 100
            this.g = Math.min(100, parseInt(color[2], 10)) / 100
            this.b = Math.min(100, parseInt(color[3], 10)) / 100

            ColorManagement.toWorkingColorSpace(this, colorSpace)

            handleAlpha(color[4])

            return this
          }

          break

        case 'hsl':
        case 'hsla':

          if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
            // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
            const h = parseFloat(color[1]) / 360
            const s = parseFloat(color[2]) / 100
            const l = parseFloat(color[3]) / 100

            handleAlpha(color[4])

            return this.setHSL(h, s, l, colorSpace)
          }

          break

        default:

          console.warn(`THREE.Color: Unknown color model ${style}`)
      }
    }
    else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
      // hex color

      const hex = m[1]
      const size = hex.length

      if (size === 3) {
        // #ff0
        this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255
        this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255
        this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255

        ColorManagement.toWorkingColorSpace(this, colorSpace)

        return this
      }
      else if (size === 6) {
        // #ff0000
        this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255
        this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255
        this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255

        ColorManagement.toWorkingColorSpace(this, colorSpace)

        return this
      }
      else {
        console.warn(`THREE.Color: Invalid hex color ${style}`)
      }
    }
    else if (style && style.length > 0) {
      return this.setColorName(style, colorSpace)
    }

    return this
  }

  setColorName(style, colorSpace = SRGBColorSpace) {
    // color keywords
    const hex = _colorKeywords[style.toLowerCase()]

    if (hex !== undefined) {
      // red
      this.setHex(hex, colorSpace)
    }
    else {
      // unknown color
      console.warn(`THREE.Color: Unknown color ${style}`)
    }

    return this
  }

  clone() {
    return new this.constructor(this.r, this.g, this.b)
  }

  copy(color) {
    this.r = color.r
    this.g = color.g
    this.b = color.b

    return this
  }

  copySRGBToLinear(color) {
    this.r = SRGBToLinear(color.r)
    this.g = SRGBToLinear(color.g)
    this.b = SRGBToLinear(color.b)

    return this
  }

  copyLinearToSRGB(color) {
    this.r = LinearToSRGB(color.r)
    this.g = LinearToSRGB(color.g)
    this.b = LinearToSRGB(color.b)

    return this
  }

  convertSRGBToLinear() {
    this.copySRGBToLinear(this)

    return this
  }

  convertLinearToSRGB() {
    this.copyLinearToSRGB(this)

    return this
  }

  getHex(colorSpace = SRGBColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace)

    return clamp(_color.r * 255, 0, 255) << 16 ^ clamp(_color.g * 255, 0, 255) << 8 ^ clamp(_color.b * 255, 0, 255) << 0
  }

  getHexString(colorSpace = SRGBColorSpace) {
    return (`000000${this.getHex(colorSpace).toString(16)}`).slice(-6)
  }

  getHSL(target, colorSpace = ColorManagement.workingColorSpace) {
    // h,s,l ranges are in 0.0 - 1.0

    ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace)

    const r = _color.r; const g = _color.g; const b = _color.b

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    let hue, saturation
    const lightness = (min + max) / 2.0

    if (min === max) {
      hue = 0
      saturation = 0
    }
    else {
      const delta = max - min

      saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min)

      switch (max) {
        case r: hue = (g - b) / delta + (g < b ? 6 : 0); break
        case g: hue = (b - r) / delta + 2; break
        case b: hue = (r - g) / delta + 4; break
      }

      hue /= 6
    }

    target.h = hue
    target.s = saturation
    target.l = lightness

    return target
  }

  getRGB(target, colorSpace = ColorManagement.workingColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace)

    target.r = _color.r
    target.g = _color.g
    target.b = _color.b

    return target
  }

  getStyle(colorSpace = SRGBColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace)

    const r = _color.r; const g = _color.g; const b = _color.b

    if (colorSpace !== SRGBColorSpace) {
      // Requires CSS Color Module Level 4 (https://www.w3.org/TR/css-color-4/).
      return `color(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`
    }

    return `rgb(${(r * 255) | 0},${(g * 255) | 0},${(b * 255) | 0})`
  }

  offsetHSL(h, s, l) {
    this.getHSL(_hslA)

    _hslA.h += h; _hslA.s += s; _hslA.l += l

    this.setHSL(_hslA.h, _hslA.s, _hslA.l)

    return this
  }

  add(color) {
    this.r += color.r
    this.g += color.g
    this.b += color.b

    return this
  }

  addColors(color1, color2) {
    this.r = color1.r + color2.r
    this.g = color1.g + color2.g
    this.b = color1.b + color2.b

    return this
  }

  addScalar(s) {
    this.r += s
    this.g += s
    this.b += s

    return this
  }

  sub(color) {
    this.r = Math.max(0, this.r - color.r)
    this.g = Math.max(0, this.g - color.g)
    this.b = Math.max(0, this.b - color.b)

    return this
  }

  multiply(color) {
    this.r *= color.r
    this.g *= color.g
    this.b *= color.b

    return this
  }

  multiplyScalar(s) {
    this.r *= s
    this.g *= s
    this.b *= s

    return this
  }

  lerp(color, alpha) {
    this.r += (color.r - this.r) * alpha
    this.g += (color.g - this.g) * alpha
    this.b += (color.b - this.b) * alpha

    return this
  }

  lerpColors(color1, color2, alpha) {
    this.r = color1.r + (color2.r - color1.r) * alpha
    this.g = color1.g + (color2.g - color1.g) * alpha
    this.b = color1.b + (color2.b - color1.b) * alpha

    return this
  }

  lerpHSL(color, alpha) {
    this.getHSL(_hslA)
    color.getHSL(_hslB)

    const h = lerp(_hslA.h, _hslB.h, alpha)
    const s = lerp(_hslA.s, _hslB.s, alpha)
    const l = lerp(_hslA.l, _hslB.l, alpha)

    this.setHSL(h, s, l)

    return this
  }

  equals(c) {
    return (c.r === this.r) && (c.g === this.g) && (c.b === this.b)
  }

  fromArray(array, offset = 0) {
    this.r = array[offset]
    this.g = array[offset + 1]
    this.b = array[offset + 2]

    return this
  }

  toArray(array = [], offset = 0) {
    array[offset] = this.r
    array[offset + 1] = this.g
    array[offset + 2] = this.b

    return array
  }

  fromBufferAttribute(attribute, index) {
    this.r = attribute.getX(index)
    this.g = attribute.getY(index)
    this.b = attribute.getZ(index)

    return this
  }

  toJSON() {
    return this.getHex()
  }

  *[Symbol.iterator]() {
    yield this.r
    yield this.g
    yield this.b
  }

  fuckingDopeGreen() {
    return `#${new THREE.Color().setHSL(0.25 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`
  }

  soDopeBlue() {
    return `#${new THREE.Color().setHSL(0.5 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`
  }

  fuckMeRed() {
    return `#${new THREE.Color().setHSL(0.0 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`
  }

  ohYouLikeYellow() {
    return `#${new THREE.Color().setHSL(0.75 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`
  }

  lerpColor(color1, color2, amount) {
    if (!amount)
      amount = 0.5
    const c1 = new THREE.Color(color1)
    const c2 = new THREE.Color(color2)
    return c1.lerp(c2, amount)
  }

  getColorsBetween(color1, color2, steps) {
    const colors = []
    const step = 1 / steps
    for (let i = 0; i < steps; i++) {
      const color = Utils.color.lerpColor(color1, color2, step * i)
      colors.push(color)
    }
    return colors
  }

  isFormattedCssColor(color) {
    return (
      color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) || color.match(/^rgb/)
    )
  }

  recursivelyGetBg(element) {
    const bg = window.getComputedStyle(element).background

    if (
      (!Utils.color.isFormattedCssColor(bg) && bg.includes('initial'))
        || bg.includes('transparent')
        || bg.includes('rgba(0, 0, 0, 0)')
        || bg.includes('rgba(0, 0, 0, 0.5)')
    )
      return Utils.color.recursivelyGetBg(element.parentElement)

    return bg
  }

  checkContrast(el) {
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
  }

  rgb(r, g, b) {
    return new THREE.Vector3(r, g, b)
  }

  rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  randomColor() {
    return `rgb(${Utils.math.randomInt(0, 255)} ${Utils.math.randomInt(
        0,
        255,
      )} ${Utils.math.randomInt(0, 255)})`
  }

  randomColorRGB() {
    return `rgb(${Utils.math.randomInt(0, 255)} ${Utils.math.randomInt(
        0,
        255,
      )} ${Utils.math.randomInt(0, 255)})`
  }

  randomColorRGBA(a) {
    return `rgba(${Utils.math.randomInt(0, 255)} ${Utils.math.randomInt(
        0,
        255,
      )} ${Utils.math.randomInt(0, 255)} ${a})`
  }

  randomColorHSL() {
    return `hsl(${Utils.math.randomInt(0, 360)} ${Utils.math.randomInt(
        0,
        100,
      )}%, ${Utils.math.randomInt(0, 100)}%)`
  }

  randomColorHSLA(a) {
    return `hsla(${Utils.math.randomInt(0, 360)} ${Utils.math.randomInt(
        0,
        100,
      )}%, ${Utils.math.randomInt(0, 100)}%, ${a})`
  }

  randomColorHex() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  randomColorHexA(a) {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}${a}`
  }
}
