Mars.prototype = new levelEntityClass();
Mars.prototype.constructor = Mars;
function Mars() {
        levelEntityClass.call(this);
    
	//this function sets the default values for the members
	this.x = 0;
	this.y = 0;
        //these sets of coordinates will be for mars
	this.sourceX = 480;
	this.sourceY = 32;
}


//
Mars.prototype.updateBG = function () {
	//Used by background
	if (this.sourceX !== 256 && this.sourceX !== 480 && this.sourceX !== 0)
	{
	console.log("inside the update function for EntityClass " + this.sourceX + " " + this.sourceY);
	}
}

//might possibly pass some arguments to change the behavior of the sprites
Mars.prototype.newEnvironment = function (){
        //this will change the new environment conditions

}