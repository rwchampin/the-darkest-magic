<template>
  /***
  **   Responds to mousemoves / touchswipes.
  **  Click / Tap && hold to repel, release for bounce back.
  **  If on a small/mobile screen, reduce 'this.num'
  **  val in JS to ~200 for best experience (less clutter).
  **/

  <canvas id="canv" />
  <h1>GloppyGoop</h1>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="goop">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -9" />
      </filter>
    </defs>
  </svg>
</template>
