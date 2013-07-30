Alien.prototype = new EntityClass();
Alien.prototype.constructor = Alien;
function Alien() {
	EntityClass.call(this);
  	
	//Assign the alien a random x position
	var randomPosition = Math.floor(Math.random() * 15);
	this.x = randomPosition * this.width; 
  
	this.y = 0 - this.height;
	this.vy = 1;
	this.sourceX = 32;
	this.exploded = false;	//YO: Since there are only two modes, it's better to use a boolean variable
	
	this.health = this.MAXHEALTH = newSettings.alienhealth + (parseInt((gameConditions.score / newSettings.aliengrowth), 10) || 0);
	/*To break it down: X + (A/B || 0)
	I call parseInt on A/B because it can be undefined if B is 0.
	
	X is the base health, default is 1 but the player can change it with an option slider.
	A is the current score
	B is a "growth rate", default is 0 (used as "never happens") -- aliens get an extra health every B points.
	(So A/B would be how many times that growth rate has triggered)
	Problem is that when B is 0, the aliens are never supposed to get stronger, but anything divided by 0 is Infinity.
	That's where the ||0 comes in. If it has the option between Infinity and 0, it chooses 0.
	
	So in the default case, it's:
	1 + ((#/0) || 0)
	1 + (Infinity || 0)
	1 + 0
	1 health*/
	console.log(this.health);
	
	//Current and max health. Default is 1. Take the value from the input text field (in the "Alien" section). 
	this.bounty = newSettings.alienbounty; //Score value for killing. Default is 1. Take the value from the input text field (in the "Alien" section)
	this.deathcounter = 60;	//YO: to last 60 frames, i.e. 1 second
	
}

Alien.prototype.update = function () {
	this.y += this.vy;
	
	if (this.y > 320 + this.height)
	{
		gameConditions.lives--;
		this.deathcounter=0;
		if (gameConditions.lives <= 0)
		{
			gameState = OVER;
		}
	}
	
	if (this.exploded) 
	{
		if (this === mothership) //If the alien was a mothership
		{
			this.sourceX = 192; //Go to explosion sprite
			if (this.deathcounter === 60)
			{
				gameConditions.ships++; //Increment the amount of motherships destroyed (potential win condition)
				if($('#bosskill').prop('checked'))
				{
					var repair = new Powerup("Repair");
					sprites.push(repair);
				}
			}
			
			if (newSettings.motherspawns === "many") //If the player wants to see multiple ships
			{
				mothershipOption.called = false; //Reset the boolean value so another can be spawned in the future
			}
			
			//If the player wants repairs to spawn after mothership kills, then spawn a repair kit.
		} 
		else {this.sourceX = 64; } //Go to explosion sprite
		this.deathcounter--;
		
	} 
	else if (this.health <= 0)
	{ 	//YO: Instead of calling a new function, use a comment to explain what it is
		this.exploded = true;
		this.vy /= 4; //Slow down the alien greatly after death
	  
		//Play the explosion sound
		explosionSound.currentTime = 0;
		explosionSound.play();
  		gameConditions.score += this.bounty; //Increase player's score by the monster's worth
		mothershipOption.scoreToMother--;
	}
}