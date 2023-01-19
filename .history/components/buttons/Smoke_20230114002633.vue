<template>
  <button class="button smoke dark">
    Smoke
  </button>

  <style scoped>
    .button.dark {
    --background: #2F3545;
    --shadow: 0 2px 8px -1px rgba(21, 25, 36, 0.32);
    --shadow-hover: 0 4px 20px -2px rgba(21, 25, 36, 0.5);
    }

    .button.white {
    --background: #fff;
    --text: #275efe;
    --shadow: 0 2px 8px -1px rgba(18, 22, 33, 0.04);
    --shadow-hover: 0 4px 20px -2px rgba(18, 22, 33, 0.12);
    }

    .button {
    --background: #275efe;
    --text: #fff;
    --font-size: 16px;
    --duration: .5s;
    --move-hover: -4px;
    --shadow: 0 2px 8px -1px rgba(39, 94, 254, 0.32);
    --shadow-hover: 0 4px 20px -2px rgba(39, 94, 254, 0.5);
    padding: 16px 32px;
    font-family: "Roboto";
    font-weight: 500;
    line-height: var(--font-size);
    border-radius: 24px;
    display: block;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-size: var(--font-size);
    letter-spacing: 0.5px;
    background: var(--background);
    color: var(--text);
    box-shadow: var(--shadow);
    transform: translateY(var(--y));
    transition: transform var(--duration) ease, box-shadow var(--duration) ease;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    }

    .button div {
    display: flex;
    }

    .button div span {
    display: block;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    font-style: normal;
    }

    .button div span:nth-child(1) {
    --d: 0.05s;
    }

    .button div span:nth-child(2) {
    --d: 0.1s;
    }

    .button div span:nth-child(3) {
    --d: 0.15s;
    }

    .button div span:nth-child(4) {
    --d: 0.2s;
    }

    .button div span:nth-child(5) {
    --d: 0.25s;
    }

    .button div span:nth-child(6) {
    --d: 0.3s;
    }

    .button div span:nth-child(7) {
    --d: 0.35s;
    }

    .button div span:nth-child(8) {
    --d: 0.4s;
    }

    .button div span:nth-child(9) {
    --d: 0.45s;
    }

    .button div span:nth-child(10) {
    --d: 0.5s;
    }

    .button div span:nth-child(11) {
    --d: 0.55s;
    }

    .button:hover {
    --y: var(--move-hover);
    --shadow: var(--shadow-hover);
    --move: -4px;
    --shadow-active: 0 3px 1px rgba(0, 0, 0, .2);
    }

    .button:hover span {
    -webkit-animation: move var(--duration) linear var(--d);
    animation: move var(--duration) linear var(--d);
    }

    .button.smoke {
    --move: 12px;
    --move-y: -8px;
    --blur: 4px;
    }

    .button.smoke:hover span {
    --duration: 1s;
    -webkit-animation: smoke var(--duration) linear var(--d);
    animation: smoke var(--duration) linear var(--d);
    }

    @-webkit-keyframes move {
    40% {
    transform: translateY(var(--move));
    text-shadow: var(--shadow-active);
    }
    }

    @keyframes move {
    40% {
    transform: translateY(var(--move));
    text-shadow: var(--shadow-active);
    }
    }

    @-webkit-keyframes smoke {

    45%,
    55% {
    filter: blur(var(--blur));
    }

    50%,
    50.1% {
    opacity: 0;
    }

    25%,
    75% {
    transform: translateX(0);
    }

    50% {
    transform: translateX(var(--move)) translateY(var(--move-y));
    }

    50.1% {
    transform: translateX(calc(var(--move) * -1));
    }
    }

    @keyframes smoke {

    45%,
    55% {
    filter: blur(var(--blur));
    }

    50%,
    50.1% {
    opacity: 0;
    }

    25%,
    75% {
    transform: translateX(0);
    }

    50% {
    transform: translateX(var(--move)) translateY(var(--move-y));
    }

    50.1% {
    transform: translateX(calc(var(--move) * -1));
    }
    }
  </style>
</template></button>
