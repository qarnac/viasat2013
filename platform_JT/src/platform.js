Platform.prototype = new spriteObject();
Platform.prototype.constructor = Platform;
function Platform(column, row)
{
	spriteObject.call(this);
	
	this.speed = 1;
	this.vy = this.speed;
	this.x = column * SIZE;
	this.y = row * SIZE;
        
        //these variables check to see how much the platforms will move
        this.topMax =  this.y + SIZE;
        this.botMax =  this.y - SIZE;
        
}

//JT: still have to change the blocks to the appropirate kind in order to jump over them
Platform.prototype.update = function()
{

    //this will have the platform move;    
    //this.x += this.vx;
    
    this.y += this.vy;
    
    //using a switch because for some reason I was having trouble with if statements
    switch (this.y)
    {
        case 550: this.vy = 1;
            break;
        case 850: this.vy = -1;
            break;
        default:
            break;
    }
   
}