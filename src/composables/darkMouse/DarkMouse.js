import EventEmitter from '~/core/helpers/EventEmitter'
import { darkMouseStates, darkMouseTriggers } from '~/composables/darkMouse/triggersAndStates'
export default class DarkMouse extends EventEmitter {
  static registerGSAP(gsap) {
    DarkMouse.gsap = gsap
  }

  //* ***************************************************************/
  //* Constructor
  //* ***************************************************************/
  constructor(options) {
    super()
    this.nuxtApp = options.nuxtApp
    this.gsap = this.nuxtApp.$plugins.gsap

    this.THREE = this.nuxtApp.$plugins.THREE
    this.scene = options.scene

    this.textClassName = 'mf-cursor-text'
    this.mediaClassName = 'mf-cursor-media'
    this.mediaBoxClassName = 'mf-cursor-media-box'
    this.iconSvgClassName = 'mf-svgsprite'
    this.iconSvgNamePrefix = '-'
    this.iconSvgSrc = ''
    this.dataAttr = 'cursor'
    this.state = ''
    this.hiddenState = '-hidden'
    this.textState = '-text'
    this.iconState = '-icon'
    this.activeState = '-active'
    this.mediaState = '-media'
    this.stateDetection = {
      '-pointer': 'a,button',
    }
    this.visible = true
    this.visibleOnState = false
    this.speed = 0.55
    this.ease = 'expo.out'
    this.overwrite = true
    this.skewing = 0
    this.skewingText = 2
    this.skewingIcon = 2
    this.skewingMedia = 2
    this.skewingDelta = 0.001
    this.skewingDeltaMax = 0.15
    this.stickDelta = 0.15
    this.showTimeout = 0
    this.hideOnLeave = false
    this.hideTimeout = 300
    this.hideMediaTimeout = 300
    this.initialPos = [-window.innerWidth, -window.innerHeight]
    this.pos = new this.THREE.Vector3(this.initialPos[0], this.initialPos[1], 0)
    this.vel = new this.THREE.Vector3(Math.random(), Math.random(), Math.random())
    if (this.visible && this.stateDetection == null)
      this.stateDetection['-hidden'] = 'iframe'

    this.skewing = options.skewing || 0

    this.event = {}
    this.events = []

    this.init()
  }

  /**
                                                       * Init cursor.
                                                       */
  init() {
    this.create()
    // this.addState()
    // this.createSetter()
    // this.bind()
    // this.render(true)
    // this.gsap.ticker.add(this.ticker)
  }

  create() {
    const geometry = new this.THREE.IcosahedronGeometry(0.1, 2)
    const material = new this.THREE.MeshBasicMaterial({
      color: 0x000000,
    })
    this.el = new this.THREE.Mesh(geometry, material)
    this.el.position.set(0, 0, 0)
    this.scene.add(this.el)
    // this.inner = document.createElement('div')
    // this.inner.className = this.options.innerClassName

    // this.text = document.createElement('div')
    // this.text.className = this.options.textClassName

    // this.media = document.createElement('div')
    // this.media.className = this.options.mediaClassName

    // this.mediaBox = document.createElement('div')
    // this.mediaBox.className = this.options.mediaBoxClassName

    // this.media.appendChild(this.mediaBox)
    // this.inner.appendChild(this.media)
    // this.inner.appendChild(this.text)
    // this.el.appendChild(this.inner)
    // this.container.appendChild(this.el)
  }

  /**
                                                       * Create GSAP setters.
                                                       */
  createSetter() {
    this.setter = {
      x: this.gsap.quickSetter(this.pos, 'x', 'px'),
      y: this.gsap.quickSetter(this.pos, 'y', 'px'),
      z: this.gsap.quickSetter(this.pos, 'z', 'px'),

      // rotation: this.gsap.quickSetter(this.rotation, 'rotation', 'deg'),
      // scaleX: this.gsap.quickSetter(this.el, 'scaleX'),
      // scaleY: this.gsap.quickSetter(this.el, 'scaleY'),
      // scaleZ: this.gsap.quickSetter(this.el, 'scaleZ'),

    }
  }

  /**
                                                       * Create and attach events.
                                                       */
  bind() {
    // this.event.mouseleave = () => this.hide()
    // this.event.mouseenter = () => this.show()
    this.event.mousedown = () => this.addState(this.activeState)
    this.event.mouseup = () => this.removeState(this.activeState)
    this.event.mousemoveOnce = () => this.show()
    this.event.mousemove = (e) => {
      this.gsap.to(this.pos, {
        x: this.stick ? this.stick.x - ((this.stick.x - e.clientX) * this.stickDelta) : e.clientX,
        y: this.stick ? this.stick.y - ((this.stick.y - e.clientY) * this.stickDelta) : e.clientY,
        overwrite: this.overwrite,
        ease: this.ease,
        duration: this.visible ? this.speed : 0,
        onUpdate: () => this.vel = { x: e.clientX - this.pos.x, y: e.clientY - this.pos.y },
      })
      this.nuxtApp.$appStore.mousePosition.value = this.pos
    }
    this.event.mouseover = (e) => {
      // for (let target = e.target; target && target !== this.container; target = target.parentNode) {
      //   if (e.relatedTarget && target.contains(e.relatedTarget))
      //     break

      //   for (const state in this.stateDetection) {
      //     if (target.matches(this.stateDetection[state]))
      //       this.addState(state)
      //   }

      //   if (this.dataAttr) {
      //     const params = this.getFromDataset(target)
      //     if (params.state)
      //       this.addState(params.state)
      //     if (params.text)
      //       this.setText(params.text)
      //     if (params.icon)
      //       this.setIcon(params.icon)
      //     if (params.img)
      //       this.setImg(params.img)
      //     if (params.video)
      //       this.setVideo(params.video)
      //     if (typeof (params.show) !== 'undefined')
      //       this.show()
      //     if (typeof (params.stick) !== 'undefined')
      //       this.setStick(params.stick || target)
      //   }
      // }
    }
    // this.event.mouseout = (e) => {
    //   for (let target = e.target; target && target !== this.container; target = target.parentNode) {
    //     if (e.relatedTarget && target.contains(e.relatedTarget))
    //       break

    //     for (const state in this.stateDetection) {
    //       if (target.matches(this.stateDetection[state]))
    //         this.removeState(state)
    //     }

    //     if (this.dataAttr) {
    //       const params = this.getFromDataset(target)
    //       if (params.state)
    //         this.removeState(params.state)
    //       if (params.text)
    //         this.removeText()
    //       if (params.icon)
    //         this.removeIcon()
    //       if (params.img)
    //         this.removeImg()
    //       if (params.video)
    //         this.removeVideo()
    //       if (typeof (params.show) !== 'undefined')
    //         this.hide()
    //       if (typeof (params.stick) !== 'undefined')
    //         this.removeStick()
    //     }
    //   }
    // }

    // if (this.hideOnLeave)
    //   this.container.addEventListener('mouseleave', this.event.mouseleave, { passive: true })

    // if (this.visible)
    //   this.container.addEventListener('mouseenter', this.event.mouseenter, { passive: true })

    // if (this.activeState) {
    //   this.container.addEventListener('mousedown', this.event.mousedown, { passive: true })
    //   this.container.addEventListener('mouseup', this.event.mouseup, { passive: true })
    // }
    window.addEventListener('mousemove', this.event.mousemove, { passive: true })
    if (this.visible) {
      window.addEventListener('mousemove', this.event.mousemoveOnce, {
        passive: true,
        once: true,
      })
    }
    // if (this.stateDetection || this.dataAttr) {
    //   this.container.addEventListener('mouseover', this.event.mouseover, { passive: true })
    //   this.container.addEventListener('mouseout', this.event.mouseout, { passive: true })
    // }
  }

  render(force) {
    if (force !== true && (this.vel.y === 0 || this.vel.x === 0)) {
      // this.setter.wc('auto')
      return
    }

    this.trigger('render')
    this.setter.x(this.pos.x)
    this.setter.y(this.pos.y)

    if (this.skewing) {
      const distance = Math.sqrt(this.vel.x ** 2 + this.vel.y ** 2)
      const scale = Math.min(distance * this.skewingDelta,
        this.skewingDeltaMax) * this.skewing
      const angle = Math.atan2(this.vel.y, this.vel.x) * 180 / Math.PI

      this.setter.rotation(angle)
      this.setter.scaleX(1 + scale)
      this.setter.scaleY(1 - scale)
      this.setter.inner.rotation(-angle)
    }
  }

  /**
                                                       * Show cursor.
                                                       */
  show() {
    this.trigger('show')
    clearInterval(this.visibleInt)
    this.visibleInt = setTimeout(() => {
      this.el.classList.remove(this.hiddenState)
      this.visible = true
      this.render(true)
    }, this.showTimeout)
  }

  /**
                                                       * Hide cursor.
                                                       */
  hide() {
    this.trigger('hide')
    clearInterval(this.visibleInt)
    this.el.classList.add(this.hiddenState)
    this.visibleInt = setTimeout(() => this.visible = false, this.hideTimeout)
  }

  /**
                                                       * Toggle cursor.
                                                       *
                                                       * @param {boolean} [force] Force state.
                                                       */
  toggle(force) {
    if (force === true || force !== false && !this.visible)
      this.show()

    else
      this.hide()
  }

  /**
                                                       * Add state/states to the cursor.
                                                       *
                                                       * @param {string} state State name.
                                                       */
  addState(state) {
    this.trigger('addState', state)
    if (state === this.hiddenState)
      return this.hide()
    if (this.visibleOnState)
      this.show()
  }

  /**
                                                       * Remove state/states from cursor.
                                                       *
                                                       * @param {string} state State name.
                                                       */
  removeState(state) {
    this.trigger('removeState', state)
    if (state === this.hiddenState)
      return this.show()
    this.el.classList.remove(...state.split(' '))
    if (this.visibleOnState && this.el.className === this.className)
      this.hide()
  }

  /**
                                                       * Toggle cursor state.
                                                       *
                                                       * @param {string} state State name.
                                                       * @param {boolean} [force] Force state.
                                                       */
  toggleState(state, force) {
    if (force === true || force !== false && !this.el.classList.contains(state))
      this.addState(state)

    else
      this.removeState(state)
  }

  /**
                                                       * Set factor of skewing effect.
                                                       *
                                                       * @param {number} value Skewing factor.
                                                       */
  setSkewing(value) {
    this.gsap.to(this, { skewing: value })
  }

  /**
                                                       * Reverts skewing factor to default.
                                                       */
  removeSkewing() {
    this.gsap.to(this, { skewing: this.skewing })
  }

  /**
                                                       * Stick cursor to the element.
                                                       *
                                                       * @param {string|HTMLElement} element Element or selector.
                                                       */
  setStick(element) {
    const el = typeof (element) === 'string' ? document.querySelector(element) : element
    const rect = el.getBoundingClientRect()
    this.stick = {
      y: rect.top + (rect.height / 2),
      x: rect.left + (rect.width / 2),
    }
  }

  /**
                                                       * Unstick cursor from the element.
                                                       */
  removeStick() {
    this.stick = false
  }

  /**
                                                       * Transform cursor to text mode with a given string.
                                                       *
                                                       * @param {string} text Text.
                                                       */
  setText(text) {
    this.text.innerHTML = text
    this.addState(this.textState)
    this.setSkewing(this.skewingText)
  }

  /**
                                                       * Reverts cursor from text mode.
                                                       */
  removeText() {
    this.removeState(this.textState)
    this.removeSkewing()
  }

  /**
                                                       * Transform cursor to svg icon mode.
                                                       *
                                                       * @param {string} name Icon identifier.
                                                       * @param {string} [style=""] Additional SVG styles.
                                                       */
  setIcon(name, style = '') {
    this.text.innerHTML = `<svg class='${this.iconSvgClassName} ${this.iconSvgNamePrefix}${name}'`
      + ` style='${style}'><use xlink:href='${this.iconSvgSrc}#${name}'></use></svg>`
    this.addState(this.iconState)
    this.setSkewing(this.skewingIcon)
  }

  /**
                                                       * Reverts cursor from icon mode.
                                                       */
  removeIcon() {
    this.removeState(this.iconState)
    this.removeSkewing()
  }

  /**
                                                       * Transform cursor to media mode with a given element.
                                                       *
                                                       * @param {HTMLElement} element Element.
                                                       */
  setMedia(element) {
    clearTimeout(this.mediaInt)
    if (element) {
      this.mediaBox.innerHTML = ''
      this.mediaBox.appendChild(element)
    }
    this.mediaInt = setTimeout(() => this.addState(this.mediaState), 20)
    this.setSkewing(this.skewingMedia)
  }

  /**
                                                       * Revert cursor from media mode.
                                                       */
  removeMedia() {
    clearTimeout(this.mediaInt)
    this.removeState(this.mediaState)
    this.mediaInt = setTimeout(() => this.mediaBox.innerHTML = '', this.hideMediaTimeout)
    this.removeSkewing()
  }

  /**
                                                       * Transform cursor to image mode.
                                                       *
                                                       * @param {string} url Image url.
                                                       */
  setImg(url) {
    if (!this.mediaImg)
      this.mediaImg = new Image()
    if (this.mediaImg.src !== url)
      this.mediaImg.src = url
    this.setMedia(this.mediaImg)
  }

  /**
                                                       * Reverts cursor from image mode.
                                                       */
  removeImg() {
    this.removeMedia()
  }

  /**
                                                       * Transform cursor to video mode.
                                                       *
                                                       * @param {string} url Video url.
                                                       */
  setVideo(url) {
    if (!this.mediaVideo) {
      this.mediaVideo = document.createElement('video')
      this.mediaVideo.muted = true
      this.mediaVideo.loop = true
      this.mediaVideo.autoplay = true
    }
    if (this.mediaVideo.src !== url) {
      this.mediaVideo.src = url
      this.mediaVideo.load()
    }
    this.mediaVideo.play()
    this.setMedia(this.mediaVideo)
  }

  /**
                                                       * Reverts cursor from video mode.
                                                       */
  removeVideo() {
    if (this.mediaVideo && this.mediaVideo.readyState > 2)
      this.mediaVideo.pause()
    this.removeMedia()
  }

  getFromDataset(element) {
    const dataset = element.dataset
    return {
      state: dataset[this.dataAttr],
      show: dataset[`${this.dataAttr}Show`],
      text: dataset[`${this.dataAttr}Text`],
      icon: dataset[`${this.dataAttr}Icon`],
      img: dataset[`${this.dataAttr}Img`],
      video: dataset[`${this.dataAttr}Video`],
      stick: dataset[`${this.dataAttr}Stick`],
    }
  }

  /**
                                                       * Destroy cursor instance.
                                                       */
  destroy() {
    this.trigger('destroy')
    // this.gsap.ticker.remove(this.ticker)
    this.container.removeEventListener('mouseleave', this.event.mouseleave)
    this.container.removeEventListener('mouseenter', this.event.mouseenter)
    this.container.removeEventListener('mousedown', this.event.mousedown)
    this.container.removeEventListener('mouseup', this.event.mouseup)
    this.container.removeEventListener('mousemove', this.event.mousemove)
    this.container.removeEventListener('mousemove', this.event.mousemoveOnce)
    this.container.removeEventListener('mouseover', this.event.mouseover)
    this.container.removeEventListener('mouseout', this.event.mouseout)
    if (this.el) {
      this.container.removeChild(this.el)
      this.el = null
      this.mediaImg = null
      this.mediaVideo = null
    }
  }
}
