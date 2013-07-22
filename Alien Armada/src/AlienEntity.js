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
	
	this.health = this.MAXHEALTH = parseInt($('#alienHP').val(),10) + (parseInt((score / parseInt($('#alienGrowth').val(),10)), 10) || 0);
	/*To break it down: X + (A/B || 0)
	And I call parseint on X and B because by default they are strings. And parseInt on A/B because it can be undefined if B is 0.
	
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
	
	//Current and max health. Default is 1. Take the value from the input text field (in the "Alien" section). 
	this.bounty = parseInt($('#alienbounty').val(), 10); //Score value for killing. Default is 1. Take the value from the input text field (in the "Alien" section)
	this.deathcounter = 60;	//YO: to last 60 frames, i.e. 1 second
}

Alien.prototype.update = function () {
	this.y += this.vy;
	
	if (this.y > 320 + this.height)
	{
		//gameState = OVER;
		lives--;
		$('#lives').val(lives);
		this.deathcounter=0;
		if (lives <= 0)
		{
			gameState = OVER;
		}
	}
	
	if (this.exploded) {
		if (this.sourceX === 128) //If the alien was a mothership
		{
			this.sourceX = 192; //Go to explosion sprite
			mothershipsKilled++; //Increment the amount of motherships destroyed (potential win condition)
			if ($("input:radio[name='mothers']:checked").val() === "many") //If the player wants to see multiple ships
			{
				motherShipCalled = false; //Reset the boolean value so another can be spawned in the future
			}
			
			//If the player wants repairs to spawn after mothership kills, then spawn a repair kit.
			if($('#bosskill').is(':checked'))
			{
				var repair = new Powerup("Repair");
				sprites.push(repair);
			}
		} 
		else if (this.sourceX === 32) {this.sourceX = 64; } //Go to explosion sprite
		this.deathcounter--;
		
	} 
	else if (this.health <= 0)
	{ 	//YO: Instead of calling a new function, use a comment to explain what it is
		this.exploded = true;
		this.vy /= 4; //Slow down the alien greatly after death
	  
		//Play the explosion sound
		explosionSound.currentTime = 0;
		explosionSound.play();
  		score += this.bounty; //Increase player's score by the monster's worth
		scoreToMotherShip--;
	}
}