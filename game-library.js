// GAME LIBRARY for HTML CANVAS

// GLOBAL VARIABLES
let mouseX = 0;
let mouseY = 0;

let keyPressed = {};

// EVENT STUFF

// Update position of mouse, (mouseX, mouseY), when mouse moved
document.addEventListener("mousemove", mousemoveHandlerGameLib);

function mousemoveHandlerGameLib(e) {
  // Get rectangle info about canvas location
  let cnvRect = cnv.getBoundingClientRect();

  // Calc mouse coordinates using mouse event and canvas location info
  mouseX = Math.round(e.clientX - cnvRect.left);
  mouseY = Math.round(e.clientY - cnvRect.top);
}


// USEFUL GAME FUNCTIONS
// GAME LOGIC
function gameLogic(timeStamp) {
  let elapsed = timeStamp / 1000;
  movePlayer();
  moveCircles();
  moveRects();
  checkGameOver();
}

// MOVE PLAYER
function movePlayer() {
  player.x = mouseX;
  player.y = mouseY;
}

// MOVE CIRCLES
function moveCircles() {
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].active === true) {
      circles[i].x += circles[i].speedX;
      circles[i].y += circles[i].speedY;
      // Check if circle hits the canvas boundaries
      if (
        circles[i].x - circles[i].radius < 0 ||
        circles[i].x + circles[i].radius > cnv.width
      ) {
        circles[i].speedX *= -1;
      }
      if (
        circles[i].y - circles[i].radius < 0 ||
        circles[i].y + circles[i].radius > cnv.height
      ){
        circles[i].speedY *= -1;
      }
    }
  }
}


// MOVE RECTANGLES
function moveRects() {
  for (let i = 0; i < rects.length; i++) {
    if (rects[i].active) {
      rects[i].x += rects[i].speedX;
      rects[i].y += rects[i].speedY;

      // Check if rectangle hits the canvas boundaries
      if(
        rects[i].x < 0 || 
        rects[i].x + rects[i].size > cnv.width
      ){
        rects[i].speedX *= -1;
      }

      if(
        rects[i].y < 0 || 
        rects[i].y + rects[i].size > cnv.height
      ){
        rects[i].speedY *= -1;
      }
    }
  }
}


// Determine the distance between (x1, y1) and (x2, y2)
function dist(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Determine if point (x, y) is in rect object (x, y, w, h)
function ptInRect(x, y, rect) {
  return x >= rect.x &&
   x <= rect.x + rect.width &&
   y >= rect.y && 
   y <= rect.y + rect.height;
}

// Determine if point (x, y) is in circle object (x, y, r)
function ptInCircle(x, y, circle) {
  let distance = dist(x, y, circle.x, circle.y);
  return distance
}

// Determine if two rect objects (x, y, w, h) collide
function rectCollide(rect1, rect2) {}

// Determine if two circle objects (x, y, r) collide
function circleCollide(circle1, circle2) {}

// Constrain val so that it must be between low and high
function constrain(val, low, high) {}