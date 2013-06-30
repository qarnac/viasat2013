//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

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

//The size of each tile cell
var SIZE = 64;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//The number of columns on the tilesheet
var tilesheetColumns = 3;

//Arrays to store the game objects
var backdrop = [];
var sprites = [];
var boxes = [];
var messages = [];
var players = [];

var assetsToLoad = [];
var assetsLoaded = 0;

//Game variables
var hedgehogsSquashed = 0;

//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var OVER = 3;
var PAUSED = 4;
var gameState = LOADING;

var gameWorld = 
{
	x: 0,
	y: 0,
	width: map[0].length * SIZE,
	height: map.length * SIZE,
};

//Key codes
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;

//Directions
var moveRight = false;
var moveLeft = false;
var jump = false;

function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}