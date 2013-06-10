//--- The sprite object

var spriteObject =
{
  sourceX: 0,
  sourceY: 0,
  sourceWidth: 32,
  sourceHeight: 32,
  width: 32,
  height: 32,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  visible: true,

  //Getters
  centerX: function()
  {
    return this.x + (this.width / 2);
  },
  centerY: function()
  {
    return this.y + (this.height / 2);
  },
  halfWidth: function()
  {
    return this.width / 2;
  },
  halfHeight: function()
  {
    return this.height / 2;
  }
};


//--- The alien object

var alienObject = Object.create(spriteObject);
alienObject.NORMAL = 1;
alienObject.EXPLODED = 2;
alienObject.state = alienObject.NORMAL;

//this is where the update happnes for the explosion
alienObject.update = function()
{
  this.sourceX = this.state * this.width;
  
  //this is how we will identify the mother
  if (this.sourceWidth === 64)
  {
    this.sourceX = 192;
  }
};

//--- The message object

var messageObject =
{
  x: 0,
  y: 0,
  visible: true,
  text: "",
  font: "normal bold 20px Helvetica",
  fillStyle: "red",
  textBaseline: "top"
};

