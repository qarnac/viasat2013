
//Arrays to store the game objects and assets to load
var assetsToLoad = [];
var messages = [];
var sprites = [];

//JT:we will now use the array scene to hold the background tiles we will useto pan through
//and manipulate the background
var scenes = [];


var lives = 3; //How many spare ships the player has

var alienTimer = 0;
var alienFrequency = 100; //When timer===frequency, spawn an alien, and reduce frequency (so they spawn more often)
var alienGrowthRate = 0; //0 === disabled. Else, give aliens an extra health every time the score is evenly divisible by this.

var score = 0;
var scoreNeededToWin = 160; //$('#scorenum').val()

var timer = 0; 
var timeToWin = 300;	//$('#timenum').val()

var scoreToMotherShip = 5; //How many more points needed for mothership to spawn. Decrement every kill.
var motherShipCalled = false;
var mothershipspawnrate = 0; //If it's 0, then only one will spawn. Any pos number is valid
var mothershipsKilled = 0;
var shipsToWin = 2; //$('#shipnum').val() //How many motherships need to be destroyed in order for the win condition to be met 

var winConditions = 0;
var conditionsNeeded = 1; //$('#wincondsNum').val() //How many win conditions need to be met to consider it a victory

var gameOverMessage;

//Powerups - xSpawn will become either the time or the score value at which x spawns. xtype will decide whether time or score is used to spawn x.
var repairSpawn;
var repairtype = "timebased";
var bombSpawn;
var bombtype = "scorebased";
var scoreupSpawn;
var scoreuptype = "scorebased";
var slowSpawn;
var slowtype = "timebased";
var redSpawn;
var redtype = "scorebased";
var tealspawn;
var tealtype = "scorebased";


function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}