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
	this.x = Math.max(64, Math.min(this.x + this.vx, gameWorld.width - this.width - 64)); 
	this.y = Math.max(64, Math.min(this.y + this.vy, gameWorld.height - this.height - 64));
	
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