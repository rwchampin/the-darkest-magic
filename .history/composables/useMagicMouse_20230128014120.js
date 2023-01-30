/* eslint-disable @typescript-eslint/no-unused-vars */
let magicMouse
export const useMagicMouse = (opts = {}) => {
  // Styles injected into the <head> when a RETICOOL is created.
  let styles = '<style>.RETICOOL{position:fixed;top: 0;left:0;will-change:transform;transition: color 0.3s linear,opacity 0.3s linear;font-size: 20px;line-height:1;white-space:nowrap;z-index:9999999} .RETICOOL__inner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);} .RETICOOL__circle{border-style:solid;}</style>'
  let onUpdate, lockTarget, onHover, scrollUnlock, attach, detach, update, updateStyle, setColor, activateCSSVars, lock, unlock, changeSymbol, onMove, onDown, onUp, events,
    lockClass, lockColor, lockOpacity, lockEase, lockExpand, lockTravel, lockTriggers, radius, borderWidth, ease, color, opacity, cursor, content, useCSSVars, locks, x, y, lx, ly, _x, _y, locked, lockedX, lockedY, lockedRadius, lockedBorderWidth, lockedColor, lockedOpacity, lockedEase, lockedExpand, lockedTravel, lockedTriggers, lockedLockClass, lockedLockColor, lockedLockOpacity, lockedLockEase, lockedLockExpand, lockedLockTravel, lockedLockTriggers, lockedContent, lockedUseCSSVars, lockx,
    init, updateLock, updateLockStyle, updateLockCSSVars, updateLockClass, updateLockColor, updateLockOpacity, updateLockEase, updateLockExpand, updateLockTravel, updateLockTriggers, updateLockContent, updateLockUseCSSVars, updateLockRadius, updateLockBorderWidth, updateLockLocked, updateLockLockedX, updateLockLockedY, updateLockLockedRadius, updateLockLockedBorderWidth, updateLockLockedColor, updateLockLockedOpacity, updateLockLockedEase, updateLockLockedExpand, updateLockLockedTravel, updateLockLockedTriggers, updateLockLockedLockClass, updateLockLockedLockColor, updateLockLockedLockOpacity, updateLockLockedLockEase, updateLockLockedLockExpand, updateLockLockedLockTravel, updateLockLockedLockTriggers, updateLockLockedContent, updateLockLockedUseCSSVars, updateLockLockedLocked, updateLockLockedLockedX, updateLockLockedLockedY, updateLockLockedLockedRadius, updateLockLockedLockedBorderWidth, updateLockLockedLockedColor, updateLockLockedLockedOpacity, updateLockLockedLockedEase, updateLockLockedLockedExpand, updateLockLockedLockedTravel, updateLockLockedLockedTriggers, updateLockLockedLockedLockClass, updateLockLockedLockedLockColor, updateLockLockedLockedLockOpacity, updateLockLockedLockedLockEase, updateLockLockedLockedLockExpand, updateLockLockedLockedLockTravel, updateLockLockedLockedLockTriggers, updateLockLockedLockedContent, updateLockLockedLockedUseCSSVars, updateLockLockedLockedLocked, updateLockLockedLockedLockedX, updateLockLockedLockedLockedY, updateLockLockedLockedLockedRadius, updateLockLockedLockedLockedBorderWidth, updateLockLockedLockedLockedColor, updateLockLockedLockedLockedOpacity, updateLockLockedLockedLockedEase, updateLockLockedLockedLockedExpand, updateLockLockedLockedLockedTravel, updateLockLockedLockedLockedTriggers, updateLockLockedLockedLockedLockClass, updateLockLockedLockedLockedLockColor, updateLockLockedLockedLockedLockOpacity, updateLockLockedLockedLockedLockEase, updateLockLockedLockedLockedLockExpand, updateLockLockedLockedLockedLockTravel, updateLockLockedLockedLockedLockTriggers, updateLockLockedLockedLockedContent, updateLockLockedLockedLockedUseCSSVars, updateLockLockedLockedLockedLocked, updateLockLockedLockedLockedLockedX, updateLockLockedLockedLockedLockedY, updateLockLockedLockedLockedLockedRadius, updateLockLockedLockedLockedLockedBorderWidth, updateLockLockedLockedLockedLocked,
    locky,
  // Rule out Firefox, even though it technically supports CSSvars.
  // const cssVarSupport = window.CSS && window.CSS.supports && window.CSS.supports('transform', 'rotate(calc(1*1rad))')

  const defaultConfig = {
    /** Replace document cursor. Not recommended to set to 'none' */
    cursor: 'crosshair',

    /** Size of your RETICOOL */
    radius: 80,

    /** Border width around your RETICOOL */
    borderWidth: 3,

    /** The default color of your RETICOOL */
    color: '#49D292',

    /** The default opacity of your RETICOOL */
    opacity: 0.85,

    /**
       * Easing of your RETICOOL.
       * The lower the number the slow the RETICOOL will move
       * Recommended to keep this below 0.6 to avoid visual glitches
       */
    ease: 0.2,

    /** Selectors to trigger RETICOOL locking automatically on specific elements */
    lockTriggers: '[data-lock], a, button, .draggable',

    /** Your RETICOOL color when locked */
    lockColor: '#E8F79A',

    /** Your RETICOOL opacity when locked */
    lockOpacity: 0.99,

    /** A class added to your RETICOOL when locked */
    lockClass: null,

    /** Amount your RETICOOL will travel around the locked point */
    lockTravel: 0.15,

    /**
       * Expand your RETICOOL over the element it locks to.
       * Set to `false` to disable expansion,
       * Set to `0` to fit the element exactly
       * Set to any other number, including negative to expand by that many pixels around the element
       */
    lockExpand: 20,

    /** How fast your RETICOOL changes sizes */
    lockEase: 0.3,

    /**
       * What should appear inside your RETICOOL.
       * You can inject custom HTML for styling, an SVG or IMG, or set it to null for no center
       */
    content: '+',

    /** Use CSS Vars to power your RETICOOL, if supported */
    useCSSVars: true,
  }

  const config = Object.assign({}, defaultConfig, opts)

  const x = lx = _x = x || window.innerWidth / 2
  const y = ly = _y = y || window.innerHeight / 2

  init()

  // Helper functions

  function ease(current, target, ease) { return current + (target - current) * ease }

  const ep = Element.prototype
  const matchFn
        = ep.matches
        || ep.matchesSelector
        || ep.msMatchesSelector
        || ep.webkitMatchesSelector

  function matches(el, match) { return matchFn && matchFn.call(el, match) }

  function throttle(func, delay) {
    let timer = null

    return function () {
      const context = this; const args = arguments

      if (timer === null) {
        timer = setTimeout(() => {
          func.apply(context, args)
          timer = null
        }, delay)
      }
    }
  }

  /* ////////////////////////////////////////////////////////////////////////// */

  magicMouse = {

    /** Private vars from here on out */
    width: 0,
    height: 0,
    dx: 0,
    dy: 0,
    timestamp: null,

    init() {
      if (styles) {
        document.head.insertAdjacentHTML('afterbegin', styles)
        styles = null
      }

      if (config.cursor)
        document.documentElement.style.cursor = config.cursor

      /* Element Creation */
      const $ = document.createElement('div')
      $.className = 'RETICOOL'
      setColor(config.color, config.opacity)

      const $c = document.createElement('div')
      $c.className = 'RETICOOL__circle'
      $c.style.width = `${config.radius}px`
      $c.style.height = `${config.radius}px`
      $c.style.borderRadius = `${config.radius}px`
      $c.style.borderWidth = `${config.borderWidth}px`

      const $i = document.createElement('div')
      $i.className = 'RETICOOL__inner'
      $i.innerHTML = config.content

      $c.appendChild($i)
      $.appendChild($c)

      const onUpdate = onUpdate || updateStyle

      // if (config.useCSSVars && cssVarSupport)
      activateCSSVars()

      const timestamp = Date.now()

      /* Bind all methods to instance */
      for (const key in this) {
        if (this[key] && this[key].bind)
          this[key] = this[key].bind(this)
      }

      /* Throttle expensive events */
      scrollUnlock = throttle(unlock, 100)
      onHover = throttle(onHover, 100)

      attach()
      update()
    },

    events(remove) {
      const action = `${remove ? 'remove' : 'add'}EventListener`

      /* Event Listeners */
      document[action]('mousemove', onMove)
      document[action]('touchstart', onMove)
      document[action]('touchmove', onMove)
      document[action]('touchend', onMove)
      if (!opts.content)
        document[action]('keydown', changeSymbol)

      document.documentElement[action]('mousedown', onDown)
      document.documentElement[action]('touchstart', onDown)
      document.documentElement[action]('mouseup', onUp)
      document.documentElement[action]('touchend', onUp)

      window[action]('scroll', scrollUnlock)
    },

    attach() {
      events()
      document.body.appendChild($)
    },

    destroy() {
      events(true)
      $.parentNode.removeChild($)
    },

    setColor(color, opacity) {
      $.style.color = color
      $.style.opacity = opacity
    },

    onDown() { down = true },
    onUp() { down = false },

    onMove(e) {
      e = e.touches ? e.touches[0] : e
      _x = e.clientX
      _y = e.clientY
      onHover(e)
    },

    onHover(e) {
      if (config.lockTriggers) {
        let t = e.target
        if (t !== lockTarget) {
          while (t !== document.documentElement && t.parentNode) {
            if (matches(t, config.lockTriggers)) {
              lock(t)
              return
            }
            t = t.parentNode
          }

          if (lockTarget)
            unlock()
          lockTarget = null
        }
      }
    },

    update() {
      requestAnimationFrame(update)

      let tx = _x
      let ty = _y
      let w; let h; let now; let dt; let dx; let dy

      if (locked && lockx && locky) {
        tx = (lockx) - (lockx - tx) * config.lockTravel
        ty = (locky) - (locky - ty) * config.lockTravel
      }

      x = ease(x, tx, config.ease)
      y = ease(y, ty, config.ease)

      if (locked) {
        rotation = 0
        dx = 0
        dy = 0
      }
      else {
        dx = (x - lx)
        dy = (y - ly)
      }

      dx = Math.floor(ease(dx, dx, config.ease) * 100) / 100
      dy = Math.floor(ease(dy, dy, config.ease) * 100) / 100

      // Calculate Velocity
      now = Date.now()
      dt = now - timestamp
      timestamp = now
      vx = Math.min(Math.abs(dx) / dt, 2)
      vy = Math.min(Math.abs(dy) / dt, 2)

      rotation = (locked ? 0 : Math.atan2(dy, dx))

      w = lockWidth || config.radius
      h = lockHeight || config.radius
      if (down) { w -= 10; h -= 10 }

      width = Math.round(ease(width, w, config.lockEase) * 10) / 10
      height = Math.round(ease(height, h, config.lockEase) * 10) / 10

      lx = x
      ly = y

      onUpdate(this)
    },

    activateCSSVars() {
      $.style.transform
        = 'translate( calc( var(--dx) * -1px ), calc( var(--dy) * -1px ) )'
        + ' translate3d( calc( var(--x) * 1px ), calc( var(--y) * 1px ), 0px )'

      $c.style.transform
        = 'translate3d( -50%, -50%, 0px )'
        + ' translate( calc( var(--vx) * -4% ), calc( var(--vy) * -4% ) )'
        + ' rotate( calc( var(--rotation) * 1rad) )'
        + ' scaleX( calc( var(--vx)/2 + var(--vy)/2 + 1 ) )'

      $c.style.width = 'calc( var(--width) * 1px )'
      $c.style.height = 'calc( var(--height) * 1px )'

      $i.style.transform = 'translate(-50%, -50%) rotate(calc( var(--rotation) * -1rad) '

      onUpdate = updateCSSVars
    },

    updateCSSVars() {
      $.style.setProperty('--width', width)
      $.style.setProperty('--height', height)
      $.style.setProperty('--x', x)
      $.style.setProperty('--y', y)
      $.style.setProperty('--vx', vx)
      $.style.setProperty('--vy', vy)
      $.style.setProperty('--dx', dx)
      $.style.setProperty('--dy', dy)
      $.style.setProperty('--rotation', rotation)
    },

    updateStyle() {
      $.style.transform = `translate3d(${
          x + (dx * -1)}px,${
          y + (dy * -1)}px, 0px)`

      $c.style.transform
        = `translate3d(${-50 - (vx * 4)}%, ${-50 - (vy * 4)}%, 0px)`
        + ` rotate(${rotation}rad)`
        + ` scaleX(${vx / 2 + vy / 2 + 1})`

      $i.style.transform = `translate(-50%, -50%) rotate(${-rotation}rad)`

      $c.style.width = `${width}px`
      $c.style.height = `${height}px`
    },

    changeSymbol(e) {
      const getRandomInt = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
      const symbols = ['+', '[ &nbsp; &nbsp; ]', '❪ &nbsp; ❫', '❮ &nbsp; ❯', '⎔', '▿', '•', '△', '▽', '✕', '◇', '⏚', '⏛']

      innerHTML = symbols[getRandomInt(0, symbols.length - 1)]
    },

    lock(x, y, w, h) {
      if (x !== undefined) {
        locked = true
        setColor(config.lockColor, config.lockOpacity)
        if (config.lockClass)
          $.classList.add(config.lockClass)

        if (y == undefined && x.getBoundingClientRect()) {
          lockTarget = x

          const rect = x.getBoundingClientRect()
          w = Math.round(rect.right - rect.left)
          h = Math.round(rect.bottom - rect.top)

          x = rect.left + (w / 2)
          y = rect.top + (h / 2)

          down = false
        }

        lockx = x
        locky = y

        if (config.lockExpand !== false) {
          lockWidth = w + config.lockExpand
          lockHeight = h + config.lockExpand
        }

        return
      }
      unlock()
    },

    unlock() {
      if (locked) {
        if (config.lockClass)
          $.classList.remove(config.lockClass)
        lx = x
        ly = y
        setColor(config.color, config.opacity)
      }
      lockWidth = 0
      lockHeight = 0
      lockx = 0
      locky = 0
      rotation = 0
      locked = false
    },

  }

  Object.defineProperties(
    RETICOOL.prototype,
    {
      innerHTML: {
        get() {
          return config.content
        },
        set(val) {
          config.content = val
          if ($i)
            $i.innerHTML = val
          return val
        },
      },
    })

  return { init }
}
