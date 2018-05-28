import Ball from './js/ball.js'

window.onload = function () {

  // Definitions
  const canvas = document.getElementById("canvas")
  const context = canvas.getContext("2d")

  const minr = 5
  const maxr = 10
  const v = 1
  const n = 200

  window.requestAnimationFrame(animationLoop)

  const balls = init()

  function init () {
    let balls = []

    // Prevents from infinite loops
    let collisionCount = 0
    for (let i = 0; i < n; i++) {
      const radius = randInt(minr, maxr)
      const color = '#' + ((1<<24) * Math.random()|0).toString(16)
      let ball = new Ball({
        radius,
        color,
        position: {
          x: randInt(radius, canvas.width - radius),
          y: randInt(radius, canvas.height - radius)
        },
        velocity: {
          x: randInt(0, 2 * v) - v,
          y: randInt(0, 2 * v) - v
        },
        mass: radius,
        context
      })

      // Check if collides with anything, if it does - regenerate
      let valid = true
      for (let j = 0; j < balls.length; j++) {
        if (isCollided(ball, balls[j])) {
          valid = false
        }
      }

      if (!valid) {
        collisionCount++
        i--

        // Stop generating when can't fit enough balls
        if (collisionCount > n * 5) {
          break
        } else {
          continue
        }
      }
      ball.draw()
  
      balls.push(ball)
    }
    return balls
  }


  function animationLoop() {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    moveBalls()

    checkBallCollisions()

    drawBalls()

    // Animate
    window.requestAnimationFrame(animationLoop)
  }

  function move (ball) {
    // ball.velocity.y += 0.098
    ball.position = {
      x: ball.position.x + ball.velocity.x,
      y: ball.position.y + ball.velocity.y
    }

    bounceEdges(ball)
  }
  
  function moveBalls () {
    for (let i = 0; i < balls.length; i++) {
      move(balls[i])
    }
  }
  function drawBalls () {
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw()
    }
  }

  function bounceEdges (ball) {
    // Detect Edge Collisions
    const right = ball.position.x + ball.r > canvas.width
    const left = ball.position.x - ball.r < 0
    const down = ball.position.y + ball.r > canvas.height
    const up = ball.position.y - ball.r < 0

    const x = ball.velocity.x
    const y = ball.velocity.y

    ball.velocity = {
      x: right ? -1 * Math.abs(x) : left ? Math.abs(x) : x,
      y: down ? -1 * Math.abs(y) : up ? Math.abs(y) : y
    }
  }

  function isCollided (ball, other) {
    return (ball !== other) && (distance(ball, other) < ball.r + other.r)
  }

  function checkBallCollisions () {
    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i]
      for (let j = i; j < balls.length; j++) {
        let other = balls[j]
        if (isCollided(ball, other)) {
          // New Velocity of Ball 1 After Collision
          let x1 = ((ball.m - other.m) * ball.velocity.x) / (ball.m + other.m);
              x1 += (2 * other.m * other.velocity.x) / (ball.m + other.m);
    
          // New Velocity of Ball 2 After Collision
          let x2 = ((other.m - ball.m) * other.velocity.x) / (other.m + ball.m);
              x2 += (2 * ball.m * ball.velocity.x) / (ball.m + other.m);
    
          ball.velocity.x = x1;
          other.velocity.x = x2;
    
          let y1 = ((ball.m - other.m) * ball.velocity.y) / (ball.m + other.m);
              y1 += (2 * other.m * other.velocity.y) / (ball.m + other.m);
    
          // New Velocity of Ball 2 After Collision
          let y2 = ((other.m - ball.m) * other.velocity.y) / (other.m + ball.m);
              y2 += (2 * ball.m * ball.velocity.y) / (ball.m + other.m);
    
          ball.velocity.y = y1;
          other.velocity.y = y2;
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

function distance (ball, other) {
  return Math.sqrt(Math.pow(ball.position.x - other.position.x, 2) + Math.pow(ball.position.y - other.position.y, 2))
}
