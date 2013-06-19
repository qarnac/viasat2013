Options.prototype = new EntityClass();
Options.prototype.constructor = Options;
function Options(type) {

	this.vy= .5;
	this.vx= 0;
	this.deathcounter = 1;
	this.sourceY= 0;
	this.id = type;
	
	
	//For play or options buttons
	if (this.id === "Play" || this.id === "Ships")
	{
		this.sourceWidth  =	this.width  = 80;
		this.sourceHeight =	this.height = 20;
		this.y = 0;
		if (this.id === "Play")	{ 	this.sourceX = 600; }
		if (this.id === "Ships")	{	this.sourceX = 700;	}
	}
	
	//For the ship choices
	if (this.id === "Red" || this.id === "Teal")
	{
		this.y = -200
		this.sourceWidth = this.width = 32;
		if (this.id == "Red") 	 { this.sourceX = 512;}
		if (this.id === "Teal") { this.sourceX = 544;}
	}
	
	//Place the button at either the 1/4th line or 3/4ths
	if (this.id === "Play" || this.id === "Red") 	 { this.x = 480 * 1/4 - this.width/2; }
	if (this.id === "Ships" || this.id === "Teal") { this.x = 480 * 3/4 - this.width/2; }
}

Options.prototype.update = function() {
	this.y += this.vy;
}