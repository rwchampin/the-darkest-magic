import * as THREE from "three";
import chalk from "chalk";
import gsap from "gsap";
import { useIdle, usePageLeave } from "@vueuse/core";
import chroma from "~~/assets/libs/chroma";

interface RenderFN {
   type: string;
}
export const useTick = () => {

    const pause = gsap.ticker.pause;
    const resume = gsap.ticker.resume;
    const stop = gsap.ticker.stop;
    const changeFPS = (fps) =>  gsap.ticker.fps(fps);

    const add = gsap.ticker.add;

    return {
        pause,
        resume,
        stop,
        changeFPS,
        add,
    };
}