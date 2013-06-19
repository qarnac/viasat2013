Options.prototype = new EntityClass();
Options.prototype.constructor = Options;
function Options(type) {
	this.y = 0;
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
		if (this.id === "Play")	{ 	this.sourceX = 600; }
		if (this.id === "Ships")	{	this.sourceX = 700;	}
	}
	
	//For the ship choices
	if (this.id === "Red" || this.id === "Teal")
	{
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

	//Check for collisions between the option and any missiles
	for (var i = 0; i < sprites.length; i++)
	{
		if (sprites[i] instanceof Missile && hitTestRectangle(this, sprites[i]))
		{
			//If there was a collision, see what kind of option was hit
			switch(this.id)
			{
				case "Play": //Play button -- start the game.
					gameState = PLAYING;
					break;
					
					
				//Powerup choices
				case "Red": //Red ship powerup
					for (var j = 0; j < sprites.length; j++) //Find the cannon
					{
						if (sprites[j] instanceof Cannon) { cannon = sprites[j]; }
					}
					cannon.sourceX = sprites[i].sourceX; //Change the cannon's sprite
					cannon.changeModel(1); //Change the cannon's type (which controls its missile behavior)
					break;
				
				case "Teal":
					for (var j = 0; j < sprites.length; j++) //Find the cannon
					{
						if (sprites[j] instanceof Cannon) { cannon = sprites[j]; }
					}
					cannon.sourceX = sprites[i].sourceX; //Change the cannon's sprite
					cannon.changeModel(2);	//Change the cannon's type (which controls its missile behavior)
					break;
				//End powerups
			}
			//Remove the option and the missile from sprites
			//removeObject(sprites[i], sprites);
			sprites[i].deathcounter = 0;
			this.deathcounter = 0;
		}
	}
}