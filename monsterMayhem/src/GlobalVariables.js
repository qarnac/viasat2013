
//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

var miniMap = document.querySelector("#miniMap");
var drawingMiniMap = miniMap.getContext("2d");

//var inventory = document.querySelector("#inventory");
//var drawingInventory = inventory.getContext("2d");

var alien = null;

//Map code
var EMPTY = 0;
var FLOOR = 1;
var BOX = 2;
var MONSTER = 3;
var STAR = 4;
var ALIEN = 5;
var WALL = 6;

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
var monsters = [];
var boxes = [];
var messages = [];
var stars = [];

var assetsToLoad = [];
var assetsLoaded = 0;

//Game variables
//Any game variables you need
var starsCollected = 0;

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
