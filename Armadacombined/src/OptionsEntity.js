Options.prototype = new EntityClass();
Options.prototype.constructor = Options;
function Options() {
	this.sourceX= 600;
	this.sourceY= 0;
	this.sourceWidth= 80;
	this.sourceHeight= 20;
	this.width= 80;
	this.height= 20;
	this.vx= 0;
	this.vy= .5;
	this.y = 0;
	this.visible = true;
	this.deathcounter = 1;
}

Options.prototype.update = function() {
	this.y += this.vy;
}