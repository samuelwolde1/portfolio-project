// HELPER FUNCTIONS

// Define the number of circles and rectangles per level
let levels = {
  easy: {
    circleCount: 5,
    rectCount: 3,
  },
  medium: {
    circleCount: 10,
    rectCount: 5,
  },
  hard: {
    circleCount: 15,
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

function updateObjects() {
  level = document.getElementById("lvlSelect").value;
  circles = [];
  rects = [];
  generateCircles();
  generateRects();
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
  circles = [];
  rects = [];
  generateCircles();
  generateRects();
}

  // Calculate circle speed based on the selected level
  function calculateCircleSpeed(level) {
    if (level === "easy") {
      return 2.5;
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
      return 60;
    } else if (level === "medium") {
      return 30;
    } else if (level === "hard") {
      return 30;
    } else if (level === "extreme") {
      return 35;
    }
  }
  
  // Calculate rectangle speed based on the selected level
  function calculateRectSpeed(level) {
    if (level === "easy") {
      return 1;
    } else if (level === "medium") {
      return 3;
    } else if (level === "hard") {
      return 4;
    } else if (level === "extreme") {
      return 6;
    }
  }
  
  // Calculate rectangle size based on the selected level
  function calculateRectSize(level) {
    if (level === "easy") {
      return 100;
    } else if (level === "medium") {
      return 50;
    } else if (level === "hard") {
      return 45;
    } else if (level === "extreme") {
      return 35;
    }
  }

  function gameWon() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = "#008000";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Game Won Text
    ctx.font = "48px Calibri";
    ctx.fillStyle = "white";
    ctx.fillText("YOU WON", 100, 300);
  
    ctx.font = "24px Calibri";
    ctx.fillText("Press SPACE to return to Start Screen.", 100, 350);
  }