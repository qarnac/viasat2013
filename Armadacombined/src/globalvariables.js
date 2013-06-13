//10-21
//Arrays to store the game objects and assets to load
var sprites = [];
var health = [];
var assetsToLoad = [];
var missiles = [];
var aliens = [];
var messages = [];

//**********make scenes for the game
var scene = [];

//check to see if the mothership is out
var motherShipCalled = false;

//keys
//Game states
var LOADING = 0
var PLAYING = 1;
var OVER = 2;			//Moved to keyhandler.js
var PAUSED = 3;
var OPTIONSMENU = 4;

var gameState = LOADING;

//Arrow key codes
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;
var ESC = 27;
var S = 83;
var E = 69;
var PLUSNP = 107;					//Moved to keyhandler.js
var PLUS = 187;
var MINUSNP = 109;
var MINUS = 189;

//Directions
var moveRight = false;
var moveLeft = false;

//Variables to help fire missiles
var shoot = false;
var spaceKeyIsDown = false;



//74-89
//Variable to count the number of assets the game needs to load
var assetsLoaded = 0;

//Game variables
var score = 0;
var motherShipHealth = 60;		//Amount of hits required to destroy mothership
var scoreToMotherShip = 0;		//Increments every time score increases, until the point at which mothership has been called down
var scoreNeededToWin = 160;		
var alienFrequency = 100;		//How frequently aliens will spawn. Slowly reduces (more frequently) as game goes on.
var alienTimer = 0;				//Increments every frame. Alien spawns when it equals alienFrequency.

//******this variable turns the mothership's health bar on and off
var hpVisible = false;