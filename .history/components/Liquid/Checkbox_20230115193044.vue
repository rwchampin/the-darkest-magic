<script setup>
import gsap from 'gsap'
const { to, set, from, fromTo } = gsap

const getVar = (key, elem = document.documentElement) => getComputedStyle(elem).getPropertyValue(key)

onMounted(() => {
  document.querySelectorAll('.radio').forEach((elem) => {
    const svg = elem.querySelector('svg')
    const input = elem.querySelector('input')
    input.addEventListener('change', (e) => {
      fromTo(input, {
        '--border-width': '3px',
      }, {
        '--border-color': getVar('--c-active'),
        '--border-width': '12px',
        'duration': 0.2,
      })
      to(svg, {
        keyframes: [{
          '--top-y': '6px',
          '--top-s-x': 1,
          '--top-s-y': 1.25,
          'duration': 0.2,
          'delay': 0.2,
        }, {
          '--top-y': '0px',
          '--top-s-x': 1.75,
          '--top-s-y': 1,
          'duration': 0.6,
        }],
      })
      to(svg, {
        keyframes: [{
          '--dot-y': '2px',
          'duration': 0.3,
          'delay': 0.2,
        }, {
          '--dot-y': '0px',
          'duration': 0.3,
        }],
      })
      to(svg, {
        '--drop-y': '0px',
        'duration': 0.6,
        'delay': 0.4,
        'clearProps': true,
        onComplete() {
          input.removeAttribute('style')
        },
      })
    })
  })

  document.querySelectorAll('.checkbox').forEach((elem) => {
    const svg = elem.querySelector('svg')
    const input = elem.querySelector('input')
    input.addEventListener('change', (e) => {
      const checked = input.checked
      if (!checked)
        return

      fromTo(input, {
        '--border-width': '3px',
      }, {
        '--border-color': getVar('--c-active'),
        '--border-width': '12px',
        'duration': 0.2,
        'clearProps': true,
      })
      set(svg, {
        '--dot-x': '14px',
        '--dot-y': '-14px',
        '--tick-offset': '20.5px',
        '--tick-array': '16.5px',
        '--drop-s': 1,
      })
      to(elem, {
        keyframes: [{
          '--border-radius-corner': '14px',
          'duration': 0.2,
          'delay': 0.2,
        }, {
          '--border-radius-corner': '5px',
          'duration': 0.3,
          'clearProps': true,
        }],
      })
      to(svg, {
        '--dot-x': '0px',
        '--dot-y': '0px',
        '--dot-s': 1,
        'duration': 0.4,
        'delay': 0.4,
      })
      to(svg, {
        keyframes: [{
          '--tick-offset': '48px',
          '--tick-array': '14px',
          'duration': 0.3,
          'delay': 0.2,
        }, {
          '--tick-offset': '46.5px',
          '--tick-array': '16.5px',
          'duration': 0.35,
          'clearProps': true,
        }],
      })
    })
  })

  document.querySelectorAll('.switch').forEach((elem) => {
    const svg = elem.querySelector('svg')
    const input = elem.querySelector('input')
    input.addEventListener('pointerenter', (e) => {
      if (elem.animated || input.checked)
        return

      to(input, {
        '--input-background': getVar('--c-default-dark'),
        'duration': 0.2,
      })
    })
    input.addEventListener('pointerleave', (e) => {
      if (elem.animated || input.checked)
        return

      to(input, {
        '--input-background': getVar('--c-default'),
        'duration': 0.2,
      })
    })
    input.addEventListener('change', (e) => {
      const checked = input.checked
      const hide = checked ? 'default' : 'dot'
      const show = checked ? 'dot' : 'default'
      fromTo(svg, {
        '--default-s': checked ? 1 : 0,
        '--default-x': checked ? '0px' : '8px',
        '--dot-s': checked ? 0 : 1,
        '--dot-x': checked ? '-8px' : '0px',
      }, {
        [`--${hide}-s`]: 0,
        [`--${hide}-x`]: checked ? '8px' : '-8px',
        duration: 0.25,
        delay: 0.15,
      })
      fromTo(input, {
        '--input-background': getVar(checked ? '--c-default' : '--c-active'),
      }, {
        '--input-background': getVar(checked ? '--c-active' : '--c-default'),
        'duration': 0.35,
        'clearProps': true,
      })
      to(svg, {
        keyframes: [{
          [`--${show}-x`]: checked ? '2px' : '-2px',
          [`--${show}-s`]: 1,
          duration: 0.25,
        }, {
          [`--${show}-x`]: '0px',
          duration: 0.2,
          clearProps: true,
        }],
      })
    })
  })
})
</script>

<template>
  <label class="radio">
    <input type="radio" name="r" value="1" checked>
    <svg viewBox="0 0 24 24" filter="url(#goo-light)">
      <circle class="top" cx="12" cy="-12" r="8" />
      <circle class="dot" cx="12" cy="12" r="5" />
      <circle class="drop" cx="12" cy="12" r="2" />
    </svg>
  </label>
</template>

<style scoped>
.radio input,
.checkbox input {
    --border-color: var(--c-default);
    --border-width: 2px;
    box-shadow: inset 0 0 0 var(--border-width) var(--border-color);
}

.radio input:checked,
.checkbox input:checked {
    --border-color: var(--c-active);
}

.radio input:not(:checked),
.checkbox input:not(:checked) {
    transition: box-shadow 0.25s;
}

.radio input:not(:checked):hover,
.checkbox input:not(:checked):hover {
    --border-width: 3px;
    --border-color: var(--c-active);
}

.radio input:checked {
    --border-width: 6.75px;
}

.radio input+svg {
    --top-y: 0;
    --dot-y: -17px;
    --drop-y: -14px;
    --top-s-x: 1.75;
    --top-s-y: 1;
}

.radio input+svg .top {
    transform-origin: 12px -12px;
    transform: translateY(var(--top-y)) scale(var(--top-s-x), var(--top-s-y)) translateZ(0);
}

.radio input+svg .dot {
    transform: translateY(var(--dot-y)) translateZ(0);
}

.radio input+svg .drop {
    transform: translateY(var(--drop-y)) translateZ(0);
}
</style>
