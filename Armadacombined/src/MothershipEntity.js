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
	this.health = 60;
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.state = this.NORMAL;
}

Mothership.prototype.update = function () {
	this.sourceX = 64 + (this.state * this.width); //Change the state, mothership or explosion

	this.y += this.vy; //Move mothership
	
	if (this.y > 320 + this.height) //If it reaches Earth
	{
		gameState = OVER;
	}
	
	//Check for missile collisions
	for(var i = 0; i < missiles.length; i++)
	{
		var missile = missiles[i];
		if (hitTestRectangle(this, missile) && this.state === this.NORMAL)
		{
			console.log("Hit!");
	  
			this.health--; //Reduce mothership health

			//Remove the missile
			removeObject(missile, missiles);
			removeObject(missile, sprites);
		}
	}
	if (this.health === 0)
	{
		this.destroyMothership();
		score+=60;
	}
}

Mothership.prototype.destroyMothership = function() {

  //Change the Mothership's state and update the object 
  var Mothership = this;
  Mothership.state = Mothership.EXPLODED;
  Mothership.vy /= 3;
  
  //Remove the Mothership after 1 second
  setTimeout(removeMothership, 1000);

  //Play the explosion sound
  explosionSound.currentTime = 0;
  explosionSound.play();
  
  function removeMothership()
  {
    removeObject(Mothership, aliens);
    removeObject(Mothership, sprites);
  }
}