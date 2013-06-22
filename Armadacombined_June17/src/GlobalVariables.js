
//Arrays to store the game objects and assets to load
var assetsToLoad = [];
var messages = [];
var sprites = [];

//JT:we will now use the array scene to hold the background tiles we will useto pan through
//and manipulate the background
var scenes = [];


var score = 0;
var scoreToMotherShip = 0;
var scoreNeededToWin = 160;
var alienFrequency = 100;
var alienTimer = 0;
var timer = 0; //Currently just used for spawning of powerups
var lives = 3;


//Score-based powerups
var redSpawn = Math.round(Math.random()*10);  //Spawn between 0 and 10 score. Later spawns will be less frequent.
var bombSpawn = Math.round(Math.random()*40); //Spawn anywhere between 0 and 40 score
var scoreUpSpawn = Math.round(Math.random()*60); //Spawn anywhere between 0 and 60 score

//Time-based powerups
var tealTimer = Math.round(Math.random()*60*50+20); //Spawn a teal ship, anywhere between 20 and 70 seconds -- *60 is because of 60 frames per second. *50 then gives a 50-second range, and +20 gives an offset to make the floor be 20 seconds.
var slowTimer = Math.round (Math.random()*60*30+10); //Spawn a slow between 10 and 40 seconds
var repairTimer = Math.round(Math.random()*60*30+10);

function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}