Powerup.prototype = new EntityClass();
Powerup.prototype.constructor = EntityClass;
function Powerup(type) {
	EntityClass.call(this);
	this.vy= .5;
	this.deathcounter = 1;
	this.id = type;
	
	var randomPosition = Math.floor(Math.random() * 15);
	this.x = randomPosition * this.width; //15 * width = 480, canvas size
	
	//For the ship choices, set the sourceX
	if (this.id === "Red") 	 { this.sourceX = 512; }
	if (this.id === "Teal")  { this.sourceX = 544; }
	
	if (this.id === "Bomb")  { this.sourceX = 576; }
	if (this.id === "Slow")  { this.sourceX = 608; }
	if (this.id === "Scoreup"){this.sourceX = 640; }
	//if (this.id === "Shield") { this.sourceX = 672; }
	
	//else { this.sourceX = 64; } //Temp value just to make sure the powerups function correctly, currently using alien explosion sprite. Will have their own eventually
}