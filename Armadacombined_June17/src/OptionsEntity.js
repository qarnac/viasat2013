Options.prototype = new EntityClass();
Options.prototype.constructor = Options;
function Options(type) {

	this.vy= .5;
	this.vx= 0;
	this.deathcounter = 1;
	this.sourceY= 0;
	
	//For play or options buttons
	if (type === "Play" || type === "Ships")
	{
		this.sourceWidth  =	this.width  = 80;
		this.sourceHeight =	this.height = 20;
		this.y = 0;
		if (type === "Play")	{ 	this.sourceX = 600; }
		if (type === "Ships")	{	this.sourceX = 700;	}
	}
	
	//For the ship choices
	if (type === "Red" || type === "Teal")
	{
		this.y = -200
		this.sourceWidth = this.width = 32;
		if (type == "Red") 	 { this.sourceX = 512;}
		if (type === "Teal") { this.sourceX = 544;}
	}
	
	//Place the button at either the 1/4th line or 3/4ths
	if (type === "Play" || type === "Red") 	 { this.x = 480 * 1/4 - this.width/2; }
	if (type === "Ships" || type === "Teal") { this.x = 480 * 3/4 - this.width/2; }
}

Options.prototype.update = function() {
	this.y += this.vy;
}