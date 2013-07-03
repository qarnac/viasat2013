Fireball.prototype = new spriteObject();
Fireball.prototype.constructor = Fireball;

function Fireball() {
	spriteObject.call(this);
	
	this.sourceX = 128;
	this.sourceY = 0;
	this.width = 24;
	this.height = 24;
	this.scrollable = true;
}


Fireball.prototype.update = function () {
	this.x += this.vx;
	if (this.x < 0 || this.x > gameWorld.width)
	{
		removeObject(this, sprites);
		return;
	}
	for (var i = 0; i < sprites.length; i++)
	{
		//See if the fireball hit a box or platform
		//If so, remove the fireball
		if (hitTestRectangle(sprites[i], this) && (sprites[i] instanceof Box || sprites[i] instanceof Platform))
		{
			removeObject(this, sprites);
			return;	
		}
	}
}