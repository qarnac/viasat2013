
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
var timer = 0;

var tealTimer = Math.round(Math.random()*60*10+20); //Choose when to spawn teal ship, anywhere between 20 and 30 seconds (60 because 60 frames per second, *10 to get a 10-second range, and +20 so that the range starts at 20, and goes to 30).
var redSpawn = Math.round(Math.random()*10+1);  //Choose when to spawn red ship, anywhere between 1 and 10 score.

function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}