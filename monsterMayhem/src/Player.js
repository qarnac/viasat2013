/*
This is more than just the alien object. This also controls the camera.
*/

Player.prototype = new spriteObject();
Player.prototype.constructor = Player;
function Player(row, column) {
	spriteObject.call(this);
	
	this.x = column * SIZE + 8;	//8 offset to center it on the tile, since it is smaller
	this.y = row * SIZE + 8;	//8 offset to center it on the tile, since it is smaller
	this.width = 48;
	this.height = 48;	
}
	

	
Player.prototype.update = function() {

//Control the velocity of the alien
	//On keydown, set vy and/or vx
	/*Up*/	if(moveUp && !moveDown)		{ this.vy = -4;}
	/*Down*/if(moveDown && !moveUp)		{ this.vy = 4; }
	/*Left*/if(moveLeft && !moveRight)	{ this.vx = -4;}
	/*Right*/if(moveRight && !moveLeft)	{ this.vx = 4; }

	//On keyup, decelerate vy and/or vx.
	var DECEL = 0.25;
	if(!moveUp && !moveDown)
	{
		if (this.vy > 0) { this.vy -= DECEL; }
		else if (this.vy < 0) { this.vy += DECEL; }
	}
	if(!moveLeft && !moveRight)
	{
		if (this.vx > 0) { this.vx -= DECEL; }
		else if (this.vx < 0) { this.vx += DECEL; }
	}

	//Move the alien
	this.x = Math.max(64, Math.min(this.x + this.vx, gameWorld.width - this.width - 64)); 
	this.y = Math.max(64, Math.min(this.y + this.vy, gameWorld.height - this.height - 64));
	
	//Check for collisions with monsters
	for(var i = 0; i < monsters.length; i++)
	{ 
		if(hitTestCircle(this, monsters[i]))
		{
			gameState = OVER;
		}
	}
	
	//Check collision between the alien and the boxes
	for(var i = 0; i < boxes.length; i++)
	{
		blockRectangle(this, boxes[i]);
	}
	
	//Check for collisions with stars
	for(var i = 0; i < stars.length; i++)
	{ 
		var star = stars[i];
		if(hitTestRectangle(this, star) && star.visible)
		{
			star.visible = false;
			starsCollected++;

			//Check whether the level is over
			//by checking if the starsCollected matches
			//the total number in the stars array
			if(starsCollected === stars.length)
			{
				gameState = LEVEL_COMPLETE;
			}    
		}
	}
	
	//Scroll the camera
	if(this.x < camera.leftInnerBoundary())
	{
		camera.x = Math.floor(this.x - (camera.width / 4));
	}
	if(this.y < camera.topInnerBoundary())
	{
		camera.y = Math.floor(this.y - (camera.height / 4));
	}
	if(this.x + this.width > camera.rightInnerBoundary())
	{
		camera.x = Math.floor(this.x + this.width - (camera.width / 4 * 3));
	}
	if(this.y + this.height > camera.bottomInnerBoundary())
	{
		camera.y = Math.floor(this.y + this.height - (camera.height / 4 * 3));
	}

	//The camera's gameWorld boundaries
	if(camera.x < gameWorld.x)
	{
		camera.x = gameWorld.x;
	}
	if(camera.y < gameWorld.y)
	{
		camera.y = gameWorld.y;
	}
	if(camera.x + camera.width > gameWorld.x + gameWorld.width)
	{
		camera.x = gameWorld.x + gameWorld.width - camera.width;
	}
	if(camera.y + camera.height > gameWorld.height)
	{
		camera.y = gameWorld.height - camera.height;
	}  
}