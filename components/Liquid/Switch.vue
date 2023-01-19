<!-- <template>
  <label class="switch">
    <input type="checkbox" checked>
    <svg viewBox="0 0 38 24" filter="url(#goo)">
      <circle class="default" cx="12" cy="12" r="8" />
      <circle class="dot" cx="26" cy="12" r="8" />
      <circle class="drop" cx="25" cy="-1" r="2" />
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

.switch {
    --input-width: 38px;
}

.switch input {
    --input-background: var(--c-default);
}

.switch input:checked {
    --input-background: var(--c-active);
}

.switch input:checked+svg {
    --default-s: 0;
    --default-x: 8px;
    --dot-s: 1;
    --dot-x: 0px;
}

.switch input+svg {
    --input-background: var(--c-default);
    --default-s: 1;
    --default-x: 0px;
    --dot-s: 0;
    --dot-x: -8px;
}

.switch .default {
    transform-origin: 12px 12px;
    transform: translateX(var(--default-x)) scale(var(--default-s)) translateZ(0);
}

.switch .dot {
    transform-origin: 26px 12px;
    transform: translateX(var(--dot-x)) scale(var(--dot-s)) translateZ(0);
}

</style> -->
