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
	//this.vx = 0;
	this.damage = newSettings.damage; //How much damage each missile does. Value taken from an input field, in the "Player's ship" section
	
	// Center it over the cannon
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
		
	//If there's no hit, then go to the next sprite
		if (!this.hit(sprite))
		{
			continue;
		}
		
	//Otherwise, there was a hit.
		//Hit an alien or mothership
		if (sprite instanceof Alien) 
		{
			if (!sprite.exploded) //If the alien/mothership is alive
			{
				sprite.health -= this.damage; //Reduce the alien/mothership's health by the missile's damage
				this.framesremaining--; //Remove the missile
			}
		}	

		//Hit a powerup
		if (sprite instanceof Powerup) 
		{
			switch(sprite.id)
			{					
				case "Bomb": //Damage enemies on screen
					for (var j = 0; j < sprites.length; j++) 
					{ 
						if (sprites[j] instanceof Alien)
						{
							sprites[j].health -= 3; 
						}
					}
					break;
					
				case "Slow": //Slow down enemies on screen
					for (var j = 0; j < sprites.length; j++)
					{
						if (sprites[j] instanceof Alien) { sprites[j].vy /= 2; } //Cut the alien's speed in half
					}
					break;
					
				case "Scoreup": //Minor boost in score
					gameConditions.score += 5;
					break;
					
				case "Repair": //Grants extra lives.
					gameConditions.lives++;
					break;
					
				//End powerups
			}
			
			sprite.framesremaining = 0; //Remove the powerup button
			this.framesremaining = 0; //Remove the missile
		}
	}//End collisions
	
	//Mothership seeking missile
	if (cannon.firingType === 1)
	{	
		var distX;
		var distY;
		if (typeof mothership !== 'undefined' && mothership.health > 0)
		{
			distX = (this.x + this.width/2) - (mothership.x + mothership.width/2);
			distY = (this.y + this.height/2) - (mothership.y + mothership.height/2);
			
			if (distX > -40 && distX < 40) //If the missile is underneath the mothership
			{
				this.vx = 0; //Then act as normal.
			}
			else if (distX > 50) //Missile is on the right
			{
				this.vx = -4; //Go to the left
			}
			else if (distX < -50) //Missile is on the left
			{
				this.vx = 4; //Go to the right
			}
			
			//Positive values means the ship is above the missile
			
			//If the missile is quite a bit above the ship, make it go down
			if (distY < -40)
			{
				this.vy = 6;
			}
			//If the missile is quite a bit below the ship, make it go upward
			else if (distY > 40)
			{	
				this.vy = -6;
			}
		}
		else //OTherwise, the mothership is not there (any more), so go back to the normal trajectory
		{
			this.vy = -8;
			this.vx = 0;
		}
	}//End mothership seeking section
	
	
	//If missile is above, or below, or to the left, or to the right, of the screen, remove it from the sprites array
	if((this.y < 0 - this.height) || (this.y > 320 + this.height) || (this.x < 0 - this.width) || (this.x > 480 + this.height))
    { 
		this.framesremaining--;
    }
}