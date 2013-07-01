(function(){
//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/hedgehogApocalypse.png";
assetsToLoad.push(image);

//JT:added a new sprite sheet for the cat astronaught
var astro = new Image();
astro.addEventListener("load", loadHandler, false);
astro.src = "../images/astro.png";
assetsToLoad.push(astro);

//Add keyboard listeners
window.addEventListener("keydown", keydownhandler, false); 
window.addEventListener("keyup", keyuphandler, false);

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
		break;
      
    case BUILD_MAP:
		buildMap(levelMaps[levelCounter]);
		buildMap(levelGameObjects[levelCounter]);
		createOtherObjects();
		gameState = PLAYING;
		break;
    
    case PLAYING:
		playGame();
		break;
    
    case OVER:
		endGame();
		break;

	case LEVEL_COMPLETE:
		levelComplete();
		break;

	case RESET_LEVEL:
		clearLevel();
		break;

	case PAUSED:
		break;
  }
  //Render the game
  render();
}

function loadHandler()
{ 
  assetsLoaded++;
  if(assetsLoaded === assetsToLoad.length)
  {
    //Remove the load handlers
    image.removeEventListener("load", loadHandler, false);
        
    //Build the map 
    gameState = BUILD_MAP;
  }
}


function clearLevel() {
	levelChangeTimer++;	
	
	//The 2 commented out sections for RESET_LEVEL are not used. Those were from Monster Mayhem where the level reset when the player died. Which is not yet implemented here.
	if (/*(gameState === RESET_LEVEL && levelChangeTimer === 30) || */(gameState === LEVEL_COMPLETE))
	{
		//Clear the sprite arrays
		sprites = [];
		backdrop = [];
		players = [];

		camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
		camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;
		/*if (gameState === RESET_LEVEL) { levelChangeTimer = 0; gameState = BUILD_MAP;}*/
	}
}

function levelComplete() {
	gameOverDisplay.visible = true;
	gameOverMessage.visible = true;

	levelChangeTimer++;
	if (levelChangeTimer === 30) //Let a half-second pass here
	{
		levelChangeTimer = 0;
		levelCounter++;
		clearLevel(); //Another half-second will pass in here

	
		if (levelCounter < levelMaps.length) //If there are more maps to be played
		{
			var ROWS = levelMaps[levelCounter].length;
			var COLUMNS = levelMaps[levelCounter][0].length;
			//Make sure the gameWorld size matches the size of the next level
			gameWorld.width = levelMaps[levelCounter][0].length * SIZE;
			gameWorld.height = levelMaps[levelCounter].length * SIZE;

			//Re-center the camera
			camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
			camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;

			//Build the maps for the next level
			gameState = BUILD_MAP;
		}
		else //Otherwise, levelCounter === levelMaps.length, so the player has beat all of the levels, so end the game
		{
			gameState = OVER;
		}
	}
}


function buildMap(levelMap)
{
	var ROWS = levelMap.length;
	var COLUMNS = levelMap[0].length;

	for(var row = 0; row < ROWS; row++) 
	{	
		for(var column = 0; column < COLUMNS; column++) 
		{ 
		  var currentTile = levelMap[row][column];

			if(currentTile != EMPTY)
			{
				//Find the tile's x and y position on the tile sheet
				var tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE; 
				var tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;

				switch (currentTile)
				{
				  case CAT:
					cat = new Cat(column, row);
					cat.sourceX = tilesheetX;
					cat.sourceY = tilesheetY;
					cat.scrollable = true;
					players.push(cat);
					break;
					
				  case HEDGEHOG:
					var hedgehog = new Hedgehog(column, row);
					hedgehog.sourceX = tilesheetX;
					hedgehog.sourceY = tilesheetY;
					hedgehogsRemaining++; //A counter of how many hedgehogs are on a given map. Player can only transition to the next level when this is back to 0.
					hedgehog.scrollable = true;
					sprites.push(hedgehog);
					break;
				  
				  case BOX:
					var box = new Box(column, row);
					box.sourceX = tilesheetX;
					box.sourceY = tilesheetY;
					box.scrollable = true;
					sprites.push(box);
					boxes.push(box);
					
					break;         
				  
				  case DOOR:
					door = new spriteObject(column, row);
					door.sourceX = tilesheetX;
					door.sourceY = tilesheetY;
					door.scrollable = true;
					sprites.push(door);
					break; 
					
				  default:
					var sprite = new spriteObject(column, row);
					sprite.sourceX = tilesheetX;
					sprite.sourceY = tilesheetY;
					sprite.scrollable = true;
					backdrop.push(sprite);
				}
			}
		}
	}
}

function createOtherObjects()
{
	//The box where the message will be displayed
	gameOverDisplay = new spriteObject();
	gameOverDisplay.sourceX = 0;
	gameOverDisplay.sourceY = 192;
	gameOverDisplay.sourceWidth = 192;
	gameOverDisplay.sourceHeight = 128;
	gameOverDisplay.width = 192;  
	gameOverDisplay.height = 128;            
	gameOverDisplay.x = canvas.width / 2 - gameOverDisplay.width / 2;
	gameOverDisplay.y = canvas.height / 2 - gameOverDisplay.height / 2;
	gameOverDisplay.visible = false;
	gameOverDisplay.scrollable = false;
	sprites.push(gameOverDisplay);

	//The actual "you won"/"you lost" message.
	gameOverMessage = Object.create(messageObject);
	gameOverMessage.x = gameOverDisplay.x + 20;
	gameOverMessage.y = gameOverDisplay.y + 34;
	gameOverMessage.font = "bold 30px Helvetica";
	gameOverMessage.fillStyle = "black";
	gameOverMessage.text = "";
	gameOverMessage.visible = false;
	gameOverMessage.scrollable = false;
	messages.push(gameOverMessage);
}

function playGame()
{
	//JT:update player
	for (var i = 0; i < players.length; i++)
	{
	    players[i].update();
	}

	for (var i = 0; i < sprites.length; i++)
	{
		sprites[i].update();
	}
}

function endGame()
{
  gameOverDisplay.visible = true;
  gameOverMessage.visible = true;
    
  if(hedgehogsRemaining === 0)
  {
    gameOverMessage.text = "You Won!";
  }
  else
  {
     gameOverMessage.text = "You Lost!";
  }
}

function render()
{ 
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  drawingSurface.save();
  drawingSurface.translate(-camera.x, -camera.y);
  
  //Display sky and clouds
	if(backdrop.length !== 0)
	{
		for(var i = 0; i < backdrop.length; i++)
		{
		  var sprite = backdrop[i];
		  if(sprite.visible)
		  {
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

  //Display the sprites
  if(sprites.length !== 0)
  {
    for(var i = 0; i < sprites.length; i++)
    {
      var sprite = sprites[i];
      if(sprite.visible && sprite.scrollable)
      {
        drawingSurface.drawImage
        (

          image, 
          sprite.sourceX, sprite.sourceY, 
          sprite.sourceWidth, sprite.sourceHeight,
          Math.floor(sprite.x), Math.floor(sprite.y), 
          sprite.width, sprite.height
        ); 
      }
	  if(sprite.visible && !sprite.scrollable)
			{
				drawingSurface.drawImage
				(
					image, 
					sprite.sourceX, sprite.sourceY, 
					sprite.sourceWidth, sprite.sourceHeight,
					Math.floor(camera.x + sprite.x), Math.floor(camera.y + sprite.y), 
					sprite.width, sprite.height
				); 
			}
    }
  }
  
  //JT: Display the player
  if(players.length !== 0)
  {    
    for(var i = 0; i < players.length; i++)
    {
      var player = players[i];
      if(player.visible)
      {
        drawingSurface.drawImage
        (
          astro, 
          player.sourceX, player.sourceY, 
          player.sourceWidth, player.sourceHeight,
          Math.floor(player.x), Math.floor(player.y), 
          player.width, player.height
        ); 
      }
    }
  }
  
  
  	drawingSurface.restore();

  
  //Display the game messages
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
