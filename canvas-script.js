
window.onload = function () {

  // Definitions
  var canvas = document.getElementById("momentum-one-axis-canvas");
  var context = canvas.getContext("2d");

  var n = 1000
  var balls = []

  for (var i = 0; i < n; i++) {
    var radius = randInt(1, 5)
    var ball = new Ball(radius)

    ball.x = randInt(radius, canvas.width - radius);
    ball.y = randInt(radius, canvas.height - radius);
    ball.m = radius;
    ball.vx = randInt(0, 1);
    ball.vy = randInt(0, 1);

    ball.context = context;
    ball.draw();

    balls.push(ball)
  }


  window.requestAnimationFrame(animationLoop);


  function animationLoop() {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    moveBalls()

    checkBallCollisions()

    drawBalls()

    // Animate
    window.requestAnimationFrame(animationLoop);
  }

  function move (ball) {
    // ball.vy += 0.098
    ball.x += ball.vx;
    ball.y += ball.vy;

    checkEdges(ball)
  }
  
  function moveBalls () {
    for (var i = 0; i < n; i++) {
      move(balls[i])
    }
  }
  function drawBalls () {
    for (var i = 0; i < n; i++) {
      balls[i].draw()
    }
  }

  function checkEdges (ball) {
    // Detect Edge Collisions
    if(ball.x + ball.r > canvas.width) {
      ball.vx = -1 * Math.abs(ball.vx)
    }
    if (ball.x - ball.r < 0){
      ball.vx = Math.abs(ball.vx)
    }

    if(ball.y + ball.r > canvas.height) {
      ball.vy = -1 * Math.abs(ball.vy)
    }
    if (ball.y - ball.r < 0){
      ball.vy = Math.abs(ball.vy)
    }
  }

  function isCollided (ball, other) {
    return (ball !== other) && (Math.pow(Math.pow(ball.x - other.x, 2) + Math.pow(ball.y - other.y, 2), 1/2) < ball.r + other.r)
  }

  function checkBallCollisions () {
    for (var i = 0; i < n; i++) {
      var ball = balls[i]
      for (var j = i; j < n; j++) {
        var other = balls[j]
        if (isCollided(ball, other)) {
          // New Velocity of Ball 1 After Collision
          var x1 = ((ball.m - other.m) * ball.vx) / (ball.m + other.m);
              x1 += (2 * other.m * other.vx) / (ball.m + other.m);
    
          // New Velocity of Ball 2 After Collision
          var x2 = ((other.m - ball.m) * other.vx) / (other.m + ball.m);
              x2 += (2 * ball.m * ball.vx) / (ball.m + other.m);
    
          ball.vx = x1;
          other.vx = x2;
    
          var y1 = ((ball.m - other.m) * ball.vy) / (ball.m + other.m);
              y1 += (2 * other.m * other.vy) / (ball.m + other.m);
    
          // New Velocity of Ball 2 After Collision
          var y2 = ((other.m - ball.m) * other.vy) / (other.m + ball.m);
              y2 += (2 * ball.m * ball.vy) / (ball.m + other.m);
    
          ball.vy = y1;
          other.vy = y2;
        }
      }
    }
  }

  window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.msRequestAnimationFrame     ||
            function(callback){
              window.setTimeout(callback, 1000 / 60);
            };
  })();
};

function randInt(min, max) {
  return min + Math.random() * (max - min)
}
