<script lang="ts" setup>
import * as THREE from 'three';

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        const a = typeof require == 'function' && require; if (!u && a)
          return a(o, !0); if (i)
          return i(o, !0); const f = new Error(`Cannot find module '${o}'`); throw f.code = 'MODULE_NOT_FOUND', f
      } const l = n[o] = { exports: {} }; t[o][0].call(l.exports, (e) => { const n = t[o][1][e]; return s(n || e) }, l, l.exports, e, t, n, r)
    } return n[o].exports
  } var i = typeof require == 'function' && require; for (let o = 0; o < r.length; o++)s(r[o]); return s
})({
  1: [function (require, module, exports) {
    module.exports = require(3)
    module.exports.color = require(2)
  }, { 2: 2, 3: 3 }],
  2: [function (require, module, exports) {
    /**
         * dat-gui JavaScript Controller Library
         * https://code.google.com/p/dat-gui
         *
         * Copyright 2011 Data Arts Team, Google Creative Lab
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         */

    /** @namespace */
    var dat = module.exports = dat || {}

    /** @namespace */
    dat.color = dat.color || {}

    /** @namespace */
    dat.utils = dat.utils || {}

    dat.utils.common = (function () {
      const ARR_EACH = Array.prototype.forEach
      const ARR_SLICE = Array.prototype.slice

      /**
             * Band-aid methods for things that should be a lot easier in JavaScript.
             * Implementation and structure inspired by underscore.js
             * https://documentcloud.github.com/underscore/
             */

      return {

        BREAK: {},

        extend(target) {
          this.each(ARR_SLICE.call(arguments, 1), function (obj) {
            for (const key in obj) {
              if (!this.isUndefined(obj[key]))
                target[key] = obj[key]
            }
          }, this)

          return target
        },

        defaults(target) {
          this.each(ARR_SLICE.call(arguments, 1), function (obj) {
            for (const key in obj) {
              if (this.isUndefined(target[key]))
                target[key] = obj[key]
            }
          }, this)

          return target
        },

        compose() {
          const toCall = ARR_SLICE.call(arguments)
          return function () {
            let args = ARR_SLICE.call(arguments)
            for (let i = toCall.length - 1; i >= 0; i--)
              args = [toCall[i].apply(this, args)]

            return args[0]
          }
        },

        each(obj, itr, scope) {
          if (ARR_EACH && obj.forEach === ARR_EACH) {
            obj.forEach(itr, scope)
          }
          else if (obj.length === obj.length + 0) { // Is number but not NaN
            for (var key = 0, l = obj.length; key < l; key++) {
              if (key in obj && itr.call(scope, obj[key], key) === this.BREAK)
                return
            }
          }
          else {
            for (var key in obj) {
              if (itr.call(scope, obj[key], key) === this.BREAK)
                return
            }
          }
        },

        defer(fnc) {
          setTimeout(fnc, 0)
        },

        toArray(obj) {
          if (obj.toArray)
            return obj.toArray()
          return ARR_SLICE.call(obj)
        },

        isUndefined(obj) {
          return obj === undefined
        },

        isNull(obj) {
          return obj === null
        },

        isNaN(obj) {
          return obj !== obj
        },

        isArray: Array.isArray || function (obj) {
          return obj.constructor === Array
        },

        isObject(obj) {
          return obj === Object(obj)
        },

        isNumber(obj) {
          return obj === obj + 0
        },

        isString(obj) {
          return obj === `${obj}`
        },

        isBoolean(obj) {
          return obj === false || obj === true
        },

        isFunction(obj) {
          return Object.prototype.toString.call(obj) === '[object Function]'
        },

      }
    })()

    dat.color.toString = (function (common) {
      return function (color) {
        if (color.a == 1 || common.isUndefined(color.a)) {
          let s = color.hex.toString(16)
          while (s.length < 6)
            s = `0${s}`

          return `#${s}`
        }
        else {
          return `rgba(${Math.round(color.r)},${Math.round(color.g)},${Math.round(color.b)},${color.a})`
        }
      }
    })(dat.utils.common)

    dat.Color = dat.color.Color = (function (interpret, math, toString, common) {
      const Color = function () {
        this.__state = interpret.apply(this, arguments)

        if (this.__state === false)
          throw 'Failed to interpret color arguments'

        this.__state.a = this.__state.a || 1
      }

      Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a']

      common.extend(Color.prototype, {

        toString() {
          return toString(this)
        },

        toOriginal() {
          return this.__state.conversion.write(this)
        },

      })

      defineRGBComponent(Color.prototype, 'r', 2)
      defineRGBComponent(Color.prototype, 'g', 1)
      defineRGBComponent(Color.prototype, 'b', 0)

      defineHSVComponent(Color.prototype, 'h')
      defineHSVComponent(Color.prototype, 's')
      defineHSVComponent(Color.prototype, 'v')

      Object.defineProperty(Color.prototype, 'a', {

        get() {
          return this.__state.a
        },

        set(v) {
          this.__state.a = v
        },

      })

      Object.defineProperty(Color.prototype, 'hex', {

        get() {
          if (!this.__state.space !== 'HEX')
            this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b)

          return this.__state.hex
        },

        set(v) {
          this.__state.space = 'HEX'
          this.__state.hex = v
        },

      })

      function defineRGBComponent(target, component, componentHexIndex) {
        Object.defineProperty(target, component, {

          get() {
            if (this.__state.space === 'RGB')
              return this.__state[component]

            recalculateRGB(this, component, componentHexIndex)

            return this.__state[component]
          },

          set(v) {
            if (this.__state.space !== 'RGB') {
              recalculateRGB(this, component, componentHexIndex)
              this.__state.space = 'RGB'
            }

            this.__state[component] = v
          },

        })
      }

      function defineHSVComponent(target, component) {
        Object.defineProperty(target, component, {

          get() {
            if (this.__state.space === 'HSV')
              return this.__state[component]

            recalculateHSV(this)

            return this.__state[component]
          },

          set(v) {
            if (this.__state.space !== 'HSV') {
              recalculateHSV(this)
              this.__state.space = 'HSV'
            }

            this.__state[component] = v
          },

        })
      }

      function recalculateRGB(color, component, componentHexIndex) {
        if (color.__state.space === 'HEX')

          color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex)

        else if (color.__state.space === 'HSV')

          common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v))

        else

          throw 'Corrupted color state'
      }

      function recalculateHSV(color) {
        const result = math.rgb_to_hsv(color.r, color.g, color.b)

        common.extend(color.__state,
          {
            s: result.s,
            v: result.v,
          },
        )

        if (!common.isNaN(result.h))
          color.__state.h = result.h

        else if (common.isUndefined(color.__state.h))
          color.__state.h = 0
      }

      return Color
    })(dat.color.interpret = (function (toString, common) {
      let result, toReturn

      const interpret = function () {
        toReturn = false

        const original = arguments.length > 1 ? common.toArray(arguments) : arguments[0]

        common.each(INTERPRETATIONS, (family) => {
          if (family.litmus(original)) {
            common.each(family.conversions, (conversion, conversionName) => {
              result = conversion.read(original)

              if (toReturn === false && result !== false) {
                toReturn = result
                result.conversionName = conversionName
                result.conversion = conversion
                return common.BREAK
              }
            })

            return common.BREAK
          }
        })

        return toReturn
      }

      var INTERPRETATIONS = [

        // Strings
        {

          litmus: common.isString,

          conversions: {

            THREE_CHAR_HEX: {

              read(original) {
                const test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i)
                if (test === null)
                  return false

                return {
                  space: 'HEX',
                  hex: parseInt(
                    `0x${
                                         test[1].toString()}${test[1].toString()
                                         }${test[2].toString()}${test[2].toString()
                                         }${test[3].toString()}${test[3].toString()}`),
                }
              },

              write: toString,

            },

            SIX_CHAR_HEX: {

              read(original) {
                const test = original.match(/^#([A-F0-9]{6})$/i)
                if (test === null)
                  return false

                return {
                  space: 'HEX',
                  hex: parseInt(`0x${test[1].toString()}`),
                }
              },

              write: toString,

            },

            CSS_RGB: {

              read(original) {
                const test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/)
                if (test === null)
                  return false

                return {
                  space: 'RGB',
                  r: parseFloat(test[1]),
                  g: parseFloat(test[2]),
                  b: parseFloat(test[3]),
                }
              },

              write: toString,

            },

            CSS_RGBA: {

              read(original) {
                const test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/)
                if (test === null)
                  return false

                return {
                  space: 'RGB',
                  r: parseFloat(test[1]),
                  g: parseFloat(test[2]),
                  b: parseFloat(test[3]),
                  a: parseFloat(test[4]),
                }
              },

              write: toString,

            },

          },

        },

        // Numbers
        {

          litmus: common.isNumber,

          conversions: {

            HEX: {
              read(original) {
                return {
                  space: 'HEX',
                  hex: original,
                  conversionName: 'HEX',
                }
              },

              write(color) {
                return color.hex
              },
            },

          },

        },

        // Arrays
        {

          litmus: common.isArray,

          conversions: {

            RGB_ARRAY: {
              read(original) {
                if (original.length != 3)
                  return false
                return {
                  space: 'RGB',
                  r: original[0],
                  g: original[1],
                  b: original[2],
                }
              },

              write(color) {
                return [color.r, color.g, color.b]
              },

            },

            RGBA_ARRAY: {
              read(original) {
                if (original.length != 4)
                  return false
                return {
                  space: 'RGB',
                  r: original[0],
                  g: original[1],
                  b: original[2],
                  a: original[3],
                }
              },

              write(color) {
                return [color.r, color.g, color.b, color.a]
              },

            },

          },

        },

        // Objects
        {

          litmus: common.isObject,

          conversions: {

            RGBA_OBJ: {
              read(original) {
                if (common.isNumber(original.r)
                                    && common.isNumber(original.g)
                                    && common.isNumber(original.b)
                                    && common.isNumber(original.a)) {
                  return {
                    space: 'RGB',
                    r: original.r,
                    g: original.g,
                    b: original.b,
                    a: original.a,
                  }
                }
                return false
              },

              write(color) {
                return {
                  r: color.r,
                  g: color.g,
                  b: color.b,
                  a: color.a,
                }
              },
            },

            RGB_OBJ: {
              read(original) {
                if (common.isNumber(original.r)
                                    && common.isNumber(original.g)
                                    && common.isNumber(original.b)) {
                  return {
                    space: 'RGB',
                    r: original.r,
                    g: original.g,
                    b: original.b,
                  }
                }
                return false
              },

              write(color) {
                return {
                  r: color.r,
                  g: color.g,
                  b: color.b,
                }
              },
            },

            HSVA_OBJ: {
              read(original) {
                if (common.isNumber(original.h)
                                    && common.isNumber(original.s)
                                    && common.isNumber(original.v)
                                    && common.isNumber(original.a)) {
                  return {
                    space: 'HSV',
                    h: original.h,
                    s: original.s,
                    v: original.v,
                    a: original.a,
                  }
                }
                return false
              },

              write(color) {
                return {
                  h: color.h,
                  s: color.s,
                  v: color.v,
                  a: color.a,
                }
              },
            },

            HSV_OBJ: {
              read(original) {
                if (common.isNumber(original.h)
                                    && common.isNumber(original.s)
                                    && common.isNumber(original.v)) {
                  return {
                    space: 'HSV',
                    h: original.h,
                    s: original.s,
                    v: original.v,
                  }
                }
                return false
              },

              write(color) {
                return {
                  h: color.h,
                  s: color.s,
                  v: color.v,
                }
              },

            },

          },

        },

      ]

      return interpret
    })(dat.color.toString,
      dat.utils.common),
    dat.color.math = (function () {
      let tmpComponent

      return {

        hsv_to_rgb(h, s, v) {
          const hi = Math.floor(h / 60) % 6

          const f = h / 60 - Math.floor(h / 60)
          const p = v * (1.0 - s)
          const q = v * (1.0 - (f * s))
          const t = v * (1.0 - ((1.0 - f) * s))
          const c = [
            [v, t, p],
            [q, v, p],
            [p, v, t],
            [p, q, v],
            [t, p, v],
            [v, p, q],
          ][hi]

          return {
            r: c[0] * 255,
            g: c[1] * 255,
            b: c[2] * 255,
          }
        },

        rgb_to_hsv(r, g, b) {
          const min = Math.min(r, g, b)
          const max = Math.max(r, g, b)
          const delta = max - min
          let h; let s

          if (max != 0) {
            s = delta / max
          }
          else {
            return {
              h: NaN,
              s: 0,
              v: 0,
            }
          }

          if (r == max)
            h = (g - b) / delta
          else if (g == max)
            h = 2 + (b - r) / delta
          else
            h = 4 + (r - g) / delta

          h /= 6
          if (h < 0)
            h += 1

          return {
            h: h * 360,
            s,
            v: max / 255,
          }
        },

        rgb_to_hex(r, g, b) {
          let hex = this.hex_with_component(0, 2, r)
          hex = this.hex_with_component(hex, 1, g)
          hex = this.hex_with_component(hex, 0, b)
          return hex
        },

        component_from_hex(hex, componentIndex) {
          return (hex >> (componentIndex * 8)) & 0xFF
        },

        hex_with_component(hex, componentIndex, value) {
          return value << (tmpComponent = componentIndex * 8) | (hex & ~(0xFF << tmpComponent))
        },

      }
    })(),
    dat.color.toString,
    dat.utils.common)
  }, {}],
  3: [function (require, module, exports) {
    /**
         * dat-gui JavaScript Controller Library
         * https://code.google.com/p/dat-gui
         *
         * Copyright 2011 Data Arts Team, Google Creative Lab
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         */

    /** @namespace */
    var dat = module.exports = dat || {}

    /** @namespace */
    dat.gui = dat.gui || {}

    /** @namespace */
    dat.utils = dat.utils || {}

    /** @namespace */
    dat.controllers = dat.controllers || {}

    /** @namespace */
    dat.dom = dat.dom || {}

    /** @namespace */
    dat.color = dat.color || {}

    dat.utils.css = (function () {
      return {
        load(url, doc) {
          doc = doc || document
          const link = doc.createElement('link')
          link.type = 'text/css'
          link.rel = 'stylesheet'
          link.href = url
          doc.getElementsByTagName('head')[0].appendChild(link)
        },
        inject(css, doc) {
          doc = doc || document
          const injected = document.createElement('style')
          injected.type = 'text/css'
          injected.innerHTML = css
          doc.getElementsByTagName('head')[0].appendChild(injected)
        },
      }
    })()

    dat.utils.common = (function () {
      const ARR_EACH = Array.prototype.forEach
      const ARR_SLICE = Array.prototype.slice

      /**
             * Band-aid methods for things that should be a lot easier in JavaScript.
             * Implementation and structure inspired by underscore.js
             * https://documentcloud.github.com/underscore/
             */

      return {

        BREAK: {},

        extend(target) {
          this.each(ARR_SLICE.call(arguments, 1), function (obj) {
            for (const key in obj) {
              if (!this.isUndefined(obj[key]))
                target[key] = obj[key]
            }
          }, this)

          return target
        },

        defaults(target) {
          this.each(ARR_SLICE.call(arguments, 1), function (obj) {
            for (const key in obj) {
              if (this.isUndefined(target[key]))
                target[key] = obj[key]
            }
          }, this)

          return target
        },

        compose() {
          const toCall = ARR_SLICE.call(arguments)
          return function () {
            let args = ARR_SLICE.call(arguments)
            for (let i = toCall.length - 1; i >= 0; i--)
              args = [toCall[i].apply(this, args)]

            return args[0]
          }
        },

        each(obj, itr, scope) {
          if (ARR_EACH && obj.forEach === ARR_EACH) {
            obj.forEach(itr, scope)
          }
          else if (obj.length === obj.length + 0) { // Is number but not NaN
            for (var key = 0, l = obj.length; key < l; key++) {
              if (key in obj && itr.call(scope, obj[key], key) === this.BREAK)
                return
            }
          }
          else {
            for (var key in obj) {
              if (itr.call(scope, obj[key], key) === this.BREAK)
                return
            }
          }
        },

        defer(fnc) {
          setTimeout(fnc, 0)
        },

        toArray(obj) {
          if (obj.toArray)
            return obj.toArray()
          return ARR_SLICE.call(obj)
        },

        isUndefined(obj) {
          return obj === undefined
        },

        isNull(obj) {
          return obj === null
        },

        isNaN(obj) {
          return obj !== obj
        },

        isArray: Array.isArray || function (obj) {
          return obj.constructor === Array
        },

        isObject(obj) {
          return obj === Object(obj)
        },

        isNumber(obj) {
          return obj === obj + 0
        },

        isString(obj) {
          return obj === `${obj}`
        },

        isBoolean(obj) {
          return obj === false || obj === true
        },

        isFunction(obj) {
          return Object.prototype.toString.call(obj) === '[object Function]'
        },

      }
    })()

    dat.controllers.Controller = (function (common) {
      /**
             * @class An "abstract" class that represents a given property of an object.
             *
             * @param {Object} object The object to be manipulated
             * @param {string} property The name of the property to be manipulated
             *
             * @member dat.controllers
             */
      const Controller = function (object, property) {
        this.initialValue = object[property]

        /**
                 * Those who extend this class will put their DOM elements in here.
                 * @type {DOMElement}
                 */
        this.domElement = document.createElement('div')

        /**
                 * The object to manipulate
                 * @type {Object}
                 */
        this.object = object

        /**
                 * The name of the property to manipulate
                 * @type {String}
                 */
        this.property = property

        /**
                 * The function to be called on change.
                 * @type {Function}
                 * @ignore
                 */
        this.__onChange = undefined

        /**
                 * The function to be called on finishing change.
                 * @type {Function}
                 * @ignore
                 */
        this.__onFinishChange = undefined
      }

      common.extend(

        Controller.prototype,

        /** @lends dat.controllers.Controller.prototype */
        {

          /**
                     * Specify that a function fire every time someone changes the value with
                     * this Controller.
                     *
                     * @param {Function} fnc This function will be called whenever the value
                     * is modified via this Controller.
                     * @returns {dat.controllers.Controller} this
                     */
          onChange(fnc) {
            this.__onChange = fnc
            return this
          },

          /**
                     * Specify that a function fire every time someone "finishes" changing
                     * the value wih this Controller. Useful for values that change
                     * incrementally like numbers or strings.
                     *
                     * @param {Function} fnc This function will be called whenever
                     * someone "finishes" changing the value via this Controller.
                     * @returns {dat.controllers.Controller} this
                     */
          onFinishChange(fnc) {
            this.__onFinishChange = fnc
            return this
          },

          /**
                     * Change the value of <code>object[property]</code>
                     *
                     * @param {Object} newValue The new value of <code>object[property]</code>
                     */
          setValue(newValue) {
            this.object[this.property] = newValue
            if (this.__onChange)
              this.__onChange.call(this, newValue)

            this.updateDisplay()
            return this
          },

          /**
                     * Gets the value of <code>object[property]</code>
                     *
                     * @returns {Object} The current value of <code>object[property]</code>
                     */
          getValue() {
            return this.object[this.property]
          },

          /**
                     * Refreshes the visual display of a Controller in order to keep sync
                     * with the object's current value.
                     * @returns {dat.controllers.Controller} this
                     */
          updateDisplay() {
            return this
          },

          /**
                     * @returns {Boolean} true if the value has deviated from initialValue
                     */
          isModified() {
            return this.initialValue !== this.getValue()
          },

        },

      )

      return Controller
    })(dat.utils.common)

    dat.dom.dom = (function (common) {
      const EVENT_MAP = {
        HTMLEvents: ['change'],
        MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
        KeyboardEvents: ['keydown'],
      }

      const EVENT_MAP_INV = {}
      common.each(EVENT_MAP, (v, k) => {
        common.each(v, (e) => {
          EVENT_MAP_INV[e] = k
        })
      })

      const CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/

      function cssValueToPixels(val) {
        if (val === '0' || common.isUndefined(val))
          return 0

        const match = val.match(CSS_VALUE_PIXELS)

        if (!common.isNull(match))
          return parseFloat(match[1])

        // TODO ...ems? %?

        return 0
      }

      /**
             * @namespace
             * @member dat.dom
             */
      var dom = {

        /**
                 *
                 * @param elem
                 * @param selectable
                 */
        makeSelectable(elem, selectable) {
          if (elem === undefined || elem.style === undefined)
            return

          elem.onselectstart = selectable
            ? function () {
              return false
            }
            : function () {
            }

          elem.style.MozUserSelect = selectable ? 'auto' : 'none'
          elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none'
          elem.unselectable = selectable ? 'on' : 'off'
        },

        /**
                 *
                 * @param elem
                 * @param horizontal
                 * @param vertical
                 */
        makeFullscreen(elem, horizontal, vertical) {
          if (common.isUndefined(horizontal))
            horizontal = true
          if (common.isUndefined(vertical))
            vertical = true

          elem.style.position = 'absolute'

          if (horizontal) {
            elem.style.left = 0
            elem.style.right = 0
          }
          if (vertical) {
            elem.style.top = 0
            elem.style.bottom = 0
          }
        },

        /**
                 *
                 * @param elem
                 * @param eventType
                 * @param params
                 */
        fakeEvent(elem, eventType, params, aux) {
          params = params || {}
          const className = EVENT_MAP_INV[eventType]
          if (!className)
            throw new Error(`Event type ${eventType} not supported.`)

          const evt = document.createEvent(className)
          switch (className) {
            case 'MouseEvents':
              var clientX = params.x || params.clientX || 0
              var clientY = params.y || params.clientY || 0
              evt.initMouseEvent(eventType, params.bubbles || false,
                params.cancelable || true, window, params.clickCount || 1,
                0, // screen X
                0, // screen Y
                clientX, // client X
                clientY, // client Y
                false, false, false, false, 0, null)
              break
            case 'KeyboardEvents':
              var init = evt.initKeyboardEvent || evt.initKeyEvent // webkit || moz
              common.defaults(params, {
                cancelable: true,
                ctrlKey: false,
                altKey: false,
                shiftKey: false,
                metaKey: false,
                keyCode: undefined,
                charCode: undefined,
              })
              init(eventType, params.bubbles || false,
                params.cancelable, window,
                params.ctrlKey, params.altKey,
                params.shiftKey, params.metaKey,
                params.keyCode, params.charCode)
              break
            default:
              evt.initEvent(eventType, params.bubbles || false,
                params.cancelable || true)
              break
          }
          common.defaults(evt, aux)
          elem.dispatchEvent(evt)
        },

        /**
                 *
                 * @param elem
                 * @param event
                 * @param func
                 * @param bool
                 */
        bind(elem, event, func, bool) {
          bool = bool || false
          if (elem.addEventListener)
            elem.addEventListener(event, func, bool)
          else if (elem.attachEvent)
            elem.attachEvent(`on${event}`, func)
          return dom
        },

        /**
                 *
                 * @param elem
                 * @param event
                 * @param func
                 * @param bool
                 */
        unbind(elem, event, func, bool) {
          bool = bool || false
          if (elem.removeEventListener)
            elem.removeEventListener(event, func, bool)
          else if (elem.detachEvent)
            elem.detachEvent(`on${event}`, func)
          return dom
        },

        /**
                 *
                 * @param elem
                 * @param className
                 */
        addClass(elem, className) {
          if (elem.className === undefined) {
            elem.className = className
          }
          else if (elem.className !== className) {
            const classes = elem.className.split(/ +/)
            if (!classes.includes(className)) {
              classes.push(className)
              elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '')
            }
          }
          return dom
        },

        /**
                 *
                 * @param elem
                 * @param className
                 */
        removeClass(elem, className) {
          if (className) {
            if (elem.className === undefined) {
              // elem.className = className;
            }
            else if (elem.className === className) {
              elem.removeAttribute('class')
            }
            else {
              const classes = elem.className.split(/ +/)
              const index = classes.indexOf(className)
              if (index != -1) {
                classes.splice(index, 1)
                elem.className = classes.join(' ')
              }
            }
          }
          else {
            elem.className = undefined
          }
          return dom
        },

        hasClass(elem, className) {
          return new RegExp(`(?:^|\\s+)${className}(?:\\s+|$)`).test(elem.className) || false
        },

        /**
                 *
                 * @param elem
                 */
        getWidth(elem) {
          const style = getComputedStyle(elem)

          return cssValueToPixels(style['border-left-width'])
                        + cssValueToPixels(style['border-right-width'])
                        + cssValueToPixels(style['padding-left'])
                        + cssValueToPixels(style['padding-right'])
                        + cssValueToPixels(style.width)
        },

        /**
                 *
                 * @param elem
                 */
        getHeight(elem) {
          const style = getComputedStyle(elem)

          return cssValueToPixels(style['border-top-width'])
                        + cssValueToPixels(style['border-bottom-width'])
                        + cssValueToPixels(style['padding-top'])
                        + cssValueToPixels(style['padding-bottom'])
                        + cssValueToPixels(style.height)
        },

        /**
                 *
                 * @param elem
                 */
        getOffset(elem) {
          const offset = { left: 0, top: 0 }
          if (elem.offsetParent) {
            do {
              offset.left += elem.offsetLeft
              offset.top += elem.offsetTop
            } while (elem = elem.offsetParent)
          }
          return offset
        },

        // http://stackoverflow.com/posts/2684561/revisions
        /**
                 *
                 * @param elem
                 */
        isActive(elem) {
          return elem === document.activeElement && (elem.type || elem.href)
        },

      }

      return dom
    })(dat.utils.common)

    dat.controllers.OptionController = (function (Controller, dom, common) {
      /**
             * @class Provides a select input to alter the property of an object, using a
             * list of accepted values.
             *
             * @extends dat.controllers.Controller
             *
             * @param {Object} object The object to be manipulated
             * @param {string} property The name of the property to be manipulated
             * @param {Object|string[]} options A map of labels to acceptable values, or
             * a list of acceptable string values.
             *
             * @member dat.controllers
             */
      var OptionController = function (object, property, options) {
        OptionController.superclass.call(this, object, property)

        const _this = this

        /**
                 * The drop down menu
                 * @ignore
                 */
        this.__select = document.createElement('select')

        if (common.isArray(options)) {
          const map = {}
          common.each(options, (element) => {
            map[element] = element
          })
          options = map
        }

        common.each(options, (value, key) => {
          const opt = document.createElement('option')
          opt.innerHTML = key
          opt.setAttribute('value', value)
          _this.__select.appendChild(opt)
        })

        // Acknowledge original value
        this.updateDisplay()

        dom.bind(this.__select, 'change', function () {
          const desiredValue = this.options[this.selectedIndex].value
          _this.setValue(desiredValue)
        })

        this.domElement.appendChild(this.__select)
      }

      OptionController.superclass = Controller

      common.extend(

        OptionController.prototype,
        Controller.prototype,

        {

          setValue(v) {
            const toReturn = OptionController.superclass.prototype.setValue.call(this, v)
            if (this.__onFinishChange)
              this.__onFinishChange.call(this, this.getValue())

            return toReturn
          },

          updateDisplay() {
            this.__select.value = this.getValue()
            return OptionController.superclass.prototype.updateDisplay.call(this)
          },

        },

      )

      return OptionController
    })(dat.controllers.Controller,
      dat.dom.dom,
      dat.utils.common)

    dat.controllers.NumberController = (function (Controller, common) {
      /**
             * @class Represents a given property of an object that is a number.
             *
             * @extends dat.controllers.Controller
             *
             * @param {Object} object The object to be manipulated
             * @param {string} property The name of the property to be manipulated
             * @param {Object} [params] Optional parameters
             * @param {Number} [params.min] Minimum allowed value
             * @param {Number} [params.max] Maximum allowed value
             * @param {Number} [params.step] Increment by which to change value
             *
             * @member dat.controllers
             */
      var NumberController = function (object, property, params) {
        NumberController.superclass.call(this, object, property)

        params = params || {}

        this.__min = params.min
        this.__max = params.max
        this.__step = params.step

        if (common.isUndefined(this.__step)) {
          if (this.initialValue == 0) {
            this.__impliedStep = 1 // What are we, psychics?
          }
          else {
            // Hey Doug, check this out.
            this.__impliedStep = 10 ** Math.floor(Math.log(this.initialValue) / Math.LN10) / 10
          }
        }
        else {
          this.__impliedStep = this.__step
        }

        this.__precision = numDecimals(this.__impliedStep)
      }

      NumberController.superclass = Controller

      common.extend(

        NumberController.prototype,
        Controller.prototype,

        /** @lends dat.controllers.NumberController.prototype */
        {

          setValue(v) {
            if (this.__min !== undefined && v < this.__min)
              v = this.__min
            else if (this.__max !== undefined && v > this.__max)
              v = this.__max

            if (this.__step !== undefined && v % this.__step != 0)
              v = Math.round(v / this.__step) * this.__step

            return NumberController.superclass.prototype.setValue.call(this, v)
          },

          /**
                     * Specify a minimum value for <code>object[property]</code>.
                     *
                     * @param {Number} minValue The minimum value for
                     * <code>object[property]</code>
                     * @returns {dat.controllers.NumberController} this
                     */
          min(v) {
            this.__min = v
            return this
          },

          /**
                     * Specify a maximum value for <code>object[property]</code>.
                     *
                     * @param {Number} maxValue The maximum value for
                     * <code>object[property]</code>
                     * @returns {dat.controllers.NumberController} this
                     */
          max(v) {
            this.__max = v
            return this
          },

          /**
                     * Specify a step value that dat.controllers.NumberController
                     * increments by.
                     *
                     * @param {Number} stepValue The step value for
                     * dat.controllers.NumberController
                     * @default if minimum and maximum specified increment is 1% of the
                     * difference otherwise stepValue is 1
                     * @returns {dat.controllers.NumberController} this
                     */
          step(v) {
            this.__step = v
            return this
          },

        },

      )

      function numDecimals(x) {
        x = x.toString()
        if (x.includes('.'))
          return x.length - x.indexOf('.') - 1

        else
          return 0
      }

      return NumberController
    })(dat.controllers.Controller,
      dat.utils.common)

    dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {
      /**
             * @class Represents a given property of an object that is a number and
             * provides an input element with which to manipulate it.
             *
             * @extends dat.controllers.Controller
             * @extends dat.controllers.NumberController
             *
             * @param {Object} object The object to be manipulated
             * @param {string} property The name of the property to be manipulated
             * @param {Object} [params] Optional parameters
             * @param {Number} [params.min] Minimum allowed value
             * @param {Number} [params.max] Maximum allowed value
             * @param {Number} [params.step] Increment by which to change value
             *
             * @member dat.controllers
             */
      var NumberControllerBox = function (object, property, params) {
        this.__truncationSuspended = false

        NumberControllerBox.superclass.call(this, object, property, params)

        const _this = this

        /**
                 * {Number} Previous mouse y position
                 * @ignore
                 */
        let prev_y

        this.__input = document.createElement('input')
        this.__input.setAttribute('type', 'text')

        // Makes it so manually specified values are not truncated.

        dom.bind(this.__input, 'change', onChange)
        dom.bind(this.__input, 'blur', onBlur)
        dom.bind(this.__input, 'mousedown', onMouseDown)
        dom.bind(this.__input, 'keydown', function (e) {
          // When pressing entire, you can be as precise as you want.
          if (e.keyCode === 13) {
            _this.__truncationSuspended = true
            this.blur()
            _this.__truncationSuspended = false
          }
        })

        function onChange() {
          const attempted = parseFloat(_this.__input.value)
          if (!common.isNaN(attempted))
            _this.setValue(attempted)
        }

        function onBlur() {
          onChange()
          if (_this.__onFinishChange)
            _this.__onFinishChange.call(_this, _this.getValue())
        }

        function onMouseDown(e) {
          dom.bind(window, 'mousemove', onMouseDrag)
          dom.bind(window, 'mouseup', onMouseUp)
          prev_y = e.clientY
        }

        function onMouseDrag(e) {
          const diff = prev_y - e.clientY
          _this.setValue(_this.getValue() + diff * _this.__impliedStep)

          prev_y = e.clientY
        }

        function onMouseUp() {
          dom.unbind(window, 'mousemove', onMouseDrag)
          dom.unbind(window, 'mouseup', onMouseUp)
        }

        this.updateDisplay()

        this.domElement.appendChild(this.__input)
      }

      NumberControllerBox.superclass = NumberController

      common.extend(

        NumberControllerBox.prototype,
        NumberController.prototype,

        {

          updateDisplay() {
            this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision)
            return NumberControllerBox.superclass.prototype.updateDisplay.call(this)
          },

        },

      )

      function roundToDecimal(value, decimals) {
        const tenTo = 10 ** decimals
        return Math.round(value * tenTo) / tenTo
      }

      return NumberControllerBox
    })(dat.controllers.NumberController,
      dat.dom.dom,
      dat.utils.common)

    dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {
      /**
             * @class Represents a given property of an object that is a number, contains
             * a minimum and maximum, and provides a slider element with which to
             * manipulate it. It should be noted that the slider element is made up of
             * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
             * <code>&lt;slider&gt;</code> element.
             *
             * @extends dat.controllers.Controller
             * @extends dat.controllers.NumberController
             *
             * @param {Object} object The object to be manipulated
             * @param {string} property The name of the property to be manipulated
             * @param {Number} minValue Minimum allowed value
             * @param {Number} maxValue Maximum allowed value
             * @param {Number} stepValue Increment by which to change value
             *
             * @member dat.controllers
             */
      var NumberControllerSlider = function (object, property, min, max, step) {
        NumberControllerSlider.superclass.call(this, object, property, { min, max, step })

        const _this = this

        this.__background = document.createElement('div')
        this.__foreground = document.createElement('div')

        dom.bind(this.__background, 'mousedown', onMouseDown)

        dom.addClass(this.__background, 'slider')
        dom.addClass(this.__foreground, 'slider-fg')

        function onMouseDown(e) {
          dom.bind(window, 'mousemove', onMouseDrag)
          dom.bind(window, 'mouseup', onMouseUp)

          onMouseDrag(e)
        }

        function onMouseDrag(e) {
          e.preventDefault()

          const offset = dom.getOffset(_this.__background)
          const width = dom.getWidth(_this.__background)

          _this.setValue(
            map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max),
          )

          return false
        }

        function onMouseUp() {
          dom.unbind(window, 'mousemove', onMouseDrag)
          dom.unbind(window, 'mouseup', onMouseUp)
          if (_this.__onFinishChange)
            _this.__onFinishChange.call(_this, _this.getValue())
        }

        this.updateDisplay()

        this.__background.appendChild(this.__foreground)
        this.domElement.appendChild(this.__background)
      }

      NumberControllerSlider.superclass = NumberController

      /**
             * Injects default stylesheet for slider elements.
             */
      NumberControllerSlider.useDefaultStyles = function () {
        css.inject(styleSheet)
      }

      common.extend(

        NumberControllerSlider.prototype,
        NumberController.prototype,

        {

          updateDisplay() {
            const pct = (this.getValue() - this.__min) / (this.__max - this.__min)
            this.__foreground.style.width = `${pct * 100}%`
            return NumberControllerSlider.superclass.prototype.updateDisplay.call(this)
          },

        },

      )

      function map(v, i1, i2, o1, o2) {
        return o1 + (o2 - o1) * ((v - i1) / (i2 - i1))
      }

      return NumberControllerSlider
    })(dat.controllers.NumberController,
      dat.dom.dom,
      dat.utils.css,
      dat.utils.common,
      '.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: \'\';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}')

    dat.controllers.FunctionController = (function (Controller, dom, common) {
      /**
             * @class Provides a GUI interface to fire a specified method, a property of an object.
             *
             * @extends dat.controllers.Controller
             *
             * @param {Object} object The object to be manipulated
             * @param {string} property The name of the property to be manipulated
             *
             * @member dat.controllers
             */
      var FunctionController = function (object, property, text) {
        FunctionController.superclass.call(this, object, property)

        const _this = this

        this.__button = document.createElement('div')
        this.__button.innerHTML = text === undefined ? 'Fire' : text
        dom.bind(this.__button, 'click', (e) => {
          e.preventDefault()
          _this.fire()
          return false
        })

        dom.addClass(this.__button, 'button')

        this.domElement.appendChild(this.__button)
      }

      FunctionController.superclass = Controller

      common.extend(

        FunctionController.prototype,
        Controller.prototype,
        {

          fire() {
            if (this.__onChange)
              this.__onChange.call(this)

            if (this.__onFinishChange)
              this.__onFinishChange.call(this, this.getValue())

            this.getValue().call(this.object)
          },
        },

      )

      return FunctionController
    })(dat.controllers.Controller,
      dat.dom.dom,
      dat.utils.common)

    dat.controllers.BooleanController = (function (Controller, dom, common) {
      /**
             * @class Provides a checkbox input to alter the boolean property of an object.
             * @extends dat.controllers.Controller
             *
             * @param {Object} object The object to be manipulated
             * @param {string} property The name of the property to be manipulated
             *
             * @member dat.controllers
             */
      var BooleanController = function (object, property) {
        BooleanController.superclass.call(this, object, property)

        const _this = this
        this.__prev = this.getValue()

        this.__checkbox = document.createElement('input')
        this.__checkbox.setAttribute('type', 'checkbox')

        dom.bind(this.__checkbox, 'change', onChange, false)

        this.domElement.appendChild(this.__checkbox)

        // Match original value
        this.updateDisplay()

        function onChange() {
          _this.setValue(!_this.__prev)
        }
      }

      BooleanController.superclass = Controller

      common.extend(

        BooleanController.prototype,
        Controller.prototype,

        {

          setValue(v) {
            const toReturn = BooleanController.superclass.prototype.setValue.call(this, v)
            if (this.__onFinishChange)
              this.__onFinishChange.call(this, this.getValue())

            this.__prev = this.getValue()
            return toReturn
          },

          updateDisplay() {
            if (this.getValue() === true) {
              this.__checkbox.setAttribute('checked', 'checked')
              this.__checkbox.checked = true
            }
            else {
              this.__checkbox.checked = false
            }

            return BooleanController.superclass.prototype.updateDisplay.call(this)
          },

        },

      )

      return BooleanController
    })(dat.controllers.Controller,
      dat.dom.dom,
      dat.utils.common)

    dat.color.toString = (function (common) {
      return function (color) {
        if (color.a == 1 || common.isUndefined(color.a)) {
          let s = color.hex.toString(16)
          while (s.length < 6)
            s = `0${s}`

          return `#${s}`
        }
        else {
          return `rgba(${Math.round(color.r)},${Math.round(color.g)},${Math.round(color.b)},${color.a})`
        }
      }
    })(dat.utils.common)

    dat.color.interpret = (function (toString, common) {
      let result, toReturn

      const interpret = function () {
        toReturn = false

        const original = arguments.length > 1 ? common.toArray(arguments) : arguments[0]

        common.each(INTERPRETATIONS, (family) => {
          if (family.litmus(original)) {
            common.each(family.conversions, (conversion, conversionName) => {
              result = conversion.read(original)

              if (toReturn === false && result !== false) {
                toReturn = result
                result.conversionName = conversionName
                result.conversion = conversion
                return common.BREAK
              }
            })

            return common.BREAK
          }
        })

        return toReturn
      }

      var INTERPRETATIONS = [

        // Strings
        {

          litmus: common.isString,

          conversions: {

            THREE_CHAR_HEX: {

              read(original) {
                const test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i)
                if (test === null)
                  return false

                return {
                  space: 'HEX',
                  hex: parseInt(
                    `0x${
                                         test[1].toString()}${test[1].toString()
                                         }${test[2].toString()}${test[2].toString()
                                         }${test[3].toString()}${test[3].toString()}`),
                }
              },

              write: toString,

            },

            SIX_CHAR_HEX: {

              read(original) {
                const test = original.match(/^#([A-F0-9]{6})$/i)
                if (test === null)
                  return false

                return {
                  space: 'HEX',
                  hex: parseInt(`0x${test[1].toString()}`),
                }
              },

              write: toString,

            },

            CSS_RGB: {

              read(original) {
                const test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/)
                if (test === null)
                  return false

                return {
                  space: 'RGB',
                  r: parseFloat(test[1]),
                  g: parseFloat(test[2]),
                  b: parseFloat(test[3]),
                }
              },

              write: toString,

            },

            CSS_RGBA: {

              read(original) {
                const test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/)
                if (test === null)
                  return false

                return {
                  space: 'RGB',
                  r: parseFloat(test[1]),
                  g: parseFloat(test[2]),
                  b: parseFloat(test[3]),
                  a: parseFloat(test[4]),
                }
              },

              write: toString,

            },

          },

        },

        // Numbers
        {

          litmus: common.isNumber,

          conversions: {

            HEX: {
              read(original) {
                return {
                  space: 'HEX',
                  hex: original,
                  conversionName: 'HEX',
                }
              },

              write(color) {
                return color.hex
              },
            },

          },

        },

        // Arrays
        {

          litmus: common.isArray,

          conversions: {

            RGB_ARRAY: {
              read(original) {
                if (original.length != 3)
                  return false
                return {
                  space: 'RGB',
                  r: original[0],
                  g: original[1],
                  b: original[2],
                }
              },

              write(color) {
                return [color.r, color.g, color.b]
              },

            },

            RGBA_ARRAY: {
              read(original) {
                if (original.length != 4)
                  return false
                return {
                  space: 'RGB',
                  r: original[0],
                  g: original[1],
                  b: original[2],
                  a: original[3],
                }
              },

              write(color) {
                return [color.r, color.g, color.b, color.a]
              },

            },

          },

        },

        // Objects
        {

          litmus: common.isObject,

          conversions: {

            RGBA_OBJ: {
              read(original) {
                if (common.isNumber(original.r)
                                    && common.isNumber(original.g)
                                    && common.isNumber(original.b)
                                    && common.isNumber(original.a)) {
                  return {
                    space: 'RGB',
                    r: original.r,
                    g: original.g,
                    b: original.b,
                    a: original.a,
                  }
                }
                return false
              },

              write(color) {
                return {
                  r: color.r,
                  g: color.g,
                  b: color.b,
                  a: color.a,
                }
              },
            },

            RGB_OBJ: {
              read(original) {
                if (common.isNumber(original.r)
                                    && common.isNumber(original.g)
                                    && common.isNumber(original.b)) {
                  return {
                    space: 'RGB',
                    r: original.r,
                    g: original.g,
                    b: original.b,
                  }
                }
                return false
              },

              write(color) {
                return {
                  r: color.r,
                  g: color.g,
                  b: color.b,
                }
              },
            },

            HSVA_OBJ: {
              read(original) {
                if (common.isNumber(original.h)
                                    && common.isNumber(original.s)
                                    && common.isNumber(original.v)
                                    && common.isNumber(original.a)) {
                  return {
                    space: 'HSV',
                    h: original.h,
                    s: original.s,
                    v: original.v,
                    a: original.a,
                  }
                }
                return false
              },

              write(color) {
                return {
                  h: color.h,
                  s: color.s,
                  v: color.v,
                  a: color.a,
                }
              },
            },

            HSV_OBJ: {
              read(original) {
                if (common.isNumber(original.h)
                                    && common.isNumber(original.s)
                                    && common.isNumber(original.v)) {
                  return {
                    space: 'HSV',
                    h: original.h,
                    s: original.s,
                    v: original.v,
                  }
                }
                return false
              },

              write(color) {
                return {
                  h: color.h,
                  s: color.s,
                  v: color.v,
                }
              },

            },

          },

        },

      ]

      return interpret
    })(dat.color.toString,
      dat.utils.common)

    dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {
      css.inject(styleSheet)

      /** Outer-most className for GUI's */
      const CSS_NAMESPACE = 'dg'

      const HIDE_KEY_CODE = 72

      /** The only value shared between the JS and SCSS. Use caution. */
      const CLOSE_BUTTON_HEIGHT = 20

      const DEFAULT_DEFAULT_PRESET_NAME = 'Default'

      const SUPPORTS_LOCAL_STORAGE = (function () {
        try {
          return 'localStorage' in window && window.localStorage !== null
        }
        catch (e) {
          return false
        }
      })()

      let SAVE_DIALOGUE

      /** Have we yet to create an autoPlace GUI? */
      let auto_place_virgin = true

      /** Fixed position div that auto place GUI's go inside */
      let auto_place_container

      /** Are we hiding the GUI's ? */
      let hide = false

      /** GUI's which should be hidden */
      const hideable_guis = []

      /**
             * A lightweight controller library for JavaScript. It allows you to easily
             * manipulate variables and fire functions on the fly.
             * @class
             *
             * @member dat.gui
             *
             * @param {Object} [params]
             * @param {String} [params.name] The name of this GUI.
             * @param {Object} [params.load] JSON object representing the saved state of
             * this GUI.
             * @param {Boolean} [params.auto=true]
             * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
             * @param {Boolean} [params.closed] If true, starts closed
             */
      var GUI = function (params) {
        const _this = this

        /**
                 * Outermost DOM Element
                 * @type DOMElement
                 */
        this.domElement = document.createElement('div')
        this.__ul = document.createElement('ul')
        this.domElement.appendChild(this.__ul)

        dom.addClass(this.domElement, CSS_NAMESPACE)

        /**
                 * Nested GUI's by name
                 * @ignore
                 */
        this.__folders = {}

        this.__controllers = []

        /**
                 * List of objects I'm remembering for save, only used in top level GUI
                 * @ignore
                 */
        this.__rememberedObjects = []

        /**
                 * Maps the index of remembered objects to a map of controllers, only used
                 * in top level GUI.
                 *
                 * @private
                 * @ignore
                 *
                 * @example
                 * [
                 *  {
                 *    propertyName: Controller,
                 *    anotherPropertyName: Controller
                 *  },
                 *  {
                 *    propertyName: Controller
                 *  }
                 * ]
                 */
        this.__rememberedObjectIndecesToControllers = []

        this.__listening = []

        params = params || {}

        // Default parameters
        params = common.defaults(params, {
          autoPlace: true,
          width: GUI.DEFAULT_WIDTH,
        })

        params = common.defaults(params, {
          resizable: params.autoPlace,
          hideable: params.autoPlace,
        })

        if (!common.isUndefined(params.load)) {
          // Explicit preset
          if (params.preset)
            params.load.preset = params.preset
        }
        else {
          params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME }
        }

        if (common.isUndefined(params.parent) && params.hideable)
          hideable_guis.push(this)

        // Only root level GUI's are resizable.
        params.resizable = common.isUndefined(params.parent) && params.resizable

        if (params.autoPlace && common.isUndefined(params.scrollable))
          params.scrollable = true

        //    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

        // Not part of params because I don't want people passing this in via
        // constructor. Should be a 'remembered' value.
        let use_local_storage
                    = SUPPORTS_LOCAL_STORAGE
                    && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true'

        Object.defineProperties(this,

          /** @lends dat.gui.GUI.prototype */
          {

            /**
                         * The parent <code>GUI</code>
                         * @type dat.gui.GUI
                         */
            parent: {
              get() {
                return params.parent
              },
            },

            scrollable: {
              get() {
                return params.scrollable
              },
            },

            /**
                         * Handles <code>GUI</code>'s element placement for you
                         * @type Boolean
                         */
            autoPlace: {
              get() {
                return params.autoPlace
              },
            },

            /**
                         * The identifier for a set of saved values
                         * @type String
                         */
            preset: {

              get() {
                if (_this.parent)
                  return _this.getRoot().preset
                else
                  return params.load.preset
              },

              set(v) {
                if (_this.parent)
                  _this.getRoot().preset = v
                else
                  params.load.preset = v

                setPresetSelectIndex(this)
                _this.revert()
              },

            },

            /**
                         * The width of <code>GUI</code> element
                         * @type Number
                         */
            width: {
              get() {
                return params.width
              },
              set(v) {
                params.width = v
                setWidth(_this, v)
              },
            },

            /**
                         * The name of <code>GUI</code>. Used for folders. i.e
                         * a folder's name
                         * @type String
                         */
            name: {
              get() {
                return params.name
              },
              set(v) {
                // TODO Check for collisions among sibling folders
                params.name = v
                if (title_row_name)
                  title_row_name.innerHTML = params.name
              },
            },

            /**
                         * Whether the <code>GUI</code> is collapsed or not
                         * @type Boolean
                         */
            closed: {
              get() {
                return params.closed
              },
              set(v) {
                params.closed = v
                if (params.closed)
                  dom.addClass(_this.__ul, GUI.CLASS_CLOSED)
                else
                  dom.removeClass(_this.__ul, GUI.CLASS_CLOSED)

                // For browsers that aren't going to respect the CSS transition,
                // Lets just check our height against the window height right off
                // the bat.
                this.onResize()

                if (_this.__closeButton)
                  _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED
              },
            },

            /**
                         * Contains all presets
                         * @type Object
                         */
            load: {
              get() {
                return params.load
              },
            },

            /**
                         * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
                         * <code>remember</code>ing
                         * @type Boolean
                         */
            useLocalStorage: {

              get() {
                return use_local_storage
              },
              set(bool) {
                if (SUPPORTS_LOCAL_STORAGE) {
                  use_local_storage = bool
                  if (bool)
                    dom.bind(window, 'unload', saveToLocalStorage)
                  else
                    dom.unbind(window, 'unload', saveToLocalStorage)

                  localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool)
                }
              },

            },

          })

        // Are we a root level GUI?
        if (common.isUndefined(params.parent)) {
          params.closed = false

          dom.addClass(this.domElement, GUI.CLASS_MAIN)
          dom.makeSelectable(this.domElement, false)

          // Are we supposed to be loading locally?
          if (SUPPORTS_LOCAL_STORAGE) {
            if (use_local_storage) {
              _this.useLocalStorage = true

              const saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'))

              if (saved_gui)
                params.load = JSON.parse(saved_gui)
            }
          }

          this.__closeButton = document.createElement('div')
          this.__closeButton.innerHTML = GUI.TEXT_CLOSED
          dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON)
          this.domElement.appendChild(this.__closeButton)

          dom.bind(this.__closeButton, 'click', () => {
            _this.closed = !_this.closed
          })

          // Oh, you're a nested GUI!
        }
        else {
          if (params.closed === undefined)
            params.closed = true

          var title_row_name = document.createTextNode(params.name)
          dom.addClass(title_row_name, 'controller-name')

          const title_row = addRow(_this, title_row_name)

          const on_click_title = function (e) {
            e.preventDefault()
            _this.closed = !_this.closed
            return false
          }

          dom.addClass(this.__ul, GUI.CLASS_CLOSED)

          dom.addClass(title_row, 'title')
          dom.bind(title_row, 'click', on_click_title)

          if (!params.closed)
            this.closed = false
        }

        if (params.autoPlace) {
          if (common.isUndefined(params.parent)) {
            if (auto_place_virgin) {
              auto_place_container = document.createElement('div')
              dom.addClass(auto_place_container, CSS_NAMESPACE)
              dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER)
              document.body.appendChild(auto_place_container)
              auto_place_virgin = false
            }

            // Put it in the dom for you.
            auto_place_container.appendChild(this.domElement)

            // Apply the auto styles
            dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE)
          }

          // Make it not elastic.
          if (!this.parent)
            setWidth(_this, params.width)
        }

        dom.bind(window, 'resize', () => { _this.onResize() })
        dom.bind(this.__ul, 'webkitTransitionEnd', () => { _this.onResize() })
        dom.bind(this.__ul, 'transitionend', () => { _this.onResize() })
        dom.bind(this.__ul, 'oTransitionEnd', () => { _this.onResize() })
        this.onResize()

        if (params.resizable)
          addResizeHandle(this)

        function saveToLocalStorage() {
          localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()))
        }

        const root = _this.getRoot()
        function resetWidth() {
          const root = _this.getRoot()
          root.width += 1
          common.defer(() => {
            root.width -= 1
          })
        }

        if (!params.parent)
          resetWidth()
      }

      GUI.toggleHide = function () {
        hide = !hide
        common.each(hideable_guis, (gui) => {
          gui.domElement.style.zIndex = hide ? -999 : 999
          gui.domElement.style.opacity = hide ? 0 : 1
        })
      }

      GUI.CLASS_AUTO_PLACE = 'a'
      GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac'
      GUI.CLASS_MAIN = 'main'
      GUI.CLASS_CONTROLLER_ROW = 'cr'
      GUI.CLASS_TOO_TALL = 'taller-than-window'
      GUI.CLASS_CLOSED = 'closed'
      GUI.CLASS_CLOSE_BUTTON = 'close-button'
      GUI.CLASS_DRAG = 'drag'

      GUI.DEFAULT_WIDTH = 245
      GUI.TEXT_CLOSED = 'Close Controls'
      GUI.TEXT_OPEN = 'Open Controls'

      dom.bind(window, 'keydown', (e) => {
        if (document.activeElement.type !== 'text'
                    && (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE))
          GUI.toggleHide()
      }, false)

      common.extend(

        GUI.prototype,

        /** @lends dat.gui.GUI */
        {

          /**
                     * @param object
                     * @param property
                     * @returns {dat.controllers.Controller} The new controller that was added.
                     * @instance
                     */
          add(object, property) {
            return add(
              this,
              object,
              property,
              {
                factoryArgs: Array.prototype.slice.call(arguments, 2),
              },
            )
          },

          /**
                     * @param object
                     * @param property
                     * @returns {dat.controllers.ColorController} The new controller that was added.
                     * @instance
                     */
          addColor(object, property) {
            return add(
              this,
              object,
              property,
              {
                color: true,
              },
            )
          },

          /**
                     * @param controller
                     * @instance
                     */
          remove(controller) {
            // TODO listening?
            this.__ul.removeChild(controller.__li)
            this.__controllers.slice(this.__controllers.indexOf(controller), 1)
            const _this = this
            common.defer(() => {
              _this.onResize()
            })
          },

          destroy() {
            if (this.autoPlace)
              auto_place_container.removeChild(this.domElement)
          },

          /**
                     * @param name
                     * @returns {dat.gui.GUI} The new folder.
                     * @throws {Error} if this GUI already has a folder by the specified
                     * name
                     * @instance
                     */
          addFolder(name) {
            // We have to prevent collisions on names in order to have a key
            // by which to remember saved values
            if (this.__folders[name] !== undefined) {
              throw new Error('You already have a folder in this GUI by the'
                                + ` name "${name}"`)
            }

            const new_gui_params = { name, parent: this }

            // We need to pass down the autoPlace trait so that we can
            // attach event listeners to open/close folder actions to
            // ensure that a scrollbar appears if the window is too short.
            new_gui_params.autoPlace = this.autoPlace

            // Do we have saved appearance data for this folder?

            if (this.load // Anything loaded?
                            && this.load.folders // Was my parent a dead-end?
                            && this.load.folders[name]) { // Did daddy remember me?
              // Start me closed if I was closed
              new_gui_params.closed = this.load.folders[name].closed

              // Pass down the loaded data
              new_gui_params.load = this.load.folders[name]
            }

            const gui = new GUI(new_gui_params)
            this.__folders[name] = gui

            const li = addRow(this, gui.domElement)
            dom.addClass(li, 'folder')
            return gui
          },

          open() {
            this.closed = false
          },

          close() {
            this.closed = true
          },

          onResize() {
            const root = this.getRoot()

            if (root.scrollable) {
              const top = dom.getOffset(root.__ul).top
              let h = 0

              common.each(root.__ul.childNodes, (node) => {
                if (!(root.autoPlace && node === root.__save_row))
                  h += dom.getHeight(node)
              })

              if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
                dom.addClass(root.domElement, GUI.CLASS_TOO_TALL)
                root.__ul.style.height = `${window.innerHeight - top - CLOSE_BUTTON_HEIGHT}px`
              }
              else {
                dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL)
                root.__ul.style.height = 'auto'
              }
            }

            if (root.__resize_handle) {
              common.defer(() => {
                root.__resize_handle.style.height = `${root.__ul.offsetHeight}px`
              })
            }

            if (root.__closeButton)
              root.__closeButton.style.width = `${root.width}px`
          },

          /**
                     * Mark objects for saving. The order of these objects cannot change as
                     * the GUI grows. When remembering new objects, append them to the end
                     * of the list.
                     *
                     * @param {Object...} objects
                     * @throws {Error} if not called on a top level GUI.
                     * @instance
                     */
          remember() {
            if (common.isUndefined(SAVE_DIALOGUE)) {
              SAVE_DIALOGUE = new CenteredDiv()
              SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents
            }

            if (this.parent)
              throw new Error('You can only call remember on a top level GUI.')

            const _this = this

            common.each(Array.prototype.slice.call(arguments), (object) => {
              if (_this.__rememberedObjects.length == 0)
                addSaveMenu(_this)

              if (!_this.__rememberedObjects.includes(object))
                _this.__rememberedObjects.push(object)
            })

            if (this.autoPlace) {
              // Set save row width
              setWidth(this, this.width)
            }
          },

          /**
                     * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
                     * @instance
                     */
          getRoot() {
            let gui = this
            while (gui.parent)
              gui = gui.parent

            return gui
          },

          /**
                     * @returns {Object} a JSON object representing the current state of
                     * this GUI as well as its remembered properties.
                     * @instance
                     */
          getSaveObject() {
            const toReturn = this.load

            toReturn.closed = this.closed

            // Am I remembering any values?
            if (this.__rememberedObjects.length > 0) {
              toReturn.preset = this.preset

              if (!toReturn.remembered)
                toReturn.remembered = {}

              toReturn.remembered[this.preset] = getCurrentPreset(this)
            }

            toReturn.folders = {}
            common.each(this.__folders, (element, key) => {
              toReturn.folders[key] = element.getSaveObject()
            })

            return toReturn
          },

          save() {
            if (!this.load.remembered)
              this.load.remembered = {}

            this.load.remembered[this.preset] = getCurrentPreset(this)
            markPresetModified(this, false)
          },

          saveAs(presetName) {
            if (!this.load.remembered) {
              // Retain default values upon first save
              this.load.remembered = {}
              this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true)
            }

            this.load.remembered[presetName] = getCurrentPreset(this)
            this.preset = presetName
            addPresetOption(this, presetName, true)
          },

          revert(gui) {
            common.each(this.__controllers, function (controller) {
              // Make revert work on Default.
              if (!this.getRoot().load.remembered)
                controller.setValue(controller.initialValue)
              else
                recallSavedValue(gui || this.getRoot(), controller)
            }, this)

            common.each(this.__folders, (folder) => {
              folder.revert(folder)
            })

            if (!gui)
              markPresetModified(this.getRoot(), false)
          },

          listen(controller) {
            const init = this.__listening.length == 0
            this.__listening.push(controller)
            if (init)
              updateDisplays(this.__listening)
          },

        },

      )

      function add(gui, object, property, params) {
        if (object[property] === undefined)
          throw new Error(`Object ${object} has no property "${property}"`)

        let controller

        if (params.color) {
          controller = new ColorController(object, property)
        }
        else {
          const factoryArgs = [object, property].concat(params.factoryArgs)
          controller = controllerFactory.apply(gui, factoryArgs)
        }

        if (params.before instanceof Controller)
          params.before = params.before.__li

        recallSavedValue(gui, controller)

        dom.addClass(controller.domElement, 'c')

        const name = document.createElement('span')
        dom.addClass(name, 'property-name')
        name.innerHTML = controller.property

        const container = document.createElement('div')
        container.appendChild(name)
        container.appendChild(controller.domElement)

        const li = addRow(gui, container, params.before)

        dom.addClass(li, GUI.CLASS_CONTROLLER_ROW)
        dom.addClass(li, typeof controller.getValue())

        augmentController(gui, li, controller)

        gui.__controllers.push(controller)

        return controller
      }

      /**
             * Add a row to the end of the GUI or before another row.
             *
             * @param gui
             * @param [dom] If specified, inserts the dom content in the new row
             * @param [liBefore] If specified, places the new row before another row
             */
      function addRow(gui, dom, liBefore) {
        const li = document.createElement('li')
        if (dom)
          li.appendChild(dom)
        if (liBefore)
          gui.__ul.insertBefore(li, params.before)

        else
          gui.__ul.appendChild(li)

        gui.onResize()
        return li
      }

      function augmentController(gui, li, controller) {
        controller.__li = li
        controller.__gui = gui

        common.extend(controller, {

          options(options) {
            if (arguments.length > 1) {
              controller.remove()

              return add(
                gui,
                controller.object,
                controller.property,
                {
                  before: controller.__li.nextElementSibling,
                  factoryArgs: [common.toArray(arguments)],
                },
              )
            }

            if (common.isArray(options) || common.isObject(options)) {
              controller.remove()

              return add(
                gui,
                controller.object,
                controller.property,
                {
                  before: controller.__li.nextElementSibling,
                  factoryArgs: [options],
                },
              )
            }
          },

          name(v) {
            controller.__li.firstElementChild.firstElementChild.innerHTML = v
            return controller
          },

          listen() {
            controller.__gui.listen(controller)
            return controller
          },

          remove() {
            controller.__gui.remove(controller)
            return controller
          },

        })

        // All sliders should be accompanied by a box.
        if (controller instanceof NumberControllerSlider) {
          const box = new NumberControllerBox(controller.object, controller.property,
            { min: controller.__min, max: controller.__max, step: controller.__step })

          common.each(['updateDisplay', 'onChange', 'onFinishChange'], (method) => {
            const pc = controller[method]
            const pb = box[method]
            controller[method] = box[method] = function () {
              const args = Array.prototype.slice.call(arguments)
              pc.apply(controller, args)
              return pb.apply(box, args)
            }
          })

          dom.addClass(li, 'has-slider')
          controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild)
        }
        else if (controller instanceof NumberControllerBox) {
          const r = function (returned) {
            // Have we defined both boundaries?
            if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {
              // Well, then lets just replace this with a slider.
              controller.remove()
              return add(
                gui,
                controller.object,
                controller.property,
                {
                  before: controller.__li.nextElementSibling,
                  factoryArgs: [controller.__min, controller.__max, controller.__step],
                })
            }

            return returned
          }

          controller.min = common.compose(r, controller.min)
          controller.max = common.compose(r, controller.max)
        }
        else if (controller instanceof BooleanController) {
          dom.bind(li, 'click', () => {
            dom.fakeEvent(controller.__checkbox, 'click')
          })

          dom.bind(controller.__checkbox, 'click', (e) => {
            e.stopPropagation() // Prevents double-toggle
          })
        }
        else if (controller instanceof FunctionController) {
          dom.bind(li, 'click', () => {
            dom.fakeEvent(controller.__button, 'click')
          })

          dom.bind(li, 'mouseover', () => {
            dom.addClass(controller.__button, 'hover')
          })

          dom.bind(li, 'mouseout', () => {
            dom.removeClass(controller.__button, 'hover')
          })
        }
        else if (controller instanceof ColorController) {
          dom.addClass(li, 'color')
          controller.updateDisplay = common.compose((r) => {
            li.style.borderLeftColor = controller.__color.toString()
            return r
          }, controller.updateDisplay)

          controller.updateDisplay()
        }

        controller.setValue = common.compose((r) => {
          if (gui.getRoot().__preset_select && controller.isModified())
            markPresetModified(gui.getRoot(), true)

          return r
        }, controller.setValue)
      }

      function recallSavedValue(gui, controller) {
        // Find the topmost GUI, that's where remembered objects live.
        const root = gui.getRoot()

        // Does the object we're controlling match anything we've been told to
        // remember?
        const matched_index = root.__rememberedObjects.indexOf(controller.object)

        // Why yes, it does!
        if (matched_index != -1) {
          // Let me fetch a map of controllers for thcommon.isObject.
          let controller_map
                        = root.__rememberedObjectIndecesToControllers[matched_index]

          // Ohp, I believe this is the first controller we've created for this
          // object. Lets make the map fresh.
          if (controller_map === undefined) {
            controller_map = {}
            root.__rememberedObjectIndecesToControllers[matched_index]
                            = controller_map
          }

          // Keep track of this controller
          controller_map[controller.property] = controller

          // Okay, now have we saved any values for this controller?
          if (root.load && root.load.remembered) {
            const preset_map = root.load.remembered

            // Which preset are we trying to load?
            let preset

            if (preset_map[gui.preset]) {
              preset = preset_map[gui.preset]
            }
            else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {
              // Uhh, you can have the default instead?
              preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME]
            }
            else {
              // Nada.

              return
            }

            // Did the loaded object remember thcommon.isObject?
            if (preset[matched_index]

                            // Did we remember this particular property?
                            && preset[matched_index][controller.property] !== undefined) {
              // We did remember something for this guy ...
              const value = preset[matched_index][controller.property]

              // And that's what it is.
              controller.initialValue = value
              controller.setValue(value)
            }
          }
        }
      }

      function getLocalStorageHash(gui, key) {
        // TODO how does this deal with multiple GUI's?
        return `${document.location.href}.${key}`
      }

      function addSaveMenu(gui) {
        const div = gui.__save_row = document.createElement('li')

        dom.addClass(gui.domElement, 'has-save')

        gui.__ul.insertBefore(div, gui.__ul.firstChild)

        dom.addClass(div, 'save-row')

        const gears = document.createElement('span')
        gears.innerHTML = '&nbsp;'
        dom.addClass(gears, 'button gears')

        // TODO replace with FunctionController
        const button = document.createElement('span')
        button.innerHTML = 'Save'
        dom.addClass(button, 'button')
        dom.addClass(button, 'save')

        const button2 = document.createElement('span')
        button2.innerHTML = 'New'
        dom.addClass(button2, 'button')
        dom.addClass(button2, 'save-as')

        const button3 = document.createElement('span')
        button3.innerHTML = 'Revert'
        dom.addClass(button3, 'button')
        dom.addClass(button3, 'revert')

        const select = gui.__preset_select = document.createElement('select')

        if (gui.load && gui.load.remembered) {
          common.each(gui.load.remembered, (value, key) => {
            addPresetOption(gui, key, key == gui.preset)
          })
        }
        else {
          addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false)
        }

        dom.bind(select, 'change', function () {
          for (let index = 0; index < gui.__preset_select.length; index++)
            gui.__preset_select[index].innerHTML = gui.__preset_select[index].value

          gui.preset = this.value
        })

        div.appendChild(select)
        div.appendChild(gears)
        div.appendChild(button)
        div.appendChild(button2)
        div.appendChild(button3)

        if (SUPPORTS_LOCAL_STORAGE) {
          const saveLocally = document.getElementById('dg-save-locally')
          const explain = document.getElementById('dg-local-explain')

          saveLocally.style.display = 'block'

          const localStorageCheckBox = document.getElementById('dg-local-storage')

          if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true')
            localStorageCheckBox.setAttribute('checked', 'checked')

          function showHideExplain() {
            explain.style.display = gui.useLocalStorage ? 'block' : 'none'
          }

          showHideExplain()

          // TODO: Use a boolean controller, fool!
          dom.bind(localStorageCheckBox, 'change', () => {
            gui.useLocalStorage = !gui.useLocalStorage
            showHideExplain()
          })
        }

        const newConstructorTextArea = document.getElementById('dg-new-constructor')

        dom.bind(newConstructorTextArea, 'keydown', (e) => {
          if (e.metaKey && (e.which === 67 || e.keyCode == 67))
            SAVE_DIALOGUE.hide()
        })

        dom.bind(gears, 'click', () => {
          newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2)
          SAVE_DIALOGUE.show()
          newConstructorTextArea.focus()
          newConstructorTextArea.select()
        })

        dom.bind(button, 'click', () => {
          gui.save()
        })

        dom.bind(button2, 'click', () => {
          const presetName = prompt('Enter a new preset name.')
          if (presetName)
            gui.saveAs(presetName)
        })

        dom.bind(button3, 'click', () => {
          gui.revert()
        })

        //    div.appendChild(button2);
      }

      function addResizeHandle(gui) {
        gui.__resize_handle = document.createElement('div')

        common.extend(gui.__resize_handle.style, {

          width: '6px',
          marginLeft: '-3px',
          height: '200px',
          cursor: 'ew-resize',
          position: 'absolute',
          //      border: '1px solid blue'

        })

        let pmouseX

        dom.bind(gui.__resize_handle, 'mousedown', dragStart)
        dom.bind(gui.__closeButton, 'mousedown', dragStart)

        gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild)

        function dragStart(e) {
          e.preventDefault()

          pmouseX = e.clientX

          dom.addClass(gui.__closeButton, GUI.CLASS_DRAG)
          dom.bind(window, 'mousemove', drag)
          dom.bind(window, 'mouseup', dragStop)

          return false
        }

        function drag(e) {
          e.preventDefault()

          gui.width += pmouseX - e.clientX
          gui.onResize()
          pmouseX = e.clientX

          return false
        }

        function dragStop() {
          dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG)
          dom.unbind(window, 'mousemove', drag)
          dom.unbind(window, 'mouseup', dragStop)
        }
      }

      function setWidth(gui, w) {
        gui.domElement.style.width = `${w}px`
        // Auto placed save-rows are position fixed, so we have to
        // set the width manually if we want it to bleed to the edge
        if (gui.__save_row && gui.autoPlace)
          gui.__save_row.style.width = `${w}px`
        if (gui.__closeButton)
          gui.__closeButton.style.width = `${w}px`
      }

      function getCurrentPreset(gui, useInitialValues) {
        const toReturn = {}

        // For each object I'm remembering
        common.each(gui.__rememberedObjects, (val, index) => {
          const saved_values = {}

          // The controllers I've made for thcommon.isObject by property
          const controller_map
                        = gui.__rememberedObjectIndecesToControllers[index]

          // Remember each value for each property
          common.each(controller_map, (controller, property) => {
            saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue()
          })

          // Save the values for thcommon.isObject
          toReturn[index] = saved_values
        })

        return toReturn
      }

      function addPresetOption(gui, name, setSelected) {
        const opt = document.createElement('option')
        opt.innerHTML = name
        opt.value = name
        gui.__preset_select.appendChild(opt)
        if (setSelected)
          gui.__preset_select.selectedIndex = gui.__preset_select.length - 1
      }

      function setPresetSelectIndex(gui) {
        for (let index = 0; index < gui.__preset_select.length; index++) {
          if (gui.__preset_select[index].value == gui.preset)
            gui.__preset_select.selectedIndex = index
        }
      }

      function markPresetModified(gui, modified) {
        const opt = gui.__preset_select[gui.__preset_select.selectedIndex]
        //    console.log('mark', modified, opt);
        if (modified)
          opt.innerHTML = `${opt.value}*`

        else
          opt.innerHTML = opt.value
      }

      function updateDisplays(controllerArray) {
        if (controllerArray.length != 0) {
          requestAnimationFrame(() => {
            updateDisplays(controllerArray)
          })
        }

        common.each(controllerArray, (c) => {
          c.updateDisplay()
        })
      }

      return GUI
    })(dat.utils.css,
      '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>',
      '.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px \'Lucida Grande\', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n',
      dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {
        return function (object, property) {
          const initialValue = object[property]

          // Providing options?
          if (common.isArray(arguments[2]) || common.isObject(arguments[2]))
            return new OptionController(object, property, arguments[2])

          // Providing a map?

          if (common.isNumber(initialValue)) {
            if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {
              // Has min and max.
              return new NumberControllerSlider(object, property, arguments[2], arguments[3])
            }
            else {
              return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] })
            }
          }

          if (common.isString(initialValue))
            return new StringController(object, property)

          if (common.isFunction(initialValue))
            return new FunctionController(object, property, '')

          if (common.isBoolean(initialValue))
            return new BooleanController(object, property)
        }
      })(dat.controllers.OptionController,
        dat.controllers.NumberControllerBox,
        dat.controllers.NumberControllerSlider,
        dat.controllers.StringController = (function (Controller, dom, common) {
          /**
                     * @class Provides a text input to alter the string property of an object.
                     *
                     * @extends dat.controllers.Controller
                     *
                     * @param {Object} object The object to be manipulated
                     * @param {string} property The name of the property to be manipulated
                     *
                     * @member dat.controllers
                     */
          var StringController = function (object, property) {
            StringController.superclass.call(this, object, property)

            const _this = this

            this.__input = document.createElement('input')
            this.__input.setAttribute('type', 'text')

            dom.bind(this.__input, 'keyup', onChange)
            dom.bind(this.__input, 'change', onChange)
            dom.bind(this.__input, 'blur', onBlur)
            dom.bind(this.__input, 'keydown', function (e) {
              if (e.keyCode === 13)
                this.blur()
            })

            function onChange() {
              _this.setValue(_this.__input.value)
            }

            function onBlur() {
              if (_this.__onFinishChange)
                _this.__onFinishChange.call(_this, _this.getValue())
            }

            this.updateDisplay()

            this.domElement.appendChild(this.__input)
          }

          StringController.superclass = Controller

          common.extend(

            StringController.prototype,
            Controller.prototype,

            {

              updateDisplay() {
                // Stops the caret from moving on account of:
                // keyup -> setValue -> updateDisplay
                if (!dom.isActive(this.__input))
                  this.__input.value = this.getValue()

                return StringController.superclass.prototype.updateDisplay.call(this)
              },

            },

          )

          return StringController
        })(dat.controllers.Controller,
          dat.dom.dom,
          dat.utils.common),
        dat.controllers.FunctionController,
        dat.controllers.BooleanController,
        dat.utils.common),
      dat.controllers.Controller,
      dat.controllers.BooleanController,
      dat.controllers.FunctionController,
      dat.controllers.NumberControllerBox,
      dat.controllers.NumberControllerSlider,
      dat.controllers.OptionController,
      dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {
        var ColorController = function (object, property) {
          ColorController.superclass.call(this, object, property)

          this.__color = new Color(this.getValue())
          this.__temp = new Color(0)

          const _this = this

          this.domElement = document.createElement('div')

          dom.makeSelectable(this.domElement, false)

          this.__selector = document.createElement('div')
          this.__selector.className = 'selector'

          this.__saturation_field = document.createElement('div')
          this.__saturation_field.className = 'saturation-field'

          this.__field_knob = document.createElement('div')
          this.__field_knob.className = 'field-knob'
          this.__field_knob_border = '2px solid '

          this.__hue_knob = document.createElement('div')
          this.__hue_knob.className = 'hue-knob'

          this.__hue_field = document.createElement('div')
          this.__hue_field.className = 'hue-field'

          this.__input = document.createElement('input')
          this.__input.type = 'text'
          this.__input_textShadow = '0 1px 1px '

          dom.bind(this.__input, 'keydown', function (e) {
            if (e.keyCode === 13) { // on enter
              onBlur.call(this)
            }
          })

          dom.bind(this.__input, 'blur', onBlur)

          dom.bind(this.__selector, 'mousedown', function (e) {
            dom
              .addClass(this, 'drag')
              .bind(window, 'mouseup', (e) => {
                dom.removeClass(_this.__selector, 'drag')
              })
          })

          const value_field = document.createElement('div')

          common.extend(this.__selector.style, {
            width: '122px',
            height: '102px',
            padding: '3px',
            backgroundColor: '#222',
            boxShadow: '0px 1px 3px rgba(0,0,0,0.3)',
          })

          common.extend(this.__field_knob.style, {
            position: 'absolute',
            width: '12px',
            height: '12px',
            border: this.__field_knob_border + (this.__color.v < 0.5 ? '#fff' : '#000'),
            boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
            borderRadius: '12px',
            zIndex: 1,
          })

          common.extend(this.__hue_knob.style, {
            position: 'absolute',
            width: '15px',
            height: '2px',
            borderRight: '4px solid #fff',
            zIndex: 1,
          })

          common.extend(this.__saturation_field.style, {
            width: '100px',
            height: '100px',
            border: '1px solid #555',
            marginRight: '3px',
            display: 'inline-block',
            cursor: 'pointer',
          })

          common.extend(value_field.style, {
            width: '100%',
            height: '100%',
            background: 'none',
          })

          linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000')

          common.extend(this.__hue_field.style, {
            width: '15px',
            height: '100px',
            display: 'inline-block',
            border: '1px solid #555',
            cursor: 'ns-resize',
          })

          hueGradient(this.__hue_field)

          common.extend(this.__input.style, {
            outline: 'none',
            //      width: '120px',
            textAlign: 'center',
            //      padding: '4px',
            //      marginBottom: '6px',
            color: '#fff',
            border: 0,
            fontWeight: 'bold',
            textShadow: `${this.__input_textShadow}rgba(0,0,0,0.7)`,
          })

          dom.bind(this.__saturation_field, 'mousedown', fieldDown)
          dom.bind(this.__field_knob, 'mousedown', fieldDown)

          dom.bind(this.__hue_field, 'mousedown', (e) => {
            setH(e)
            dom.bind(window, 'mousemove', setH)
            dom.bind(window, 'mouseup', unbindH)
          })

          function fieldDown(e) {
            setSV(e)
            // document.body.style.cursor = 'none';
            dom.bind(window, 'mousemove', setSV)
            dom.bind(window, 'mouseup', unbindSV)
          }

          function unbindSV() {
            dom.unbind(window, 'mousemove', setSV)
            dom.unbind(window, 'mouseup', unbindSV)
            // document.body.style.cursor = 'default';
          }

          function onBlur() {
            const i = interpret(this.value)
            if (i !== false) {
              _this.__color.__state = i
              _this.setValue(_this.__color.toOriginal())
            }
            else {
              this.value = _this.__color.toString()
            }
          }

          function unbindH() {
            dom.unbind(window, 'mousemove', setH)
            dom.unbind(window, 'mouseup', unbindH)
          }

          this.__saturation_field.appendChild(value_field)
          this.__selector.appendChild(this.__field_knob)
          this.__selector.appendChild(this.__saturation_field)
          this.__selector.appendChild(this.__hue_field)
          this.__hue_field.appendChild(this.__hue_knob)

          this.domElement.appendChild(this.__input)
          this.domElement.appendChild(this.__selector)

          this.updateDisplay()

          function setSV(e) {
            e.preventDefault()

            const w = dom.getWidth(_this.__saturation_field)
            const o = dom.getOffset(_this.__saturation_field)
            let s = (e.clientX - o.left + document.body.scrollLeft) / w
            let v = 1 - (e.clientY - o.top + document.body.scrollTop) / w

            if (v > 1)
              v = 1
            else if (v < 0)
              v = 0

            if (s > 1)
              s = 1
            else if (s < 0)
              s = 0

            _this.__color.v = v
            _this.__color.s = s

            _this.setValue(_this.__color.toOriginal())

            return false
          }

          function setH(e) {
            e.preventDefault()

            const s = dom.getHeight(_this.__hue_field)
            const o = dom.getOffset(_this.__hue_field)
            let h = 1 - (e.clientY - o.top + document.body.scrollTop) / s

            if (h > 1)
              h = 1
            else if (h < 0)
              h = 0

            _this.__color.h = h * 360

            _this.setValue(_this.__color.toOriginal())

            return false
          }
        }

        ColorController.superclass = Controller

        common.extend(

          ColorController.prototype,
          Controller.prototype,

          {

            updateDisplay() {
              const i = interpret(this.getValue())

              if (i !== false) {
                let mismatch = false

                // Check for mismatch on the interpreted value.

                common.each(Color.COMPONENTS, function (component) {
                  if (!common.isUndefined(i[component])
                                        && !common.isUndefined(this.__color.__state[component])
                                        && i[component] !== this.__color.__state[component]) {
                    mismatch = true
                    return {} // break
                  }
                }, this)

                // If nothing diverges, we keep our previous values
                // for statefulness, otherwise we recalculate fresh
                if (mismatch)
                  common.extend(this.__color.__state, i)
              }

              common.extend(this.__temp.__state, this.__color.__state)

              this.__temp.a = 1

              const flip = (this.__color.v < 0.5 || this.__color.s > 0.5) ? 255 : 0
              const _flip = 255 - flip

              common.extend(this.__field_knob.style, {
                marginLeft: `${100 * this.__color.s - 7}px`,
                marginTop: `${100 * (1 - this.__color.v) - 7}px`,
                backgroundColor: this.__temp.toString(),
                border: `${this.__field_knob_border}rgb(${flip},${flip},${flip})`,
              })

              this.__hue_knob.style.marginTop = `${(1 - this.__color.h / 360) * 100}px`

              this.__temp.s = 1
              this.__temp.v = 1

              linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString())

              common.extend(this.__input.style, {
                backgroundColor: this.__input.value = this.__color.toString(),
                color: `rgb(${flip},${flip},${flip})`,
                textShadow: `${this.__input_textShadow}rgba(${_flip},${_flip},${_flip},.7)`,
              })
            },

          },

        )

        const vendors = ['-moz-', '-o-', '-webkit-', '-ms-', '']

        function linearGradient(elem, x, a, b) {
          elem.style.background = ''
          common.each(vendors, (vendor) => {
            elem.style.cssText += `background: ${vendor}linear-gradient(${x}, ${a} 0%, ${b} 100%); `
          })
        }

        function hueGradient(elem) {
          elem.style.background = ''
          elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
          elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
          elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
          elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
          elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
        }

        return ColorController
      })(dat.controllers.Controller,
        dat.dom.dom,
        dat.color.Color = (function (interpret, math, toString, common) {
          const Color = function () {
            this.__state = interpret.apply(this, arguments)

            if (this.__state === false)
              throw 'Failed to interpret color arguments'

            this.__state.a = this.__state.a || 1
          }

          Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a']

          common.extend(Color.prototype, {

            toString() {
              return toString(this)
            },

            toOriginal() {
              return this.__state.conversion.write(this)
            },

          })

          defineRGBComponent(Color.prototype, 'r', 2)
          defineRGBComponent(Color.prototype, 'g', 1)
          defineRGBComponent(Color.prototype, 'b', 0)

          defineHSVComponent(Color.prototype, 'h')
          defineHSVComponent(Color.prototype, 's')
          defineHSVComponent(Color.prototype, 'v')

          Object.defineProperty(Color.prototype, 'a', {

            get() {
              return this.__state.a
            },

            set(v) {
              this.__state.a = v
            },

          })

          Object.defineProperty(Color.prototype, 'hex', {

            get() {
              if (!this.__state.space !== 'HEX')
                this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b)

              return this.__state.hex
            },

            set(v) {
              this.__state.space = 'HEX'
              this.__state.hex = v
            },

          })

          function defineRGBComponent(target, component, componentHexIndex) {
            Object.defineProperty(target, component, {

              get() {
                if (this.__state.space === 'RGB')
                  return this.__state[component]

                recalculateRGB(this, component, componentHexIndex)

                return this.__state[component]
              },

              set(v) {
                if (this.__state.space !== 'RGB') {
                  recalculateRGB(this, component, componentHexIndex)
                  this.__state.space = 'RGB'
                }

                this.__state[component] = v
              },

            })
          }

          function defineHSVComponent(target, component) {
            Object.defineProperty(target, component, {

              get() {
                if (this.__state.space === 'HSV')
                  return this.__state[component]

                recalculateHSV(this)

                return this.__state[component]
              },

              set(v) {
                if (this.__state.space !== 'HSV') {
                  recalculateHSV(this)
                  this.__state.space = 'HSV'
                }

                this.__state[component] = v
              },

            })
          }

          function recalculateRGB(color, component, componentHexIndex) {
            if (color.__state.space === 'HEX')

              color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex)

            else if (color.__state.space === 'HSV')

              common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v))

            else

              throw 'Corrupted color state'
          }

          function recalculateHSV(color) {
            const result = math.rgb_to_hsv(color.r, color.g, color.b)

            common.extend(color.__state,
              {
                s: result.s,
                v: result.v,
              },
            )

            if (!common.isNaN(result.h))
              color.__state.h = result.h

            else if (common.isUndefined(color.__state.h))
              color.__state.h = 0
          }

          return Color
        })(dat.color.interpret,
          dat.color.math = (function () {
            let tmpComponent

            return {

              hsv_to_rgb(h, s, v) {
                const hi = Math.floor(h / 60) % 6

                const f = h / 60 - Math.floor(h / 60)
                const p = v * (1.0 - s)
                const q = v * (1.0 - (f * s))
                const t = v * (1.0 - ((1.0 - f) * s))
                const c = [
                  [v, t, p],
                  [q, v, p],
                  [p, v, t],
                  [p, q, v],
                  [t, p, v],
                  [v, p, q],
                ][hi]

                return {
                  r: c[0] * 255,
                  g: c[1] * 255,
                  b: c[2] * 255,
                }
              },

              rgb_to_hsv(r, g, b) {
                const min = Math.min(r, g, b)
                const max = Math.max(r, g, b)
                const delta = max - min
                let h; let s

                if (max != 0) {
                  s = delta / max
                }
                else {
                  return {
                    h: NaN,
                    s: 0,
                    v: 0,
                  }
                }

                if (r == max)
                  h = (g - b) / delta
                else if (g == max)
                  h = 2 + (b - r) / delta
                else
                  h = 4 + (r - g) / delta

                h /= 6
                if (h < 0)
                  h += 1

                return {
                  h: h * 360,
                  s,
                  v: max / 255,
                }
              },

              rgb_to_hex(r, g, b) {
                let hex = this.hex_with_component(0, 2, r)
                hex = this.hex_with_component(hex, 1, g)
                hex = this.hex_with_component(hex, 0, b)
                return hex
              },

              component_from_hex(hex, componentIndex) {
                return (hex >> (componentIndex * 8)) & 0xFF
              },

              hex_with_component(hex, componentIndex, value) {
                return value << (tmpComponent = componentIndex * 8) | (hex & ~(0xFF << tmpComponent))
              },

            }
          })(),
          dat.color.toString,
          dat.utils.common),
        dat.color.interpret,
        dat.utils.common),
      dat.utils.requestAnimationFrame = (function () {
        /**
                 * requirejs version of Paul Irish's RequestAnimationFrame
                 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
                 */

        return window.webkitRequestAnimationFrame
                    || window.mozRequestAnimationFrame
                    || window.oRequestAnimationFrame
                    || window.msRequestAnimationFrame
                    || function (callback, element) {
                      window.setTimeout(callback, 1000 / 60)
                    }
      })(),
      dat.dom.CenteredDiv = (function (dom, common) {
        const CenteredDiv = function () {
          this.backgroundElement = document.createElement('div')
          common.extend(this.backgroundElement.style, {
            backgroundColor: 'rgba(0,0,0,0.8)',
            top: 0,
            left: 0,
            display: 'none',
            zIndex: '1000',
            opacity: 0,
            WebkitTransition: 'opacity 0.2s linear',
          })

          dom.makeFullscreen(this.backgroundElement)
          this.backgroundElement.style.position = 'fixed'

          this.domElement = document.createElement('div')
          common.extend(this.domElement.style, {
            position: 'fixed',
            display: 'none',
            zIndex: '1001',
            opacity: 0,
            WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
          })

          document.body.appendChild(this.backgroundElement)
          document.body.appendChild(this.domElement)

          const _this = this
          dom.bind(this.backgroundElement, 'click', () => {
            _this.hide()
          })
        }

        CenteredDiv.prototype.show = function () {
          const _this = this

          this.backgroundElement.style.display = 'block'

          this.domElement.style.display = 'block'
          this.domElement.style.opacity = 0
          //    this.domElement.style.top = '52%';
          this.domElement.style.webkitTransform = 'scale(1.1)'

          this.layout()

          common.defer(() => {
            _this.backgroundElement.style.opacity = 1
            _this.domElement.style.opacity = 1
            _this.domElement.style.webkitTransform = 'scale(1)'
          })
        }

        CenteredDiv.prototype.hide = function () {
          const _this = this

          var hide = function () {
            _this.domElement.style.display = 'none'
            _this.backgroundElement.style.display = 'none'

            dom.unbind(_this.domElement, 'webkitTransitionEnd', hide)
            dom.unbind(_this.domElement, 'transitionend', hide)
            dom.unbind(_this.domElement, 'oTransitionEnd', hide)
          }

          dom.bind(this.domElement, 'webkitTransitionEnd', hide)
          dom.bind(this.domElement, 'transitionend', hide)
          dom.bind(this.domElement, 'oTransitionEnd', hide)

          this.backgroundElement.style.opacity = 0
          //    this.domElement.style.top = '48%';
          this.domElement.style.opacity = 0
          this.domElement.style.webkitTransform = 'scale(1.1)'
        }

        CenteredDiv.prototype.layout = function () {
          this.domElement.style.left = `${window.innerWidth / 2 - dom.getWidth(this.domElement) / 2}px`
          this.domElement.style.top = `${window.innerHeight / 2 - dom.getHeight(this.domElement) / 2}px`
        }

        function lockScroll(e) {
          console.log(e)
        }

        return CenteredDiv
      })(dat.dom.dom,
        dat.utils.common),
      dat.dom.dom,
      dat.utils.common)
  }, {}],
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

    function style(element, property, value) {
      let camel = cache[property]
      if (typeof camel === 'undefined')
        camel = detect(property)

      // may be false if CSS prop is unsupported
      if (camel) {
        if (value === undefined)
          return element.style[camel]

        if (typeof value === 'number')
          value = value + (suffixMap[camel] || '')
        element.style[camel] = value
      }
    }

    function each(element, properties) {
      for (const k in properties) {
        if (properties.hasOwnProperty(k))
          style(element, k, properties[k])
      }
    }

    function detect(cssProp) {
      const camel = toCamelCase(cssProp)
      const result = prefix(camel)
      cache[camel] = cache[cssProp] = cache[result] = result
      return result
    }

    function set() {
      if (arguments.length === 2)
        each(arguments[0], arguments[1])

      else
        style(arguments[0], arguments[1], arguments[2])
    }

    module.exports = set
    module.exports.set = set

    module.exports.get = function (element, properties) {
      if (Array.isArray(properties)) {
        return properties.reduce((obj, prop) => {
          obj[prop] = style(element, prop || '')
          return obj
        }, {})
      }
      else { return style(element, properties || '') }
    }
  }, { 11: 11, 6: 6 }],
  5: [function (require, module, exports) {
    (function (process) {
      // Generated by CoffeeScript 1.6.3
      (function () {
        let getNanoSeconds, hrtime, loadTime

        if ((typeof performance !== 'undefined' && performance !== null) && performance.now) {
          module.exports = function () {
            return performance.now()
          }
        }
        else if ((typeof process !== 'undefined' && process !== null) && process.hrtime) {
          module.exports = function () {
            return (getNanoSeconds() - loadTime) / 1e6
          }
          hrtime = process.hrtime
          getNanoSeconds = function () {
            let hr
            hr = hrtime()
            return hr[0] * 1e9 + hr[1]
          }
          loadTime = getNanoSeconds()
        }
        else if (Date.now) {
          module.exports = function () {
            return Date.now() - loadTime
          }
          loadTime = Date.now()
        }
        else {
          module.exports = function () {
            return new Date().getTime() - loadTime
          }
          loadTime = new Date().getTime()
        }
      }).call(this)

      /*

            */
    }).call(this, require(7))
  }, { 7: 7 }],
  6: [function (require, module, exports) {
    let elem = null

    // https://gist.github.com/paulirish/523692
    module.exports = function prefix(prop) {
      const prefixes = ['Moz', 'Khtml', 'Webkit', 'O', 'ms']
      const upper = prop.charAt(0).toUpperCase() + prop.slice(1)

      if (!elem)
        elem = document.createElement('div')

      if (prop in elem.style)
        return prop

      for (let len = prefixes.length; len--;) {
        if ((prefixes[len] + upper) in elem.style)
          return (prefixes[len] + upper)
      }
      return false
    }
  }, {}],
  7: [function (require, module, exports) {
    // shim for using process in browser

    const process = module.exports = {}
    let queue = []
    let draining = false
    let currentQueue
    let queueIndex = -1

    function cleanUpNextTick() {
      draining = false
      if (currentQueue.length)
        queue = currentQueue.concat(queue)

      else
        queueIndex = -1

      if (queue.length)
        drainQueue()
    }

    function drainQueue() {
      if (draining)
        return

      const timeout = setTimeout(cleanUpNextTick)
      draining = true

      let len = queue.length
      while (len) {
        currentQueue = queue
        queue = []
        while (++queueIndex < len) {
          if (currentQueue)
            currentQueue[queueIndex].run()
        }
        queueIndex = -1
        len = queue.length
      }
      currentQueue = null
      draining = false
      clearTimeout(timeout)
    }

    process.nextTick = function (fun) {
      const args = new Array(arguments.length - 1)
      if (arguments.length > 1) {
        for (let i = 1; i < arguments.length; i++)
          args[i - 1] = arguments[i]
      }
      queue.push(new Item(fun, args))
      if (queue.length === 1 && !draining)
        setTimeout(drainQueue, 0)
    }

    // v8 likes predictible objects
    function Item(fun, array) {
      this.fun = fun
      this.array = array
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array)
    }
    process.title = 'browser'
    process.browser = true
    process.env = {}
    process.argv = []
    process.version = '' // empty string to avoid regexp issues
    process.versions = {}

    function noop() { }

    process.on = noop
    process.addListener = noop
    process.once = noop
    process.off = noop
    process.removeListener = noop
    process.removeAllListeners = noop
    process.emit = noop

    process.binding = function (name) {
      throw new Error('process.binding is not supported')
    }

    process.cwd = function () { return '/' }
    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported')
    }
    process.umask = function () { return 0 }
  }, {}],
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
    const THREE = require(10)

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

    const THREE = require(10)

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
  }, {}],
}, {}, [22])
</script>

<template />
