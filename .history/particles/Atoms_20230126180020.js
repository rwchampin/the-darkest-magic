function _classCallCheck(t, i) {
    const _createClass = function () {
        function t(t, i) {
            for (let e = 0; e < i.length; e++) {
                const n = i[e]; n.enumerable = n.enumerable || !1,
                    n.configurable = !0, 'value' in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
            }
        }

        return function (i, e, n) {
            return e && t(i.prototype, e),
                n && t(i, n), i
        }
    };

    const Vector2 =  function () {
            function t(i, e) {
                return _classCallCheck(this, t),
                    this.x = typeof i == 'number' ? i : 0,
                    this.y = typeof e == 'number' ? e : 0,
                    this
            }

            return _createClass(t, [
                {
                    key: 'zero',

                    value() {
                        return this.x = 0, this.y = 0, this
                    }
                },
                {
                    key: 'clone',

                    value() {
                        return new t(this.x, this.y)
                    }
                }, {

                    key: 'add',

                    value(t) {
                        return this.x += t.x || 0,
                            this.y += t.y || 0, this
                    }
                }, {

                    key: 'addX',

                    value(t) {
                        return this.x += t.x || 0, this
                    }
                }, {

                    key: 'addY',

                    value(t) {
                        return this.y += t.y || 0, this
                    }
                }, {

                    key: 'addScalar',

                    value(t) {
                        return this.x += t || 0,
                            this.y += t || 0, this
                    }
                }, {

                    key: 'addScalarX',

                    value(t) {
                        return this.x += t || 0, this
                    }
                }, {

                    key: 'addScalarY',

                    value(t) {
                        return this.y += t || 0, this
                    }
                }, {

                    key: 'sub',

                    value(t) {
                        return this.x -= t.x || 0, this.y -= t.y || 0, this
                    }
                }, {

                    key: 'subX',

                    value(t) {
                        return this.x -= t.x || 0, this
                    }
                }, {

                    key: 'subY',

                    value(t) {
                        return this.y -= t.y || 0, this
                    }
                }, {

                    key: 'subScalar',

                    value(t) {
                        return this.x -= t || 0, this.y -= t || 0, this
                    }
                }, {

                    key: 'subX',

                    value(t) {
                        return this.x -= t || 0, this
                    }
                }, {

                    key: 'subY',

                    value(t) {
                        return this.y -= t || 0, this
                    }
                }, {

                    key: 'multiply',

                    value(t) {
                        return this.x *= t.x || 1, this.y *= t.y || 1, this
                    }
                }, {

                    key: 'multiplyX',

                    value(t) {
                        return this.x *= t.x || 1, this
                    }
                }, {

                    key: 'multiplyY',

                    value(t) {
                        return this.y *= t.y || 1, this
                    }
                }, {

                    key: 'multiplyScalar',

                    value(t) {
                        return this.x *= t || 1, this.y *= t || 1, this
                    }
                }, {

                    key: 'multiplyScalarX',

                    value(t) {
                        return this.x *= t || 1, this
                    }
                }, {

                    key: 'multiplyScalarY',

                    value(t) {
                        return this.y *= t || 1, this
                    }
                }, {

                    key: 'divide',

                    value(t) {
                        return t.x === 0 || t.y === 0 ? void console.log('! Cannot divide by zero !') : (this.x /= t.x || 1, this.y /= t.y || 1, this)
                    }
                }, {

                    key: 'divideX',

                    value(t) {
                        return t.x === 0 ? void console.log('! Cannot divide by zero !') : (this.x /= t.x || 1, this)
                    }
                }, {

                    key: 'divideY',

                    value(t) {
                        return t.y === 0 ? void console.log('! Cannot divide by zero !') : (this.y /= t.y || 1, this)
                    }
                }, {

                    key: 'divideScalar',

                    value(t) {
                        return t === 0 ? void console.log('! Cannot divide by zero !') : (this.x /= t || 1, this.y /= t || 1, this)
                    }
                }, {

                    key: 'divideScalarX',

                    value(t) {
                        return t === 0 ? void console.log('! Cannot divide by zero !') : (this.x /= t || 1, this)
                    }
                }, {

                    key: 'divideScalarY',

                    value(t) {
                        return t === 0 ? void console.log('! Cannot divide by zero !') : (this.Y /= t || 1, this)
                    }
                }, {

                    key: 'getMagnitude',
                    value() { return Math.sqrt(this.x ** 2 + this.y ** 2) }
                }, {

                    key: 'normalize',
                    value() { this.divideScalar(this.getMagnitude()) }
                }, {

                    key: 'randomize', value(i) { return i = i || new t(1, 1), this.x = Math.random() * i.x, this.y = Math.random() * i.y, this }
                }, {

                    key: 'addRandom',
                    value(t) { t = t || 0, this.x += t - Math.random() * (2 * t), this.y += t - Math.random() * (2 * t) }
                }, {
                    key: 'addRandomX',
                    value(t) { t = t || 0, this.x += t - Math.random() * (2 * t) }
                }, {
                    key: 'addRandomY',
                    value(t) { t = t || 0, this.y += t - Math.random() * (2 * t) }
                }, {
                    key: 'lerp', value(t, i) { return t = t || this, i = i || 0.05, this.x = (1 - i) * this.x + i * t.x, this.y = (1 - i) * this.y + i * t.y, this }
                }, {
                    key: 'midpoint', value(i) { const e = new t(this.x + i.x, this.y + i.y); return e.divideScalar(2), e }
                }, {
                    key: 'slope',
                    value(t) { return (t.y - this.y) / (t.x - this.x) * -1 }
                }, {
                    key: 'intercept',
                    value(t) { return console.log(-t * this.x + this.y), -t * this.x + this.y }
                }, {
                    key: 'distanceTo',
                    value(t) { return t = t || this, Math.sqrt((t.x - this.x) ** 2 + (t.y - this.y) ** 2) }
                }, {

                    key: 'angleTo', value(t, i) { return t = t || this, (i = i || 'rad') === 'rad' ? Math.atan2(t.y - this.y, t.x - this.x) : i === 'deg' ? 180 * Math.atan2(t.y - this.y, t.x - this.x) / Math.PI : void 0 }
                }]), t
        }

// export class Atoms {
//   constructor() {
//     this.PI = Math.PI
//     this.TAU = this.PI * 2
//     this.HALF_PI = this.PI * 0.5
//     this.RAND = Math.random
//     this.ROUND = Math.round
//     this.SIN = Math.sin
//     this.COS = Math.cos
//     this.ABS = Math.abs
//     this.POW = Math.pow
//     this.lib = {
//       v2: Vector2,
//       noise,
//       stats: Stats,
//     }
//   }
// }
