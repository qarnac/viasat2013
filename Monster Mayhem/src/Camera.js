//--- The camera object
var camera = 
{
	x: 0,
	y: 0,
	width: canvas.width,
	height: canvas.height,

	//The camera's inner scroll boundaries
	rightInnerBoundary: function()
	{
		return this.x + (this.width / 2) + (this.width / 4);
	},
	leftInnerBoundary: function()
	{
		return this.x + (this.width / 2) - (this.width / 4);
	},
	topInnerBoundary: function()
	{
		return this.y + (this.height / 2) - (this.height / 4);
	},
	bottomInnerBoundary: function()
	{
		return this.y + (this.height / 2) + (this.height / 4);
	}
};

//Center the camera over the gameWorld
camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;