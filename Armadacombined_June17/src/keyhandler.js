
//Game states
var LOADING = 0
var PLAYING = 1;
var OVER = 2;			//Moved to keyhandler.js
var PAUSED = 3;
var OPTIONSMENU = 4;
var CHANGE_LEVEL = 5;


var gameState;

//Arrow key codes
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;
var ESC = 27;
var S = 83;
var E = 69;
var PLUSNP = 107;					//Moved to keyhandler.js
var PLUS = 187;
var MINUSNP = 109;
var MINUS = 189;

//Directions
var moveRight = false;
var moveLeft = false;

//Variables to help fire missiles
var shoot = false;
var spaceKeyIsDown = false;



function keydownhandler() {
	
	switch(event.keyCode)
	{
	
		case LEFT:
			moveLeft = true;
			break;  

		case RIGHT:
			moveRight = true;
			break;

		case SPACE:
			//shoot = true;
			if(!spaceKeyIsDown)
			{
				shoot = true;
				spaceKeyIsDown = true;
			}
			break;
			
		case ESC:
			if (gameState === PLAYING) { gameState = PAUSED; }
			else if (gameState === PAUSED) { gameState = PLAYING;}
			break;
			
		case S: 
			controlSound("S");
			break;
			
		case E:
			controlSound("E");
			break;
			
		case PLUS:
			controlSound("PLUS");
			break;
		case PLUSNP:
			controlSound("PLUS");
			break;
			
		case MINUS:
			controlSound("MINUS");
			break;
		case MINUSNP:
			controlSound("MINUS");
			break;

		
	}

}

function keyuphandler() 
{
  switch(event.keyCode)
  {	    
	case LEFT:
	    moveLeft = false;
	    break;  
	    
	case RIGHT:
	    moveRight = false;
		break; 
	
	case SPACE:
		spaceKeyIsDown = false;
		break;
  }
}

