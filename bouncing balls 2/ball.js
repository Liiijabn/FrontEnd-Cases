function Ball(x, y, velX, velY, exist, size, color) {
    Shape.call(this, x, y, velX, velY, size);
    this.color = color;
    this.exist = exist;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

Ball.prototype.update = function () {

    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;

    // console.log('x : ' + this.x + ' y : ' + this.y);

};

Ball.prototype.collisionDetect = function (balls) {
    for (let j = 0; j < balls.length; j++) {
        if (this !== balls[j]) {
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
            }
        }
    }
};