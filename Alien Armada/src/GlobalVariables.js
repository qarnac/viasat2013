
//Arrays to store the game objects and assets to load
var assetsToLoad = [];
var messages = [];
var sprites = [];

//JT:we will now use the array scene to hold the background tiles we will useto pan through
//and manipulate the background
var scenes = [];

var cannon;
var mothership;

var missileDam = 1;

var gameOverMessage;

var defaultSettings = new Settings();
var newSettings = new Settings();
var settingFile = defaultSettings;


//Variables related to aliens being spawned
var alienOption = 
{
	timer: 0,
	frequency: 100 //When timer===frequency, spawn an alien, and reduce frequency (so they spawn more often)
};

//Variables related to motherships being spawned
var mothershipOption = 
{
	scoreToMother: 5, 	//How many more points needed for mothership to spawn. Decrement every kill.
	called: false		//Whether or not one is spawned already
};

//Variables related to the game being won or lost.
var gameConditions =
{
	score: 0,
	timer: 0,
	timeToWin: 300,
	
	ships: 0, 			//Quantity of motherships killed
	shipsToWin: 2, 		//How many motherships need to be killed to win (if that condition is enabled
	
	winConditions: 0,

	lives: 3
};

//Powerups - xSpawn will become either the time or the score value at which x spawns. xtype will decide whether time or score is used to spawn x.
var powerupOption =
{
	repairSpawn: 0,
	repairtype: "timebased",

	bombSpawn: 0,
	bombtype: "scorebased",

	scoreupSpawn: 0,
	scoreuptype: "scorebased",

	slowSpawn: 0,
	slowtype: "timebased"
};


function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}