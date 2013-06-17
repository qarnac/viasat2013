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
		this.sourceWidth = 44 + 136 * (mothership.health / mothership.MAXHEALTH);
		this.width = 44 + 136 * (mothership.health / mothership.MAXHEALTH);
	}
	else
	{
		removeObject(this, health);
		removeObject(this, sprites);
	}
}