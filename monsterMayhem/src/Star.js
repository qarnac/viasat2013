Star.prototype = new spriteObject();
Star.prototype.constructor = Star;
function Star(row, column) {
	spriteObject.call(this);
	
	this.sourceX = 192;
	this.sourceY = 0;

	this.sourceWidth = 48;
	this.sourceHeight = 48;
	this.x = column * SIZE + 8;	//8 offset to center it on the tile, since it is smaller
	this.y = row * SIZE + 8;	//8 offset to center it on the tile, since it is smaller
	this.width = 48;
	this.height = 48;	
}