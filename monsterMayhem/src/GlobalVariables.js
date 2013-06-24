
//The canvases
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

var miniMap = document.querySelector("#miniMap");
var drawingMiniMap = miniMap.getContext("2d");

var inventoryDraw = document.querySelector("#inventory");
var drawingInventory = inventoryDraw.getContext("2d");

var alien = null;

//Map code
var EMPTY = 0;
var FLOOR = 1;
var BOX = 2;
var MONSTER = 3;
var STAR = 4;
var BOMB = 5;
var ALIEN = 6;
var WALL = 7;

//The number of columns on the tilesheet
var tilesheetColumns = 5;

//The size of each tile cell
var SIZE = 64;

//Sprites we need to access by name
var alien = null;
var levelCompleteDisplay = null;

//The number of rows and columns
var ROWS = map0.length;
var COLUMNS = map0[0].length;

//Arrays to store the game objects
var sprites = [];
var messages = [];
var floorsAndWalls = [];
var starsTotal = 0;

var assetsToLoad = [];
var assetsLoaded = 0;

//Game variables
//Any game variables you need
var bombTimer = 0;

var inventory = 
	[
		[STAR, 0],
		[BOMB, 0]
	];
var inventoryDisplay = null;	
	
//The timer
var timeDisplay = null; //The image
var timerMessage = null;//The actual timer numbers

//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var OVER = 3;
var LEVEL_COMPLETE = 4;
var PAUSED = 5;
var gameState = LOADING;

var gameWorld = 
{
	x: 0,
	y: 0,
	width: map0[0].length * SIZE,
	height: map0.length * SIZE,
};



//Supposed to be used for showing counter of items in inventory, in the inventory canvas.
inventoryMessage = Object.create(messageObject);
inventoryMessage.x = 60;
inventoryMessage.y = 40;
inventoryMessage.font = "14px Helvetica";
inventoryMessage.fillStyle = "white";
inventoryMessage.text = "";
	
function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}