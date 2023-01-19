export const Vector = {
    createVector: function (x, y) {
        return {
            x: x,
            y: y
        },
    },
    getDirection: function (vector) {
        return Math.atan2(vector.y, vector.x);
    },
    getMagnitude: function (vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    },
    random2dVector: function () {
        let angle = Math.random() * Math.PI * 2;
        let length = 1;
        return {
            x: Math.cos(angle) * length,
            y: Math.sin(angle) * length
        };
    },
    add: function (vector1, vector2) {
        return {
            x: vector1.x + vector2.x,
            y: vector1.y + vector2.y
        };
    },
    subtract: function (vector1, vector2) {
        return {
            x: vector1.x - vector2.x,
            y: vector1.y - vector2.y
        };
    },
    multiply: function (vector, scalar) {
        return {
            x: vector.x * scalar,
            y: vector.y * scalar
        };
    },
    divide: function (vector, scalar) {
        return {
            x: vector.x / scalar,
            y: vector.y / scalar
        };
    },
    normalize: function (vector) {
        let magnitude = this.getMagnitude(vector);
        return {
            x: vector.x / magnitude,
            y: vector.y / magnitude
        };
    },
    limit: function (vector, max) {
        if (this.getMagnitude(vector) > max) {
            vector = this.normalize(vector);
            vector = this.multiply(vector, max);
        }
        return vector;
    },
    distance: function (vector1, vector2) {
        let dx = vector1.x - vector2.x;
        let dy = vector1.y - vector2.y;
        return Math.sqrt(dx * dx + dy * dy);
    },
    lerp: function (vector1, vector2, amount) {
        return {
            x: vector1.x + (vector2.x - vector1.x) * amount,
            y: vector1.y + (vector2.y - vector1.y) * amount
        };
    },
    angleBetween: function (vector1, vector2) {
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
    rotate: function (vector, angle) {
        return {
            x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
            y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle)
        };
    },
    angleTo: function (vector1, vector2) {
        return Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x);
    },
    fromAngle: function (angle, length) {
        return {
            x: Math.cos(angle) * length,
            y: Math.sin(angle) * length
        };
    },
    posToStep: function (vector, step) {
        return {
            x: Math.floor(vector.x / step),
            y: Math.floor(vector.y / step)
        };
    },
    stepToPos: function (vector, step) {
        return {
            x: vector.x * step,
            y: vector.y * step
        };
    },
    posToIndex: function (vector, step, cols) {
        return vector.y * cols + vector.x;
    },
    indexToPos: function (index, step, cols) {
        return {
            x: index % cols,
            y: Math.floor(index / cols)
        };
    },
    posToIndex2: function (vector, step, cols) {
        return vector.x * cols + vector.y;
    },
    indexToPos2: function (index, step, cols) {
        return {
            x: Math.floor(index / cols),
            y: index % cols
        };
    },
    createUnitVector: function (angle) {
        
};

}