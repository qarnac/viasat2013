Message.prototype = new EntityClass();
Message.prototype.constructor = Message;
function Message() {	
	this.x = 0;
	this.y = 0;
	this.visible = true;
	this.text = "Message";
	this.font = "normal bold 20px Helvetica";
	this.fillStyle = "red";
	this.textBaseline = "top";
}
