// import { Utils } from "~~/utils/Utils.js";
// import { usePlane, useSphere, useRayCaster } from "~~/geometries/";
// import { useCanvas  } from "~/composables/useCanvas";
// import {
//   createSharedComposable,
//   useElementBounding,
//   useElementByPoint,
//   useEventListener,
//   usePointer,
// } from "@vueuse/core";

// let canvas2d = null;
// let canvas3d = null;
// let instance = null;
// export const useMagicMouse = createSharedComposable((nuxtApp) => {
//   if (instance) return instance;

//   // const { ctx } = useCanvas2d();
//   let xMouse:number,
//     yMouse:number,
//     _x:number,
//     _y:number,
//     lx:number,
//     ly:number,
//     boxStyles:object,
//     $:HTMLDivElement,
//     $c:HTMLDivElement,
//     $i:HTMLDivElement,
//     vx:number,
//     vy:number,
//     lockx:number,
//     locky:number,
//     rotation:number,
//     lockWidth:number,
//     lockHeight:number,
//     down:boolean;
//   let locked:boolean;
//   const cursor = "crosshair";
//   const radius = 40;
//   const bodyType = 1;
//   const borderWidth = 0;
//   const color = "#000000";
//   const opacity = 0.85;
//   const ease = 0.2;
//   const lockTriggers = "[data-lock], a, button, .lock";
//   const lockColor = "#E8F79A";
//   const lockOpacity = 0.99;
//   const lockClass = ".lock";
//   const lockTravel = 0.25;
//   const lockExpand = 0;
//   const lockEase = 0.3;

//   const useCSSVars = false;
//   let width = 0;
//   let height = 0;
//   const dx = 0;
//   const dy = 0;
//   let timestamp = null;
//   let scrollUnlock;
//   let lockTarget;

//   if (nuxtApp.$appStore.debug) {
//     const { x, y } = usePointer({ type: "client" });
//     const { element } = useElementByPoint({ x, y });
//     const bounding = reactive(useElementBounding(element));
//     useEventListener("scroll", bounding.update, true);
//     boxStyles = computed(() => {
//       if (element.value) {
//         return {
//           display: "block",
//           width: `${bounding.width}px`,
//           height: `${bounding.height}px`,
//           left: `${bounding.left}px`,
//           top: `${bounding.top}px`,
//           border: "2px dashed #0A7CFA",
//           transition: "all 0.05s linear",
//         };
//       }
//       return {
//         display: "none",
//       };
//     });
//   }
//   onMounted(() => {
//     [canvas] = useCanvas();
//     lx = _x = x || window.innerWidth / 2;
//     ly = _y = y || window.innerHeight / 2;

//     console.log("TheBaseMouse mounted");
//     init();
//     update();
//   });

//   // MAGICMOUSE.VALID_BODY_TYPES = BODY_TYPES
//   let styles =
//     "<style>.MAGICMOUSE{pointer-events:none;position:fixed;top: 0%;left:0%;will-change:transform;transition: color 0.3s linear,opacity 0.3s linear;font-size: 20px;line-height:100%;white-space:nowrap;z-index:1000;} .MAGICMOUSE__inner{position:absolute;} .MAGICMOUSE__circle{border-style:solid;}</style>";

//   // Rule out Firefox, even though it technically supports CSSvars.

//   let cssVarSupport =
//     CSS && CSS.supports && CSS.supports("transform", "rotate(calc(1*1rad))");

//   // function MAGICMOUSE(opts) {
//   //     if (!(this instanceof MAGICMOUSE))
//   //         return new MAGICMOUSE(opts)

//   //     for (const key in opts) {
//   //         if (opts.hasOwnProperty(key))
//   //             this[key] = opts[key]
//   //     }

//   /* ////////////////////////////////////////////////////////////////////////// */
//   // Helper functions

//   const easeFN = (current, target, ease) => {
//     return current + (target - current) * ease;
//   };

//   const ep = Element.prototype;
//   const matchFn =
//     ep.matches ||
//     ep.matchesSelector ||
//     ep.msMatchesSelector ||
//     ep.webkitMatchesSelector;

//   const matches = (el, match) => {
//     return matchFn && matchFn.call(el, match);
//   };

//   const throttle = (func, delay) => {
//     let timer = null;

//     return function () {
//       const context = this;
//       const args = arguments;

//       if (timer === null) {
//         timer = setTimeout(() => {
//           func.apply(context, args);
//           timer = null;
//         }, delay);
//       }
//     };
//   };

//   const init = () => {
//     if (styles) {
//       document.head.insertAdjacentHTML("afterbegin", styles);
//       styles = null;
//     }

//     if (cursor) document.documentElement.style.cursor = cursor;

//     // CREATE MAIN HTML ELEMENT - THE OUTSIDE WRAPPER
//     // NO STYLES VISULLY APPLIED HERE, INLY THE
//     // CIRCLE AND INNER DIVS ARE STYLED
//     $ = $ || document.createElement("div");
//     $.className = "MAGICMOUSE";
//     setColor(color, opacity);

//     $c = document.createElement("div");
//     $c.className = "MAGICMOUSE__circle";
//     $c.style.width = `${props.radius}px`;
//     $c.style.height = `${props.radius}px`;
//     $c.style.borderRadius = `${props.radius}px`;

//     $c.style.borderWidth = `${props.borderWidth}px`;

//     $c.style.backgroundImage = `${props.background}`;

//     $i = document.createElement("div");
//     $i.className = "MAGICMOUSE__inner";

//     $c.appendChild($i);
//     $.appendChild($c);

//     //onUpdate = onUpdate || updateStyle

//     if (useCSSVars && cssVarSupport) activateCSSVars();

//     timestamp = Date.now();

//     /* Bind all methods to instance */
//     for (const key in this) {
//       if (this[key] && this[key].bind) this[key] = this[key].bind(this);
//     }

//     /* Throttle expensive events */
//     scrollUnlock = throttle(unlock, 100);
//     onHover = throttle(onHover, 100);

//     attach();
//     update();
//   };

//   const events = (remove) => {
//     const action = `${remove ? "remove" : "add"}EventListener`;

//     /* Event Listeners */
//     document[action]("mousemove", onMove);
//     document[action]("touchstart", onMove);
//     document[action]("touchmove", onMove);
//     document[action]("touchend", onMove);

//     document.documentElement[action]("mousedown", onDown);
//     document.documentElement[action]("touchstart", onDown);
//     document.documentElement[action]("mouseup", onUp);
//     document.documentElement[action]("touchend", onUp);

//     window[action]("scroll", scrollUnlock);
//   };

//   const attach = () => {
//     debugger;
//     events();
//   };

//   const destroy = () => {
//     events(true);
//     $.parentNode.removeChild($);
//   };

//   const setColor = (color, opacity) => {
//     $.style.color = color;
//     $.style.opacity = opacity;
//     if ($c) {
//       $c.style.borderColor = color;
//       $c.style.backgroundColor = color;
//     }
//   };

//   const onDown = () => {
//     down = true;
//   };
//   const onUp = () => {
//     down = false;
//   };

//   const onMove = (e) => {
//     debugger;
//     ctx.beginPath();
//     ctx.arc(100, 75, 50, 0, 2 * Math.PI);
//     ctx.stroke();

//     // e = e.touches ? e.touches[0] : e;
//     // _x = e.clientX;
//     // _y = e.clientY;
//     // onHover(e);
//   };

//   const checkContrast = (t) => {
//     console.log("target: ", t.target);
//     const contrast = Utils.color.checkContrast(t.target);
//     // console.log('contrast: ', contrast);
//     if (contrast === "dark") {
//       setColor("#fff", 1);
//     } else {
//       setColor("#000", 1);
//     }
//   };
//   let onHover = (e) => {
//     let t = e.target;
//     if (lockTriggers) {
//       if (t !== lockTarget) {
//         while (t !== document.documentElement && t.parentNode) {
//           if (matches(t, lockTriggers)) {
//             lock(t);
//             return;
//           }
//           t = t.parentNode;
//         }

//         if (lockTarget) unlock();
//         lockTarget = null;
//       }
//     }

//     // checkContrast(e.target)
//   };

//   const update = () => {
//     requestAnimationFrame(update);

//     let tx = _x;
//     let ty = _y;
//     let w;
//     let h;
//     let now;
//     let dt;
//     let dx;
//     let dy;

//     if (locked && lockx && locky) {
//       tx = lockx - (lockx - tx) * lockTravel;
//       ty = locky - (locky - ty) * lockTravel;
//     }

//     xMouse = easeFN(xMouse, tx, ease);
//     yMouse = easeFN(yMouse, ty, ease);

//     if (locked) {
//       rotation = easeFN(rotation, 0, ease * 5);
//       dx = 0;
//       dy = 0;
//     } else {
//       dx = xMouse - lx;
//       dy = yMouse - ly;
//     }

//     dx = Math.floor(easeFN(dx, dx, ease) * 100) / 100;
//     dy = Math.floor(easeFN(dy, dy, ease) * 100) / 100;

//     // Calculate Velocity
//     now = Date.now();
//     dt = now - timestamp;
//     timestamp = now;
//     vx = Math.min(Math.abs(dx) / dt, 2);
//     vy = Math.min(Math.abs(dy) / dt, 2);

//     rotation = locked ? 0 : Math.atan2(dy, dx);

//     w = lockWidth ? lockWidth : radius;
//     h = lockHeight ? lockHeight : radius;
//     if (down) {
//       w -= radius * 0.85;
//       h -= radius * 0.85;
//     }

//     width = Math.round(easeFN(width, w, lockEase) * 10) / 10;
//     height = Math.round(easeFN(height, h, lockEase) * 10) / 10;

//     lx = xMouse;
//     ly = yMouse;

//     updateStyle();
//   };

//   const activateCSSVars = () => {
//     $.style.transform =
//       "translate( calc( var(--dx) * -1px ), calc( var(--dy) * -1px ) )" +
//       " translate3d( calc( var(--x) * 1px ), calc( var(--y) * 1px ), 0px )";

//     $c.style.transform =
//       "translate3d( -50%, -50%, 0px )" +
//       " translate( calc( var(--vx) * -4% ), calc( var(--vy) * -4% ) )" +
//       " rotate( calc( var(--rotation) * 1rad) )" +
//       " scaleX( calc( var(--vx)/2 + var(--vy)/2 + 1 ) )";

//     $c.style.width = "calc( var(--width) * 1px )";
//     $c.style.height = "calc( var(--height) * 1px )";

//     $i.style.transform =
//       "translate(-50%, -50%)" +
//       // + ' translate( calc( var(--dx) * 3% ), calc( var(--dy) * 3% ) )'
//       " rotate(calc( var(--rotation) * -1rad) ";

//     onUpdate = updateCSSVars;
//   };

//   const updateCSSVars = () => {
//     $.style.setProperty("--width", width);
//     $.style.setProperty("--height", height);
//     $.style.setProperty("--x", x);
//     $.style.setProperty("--y", y);
//     $.style.setProperty("--vx", vx);
//     $.style.setProperty("--vy", vy);
//     $.style.setProperty("--dx", dx);
//     $.style.setProperty("--dy", dy);
//     $.style.setProperty("--rotation", rotation);
//   };

//   const updateStyle = () => {
//     $.style.transform = `translate3d(${x + dx * -1}px,${y + dy * -1}px, 0px)`;

//     $c.style.transform =
//       `translate3d(${-50 - vx * 4}%, ${-50 - vy * 4}%, 0px)` +
//       ` rotate(${rotation}rad)` +
//       ` scaleX(${vx / 2 + vy / 2 + 1})`;

//     $i.style.transform = `translate(-50%, -50%) rotate(${-rotation}rad)`;

//     $c.style.width = `${width}px`;
//     $c.style.height = `${height}px`;
//   };

//   const lock = (x, y, w, h) => {
//     if (x !== undefined) {
//       locked = true;
//       setColor(lockColor, lockOpacity);
//       if (lockClass) $.classList.add(lockClass);

//       if (y === undefined && x.getBoundingClientRect()) {
//         lockTarget = x;

//         const rect = x.getBoundingClientRect();
//         w = Math.round(rect.right - rect.left);
//         h = Math.round(rect.bottom - rect.top);

//         x = rect.left + w / 2;
//         y = rect.top + h / 2;

//         down = false;
//       }

//       lockx = x;
//       locky = y;

//       if (lockExpand !== false) {
//         lockWidth = w + lockExpand; // ( lockExpand ? w : radius * 0.4);
//         lockHeight = h + lockExpand; // ( lockExpand ? h : radius * 0.4);
//       }

//       return;
//     }
//     unlock();
//   };

//   const unlock = () => {
//     if (locked) {
//       if (lockClass) $.classList.remove(lockClass);
//       lx = x;
//       ly = y;
//       setColor(color, opacity);
//     }
//     lockWidth = 0;
//     lockHeight = 0;
//     lockx = 0;
//     locky = 0;
//     rotation = 0;
//     locked = false;
//   };
// });
