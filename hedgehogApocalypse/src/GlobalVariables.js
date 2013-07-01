//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");
var image;

//Sprites we need to access by name
var cat = null;
var door = null;
var gameOverDisplay = null;
var gameOverMessage = null;

//Map code
var EMPTY = 0;
var CAT = 1;
var HEDGEHOG = 2;
var BOX = 4;
var DOOR = 5;
var GRASS = 6;
var PLAT = 10;

//The size of each tile cell
var SIZE = 64;

//The number of rows and columns
var levelCounter = 0; //Increments every time the level changes
var ROWS = levelMaps[levelCounter].length;
var COLUMNS = levelMaps[levelCounter][0].length;

//The number of columns on the tilesheet
var tilesheetColumns = 3;

//Arrays to store the game objects
var backdrop = [];
var sprites = [];
var boxes = [];
var messages = [];
var players = [];
var moving_plat = []; //stores moving platforms

var levelChangeTimer = 0; //Delay between reaching the goal, and the next level being drawn.

var assetsToLoad = [];
var assetsLoaded = 0;

//Game variables
var hedgehogsRemaining = 0;

//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var OVER = 3;
var LEVEL_COMPLETE = 4; //Transition to the next level
var PAUSED = 5;
var RESET_LEVEL = 6;
var gameState = LOADING;


//Key codes
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;

//Directions
var moveRight = false;
var moveLeft = false;
var jump = false;

var gameWorld =  //The entire level, as opposed to the camera section which only shows a certain area around the player.
{
	x: 0,
	y: 0,
	width: levelMaps[levelCounter][0].length * SIZE,
	height: levelMaps[levelCounter].length * SIZE,
};


function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}
