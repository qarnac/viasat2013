(function(){
/* Moved to GlobalVariables, so that they can be accessed in Camera
//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

var miniMap = document.querySelector("#miniMap");
var drawingMiniMap = miniMap.getContext("2d");

//var inventory = document.querySelector("#inventory");
//var drawingInventory = inventory.getContext("2d");
*/

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/monsterMayhem.png";
assetsToLoad.push(image);

//The number of columns on the tilesheet
var tilesheetColumns = 4;

//Add keyboard listeners, handled in keyhandler.js
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
			console.log("loading...");
			break;

		case BUILD_MAP:
			buildMap(levelMaps[levelCounter]);
			buildMap(levelGameObjects[levelCounter]);
			createOtherSprites();
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
			monsters = [];
			boxes = [];
			stars = [];

			//Reset any gameVariables
			starsCollected = 0;

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

	/*function loadNextLevel()
	{
		
	}*/
}

function loadHandler()
{ 
	assetsLoaded++;
	//console.log("Loaded " + assetsLoaded + " / " + assetsToLoad.length);
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
					case FLOOR:
						var floor = new spriteObject(row, column);
						floor.sourceX = tilesheetX;
						floor.sourceY = tilesheetY;
						sprites.push(floor);
						break;

					case BOX:
						var box = new spriteObject(row, column);
						box.sourceX = tilesheetX;
						box.sourceY = tilesheetY;
						sprites.push(box);
						boxes.push(box);
						break;

					case WALL:
						var wall = new spriteObject(row, column);
						wall.sourceX = tilesheetX;
						wall.sourceY = tilesheetY;            
						sprites.push(wall);
						break;

					case MONSTER:
						var monster = new Monster(row, column);
						//Make the monster choose a random start direction 
						monster.changeDirection();
						monsters.push(monster);
						sprites.push(monster);
						break; 

					case STAR:
						var star = new spriteObject(row, column);
						star.sourceX = tilesheetX;
						star.sourceY = tilesheetY;
						star.sourceWidth = 48;
						star.sourceHeight = 48;
						star.width = 48;  
						star.height = 48;          
						star.x += 8;
						star.y += 8;	//They are smaller than a tile size, so an offset centers them.
						stars.push(star);
						sprites.push(star);
						break;

					case ALIEN:
						alien = new Player(row, column); //spriteObject();
						alien.sourceX = tilesheetX;
						alien.sourceY = tilesheetY;            
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

	//Update alien, camera, check collisions.
	alien.update();
  
	//Update monsters
	for(var i = 0; i < monsters.length; i++)
	{
		monsters[i].update();
	}
	
} //End playGame function

function endGame()
{
	//Make the levelCompleteDisplay invisible
	levelCompleteDisplay.visible = false;


	if (gameOverDisplay.visible === false) //To ensure the message isn't drawn multiple times
	{
		//You win if you're on the last level and 
		//you've collected all the stars
		if(levelCounter === levelMaps.length && starsCollected === stars.length)
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
	//drawingInventory.clearRect(0, 0, inventory.width, inventory.height);

	//Position the gameWorld inside the camera
	drawingSurface.save();
	drawingSurface.translate(-camera.x, -camera.y);

	//Display the sprites on the gameWorld
	if(sprites.length !== 0)
	{
		for(var i = 0; i < sprites.length; i++)
		{
			var sprite = sprites[i];

			//display the scrolling sprites
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

				//Draw the scrollable sprites on the minimap, as long as they aren't monsters
				if (!(sprite instanceof Monster))
				{
					drawingMiniMap.drawImage 
					(
						image, 
						sprite.sourceX, sprite.sourceY, 
						sprite.sourceWidth, sprite.sourceHeight,
						Math.floor(sprite.x/4), Math.floor(sprite.y/4), 
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
	}  
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
	}
}//End render function

}());