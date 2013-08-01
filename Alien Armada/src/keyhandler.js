
//Game states
var LOADING = 0;
var PLAYING = 1;
var OVER = 2;
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
var PLUSNUMPAD = 107;					
var PLUS = 187;
var MINUSNUMPAD = 109;
var MINUS = 189;

//Directions
var moveRight = false;
var moveLeft = false;

//Variables to help fire missiles, only one per press of the spacebar
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
			if(!spaceKeyIsDown)
			{
				shoot = true;
				spaceKeyIsDown = true;
			}
			break;
			
		case ESC:
			if (gameState === PLAYING) 		{ gameState = PAUSED;	pauseMessage.innerHTML = "Press \"ESC\" to <span>un</span>pause";	}
			else if (gameState === PAUSED) 	{ gameState = PLAYING;	pauseMessage.innerHTML = "Press \"ESC\" to pause";					}
			break;
			
		case S: 
			controlSound("muteMusic");
			break;
			
		case E:
			controlSound("muteEffects");
			break;
			
		case PLUS:
		case PLUSNUMPAD:
			controlSound("PLUS");
			break;
			
		case MINUS:
		case MINUSNUMPAD:
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