// JS GAME SKELETON

// CANVAS SETUP
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

// START DRAW FUNCTION ON PAGE LOAD
window.addEventListener("load", draw);

function draw() {
  // GAME STATE
  if (state === "start") {
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
  let circle = {
    x: randomInt(0, cnv.width),
    y: randomInt(0, cnv.height),
    radius: randomInt(10, 30),
    color: randomRGB(),
    active: true,
  };
  circles.push(circle);
}

function generateRect(){
  let rect = {
    x: randomInt(0, cnv.width),
    y: randomInt(0, cnv.height),
    size: randomInt(20, 40),
    color: randomRGB(),
    active: true,
  };
  rects.push(rect);
}

// EVENT STUFF

// KEYDOWN EVENT
document.addEventListener("keydown", keydownHandler);

function keydownHandler(e) {
  if (state === "start" && e.code === "Space") {
    state = "running";
  } else if (state === "gameover" && e.code === "Space") {
    reset();
  }
}

