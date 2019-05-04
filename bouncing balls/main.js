// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
    return 'rgb(' +
        random(0, 255) + ', ' +
        random(0, 255) + ', ' +
        random(0, 255) + ')';
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -this.velX;
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -this.velX;
    }

    if ((this.y + this.size) >= height) {
        this.velY = -this.velY;
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;

    // console.log('x : ' + this.x + ' y : ' + this.y);
}

Ball.prototype.collisionDetect = function (allBalls) {
    for (let j = 0; j < allBalls.length; j++) {
        if (this !== allBalls[j]) {
            const dx = this.x - allBalls[j].x;
            const dy = this.y - allBalls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + allBalls[j].size) {
                allBalls[j].color = this.color = randomColor();
            }
        }
    }
}

const BALL_MAX_SPEED = 10;
const BALL_MAX_NUMBER = 25;
let balls = [];

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < BALL_MAX_NUMBER) {
        const size = random(10, 20);
        const ball = new Ball(
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-BALL_MAX_SPEED, BALL_MAX_SPEED),
            random(-BALL_MAX_SPEED, BALL_MAX_SPEED),
            randomColor(),
            size
        );
        balls.push(ball);
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].checkBounds();
        balls[i].collisionDetect(balls);
    }

    requestAnimationFrame(loop);
}


loop();