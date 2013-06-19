levelEntityClass = function() {
	//this function sets the default values for the members
	this.x = 0;
	this.y = 0;
	this.sourceX = 0;
	this.sourceY = 32;
	this.sourceWidth = 480;
	this.sourceHeight = 320;
	this.width = 480;
	this.height = 320;
	
	//speed for the background panning
	this.vy = 0.25;
}


//JT:does nothing
levelEntityClass.prototype.update = function()
{
	
}

//JT:updates the bacground for later children of this class
levelEntityClass.prototype.updateBG = function () {
	//Used by background
	if (this.sourceX !== 256 && this.sourceX !== 480 && this.sourceX !== 0)
	{
	console.log("inside the update function for EntityClass " + this.sourceX + " " + this.sourceY);
	}
}

//JT:this fucntion will make the background move
levelEntityClass.prototype.bgScroll = function () {
	
	//the update method will now update the scrolling of the
	this.y += this.vy;
	
	console.log("we are inside the loop excecuting bgScroll");
}