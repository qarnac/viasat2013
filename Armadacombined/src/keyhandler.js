
//Game states
var LOADING = 0
var PLAYING = 1;
var OVER = 2;			
var PAUSED = 3;
var OPTIONSMENU = 4;

var gameState;
var prevState;	//Used for pause/unpause going to the right game state

//Arrow key codes
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;
var ESC = 27;
var S = 83;
var E = 69;
var PLUSNP = 107;	//Plus on the num pad
var PLUS = 187;		//Plus on the main keyboard
var MINUSNP = 109;	//Minus on the num pad
var MINUS = 189;	//Minus on the main keyboard section

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
			//Will not change state if game is over, or still loading. Only if currently playing, doing options, or paused.
			if (gameState === PLAYING) 			{ gameState = PAUSED; prevState = PLAYING;		pauseMessage.innerHTML = "Press \"ESC\" to <span>un</span>pause";	}
			else if (gameState === OPTIONSMENU) { gameState = PAUSED; prevState = OPTIONSMENU; 	pauseMessage.innerHTML = "Press \"ESC\" to <span>un</span>pause";	}
			else if (gameState === PAUSED) 		{ gameState = prevState;						pauseMessage.innerHTML = "Press \"ESC\" to pause";					}
			break;
			
		case S: //S mutes music
			controlSound("S");
			break;
		case E:	//E mutes effects
			controlSound("E");
			break;
		
		//The two + keys increase, and the two - keys decrease, all volume in the game.
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


