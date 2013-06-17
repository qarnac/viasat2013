Alien.prototype = new EntityClass();
Alien.prototype.constructor = Alien;
function Alien() {
	EntityClass.call(this);
  	
	//Assign the alien a random x position
	var randomPosition = Math.floor(Math.random() * 15);
	this.x = randomPosition * this.width;
  
	this.y = 0 - this.height;
	this.vy = 1;
	this.sourceX = 32;
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.state = this.NORMAL;
}

Alien.prototype.update = function () {
	this.sourceX = this.state * this.width; //Alien or explosion

	this.y += this.vy;
	
	if (this.y > 320 + this.height)
	{
		gameState = OVER;
	}
	
	//Check for missile collisions
	for(var i = 0; i < missiles.length; i++)
	{
		var missile = missiles[i];
		if (hitTestRectangle(this, missile) && this.state === this.NORMAL)
		{
			scoreToMotherShip++;
	  
			//Destroy the alien
			this.destroyAlien();

			//Update the score
			score++;

			//Remove the missile
			removeObject(missile, missiles);
			removeObject(missile, sprites);
		}
	}
}

Alien.prototype.destroyAlien = function() {
  //Change the alien's state and update the object 
  
  this.state = this.EXPLODED;
  this.vy /= 4;
  
  //Remove the alien after 1 second
  setTimeout(removeAlien, 1000);

  //Play the explosion sound
  explosionSound.currentTime = 0;
  explosionSound.play();
  
  var alien = this; //Temporary variable
  function removeAlien()
  {
    removeObject(alien, aliens);
    removeObject(alien, sprites);
  }
}