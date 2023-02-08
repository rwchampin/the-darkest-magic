import * as THREE from 'three'
import MoverParticle from '~~/particles/MoverParticle'

export const useMover = () => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "moverCanvas")
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const ctx = canvas.getContext("2d");
    const total = 1;
    const particles = [];
    const particle = new MoverParticle()

}