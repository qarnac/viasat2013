Bar.prototype = new EntityClass();
Bar.prototype.constructor = Bar;
function Bar() {
	EntityClass.call(this);

	this.sourceX = 256;
	this.sourceWidth = 180;
	this.width = 180;
}

//YO: A bar object is tightly coupled with its associated mothership/alien and should not be an independent object.
Bar.prototype.update = function() {
	if (mothership.health) //If it is alive, update the bar to reflect its health
	{
		//44px constant is the icon that doesn't get reduced. The rest of the bar is 136px.
		//Reduce that 136px to reflect the mothership's current/max health.
		this.sourceWidth = 44 + 136 * (mothership.health / mothership.MAXHEALTH);
		this.width = 44 + 136 * (mothership.health / mothership.MAXHEALTH);

	}
	else //Once the mothership is gone, remove the health bar.
	{
		this.framesremaining--;
	}
}