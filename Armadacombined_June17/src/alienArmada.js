(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//check to see if the mothershipp is out
var motherShipCalled = false;

//Create the background
var background = new levelEntityClass();	//Object.create(spriteObject);
sprites.push(background);

//this variable will track what leve we are on
var levelNumber = 0; //earth will be level 0, since it is the start
var loadLevel = true;

//Create the cannon and center it
var cannon = new Cannon(canvas.width / 2 - 32 / 2, 280);
sprites.push(cannon);

//Create the score message
var scoreDisplay = new Message();
scoreDisplay.font = "normal bold 30px emulogic";
scoreDisplay.fillStyle = "#00FF00";
scoreDisplay.x = 400;
scoreDisplay.y = 10;
messages.push(scoreDisplay);

//The game over message
var gameOverMessage = new Message();
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
//End ship creation 





//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/alienArmadaRED3.png";
assetsToLoad.push(image);


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

//All moved to keyhandler.js for now
var LOADING = 0
var PLAYING = 1;
var OVER = 2;			//Moved to keyhandler.js
var PAUSED = 3;
var OPTIONSMENU = 4;
var CHANGE_LEVEL = 5;
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
		
    case CHANGE_LEVEL:
      //console.log("we are about to change levels");
		changingLevels();
		gameState = PLAYING;
		break;
  }
  //Render the game
  render();
}

//select ship fucntion *************************************************************************************** 
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
			}
			//End buttons

			//Ship choice collision
			if (hitTestRectangle(missile, pinkShip) || hitTestRectangle(missile, tealShip))
			{
				if (hitTestRectangle(missile, pinkShip))
				{
					cannon.sourceX = pinkShip.sourceX;
					cannon.changeModel(1);
				}
				else if (hitTestRectangle(missile, tealShip))
				{
					cannon.sourceX = tealShip.sourceX;
					cannon.changeModel(2);
				}
				removeObject(missile, sprites);
				preGame();
				gameState = PLAYING;
			}//End ship choices
		}
	}
	//End collisions

	//Update frame
	for(var i = 1; i < sprites.length; i++) {
		sprites[i].update();
	}
	   scoreDisplay.text = score; //Display the score

}

function preGame() //Transition into gameplay, remove extra sprites.
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
  //this the first element in the object is the background it will not be able to implement the update method
  //therefore we will skip it
  for(var i = 1; i < sprites.length; i++) {
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
      //make the mothership
		makeMother();
  		motherShipCalled = true;
    }
  }
  
  //--- The score 
  //Display the score
  scoreDisplay.text = score;
  if(score === scoreNeededToWin)
  {
    gameState = OVER;
  }
   if (score === 30) //Go to the next level
  {
    //temp so we dont repeat
    score ++;
    levelNumber++;
    loadLevel = true;
    gameState = CHANGE_LEVEL;
    
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
	console.log("Paused. Sprite count: " + sprites.length);	
}
function makeAlien()
{
  //Create the alien
  var alien = new Alien();
  
  //Push the alien into the sprites array
  sprites.push(alien);
}

function changingLevels ()
{
  //load the level, and check to see if we should update it
  if (loadLevel === true) {
    
    //load the level just once
    loadGameLevel(levelNumber);
    loadLevel = false;
  }
}

function loadGameLevel(lv)
{
  switch (lv) {
    case 0:
      console.log("entering earth's orbit");
      break;
    case 1:
      var marsBackground = new Mars();
      sprites.splice(0, 1, marsBackground);
      console.log("entering mars' orbit");
      break;
    case 2:
      break;
  }
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
	if (cannon.model === 0) //default ship
	{
		var missile = new Missile(cannon);	
		sprites.push(missile);
	}
	else if (cannon.model === 1) //pink ship
	{
		var missile = new Missile(cannon);	
		sprites.push(missile);
	}
	else if (cannon.model === 2) //teal ship
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
