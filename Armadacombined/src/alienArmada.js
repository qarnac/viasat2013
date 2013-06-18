(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//check to see if the mothership is out
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



// Create the options buttons
// Play sits centered at 1/4th over the screen, Ships at 3/4ths
var playButton = new Options();
playButton.x = canvas.width *1/4 - playButton.width/2;
playButton.y = 0;
sprites.push(playButton);


var shipsButton = new Options();
shipsButton.sourceX += 100;
shipsButton.x = canvas.width *3/4 - shipsButton.width/2;
shipsButton.y = 0;
sprites.push(shipsButton);

//End button creation

// Create different ships
var pinkShip  = new Options();
pinkShip.sourceX = 512;
pinkShip.sourceWidth = pinkShip.width = pinkShip.sourceHeight = pinkShip.height= 32;
pinkShip.x = canvas.width * 1/4 - pinkShip.width / 2;	//Centered at 1 quarter into the screen
pinkShip.y = -200;	//High enough that player can't accidentally shoot (As missile will be removed at y===0)
pinkShip.vy = 0.5;

var tealShip  = new Options();
tealShip.sourceX = 544;
tealShip.sourceWidth = tealShip.width = tealShip.sourceHeight = tealShip.height= 32;
tealShip.x = canvas.width * 3/4 - tealShip.width / 2;	//Centered at 3 quarters into the screen
tealShip.y = -200;
tealShip.vy = 0.5;

sprites.push(pinkShip);
sprites.push(tealShip);	


var shipChosen = 0; //Makes sure that the player's ship doesn't change when they travel to the homeworld.
//End ship creation (pushed into sprites array within selectShip)








//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/alienArmadaRED3.png";
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
gameState = LOADING;

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

//select ship fucntion **
function selectShip()
{
	//Shoot
	if(shoot)
	{
		fireMissile();
		shoot = false;	
	}
	
	//Check collisions
	for (var i = 0; i < sprites.length; i++)
	{
		if (sprites[i] instanceof Missile)
		{
			var missile = sprites[i];
			//Button collision
			if (hitTestRectangle(missile, playButton))
			{
				missile.deathcounter--;
				preGame();
				gameState = PLAYING;				
			}
			else if (hitTestRectangle(missile, shipsButton))
			{
				missile.deathcounter--;
				missile.x = 700;
				shipsButton.x = playButton.x = 500;
				removeObject(shipsButton, sprites);
				removeObject(playButton, sprites);
				removeObject(missile, sprites);
				tealShip.y = pinkShip.y = 0;
				console.log ("I hit a ship button");				
			}
			//End buttons
			
			
			//Ship choice collision
			if (hitTestRectangle(missile, pinkShip) || hitTestRectangle(missile, tealShip))
			{
				if (hitTestRectangle(missile, pinkShip))
				{
					cannon.sourceX = pinkShip.sourceX;
					shipChosen = 1;
				}
				else if (hitTestRectangle(missile, tealShip))
				{
					cannon.sourceX = tealShip.sourceX;
					shipChosen = 2;
				}
				removeObject(missile, sprites);
				preGame();
				gameState = PLAYING;
			}//End ship choices
		}
	}
	//End collisions
	
	//Update frame
	for(var i = 0; i < sprites.length; i++) {
		sprites[i].update();
	}
}

function preGame()
{
	for (var i = 0; i < sprites.length; i++)
	{
		if (sprites[i] instanceof Options || sprites[i].deathcounter === 0)
		{
			removeObject(sprites[i], sprites);
			i--;
		}
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
	for (var i = 0; i < sprites.length; i++) 
	{
	var sprite = sprites[i];
	if (sprite.deathcounter === 0)
		{
		removeObject(sprites[i], sprites);
		}
	}
 
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

		if (shipChosen === 0)
		{
		cannon.sourceX = 480;
		cannon.sourceY = 0;
		}
      //make the mothership
		makeMother();
      
      //make onbly one mother ship
		motherShipCalled = true;
    }
  }
  
  //--- The score 
   scoreDisplay.text = score; //Display the score
  if(score === scoreNeededToWin) //Check for the end of the game
  {
    gameState = OVER;
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
	console.log("Paused. "/*Sprite count: " + sprites.length*/);	//Give feedback (commented section checks to make sure sprites are properly removed)
}
function makeAlien()
{
  //Create the alien and push it to the array
  var alien = new Alien();
  sprites.push(alien);
}

//crates the mothership
function makeMother()
{  
  var mothership = new Mothership();
  sprites.push(mothership);
  
  //**along with the mothership we will create a health bar for it on the side
  var innerMeter = new Bar();	  
  sprites.push(innerMeter);
}


function fireMissile()
{ 
  //Create a missile sprite
  var missile = new Missile(cannon);	
    
  //Push the missile into the sprites array
  sprites.push(missile);

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
