/*
This is more than just the alien object. This also controls the camera.
*/

Player.prototype = new spriteObject();
Player.prototype.constructor = Player;
function Player(row, column) {
	spriteObject.call(this);
	
	this.sourceX = 0;
	this.sourceY = 64;
	
	this.x = column * SIZE + 8;	//8 offset to center it on the tile, since it is smaller
	this.y = row * SIZE + 8;	//8 offset to center it on the tile, since it is smaller
	this.width = 48;
	this.height = 48;	
}
	

	
Player.prototype.update = function() {

//Control the velocity of the alien
	//On keydown, set vy and/or vx
	if(moveUp && !moveDown)		{ this.vy = -4;}	//Move up
	if(moveDown && !moveUp)		{ this.vy = 4; }	//Move down
	if(moveLeft && !moveRight)	{ this.vx = -4;}	//Move left
	if(moveRight && !moveLeft)	{ this.vx = 4; }	//Move right

	//On keyup, decelerate vy and/or vx.
	var DECEL = 0.25;
	if(!moveUp && !moveDown) //No longer pressing up nor down
	{
		if (this.vy > 0) { this.vy -= DECEL; }
		else if (this.vy < 0) { this.vy += DECEL; }
	}
	if(!moveLeft && !moveRight) //No longer pressing left nor right
	{
		if (this.vx > 0) { this.vx -= DECEL; }
		else if (this.vx < 0) { this.vx += DECEL; }
	}

	//Move the alien, and ensure that it stays within the game world.
	this.x = Math.max(64, Math.min(this.x + this.vx, gameWorld.width - this.width - 64)); 
	this.y = Math.max(64, Math.min(this.y + this.vy, gameWorld.height - this.height - 64));
	
	//Drop a bomb
	if (inventory[1][1] > 0 && dropBomb)
	{
		dropBomb = false;
		inventory[1][1]--;
		
		var xcoord = Math.floor(this.x / 64);
		var ycoord = Math.floor(this.y / 64);
		
		var bomb = new Bomb(ycoord, xcoord);
		bomb.timer = 60;
		sprites.push(bomb);
	}
	
	
	//Collisions
	for (var i = 0; i < sprites.length; i++)
	{
		//Monsters
		if (sprites[i] instanceof Monster && hitTestCircle(this, sprites[i]))
		{
			gameState = OVER;
		}
		
		//Boxes
		if (sprites[i] instanceof Box)
		{
			blockRectangle(this, sprites[i]);
		}
		
		//Stars -- Make sure it is visible, too.
		if (sprites[i] instanceof Star && hitTestRectangle(this, sprites[i]) && sprites[i].visible)
		{
			sprites[i].visible = false;
			inventory[0][1]++; //Increase star counter in inventory
			if (inventory[0][1] === starsTotal) //If you have all of the stars on the map, win the level
			{
				gameState = LEVEL_COMPLETE;
			}
		}
		
		//Bomb
		if (sprites[i] instanceof Bomb && hitTestCircle(this, sprites[i]) && sprites[i].visible && sprites[i].timer === -1)
		{
			sprites[i].visible = false;
			inventory[1][1]++;
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