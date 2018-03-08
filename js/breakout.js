//Setup the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var ballColour = 5;

//Define the paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//Moving the paddle
var rightPressed = false;
var leftPressed = false;




//Set the starting point
var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2
var dy = -2

//Draw the ball
function drawBall() {
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI*2);
	ctx.fillStyle = ballColour;
	ctx.fill();
	ctx.closePath();
}



//Function to draw paddle
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}


function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();

drawPaddle();



	x += dx;
	y += dy;
	
	//Bounce the ball off three walls - if it drops off the bottom - Game Over!
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	} 
	if(y + dy < ballRadius){
		dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
		alert("Game Over");
		document.location.reload();
	}
	
	
	if(rightPressed && paddleX < canvas.width-paddleWidth){ 
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0){
		paddleX -= 7;
	}

	
	
	
}




	
//Monitor the documents for events that move the paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Define functions to handle keyDown or keyUp events
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

setInterval(draw, 10);

