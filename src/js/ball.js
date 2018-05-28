function Ball({ radius, color, position, mass, velocity, context }) {
  var ball = this
  
  ball.r = radius || 10 
  ball.c = color || 'red' 
  ball.position = {
    x: position.x,
    y: position.y
  } 
  ball.m = mass
  ball.velocity = {
    x: velocity.x,
    y: velocity.y
  }

  ball.context = context 
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
