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

//check to see if the mothershipp is out
var motherShipCalled = false;

//Create the background
var background = Object.create(spriteObject);
background.x = 0;
background.y = 0;
background.sourceY = 32;
background.sourceWidth = 480;
background.sourceHeight = 520;
background.width = 480;
background.height = 520;
sprites.push(background);

//Create the cannon and center it
var cannon = Object.create(spriteObject);
cannon.x = canvas.width / 2 - cannon.width / 2;
cannon.y = 480;
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

var optionsSelected = false;
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

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/alienArmadaRED2.png";
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
//Game variables
var score = 0;
var motherShipHealth = 60;
var scoreToMotherShip = 0;
var scoreNeededToWin = 160;
var alienFrequency = 100;
var alienTimer = 0;

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

	
	music.volume = shootSound.volume = explosionSound.volume= .3;
    
    //Start the game 
    gameState = OPTIONSMENU;
  }
}

function playGame()
{
  //Left
  if(moveLeft && !moveRight)
  {
    cannon.vx = -6;
  }
  //Right
  if(moveRight && !moveLeft)
  {
    cannon.vx = 6;
  }

  //Set the cannon's velocity to zero if none of the keys are being pressed
  if(!moveLeft && !moveRight)
  {
    cannon.vx = 0;
  }

  //Fire a missile if shoot is true
  if(shoot)
  {
    fireMissile();
    shoot = false;	
  }
  
  //Move the cannon and keep it within the screen boundaries
  cannon.x = Math.max(0, Math.min(cannon.x + cannon.vx, canvas.width - cannon.width));
  
  //Move the buttons
  playButton.y += playButton.vy;
  shipsButton.y += shipsButton.vy;
  
  //Move the missiles
  for(var i = 0; i < missiles.length; i++)
  {
    var missile = missiles[i];

    //Move it up the screen
    missile.y += missile.vy;

    //Remove the missile if it crosses the top of the screen
    if(missile.y < 0 - missile.height)
    { 
      //Remove the missile from the missiles array
      removeObject(missile, missiles);

      //Remove the missile from the sprites array
      removeObject(missile, sprites);

      //Reduce the loop counter by 1 to compensate 
      //for the removed element
      i--;
    }
  }

  //Make the aliens

  //Add one to the alienTimer, only after options have been selected
  if (optionsSelected)
  {
  alienTimer++;
	}
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

    cannon.sourceX = 480;
    cannon.sourceY = 0;
      
      //make the mothership
      makeMother();
      
      //make onbly one mother ship
      motherShipCalled = true;
    }
  }

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
  //Check for button collisions
  /*
  for (var i = 0; i < buttons.length; i++)
  {
	var button = buttons[i];
	for (var j = 0; j < missiles.length; j++)
	{
		var missile = missiles[j];
		
		if (hitTestRectangle(missile, button))
		{
			if (button = playButton) {optionsSelected = true;}
			removeObject(button, buttons);
			removeObject(button, sprites);
			removeObject(missile, missiles);
			removeObject(missile, sprites);
		}
	}
  }*/
   for (var i = 0; i < missiles.length; i++)
  {
	var missile = missiles[i];
	for (var j = 0; j < buttons.length; j++)
	{
		var button= buttons[j];
		
		if (hitTestRectangle(missile, button))
		{
			if (button === playButton) {optionsSelected = true;}
			removeObject(button, buttons);
			removeObject(button, sprites);
			removeObject(missile, missiles);
			removeObject(missile, sprites);
		}
	}
}

  //Check for a collision between the aliens and missiles
   for(var i = 0; i < aliens.length; i++)
  {
    var alien = aliens[i];

    for(var j = 0; j < missiles.length; j++)
    {
      var missile = missiles[j];
      
      if(hitTestRectangle(missile, alien)
      && alien.state === alien.NORMAL)
      {
	//checks to see if this is the mothership
	if (alien.sourceWidth === 64)
	{
	  if (motherShipHealth === 0)
	  {
	     //Destroy the alien
	    destroyAlien(alien);
    
	    //Update the score
	    score+=60;
	    
	    //Remove the missile
	    removeObject(missile, missiles);
	    removeObject(missile, sprites);
	  }
	  else
	  {
	    motherShipHealth--;
	    
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
	    
	    //Remove the missile
	    removeObject(missile, missiles);
	    removeObject(missile, sprites);
	  }
	}
	else
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

function destroyAlien(alien)
{
  //Change the alien's state and update the object 
  alien.state = alien.EXPLODED;
    alien.vy /= 2;

  alien.update();  
  
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
