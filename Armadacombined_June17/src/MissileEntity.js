Missile.prototype = new EntityClass();
Missile.prototype.constructor = Missile;
function Missile(cannon) {
	EntityClass.call(this);
	this.sourceX = 96;
	this.sourceWidth = 16;
	this.sourceHeight = 16;
	this.width = 16;
	this.height = 16;
	this.vy = -8;
	this.vx = 0;
	this.deathcounter = 1;
	this.damage = 1;
	
	//Center it over the cannon
	this.x = cannon.centerX() - this.halfWidth();
	this.y = cannon.y - this.height;
}

Missile.prototype.update = function () {
	this.y += this.vy;
	this.x += this.vx;
	
	//Collisions
	for (var i = 0; i < sprites.length; i++)
	{
		//Hit an alien
		if (sprites[i] instanceof Alien) 
		{
			var alien = sprites[i];
			if (hitTestRectangle(this, alien) && alien.state === alien.NORMAL)
			{
				alien.health -= this.damage;
				this.deathcounter--;
			}
		}	
		//Hit a mothership
		if (sprites[i] instanceof Mothership) 
		{
			var mothership = sprites[i];
			if (hitTestRectangle(this, mothership) && mothership.state === mothership.NORMAL)
			{
				mothership.health -= this.damage; //Reduce mothership health
				console.log("Health: " + mothership.health + "/" + mothership.MAXHEALTH); //Note to check progress
				removeObject(this, sprites);
			}
		}
	}//End collisions
	
	
	
	var mothership;
	var cannon;
	for (var i = 0; i < sprites.length; i++)
	{
		if (sprites[i] instanceof Mothership) { mothership = sprites[i]; }
		else if (sprites[i] instanceof Cannon && sprites[i].model === 1) {cannon = sprites[i].model;}
	}
	
	var distX;
	var distY;
	if (typeof mothership !== 'undefined' && cannon === 1)
	{
		distX = (this.x + this.width/2) - (mothership.x + mothership.width/2);
		distY = (this.y + this.height/2) - (mothership.y + mothership.height/2);
		
		if (distX < -50 || distX > 50)
		{
			this.vx = 0;
		}
		else if (distX < 50) //Missile is on the left
		{
			this.vx = 2; //Go right
		}
		else if (distX > -50) //Missile is on the right
		{
			this.vx = -2; //Go left
		}
		
		if (distY > -50 || distY < 50)
		{
			if (distX > 0) { this.vx = -2;}
			else { this.vx = 2; }
		}
		if (distY < -50) //The missile has shot above the mothership
		{
			this.vy = 4;
		}
		else if (distY > 50)
		{
			this.vy = -8;
		}
		
	}

	if(this.y < 0 - this.height)
    { 
      //Remove the missile from the sprites array
	this.deathcounter--;
    }
}