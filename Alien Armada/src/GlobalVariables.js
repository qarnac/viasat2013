
//Arrays to store the game objects and assets to load
var assetsToLoad = [];
var messages = [];
var sprites = [];

//JT:we will now use the array scene to hold the background tiles we will useto pan through
//and manipulate the background
var scenes = [];


var score = 0;
var scoreNeededToWin = 160;
var timeToWin = 300;
var scoreToMotherShip = 0;
var shipsToWin = 2;
var winConditions = 0;
var alienFrequency = 100;
var alienTimer = 0;
var timer = 0; //Currently just used for spawning of powerups
var lives = 3;


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