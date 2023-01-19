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
