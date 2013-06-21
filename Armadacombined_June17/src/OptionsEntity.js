Powerup.prototype = new EntityClass();
Powerup.prototype.constructor = EntityClass;
function Powerup(type) {
	EntityClass.call(this);
	this.vy= .5;
	this.deathcounter = 1;
	this.id = type;
	
	//For the ship choices, set the sourceX and the spawn locations
	if (this.id === "Red" || this.id === "Teal")
	{
		if (this.id == "Red") 	 { this.sourceX = 512;this.x = 480 * 1/4 - this.width/2;}
		if (this.id === "Teal") { this.sourceX = 544;this.x = 480 * 3/4 - this.width/2;}
	}
}