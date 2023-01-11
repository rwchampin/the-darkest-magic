const MAXSIZE = 50;
const MINSIZE = 0;

const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];      
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 60  
}
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})




export function Base(x, y, dirX,dirY, color, size) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.color = color;
    this.size = size;
    this.radius = 50;

    //movement
    this.acceleration = 0.1;
    this.velocity = 0;
    
    }

Base.prototype.draw = function () {  
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}

Base.prototype.update = function () {
    if (this.x + this.size * 2> canvas.width || this.x - this.size * 2 < 0) {
        this.dirX = -this.dirX;
    } elseif(this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
        this.dirY = -this.dirY;

        this.x += this.dirX;
        this.y += this.dirY;

        if (mouse.x - this.x < this.radius && mouse.x - this.x > -this.radius && mouse.y - this.y < this.radius && mouse.y - this.y > -this.radius) {
            if (this.size < MAXSIZE) {
                this.size += 3;
            }
        }
        else if (this.size > MINSIZE) {
            this.size -= .1;
        }
        if (this.size < 0) {
            this.size = 0;
        }
        this.draw();
    }

}


export class Particle extends Base {
    constructor(x, y, dirX, dirY, color, size) {
        super(x, y, dirX, dirY, color, size);
    }
    }

export class ParticleSystem {
    constructor() {
        this.particles = [];
    }
    
    addParticle(particle) {
        this.particles.push(particle);
    }
    
    update() {
        this.particles.forEach(particle => {
        particle.update();
        });
    }
    
    draw() {
        this.particles.forEach(particle => {
        particle.draw();
        });
    }
    }

// Path: particles/Particle.js

// Path: particles/Base.js

// Path: particles/Particle.js


