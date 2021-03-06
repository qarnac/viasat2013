Monster.prototype = new spriteObject();
Monster.prototype.constructor = Monster;
function Monster(row, column) {
	spriteObject.call(this);
	
	this.x = column * SIZE;	//I shouldn't need to call these, they are defined in base class.
	this.y = row * SIZE;	//I shouldn't need to call these, they are defined in base class.
	
	this.sourceX = 128;
	
	this.NORMAL = [2, 0];
	this.SCARED = [2, 1];
	this.state = this.NORMAL;
	
	this.sourceX = this.state[0] * this.width;
	this.sourceY = this.state[1] * this.height;
	
	//The monster's allowed speed
	this.speed = 1;

	//Properties to help the monster change direction
	this.NEVERMOVED = -1;
	this.NONE = 0;
	this.UP = 1;
	this.DOWN = 2;
	this.LEFT = 3;
	this.RIGHT = 4;
	this.validDirections = [];
	this.direction = this.NEVERMOVED; //KN: This is to help the case where monsters spawned in certain spots previously wouldn't ever end up getting a direction to go to. Made use of in changeDirection
	this.hunt = false;				// Math.round(Math.random()); //Randomize whether the alien is hunting or not. So, some will be aggressive.
}

Monster.prototype.update = function() {
	//Change between the 2 sprites
	this.sourceX = this.state[0] * this.width;	//Will be 2*width in either case
	this.sourceY = this.state[1] * this.height; //Will be 0*height when normal or 1*height when scared
	
	//Move
	this.x += this.vx;
	this.y += this.vy;
	
	//Change directions, if at a corner.
	if(Math.floor(this.x) % SIZE === 0 && Math.floor(this.y) % SIZE === 0)
	{
		//Change the monster's direction
		this.changeDirection();  
	}
		
	//Change the monster's state to SCARED if
	//it's 128 pixels from the alien
	var vectorx = alien.centerX() - this.centerX(); //The distance on the X axis between alien and the monster
	var vectory = alien.centerY() - this.centerY(); //Distance on the Y axis between alien and monster
		
	//Find the distance between the circles by calculating
	//the vector's magnitude (how long the vector is)  
	var magnitude = Math.sqrt(vectorx * vectorx + vectory * vectory); //c^2 = (a^2 + b^2)
	if(magnitude < 192)	{ this.state = this.SCARED;} //If within 3 squares, monster panics.
	else				{ this.state = this.NORMAL;} //Otherwise, no worries

}

//Called every time the monster crosses a tile.
Monster.prototype.changeDirection = function() {
	//Clear the list of valid directions
	this.validDirections = [];
	
	//If the monster has already moved from its spawn position, then clear its current direction.
	if (this.direction != this.NEVERMOVED) { this.direction = this.NONE;}

	//Find the monster's column and row in the array
	var monsterColumn = Math.floor(this.x / SIZE);
	var monsterRow = Math.floor(this.y / SIZE);

	//Get a reference to the current level map
	var currentMap = levelMaps[levelCounter];

	//Find out what kinds of things are in the map cells 
	//that surround the monster. If the cells contain a FLOOR cell,
	//push the corresponding direction into the validDirections array
	if(monsterRow > 0)
	{
		var thingAbove = currentMap[monsterRow - 1][monsterColumn];
		if(thingAbove === FLOOR)
		{
			this.validDirections.push(this.UP);
		}
	}
	if(monsterRow < ROWS - 1)
	{ 
		var thingBelow = currentMap[monsterRow + 1][monsterColumn];
		if(thingBelow === FLOOR)
		{
			this.validDirections.push(this.DOWN);
		}
	}
	if(monsterColumn > 0)
	{
		var thingToTheLeft = currentMap[monsterRow][monsterColumn - 1];
		if(thingToTheLeft === FLOOR)
		{
			this.validDirections.push(this.LEFT);
		}
	} 
	if(monsterColumn < COLUMNS - 1)
	{
		var thingToTheRight = currentMap[monsterRow][monsterColumn + 1];
		if(thingToTheRight === FLOOR)
		{
			this.validDirections.push(this.RIGHT);
		}
	} 
  
	//The monster's validDirections array now contains 0 to 4 directions that the 
	//contain FLOOR cells. Which of those directions will the monster
	//choose to move in?

	//If a valid direction was found, Figure out if the monster is at an 
	//maze passage intersection.
	if(this.validDirections.length !== 0)
	{
		
		//Find out if the monster is at an intersection
		var upOrDownPassage = (this.validDirections.indexOf(this.UP) !== -1 || this.validDirections.indexOf(this.DOWN) !== -1);

		var leftOrRightPassage = (this.validDirections.indexOf(this.LEFT) !== -1 || this.validDirections.indexOf(this.RIGHT) !== -1);

		//KN: Here is the case in which the monster was just spawned, and hasn't moved anywhere before. The list of valid directions has been set, and now it just picks a random one.
		if (this.direction === this.NEVERMOVED)
		{
			var randomNumber = Math.floor(Math.random() * this.validDirections.length);
			this.direction = this.validDirections[randomNumber];
		}
		
		//Otherwise, it has moved before. So continue with the behavior that was coded into the original program:
		//Change the monster's direction if it's at an intersection or
		//in a cul-de-sac (dead-end)
		else if(upOrDownPassage && leftOrRightPassage || this.validDirections.length === 1)
		{
			//Optionally find the closest distance to the alien
			if(alien !== null && this.hunt === true)
			{
				this.findClosestDirection();
			}

			//Assign a random validDirection if the alien object doesn't exist in the game
			//or a validDirection wasn't found that brings the monster closer to the alien
			if(alien === null || this.direction === this.NONE)
			{
				var randomNumber = Math.floor(Math.random() * this.validDirections.length);
				this.direction = this.validDirections[randomNumber];
			}

			//Choose the monster's final direction
		}
		
		//After it has picked a direction, from either source, here's where it makes use of that direction.
		switch(this.direction)
		{
			case this.RIGHT:
				this.vx = this.speed;
				this.vy = 0;
				break;

			case this.LEFT:
				this.vx = -this.speed;
				this.vy = 0;
				break;

			case this.UP:
				this.vx = 0;
				this.vy = -this.speed;
				break;

			case this.DOWN:
				this.vx = 0;
				this.vy = this.speed;
		}
	} //End "if (this.validDirections.length !== 0)"
}

/*Called by changeDirection, if hunt is enabled.
Figures out the distance between this monster and the alien, on both the X and the Y axis.
Compares the distances and figures out which one is the lowest. 
If the closest one is valid, then the monster's direction will be set to that.
*/
Monster.prototype.findClosestDirection = function() {
	var closestDirection = undefined;

	//Find the distance between the monster and the alien
	var vectorx = alien.centerX() - this.centerX(); 
	var vectory = alien.centerY() - this.centerY();

	//If the distance is greater on the x axis...
	if(Math.abs(vectorx) >= Math.abs(vectory))
	{
		//Try left and right
		if(vectorx <= 0)
		{
			closestDirection = this.LEFT;        
		}
		else
		{
			closestDirection = this.RIGHT;	    
		}
	}
	//If the distance is greater on the y axis...
	else
	{
		//Try up and down
		if(vectory <= 0)
		{
			closestDirection = this.UP;
		}
		else
		{
			closestDirection = this.DOWN;
		}
	}

	//Find out if the closestDirection is one of the validDirections
	for(var i = 0; i < this.validDirections.length; i++)
	{
		if(closestDirection === this.validDirections[i])
		{
			//If it, assign the closestDirection to the monster's direction
			this.direction = closestDirection;
		}
	}
}