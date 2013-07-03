/*
the levelMaps array contains the backdrop, the grassy floor, and the blocks.
the levelGameObjects array contains the player, monsters, and the door.
*/


var levelMaps = [];	//Terrain, boxes
var levelGameObjects = []; //Monsters, player, doors




/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


var map0 = 
[
	[7,7,8,9,7,7,7,8,9,7,7,7,8,9,7,7],
	[8,9,7,7,4,9,7,7,7,8,9,7,7,7,8,5],
	[4,7,7,7,7,7,8,9,7,7,7,8,9,7,4,4],
	[7,7,4,7,7,4,4,4,4,7,7,7,7,7,7,7],
	[8,9,4,7,7,7,7,8,9,7,7,4,8,9,7,7],
	[7,4,4,4,7,8,9,7,7,7,4,4,7,7,4,8],
	[9,7,8,9,7,7,7,8,9,4,7,4,9,7,7,7],
	[7,7,7,7,7,4,4,7,7,7,7,4,4,4,4,7],
	[8,9,7,7,7,7,7,7,7,8,9,7,7,8,9,7],
	[7,7,4,4,4,4,7,7,4,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,4,7,7,7,7,7,7],
	[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
];
levelMaps.push(map0);


var gameObjects0 =
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0]
];
levelGameObjects.push(gameObjects0);

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var map1 =
[
	[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
	[8,8,8,8,8,8,8,8,8,8,8,8,7,8,8,8],
	[8,8,7,8,7,4,4,4,4,4,4,4,9,9,9,9],	
	[8,8,7,4,4,4,8,8,9,8,9,9,8,8,8,9],
	[8,8,8,7,8,8,8,8,9,8,8,8,8,9,8,9],
	[8,4,8,8,8,8,7,7,7,7,8,8,9,9,9,8],
	[8,8,8,8,8,8,8,8,8,7,8,8,9,8,7,8],
	[4,4,4,4,4,4,8,8,8,7,8,9,8,8,7,8],
	[9,8,8,9,9,8,8,8,8,7,8,9,9,9,9,9],
	[8,8,9,9,7,7,4,4,4,4,4,4,4,4,8,8],
	[8,8,8,7,8,7,7,7,8,8,8,9,8,8,8,8],
	[8,9,8,7,8,8,8,7,7,7,9,9,9,9,9,4],
	[9,9,8,9,8,7,9,9,8,8,8,8,8,8,7,4],
	[8,8,8,9,9,9,9,8,8,8,4,9,9,4,4,4],
	[8,8,8,8,9,9,9,9,8,4,9,9,9,9,8,8],
	[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
];

levelMaps.push(map1);

var gameObjects1 =
[
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,2,0,5,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0],
];
levelGameObjects.push(gameObjects1);

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var gameObjects4 = 
[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,2,0,0,0],
	[0,0,0,0,0,0,0,0,0,5],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,2,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,2,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,2,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,2,0,0,0,0,0,1]
];
levelGameObjects.push(gameObjects4);

var map4 = 
[
	[8,7,7,9,8,7,8,9,8,8],
	[7,7,9,7,7,8,8,7,7,7],
	[7,8,7,4,4,4,4,4,4,7],
	[8,7,9,7,8,7,7,8,4,4],
	[4,4,7,7,7,8,8,7,7,8],
	[9,8,9,4,4,4,4,7,8,9],
	[7,8,7,8,9,8,4,7,8,8],
	[7,8,7,7,8,9,8,4,8,9],
	[9,7,7,7,7,8,7,4,7,8],
	[9,7,9,8,8,7,7,4,4,8],
	[9,8,8,8,7,8,9,7,8,9],
	[7,8,9,9,9,7,8,9,8,4],
	[8,9,7,4,4,4,4,7,7,9],
	[4,7,9,8,9,8,4,4,4,8],
	[8,9,8,7,8,9,8,9,7,7],
	[4,4,7,7,7,7,9,9,9,7],
	[9,8,4,4,4,4,4,8,9,7],
	[8,7,9,9,9,7,7,7,7,4],
	[9,7,7,9,7,9,7,8,4,7],
	[7,9,9,8,4,4,4,4,7,9],
	[8,9,9,8,9,8,9,8,7,9],
	[8,8,7,4,8,7,9,8,4,8],
	[8,9,4,9,7,7,4,8,8,8],
	[6,6,6,6,6,6,6,6,6,6]
];
levelMaps.push(map4);



/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

map5 = 
[
	[9,7,7,9,8,9,7,9,9,9,9,8,7,7,9,9,8,9,7,7,8,7,9,9,8,8,7,7,8,9,8,9,9,9,7,9,9,7,9,9],
	[7,8,9,7,9,7,8,8,8,9,9,8,7,9,9,4,4,4,9,9,7,7,9,9,7,9,8,7,9,9,9,9,9,9,7,8,9,8,9,7],
	[7,9,8,9,7,7,9,8,9,8,9,9,8,8,8,9,9,9,7,7,9,7,9,9,9,7,9,7,7,9,9,8,8,9,4,4,4,4,8,7],
	[9,7,8,7,8,9,9,7,9,9,9,4,4,4,4,8,8,8,9,4,8,9,7,8,7,9,7,8,4,4,4,4,9,7,9,4,8,8,7,8],
	[9,8,8,9,8,7,8,9,7,8,4,7,8,7,8,9,8,7,8,9,4,9,8,8,7,7,4,9,7,7,9,4,4,4,4,4,8,8,4,9],
	[9,9,8,8,4,8,7,9,4,7,9,9,9,7,8,9,9,8,4,8,4,4,4,4,4,4,7,7,8,9,8,9,7,9,7,8,8,9,4,8],
	[7,7,4,4,9,8,4,4,7,8,7,7,8,8,4,8,4,4,4,8,7,9,8,9,8,8,9,8,7,9,8,8,7,8,7,9,7,7,4,8],
	[4,8,8,8,9,4,9,9,7,8,7,8,8,8,4,7,9,9,8,7,8,8,7,9,8,7,7,9,9,8,7,9,7,7,9,7,8,4,4,9],
	[8,8,7,8,7,8,7,7,9,7,7,8,7,7,4,4,8,7,9,9,4,9,7,7,7,9,7,7,7,7,7,4,8,9,8,8,9,7,7,7],
	[6,4,6,6,6,6,6,6,4,6,6,6,6,6,6,6,6,6,6,6,4,6,6,6,6,6,6,6,6,6,6,4,6,6,6,6,6,6,6,6]
];
levelMaps.push(map5);

gameObjects5 =
[
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0]
];
levelGameObjects.push(gameObjects5);
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
