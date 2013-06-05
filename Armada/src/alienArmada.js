(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//Arrays to store the game objects and assets to load
var sprites = [];
var assetsToLoad = [];
var missiles = [];
var aliens = [];
var messages = [];

//Create the background
var background = Object.create(spriteObject);
background.x = 0;
background.y = 0;
background.sourceY = 32;
background.sourceWidth = 480;
background.sourceHeight = 320;
background.width = 480;
background.height = 320;
sprites.push(background);

//Create the cannon and center it
var cannon = Object.create(spriteObject);
cannon.x = canvas.width / 2 - cannon.width / 2;
cannon.y = 280;
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
image.src = "../images/alienArmada.png";
assetsToLoad.push(image);

//Load the sounds
var music = document.querySelector("#music");
music.addEventListener("canplaythrough", loadHandler, false);
music.load();
assetsToLoad.push(music);

var shootSound = document.querySelector("#shootSound");
shootSound.addEventListener("canplaythrough", loadHandler, false);
shootSound.load();
assetsToLoad.push(shootSound);

var explosionSound = document.querySelector("#explosionSound");
explosionSound.addEventListener("canplaythrough", loadHandler, false);
explosionSound.load();
assetsToLoad.push(explosionSound);
//End sound loading

//Option buttons
var muteMusic = document.querySelector("#muteMusic");
var muteEffects= document.querySelector("#muteEffects");
var muteAll = document.querySelector("#muteAll");
muteMusic.addEventListener("click", controlMusic, false);
muteEffects.addEventListener("click", controlEffects, false);
muteAll.addEventListener("click", controlAllSound, false);

var volAll = document.querySelector("#volAll");
var volMusic = document.querySelector("#volMusic");
var volEffects = document.querySelector("#volEffects");
volAll.addEventListener("keydown", controlVolAll, false);
volMusic.addEventListener("keydown", controlVolMusic, false);
volEffects.addEventListener("keydown", controlVolEffects, false);
//End option buttons

//Variable to count the number of assets the game needs to load
var assetsLoaded = 0;

//Game states
var LOADING = 0
var PLAYING = 1;
var OVER = 2;
var PAUSED = 3;
var gameState = LOADING;

//Arrow key codes
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;
var ESC = 27;

//Directions
var moveRight = false;
var moveLeft = false;

//Variables to help fire missiles
var shoot = false;
var spaceKeyIsDown = false;

//Game variables
var score = 0;
var scoreNeededToWin = 60;
var alienFrequency = 100;
var alienTimer = 0;

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
	switch(event.keyCode)
	{
		case LEFT:
			moveLeft = true;
			break;  

		case RIGHT:
			moveRight = true;
			break;

		case SPACE:
			//shoot = true;
			if(!spaceKeyIsDown)
			{
			shoot = true;
			spaceKeyIsDown = true;
			}
	}

}, false);

window.addEventListener("keyup", function(event)
{
  switch(event.keyCode)
  {	    
	case LEFT:
	    moveLeft = false;
	    break;  
	    
	case RIGHT:
	    moveRight = false;
		break; 
	
	case SPACE:
		spaceKeyIsDown = false;
		break;
		
	case ESC:
		if (gameState === PLAYING) { gameState = PAUSED; }
		else if (gameState === PAUSED) {	gameState = PLAYING;}
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
		console.log("loading…");
		break;
    
    case PLAYING:
		playGame();
		break;
    
    case OVER:
		endGame();
		break;
	  
	case PAUSED:
		pauseGame();
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
    music.removeEventListener("canplaythrough", loadHandler, false);
    shootSound.removeEventListener("canplaythrough", loadHandler, false);
    explosionSound.removeEventListener("canplaythrough", loadHandler, false);
    console.log(assetsLoaded + " assets loaded");
    //Play the music
    music.play();

	//Set default volumes

	
	music.volume = .05;
	shootSound.volume = .3;
	explosionSound.volume= .3;
    
    //Start the game 
    gameState = PLAYING;
  }
}

function playGame()
{
  //Left
  if(moveLeft && !moveRight)
  {
    cannon.vx = -8;
  }
  //Right
  if(moveRight && !moveLeft)
  {
    cannon.vx = 8;
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

function controlMusic()
{
	music.muted = !music.muted;
	if (music.muted) 
	{ 
		muteMusic.innerHTML = "unmute"; 
		if (shootSound.muted) {	muteAll.innerHTML = "unmute"; }
	}
	else 
	{
		muteMusic.innerHTML = "mute"; 
		muteAll.innerHTML = "mute";
	}
}

function controlEffects() 
{
	explosionSound.muted = shootSound.muted = !shootSound.muted
	if (shootSound.muted) 
	{ 
		muteEffects.innerHTML = "unmute "; 
		if (music.muted) {	muteAll.innerHTML = "unmute"; }
	}
	else 
	{
		muteEffects.innerHTML = "mute" ;
		muteAll.innerHTML = "mute";
	}
}

function controlAllSound() {
	//Everything on
	if (shootSound.muted && music.muted) 
	{
		controlMusic();
		controlEffects();
	}
	//Nothing on
	else if (!shootSound.muted && !music.muted)
	{
		controlMusic();
		controlEffects();
	}
	
	else //Mixture
	{
		explosionSound = true;
		shootSound.muted = true;
		music.muted =  true; 
		muteAll.innerHTML = "unmute";
		muteEffects.innerHTML = "unmute";
		muteMusic.innerHTML = "unmute";
	}
}

function controlVolMusic(event){
	if (event.keyCode === 13)
	{
		var newvol = parseInt(volMusic.value)/100;
		if (newvol === 0) 
		{ 
			music.muted = true;
			muteMusic.innerHTML = "unmute"; 
			if (shootSound.muted) {	muteAll.innerHTML = "unmute"; }
		}
		else if (newvol <= 1)
		{
			music.volume = newvol / 3;
			music.muted = false;
			muteMusic.innerHTML = "mute"; 
			muteAll.innerHTML = "mute";
		}
	}
}

function controlVolEffects(event){
	if (event.keyCode === 13)
	{
		var newvol = parseInt(volEffects.value)/100;
		if (newvol === 0) 
		{ 
			shootSound.muted = explosionSound.muted = true;
			muteEffects.innerHTML = "unmute"; 
			if (music.muted) {	muteAll.innerHTML = "unmute"; }
		}
		else if (newvol <= 1)
		{
			shootSound.volume = explosionSound.volume = newvol / 2;
			shootSound.muted = explosionSound.muted = false;
			muteEffects.innerHTML = "mute"; 
			muteAll.innerHTML = "mute";
		}
	}
}

function controlVolAll(event){
	if (event.keyCode === 13)
	{
		var newvol = parseInt(volAll.value)/100;
		if (newvol === 0) 
		{ 
			music.muted = shootSound.muted = explosionSound.muted = true;
			muteMusic.innerHTML = "unmute"; 
			muteEffects.innerHTML = "unmute"; 
			muteAll.innerHTML = "unmute";
		}
		else if (newvol <= 1)
		{
			music.volume *= newvol;
			shootSound.volume *= newvol;
			explosionSound.volume *= newvol;

			music.muted = shootSound.muted = explosionSound.muted = false;
			if (shootSound.volume !== 0) {muteEffects.innerHTML = "mute"; }
			if (music.volume !== 0) {muteMusic.innerHTML = "mute"; }
			if (music.volume !== 0 && shootSound.volume !== 0) {muteAll.innerHTML = "mute";}
		}
	}
}
}());
