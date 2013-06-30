(function(){


//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/hedgehogApocalypse.png";
assetsToLoad.push(image);


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
      buildMap(map);
      buildMap(gameObjects);
      createOtherObjects();
      gameState = PLAYING;
      break;
    
    case PLAYING:
      playGame();
      break;
    
    case OVER:
      endGame();
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

function buildMap(levelMap)
{
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
            cat = new Cat(column, row);//spriteObject;
            cat.sourceX = tilesheetX;
            cat.sourceY = tilesheetY;
            sprites.push(cat);
            break;
            
          case HEDGEHOG:
            var hedgehog = new Hedgehog(column, row);
            hedgehog.sourceX = tilesheetX;
            hedgehog.sourceY = tilesheetY;
            sprites.push(hedgehog);
            break;
          
          case BOX:
            var box = new Box(column, row);
            box.sourceX = tilesheetX;
            box.sourceY = tilesheetY;
            sprites.push(box);
            boxes.push(box);
            break;         
          
          case DOOR:
            door = new spriteObject(column, row);
            door.sourceX = tilesheetX;
            door.sourceY = tilesheetY;
            sprites.push(door);
            break; 
            
          default:
            var sprite = new spriteObject(column, row);
            sprite.sourceX = tilesheetX;
            sprite.sourceY = tilesheetY;
			backdrop.push(sprite);
        }
      }
    }
  }
}

function createOtherObjects()
{
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
  sprites.push(gameOverDisplay);
  
  gameOverMessage = Object.create(messageObject);
  gameOverMessage.x = gameOverDisplay.x + 20;
  gameOverMessage.y = gameOverDisplay.y + 34;
  gameOverMessage.font = "bold 30px Helvetica";
  gameOverMessage.fillStyle = "black";
  gameOverMessage.text = "";
  gameOverMessage.visible = false;
  messages.push(gameOverMessage);
}

function playGame()
{   
	for (var i = 0; i < sprites.length; i++)
	{
		sprites[i].update();
	}
}

function endGame()
{
  gameOverDisplay.visible = true;
  gameOverMessage.visible = true;
    
  if(hedgehogsSquashed === 3)
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
