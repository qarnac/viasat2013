
window.addEventListener("keydown", keydownhandler, false);	//Executed in keyhandler.js
window.addEventListener("keyup", keyuphandler, false);		//Executed in keyhandler.js

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


