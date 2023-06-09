// HELPER FUNCTIONS

levels = {
    easy: {
      circleSpeed: 2, // Adjust the speed of circles
      rectSpeed: 1.5, // Adjust the speed of squares
      circleSize: 25, // Adjust the size of circles
      rectSize: 30, // Adjust the size of squares
    },
    medium: {
      circleSpeed: 3,
      rectSpeed: 2,
      circleSize: 20,
      rectSize: 25,
    },
    hard: {
      circleSpeed: 4,
      rectSpeed: 3,
      circleSize: 15,
      rectSize: 20,
    },
    extreme: {
      circleSpeed: 5,
      squareSpeed: 4,
      circleSize: 10,
      rectSize: 15,
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
      let circle = circles[i];
      if (circle.active) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.strokeStyle = circle.color;
        ctx.stroke();
        ctx.closePath();
      }
    }
  
    // Draw squares
    for (let i = 0; i < rects.length; i++) {
      let rect = rects[i];
      if (rect.active) {
        ctx.fillStyle = "red";
        ctx.fillRect(rect.x, rect.y, rect.size, rect.size);
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
  
  