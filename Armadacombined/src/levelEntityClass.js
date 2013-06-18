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
}


//
<<<<<<< HEAD
levelEntityClass.prototype.updateBG = function () {
=======
levelEntityClass.prototype.update = function () {
>>>>>>> Combined Jorge's + Kevin's
	//Used by background
	if (this.sourceX !== 256 && this.sourceX !== 480 && this.sourceX !== 0)
	{
	console.log("inside the update function for EntityClass " + this.sourceX + " " + this.sourceY);
	}
} 