Crab.prototype = new spriteObject();
Crab.prototype.constructor = Crab;
function Crab(column, row)
{
	spriteObject.call(this);
	
	this.NORMAL = [1,0];
	this.SQUASHED = [2, 0];
	this.state = this.NORMAL;
	this.speed = 1;
	this.vx = this.speed;
	this.deathcounter = -1; //Used for the transition stage between the crab getting squashed, and it disappearing. When they get squashed, this changes to a number greater than 0. The update function will decrement until it reaches 0, then remove it.
	this.x = column * SIZE;
	this.y = row * SIZE;
	
	//Some of the monsters shoot out projectiles
	this.shoots = Math.round(Math.random()); //Random value either 0 or 1. Choses whether the monsters shoot fireballs
	
	//Some of the monsters fade in and out
	this.fades = !(this.shoots); //Monters will all exclusively either shoot or fade. 
	this.alpha = 1;
	this.modifier = .01;

	this.counter = Math.round(Math.random()*6*60); //Keeps track of time for the monsters, used for both fade and shoot. Start with a random offset between 0 and 6 seconds, so they shoot/fade at different times.
}

Crab.prototype.update = function()
{
	/*
	Update sourceX and sourceY (if they get stomped, they turn into an explosion for a second)
	If they are not yet stomped, continue moving along x and y.
	If they have been stomped, update the counter (counts down till disappearing).
	Once the counter is at 0, remove.
	*/
	
	this.sourceX = this.state[0] * this.sourceWidth;
	this.sourceY = this.state[1] * this.sourceHeight;
	
	 if(this.state === this.NORMAL)
    {
      this.x += this.vx;
      this.y += this.vy;
    }
    
	if (this.deathcounter > 0)
	{
		this.alpha = 1; 
		this.deathcounter--;
	}
	if (this.deathcounter === 0)
	{
		removeObject(this, sprites);
	}
	
	this.counter++;
	/*If they are a monster that shoots fireballs, then increment the timer. 
	If the timer is an interval of 15 seconds, then shoot the fireball. Starts from the center of the crab and goes the same direction as the crab is moving.
	Collision between player and fireball is done in player.js. 
	The fireballs also disappear once they hit a block (done in fireball.js)
	*/
	if (this.shoots)
	{		
		if (this.counter%(6*60) === 0)
		{
			var fireball = new Fireball();
			fireball.vx = this.vx * 3;
			fireball.x = this.centerX();
			fireball.y = this.centerY();
			sprites.push(fireball);
		}
	}
	
	/*If they are a monster that fades in and out, control the alpha here
	They have 8-second cycles, 2 seconds for each: Filly visible, fully hidden, fading in, and fading out.
	
	It is in the render function where alpha actually effects the visibility. 
	I set drawingSurface.globalAlpha to the sprite.alpha for each individual sprite in the loop.
	
	*/
	if (this.fades)
	{	
		//100% visibility. Directly set alpha to 1.
		if ((this.counter/60)%8 === 0)
		{
			this.modifier = 0;
			this.alpha = 1;
		}
		
		//Fading out, set a modifier to negative 1/120 (2 seconds, 60 frames per second)
		if ((this.counter/60)%8 === 2) 
		{
			this.modifier += -(1/120);
		}
		
		//0% visibility. Directly set alpha to 0.
		if ((this.counter/60)%8 === 4)
		{
			this.modifier = 0;
			this.alpha = 0;
		}
		
		//Fading in, set a modifier to positive 1/120 (2 seconds, 60 frames per second)
		if ((this.counter/60)%8 === 6)
		{
			this.modifier += (1/120);
		}
		
		//In the case of fading in/out, here is where modifier affects the visibility.
		this.alpha += this.modifier;
	}
	
    /*Check whether the crab is at a cell corner
	Figure out the crab's column and row on the map array.
	First, check the objects on the floor beneath it. If there are no boxes in its current direction (ie, just open air), then go the other way.
	
	Second, if there is something to walk on (box or grass) to the left, then go that way.
	Third, if there is something to walk on (box or grass) to the right, then go that way.
	
	Fourth, check if there are any boxes in the way to the left. If so, change directions.
	Fifth, check if there are any boxes in the way to the right. If so, change directions.
	
	Because of the order of the left/right changes, the crabs will prioritize going to the right (since it happens last), until it reaches either open air or a box. Then it will start to go left.
	In either case, if both left and right are valid directions, it will continue going the same way -- That happens because vx gets multiplied by (-1) twice, effectively negating the changes.
	*/
	if(Math.floor(this.x) % SIZE === 0 && Math.floor(this.y) % SIZE === 0)
	{
		var ROWS = levelMaps[levelCounter].length;
		var COLUMNS = levelMaps[levelCounter][0].length;

	//Find the crab's column and row in the array
		var crabColumn = Math.floor(this.x / SIZE);
		var crabRow = Math.floor(this.y / SIZE);
		var currentLevel = levelMaps[levelCounter];
		
	//First
		if(crabRow < ROWS - 1)
		{ 
			var thingBelowLeft = levelMaps[levelCounter][crabRow + 1][crabColumn - 1];
			var thingBelowRight = levelMaps[levelCounter][crabRow + 1][crabColumn + 1];

			if(thingBelowLeft !== BOX || thingBelowRight !== BOX)
			{
				this.vx *= -1;
			}
		}

	//Second
		if(crabColumn > 0)
		{
			var thingToTheLeft = currentLevel[crabRow][crabColumn - 1];
			if(thingToTheLeft === BOX || thingToTheLeft === GRASS)
			{
				this.vx *= -1;
			}
		} 

	//Third
		if(crabColumn < COLUMNS - 1)
		{
			var thingToTheRight = currentLevel[crabRow][crabColumn + 1];
			if(thingToTheRight === BOX || thingToTheRight === GRASS)
			{
				this.vx *= -1;
			}
		}     

	//Fourth
		if (crabColumn < COLUMNS)
		{
			var thingLeft = currentLevel[crabRow][crabColumn - 1];
			if (thingLeft === BOX)
			{
				//this.vx *= -1;
				this.vx = Math.abs(this.vx);
				return;
			}	
		}
		
	//Fifth
		if (crabColumn > 0)
		{
			var thingRight = currentLevel[crabRow][crabColumn + 1];
			if (thingRight === BOX)
			{
				//this.vx *= -1;
				this.vx = -Math.abs(this.vx);
				return;
			}
		}
	}
}