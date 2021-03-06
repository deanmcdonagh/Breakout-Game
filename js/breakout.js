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

//Setup some bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//Counting the score
var score = 0;


//Game Sounds
var WINNING_SOUND = new Audio('sounds/woohoo.wav');
var SCORE_SOUND = new Audio('sounds/success.wav');
var GAMEOVER_SOUND = new Audio('sounds/gameover.wav');

//Adding Game Lives
var lives = 3


//Hold the bricks in a two dimensional array - think of it as rows and columns 
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c] [r] = { x: 0, y: 0, status: 1};
	}
}





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

//This function draws the bricks
function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
			var brickX = (c*(brickWidth+brickPadding) )+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding) )+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
			} 
		}
	}
}




function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();

	//Draw the paddle 
	drawPaddle();
	
	//Draw the Score
	drawScore();
	

	//Draw the lives
	drawLives();

	//draw the bricks
	drawBricks();
	
	//Collision detection
	collisionDetection();
	

	x += dx;
	y += dy;
	
	//Bounce the ball off three walls - if it drops off the bottom - Game Over!
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	} 
	if(y + dy < ballRadius){
		dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
		//Check if the ball is hitting the paddle
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else{ 
		lives--;
		if(!lives) {
		GAMEOVER_SOUND.play();
		alert("Game Over");
		document.location.reload();
		}
		else {
		x = canvas.width/2;
		y = canvas.height-30;
		dx = 2;
		dy = -2;
		paddleX = (canvas.width-paddleWidth)/2;
		}
		}
		
	
	
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
	
	//Listening for mouse movement
	document.addEventListener("mousemove", mouseMoveHandler, false);
	
	//Define the function for mouse movement
	function mouseMoveHandler(e) {
		var relativeX = e.clientX - canvas.offsetLeft;
		if(relativeX > 0 && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth/2;
		}
	}
	
	

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



function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
			if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
				dy = -dy;
				b.status = 0;
				score++;
				SCORE_SOUND.play();
				if(score == brickRowCount*brickColumnCount) {
					WINNING_SOUND.play();
					alert("YOU WIN, CONGRATULATIONS!");
					document.location.reload();
				}
				
				}
			
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 0, 20);
	document.getElementById("gamescore").innerHTML = "Score: " + score;	
}

function drawLives() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Lives: "+lives, canvas.width-65, 20);
		document.getElementById("gamelives").innerHTML = "Lives: " + lives;
	}
	




setInterval(draw, 10);

