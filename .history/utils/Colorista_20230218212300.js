

export default class Colorista {
    constructor() {
        this.colors = [
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
    } // end constructor
 
    fuckingDopeGreen () {
        return `#${new THREE.Color().setHSL(0.25 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`;
    }

    soDopeBlue () {
        return `#${new THREE.Color().setHSL(0.5 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`;
    }

    fuckMeRed () {
         return `#${new THREE.Color().setHSL(0.0 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`;
    }

    ohYouLikeYellow () {
         return `#${new THREE.Color().setHSL(0.75 + i / 3 * 0.25, 0.6, 0.7).getHexString()}`;
    }

    lerpColor(color1, color2, amount) => {
      if (!amount)
        amount = 0.5
      const c1 = new THREE.Color(color1)
      const c2 = new THREE.Color(color2)
      return c1.lerp(c2, amount)
    },
    getColorsBetween(color1, color2, steps) => {
      const colors = []
      const step = 1 / steps
      for (let i = 0; i < steps; i++) {
        const color = Utils.color.lerpColor(color1, color2, step * i)
        colors.push(color)
      }
      return colors
    },
    isFormattedCssColor(color) => {
      return (
        color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) || color.match(/^rgb/)
      )
    },

    recursivelyGetBg(element) => {
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
    checkContrast(el) => {
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
    rgb(r, g, b) => {
      return new THREE.Vector3(r, g, b)
    },
    rgbToHex(r, g, b) => {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    },

    randomColor() => {
      return `rgb(${Utils.math.randomInt(0, 255)}, ${Utils.math.randomInt(
        0,
        255,
      )}, ${Utils.math.randomInt(0, 255)})`
    },

    randomColorRGB() => {
      return `rgb(${Utils.math.randomInt(0, 255)}, ${Utils.math.randomInt(
        0,
        255,
      )}, ${Utils.math.randomInt(0, 255)})`
    },

    randomColorRGBA(a) => {
      return `rgba(${Utils.math.randomInt(0, 255)}, ${Utils.math.randomInt(
        0,
        255,
      )}, ${Utils.math.randomInt(0, 255)}, ${a})`
    },

    randomColorHSL() => {
      return `hsl(${Utils.math.randomInt(0, 360)}, ${Utils.math.randomInt(
        0,
        100,
      )}%, ${Utils.math.randomInt(0, 100)}%)`
    },

    randomColorHSLA(a) => {
      return `hsla(${Utils.math.randomInt(0, 360)}, ${Utils.math.randomInt(
        0,
        100,
      )}%, ${Utils.math.randomInt(0, 100)}%, ${a})`
    },

    randomColorHex() => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    },

    randomColorHexA(a) => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}${a}`
    },
}