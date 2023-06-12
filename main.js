// JS GAME SKELETON

// CANVAS SETUP
let level = document.getElementById("lvlSelect").value;
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// GLOBAL VARIABLES
let circles = [];
let rects = [];
let state = "start";
let player = {
  x: 388,
  y: 288,
  w: 25,
  h: 25,
  color: "blue",
  speed: 5,
};

// CHECK LVL SELECTION
// function currentLvl(level){
//     let level = document.getElementById("diffSelect").value;
//     if (level === "easy"){
//         circles.speed = 2;
//         circles.size
//         rects.speed = 1;

//     }
// }

// START DRAW FUNCTION ON PAGE LOAD
window.addEventListener("load", draw);

function draw() {
  // GAME STATE
  if (state === "start") {
    // currentLvl();
    startScreen();
  } else if (state === "running") {
    gameLogic();
    gameScreen();
  } else if (state === "gameover") {
    gameOver();
  }

  // REDRAW
  requestAnimationFrame(draw);
}

// Generate objects

function generateCircles(){
  circles = [];
  for (let i = 0; i < levels[level].circleCount; i++){
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

function generateRect(){
  rects = [];
  for (let i = 0; i < levels[level].rectCount; i++){
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

// KEYDOWN EVENT
document.addEventListener("keydown", keydownHandler);

function keydownHandler(e) {
  if (state === "start" && e.code === "Space") {
    let levelSelect = document.getElementById("lvlSelect");
    level = levelSelect.value;
    state = "running";
  } else if (state === "gameover" && e.code === "Space") {
    reset();
  }
}

document.addEventListener("mousedown", mousedownHandler);

function mousedownHandler(e) {
  if (state === "running") {
    // Check if the user clicked on a circle
    for (let i = 0; i < circles.length; i++) {
      if (ptInCircle(mouseX, mouseY, circles[i])) {
        circles.splice(i, 1); 
      }
    }

    // Check if the user clicked on a rectangle
    for (let i = 0; i < rects.length; i++) {
      if (ptInRect(mouseX, mouseY, rects[i])) {
        state = "gameover"; 
      }
    }

    // // Check if all circles have been removed
    // if (circles.length === 0) {
    //   levelCompleted(); // Call the levelCompleted function
    // }
  }
}

