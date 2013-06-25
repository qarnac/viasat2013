Bomb.prototype = new spriteObject();
Bomb.prototype.constructor = Bomb;
function Bomb(row, column) {
	spriteObject.call(this);

	this.sourceX = 256;
	this.sourceY = 0;
	
	this.sourceWidth = 48;
	this.sourceHeight = 36;
	this.x = column * SIZE + 10;	//10 offset to center it on the tile, since it is smaller
	this.y = row * SIZE + 16;	//16 offset to center it on the tile, since it is smaller, and not square
	this.width = 48;
	this.height = 36;	
	
	this.timer = -1; //Will not explode, inert.
}

Bomb.prototype.update = function() {
	//Do nothing if timer === -1, that means it's able to be picked up
	
	//Blow up the bomb if the timer ran out and it is visible (ie, it hasn't yet blown up)
	if (this.timer === 0 && this.visible === true)
	{
		this.visible = false;
		row = (this.y - 16) / 64;
		column = (this.x - 10) / 64;
		
		//Grow the bomb to the size of 3x3 tiles
		this.x -= 74;
		this.y -= 80;
		this.width = 192;
		this.height = 192;
		
		//Loop through sprites
		for (var i = 0; i < sprites.length; i++)
		{
			//If the new 3x3-sized bomb hit anything
			if (hitTestRectangle(this, sprites[i]))
			{
				//See if it was a monster or a box
				if (sprites[i] instanceof Monster || (sprites[i] instanceof Box))
				{
					//If it was a box, draw a floor under it
					if (sprites[i] instanceof Box)
					{
						var floor = new spriteObject(Math.floor(sprites[i].y/64), Math.floor(sprites[i].x/64));
						floorsAndWalls.push(floor);
					}
					//And in either case, remove the box/monster.
					removeObject(sprites[i], sprites);
					i--;
				}
			}
		}
		removeObject(this, sprites); //Remove the bomb itself after the loop finishes
	}
	
	//If timer hasn't run out yet, then decrement it.
	else if (this.timer > 0)
	{
		this.timer--;
	}
}