(function(){
/*
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

//Game variables
//Any game variables you need
var starsCollected = 0;

//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var OVER = 3;
var LEVEL_COMPLETE = 4;
var PAUSED = 5;
var gameState = LOADING;

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
var ESC = 27;
//Directions
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
	switch(event.keyCode)
	{
		case UP:
			moveUp = true;
			break;

		case DOWN:
			moveDown = true;
			break;

		case LEFT:
			moveLeft = true;
			break;  

		case RIGHT:
			moveRight = true;
			break; 
		
		case ESC:
			if (gameState === PAUSED) { gameState = prevState;} 
			else { prevState = gameState; gameState = PAUSED; }
			break;
	}
}, false);

window.addEventListener("keyup", function(event)
{
	switch(event.keyCode)
	{
		case UP:
			moveUp = false;
			break;

		case DOWN:
			moveDown = false;
			break;

		case LEFT:
			moveLeft = false;
			break;  

		case RIGHT:
			moveRight = false;
			break; 
	}
}, false);

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
		loadNextLevel();
	}

	function loadNextLevel()
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

	youLostDisplay = new spriteObject();
	youLostDisplay.sourceX = 0;
	youLostDisplay.sourceY = 128;
	youLostDisplay.sourceWidth = 256;
	youLostDisplay.sourceHeight = 128;
	youLostDisplay.width = 256;  
	youLostDisplay.height = 128;            
	youLostDisplay.x = canvas.width / 2 - youLostDisplay.width / 2;
	youLostDisplay.y = canvas.height / 2 - youLostDisplay.height / 2;
	youLostDisplay.visible = false;
	youLostDisplay.scrollable = false;
	sprites.push(youLostDisplay);

	youWonDisplay = new spriteObject();
	youWonDisplay.sourceX = 0;
	youWonDisplay.sourceY = 256;
	youWonDisplay.sourceWidth = 256;
	youWonDisplay.sourceHeight = 128;
	youWonDisplay.width = 256;  
	youWonDisplay.height = 128;            
	youWonDisplay.x = canvas.width / 2 - youWonDisplay.width / 2;
	youWonDisplay.y = canvas.height / 2 - youWonDisplay.height / 2;
	youWonDisplay.visible = false;
	youWonDisplay.scrollable = false;
	sprites.push(youWonDisplay);
}

function playGame()
{ 
	//Up
	if(moveUp && !moveDown)
	{
		alien.vy = -4;
	}
	//Down
	if(moveDown && !moveUp)
	{
		alien.vy = 4;
	}
	//Left
	if(moveLeft && !moveRight)
	{
		alien.vx = -4;
	}
	//Right
	if(moveRight && !moveLeft)
	{
		alien.vx = 4;
	}

	//Set the alien's velocity to zero if none of the keys are being pressed
	var DECEL = 0.25;
	if(!moveUp && !moveDown)
	{
		if (alien.vy > 0) { alien.vy -= DECEL; }
		else if (alien.vy < 0) { alien.vy += DECEL; }
	}
	if(!moveLeft && !moveRight)
	{
		if (alien.vx > 0) { alien.vx -= DECEL; }
		else if (alien.vx < 0) { alien.vx += DECEL; }
	}


	//Move the alien and set its screen boundaries
	alien.update();
	
	//Check collision between the alien and the boxes
	for(var i = 0; i < boxes.length; i++)
	{
		blockRectangle(alien, boxes[i]);
	}

	//Check for collisions with stars
	for(var i = 0; i < stars.length; i++)
	{ 
		var star = stars[i];
		if(hitTestRectangle(alien, star) && star.visible)
		{
			star.visible = false;
			starsCollected++;

			//Check whether the level is over
			//by checking if the starsCollected matches
			//the total number in the stars array
			if(starsCollected === stars.length)
			{
				gameState = LEVEL_COMPLETE;
			}    
		}
	}
   
	//Check for collisions with monsters
	for(var i = 0; i < monsters.length; i++)
	{ 
		var monster = monsters[i];
		if(hitTestCircle(alien, monster))
		{
			gameState = OVER;
		}
	}

	//The monsters
	for(var i = 0; i < monsters.length; i++)
	{
		var monster = monsters[i];

		//Move the monsters
		monster.x += monster.vx;
		monster.y += monster.vy;

		//Check whether the monster is at a tile corner
		if(Math.floor(monster.x) % SIZE === 0 && Math.floor(monster.y) % SIZE === 0)
		{
			//Change the monster's direction
			monster.changeDirection();  
		}

		//Change the monster's state to SCARED if
		//it's 128 pixels from the alien
		var vx = alien.centerX() - monster.centerX();
		var vy = alien.centerY() - monster.centerY();

		//Find the distance between the circles by calculating
		//the vector's magnitude (how long the vector is)  
		var magnitude = Math.sqrt(vx * vx + vy * vy);

		if(magnitude < 192)
		{
			monster.state = monster.SCARED;
		}
		else
		{
			monster.state = monster.NORMAL;
		}

		//Update the monster to reflect state changes
		monster.update();
	}
} //End playGame function

function endGame()
{
	//Make the levelCompleteDisplay invisible
	levelCompleteDisplay.visible = false;

	//You win if you're on the last level and 
	//you've collected all the stars
	if(levelCounter === levelMaps.length && starsCollected === stars.length)
	{
		youWonDisplay.visible = true;
	}
	else
	{
		youLostDisplay.visible = true;
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