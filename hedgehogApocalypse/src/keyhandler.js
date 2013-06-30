//Arrow key codes
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;
var ESC = 27;
//Directions

var moveRight = false;
var moveLeft = false;
var jump = false;

//Add keyboard listeners
function keydownhandler() 
{
	switch(event.keyCode)
	{
		case LEFT:
		  moveLeft = true;
		  break;  
			
		case RIGHT:
		  moveRight = true;
		  break; 
		  
		case SPACE:
		  jump = true;
		  break;
		case ESC: //Toggle between paused and unpaused, update the message, and pause/resume the timer.
			if (gameState === PAUSED) 
				{ 
					gameState = prevState; 
					//pauseMessage.innerHTML = "Press \"ESC\" to pause"; 
					
				} 
			else 
				{ 
					prevState = gameState; //Set a previous state, so it knows what to return to
					gameState = PAUSED; 
					//pauseMessage.innerHTML = "Press \"ESC\" to <span>un</span>pause"; 	
				}
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
      jump = false;
      break;  
	}
}
