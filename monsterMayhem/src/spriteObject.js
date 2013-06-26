spriteObject = function(row, column) {
	//this function sets the default values for the members
	this.x = column * SIZE;
	this.y = row * SIZE;
	this.sourceX = 0;
	this.sourceY = 0;
	this.sourceWidth = 64;
	this.sourceHeight = 64;
	this.width = 64;
	this.height = 64;
	this.vx = 0;
	this.vy = 0;
	this.visible = true;
	this.scrollable = true;
}

spriteObject.prototype.centerX = function() {
	return this.x + this.width/2;
}

spriteObject.prototype.centerY = function(){
	return this.y + (this.height / 2);
}

spriteObject.prototype.halfWidth = function(){
	return this.width / 2;
}

spriteObject.prototype.halfHeight = function(){
	return this.height / 2;
}

spriteObject.prototype.update = function () {
	this.x += this.vx;
	this.y += this.vy;
} 