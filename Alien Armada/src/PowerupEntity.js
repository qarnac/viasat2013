Powerup.prototype = new EntityClass();
Powerup.prototype.constructor = EntityClass;
function Powerup(type) {
	EntityClass.call(this);
	this.vy= .5;
	this.id = type; //Used to determine the appearance, and for figuring out the effects when a missile collides with one.
	
	var randomPosition = Math.floor(Math.random() * 15); //Spawn at a random x position.
	this.x = randomPosition * this.width; 
	
	//For the ship choices, set the sourceX
	if (this.id === "Repair") { this.sourceX = 672; }
	if (this.id === "Bomb")   { this.sourceX = 576; }
	if (this.id === "Scoreup"){ this.sourceX = 640; }
	if (this.id === "Slow")   { this.sourceX = 608; }
}