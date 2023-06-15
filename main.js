// JS GAME SKELETON

// CANVAS SETUP
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// GLOBAL VARIABLES
let level = document.getElementById("lvlSelect").value;
let timer = 0;
let hits = 0;
let misses = 0;
let accuracy = 0;
let circles = [];
let rects = [];
generateCircles();
generateRects();
let state = "start";
let player = {
  x: 388,
  y: 288,
  w: 25,
  h: 25,
  color: "blue",
  speed: 5,
};


// START DRAW FUNCTION ON PAGE LOAD
window.addEventListener("load", draw);

function draw() {
  level = document.getElementById("lvlSelect").value; 
  // GAME STATE
  if (state === "start") {
    startScreen();
  } else if (state === "running") {
    timer++;
    gameLogic();
    gameScreen();
  } else if (state === "gameover") {
    gameOver();
  } else if (state === "gamewon"){
    gameWon();
  }

  // REDRAW
  requestAnimationFrame(draw);
}

// Generate objects
function generateCircles() {
  for (let i = 0; i < levels[level].circleCount; i++) {
    let circle = {
      x: randomInt(calculateCircleSize(level), cnv.width - calculateCircleSize(level)),
      y: randomInt(calculateCircleSize(level), cnv.height - calculateCircleSize(level)),
      radius: calculateCircleSize(level),
      color: randomRGB(),
      speedX: calculateCircleSpeed(level),
      speedY: calculateCircleSpeed(level),
      active: true,
    };
    circles.push(circle);
  }
}

function generateRects() {
  for (let i = 0; i < levels[level].rectCount; i++) {
    let rect = {
      x: randomInt(calculateRectSize(level), cnv.width - calculateRectSize(level)),
      y: randomInt(calculateRectSize(level), cnv.height - calculateRectSize(level)),
      size: calculateRectSize(level),
      color: randomRGB(),
      speedX: calculateRectSpeed(level),
      speedY: calculateRectSpeed(level),
      active: true,
    };
    rects.push(rect);
  }
}

// EVENT STUFF

// Event Listener for whenver the level is changed and space is pressed
let levelSelect = document.getElementById("lvlSelect");
levelSelect.addEventListener("change", updateObjects);

// KEYDOWN EVENT
document.addEventListener("keydown", keydownHandler);

function keydownHandler(e) {
  if (state === "start" && e.code === "Space") {
    let levelSelect = document.getElementById("lvlSelect");
    level = levelSelect.value;
    state = "running";
  } else if (state === "gameover" && e.code === "Space") {
    reset();
  } else if (state === "gamewon" && e.code === "Space"){
    reset();
  }
}

cnv.addEventListener("mousedown", mousedownHandler);

function mousedownHandler(e) {
  if (state === "running") {
    let clickedCircle = false;
    for (let i = 0; i < circles.length; i++) {
      // Check if the user clicked on a circle
      if (ptInCircle(player.x, player.y, circles[i]) <= circles[i].radius){
        circles.splice(i, 1);
        clickedCircle = true;
        hits++;
        if(circles.length === 0){
          state = "gamewon"
        }
      }
    }
    // Check if the user didn't click on a circle
    if (clickedCircle === false){
      misses++;
    }
    // Check if the user clicked on a rectangle
    for (let i = 0; i < rects.length; i++) {
      if (ptInRect(player.x, player.y, rects[i])) {
        state = "gameover";
      }
    }
  }
}

