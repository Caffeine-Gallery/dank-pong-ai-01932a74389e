export function startGame(context) {
    const paddleWidth = 10, paddleHeight = 100;
    const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, score: 0 };
    const ai = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, score: 0 };
    const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speed: 5, velocityX: 5, velocityY: 5 };

    document.addEventListener('keydown', (event) => {
        const rect = canvas.getBoundingClientRect();
        if (event.key === 'ArrowUp' && player.y > 0) {
            player.y -= 10; // Move up
        } else if (event.key === 'ArrowDown' && player.y < canvas.height - player.height) {
            player.y += 10; // Move down
        }
    });

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#00FF00';
        context.fillRect(player.x, player.y, player.width, player.height);
        context.fillRect(ai.x, ai.y, ai.width, ai.height);
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
        context.fillStyle = '#FF0000';
        context.fill();
        context.closePath();
    }

    function update() {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.velocityY = -ball.velocityY;
        }

        const aiLevel = 0.1; // AI skill level
        ai.y += (ball.y - (ai.y + ai.height / 2)) * aiLevel;

        if (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
            ball.velocityX = -ball.velocityX;
        } else if (ball.x + ball.radius > ai.x && ball.y > ai.y && ball.y < ai.y + ai.height) {
            ball.velocityX = -ball.velocityX;
        }

        if (ball.x - ball.radius < 0) {
            ai.score++;
            resetBall();
        } else if (ball.x + ball.radius > canvas.width) {
            player.score++;
            resetBall();
        }

        document.getElementById('playerScore').innerText = player.score;
        document.getElementById('aiScore').innerText = ai.score;
    }

    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.velocityX = -ball.velocityX;
    }

    function gameLoop() {
        draw();
        update();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
