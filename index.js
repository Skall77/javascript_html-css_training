/** @type {HTMLCanvasElement} */

const gameBoard = document.querySelector("#board");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetButton = document.querySelector("#reset");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "black";
const paddleColor = "#f7f7f7";
const BallColor = "#f7f7f7";
const ballRadius = 12.5;
const paddleSpeed = 50;

let intervalID;
let ballSpeed = 2;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let playerOneScore = 0;
let playerTwoScore = 0;

let paddle1 = {
	width: 25,
	height: 100,
	x: 0,
	y: 0
}

let paddle2 = {
	width: 25,
	height: 100,
	x: gameWidth - 25,
	y: gameHeight - 100
}

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

function gameStart(){
	createBall();
	nextTick();
}

function nextTick(){
	intervalID = setTimeout(() => {
		clearBoard();
		drawPaddles();
		moveBall();
		drawBall(ballX, ballY);
		checkColision();
		nextTick();
	}, 10)
}

function clearBoard(){
	context.fillStyle = boardBackground;
	context.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles(){
	context.fillStyle = paddleColor;
	context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
	context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function createBall(){
	ballSpeed = 2;
	if (Math.round(Math.random()) == 1)
		ballXDirection = 1;
	else
		ballXDirection = -1;
	if (Math.round(Math.random()) == 1)
		ballYDirection = 1;
	else
		ballYDirection = -1;
	ballX = gameWidth /2;
	ballY = gameHeight /2;
	drawBall(ballX, ballY);
}

function moveBall(){
	ballX += (ballSpeed * ballXDirection);
	ballY += (ballSpeed * ballYDirection);
}

function drawBall(ballX, ballY){
	context.fillStyle = BallColor;
	context.beginPath();
	context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
	context.fill();
}

function checkColision(){
	if (ballY <= 0 + ballRadius){
		ballYDirection *= -1;
	}
	if (ballY >= gameHeight - ballRadius){
		ballYDirection *= -1;
	}
	if (ballX <= 0){
		playerTwoScore +=1;
		updateScore();
		createBall();
		return;
	}
	if (ballX >= gameWidth){
		playerOneScore +=1;
		updateScore();
		createBall();
		return;
	}
	if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
		if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
			ballX = (paddle1.x + paddle1.width) + ballRadius; //if ball get stuck
			ballXDirection *= -1;
			ballSpeed += 0.1;

		}
	}
	if(ballX >= (paddle2.x - ballRadius)){
		if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
			ballX = paddle2.x - ballRadius;
			ballXDirection *= -1;
			ballSpeed += 0.1;

		}
	}
}

function changeDirection(event){
	const KeyPressed = event.keyCode;
	const paddle1Up = 87;
	const paddle1Down = 83;
	const paddle2Up = 38;
	const paddle2Down = 40;

	switch(KeyPressed){
		case(paddle1Up):
			if (paddle1.y > 0)
				paddle1.y -= paddleSpeed;
			break;
		case(paddle1Down):
			if (paddle1.y < gameHeight - paddle1.height)
				paddle1.y += paddleSpeed;
			break;
		case(paddle2Up):
			if (paddle2.y > 0)
				paddle2.y -= paddleSpeed;
			break;
		case(paddle2Down):
			if (paddle2.y < gameHeight - paddle2.height)
				paddle2.y += paddleSpeed;
			break;
	}
	
}

function updateScore(){
	scoreText.textContent = `${playerOneScore} : ${playerTwoScore}`;
}

function resetGame(){
	playerOneScore = 0;
	playerTwoScore = 0;
	paddle1 = {
		width: 25,
		height: 100,
		x: 0,
		y: 0
	}
	paddle2 = {
		width: 25,
		height: 100,
		x: gameWidth - 25,
		y: gameHeight - 100
	}
	ballSpeed = 2;
	ballX = 0;
	ballY = 0;
	ballXDirection = 0;
	ballYDirection = 0;
	updateScore();
	clearInterval(intervalID);
	gameStart();
}
