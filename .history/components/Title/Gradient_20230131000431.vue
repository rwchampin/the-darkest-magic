<script setup>
import * as THREE from 'three'
import { SplitText } from 'gsap/SplitText'
import { gsap } from 'gsap'

const title = ref(null)
gsap.registerPlugin(SplitText)
const tl = gsap.timeline({ repeat: -1, yoyo: true })
// defineProps({
//   gbParentWrapper: HTMLElement,
//   gbTitleElement: HTMLElement,
//   isAnchorTag: Boolean,
// })

const splitTitle = () => {
  const split = SplitText.create(title.value, {
    type: 'chars',
    charsClass: 'char',
    position: 'absolute',
    linesClass: 'line',
    wordsClass: 'word',
  })
}

const showLetters = () => {
  const t = document.querySelectorAll('h1 div')
  tl.from(t, {
    opacity: 0,
    translateY: 50,
  }, {
    duration: 1,
    ease: 'easeOutExpo',
    stagger: 0.1,
    onStart: () => {
      document.querySelector('h1').style.opacity = 1
    },
  }, 0),
  tl.from(this.canvas, {
    opacity: 0,
  }, {
    duration: 2,
    ease: 'easeOutQuint',
    onUpdate: () => {
      // this.onResize()
    },
  }, 0.5),

}
onMounted(() => {
  splitTitle()
})

// export class GradientTitle {

//   constructor() {
//     this.scene = new THREE.Scene()
//     this.time = 0
//     this.then = 0
//     this.now = 0
//     this.timeScale = 5e-4
//     this.canvas = store.canvas
//     this.renderer = store.renderer
//     this.volume = new c.Volume()
//     this.camera = new c.Orthographic(-1, 1, -1, 1, -1, 1)
//     const t = new c.Program(this.renderer.gl, '#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nuniform mat4 uViewProjectionMatrix;\nuniform mat4 uNormalMatrix;\nuniform mat4 uLocalMatrix;\nuniform float uTime;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\n\nfloat snoise(vec3 v) { \n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n\tvec3 i  = floor(v + dot(v, C.yyy) );\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\n\n\tvec3 g = step(x0.yzx, x0.xyz);\n\tvec3 l = 1.0 - g;\n\tvec3 i1 = min( g.xyz, l.zxy );\n\tvec3 i2 = max( g.xyz, l.zxy );\n\n\tvec3 x1 = x0 - i1 + 1.0 * C.xxx;\n\tvec3 x2 = x0 - i2 + 2.0 * C.xxx;\n\tvec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n\ti = mod(i, 289.0 ); \n\tvec4 p = permute( permute( permute( \n\t\ti.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n\t\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n\t\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n\tfloat n_ = 1.0/7.0;\n\tvec3  ns = n_ * D.wyz - D.xzx;\n\n\tvec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n\n\tvec4 x_ = floor(j * ns.z);\n\tvec4 y_ = floor(j - 7.0 * x_ );\n\n\tvec4 x = x_ *ns.x + ns.yyyy;\n\tvec4 y = y_ *ns.x + ns.yyyy;\n\tvec4 h = 1.0 - abs(x) - abs(y);\n\n\tvec4 b0 = vec4( x.xy, y.xy );\n\tvec4 b1 = vec4( x.zw, y.zw );\n\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\n\tvec4 sh = -step(h, vec4(0.0));\n\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n\tvec3 p0 = vec3(a0.xy,h.x);\n\tvec3 p1 = vec3(a0.zw,h.y);\n\tvec3 p2 = vec3(a1.xy,h.z);\n\tvec3 p3 = vec3(a1.zw,h.w);\n\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n\tp0 *= norm.x;\n\tp1 *= norm.y;\n\tp2 *= norm.z;\n\tp3 *= norm.w;\n\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n\tm = m * m;\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\n}\n\nfloat map(float value, float min1, float max1, float min2, float max2) {\n\treturn min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n}\n\nvoid main() {\n\tvec4 position = uViewProjectionMatrix * uLocalMatrix * aPosition;\n\tposition.z = map(snoise(vec3((position.xy / 2.0), (uTime / 2.0))), -0.8660254038, 0.8660254038, 0.0, 1.0);\n\tgl_Position = position;\n\tvNormal = aNormal + 0.5;\n\tvUV = aUV;\n\tvPos = position.xyz;\n}', '#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform float uTime;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvoid main() {\n\tvec4 a = vec4(0.83, 0.40, 0.38, 1.0);\n\tvec4 b = vec4(0.96, 0.75, 0.69, 1.0);\n\tvec4 c = vec4(0.40, 0.74, 0.90, 1.0);\n\tvec4 d = vec4(0.55, 0.88, 0.98, 1.0);\n\tvec4 e = vec4(0.41, 0.83, 0.56, 1.0);\n\tvec4 f = vec4(0.46, 0.92, 0.70, 1.0);\n\n\tfloat step = 1.0 / 4.0;\n\n\tvec4 color = a;\n\tcolor = mix(color, c, smoothstep(step * 1.0, step * 2.0, vPos.z));\n\tcolor = mix(color, e, smoothstep(step * 2.0, step * 3.0, vPos.z));\n\tcolor = mix(color, vec4(1.0), smoothstep(step * 3.0, step * 4.0, vPos.z));\n\n\tgl_FragColor = color;\n}')
//     const e = new c.Plane(2, 2, 16, 1)
//     this.planeMesh = new c.Mesh(e, t),
//       this.planeMesh.setPosition(0, 0, 0),
//       this.planeMesh.setUniform('uTime', 0, '1f'),
//       this.volume.add(this.planeMesh),
//       this.heroElement = document.querySelector('section.hero'),
//       this.textElement = document.getElementById('hero-heading-key-line'),
//       this.speed = {
//         current: 1,
//         target: 1,
//         ease: 0.05,
//       },

//   }

//   lerp(t, e, s) {
//     return (1 - s) * t + s * e
//   }

//   onPreloaded() {
//     this.appear()
//   }

//   onResize() {
//     const t = this.heroElement.getBoundingClientRect()
//     const e = this.textElement.getBoundingClientRect()
//     this.canvas.parentNode.style.width = `${e.width}px`,
//       this.canvas.parentNode.style.height = `${e.height}px`,
//       this.canvas.parentNode.style.top = `${e.top - t.top}px`,
//       this.canvas.parentNode.style.left = `${e.left}px`,
//       this.renderer.resize()
//   }

//   onMouseDown(t) {
//     this.speed.target = 5
//   }

//   onMouseUp(t) {
//     this.speed.target = 1
//   }

//   onUpdate(t) {
//     this.speed.current < 1.000001 && (this.speed.current = 1),
//       this.speed.current = this.lerp(this.speed.current, this.speed.target, this.speed.ease),
//       this.now = t * this.timeScale,
//       this.time += (this.now - this.then) * this.speed.current,
//       this.then = this.now,
//       this.renderer.gl.clearColor(0, 0, 0, 0),
//       this.renderer.render(this.volume, this.camera),
//       this.planeMesh.uniforms.uTime.value = this.time
//   }
// }

// @Component
// class f extends Vue {

//   constructor() {
//     super()
//     this.visibility = {
//       value: 0,
//     }
//     this.time = 0
//     this.then = 0
//     this.now = 0
//     this.timeScale = 0.003
//     this.canvas = document.getElementById('hero-indicator')
//     this.canvasSize = 0
//     this.ctx = this.canvas.getContext('2d')
//     this.iterations = 0
//     this.heading = document.querySelector('section.hero h1')
//   }

//   draw() {
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
//     this.ctx.lineWidth = 3
//     this.ctx.lineCap = 'round'
//     let t = this.canvasSize - 8
//     let e = 1
//     for (let s = 0; s < this.iterations; s++) {
//       e = 0.5 * Math.sin(-this.time + Math.PI / 2 + s / 2) + 0.5,
//         e *= this.visibility.value,
//         this.ctx.strokeStyle = `rgba(255, 255, 255, ${e / 2})`
//       const i = this.canvasSize / 2 - t / 2
//       this.ctx.beginPath(),
//         this.ctx.moveTo(i, 2 + s * (this.canvasSize / 12)),
//         this.ctx.lineTo(i + t, 2 + s * (this.canvasSize / 12)),
//         this.ctx.stroke(),
//         t = t / 2 + t / 8

//     }

//     appear() {
//       this.time = 0,
//         m.to(this.visibility, {
//           value: 1,
//         }, {
//           duration: 2,
//           ease: 'easeInExpo',
//         })
//     }

//     onPreloaded() {
//       this.appear()
//     }

//     onResize() {
//       const t = this.heading.getBoundingClientRect()
//       if (this.canvas.clientWidth !== t.width) {
//         this.canvasSize = this.canvas.width = t.width
//         let e = this.canvasSize - 8
//         for (this.iterations = 0; e > 4;) {
//           this.iterations += 1,
//             e = e / 2 + e / 8
//         }
//         this.canvas.height = this.iterations * (this.canvasSize / 12)
//       }
//     }

//     onUpdate(t) {
//       this.now = t * this.timeScale,
//         this.time += this.now - this.then,
//         this.then = this.now,
//         this.draw()
//     }
//   }
//   appear() {
//     throw new Error('Method not implemented.');
//   }

//   @Component
// class v extends Vue {
//   constructor() {
//     super()
//     this.isActive = !0
//     this.persistentAnimation = !0
//     this.setDOM('section.hero')
//     this.addAnimation(new g())
//     this.addAnimation(new f())
//   }

//   onScroll(t) {
//     t.y < this.metrics.scrollY + this.metrics.height + this.exitThreshold ? this.onEnter() : this.onExit(),
//       this.animations.forEach((e) => {
//         e.onScroll && e.onScroll(t)
//       },
//       )
//   }
// }
</script>

<template>
  <div class="gb-parent-wrapper">
    <div class="gb-title-element">
      <h1 ref="title">
        gfdgdgd
      </h1>
    </div>
  </div>
</template>

<style>
.gb-parent-wrapper {
  position: relative;
}

.gb-title-element>* {
  background-image: linear-gradient(to right, blue, white);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient {
  background: linear-gradient(90deg, #d66761 16.66666%, #f5c0b2 33.33333%, #aee8fa 50%, #68bde7 66.66666%, #6bd490 83.33333%, #a2f6cf)
}
</style>
