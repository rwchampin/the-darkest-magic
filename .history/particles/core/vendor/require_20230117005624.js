/*
 RequireJS 2.1.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
/* Globaal define, require, requirejs */
let requirejs, require, define;
(function (U) {
  function D(b) { return M.call(b) === '[object Function]' } function E(b) { return M.call(b) === '[object Array]' } function s(b, c) {
    if (b) {
      let d; for (d = 0; d < b.length; d += 1) {
        if (b[d] && c(b[d], d, b))
          break
      }
    }
  } function N(b, c) {
    if (b) {
      let d; for (d = b.length - 1; d > -1; d -= 1) {
        if (b[d] && c(b[d], d, b))
          break
      }
    }
  } function F(b, c) {
    for (const d in b) {
      if (b.hasOwnProperty(d) && c(b[d], d))
        break
    }
  } function J(b, c, d, h) {
    c && F(c, (c, j) => {
      if (d || !G.call(b, j))
        h && typeof c !== 'string' ? (b[j] || (b[j] = {}), J(b[j], c, d, h)) : b[j] = c
    }); return b
  } function q(b, c) {
    return function () {
      return c.apply(b,
        arguments)
    }
  } function V(b) {
    if (!b)
      return b; let c = U; s(b.split('.'), (b) => { c = c[b] }); return c
  } function H(b, c, d, h) {
    c = Error(`${c}\nhttp://requirejs.org/docs/errors.html#${b}`); c.requireType = b; c.requireModules = h; if (d)
      c.originalError = d; return c
  } function aa() {
    if (I && I.readyState === 'interactive')
      return I; N(document.getElementsByTagName('script'), (b) => {
      if (b.readyState === 'interactive')
        return I = b
    }); return I
  } let h; let r; let u; let y; let p; let A; let I; let B; let W; let X; const ba = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg; const ca = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g
  const Y = /\.js$/; const da = /^\.\//; r = Object.prototype; var M = r.toString; var G = r.hasOwnProperty; const ea = Array.prototype.splice; const v = !!(typeof window !== 'undefined' && navigator && document); const Z = !v && typeof importScripts !== 'undefined'; const fa = v && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/; const Q = typeof opera !== 'undefined' && opera.toString() === '[object Opera]'; const w = {}; let n = {}; let O = []; let K = !1; if (typeof define === 'undefined') {
    if (typeof requirejs !== 'undefined') {
      if (D(requirejs))
        return; n = requirejs; requirejs = void 0
    } typeof require !== 'undefined'
&& !D(require) && (n = require, require = void 0); h = requirejs = function (b, c, d, t) {
      let g; let j = '_'; !E(b) && typeof b !== 'string' && (g = b, E(c) ? (b = c, c = d, d = t) : b = []); if (g && g.context)
        j = g.context; (t = w[j]) || (t = w[j] = h.s.newContext(j)); g && t.configure(g); return t.require(b, c, d)
    }; h.config = function (b) { return h(b) }; h.nextTick = typeof setTimeout !== 'undefined' ? function (b) { setTimeout(b, 4) } : function (b) { b() }; require || (require = h); h.version = '2.1.0'; h.jsExtRegExp = /^\/|:|\?|\.js$/; h.isBrowser = v; r = h.s = {
      contexts: w,
      newContext(b) {
        function c(a,
          f, x) {
          let e; let b; let k; let c; let d; let i; let g; let h = f && f.split('/'); e = h; const j = m.map; const l = j && j['*']; if (a && a.charAt(0) === '.') {
            if (f) {
              e = m.pkgs[f] ? h = [f] : h.slice(0, h.length - 1); f = a = e.concat(a.split('/')); for (e = 0; f[e]; e += 1) {
                if (b = f[e], b === '.') { f.splice(e, 1), e -= 1 }
                else if (b === '..') {
                  if (e === 1 && (f[2] === '..' || f[0] === '..'))
                    break; else e > 0 && (f.splice(e - 1, 2), e -= 2)
                }
              } e = m.pkgs[f = a[0]]; a = a.join('/'); e && a === `${f}/${e.main}` && (a = f)
            }
            else { a.indexOf('./') === 0 && (a = a.substring(2)) }
          } if (x && (h || l) && j) {
            f = a.split('/'); for (e = f.length; e > 0; e -= 1) {
              k = f.slice(0, e).join('/'); if (h) {
                for (b
= h.length; b > 0; b -= 1) {
                  if (x = j[h.slice(0, b).join('/')])
                    if (x = x[k]) { c = x; d = e; break }
                }
              } if (c)
                break; !i && l && l[k] && (i = l[k], g = e)
            }!c && i && (c = i, d = g); c && (f.splice(0, d, c), a = f.join('/'))
          } return a
        } function d(a) {
          v && s(document.getElementsByTagName('script'), (f) => {
            if (f.getAttribute('data-requiremodule') === a && f.getAttribute('data-requirecontext') === i.contextName)
              return f.parentNode.removeChild(f), !0
          })
        } function t(a) {
          const f = m.paths[a]; if (f && E(f) && f.length > 1)
            return d(a), f.shift(), i.require.undef(a), i.require([a]), !0
        } function g(a) {
          let f
          const b = a ? a.indexOf('!') : -1; b > -1 && (f = a.substring(0, b), a = a.substring(b + 1, a.length)); return [f, a]
        } function j(a, f, b, e) { let $; let k; let d = null; const h = f ? f.name : null; const j = a; let m = !0; let l = ''; a || (m = !1, a = `_@r${M += 1}`); a = g(a); d = a[0]; a = a[1]; d && (d = c(d, h, e), k = o[d]); a && (d ? l = k && k.normalize ? k.normalize(a, (a) => { return c(a, h, e) }) : c(a, h, e) : (l = c(a, h, e), a = g(l), d = a[0], l = a[1], b = !0, $ = i.nameToUrl(l))); b = d && !k && !b ? `_unnormalized${N += 1}` : ''; return { prefix: d, name: l, parentMap: f, unnormalized: !!b, url: $, originalName: j, isDefine: m, id: (d ? `${d}!${l}` : l) + b } } function n(a) {
          const f
= a.id; let b = l[f]; b || (b = l[f] = new i.Module(a)); return b
        } function p(a, f, b) {
          const e = a.id; const c = l[e]; if (G.call(o, e) && (!c || c.defineEmitComplete))
            f === 'defined' && b(o[e]); else n(a).on(f, b)
        } function z(a, f) {
          const b = a.requireModules; let e = !1; if (f)
            f(a); else if (s(b, (f) => {
            if (f = l[f])
              f.error = a, f.events.error && (e = !0, f.emit('error', a))
          }), !e)
            h.onError(a)
        } function r() { O.length && (ea.apply(C, [C.length - 1, 0].concat(O)), O = []) } function u(a, f, b) {
          const e = a.map.id; a.error
            ? a.emit('error', a.error)
            : (f[e] = !0, s(a.depMaps, (e, k) => {
                const c = e.id
                const d = l[c]; d && !a.depMatched[k] && !b[c] && (f[c] ? (a.defineDep(k, o[c]), a.check()) : u(d, f, b))
              }), b[e] = !0)
        } function w() {
          let a; let f; let b; let e; const c = (b = m.waitSeconds * 1e3) && i.startTime + b < (new Date()).getTime(); const k = []; const h = []; let g = !1; let j = !0; if (!B) {
            B = !0; F(l, (b) => {
              a = b.map; f = a.id; if (b.enabled && (a.isDefine || h.push(b), !b.error)) {
                if (!b.inited && c)
                  t(f) ? g = e = !0 : (k.push(f), d(f)); else if (!b.inited && b.fetched && a.isDefine && (g = !0, !a.prefix))
                  return j = !1
              }
            }); if (c && k.length) {
              return b = H('timeout', `Load timeout for modules: ${k}`, null, k), b.contextName = i.contextName,
              z(b)
            } j && s(h, (a) => { u(a, {}, {}) }); if ((!c || e) && g) {
              if ((v || Z) && !R)
                R = setTimeout(() => { R = 0; w() }, 50)
            } B = !1
          }
        } function y(a) { n(j(a[0], null, !0)).init(a[1], a[2]) } function A(a) { var a = a.currentTarget || a.srcElement; let b = i.onScriptLoad; a.detachEvent && !Q ? a.detachEvent('onreadystatechange', b) : a.removeEventListener('load', b, !1); b = i.onScriptError; a.detachEvent && !Q || a.removeEventListener('error', b, !1); return { node: a, id: a && a.getAttribute('data-requiremodule') } } let B; let S; let i; let L; let R; var m = {
          waitSeconds: 7,
          baseUrl: './',
          paths: {},
          pkgs: {},
          shim: {},
        }; var l = {}; const T = {}; var C = []; var o = {}; const P = {}; var M = 1; var N = 1; L = {
          require(a) { return a.require ? a.require : a.require = i.makeRequire(a.map) },
          exports(a) {
            a.usingExports = !0; if (a.map.isDefine)
              return a.exports ? a.exports : a.exports = o[a.map.id] = {}
          },
          module(a) { return a.module ? a.module : a.module = { id: a.map.id, uri: a.map.url, config() { return m.config && m.config[a.map.id] || {} }, exports: o[a.map.id] } },
        }; S = function (a) {
          this.events = T[a.id] || {}; this.map = a; this.shim = m.shim[a.id]; this.depExports = []; this.depMaps = []
          this.depMatched = []; this.pluginMaps = {}; this.depCount = 0
        }; S.prototype = {
          init(a, b, c, e) {
            e = e || {}; if (!this.inited) {
              this.factory = b; if (c)
                this.on('error', c); else this.events.error && (c = q(this, function (a) { this.emit('error', a) })); this.depMaps = a && a.slice(0); this.errback = c; this.inited = !0; this.ignore = e.ignore; e.enabled || this.enabled ? this.enable() : this.check()
            }
          },
          defineDep(a, b) { this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b) },
          fetch() {
            if (!this.fetched) {
              this.fetched
= !0; i.startTime = (new Date()).getTime(); const a = this.map; if (this.shim)
                i.makeRequire(this.map, { enableBuildCallback: !0 })(this.shim.deps || [], q(this, function () { return a.prefix ? this.callPlugin() : this.load() })); else return a.prefix ? this.callPlugin() : this.load()
            }
          },
          load() { const a = this.map.url; P[a] || (P[a] = !0, i.load(this.map.id, a)) },
          check() {
            if (this.enabled && !this.enabling) {
              let a; let b; const c = this.map.id; b = this.depExports; let e = this.exports; const d = this.factory; if (this.inited) {
                if (this.error) { this.emit('error', this.error) }
                else {
                  if (!this.defining) {
                    this.defining = !0; if (this.depCount < 1 && !this.defined) {
                      if (D(d)) {
                        if (this.events.error) {
                          try { e = i.execCb(c, d, b, e) }
                          catch (k) { a = k }
                        }
                        else { e = i.execCb(c, d, b, e) } if (this.map.isDefine) {
                          if ((b = this.module) && b.exports !== void 0 && b.exports !== this.exports)
                            e = b.exports; else if (e === void 0 && this.usingExports)
                            e = this.exports
                        } if (a)
                          return a.requireMap = this.map, a.requireModules = [this.map.id], a.requireType = 'define', z(this.error = a)
                      }
                      else { e = d } this.exports = e; if (this.map.isDefine && !this.ignore && (o[c] = e, h.onResourceLoad)) {
                        h.onResourceLoad(i,
                          this.map, this.depMaps)
                      } delete l[c]; this.defined = !0
                    } this.defining = !1; if (this.defined && !this.defineEmitted)
                      this.defineEmitted = !0, this.emit('defined', this.exports), this.defineEmitComplete = !0
                  }
                }
              }
              else { this.fetch() }
            }
          },
          callPlugin() {
            const a = this.map; const b = a.id; const d = j(a.prefix); this.depMaps.push(d); p(d, 'defined', q(this, function (e) {
              let d, k; k = this.map.name; const x = this.map.parentMap ? this.map.parentMap.name : null; const g = i.makeRequire(a.parentMap, { enableBuildCallback: !0, skipMap: !0 }); if (this.map.unnormalized) {
                if (e.normalize
&& (k = e.normalize(k, (a) => { return c(a, x, !0) }) || ''), e = j(`${a.prefix}!${k}`, this.map.parentMap), p(e, 'defined', q(this, function (a) { this.init([], () => { return a }, null, { enabled: !0, ignore: !0 }) })), k = l[e.id]) {
                  this.depMaps.push(e); if (this.events.error)
                    k.on('error', q(this, function (a) { this.emit('error', a) })); k.enable()
                }
              }
              else {
                d = q(this, function (a) { this.init([], () => { return a }, null, { enabled: !0 }) }), d.error = q(this, function (a) {
                  this.inited = !0; this.error = a; a.requireModules = [b]; F(l, (a) => {
                    a.map.id.indexOf(`${b
}_unnormalized`) === 0 && delete l[a.map.id]
                  }); z(a)
                }), d.fromText = q(this, function (b, e) {
                  const f = a.name; const c = j(f); const k = K; e && (b = e); k && (K = !1); n(c); try { h.exec(b) }
                  catch (x) { throw new Error(`fromText eval for ${f} failed: ${x}`) }k && (K = !0); this.depMaps.push(c); i.completeLoad(f); g([f], d)
                }), e.load(a.name, g, d, m)
              }
            })); i.enable(d, this); this.pluginMaps[d.id] = d
          },
          enable() {
            this.enabling = this.enabled = !0; s(this.depMaps, q(this, function (a, b) {
              let c, e; if (typeof a === 'string') {
                a = j(a, this.map.isDefine ? this.map : this.map.parentMap, !1,
                  !this.skipMap); this.depMaps[b] = a; if (c = L[a.id]) { this.depExports[b] = c(this); return } this.depCount += 1; p(a, 'defined', q(this, function (a) { this.defineDep(b, a); this.check() })); this.errback && p(a, 'error', this.errback)
              }c = a.id; e = l[c]; !L[c] && e && !e.enabled && i.enable(a, this)
            })); F(this.pluginMaps, q(this, function (a) { const b = l[a.id]; b && !b.enabled && i.enable(a, this) })); this.enabling = !1; this.check()
          },
          on(a, b) { let c = this.events[a]; c || (c = this.events[a] = []); c.push(b) },
          emit(a, b) {
            s(this.events[a], (a) => { a(b) })
            a === 'error' && delete this.events[a]
          },
        }; i = {
          config: m,
          contextName: b,
          registry: l,
          defined: o,
          urlFetched: P,
          defQueue: C,
          Module: S,
          makeModuleMap: j,
          nextTick: h.nextTick,
          configure(a) {
            a.baseUrl && a.baseUrl.charAt(a.baseUrl.length - 1) !== '/' && (a.baseUrl += '/'); const b = m.pkgs; const c = m.shim; const e = m.paths; const d = m.map; J(m, a, !0); m.paths = J(e, a.paths, !0); if (a.map)
              m.map = J(d || {}, a.map, !0, !0); if (a.shim) {
              F(a.shim, (a, b) => {
                E(a) && (a = { deps: a }); if (a.exports && !a.exportsFn)
                  a.exportsFn = i.makeShimExports(a); c[b] = a
              }), m.shim = c
            } if (a.packages) {
              s(a.packages,
                (a) => { a = typeof a === 'string' ? { name: a } : a; b[a.name] = { name: a.name, location: a.location || a.name, main: (a.main || 'main').replace(da, '').replace(Y, '') } }), m.pkgs = b
            } F(l, (a, b) => {
              if (!a.inited && !a.map.unnormalized)
                a.map = j(b)
            }); if (a.deps || a.callback)
              i.require(a.deps || [], a.callback)
          },
          makeShimExports(a) { return function () { let b; a.init && (b = a.init.apply(U, arguments)); return b || V(a.exports) } },
          makeRequire(a, f) {
            function d(e, c, k) {
              let g, m; if (f.enableBuildCallback && c && D(c))
                c.__requireJsBuild = !0
              if (typeof e === 'string') {
                if (D(c))
                  return z(H('requireargs', 'Invalid require call'), k); if (a && L[e])
                  return L[e](l[a.id]); if (h.get)
                  return h.get(i, e, a); g = j(e, a, !1, !0); g = g.id; return !G.call(o, g) ? z(H('notloaded', `Module name "${g}" has not been loaded yet for context: ${b}${a ? '' : '. Use require([])'}`)) : o[g]
              } for (r(); C.length;) {
                if (g = C.shift(), g[0] === null)
                  return z(H('mismatch', `Mismatched anonymous define() module: ${g[g.length - 1]}`)); else y(g)
              } i.nextTick(() => {
                m = n(j(null, a)); m.skipMap = f.skipMap; m.init(e, c, k,
                  { enabled: !0 }); w()
              }); return d
            }f = f || {}; J(d, { isBrowser: v, toUrl(b) { const f = b.lastIndexOf('.'); let d = null; f !== -1 && (d = b.substring(f, b.length), b = b.substring(0, f)); return i.nameToUrl(c(b, a && a.id, !0), d) }, defined(b) { b = j(b, a, !1, !0).id; return G.call(o, b) }, specified(b) { b = j(b, a, !1, !0).id; return G.call(o, b) || G.call(l, b) } }); if (!a) {
              d.undef = function (b) {
                r(); const c = j(b, a, !0); const f = l[b]; delete o[b]; delete P[c.url]; delete T[b]; if (f) {
                  if (f.events.defined)
                    T[b] = f.events; delete l[b]
                }
              }
            } return d
          },
          enable(a) {
            l[a.id]
&& n(a).enable()
          },
          completeLoad(a) {
            let b; let c; const e = m.shim[a] || {}; const d = e.exports; for (r(); C.length;) {
              c = C.shift(); if (c[0] === null) {
                c[0] = a; if (b)
                  break; b = !0
              }
              else { c[0] === a && (b = !0) }y(c)
            }c = l[a]; if (!b && !o[a] && c && !c.inited) {
              if (m.enforceDefine && (!d || !V(d))) {
                if (t(a))
                  return; else return z(H('nodefine', `No define call for ${a}`, null, [a]))
              }
              else { y([a, e.deps || [], e.exportsFn]) }
            } w()
          },
          nameToUrl(a, b) {
            let c, e, d, g, i, j; if (h.jsExtRegExp.test(a)) { g = a + (b || '') }
            else {
              c = m.paths; e = m.pkgs; g = a.split('/'); for (i = g.length; i > 0; i -= 1) {
                if (j
= g.slice(0, i).join('/'), d = e[j], j = c[j]) { E(j) && (j = j[0]); g.splice(0, i, j); break }
                else if (d) { c = a === d.name ? `${d.location}/${d.main}` : d.location; g.splice(0, i, c); break }
              }g = g.join('/'); g += b || (/\?/.test(g) ? '' : '.js'); g = (g.charAt(0) === '/' || g.match(/^[\w\+\.\-]+:/) ? '' : m.baseUrl) + g
            } return m.urlArgs ? g + ((!g.includes('?') ? '?' : '&') + m.urlArgs) : g
          },
          load(a, b) { h.load(i, a, b) },
          execCb(a, b, c, d) { return b.apply(d, c) },
          onScriptLoad(a) {
            if (a.type === 'load' || fa.test((a.currentTarget || a.srcElement).readyState)) {
              I
= null, a = A(a), i.completeLoad(a.id)
            }
          },
          onScriptError(a) {
            const b = A(a); if (!t(b.id))
              return z(H('scripterror', 'Script error', a, [b.id]))
          },
        }; i.require = i.makeRequire(); return i
      },
    }; h({}); s(['toUrl', 'undef', 'defined', 'specified'], (b) => { h[b] = function () { const c = w._; return c.require[b].apply(c, arguments) } }); if (v && (u = r.head = document.getElementsByTagName('head')[0], y = document.getElementsByTagName('base')[0]))
      u = r.head = y.parentNode; h.onError = function (b) { throw b }; h.load = function (b, c, d) {
      const h = b && b.config || {}
      let g; if (v) {
        return g = h.xhtml ? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') : document.createElement('script'), g.type = h.scriptType || 'text/javascript', g.charset = 'utf-8', g.async = !0, g.setAttribute('data-requirecontext', b.contextName), g.setAttribute('data-requiremodule', c), g.attachEvent && !(g.attachEvent.toString && !g.attachEvent.toString().includes('[native code')) && !Q
          ? (K = !0, g.attachEvent('onreadystatechange', b.onScriptLoad))
          : (g.addEventListener('load', b.onScriptLoad, !1), g.addEventListener('error',
              b.onScriptError, !1)), g.src = d, B = g, y ? u.insertBefore(g, y) : u.appendChild(g), B = null, g
      }
      else { Z && (importScripts(d), b.completeLoad(c)) }
    }; v && N(document.getElementsByTagName('script'), (b) => {
      if (!u)
        u = b.parentNode; if (p = b.getAttribute('data-main')) {
        if (!n.baseUrl)
          A = p.split('/'), W = A.pop(), X = A.length ? `${A.join('/')}/` : './', n.baseUrl = X, p = W; p = p.replace(Y, ''); n.deps = n.deps ? n.deps.concat(p) : [p]; return !0
      }
    }); define = function (b, c, d) {
      let h, g; typeof b !== 'string' && (d = c, c = b, b = null); E(c) || (d = c, c = []); !c.length && D(d) && d.length
&& (d.toString().replace(ba, '').replace(ca, (b, d) => { c.push(d) }), c = (d.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(c)); if (K && (h = B || aa()))
        b || (b = h.getAttribute('data-requiremodule')), g = w[h.getAttribute('data-requirecontext')]; (g ? g.defQueue : O).push([b, c, d])
    }; define.amd = { jQuery: !0 }; h.exec = function (b) { return eval(b) }; h(n)
  }
})(this)
