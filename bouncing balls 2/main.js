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


let balls = [];
const BALL_MAX_SPEED = 10;
const BALL_MAX_NUMBER = 25;

const blackHole = new BlackHole(10, 10, 10, 10, 10);
blackHole.setControls();

while (balls.length < BALL_MAX_NUMBER) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-BALL_MAX_SPEED, BALL_MAX_SPEED),
        random(-BALL_MAX_SPEED, BALL_MAX_SPEED),
        true,
        size,
        randomColor(),
    );
    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exist) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect(balls);
        }
    }

    blackHole.draw();
    blackHole.checkBounds();
    blackHole.collisionDetect(balls);

    requestAnimationFrame(loop);
}

loop();

