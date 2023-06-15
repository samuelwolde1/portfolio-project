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
    rectCount: 10,
  },
  extreme: {
    circleCount: 25,
    rectCount: 15,
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
  let timeElapsed = Math.round(timer/60);
  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Display stats on gamescreen
  ctx.font = "18px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("Time: " + timeElapsed + " seconds", 10, 20);
  ctx.fillText("Hits: " + hits, 10, 40);
  ctx.fillText("Misses: " + misses, 10, 60);
  ctx.fillText("Accuracy: " + accuracy + "%", 10, 80);

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
  let timeElapsed = Math.round(timer/60);

  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Game Over Text
  ctx.font = "48px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", 100, 150);

  ctx.font = "20px Calibri";
  ctx.fillText("Time: " + timeElapsed + " seconds", 100, 200);
  ctx.fillText("Hits: " + hits, 100, 220);
  ctx.fillText("Misses: " + misses, 100, 240);
  ctx.fillText("Accuracy: " + accuracy + "%", 100, 260);

  ctx.font = "24px Calibri";
  ctx.fillText("Press SPACE to return to Start Screen.", 100, 300);
}

function gameWon() {
  let timeElapsed = Math.round(timer/60);

  ctx.clearRect(0, 0, cnv.width, cnv.height);
  ctx.fillStyle = "#008000";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Game Won Text
  ctx.font = "48px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("YOU WON", 100, 150);

  ctx.font = "20px Calibri";
  ctx.fillText("Time: " + timeElapsed + " seconds", 100, 200);
  ctx.fillText("Hits: " + hits, 100, 220);
  ctx.fillText("Misses: " + misses, 100, 240);
  ctx.fillText("Accuracy: " + accuracy + "%", 100, 260);

  ctx.font = "24px Calibri";
  ctx.fillText("Press SPACE to return to Start Screen.", 100, 300);
}

// Update the circles and rects arrays when level is changed
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
  timer = 0;
  misses = 0;
  accuracy = 0;
  hits = 0;
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
    return 5;
  } else if (level === "extreme") {
    return 7;
  }
}

// Calculate circle size based on the selected level
function calculateCircleSize(level) {
  if (level === "easy") {
    return 60;
  } else if (level === "medium") {
    return 30;
  } else if (level === "hard") {
    return 25;
  } else if (level === "extreme") {
    return 25;
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
    return 7;
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

// Calculate the accuracy of the players clicks
function calculateAccuracy(){
  if (hits + misses > 0) {
    accuracy = Math.floor((hits / (hits + misses)) * 100);
  } else {
    accuracy = 0;
  }
}