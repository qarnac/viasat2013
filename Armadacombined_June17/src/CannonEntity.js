Cannon.prototype = new EntityClass();
Cannon.prototype.constructor = Cannon;
function Cannon(x, y) {
	EntityClass.call(this);
	this.x = x; 
	this.y = y;	
	this.model = 0;
}

Cannon.prototype.update = function () {
	this.x = Math.max(0, Math.min(this.x + this.vx, 480 - this.width));
	
		//Left
	if(moveLeft && !moveRight)
	{
		this.vx = -6;
	}
	//Right
	if(moveRight && !moveLeft)
	{
		this.vx = 6;
	}

	//Set the cannon's velocity to zero if none of the keys are being pressed
	if(!moveLeft && !moveRight)
	{
		this.vx = 0;
	}
}

Cannon.prototype.changeModel = function(type) {
	this.model = type;

	switch (type)
	{
		case 0: //Default ship
			Missile.prototype.damage = 2;
			break;
		case 1: //Pink??? ship
			break;
		case 2: //Teal??? ship
			break;
	}



}