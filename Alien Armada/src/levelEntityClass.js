//Used for the background of the game, whether it's Earth, Mars, or open space.
levelEntityClass.prototype = new EntityClass();
levelEntityClass.prototype.constructor = levelEntityClass;
function levelEntityClass() {
	EntityClass.call(this);

	this.sourceY = 32;
	this.sourceWidth = 480;
	this.sourceHeight = 320;
	this.width = 480;
	this.height = 320;
	
	this.vy = 0.25;
}