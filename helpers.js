// HELPER FUNCTIONS

// Define the number of circles and rectangles per level
let levels = {
  easy: {
    circleCount: 5,
    rectCount: 3,
  },
  medium: {
    circleCount: 8,
    rectCount: 5,
  },
  hard: {
    circleCount: 10,
    rectCount: 7,
  },
  extreme: {
    circleCount: 15,
    rectCount: 10,
  },
};

// DRAW START SCREEN
function startScreen() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  ctx.font = "48px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("Press SPACE to Begin!", 100, 300);
}


// MOVE PLAYER
function movePlayer() {
  player.x = mouseX;
  player.y = mouseY;
}

// CHECK GAME OVER
function checkGameOver() {
  // Game over if player leaves canvas
  if (
    player.x < 0 ||
    player.x + player.w > cnv.width ||
    player.y < 0 ||
    player.y + player.h > cnv.height
  ) {
    state = "gameover";
  }
}

// DRAW GAME SCREEN
function gameScreen() {
  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

// Generate circles and rectangles
  generateCircles();
  generateRect();

  // Draw circles
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].active) {
      ctx.beginPath();
      ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, Math.PI * 2);
      ctx.strokeStyle = circles[i].color;
      ctx.stroke();
      ctx.closePath();
    }
  }

  // Draw squares
  for (let i = 0; i < rects.length; i++) {
    if (rects[i].active) {
      ctx.fillStyle = "red";
      ctx.fillRect(rects[i].x, rects[i].y, rects[i].size, rects[i].size);
    }
  }
}

// GAME OVER SCREEN
function gameOver() {
  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Game Over Text
  ctx.font = "48px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", 100, 300);

  ctx.font = "24px Calibri";
  ctx.fillText("Press SPACE to return to Start Screen.", 100, 350);
}

// RESET VARIABLES
function reset() {
  state = "start";
  player = {
    x: 388,
    y: 288,
    w: 25,
    h: 25,
    color: "blue",
    speed: 5,
  };
}

  // Calculate circle speed based on the selected level
  function calculateCircleSpeed(level) {
    if (level === "easy") {
      return 1;
    } else if (level === "medium") {
      return 2.5;
    } else if (level === "hard") {
      return 4;
    } else if (level === "extreme") {
      return 4;
    }
  }
  
  // Calculate circle size based on the selected level
  function calculateCircleSize(level) {
    if (level === "easy") {
      return 40;
    } else if (level === "medium") {
      return 15;
    } else if (level === "hard") {
      return 10;
    } else if (level === "extreme") {
      return 7;
    }
  }
  
  // Calculate rectangle speed based on the selected level
  function calculateRectSpeed(level) {
    if (level === "easy") {
      return 1;
    } else if (level === "medium") {
      return 2;
    } else if (level === "hard") {
      return 3.5;
    } else if (level === "extreme") {
      return 4;
    }
  }
  
  // Calculate rectangle size based on the selected level
  function calculateRectSize(level) {
    if (level === "easy") {
      return 50;
    } else if (level === "medium") {
      return 20;
    } else if (level === "hard") {
      return 10;
    } else if (level === "extreme") {
      return 6.5;
    }
  }
function checkLevelCompleted(){
    if (circles.length === 0) {
      gameWon();
    }
  }

  function gameWon() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.font = "60px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Game Won", cnv.width / 2, cnv.height / 2);
  }