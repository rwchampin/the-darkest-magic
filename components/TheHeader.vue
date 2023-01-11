<template>
  <header class="the-header rounded">
    <n-grid x-gap="12" :cols="4">
      <n-gi>
        <TheColorModeSwitch />
      </n-gi>
      <n-gi />
      <n-gi />
      <n-gi>
        <TheHamburger />
      </n-gi>
    </n-grid>
  </header>
</template>

<style>
.n-grid div {
  background: grey;
}
header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 95vw;
  left: 50%;
  top: 2.5vw;
  transform: translateX(-50%);
  height: var(--header-height);
  box-shadow: var(--shadow-1);
  z-index: 1000;
  background: var(--gradient-16);
  border-radius: var(--radius-3);
}

.spacer {
  flex: 1;
}
</style>
