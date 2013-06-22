(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//check to see if the mothershipp is out
var motherShipCalled = false;

//Create the background
var background = new levelEntityClass();	//Object.create(spriteObject);
//sprites.push(background);  
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
scoreDisplay.fillStyle = "#00FF00";
scoreDisplay.x = 300;
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

//All moved to keyhandler.js for now
var LOADING = 0
var PLAYING = 1;
var OVER = 2;	
var PAUSED = 3;
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
		
    case CHANGE_LEVEL:
      //console.log("we are about to change levels");
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
      //make the mothership
		makeMother();
  		motherShipCalled = true;
    }
  }
  
  //Powerups, some spawn at random scores, some at random times. After they spawn, they will pick a new random time/score to spawn at. Original spawn rates defined in GlobalVariables
  if (score >= redSpawn)
  {
	var redShip = new Powerup("Red");
	sprites.push(redShip);
	redSpawn += Math.round(Math.random()*40+6); //Subsequent spawns will be within 40-score ranges
  }  
  if (score >= bombSpawn)
  {
	var bomb = new Powerup("Bomb");
	sprites.push(bomb);
	bombSpawn += Math.round(Math.random()*40+6); //Same as the original spawn rate
  }
  if (score >= scoreUpSpawn)
  {
	var scoreup = new Powerup("Scoreup");
	sprites.push(scoreup);
	scoreUpSpawn += Math.round(Math.random()*60+6); //Same as the original spawn rate
  }
 
  if (timer === tealTimer)
  {
	var tealShip = new Powerup("Teal");
	sprites.push(tealShip);  
	tealTimer += Math.round(Math.random()*60*50+20); //Same as the original spawn rate
  }
  if (timer === slowTimer)
  {
	var slow = new Powerup("Slow");
	sprites.push(slow);
	slowTimer += Math.round (Math.random()*60*30+10); //Spawn a slow between 10 and 40 seconds
  }
  if (timer === repairTimer)
  {
	var repair = new Powerup("Repair");
	sprites.push(repair);
	repairTimer += Math.round(Math.random()*60*30+10); //Same as original spawn rate
  }
  timer++;
  
  
  //--- The score 
  //Display the score
  scoreDisplay.text = "Score: " + score;
  if(score === scoreNeededToWin)
  {
    gameState = OVER;
  }
  
	//KN: changed this to account for situations where mothership kills will make the player skip score == 30.
   if (score >= 30 && loadLevel === false) //Go to the next level
  {
    //temp so we dont repeat
    score ++;
    levelNumber++;
    loadLevel = true;
    gameState = CHANGE_LEVEL;
    
  }
  
  //JT:this will scroll the background, which is stored inside a new array
  for (var i = 0; i < scenes.length;i++) {
    
    scenes[i].bgScroll();
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
	console.log("Paused." /*Sprite count: " + sprites.length*/);	
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
    //loadLevel = false;
  }
}
//JT:will load the game levels by taking in the argument of what level we are inn
function loadGameLevel(lv)
{
  //JT: this statement will track what level we are on
  switch (lv) {
    case 0:
      console.log("entering earth's orbit");
      break;
    
    case 1:
      var marsBackground = new Mars();
      scenes.splice(0, 1, marsBackground);	//KN: Changed to splice from scenes, now that we're using that.
      console.log("entering mars' orbit");
      break;
    
    case 2:
      break;
  }
}

//crates the mothership
function makeMother()
{  
  var mothership = new Alien();	//Mothership();
	mothership.sourceX = 128;
	mothership.sourceWidth = 64;
	mothership.sourceHeight = 32;
	mothership.width = 64;
	mothership.height = 32;
	mothership.y = 0;	// - mothership.height;	
	mothership.x = 480/2 - mothership.width/2;
	mothership.vy = .2;	  
	mothership.health = mothership.MAXHEALTH = 15;
	mothership.bounty = 20;
	
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
	else if (cannon.model === 1) //red ship
	{	//YO: How is this different from model 0?
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
  
    //Display a lives counter
	for (var i = 0; i < lives; i++)
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
  }

}());
