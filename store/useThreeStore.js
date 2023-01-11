// import { acceptHMRUpdate, defineStore } from "pinia";
// import { shallowRef } from "vue";
// import chalk from "chalk";

// import {
//   createSharedComposable,
//   useWindowSize,
//   useDevicePixelRatio,
// } from "@vueuse/core";

// export const useThreeStore = createSharedComposable(() => {
//   const { width, height } = useWindowSize();
//   const pixelRatio = useDevicePixelRatio();

//   const loaded = ref(false);
//   return defineStore("three", () => {
//     if (loaded.value) {
//       console.log(chalk.green.bgBlack("useThreeStore: returned from cache"));
//       return;
//     }
//     console.log(chalk.green.bgBlack("useThreeStore: created new instance"));

//     // THREE.js OBJECTS
//     const distanceFar = ref(1000);
//     const distanceNear = ref(0);
//     const skyColor = new THREE.Color(0xb1e1ff);
//     skyColor.convertLinearToSRGB(); // light blue
//     const groundColor = new THREE.Color(0xb97a20);
//     groundColor.convertLinearToSRGB(); // brownish orange
//     const intensity = ref(2);
//     const fov = ref(75);
//     const hemisphereLight = shallowRef(
//       new THREE.HemisphereLight(skyColor, groundColor, intensity.value)
//     );

//     const ambientLight = shallowRef(new THREE.AmbientLight(0xffffff, 0.5));
//     const scene = shallowRef(new THREE.Scene());
//     const fog = ref(
//       new THREE.Fog(0x000000, distanceNear.value, distanceFar.value)
//     );
//     scene.value.fog = fog.value;

//     const aspect = width.value / height.value;
//     const name = ref("IntroCamera");
//     const castShadow = ref(true);
//     const receiveShadow = ref(true);
//     const camera = shallowRef(
//       new THREE.PerspectiveCamera(
//         fov.value,
//         aspect,
//         distanceNear.value,
//         distanceFar.value
//       )
//     );
//     camera.value.name = name.value;
//     camera.value.castShadow = castShadow.value;
//     camera.value.receiveShadow = receiveShadow.value;
//     const renderer = shallowRef(
//       new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true,
//         powerPreference: "high-performance",
//         pixelRatio: pixelRatio.value,
//         name: "intro-renderer",
//         shadowMap: {
//           enabled: true,
//           type: THREE.PCFSoftShadowMap,
//         },
//       })
//     );
//     scene.value.add(ambientLight.value, hemisphereLight.value);
//     renderer.value.shadowMap.enabled = true;
//     renderer.value.setSize(width.value, height.value);
//     renderer.value.physicallyCorrectLights = true;
//     renderer.value.outputEncoding = THREE.sRGBEncoding;
//     renderer.value.shadowMap.type = THREE.VSMShadowMap;
//     renderer.value.shadowMap.autoUpdate = false;
//     renderer.value.shadowMap.needsUpdate = true;
//     renderer.value.domElement.setAttribute("id", "intro-canvas");
//     console.log(chalk.blue.bgRed.bold("CANVAS LOADED"));

//     return {
//       scene,
//       camera,
//       renderer,
//       hemisphereLight,
//     };
//   });
// });

// // make sure to pass the right store definition, `useAuth` in this case.
// if (import.meta.hot)
//   import.meta.hot.accept(acceptHMRUpdate(useThreeStore, import.meta.hot));
