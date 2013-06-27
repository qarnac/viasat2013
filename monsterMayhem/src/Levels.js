/*
Every level has 2 arrays associated with it. mapn for static objects (Wall, floor, blocks), gameObjectsn for dynamic objects (player, monster, stars)
*/

//Game Level Maps
//Arrays to store the level maps
var levelMaps = [];
var levelGameObjects = [];



//A timer to help delay the change time between levels
var levelChangeTimer = 0;

//Level 0 ////////////////////////////////////////////////////////////////////////////////////////////////////////
var map0 = 
[
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,1,2,1,1,2,1,1,1,1,2,2,1,1,1,7],
	[7,1,1,1,1,1,2,1,2,1,1,1,1,2,1,7],
	[7,2,1,1,1,1,1,1,1,1,1,2,1,1,1,7],
	[7,1,2,1,2,2,1,1,1,1,2,1,1,1,1,7],
	[7,1,2,1,1,1,1,1,1,1,1,2,2,1,1,7],
	[7,1,1,1,2,1,2,2,1,1,1,1,1,1,2,7],
	[7,1,1,2,1,1,2,1,1,1,2,1,2,1,1,7],
	[7,1,2,1,1,1,2,1,2,1,1,1,1,2,1,7],
	[7,1,2,2,1,1,2,2,2,1,2,2,1,1,2,7],
	[7,2,1,1,1,2,1,1,1,1,1,1,1,1,1,7],
	[7,1,2,2,1,1,2,1,1,2,1,2,1,2,2,7],
	[7,1,1,1,2,1,1,1,2,1,1,1,1,1,1,7],
	[7,1,1,1,1,1,2,1,1,1,1,2,1,2,1,7],
	[7,1,2,1,2,1,1,1,1,2,1,1,1,1,1,7],
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]
];
levelMaps.push(map0);
/*
var gameObjects0 = 
[
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0],
	[0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,4,0,0,0,0,0,0,3,0,0,4,0,0,3,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0],
	[0,0,0,3,0,0,0,6,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0],
	[0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,3,0,0,0,3,0,0,0,0,3,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
*/

gameObjects0 = //This version has no monsters and 1 star. Used to make sure level transitions work ok.
[
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
levelGameObjects.push(gameObjects0);

//Level 1 ////////////////////////////////////////////////////////////////////////////////////////////////////////
var mapTest = 
[
	[7,7,7,7,7,7,7,7],
	[7,1,1,1,1,1,1,7],
	[7,2,2,2,1,1,1,7],
	[7,1,1,1,1,2,1,7],
	[7,1,1,2,1,2,1,7],
	[7,1,2,1,1,1,1,7],
	[7,1,1,1,1,2,1,7],
	[7,7,7,7,7,7,7,7]
];
levelMaps.push(mapTest);

var gameObjectsTest = 
[
	[0,0,0,0,0,0,0,0],
	[0,0,3,0,5,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,4,0,6,0,0,0],
	[0,0,0,4,0,0,3,0],
	[0,0,0,0,0,0,4,0],
	[0,0,0,0,0,0,0,0]
];
levelGameObjects.push(gameObjectsTest);


var mapTall = 
[
	[7,7,7,7,7,7,7,7],
	[7,1,1,1,1,2,1,7],
	[7,1,2,1,1,2,1,7],
	[7,1,2,2,1,2,1,7],
	[7,1,2,1,1,1,1,7],
	[7,1,2,1,1,1,1,7],
	[7,1,2,1,2,2,2,7],
	[7,1,1,1,1,1,1,7],
	[7,1,1,1,1,2,1,7],
	[7,1,2,1,1,2,1,7],
	[7,1,2,1,1,2,1,7],
	[7,1,2,1,1,1,1,7],
	[7,1,2,2,2,2,2,7],
	[7,1,2,1,1,1,1,7],
	[7,1,2,1,2,1,1,7],
	[7,7,7,7,7,7,7,7]
];
levelMaps.push(mapTall);

var gameObjectsTall =
[
	[0,0,0,0,0,0,0,0],
	[0,6,0,0,0,0,3,0],
	[0,0,0,4,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,5,0,5,0,0,0,0],
	[0,0,0,0,0,0,4,0],
	[0,5,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,4,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,3,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,4,0,3,0,4,0,0],
	[0,0,0,0,0,4,4,0],
	[0,0,0,0,0,0,0,0]
];
levelGameObjects.push(gameObjectsTall);

var mapLong = 
[
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,1,1,2,1,1,2,1,1,1,2,2,1,1,1,7],
	[7,1,2,2,1,1,2,1,1,2,2,1,1,1,1,7],
	[7,2,2,1,1,1,2,1,2,2,1,1,1,1,2,7],
	[7,1,1,1,1,2,2,1,2,1,1,1,2,2,2,7],
	[7,2,2,2,2,2,1,2,2,1,2,2,2,1,1,7],
	[7,1,1,1,1,1,1,2,1,1,2,1,1,1,1,7],
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]
];
levelMaps.push(mapLong);

var gameObjectsLong = 
[
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,6,5,0,0,3,0,0,0,0,0,0,0,0,0,0],
	[0,5,0,0,3,0,0,3,3,0,0,0,3,3,0,0],
	[0,0,0,5,0,5,0,5,0,0,0,0,0,0,0,0],
	[0,5,3,3,0,0,0,5,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0],
	[0,0,0,3,0,5,5,0,3,0,0,0,0,0,4,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
levelGameObjects.push(gameObjectsLong);















var map1 = 
[
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7],
	[7,1,2,2,1,1,1,1,2,2,1,1,1,2,2,7],
	[7,1,1,2,2,2,1,1,2,1,1,1,1,2,1,7],
	[7,1,1,1,2,1,1,1,2,2,1,2,1,2,1,7],
	[7,1,1,1,1,1,2,1,1,1,1,2,1,1,1,7],
	[7,2,2,1,2,2,2,2,2,2,1,2,1,2,1,7],
	[7,1,1,1,1,1,1,1,1,2,2,2,2,1,1,7],
	[7,1,1,2,1,1,2,2,1,2,1,1,1,1,1,7],
	[7,2,1,2,1,1,1,2,1,1,1,2,2,2,1,7],
	[7,1,1,2,2,1,1,2,2,1,1,1,1,2,1,7],
	[7,1,1,1,1,1,1,1,2,1,1,1,2,2,2,7],
	[7,2,1,1,2,1,1,1,2,2,1,1,1,2,1,7],
	[7,1,1,2,2,2,2,1,1,1,1,2,1,2,1,7],
	[7,1,1,1,1,1,2,1,1,1,1,2,1,1,1,7],
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]
];
levelMaps.push(map1);

var gameObjects1 = 
[
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,4,0,0,0,0,0,0,0,0,3,0,0,0,4,0],
	[0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,0,0,0,0,0,0,6,0,0,0,0,0,0,0],
	[0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],
	[0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,4,0,0,0,0,0,0,0,0,4,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,4,0,0,3,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
levelGameObjects.push(gameObjects1);

//The number of rows and columns
var levelCounter = 0;
var ROWS = levelMaps[levelCounter].length//map0.length;
var COLUMNS = levelMaps[levelCounter][0].length//map0[0].length;