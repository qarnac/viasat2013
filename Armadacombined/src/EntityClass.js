EntityClass = function() {
	//this function sets the default values for the members
	this.x = 0;
	this.y = 0;
	this.sourceX = 0;
	this.sourceY = 0;
	this.sourceWidth = 32;
	this.sourceHeight = 32;
	this.width = 32;
	this.height = 32;
	this.vx = 0;
	this.vy = 0;
	this.visible = true;
	  
}

EntityClass.prototype.centerX = function() {
	return this.x + this.width/2;
}

EntityClass.prototype.centerY = function(){
	return this.y + (this.height / 2);
}

EntityClass.prototype.halfWidth = function(){
	return this.width / 2;
}

EntityClass.prototype.halfHeight = function(){
	return this.height / 2;
}

EntityClass.prototype.update = function () {
	//Used by background, health bar
	if (this.sourceX !== 256 && this.sourceX !== 480 && this.sourceX !== 0)
	{
	console.log("inside the update function for EntityClass " + this.sourceX + " " + this.sourceY);
	}
} 