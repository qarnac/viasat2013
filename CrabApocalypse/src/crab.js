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
		this.deathcounter--;
	}
	if (this.deathcounter === 0)
	{
		removeObject(this, sprites);
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