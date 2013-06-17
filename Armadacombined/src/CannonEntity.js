Cannon.prototype = new EntityClass();
Cannon.prototype.constructor = Cannon;
function Cannon(x, y) {
	//call base constructor
	EntityClass.call(this);
 
	this.x = x; 
	this.y = y;

	
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
