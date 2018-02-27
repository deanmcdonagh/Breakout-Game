//Setup the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var ballColour = 5;

//Define the paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;



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
	if(x + dx >canvas.width-ballRadius || x + dx< ballRadius) {
		dx = -dx;
		ballColour = "red";
		ballRadius = 5;
	} 
	if(y + dy> canvas.height-ballRadius || y + dy <ballRadius) {
		dy = -dy;
		ballColour = "green";
		ballRadius = 10;
	}
	
}







setInterval(draw, 10);

