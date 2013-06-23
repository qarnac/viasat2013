//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
var ESC = 27;
//Directions
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;

//Add keyboard listeners
function keydownhandler() 
{
	switch(event.keyCode)
	{
		case UP:
			moveUp = true;
			break;

		case DOWN:
			moveDown = true;
			break;

		case LEFT:
			moveLeft = true;
			break;  

		case RIGHT:
			moveRight = true;
			break; 
		
		case ESC:
			if (gameState === PAUSED) { gameState = prevState; pauseMessage.innerHTML = "Press \"ESC\" to pause";	} 
			else { prevState = gameState; gameState = PAUSED; pauseMessage.innerHTML = "Press \"ESC\" to <span>un</span>pause";}
			break;
	}
}

function keyuphandler() 
{
	switch(event.keyCode)
	{
		case UP:
			moveUp = false;
			break;

		case DOWN:
			moveDown = false;
			break;

		case LEFT:
			moveLeft = false;
			break;  

		case RIGHT:
			moveRight = false;
			break; 
	}
}
