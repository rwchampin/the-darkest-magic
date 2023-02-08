import * as THREE from 'three'
import MoverParticle from '~~/particles/MoverParticle'

export const useMover = () => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "moverCanvas")
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    const h = window.innerHeight
    const w = window.innerWidth

    const ctx = canvas.getContext("2d");
    const total = 1;
    const particles = [];

    for (let i = 0; i < total; i++) {
        const p = new MoverParticle(Math.random() * w/2, Math.random() * h/2, ctx);
        ctx.beginPath();
        ctx.arc(p.x, p.y,p.radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.arc(p.projX, p.projY, m * particleRad, 0, 1.5 * Math.PI, false);

    }

}