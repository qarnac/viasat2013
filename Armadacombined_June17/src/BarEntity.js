Bar.prototype = new EntityClass();
Bar.prototype.constructor = Bar;
function Bar() {
	EntityClass.call(this);

	this.sourceY =0;
	this.sourceX = 256;
	this.sourceWidth = 180;
	this.sourceHeight = 32;
	this.width = 180;
	this.height = 32;
	this.visible =true;
	this.deathcounter = 1;
}


Bar.prototype.update = function() {

	var mothership = null;
	for (var i = 0; i < sprites.length; i++)
	{
		if (sprites[i].sourceX === 128)
		{
			mothership = sprites[i];
			break;
		}
	}
	
	if (mothership !== null)
	{
		//44px constant is the icon that doesn't get reduced. The rest of the bar is 136px.
		//Reduce that 136px to reflect the mothership's current/max health.
		this.sourceWidth = 44 + 136 * (mothership.health / mothership.MAXHEALTH);
		this.width = 44 + 136 * (mothership.health / mothership.MAXHEALTH);

	}
	else //Once the mothership is gone, remove the health bar.
	{
		this.deathcounter--;
	}
}