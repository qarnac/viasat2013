Message.prototype = new EntityClass();
Message.prototype.constructor = Message;
function Message() {
	EntityClass.call(this);
	this.fillStyle = "#00FF00";
	this.textBaseline = "top";
}