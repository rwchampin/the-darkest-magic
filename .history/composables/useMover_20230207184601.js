import * as THREE from 'three'
import MoverParticle from '~~/particles/MoverParticle'

export const useMover = () => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "moverCanvas")
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    canvas.classList.add("canvas-ui")
    const h = window.innerHeight
    const w = window.innerWidth
    document.body.appendChild(canvas)
    const ctx = canvas.getContext("2d");
    const total = 1;
    const particles = [];

    for (let i = 0; i < total; i++) {
        const p = new MoverParticle({
            _x: Math.random() * w / 2,
            _y: Math.random() * h / 2,
            _ctx: ctx
        });
        p.draw();

    }

}