import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Utils } from '~/utils';
import gsap from 'gsap';
import {useCore} from '~/composables/useCore';


const useSpikeSphereFN = () => {
    onMounted(() => {
const { scene, camera, renderer, ambientLight, spotLight } = useCore();
debugger
    });

}

export const useSpikeSphere = createSharedComposable(useSpikeSphereFN)