//--- The sprite object
spriteObject = function(column, row) {

  this.sourceX = 0;
  this.sourceY = 0;
  this.sourceWidth = 64;
  this.sourceHeight = 64;
  this.width = 64;
  this.height = 64;
  this.x = column * SIZE;
  this.y = row * SIZE;
  this.vx = 0;
  this.vy = 0;
  this.visible = true;
  this.sheet = image;
  
  //Physics properties
  this.accelerationX = 0; 
  this.accelerationY = 0; 
  this.speedLimit = 5; 
  this.friction = 0.96;
  this.bounce = -0.7;
  this.gravity = 0.3;
    
  //Platform game properties   
  this.isOnGround = undefined;
  this.jumpForce = -10;
};

spriteObject.prototype.centerX = function() {
	return this.x + this.width/2;
}

spriteObject.prototype.centerY = function(){
	return this.y + (this.height / 2);
}

spriteObject.prototype.halfWidth = function(){
	return this.width / 2;
}

spriteObject.prototype.halfHeight = function(){
	return this.height / 2;
}

spriteObject.prototype.left = function()
{
	return this.x;
}

spriteObject.prototype.right = function()
{
	return this.x + this.width;
}

spriteObject.prototype.top = function()
{
	return this.y;
}

spriteObject.prototype.bottom = function()
{
	return this.y + this.height;
}



spriteObject.prototype.update = function () {
	this.x += this.vx;
	this.y += this.vy;
} 

//--- The message object

var messageObject =
{
  x: 0,
  y: 0,
  visible: true,
  text: "Message",
  font: "normal bold 20px Helvetica",
  fillStyle: "red",
  textBaseline: "top"
};