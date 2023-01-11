export class Star {
    constructor(x, y) {
        this.material = new THREE.LineBasicMaterial();
        this.geometry = new THREE.Instanced
        this.pos = new THREE.Vector2(x, y);
        this.prevPos = new THREE.Vector2(x, y);

        this.velocity = new THREE.Vector2(x, y);

        this.angle = Math.atan(y - window.innerHeight / 2, x - window.innerWidth / 2);
    }

    init() {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(this.pos);
        geometry.vertices.push(this.prevPos);
        this.line = new THREE.Line(geometry, this.material);
        scene.add(this.line);
    }

    update(acc) {
        this.velocity.x *= Math.cos(this.angle) * acc;
        this.velocity.y *= Math.sin(this.angle) * acc;

        this.prevPos.x = this.pos.x
        this.prevPos.y = this.pos.y

        this.pos.x *= this.vel.x
        this.pos.y *= this.vel.y
    }

    isActive() {
        return onScreen(this.prevPos.x, prevPos.y);
        this.pos.x > 0 && this.pos.x < window.innerWidth && this.pos.y > 0 && this.pos.y < window.innerHeight;
    }

    draw() {
        const alpha = map(this.velocity.x, 0, window.innerWidth, 0, 1);
        const acc = map(mouse.x, 0, window.innerWidth, 0.005, 0.2);
        stars.filter((star) => {
            star.draw();
            star.update(acc);
            return star.isActive();
        });

        while (stars.length < numStars) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            console.log(x, y);
            stars.push(new Star(x, y));
        }
    }
}