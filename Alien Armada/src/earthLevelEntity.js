Earth.prototype = new levelEntityClass();
Earth.prototype.constructor = Earth;
function Earth() {
        levelEntityClass.call(this);
    
	//this function sets the default values for the members
	this.x = 0;
	this.y = 0;
        //these sets of coordinates will be for mars
	this.sourceX = 480;
	this.sourceY = 32;
	this.damage = 1;
}


/*
Earth.prototype.updateBG = function () {
}*/

/*
//might possibly pass some arguments to change the behavior of the sprites
Earth.prototype.newEnvironment = function (){
        //this will change the new environment conditions

}*/