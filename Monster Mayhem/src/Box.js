Box.prototype = new spriteObject();
Box.prototype.constructor = Box;
function Box(row, column) {
	spriteObject.call(this);
	
	this.sourceX = 64;
	this.sourceY = 0;
	
	this.x = column * SIZE;
	this.y = row * SIZE;
	this.width = 64;
	this.height = 64;	
}