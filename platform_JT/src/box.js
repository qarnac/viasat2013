Box.prototype = new spriteObject();
Box.prototype.constructor = Box;
function Box(column, row)
{
	spriteObject.call(this);
	
	this.x = column * SIZE;
	this.y = row * SIZE;

}