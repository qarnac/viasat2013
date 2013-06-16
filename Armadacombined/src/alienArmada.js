(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//Arrays to store the game objects and assets to load
var sprites = [];
var health = [];
var assetsToLoad = [];
var missiles = [];
var aliens = [];
var messages = [];
var buttons = [];

//**********make scenes for the game
var scene = [];

//check to see if the mothership is out
var motherShipCalled = false;

//Create the background
var background = Object.create(spriteObject);
background.x = 0;
background.y = 0;
background.sourceY = 32;
background.sourceWidth = canvas.width;
background.sourceHeight = canvas.height;
background.width =canvas.width; 
background.height = canvas.height;
sprites.push(background);

//Create the cannon and center it
var cannon = Object.create(spriteObject);
cannon.x = canvas.width / 2 - cannon.width / 2;
cannon.y = canvas.height-40;
sprites.push(cannon);

//Create the score message
var scoreDisplay = Object.create(messageObject);
scoreDisplay.font = "normal bold 30px emulogic";
scoreDisplay.fillStyle = "#00FF00";
scoreDisplay.x = 380;
scoreDisplay.y = 10;
messages.push(scoreDisplay);

//The game over message
var gameOverMessage = Object.create(messageObject);
gameOverMessage.font = "normal bold 20px emulogic";
gameOverMessage.fillStyle = "#00FF00";
gameOverMessage.x = 70;
gameOverMessage.y = 120;
gameOverMessage.visible = false;
messages.push(gameOverMessage);


// Create the options buttons
// Play sits centered at 1/4th over the screen, Ships at 3/4ths
var playButton = Object.create(buttonObject);
playButton.x = canvas.width *1/4 - playButton.width/2;
playButton.y = 0;
sprites.push(playButton);
buttons.push(playButton);

var shipsButton = Object.create(buttonObject);
shipsButton.sourceX += 100;
shipsButton.x = canvas.width *3/4 - shipsButton.width/2;
shipsButton.y = 0;
sprites.push(shipsButton);
buttons.push(shipsButton);
//End button creation

// Create different ships
var pinkShip = Object.create(spriteObject);
pinkShip.sourceX = 512;
pinkShip.x = canvas.width * 1/4 - pinkShip.width / 2;	//Centered at 1 quarter into the screen
pinkShip.y = -200;	//High enough that player can't accidentally shoot (As missile will be removed at y===0)
var tealShip = Object.create(pinkShip);
tealShip.sourceX = 544;
tealShip.x = canvas.width * 3/4 - tealShip.width / 2;	//Centered at 3 quarters into the screen

var shipChosen = false; //Makes sure that the player's ship doesn't change when they travel to the homeworld.
//End ship creation (pushed into sprites array within selectShip)


//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/alienArmadaRED3.png";
assetsToLoad.push(image);


//Push sounds (Created in sounds.js)
music.addEventListener("canplaythrough", loadHandler, false);
assetsToLoad.push(music);
shootSound.addEventListener("canplaythrough", loadHandler, false);
assetsToLoad.push(shootSound);
explosionSound.addEventListener("canplaythrough", loadHandler, false);
assetsToLoad.push(explosionSound);
//End sound loading


//Variable to count the number of assets the game needs to load
var assetsLoaded = 0;


//The different game states. Default is LOADING.
LOADING = 0
PLAYING = 1;
OVER = 2;			
PAUSED = 3;
OPTIONSMENU = 4;

//Game variables
var score = 0;
var motherShipHealth = 60;
var scoreToMotherShip = 0;
var scoreNeededToWin = 160;
var alienFrequency = 100;
var alienTimer = 0;

//******this variable turns the mothership's health bar on and off
var hpVisible = false;

//Add keyboard listeners
window.addEventListener("keydown", keydownhandler, false);	//Executed in keyhandler.js
window.addEventListener("keyup", keyuphandler, false);		//Executed in keyhandler.js

//Start the game animation loop
update();

function moveSprites() //Called in both the main playing loop, and the options select loop
	{
	//Left
	if(moveLeft && !moveRight) { cannon.vx = -6; }
	//Right
	if(moveRight && !moveLeft) { cannon.vx = 6;  }

	//Set the cannon's velocity to zero if none of the keys are being pressed
	if(!moveLeft && !moveRight){ cannon.vx = 0; }

	//Fire a missile if shoot is true (ie, player hit the space bar)
	if(shoot)
	{
		fireMissile();
		shoot = false;	
	}

	for(var i = 0; i < missiles.length; i++)
	{
		var missile = missiles[i];

		//Move it up the screen
		missile.y += missile.vy;

		//Remove the missile if it crosses the top of the screen
		if(missile.y < 0 - missile.height)
		{ 
			//Remove the missile from the missiles and sprites arrays
			removeObject(missile, missiles);
			removeObject(missile, sprites);

			//Reduce the loop counter by 1 to compensate 
			//for the removed element
			i--;
		}
	}
  
	//Move the cannon and keep it within the screen boundaries
	cannon.x = Math.max(0, Math.min(cannon.x + cannon.vx, canvas.width - cannon.width));

	//Move the buttons
	if (gameState === OPTIONSMENU)
		{
		playButton.y += playButton.vy;
		shipsButton.y += shipsButton.vy;
		pinkShip.y += pinkShip.vy;
		tealShip.y += tealShip.vy;
	}
  
	scoreDisplay.text = score;
	
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

			if(hitTestRectangle(missile, alien) && alien.state === alien.NORMAL)
			{
				//checks to see if this is the mothership
				if (alien.sourceWidth === 64)
				{
					if (motherShipHealth === 0) //If the mothership's health has gone to 0, destroy it.
					{
						//Destroy the alien
						destroyAlien(alien);

						//Update the score
						score+=60; 		//Reward with bounty for killing the mothership

						//Remove the missile
						removeObject(missile, missiles);
						removeObject(missile, sprites);
					}
					else
					{
						motherShipHealth--; //If the mothership was hit, but is not at 0 health, reduce its health.

						//Reduce health bar.
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
						}//End health bar reduction

						//Remove the missile
						removeObject(missile, missiles);
						removeObject(missile, sprites);
					}
				}//End mothership check
				else //Otherwise this is a normal alien, so destroy it, increment score, and make it one monster closer to calling the mothership
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
	}//End collision check

	//--- The score
	//Display the score
	scoreDisplay.text = score;

	//Check for the end of the game
	if(score === scoreNeededToWin) { gameState = OVER; }
}

function update()
{ 
  //The animation loop
  requestAnimationFrame(update, canvas);

  //Change what the game is doing based on the game state
  switch(gameState)
  {
    case LOADING:	//0
		console.log("loading…");
		break;
    
    case PLAYING:	//1
		playGame();
		break;
    
    case OVER:		//2
		endGame();
		break;
		
	case PAUSED:	//3
		pauseGame();
		break;
		
	case OPTIONSMENU: //4
		selectShip();
		break;
  }
  
  //Render the game
  render();
}

//select ship fucntion *************************************************************************************** 
function selectShip()
{
	moveSprites(); //Update locations for player, buttons/ships, missiles
	
	//Check for  collisions	
	for (var j = 0; j < missiles.length; j++)
	{
		var missile = missiles[j];
		//Collision with buttons
		for (var i = 0; i < buttons.length; i++)
		{
			var button = buttons[i];
			if (hitTestRectangle(missile, button))
			{
				removeObject(missile, missiles);
				removeObject(missile, sprites);
				if (button === playButton) //If they shot the play Button
				{	
					preGame();
					gameState = PLAYING;
				}
				if (button === shipsButton)//If they shot the ships button 
				{
					//Remove the other button
					removeObject(playButton, sprites);	
					removeObject(playButton, buttons);	
					removeObject(shipsButton, sprites); 
					removeObject(shipsButton, buttons); 
					
					//And start moving the ship choices down.
					tealShip.y = pinkShip.y = 0;
					tealShip.visible = pinkShip.visible = true; 
					tealShip.vy = pinkShip.vy = 0.5;
					sprites.push(pinkShip);
					sprites.push(tealShip);	
				}
			}
		}//End button collision
		
		//Collision with ship choices
		if (hitTestRectangle(missile, pinkShip) || hitTestRectangle(missile, tealShip))
		{
			//Change the sourceX to the right spot
			if (hitTestRectangle(missile, pinkShip)) { cannon.sourceX = pinkShip.sourceX; }
			else 									 { cannon.sourceX = tealShip.sourceX; }
			shipChosen = true; //Make note that custom ship has been selected
			removeObject(missile, missiles);
			removeObject(missile, sprites);
			
			preGame();	//Start the game
			gameState = PLAYING;
		}//End ship choices collision
		
		//If user fails to select either ship, go with default ship and start game
		if (pinkShip.y > canvas.height)
		{	
			gameState = PLAYING;
			preGame();
		}
	}  //End collision detection

	//If user fails to select either button, just start game
	if (playButton.y === canvas.height)
	{
		gameState = PLAYING;
		preGame();
	}
}


function loadHandler()
{  
  assetsLoaded++;
  if(assetsLoaded === assetsToLoad.length)
  {
    //Remove the load event listener from the image and sounds
    image.removeEventListener("load", loadHandler, false);
    music.removeEventListener("canplaythrough", loadHandler, false);
    shootSound.removeEventListener("canplaythrough", loadHandler, false);
    explosionSound.removeEventListener("canplaythrough", loadHandler, false);
    console.log(assetsLoaded + "/" + assetsToLoad.length + " assets loaded");
    //Play the music
    music.play();

	//Set default volumes
	music.volume = shootSound.volume = explosionSound.volume= .3;
    
    //Go to the next game state
    gameState = OPTIONSMENU;
  }
}

//Called between options menu and play game, to clear out all the options sprites
function preGame()
{
	removeObject(shipsButton, sprites);
	removeObject(shipsButton, buttons);		
	removeObject(playButton, sprites);
	removeObject(playButton, buttons);	
	removeObject(pinkShip, sprites);
	removeObject(tealShip, sprites);	
	playGame(); //Start the game
}

function playGame()
{
	moveSprites(); //Move the aliens, mothership, player, and missiles

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
			
			//If the player is using the default ship, change it to a special one. Otherwise, leave it alone
			if (!shipChosen) { cannon.sourceX = 480; cannon.sourceY = 0; }
			
			//make the mothership
			makeMother();
			motherShipCalled = true; //Make sure there will only be one mothership
		}
	}//End alien creation
}

function destroyAlien(alien)
	{
	//Change the alien's state and update the object 
	alien.state = alien.EXPLODED;
	alien.vy /= 3; //Slow it down greatly

	alien.update();  //Changes the model to the explosion

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

function endGame()
	{
	gameOverMessage.visible = true;
	
	//Display a win/loss message on the screen
	if(score < scoreNeededToWin)
	{
		gameOverMessage.text = "EARTH DESTROYED!";
	}
	else
	{
		gameOverMessage.x = 120;
		gameOverMessage.text = "EARTH SAVED!";
	}
}

function pauseGame()
{
	console.log("Paused"); //Give a bit of feedback
}

function makeAlien()
{
  //Create the alien
  var alien = Object.create(alienObject);
  alien.sourceX = 32;
  
  //Set its y position above the screen boundary
  alien.y = 0 - alien.height;
  
  //Assign the alien a random x position
  var randomPosition = Math.floor(Math.random() * 15);
  //var randomPosition = Math.floor(Math.random() * (canvas.width / alien.width));
  alien.x = randomPosition * alien.width;
  
  //Set its speed
  alien.vy = 1;
  
  //Push the alien into both the sprites and aliens arrays
  sprites.push(alien);
  aliens.push(alien);
}

//crates the mothership
function makeMother()
{
  //Create the alien
  var alieM = Object.create(alienObject);
  alieM.sourceX = 128;
  
  //its dimensions
  alieM.sourceWidth = 64;
  alieM.sourceHeight = 32;
  alieM.width = 64;
  alieM.Height = 32;
 
 //Set its y position above the screen boundary
  alieM.y = 0 - alieM.height;
  
  //Center it over the screen
  alieM.x = canvas.width / 2 - alieM.width / 2;
 
  //Set its speed
  alieM.vy = .2;
  
  //Push the alien into both the sprites and aliens arrays
  sprites.push(alieM);
  aliens.push(alieM);
  
  //**along with the mothership we will create a health bar for it on the side
  var innerMeter = Object.create(spriteObject);
  innerMeter.sourceY =0;
  innerMeter.sourceX = 256;
  innerMeter.sourceWidth = 180;
  innerMeter.sourceHeight = 32;
  innerMeter.width = 180;
  innerMeter.height = 32;
  innerMeter.vis = 1;
  health.push(innerMeter);
  hpVisible =true;
  
  sprites.push(innerMeter);
  
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


}());//End alienArmada.js
