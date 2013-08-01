Cannon.prototype = new EntityClass();
Cannon.prototype.constructor = Cannon;
function Cannon(x, y) {
	EntityClass.call(this);
	this.x = x; 
	this.y = y;	
	this.firingType = 0; //Model affects how the ship fires
}

Cannon.prototype.update = function () {	

	//Set velocity to either move the ship left, right, or stay still, depending on keys being pressed.
	if(moveLeft && !moveRight) { this.vx = -6;}
	if(moveRight && !moveLeft) { this.vx = 6; }
	if(!moveLeft && !moveRight){ this.vx = 0; }

	//Change location based on velocity.
	//Math.min checks current position+velocity against the width of the screen, so that the player will always be to the left of that edge
	//Math.max checks that result against the left-most point on the screen (0), so the player will always be to the right of that edge
	this.x = Math.max(0, Math.min(this.x + this.vx, 480 - this.width)); 
}