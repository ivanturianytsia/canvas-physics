function Ball(radius, color) {
  var ball = this
  
  ball.r = radius || 10 
  ball.c = color || 'red' 
  ball.position = {
    x: 0,
    y: 0
  } 
  ball.m = 0 
  ball.velocity = {
    x: 0,
    y: 0
  } 

  ball.context = null 
}

Ball.prototype.draw = function () {
  
  var ball = this
  
  if (!ball.context) {
    return
  }

  ball.context.beginPath()
  ball.context.fillStyle = ball.c
  ball.context.arc(ball.position.x, ball.position.y, ball.r, 0, 2 * Math.PI)
  ball.context.fill()
}

export default Ball
