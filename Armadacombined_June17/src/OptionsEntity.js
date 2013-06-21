Options.prototype = new EntityClass();
Options.prototype.constructor = EntityClass;
function Options(type) {
	EntityClass.call(this);
	//this.y = 0;
	this.vy= .5;
	//this.vx= 0;
	this.deathcounter = 1;
	//this.sourceY= 0;
	this.id = type;
	
	//For the ship choices
	if (this.id === "Red" || this.id === "Teal")
	{
		//this.sourceWidth = this.width = 32;
		if (this.id == "Red") 	 { this.sourceX = 512;this.x = 480 * 1/4 - this.width/2;}
		if (this.id === "Teal") { this.sourceX = 544;this.x = 480 * 3/4 - this.width/2;}
	}
}

Options.prototype.update = function() {
	this.y += this.vy;

	//Check for collisions between the option and any missiles
	/* YO: Moved to MissileEntity so that all collision would be checked in one place.
	for (var i = 0; i < sprites.length; i++)
	{
		if (sprites[i] instanceof Missile && hitTestRectangle(this, sprites[i]))
		{
			//If there was a collision, see what kind of option was hit
			for (var j = 0; j < sprites.length; j++) //Find the cannon
			{
				if (sprites[j] instanceof Cannon) { cannon = sprites[j]; }
			}
			cannon.sourceX = sprites[i].sourceX; //Change the cannon's sprite
			switch(this.id)
			{					
				//Powerup choices
				case "Red": //Red ship powerup
					cannon.changeModel(1); //Change the cannon's type (which controls its missile behavior)
					break;
		
				case "Teal":
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
	*/
}