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
	this.deathcounter = 1;
	
	//Center it over the cannon
	this.x = cannon.centerX() - this.halfWidth();
	this.y = cannon.y - this.height;
}

Missile.prototype.update = function () {
	this.y += this.vy;

	if(this.y < 0 - this.height)
    { 
      //Remove the missile from the sprites array
	this.deathcounter--;
    }
}