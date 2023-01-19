const VectorLib =  {

    createVector: (x, y) =>{
            x,
            y
    },
    getDirection: (vector) => {
        return Math.atan2(vector.y, vector.x);
    },
        getMagnitude: (vector) => {
            return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        },
        setMagnitude: (vector, magnitude) => {
            let direction = this.getDirection(vector);
            vector.x = Math.cos(direction) * magnitude;
            vector.y = Math.sin(direction) * magnitude;
        },
        random2dVector: () => {
            let angle = Math.random() * Math.PI * 2;
            let length = 1;
            return {
                x: Math.cos(angle) * length,
                y: Math.sin(angle) * length
            };
        },
        add: (vector1, vector2) => {
            return {
                x: vector1.x + vector2.x,
                y: vector1.y + vector2.y
            };
        },
        subtract: (vector1, vector2) => {
            return {
                x: vector1.x - vector2.x,
                y: vector1.y - vector2.y
            };
        },
        multiply: (vector, scalar) => {
            return {
                x: vector.x * scalar,
                y: vector.y * scalar
            };
        },
        divide: (vector, scalar) => {
            return {
                x: vector.x / scalar,
                y: vector.y / scalar
            };
        },
        normalize: (vector) => {
            let magnitude = this.getMagnitude(vector);
            return {
                x: vector.x / magnitude,
                y: vector.y / magnitude
            };
        },
        limit: (vector, max) => {
            if (this.getMagnitude(vector) > max) {
                vector = this.normalize(vector);
                vector = this.multiply(vector, max);
            }
            return vector;
        },
        distance: (vector1, vector2) => {
            let dx = vector1.x - vector2.x;
            let dy = vector1.y - vector2.y;
            return Math.sqrt(dx * dx + dy * dy);
        },
        lerp: (vector1, vector2, amount) => {
            return {
                x: vector1.x + (vector2.x - vector1.x) * amount,
                y: vector1.y + (vector2.y - vector1.y) * amount
            };
        },
        angleBetween: (vector1, vector2) => {
            let dot = vector1.x * vector2.x + vector1.y * vector2.y;
            let v1mag = this.getMagnitude(vector1);
            let v2mag = this.getMagnitude(vector2);
            let amt = dot / (v1mag * v2mag);
            if (amt <= -1) {
                return Math.PI;
            } else if (amt >= 1) {
                return 0;
            }
            return Math.acos(amt);
        },
        rotate: (vector, angle) => {
            return {
                x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
                y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle)
            };
        },
        angleTo: (vector1, vector2) => {
            return Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x);
        },
        fromAngle: (angle, length) => {
            return {
                x: Math.cos(angle) * length,
                y: Math.sin(angle) * length
            };
        },
        posToStep: (vector, step) => {
            return {
                x: Math.floor(vector.x / step),
                y: Math.floor(vector.y / step)
            };
        },
        stepToPos: (vector, step) => {
            return {
                x: vector.x * step,
                y: vector.y * step
            };
        },
        posToIndex: (vector, step, cols) => {
            return vector.y * cols + vector.x;
        },
        indexToPos: (index, step, cols) => {
            return {
                x: index % cols,
                y: Math.floor(index / cols)
            };
        },
        posToIndex2: (vector, step, cols) => {
            return vector.x * cols + vector.y;
        },
        indexToPos2: (index, step, cols) => {
            return {
                x: Math.floor(index / cols),
                y: index % cols
            };
        },
        drawLine: (vector1, vector2, color, width) => {
            ctx.beginPath();
            ctx.moveTo(vector1.x, vector1.y);
            ctx.lineTo(vector2.x, vector2.y);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.stroke();
        },
        drawCircle: (vector, radius, color, width) => {
            ctx.beginPath();
            ctx.arc(vector.x, vector.y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.stroke();
        },
        drawRect: (vector, width, height, color, lineWidth) => {
            ctx.beginPath();
            ctx.rect(vector.x, vector.y, width, height);
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        },
        drawRectFill: (vector, width, height, color) => {
            ctx.beginPath();
            ctx.rect(vector.x, vector.y, width, height);
            ctx.fillStyle = color;
            ctx.fill();
        },
        drawText: (vector, text, color, font) => {
            ctx.beginPath();
            ctx.font = font;
            ctx.fillStyle = color;
            ctx.fillText(text, vector.x, vector.y);
        },
        drawImage: (vector, image, width, height) => {
            ctx.beginPath();
            ctx.drawImage(image, vector.x, vector.y, width, height);
        },
        drawImageCenter: (vector, image, width, height) => {
            ctx.beginPath();
            ctx.drawImage(image, vector.x - width / 2, vector.y - height / 2, width, height);
        },
        moveCircle: (vector, radius, color, width, speed) => {
            let angle = this.angleTo(vector, mouse);
            vector = this.add(vector, this.fromAngle(angle, speed));
            this.drawCircle(vector, radius, color, width);
            return vector;
        },
        getAcceleration: (vector, target, speed) => {
            let angle = this.angleTo(vector, target);
            return this.fromAngle(angle, speed);
        }

    }
}