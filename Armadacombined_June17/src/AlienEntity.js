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
	this.health = 1;
	this.state = this.NORMAL;
	this.deathcounter = 60;
}

Alien.prototype.update = function () {
	this.sourceX = this.state * this.width; //Alien or explosion

	this.y += this.vy;
	
	if (this.y > 320 + this.height)
	{
		gameState = OVER;
	}
	
	if (this.health <= 0 && this.state === this.NORMAL) //If they've lost all their health, and haven't yet exploded...
	{ 
		this.destroyAlien(); 
		score++; 
		scoreToMotherShip++;
	}
	
	if (this.state === this.EXPLODED) { this.deathcounter--; }
}

Alien.prototype.destroyAlien = function() {
  //Change the alien's state and update the object 
  this.state = this.EXPLODED;
  this.vy /= 4;
  
  //Play the explosion sound
  explosionSound.currentTime = 0;
  explosionSound.play();  
  
}