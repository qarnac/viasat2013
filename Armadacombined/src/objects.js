//--- The sprite object

var spriteObject =
{
  sourceX: 0,
  sourceY: 0,
  sourceWidth: 32,
  sourceHeight: 32,
  width: 32,
  height: 32,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  visible: true,
  
  //Getters
  centerX: function()
  {
    return this.x + (this.width / 2);
  },
  centerY: function()
  {
    return this.y + (this.height / 2);
  },
  halfWidth: function()
  {
    return this.width / 2;
  },
  halfHeight: function()
  {
    return this.height / 2;
  }
};

//--- The alien object

var alienObject = Object.create(spriteObject);
alienObject.NORMAL = 1;
alienObject.EXPLODED = 2;
alienObject.state = alienObject.NORMAL;
alienObject.update = function()

{
  this.sourceX = this.state * this.width;
};

//--- The message object

var messageObject =
{
  x: 0,
  y: 0,
  visible: true,
  text: "Message",
  font: "normal bold 20px Helvetica",
  fillStyle: "red",
  textBaseline: "top"
};


function makeAlien()
{
  //Create the alien
  var alien = Object.create(alienObject);
  alien.sourceX = 32;
  
  //Set its y position above the screen boundary
  alien.y = 0 - alien.height;
  
  //Assign the alien a random x position
  var randomPosition = Math.floor(Math.random() * 15);
  //var randomPosition = Math.floor(Math.random() * (canvas.width / alien.width));
  alien.x = randomPosition * alien.width;
  
  //Set its speed
  alien.vy = 1;
  
  //Push the alien into both the sprites and aliens arrays
  sprites.push(alien);
  aliens.push(alien);
}

//crates the mothership
function makeMother()
{
  //Create the alien
  var alieM = Object.create(alienObject);
  alieM.sourceX = 128;
  
  //its dimensions
  alieM.sourceWidth = 64;
  alieM.sourceHeight = 32;
  alieM.width = 64;
  alieM.Height = 32;
 
 //Set its y position above the screen boundary
  alieM.y = 0 - alieM.height;
  
  //Center it over the screen
  alieM.x = canvas.width / 2 - alieM.width / 2;
 
  //Set its speed
  alieM.vy = .2;
  
  //Push the alien into both the sprites and aliens arrays
  sprites.push(alieM);
  aliens.push(alieM);
  
  //**along with the mothership we will create a health bar for it on the side
  var innerMeter = Object.create(spriteObject);
  innerMeter.sourceY =0;
  innerMeter.sourceX = 256;
  innerMeter.sourceWidth = 180;
  innerMeter.sourceHeight = 32;
  innerMeter.width = 180;
  innerMeter.height = 32;
  innerMeter.vis = 1;
  health.push(innerMeter);
  hpVisible =true;
  
  sprites.push(innerMeter);
  
}



function destroyAlien(alien)
{
  //Change the alien's state and update the object 
  alien.state = alien.EXPLODED;
    alien.vy /= 2;

  alien.update();  
  
  //Remove the alien after 1 second
  setTimeout(removeAlien, 1000);

  //Play the explosion sound
  explosionSound.currentTime = 0;
  explosionSound.play();
  
  function removeAlien()
  {
    removeObject(alien, aliens);
    removeObject(alien, sprites);
  }
}

function fireMissile()
{ 
  //Create a missile sprite
  var missile = Object.create(spriteObject);
  missile.sourceX = 96;
  missile.sourceWidth = 16;
  missile.sourceHeight = 16;
  missile.width = 16;
  missile.height = 16;
  
  //Center it over the cannon
  missile.x = cannon.centerX() - missile.halfWidth();
  missile.y = cannon.y - missile.height;
  
  //Set its speed
  missile.vy = -8;
  
  //Push the missile into both the sprites and missiles arrays
  sprites.push(missile);
  missiles.push(missile);

  //Play the firing sound
  shootSound.currentTime = 0;
  shootSound.play();
}

function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}
