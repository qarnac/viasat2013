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
	this.exploded = false;	//YO: Since there are only two modes, it's better to use a boolean variable
	this.health = this.MAXHEALTH = 1;
	this.bounty = 1; //Score value for killing
	this.deathcounter = 60;	//YO: to last 60 frames, i.e. 1 second
	
}

Alien.prototype.update = function () {
	this.y += this.vy;
	
	if (this.y > 320 + this.height)
	{
		gameState = OVER;
	}
	
	if (this.exploded) {
		this.sourceX += this.width;	//YO: the purpose of this line is to switch to a new sprite but need to plan and rearrange the tilesheet
		this.deathcounter--;
	} else if (this.health <= 0)
	{ 	//YO: Instead of calling a new function, use a comment to explain what it is
		this.exploded = true;
		this.vy /= 4; //Slow down the alien greatly after death
	  
		//Play the explosion sound
		explosionSound.currentTime = 0;
		explosionSound.play();
  		score += this.bounty; //Increase player's score by the monster's worth
		scoreToMotherShip++;
	}
}