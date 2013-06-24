(function(){
//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/monsterMayhem.png";
assetsToLoad.push(image);

//Add keyboard listeners, handled in keyhandler.js
window.addEventListener("keydown", keydownhandler, false); 
window.addEventListener("keyup", keyuphandler, false);

//Start the game timer
gameTimer.time = 60;
gameTimer.start();

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
			console.log("loading...");
			break;

		case BUILD_MAP:
			buildMap(levelMaps[levelCounter]);	//Draw the static objects
			buildMap(levelGameObjects[levelCounter]);	//Draw monster, player, stars
			createOtherSprites();	//Make message objects
			gameState = PLAYING;
			break;

		case PLAYING:
			playGame();
			break;

		case LEVEL_COMPLETE:
			levelComplete();
			break;

		case OVER:
			endGame();
			break;
		
		case PAUSED:
			console.log("Paused");
			break;
	}

	//Render the game
	render();
}

function levelComplete()
{
	//Make the leveCompleteDisplay visible
	levelCompleteDisplay.visible = true;

	//Update the timer that changes the level by one
	levelChangeTimer++;

	//Load the next level after 60 frames
	if(levelChangeTimer === 60)
	{
		//Reset the timer that changes the level
		levelChangeTimer = 0;

		//Update the levelCounter by 1
		levelCounter++;

		//Load the next level if there is one or end the game if there isn't
		if(levelCounter < levelMaps.length)
		{
			//Clear the arrays of objects
			sprites = [];
			floorsAndWalls = [];

			//Reset any gameVariables
			starsTotal = 0;	//A counter of how many stars are on the map (Formerly was a separate array)
			
			//Reset inventory counts
			for (var i = 0; i < inventory.length; i++)
			{
				inventory[i][1] = 0;
			}
			timerMessage.text = "";	//The message
			gameTimer.time = 60;	//The timer itself

			//Make sure the gameWorld size matches the size of the next level
			gameWorld.width = levelMaps[levelCounter][0].length * SIZE;
			gameWorld.height = levelMaps[levelCounter].length * SIZE;

			//Re-center the camera
			camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
			camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;

			//Build the maps for the next level
			gameState = BUILD_MAP;
		}
		else
		{
			gameState = OVER;
		}
	}
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
				console.log("Sprites: " + sprites.length + " W/F: " + floorsAndWalls.length);
				switch (currentTile)
				{
					case FLOOR:
						var floor = new spriteObject(row, column);
						floor.sourceX = tilesheetX;
						floor.sourceY = tilesheetY;
						floorsAndWalls.push(floor);
						break;

					case BOX:
						var box = new Box(row, column);//spriteObject(row, column);
						sprites.push(box);
						break;

					case WALL:
						var wall = new spriteObject(row, column);
						wall.sourceX = tilesheetX;
						wall.sourceY = tilesheetY;            
						//sprites.push(wall);
						floorsAndWalls.push(wall);
						break;

					case MONSTER:
						var monster = new Monster(row, column);
						monster.changeDirection(); //Make the monster choose a random start direction 
						sprites.push(monster);
						break; 

					case STAR:
						var star = new Star(row, column);
						starsTotal++; //counter of how many stars are on the map
						sprites.push(star);
						break;
						
					case BOMB:
						var bomb = new Bomb(row, column);						
						sprites.push(bomb);
						break;

					case ALIEN:
						alien = new Player(row, column);						
						sprites.push(alien);
						break;
				}
			}
		}
	}
}

function createOtherSprites()
{
	levelCompleteDisplay = new spriteObject();
	levelCompleteDisplay.sourceX = 0;
	levelCompleteDisplay.sourceY = 384;
	levelCompleteDisplay.sourceWidth = 256;
	levelCompleteDisplay.sourceHeight = 128;
	levelCompleteDisplay.width = 256;  
	levelCompleteDisplay.height = 128;            
	levelCompleteDisplay.x = canvas.width / 2 - levelCompleteDisplay.width / 2;
	levelCompleteDisplay.y = canvas.height / 2 - levelCompleteDisplay.height / 2;
	levelCompleteDisplay.visible = false;
	levelCompleteDisplay.scrollable = false;
	sprites.push(levelCompleteDisplay);

	timeDisplay = new spriteObject();
	timeDisplay.sourceX = 256;
	timeDisplay.sourceY = 128;
	timeDisplay.sourceWidth = 128;
	timeDisplay.sourceHeight = 48;
	timeDisplay.width = 128;  
	timeDisplay.height = 48;            
	timeDisplay.x = canvas.width / 2 - timeDisplay.width / 2;
	timeDisplay.y = 8;
	timeDisplay.scrollable = false;
	sprites.push(timeDisplay);
	
	timerMessage = Object.create(messageObject);
	timerMessage.x = 330;
	timerMessage.y = 10;
	timerMessage.font = "bold 40px Helvetica";
	timerMessage.fillStyle = "white";
	timerMessage.text = "";
	messages.push(timerMessage);
	
	//SourceY will determine either "You won" or "you lost", in endGame function
	gameOverDisplay = new spriteObject();
	gameOverDisplay.sourceX = 0;
	gameOverDisplay.sourceWidth = 256;
	gameOverDisplay.sourceHeight = 128;
	gameOverDisplay.width = 256;  
	gameOverDisplay.height = 128;            
	gameOverDisplay.x = canvas.width / 2 - gameOverDisplay.width / 2;
	gameOverDisplay.y = canvas.height / 2 - gameOverDisplay.height / 2;
	gameOverDisplay.scrollable = false;
	gameOverDisplay.visible = false;
}

function playGame()
{ 
	
	//Update alien (where collisions are checked) and monsters
	for (var i = 0; i < sprites.length; i++)
	{
		sprites[i].update();
	}
	//Update the timer message
	timerMessage.text = gameTimer.time;
	if(gameTimer.time < 10)
	{
		timerMessage.text = "0" + gameTimer.time;	//If the number is single-digit, show it as a double-digit number, e.g. 09 instead of 9.
	}

	//Check whether the time is over
	if(gameTimer.time === 0)
	{
		gameState = OVER;
	}
	
} //End playGame function

function endGame()
{
	gameTimer.stop();
	
	//Make the levelCompleteDisplay invisible
	levelCompleteDisplay.visible = false;


	if (gameOverDisplay.visible === false) //To ensure the message isn't drawn multiple times
	{
		//You win if you're on the last level and 
		//you've collected all the stars
		if(levelCounter === levelMaps.length && inventory[0][1] === starsTotal)
		{
			gameOverDisplay.sourceY = 256;
		}
		else
		{
			gameOverDisplay.sourceY = 128;
		}
		gameOverDisplay.visible = true;
		sprites.push(gameOverDisplay);
	}
	
}

function render()
{ 
	//Render the gameWorld & minimap
	drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
	drawingMiniMap.clearRect(0, 0, miniMap.width, miniMap.height);

	drawingInventory.clearRect(0, 0, inventoryDraw.width, inventoryDraw.height);

	//Position the gameWorld inside the camera
	drawingSurface.save();
	drawingSurface.translate(-camera.x, -camera.y);

	//Display the walls and floors on just the map
	for (var i = 0; i < floorsAndWalls.length; i++)
	{
		var floor = floorsAndWalls[i];
		drawingSurface.drawImage
		(
			image, 
			floor.sourceX, floor.sourceY, 
			floor.sourceWidth, floor.sourceHeight,
			Math.floor(floor.x), Math.floor(floor.y), 
			floor.width, floor.height
		); 
	}
	
	//Display the sprites on the gameWorld and minimap
	if(sprites.length !== 0)
	{
		for(var i = 0; i < sprites.length; i++)
		{
			var sprite = sprites[i];

			//display the scrolling sprites on the map
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

				//Draw on minimap: player, boxes, bombs, stars. 
				//Offset destination x/y because I won't draw the walls, so it's 1 block less
				if (!(sprite instanceof Monster))
				{
					drawingMiniMap.drawImage 
					(
						image, 
						sprite.sourceX, sprite.sourceY, 
						sprite.sourceWidth, sprite.sourceHeight,
						Math.floor(sprite.x/4)-16, Math.floor(sprite.y/4)-16,  
						sprite.width/4, sprite.height/4
					); 
				}
			} //End minimap draw

			//display the non-scrolling sprites
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
	}//End map and minimap display
	drawingSurface.restore();

	//Display any game messages
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
	}//End message display
	
	//Display inventory
	for (var i = 0; i < inventory.length; i++)
	{
		//Image
		drawingInventory.drawImage
		(
			image,
			(192 + 64*i), 0,	//source X and Y
			48, 48,				//source W and H
			10,	(10 + i*58),	//dest X and Y
			48, 48				//dest W and H
		);
		//Text
		drawingInventory.font = inventoryMessage.font;
		drawingInventory.fillstyle = inventoryMessage.fillStyle;
		drawingInventory.fillText(inventory[i][1] + "x", inventoryMessage.x, (inventoryMessage.y + i*58));
		
		
	}
}//End render function

}());