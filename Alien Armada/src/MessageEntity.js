//Used for any messages displayed on screen (Presently, the score display and the win/loss message)
Message.prototype = new EntityClass();
Message.prototype.constructor = Message;
function Message() {
	EntityClass.call(this);
	this.fillStyle = "#00FF00";
	this.textBaseline = "top";
}