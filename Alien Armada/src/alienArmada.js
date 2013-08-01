(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//Create the background
var background = new levelEntityClass();
scenes.push(background);


//this variable will track what leve we are on
var levelNumber = 0; //earth will be level 0, since it is the start
var loadLevel = false;

//Create the cannon and center it
cannon = new Cannon(canvas.width / 2 - 32 / 2, 280);
sprites.push(cannon);

//Create the score message
var scoreDisplay = new Message();
scoreDisplay.font = "normal bold 14px emulogic";
scoreDisplay.x = 300;
scoreDisplay.y = 10;
scoreDisplay.visible = true;
messages.push(scoreDisplay);


//The game over message
gameOverMessage = new Message();
gameOverMessage.font = "normal bold 20px emulogic";
gameOverMessage.x = 70;
gameOverMessage.y = 120;
gameOverMessage.visible = false;
messages.push(gameOverMessage);

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/alienArmadaRED3.png";
assetsToLoad.push(image);

//JT: this is just to load the background for the stars
var bgimage = new Image();
bgimage.addEventListener("load", loadHandler, false);
bgimage.src = "../images/space.png";
assetsToLoad.push(bgimage);

//Push sounds
music.addEventListener("canplaythrough", loadHandler, false);
shootSound.addEventListener("canplaythrough", loadHandler, false);
explosionSound.addEventListener("canplaythrough", loadHandler, false);
assetsToLoad.push(music);
assetsToLoad.push(shootSound);
assetsToLoad.push(explosionSound);
//End sound loading

//Variable to count the number of assets the game needs to load
var assetsLoaded = 0;

//Add keyboard listeners
window.addEventListener("keydown", keydownhandler, false);	//Executed in keyhandler.js
window.addEventListener("keyup", keyuphandler, false);		//Executed in keyhandler.js

//Start the game animation loop
update();

function update()
{ 	
	//The animation loop
	requestAnimationFrame(update, canvas);
	//Change what the game is doing based on the game state
	switch(gameState)
	{
		case PLAYING:
		playGame();
		break;

		case OVER:
		endGame();
		break;

		case CHANGE_LEVEL:
		changingLevels();
		gameState = PLAYING;
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
    //Remove the load event listener from the image and sounds
    image.removeEventListener("load", loadHandler, false);
	bgimage.removeEventListener("load", loadHandler, false);
    music.removeEventListener("canplaythrough", loadHandler, false);
    shootSound.removeEventListener("canplaythrough", loadHandler, false);
    explosionSound.removeEventListener("canplaythrough", loadHandler, false);
    //Play the music
    music.play();

	//Set default volumes
	music.muted = true;
	music.volume = shootSound.volume = explosionSound.volume= .3;
    
    //Start the game 
    gameState = PLAYING;
  }
}

function playGame()
{
	//Fire a missile if shoot is true
	if(shoot)
	{
		fireMissile();
		shoot = false;	
	}
  
	//Go through all sprites. If no more framesremaining, remove them from the game. Otherwise, update them
	for(var i = 0; i < sprites.length; i++) 
	{
		if (sprites[i].framesremaining === 0)
		{
			removeObject(sprites[i], sprites);
			i--;	//Go back 1 element, to make up for the fact that an element was just removed
		}
		
		else
		{
			sprites[i].update();
		}
	}

	//Add one to the alienOption.timer
	alienOption.timer++;

	//Make a new alien if timer equals the frequency
	if(alienOption.timer === alienOption.frequency)
	{
		sprites.push(new Alien()); //Put a new alien into the sprites array
		
		alienOption.timer = 0;	//Reset the timer

		//Reduce frequency by one to gradually increase the frequency that aliens are created
		if(alienOption.frequency > 2)
		{  
			alienOption.frequency--;
		}


		//If the score is right, and a mothership is not yet called, and the player hasn't selected to have no motherships
		if ((mothershipOption.scoreToMother <= 0) && mothershipOption.called === false && newSettings.motherspawns !== "no")
		{
			//make the mothership
			makeMother();
			mothershipOption.called = true;
			mothershipOption.scoreToMother = newSettings.spawn; //After the first one has been spawned, then take the rate the player has set (default = 40) for future spawns
		}
	}

	controlPowerups(); //All of the functions related to spawning powerups in here, to de-clutter the playGame function.

	//Display the score
	scoreDisplay.text = "Score: " + gameConditions.score;

	//Check if any win conditions have been met. And make sure that the option for that win condition has been enabled. And make sure it has not been met before.
	if(gameConditions.score >= newSettings.winscoreNum && newSettings.winscore && !gameConditions.scoreMet)
	{	gameConditions.winConditions++;  gameConditions.scoreMet = true; }
	if (gameConditions.timer >= newSettings.wintimeNum*60 && newSettings.wintime && !gameConditions.timeMet) //Multiply by 60 for the 60 frames per second
	{	gameConditions.winConditions++;  gameConditions.timeMet = true; }
	if (gameConditions.ships >= newSettings.winshipNum && newSettings.winship && !gameConditions.shipsMet)
	{	gameConditions.winConditions++;  gameConditions.shipsMet = true; }

	//If enough win conditions (also customizable by the player) are met, then end the game
	if (gameConditions.winConditions >= newSettings.wincondsneeded)
	{	gameState = OVER;  }

	//KN: changed this to account for situations where mothership kills will make the player skip score == 30.
	if (gameConditions.score >= 30 && loadLevel === false) //Go to the next level
	{
		gameConditions.score++;
		levelNumber++;
		loadLevel = true;
		gameState = CHANGE_LEVEL;
	}

	//JT:this will scroll the background, which is stored inside a new array
	for (var i = 0; i < scenes.length;i++) 
	{
		scenes[i].update();
	}

}//end playGame

function controlPowerups()
{
	gameConditions.timer++;
	
/*
The powerup controls are all clones of each other. So I am just commenting the first one heavily.
*/
	if (newSettings.repairspawns !== "no") //If the button to spawn repairs has been checked
//Repair
	{
		//If repair kits drop on a score basis
		if (newSettings.repairspawns === "score")//if (newSettings.repairscore)
		{
			if (gameConditions.score >= powerupOption.repairSpawn) //Then check if the current score is high enough to merit a  kit
			{
				//Make a new repair kit
				var repair = new Powerup("Repair");
				sprites.push(repair);
				powerupOption.repairSpawn = gameConditions.score + Math.round(Math.random()*30+10); //Set a timer for the next kit to spawn at.
			}
		}
	}
	
//Bomb
	if (newSettings.bombspawns !== "no")
	{
		if (newSettings.bombspawns === "score")
		{
			if (gameConditions.score >= powerupOption.bombSpawn)
			{
				var bomb = new Powerup("Bomb");
				sprites.push(bomb);
				powerupOption.bombSpawn = gameConditions.score + Math.round(Math.random()*40+6); //Set a new score at which to spawn another bomb
			}
		}
		else if (newSettings.bombspawns === "time")
		{
			if (gameConditions.timer >= powerupOption.bombSpawn)
			{
				var bomb = new Powerup("Bomb");
				sprites.push(bomb);  
				powerupOption.bombSpawn = gameConditions.timer + Math.round(Math.random()*60*10+20); //Set a new time at which to spawn another bomb
			}
		}
	}
	
//Scoreup
	if (newSettings.scoreupspawns !== "no")
	{
		if (newSettings.scoreupspawns === "score")
		{
			if (gameConditions.score >= powerupOption.scoreupSpawn)
			{
				var scoreup = new Powerup("Scoreup");
				sprites.push(scoreup);
				powerupOption.scoreupSpawn = gameConditions.score + Math.round(Math.random()*40+6); //Set a new score at which to spawn another scoreup
			}
		}
		else if (newSettings.scoreupspawns === "time")
		{
			if (gameConditions.timer >= powerupOption.scoreupSpawn)
			{
				var scoreup = new Powerup("Scoreup");
				sprites.push(scoreup);  
				powerupOption.scoreupSpawn = gameConditions.timer + Math.round(Math.random()*60*10+20); //Set a new time at which to spawn another scoreup
			}
		}
	}

//Slow
	if (newSettings.slowspawns !== "no")
	{
		if (newSettings.slowspawns === "score")
		{
			if (gameConditions.score >= powerupOption.slowSpawn)
			{
				var slow = new Powerup("Slow");
				sprites.push(slow);
				powerupOption.slowSpawn = gameConditions.score + Math.round(Math.random()*30+20); //Set a new score at which to spawn another slow
			}
		}
		else if (newSettings.slowspawns === "time")
		{
			if (gameConditions.timer >= powerupOption.slowSpawn)
			{
				var slow = new Powerup("Slow");
				sprites.push(slow);  
				powerupOption.slowSpawn = gameConditions.timer + Math.round(Math.random()*60*30+20); //Set a new time at which to spawn another slow
			}
		} 
	}
	
}

function endGame()
{
	//Set the message depending on whether the player won or lost
  if (gameConditions.winConditions >= newSettings.wincondsneeded)	
  {
    gameOverMessage.x = 120;
    gameOverMessage.text = "EARTH SAVED!";
  }
  else
  {
    gameOverMessage.text = "EARTH DESTROYED!";
  }
  gameOverMessage.visible = true; //And make it visible
}

function changingLevels ()
{
  //load the level, and check to see if we should update it
  if (loadLevel === true) {
    
	switch(levelNumber) 
	{
		case 0:
		break;

		case 1:
		var marsBackground = new levelEntityClass();
		marsBackground.sourceX = 480; 
		scenes.splice(0, 1, marsBackground);	//KN: Changed to splice from scenes, now that we're using that.
		break;
	}
  }
}
//creates the mothership
function makeMother()
{  

    mothership = new Alien();
	mothership.sourceX = 128;
	mothership.sourceWidth = 64;
	mothership.width = 64;
	mothership.x = 480/2 - mothership.width/2;
	mothership.vy = .2;	  
	mothership.health = mothership.MAXHEALTH = newSettings.motherhealth; //Set the ship's health based on the option setting, under the Aliens section
	mothership.bounty = newSettings.motherbounty; //Set the ship's bounty (score earned from destruction) based on the option setting, under the Aliens section
	
	sprites.push(mothership);
  
	//**along with the mothership we will create a health bar for it on the side
	var innerMeter = new Bar();	  
	sprites.push(innerMeter);
}

function fireMissile()
{ 
	if (cannon.firingType === 2) //fire 2 angled missiles
	{
		var missile = new Missile(cannon);	
		missile.vx = 2;
		missile.vy = -5;
		sprites.push(missile);
		
		missile = new Missile(cannon);
		missile.vx = -2;
		missile.vy = -5;
		sprites.push(missile);		
	}
	else //Either firing the straight missiles or the mothership-seeking missiles
	{
		var missile = new Missile(cannon);	
		sprites.push(missile);
	}
  //Play the firing sound
  shootSound.currentTime = 0;
  shootSound.play();
}

function render()
{ 
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  //Display the star field background
  drawingSurface.drawImage 
  (
	bgimage,
	0, 0,
	480, 320,
	0, 0,
	480, 320
	);
   
    //JT: Display the scenes.   
	if(scenes.length !== 0)
	{
		for(var i = 0; i < scenes.length; i++)
		{
			var scene = scenes[i];
			drawingSurface.drawImage
			(
			image, 
			scene.sourceX, scene.sourceY, 
			scene.sourceWidth, scene.sourceHeight,
			Math.floor(scene.x), Math.floor(scene.y), 
			scene.width, scene.height
			); 
		}
	}
  
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

	//Display a lives counter in the bottom left
	for (var i = 0; i < gameConditions.lives; i++)
	{
		drawingSurface.drawImage 
		(
		image,
		cannon.sourceX, cannon.sourceY, //Uses cannon's current source, to react to model changes
		32, 32,
		(10 + i*24), 290, //The draw is going to start at 10px over, and then each additional life is going to be 24 pixels further over (16 for the sprite size, +8 for some spacing)
		16, 16
		);
	}
}//End render()

}());
