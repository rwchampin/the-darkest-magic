// import * as THREE from "three";
// import chalk from "chalk";
// import gsap from "gsap";
// import { useIdle, usePageLeave } from "@vueuse/core";

// const { idle, lastActive } = useIdle(5 * 60 * 1000);
// const isLeft = usePageLeave();

// let instance = null;
// export class Ticker {
//   constructor() {
//     if (instance) {
//       console.log(chalk.green.bgBlack("OLD Ticker instance returned"));
//       return instance;
//     }
//     console.log(chalk.green.bgBlack("NEW Ticker created"));
//     instance = this;

//     this.callbacks = [];
//     this.clock = new THREE.Clock();
//     this.time = 0;
//     this.deltaTime = 0;
//     this.elapsedTime = 0;
//     this.tick = this.tick.bind(this);

//     this.init();
//   }

//   init() {
//     if (isLeft.value || idle.value) {
//       gsap.ticker.fps(0);
//     } else {
//       gsap.ticker.fps(60);
//     }

//     gsap.ticker.add(this.tick);
//   }

//   add(callback) {
//     this.callbacks.push(callback);
//   }

//   remove(callback) {
//     this.callbacks = this.callbacks.filter((cb) => cb !== callback);
//   }

//   tick() {
//     this.time = this.clock.getElapsedTime();
//     this.deltaTime = this.clock.getDelta();
//     this.elapsedTime += this.deltaTime;

//     this.callbacks.forEach((cb) => cb(this.deltaTime, this.elapsedTime));
//   }
// }
