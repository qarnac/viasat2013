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
		
		case RESET_LEVEL:
			clearLevel();
			break;
			
		case PAUSED:
			break;
	}

	//Render the game
	render();
}

/*Called directly in update for RESET_LEVEL (after a player loses a life), and called by levelComplete when transitioning between levels.
Waits a half-second before doing anything.

Note that the for loop ignores the very last inventory element (lives).
Otherwise, it sets almost everything back to default: Sprites on the map, items in inventory, the timer, and the camera.
*/
function clearLevel()
{
	levelChangeTimer++;	
	if ((gameState === RESET_LEVEL && levelChangeTimer === 30) || (gameState === LEVEL_COMPLETE))
	{
		//Clear the arrays of objects
		sprites = [];
		floorsAndWalls = [];

		//Reset any gameVariables
		starsTotal = 0;	//A counter of how many stars are on the map (Formerly was a separate array)
		
		//Reset inventory counts
		/*	Loops 1 less than inventory.length because the last element will be lives (which will not get reset)
		If the player died (gameState === RESET_LEVEL), then reset the total counter of items they picked up
			(done by just reducing their total count by the amount they had during this run).
		And in either case, reset their current counter of items afterward.
		*/
		for (var i = 0; i < inventory.length-1; i++)
		{
			if (gameState === RESET_LEVEL) {inventory[i][4] -= inventory[i][1]; }
			inventory[i][1] = 0;
		}
		

		timerMessage.text = "";	//The message
		gameTimer.time = 60;	//The timer itself

		//Re-center the camera
		camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
		camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;
		
		//If the level was being reset, then reset the timer, and rebuild the map. 
		if (gameState === RESET_LEVEL) { levelChangeTimer = 0; gameState = BUILD_MAP;}
	}	
}

function levelComplete()
{
	levelCompleteDisplay.visible = true; 
	
	levelChangeTimer++; //To add a delay in-between levels.
	
	//Wait a half-second before continuing with the function
	if (levelChangeTimer === 30)
	{
		levelChangeTimer = 0;
		levelCounter++;
		clearLevel(); //Another half-second will pass in here
		displayScore(); //Console.log statements at the moment.
		
		if (levelCounter < levelMaps.length)
		{
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

function loadHandler()
{ 
	assetsLoaded++;
	if(assetsLoaded === assetsToLoad.length)
	{
		//Remove the load handler
		image.removeEventListener("load", loadHandler, false);

		//Build the map 
		gameState = BUILD_MAP;
	}
}

function buildMap(levelMap)
{

	var rows = levelMap.length
	var columns = levelMap[0].length	

	/*sizemult: Divide the playable game space (ie, everything inside walls) by 4, to get a constant that'll be used as a size multiplier
	The destination x/y and width/height will be divided by this number, so that bigger maps get smaller icons, to fit everything properly in the minimap
	Destination x/y also have SIZE/sizemult as an offset, where SIZE is 64 (defined in GlobalVariables). Needed to adjust the minimap left and upward, to account for the lack of walls being drawn. 
	Bigger maps have smaller minimap icons, so they need smaller offsets.
	*/
	sizemult = (	(Math.max(levelMaps[levelCounter].length, levelMaps[levelCounter][0].length))	/4);

	
	for(var row = 0; row < rows; row++) 
	{	
		for(var column = 0; column < columns; column++) 
		{ 
			var currentTile = levelMap[row][column];

			if(currentTile !== EMPTY)
			{
				//Find the tile's x and y position on the tile sheet
				var tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE; 
				var tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;
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
	timeTaken++; //Will record the total amount of time taken
	
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
	if (gameTimer.time < 0) //Takes care of cases where the player tabs away from the game. They can return to a timer below 0, and the game won't end. But combining this and the below if statement will make the game end with the timer showing the negative.
	{
		gameTimer.time = 1;
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
	displayScore(); //Console.log statements 

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
		//Otherwise, you lost
		else
		{
			gameOverDisplay.sourceY = 128;
		}
		gameOverDisplay.visible = true;
		sprites.push(gameOverDisplay);
	}
	
}

/* displayScore: presently just called either on loss, or on level complete (but not on level reset).
Lists the amount of bombs, stars, and lives picked up and used.
Intentionally does not count the amounts that were picked up and then lost on a death, those get removed during the clearLevel function (Reduces the "picked up" quantity by the "current" quantity, and then resets the current quantity too).

The goal would be to have some kind of high score system eventually, saved in an output file (But I'll have to figure out php for that).
*/
function displayScore()
{
	console.log("Time taken: " + Math.floor(timeTaken/60));
	console.log("Stars: " + inventory[0][4] + " picked up.");
	console.log("Bombs: " + inventory[1][4] + " picked up, " + inventory[1][5] + " used.");
	console.log("Lives: " + inventory[3][4] + " picked up, " + inventory[3][5] + " used.");
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
				//sizemult is set in buildMap (It's based off of the gameWorld size compared to the minimap size). It's used to make big maps shrink to fit into the minimap, and small maps grow to fit.
				if (!(sprite instanceof Monster))
				{					
					drawingMiniMap.drawImage 
					(
						image, 
						sprite.sourceX, sprite.sourceY, 
						sprite.sourceWidth, sprite.sourceHeight,
						
						Math.floor(sprite.x/sizemult)-16, Math.floor(sprite.y/sizemult)-16,  
						sprite.width/sizemult, sprite.height/sizemult
					); 
				} //End minimap draw
			
			}

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
		/*
		Source X and Source Y are elements in the inventory array.
		For destination x, the Math.floor(i/3) will make sure that the 4th, 5th, and 6th items will be moved over a column.
		"Floor" will always round down, even if it is .9999. So Math.floor(2/3) = Math.floor(.66) = 0. But Math.floor(4/3) = Math.floor(1.33) = 1.
		For destination y, i%3 will make sure that they restart at the top of the canvas.		
		*/
		drawingInventory.drawImage
		(
			image,
			inventory[i][2], inventory[i][3],	//source X and Y
			64, 64,				//source W and H
			(10+112*Math.floor(i/3)),	(10 + ((i%3)*58)),	//dest X and Y
			48, 48				//dest W and H
		);
		//Text
		
		drawingInventory.font = inventoryMessage.font;
		drawingInventory.fillstyle = inventoryMessage.fillStyle;
		/*
			First parameter prints out the quanitity and an x, so like "3x" for lives.
			Second parameter is the destination x. inventoryMessage.x is 60. this makes sure that the message is at least 60*1 over, but for i > 3, it will be 60*3 over
			Third parameter is the destination y. inventoryMessage.y is 40. It goes down by 58 more for every iteration (i*58), but then once i > 3, it resets and starts back at 40 (ie, starting a new column)
		*/
		drawingInventory.fillText(	inventory[i][1] + "x", inventoryMessage.x * (1 + 2*Math.floor(i/3)), (inventoryMessage.y + (i%3)*58)	);		
	}
}//End render function

}());