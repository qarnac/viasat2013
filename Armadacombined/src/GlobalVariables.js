
//Arrays to store the game objects and assets to load
var sprites = [];
var health = [];
var assetsToLoad = [];
var missiles = [];
var aliens = [];
var messages = [];

//**********make scenes for the game
var scene = [];


var score = 0;
var motherShipHealth = 60;
var scoreToMotherShip = 0;
var scoreNeededToWin = 160;
var alienFrequency = 100;
var alienTimer = 0;

function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}
