import { createSharedComposable } from "@vueuse/core";
import { Canvas2d,Canvas3d } from "./canvasTypes";

    if(window && globalThis.debug) {
    //** init timer */
    console.time("waiting for window to load");
  }


interface CanvasReturnReferences {
 canvas2dClass: string;
  canvas3dClass: string;
}
let loaded = false;
let canvas2dClass = ref(null);
let canvas3dClass = ref(null);
const useCanvasFN = () => {
  if (loaded) return;

  return {
    Canvas2d,
    Canvas3d,
  };

};

const useCanvas = createSharedComposable(useCanvasFN);

export { useCanvas };