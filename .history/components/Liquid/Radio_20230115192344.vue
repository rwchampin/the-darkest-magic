<template>
  <label class="checkbox">
    <input type="checkbox" checked>
    <svg viewBox="0 0 24 24" filter="url(#goo-light)">
      <path class="tick" d="M4.5 10L10.5 16L24.5 1" />
      <circle class="dot" cx="10.5" cy="15.5" r="1.5" />
    </svg>
  </label>
</template>

<style scoped>
:root {
    --c-active: #275EFE;
    --c-active-inner: #FFFFFF;
    --c-default: #D2D6E9;
    --c-default-dark: #C7CBDF;
    --c-black: #1B1B22;
}

.radio,
.checkbox,
.switch {
    display: table;
    border-radius: var(--border-radius, 12px) var(--border-radius-corner, 12px) var(--border-radius, 12px) var(--border-radius, 12px);
    position: relative;
}

.radio input,
.checkbox input,
.switch input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    background: var(--input-background, none);
    display: block;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border-radius: inherit;
    width: var(--input-width, 24px);
    height: var(--input-height, 24px);
}

.radio svg,
.checkbox svg,
.switch svg {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    pointer-events: none;
    fill: var(--c-active-inner);
    transform: scale(1.01) translateZ(0);
}

.checkbox {
    --border-radius: 5px;
    --border-radius-corner: 5px;
}

.checkbox input:checked {
    --border-width: 12px;
}

.checkbox input:checked+svg {
    --tick-offset: 46.5px;
}

.checkbox input+svg {
    --dot-x: 14px;
    --dot-y: -14px;
    --dot-s: 1;
    --tick-offset: 20.5px;
    --tick-array: 16.5px;
    --tick-s: 1;
    --drop-s: 1;
}

.checkbox input+svg .tick {
    fill: none;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: var(--c-active-inner);
    stroke-dasharray: var(--tick-array) 33px;
    stroke-dashoffset: var(--tick-offset);
    transform-origin: 10.5px 16px;
    transform: scale(var(--tick-s)) translateZ(0);
}

.checkbox input+svg .dot {
    transform-origin: 10.5px 15.5px;
    transform: translate(var(--dot-x), var(--dot-y)) scale(var(--dot-s)) translateZ(0);
}

.checkbox input+svg .drop {
    transform-origin: 25px -1px;
    transform: scale(var(--drop-s)) translateZ(0);
}
</style>
