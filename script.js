const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Snake Game Variables 
canvas = document.getElementById('gameCanvas');
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
    food.x = Math.floor(Math.random() * canvas.width / gridSize);
    food.y = Math.floor(Math.random() * canvas.height / gridSize);
}

// Check for Collisions (Wall and Self)
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / gridSize ||
        head.y < 0 || head.y >= canvas.height / gridSize) {
        // Snake hit the wall
        // Handle game over logic here
        console.log('Game Over! Wall collision.');
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            // Snake collided with itself
            // Handle game over logic here
            console.log('Game Over! Self collision.');
        }
    }
}

// Draw Snake and Food
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw Snake
    snake.forEach(segment => {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
    // Draw Food
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Handle Keyboard Input
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            dx = 0;
            dy = -1;
            break;
        case 'ArrowDown':
            dx = 0;
            dy = 1;
            break;
        case 'ArrowLeft':
            dx = -1;
            dy = 0;
            break;
        case 'ArrowRight':
            dx = 1;
            dy = 0;
            break;
    }
});

// Start the New Game
generateFood();
gameLoop();

