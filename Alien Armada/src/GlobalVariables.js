
//Arrays to store the game objects and assets to load
var assetsToLoad = []; //Audio files, spritesheets
var messages = []; 	//Score, gameover message
var sprites = [];	//Player, aliens, powerups, health bar
var scenes = []; 	//Backdrops

//Sprites to be referenced by name
var cannon;
var mothership;

//Message to be referenced by name
var gameOverMessage;

//3 settings files. defaultSettings are the original settings, newSettings are whatever modifications the user has made, settingFile is one of those two, chosen when the player clicks either the Restart or Reset button.
var defaultSettings = new Settings();
var newSettings = new Settings();
var settingFile = defaultSettings;


//Variables related to aliens being spawned
var alienOption = 
{
	timer: 0, //Counts up by 1 every frame and resets to 0 after an alien is spawned
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
	score: 0,	//Current score
	timer: 0,	//Current time
	ships: 0, 	//Quantity of motherships killed
	
	winConditions: 0, //How many win conditions have been met so far
	
	//Whether or not x win condition has been met, so as to not count one twice.
	scoreMet: false,
	timeMet: false,
	shipsMet: false,
	
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