/*
Every level has 2 arrays associated with it. mapn for static objects (Wall, floor, blocks), gameObjectsn for dynamic objects (player, monster, stars)

The level names are of no significance, but here's the current order:
1) "0" 		- 16x16, 	with 1 star , 1 bomb , 0 enemies
2) "Test" 	- 8x8, 		with 3 stars, 1 bomb , 2 enemies
3) "Tall"	- 8x16,		with 7 stars, 3 bombs, 3 enemies
4) "Long"	- 16x8,		with 1 star, 10 bombs, 10 enemies
5) "1"		- 16x16,	with 7 stars, 0 bombs, 7 enemies

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

//Level 2 ////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//Level 3 ////////////////////////////////////////////////////////////////////////////////////////////////////////
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














//Level 4 ////////////////////////////////////////////////////////////////////////////////////////////////////////
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
