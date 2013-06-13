(function(){


//Start the game animation loop
update();

function update()
{ 
  //The animation loop
  requestAnimationFrame(update, canvas);

  //Change what the game is doing based on the game state
  switch(gameState)
  {
    case LOADING:
		console.log("loading…");
		break;
    
    case PLAYING:
		playGame();
		break;
    
    case OVER:
		endGame();
		break;
		
	case OPTIONSMENU:
		selectShip();
		break;
		
	case PAUSED:
		pauseGame();
		break;
  }
  
  //Render the game
  render();
}

//select ship function *************************************************************************************** 
function selectShip()
{
  playGame();
  gameState = PLAYING;
}

function playGame()
{
  //Left
  if(moveLeft && !moveRight)
  {
    cannon.vx = -6;
  }
  //Right
  if(moveRight && !moveLeft)
  {
    cannon.vx = 6;
  }

  //Set the cannon's velocity to zero if none of the keys are being pressed
  if(!moveLeft && !moveRight)
  {
    cannon.vx = 0;
  }

  //Fire a missile if shoot is true
  if(shoot)
  {
    fireMissile();
    shoot = false;	
  }
  
  //Move the cannon and keep it within the screen boundaries
  cannon.x = Math.max(0, Math.min(cannon.x + cannon.vx, canvas.width - cannon.width));
  
  //Move the missiles
  for(var i = 0; i < missiles.length; i++)
  {
    var missile = missiles[i];

    //Move it up the screen
    missile.y += missile.vy;

    //Remove the missile if it crosses the top of the screen
    if(missile.y < 0 - missile.height)
    { 
      //Remove the missile from the missiles array
      removeObject(missile, missiles);

      //Remove the missile from the sprites array
      removeObject(missile, sprites);

      //Reduce the loop counter by 1 to compensate 
      //for the removed element
      i--;
    }
  }

  //Make the aliens

  //Add one to the alienTimer
  alienTimer++;

  //Make a new alien if alienTimer equals the alienFrequency
  if(alienTimer === alienFrequency)
  {
    makeAlien();
    alienTimer = 0;

    //Reduce alienFrequency by one to gradually increase
    //the frequency that aliens are created
    if(alienFrequency > 2)
    {  
      alienFrequency--;
    }
	
	
	if ((scoreToMotherShip === 2) && motherShipCalled === false)
	{
     
      //**********warp to mars with the boss
      background.sourceX = 480;
      background.sourceY = 32;

    cannon.sourceX = 480;
    cannon.sourceY = 0;
      
      //make the mothership
      makeMother();
      
      //make onbly one mother ship
      motherShipCalled = true;
    }
  }

  //Loop through the aliens
  for(var i = 0; i < aliens.length; i++)
  { 
    var alien = aliens[i];
    //Move the current alien if its state is NORMAL
	alien.y += alien.vy;



    //Check if the alien has crossed the bottom of the screen
    if(alien.y > canvas.height + alien.height)
    { 
      //End the game if an alien has reached Earth
      gameState = OVER;
    }
  }
  
  //--- The collisions 

  //Check for a collision between the aliens and missiles
   for(var i = 0; i < aliens.length; i++)
  {
    var alien = aliens[i];

    for(var j = 0; j < missiles.length; j++)
    {
      var missile = missiles[j];
      
      if(hitTestRectangle(missile, alien)
      && alien.state === alien.NORMAL)
      {
	//checks to see if this is the mothership
	if (alien.sourceWidth === 64)
	{
	  if (motherShipHealth === 0)
	  {
	     //Destroy the alien
	    destroyAlien(alien);
    
	    //Update the score
	    score+=60;
	    
	    //Remove the missile
	    removeObject(missile, missiles);
	    removeObject(missile, sprites);
	  }
	  else
	  {
	    motherShipHealth--;
	    
	    if(sprites.length !== 0)
	    {
	      for(var i = 0; i < sprites.length; i++)
	      {
		var sprite = sprites[i];
		
		if (sprite.sourceX === 256)
		{
		  //reduces the hp bar
		  sprite.sourceWidth-=3;
		  sprite.width-=3;
		  
		  drawingSurface.drawImage
		  (
		    image, 
		    sprite.sourceX, sprite.sourceY, 
		    sprite.sourceWidth, sprite.sourceHeight,
		    Math.floor(sprite.x), Math.floor(sprite.y), 
		    sprite.width, sprite.height
		  ); 
		}
		
	      }
	    }
	    
	    //Remove the missile
	    removeObject(missile, missiles);
	    removeObject(missile, sprites);
	  }
	}
	else
	{
	  //****************increment the mothership call******************
	  scoreToMotherShip++;
	  
	  //Destroy the alien
	  destroyAlien(alien);
  
	  //Update the score
	  score++;
	  
	  //Remove the missile
	  removeObject(missile, missiles);
	  removeObject(missile, sprites);
  
	  //Subtract 1 from the loop counter to compensate
	  //for the removed missile
	  j--;
	}
	  
      }
    }
  }
  
  //--- The score 

  //Display the score
  scoreDisplay.text = score;

  //Check for the end of the game
  if(score === scoreNeededToWin)
  {
    gameState = OVER;
  }
}
/*
function destroyAlien(alien)
{
  //Change the alien's state and update the object 
  alien.state = alien.EXPLODED;
    alien.vy /= 2;

  alien.update();  
  
  //Remove the alien after 1 second
  setTimeout(removeAlien, 1000);

  //Play the explosion sound
  explosionSound.currentTime = 0;
  explosionSound.play();
  
  function removeAlien()
  {
    removeObject(alien, aliens);
    removeObject(alien, sprites);
  }
}

function fireMissile()
{ 
  //Create a missile sprite
  var missile = Object.create(spriteObject);
  missile.sourceX = 96;
  missile.sourceWidth = 16;
  missile.sourceHeight = 16;
  missile.width = 16;
  missile.height = 16;
  
  //Center it over the cannon
  missile.x = cannon.centerX() - missile.halfWidth();
  missile.y = cannon.y - missile.height;
  
  //Set its speed
  missile.vy = -8;
  
  //Push the missile into both the sprites and missiles arrays
  sprites.push(missile);
  missiles.push(missile);

  //Play the firing sound
  shootSound.currentTime = 0;
  shootSound.play();
}

function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}
*/
function render()
{ 
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  //Display the sprites
  if(sprites.length !== 0)
  {
    for(var i = 0; i < sprites.length; i++)
    {
      var sprite = sprites[i];
      drawingSurface.drawImage
      (
        image, 
        sprite.sourceX, sprite.sourceY, 
        sprite.sourceWidth, sprite.sourceHeight,
        Math.floor(sprite.x), Math.floor(sprite.y), 
        sprite.width, sprite.height
      ); 
    }
  }

  //Display game messages
  if(messages.length !== 0)
  {
    for(var i = 0; i < messages.length; i++)
	{
	  var message = messages[i];
	  if(message.visible)
	  {
	    drawingSurface.font = message.font;  
        drawingSurface.fillStyle = message.fillStyle;
        drawingSurface.textBaseline = message.textBaseline;
		drawingSurface.fillText(message.text, message.x, message.y);  
	  }
	}
  }
}


}());
