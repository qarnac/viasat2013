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
/*
var buttonObject = Object.create(spriteObject);
buttonObject.sourceX= 600;
buttonObject.sourceY= 0;
buttonObject.sourceWidth= 80;
buttonObject.sourceHeight= 20;
buttonObject.width= 80;
buttonObject.height= 20;
buttonObject.vx= 0;
buttonObject.vy= .5;
buttonObject.visible = true;*/