// Snake Game Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20; // Size of each grid cell
const snakeColor = 'green';
const foodColor = 'red';

// Snake Initial State
let snake = [{ x: 5, y: 5 }]; // Snake starts at position (5, 5)
let dx = 1; // Initial movement direction (right)
let dy = 0;
let food = { x: 10, y: 10 }; // Initial food position

// Game Loop
function gameLoop() {
    moveSnake();
    checkCollision();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// Handle Keyboard Input
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (dy !== 1) { // Prevent reverse movement
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

// Start the New Game
generateFood();
gameLoop();

// Handle Snake Movement
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head); // Add new head
    if (head.x === food.x && head.y === food.y) {
        // Snake ate the food
        generateFood();
    } else {
        snake.pop(); // Remove tail
    }
}

// Generate Random Food Position
function generateFood() {
    // Ensure food doesn't overlap with snake
    do {
        food.x = Math.floor(Math.random() * (canvas.width / gridSize));
        food.y = Math.floor(Math.random() * (canvas.height / gridSize));
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

// Check for Collisions (Wall and Self)
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / gridSize ||
        head.y < 0 || head.y >= canvas.height / gridSize) {
        // Snake hit the wall
        gameOver('Wall collision');
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            // Snake collided with itself
            gameOver('Self collision');
        }
    }
}


// Game Over Logic
function gameOver(reason) {
    console.log(`Game Over! ${reason}`);
    // Display a game over message on the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 60, canvas.height / 2 - 12);
    ctx.fillText(`Reason: ${reason}`, canvas.width / 2 - 100, canvas.height / 2 + 12);
    // Add any additional game over actions (e.g., reset the game)
}

// ... (Rest of the code remains unchanged)


