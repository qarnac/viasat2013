Missile.prototype = new EntityClass();
Missile.prototype.constructor = Missile;
function Missile(cannon) {
	EntityClass.call(this);
	this.sourceX = 96;
	this.sourceWidth = 16;
	this.sourceHeight = 16;
	this.width = 16;
	this.height = 16;
	this.vy = -8;
	this.vx = 0;
	this.deathcounter = 1;
	this.damage = 1;
	
	//Center it over the cannon
	this.x = cannon.centerX() - this.halfWidth();
	this.y = cannon.y - this.height;
}

Missile.prototype.hit = function(sprite)
{
  //A variable to determine whether there's a collision
  var hit = false;
  
  //Calculate the distance vector
  var vx = this.centerX() - sprite.centerX();
  var vy = this.centerY() - sprite.centerY();
  
  //Figure out the combined half-widths and half-heights
  var combinedHalfWidths = this.halfWidth() + sprite.halfWidth();
  var combinedHalfHeights = this.halfHeight() + sprite.halfHeight();

  //Check for a collision on the x axis
  if(Math.abs(vx) < combinedHalfWidths)
  {
    //A collision might be occuring. Check for a collision on the y axis
    if(Math.abs(vy) < combinedHalfHeights)
    {
      //There's definitely a collision happening
      hit = true;
    }
    else
    {
      //There's no collision on the y axis
      hit = false;
    }   
  }
  else
  {
    //There's no collision on the x axis
    hit = false;
  }
  
  return hit;
}

Missile.prototype.update = function () {
	this.y += this.vy;
	this.x += this.vx;
	
	//Collisions
	for (var i = 0; i < sprites.length; i++)
	{
		var sprite = sprites[i];
		//Hit an alien or mothership
		if (sprite instanceof Alien) 
		{
			if (this.hit(sprite) && !sprite.exploded) //If the alien/mothership is alive
			{
				sprite.health -= this.damage; //Reduce the alien/mothership's health by the missile's damage
				this.deathcounter--; //Remove the missile
			}
		}	

		//Hit a powerup
		if (sprite instanceof Powerup) 
		{
			
			if (this.hit(sprite)) 
				{
				//console.log(sprite.id); //Log which powerup was hit
				for (var j = 0; j < sprites.length; j++) //Find the cannon
				{
					if (sprites[j] instanceof Cannon) { cannon = sprites[j]; }
				}
				switch(sprite.id)
				{					
					//Powerup choices
					case "Red": //Red ship powerup -- Mothership-seeking missiles
						cannon.sourceX = sprite.sourceX; //Change the cannon's sprite to the appropriate ship icon
						cannon.changeModel(1); //Change the cannon's type (which controls its missile behavior)
						break;
			
					case "Teal": //Fire missiles in a V pattern
						cannon.sourceX = sprite.sourceX; //Change the cannon's sprite to the appropriate ship icon
						cannon.changeModel(2);	//Change the cannon's type (which controls its missile behavior)
						break;
					case "Bomb": //Damage enemies on screen
						for (var k = 0; k < sprites.length; k++) { sprites[k].health -= this.damage; }
						break;
						
					case "Slow": //Slow down enemies on screen
						for (var k = 0; k < sprites.length; k++)
						{
							if (sprites[k] instanceof Alien) { sprites[k].vy /= 2; } //Cut the alien's speed in half
						}
						break;
						
					case "Scoreup": //Minor boost in score
						score += 5;
						break;
					case "Repair": //Grants extra lives.
						lives++;
						$('#lives').val(lives);
						break;
						
					//End powerups
				}
				
				sprite.deathcounter = 0; //Remove the option button
				this.deathcounter = 0; //Remove the missile
			}
		}
	}//End collisions
	
	
	/* YO: commented out to avoid using mothership. Don't have time to understand this code yet
	var mothership;
	var cannon;
	for (var i = 0; i < sprites.length; i++)
	{
		if (sprites[i] instanceof Mothership) { mothership = sprites[i]; }
		else if (sprites[i] instanceof Cannon && sprites[i].model === 1) {cannon = sprites[i].model;}
	}
	
	var distX;
	var distY;
	if (typeof mothership !== 'undefined' && cannon === 1)
	{
		distX = (this.x + this.width/2) - (mothership.x + mothership.width/2);
		distY = (this.y + this.height/2) - (mothership.y + mothership.height/2);
		
		if (distX < -50 || distX > 50)
		{
			this.vx = 0;
		}
		else if (distX < 50) //Missile is on the left
		{
			this.vx = 2; //Go right
		}
		else if (distX > -50) //Missile is on the right
		{
			this.vx = -2; //Go left
		}
		
		if (distY > -50 || distY < 50)
		{
			if (distX > 0) { this.vx = -2;}
			else { this.vx = 2; }
		}
		if (distY < -50) //The missile has shot above the mothership
		{
			this.vy = 4;
		}
		else if (distY > 50)
		{
			this.vy = -8;
		}
		
	}

	if(this.y < 0 - this.height)
    { 
      //Remove the missile from the sprites array
	this.deathcounter--;
    }
	*/
}