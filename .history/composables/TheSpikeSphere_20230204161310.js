import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Utils } from '~/utils';
import gsap from 'gsap';
import {useCore} from '~/composables/useCore';
const nuxtApp = useNuxtApp();

const TheSpikeSphereFN = () => {
    onMounted(() => {
const { scene, camera, renderer, ambientLight, spotLight } = useCore();

    });

}

export const TheSpikeSphere = createSharedComposable(TheSpikeSphereFN)