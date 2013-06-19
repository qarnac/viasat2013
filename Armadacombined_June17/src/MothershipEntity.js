Mothership.prototype = new EntityClass();
Mothership.prototype.constructor = Mothership;
function Mothership() {
	EntityClass.call(this);
  	
	this.sourceX = 128;
	this.sourceWidth = 64;
	this.sourceHeight = 32;
	this.width = 64;
	this.height = 32;
	this.y = 0 - this.height;	
	this.x = 480/2 - this.width/2;
	this.vy = .2;	  
	this.MAXHEALTH = this.health = 15;
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.state = this.NORMAL;
	this.deathcounter = 60;
}

Mothership.prototype.update = function () {
	this.sourceX = 64 + (this.state * this.width); //Change the state, mothership or explosion

	this.y += this.vy; //Move mothership
	
	if (this.y > 320 + this.height) //If it reaches Earth
	{
		gameState = OVER;
	}
	
	if (this.health <= 0 && this.state === this.NORMAL) //When health is 0, it should die. (check state to make sure not calling multiple times)
	{
		this.state = this.EXPLODED;
		this.destroyMothership();
		score+=20;
	}
	if (this.state === this.EXPLODED) { this.deathcounter--; }
}

Mothership.prototype.destroyMothership = function() {

  //Change the Mothership's state and update the object 
  Mothership.state = Mothership.EXPLODED;
  Mothership.vy /= 3;
  
  //Play the explosion sound
  explosionSound.currentTime = 0;
  explosionSound.play();
}