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
