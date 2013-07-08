Powerup.prototype = new EntityClass();
Powerup.prototype.constructor = EntityClass;
function Powerup(type) {
	EntityClass.call(this);
	this.vy= .5;
	this.deathcounter = 1;
	this.id = type;
	
	var randomPosition = Math.floor(Math.random() * 15);
	this.x = randomPosition * this.width; 
	
	//For the ship choices, set the sourceX
	if (this.id === "Repair") { this.sourceX = 672; }
	if (this.id === "Bomb")  { this.sourceX = 576; }
	if (this.id === "Scoreup"){this.sourceX = 640; }
	if (this.id === "Slow")  { this.sourceX = 608; }
	
	if (this.id === "Red") 	 { this.sourceX = 512; }
	if (this.id === "Teal")  { this.sourceX = 544; }
}