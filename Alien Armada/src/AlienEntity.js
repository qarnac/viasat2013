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
	
	//Current and max health
	this.health = this.MAXHEALTH = newSettings.alienhealth + (parseInt((gameConditions.score / newSettings.aliengrowth), 10) || 0);
	/* 
		aliengrowth represents "at every X points, the aliens gain extra health". So score/aliengrowth is how many times the aliens have gotten that.
		If aliengrowth is 0, then they never grow. 
		Because it can (and will by default) be 0, then the result of score/aliengrowth can be undefined. 
		That is why it is then OR'ed with 0. JavaScript will choose 0 if the other choice is undefined.
		
		That result is added to the base health of the alien, to produce the total health of the alien.
		
		So in the default case, it's:
		1 + ((#/0) || 0)
		1 + (Infinity || 0)
		1 + 0
		1 health*/
	//console.log(this.health); //Uncomment if you need to see for yourself that it works
	
	this.bounty = newSettings.alienbounty; //Score value for killing. Default is 1. Take the value from the input text field (in the "Alien" section)
	this.framesremaining = 60;	//YO: to last 60 frames, i.e. 1 second
	
}

Alien.prototype.update = function () {
	this.y += this.vy;
	
	if (this.y > 320 + this.height)
	{
		gameConditions.lives--;
		this.framesremaining=0;
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
			if (this.framesremaining === 60)
			{
				gameConditions.ships++; //Increment the amount of motherships destroyed (potential win condition)
				if(newSettings.repairspawns === "boss")
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
		this.framesremaining--;
		
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