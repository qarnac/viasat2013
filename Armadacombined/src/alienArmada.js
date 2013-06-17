//instanceof
//console.log(alien instanceof Alien);

(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//Arrays to store the game objects and assets to load
/*var sprites = [];
var health = [];
var assetsToLoad = [];
var missiles = [];
var aliens = [];
var messages = [];

//**********make scenes for the game
var scene = [];*/

//check to see if the mothershipp is out
var motherShipCalled = false;

//Create the background
var background = new EntityClass(0, 0);	//Object.create(spriteObject);
background.x = 0;
background.y = 0;
background.sourceY = 32;
background.sourceWidth = 480;
background.sourceHeight = 320;
background.width = 480;
background.height = 320;
sprites.push(background);

//Create the cannon and center it
/*
var cannon = Object.create(spriteObject);
cannon.x = canvas.width / 2 - cannon.width / 2;
cannon.y = 280;
sprites.push(cannon);
*/
var cannon = new Cannon(canvas.width / 2 - 32 / 2, 280);
sprites.push(cannon);

//Create the score message
var scoreDisplay = Object.create(messageObject);
scoreDisplay.font = "normal bold 30px emulogic";
scoreDisplay.fillStyle = "#00FF00";
scoreDisplay.x = 400;
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

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/alienArmadaRED.png";
assetsToLoad.push(image);


//Push sounds
music.addEventListener("canplaythrough", loadHandler, false);
assetsToLoad.push(music);

shootSound.addEventListener("canplaythrough", loadHandler, false);
assetsToLoad.push(shootSound);

explosionSound.addEventListener("canplaythrough", loadHandler, false);
assetsToLoad.push(explosionSound);
//End sound loading


//Variable to count the number of assets the game needs to load
var assetsLoaded = 0;


//All moved to keyhandler.js for now
var LOADING = 0
var PLAYING = 1;
var OVER = 2;			//Moved to keyhandler.js
var PAUSED = 3;
var OPTIONSMENU = 4;

/* 
//Game states
var LOADING = 0
var PLAYING = 1;
var OVER = 2;
var PAUSED = 3;
var OPTIONSMENU = 4;
var gameState = LOADING;

//Arrow key codes
var RIGHT = 39;
var LEFT = 37;						
var SPACE = 32;
var ESC = 27;
var S = 83;


//Directions
var moveRight = false;
var moveLeft = false;

//Variables to help fire missiles
var shoot = false;
var spaceKeyIsDown = false;*/

gameState = LOADING;
//Game variables
/*var score = 0;
var motherShipHealth = 60;
var scoreToMotherShip = 0;
var scoreNeededToWin = 160;
var alienFrequency = 100;
var alienTimer = 0;*/

//******this variable turns the health bar on and off
var hpVisible = false;

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

//select ship fucntion *************************************************************************************** 
function selectShip()
{
  playGame();
  gameState = PLAYING;
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
	music.muted = true;
	music.volume = shootSound.volume = explosionSound.volume= .3;
    
    //Start the game 
    gameState = OPTIONSMENU;
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
  
  //YO: add a loop to update all sprite objects
  for(var i = 0; i < sprites.length; i++) {
	sprites[i].update();
  }
  
  //Add a loop to delete all dead objects after their delay
  for (var i = 0; i < aliens.length; i++) {
	var alien = aliens[i];
	if (alien.deathcounter === 0)
	{
	removeObject(aliens[i], sprites);
	removeObject(aliens[i], aliens);
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
	
	
	if ((scoreToMotherShip >= 2) && motherShipCalled === false)
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
 
  //--- The collisions 

  //Check for a collision between the aliens and missiles
  
	for(var i = 0; i < aliens.length; i++)
	{
		var alien = aliens[i];

		for(var j = 0; j < missiles.length; j++)
		{
			var missile = missiles[j];

			if(hitTestRectangle(missile, alien)	&& alien.state === alien.NORMAL)
			{
				//HEALTH BAR STUFF NOW
				if (alien.sourceWidth === 64)
				{	    
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
				} //END HEALTH BAR STUFF
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

function endGame()
{
  gameOverMessage.visible = true;
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
	console.log("Paused");	
}
function makeAlien()
{
  //Create the alien
  var alien = new Alien();
  
  //Push the alien into both the sprites and aliens arrays
  sprites.push(alien);
  aliens.push(alien);
}

//crates the mothership
function makeMother()
{  
  var mothership = new Mothership();
  sprites.push(mothership);
  aliens.push(mothership);
  
  //**along with the mothership we will create a health bar for it on the side
  var innerMeter = new Bar();	  
  health.push(innerMeter);
  sprites.push(innerMeter);
}


function fireMissile()
{ 
  //Create a missile sprite
  var missile = new Missile(cannon);	
    
  //Push the missile into both the sprites and missiles arrays
  sprites.push(missile);
  missiles.push(missile);

  //Play the firing sound
  shootSound.currentTime = 0;
  shootSound.play();
}

function endGame()
{
  gameOverMessage.visible = true;
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
