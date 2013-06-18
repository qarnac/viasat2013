
//Arrays to store the game objects and assets to load
var assetsToLoad = [];
var messages = [];
var sprites = [];
//var scene = [];


var score = 0;
var scoreToMotherShip = 0;
var scoreNeededToWin = 160;
var alienFrequency = 100;
var alienTimer = 0;

function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
	//console.log ("removing " + objectToRemove.sourceX);
    array.splice(i, 1);
  }
}


/*
EARTH:
	 x = 0;
	 y = 0;
	 sourceX = 0;
	 sourceY = 32;
	 sourceWidth = 480;
	 sourceHeight = 320;
	 width = 480;
	 height = 320;

MARS:
	 x = 0;
	 y = 0;
	 sourceX = 480;
	 sourceY = 32;
	 sourceWidth = 480;
	 sourceHeight = 320;
	 width = 480;
	 height = 320;


ALIEN:
	 x = randomPosition * width;
  	 y = 0 -  height;
	 vy = 1;
	 sourceX = 32;
	 sourceY = 0;
	 sourceWidth = 32;
	 sourceHeight = 32;

MOTHERSHIP:
	 sourceX = 128;
	 sourceY = 0;
	 sourceWidth = 64;
	 sourceHeight = 32;
	 width = 64;
	 height = 32;
	 y = 0 -  height;	
	 x = 480/2 - width/2;
	 vy = .2;	  


MISSILE:
	 sourceX = 96;
	 sourceWidth = 16;
	 sourceHeight = 16;
	 width = 16;
	 height = 16;
	 vy = -8;
	 deathcounter = 1;


















*/