function BlackHole(x, y, velX, velY, size) {
    Shape.call(this, x, y, velX, velY, size);
}

BlackHole.prototype = Object.create(Shape.prototype);
BlackHole.prototype.constructor = BlackHole;


BlackHole.prototype.draw = function () {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
};

BlackHole.prototype.checkBounds = function () {

    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }

};

BlackHole.prototype.setControls = function () {
    window.onkeydown = e => {
        switch (e.key) {
            case 'ArrowLeft':
                this.x -= this.velX;
                break;
            case 'ArrowRight':
                this.x += this.velX;
                break;
            case 'ArrowUp':
                this.y -= this.velY;
                break;
            case 'ArrowDown':
                this.y += this.velY;
                break;
        }
    };
};


BlackHole.prototype.collisionDetect = function (balls) {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exist) {
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                balls[j].exist = false;
            }
        }
    }
};

