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

	/*If the timer is -1, the default, it means that it is just an inert object waiting to be picked up. Once it's picked up, its timer is changed to 60 (done in Player.update).
	Then, in Bomb.update, the timer decrements by 1 every frame.
	Once the timer equals 0, it explodes.
	
	The explosion works by making the bomb take up a 3x3 space surrounding where it previously was (By moving it up and left by 1 block each, and then making the width and height 3x bigger),
	and then doing collision detection. Any box or monster it has collided with, gets removed and replaced by floor.
	*/	
	if (this.timer === 0) //Preciesly 0, because <0 would include inert bombs.
	{
		inventory[1][5]++;	//Increaes the counter of total bombs used
		
		//Figure out the row and column the bomb is in.
		row = (this.y - 16) / 64;
		column = (this.x - 10) / 64;
		
		//Grow the bomb to the size of 3x3 tiles, surrounding the placement of it.
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
					i--; //Decrement i, because the for loop won't realize that the elements got shifted back by 1.
				}
				//If it hit an inert bomb, ignite it.
				else if (sprites[i] instanceof Bomb && sprites[i].timer === -1)
				{
					sprites[i].timer = 60;
					
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