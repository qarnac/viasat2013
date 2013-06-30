Cat.prototype = new spriteObject();
Cat.prototype.constructor = Cat;
function Cat(column, row){
	spriteObject.call(this);
	this.x = column * SIZE;
  this.y = row * SIZE;

}

Cat.prototype.update = function()
{
  //Left
  if(moveLeft && !moveRight)
  {
    this.accelerationX = -0.2;
    this.friction = 1;
  }
  //Right
  if(moveRight && !moveLeft)
  {
    this.accelerationX = 0.2;
    this.friction = 1;
  }
  //Space
  if(jump && this.isOnGround)
  {
    this.vy += this.jumpForce;
    this.isOnGround = false;
    this.friction = 1;
  }

  //Set the cat's acceleration, friction and gravity 
  //to zero if none of the arrow keys are being pressed
  if(!moveLeft && !moveRight)
  {
    this.accelerationX = 0; 
    this.friction = 0.96; 
    this.gravity = 0.3;
  }

  //Apply the acceleration
  this.vx += this.accelerationX; 
  this.vy += this.accelerationY;
  
  //Apply friction
  if(this.isOnGround)
  {
    this.vx *= this.friction; 
  }
  
  //Apply gravity
  this.vy += this.gravity;

  //Limit the speed
  //Don't limit the upward speed because it will choke the jump effect
  if (this.vx > this.speedLimit)
  {
    this.vx = this.speedLimit;
  }
  if (this.vx < -this.speedLimit)
  {
    this.vx = -this.speedLimit;
  } 
  if (this.vy > this.speedLimit * 2)
  {
    this.vy = this.speedLimit * 2;
  } 
  
  //Move the cat
  this.x += this.vx;
  this.y += this.vy;
  
  //Collisions
	for (var i = 0; i < sprites.length; i++)
	{
		//with Door
		if (sprites[i] === door)
		{
		   if(hedgehogsSquashed === 3 && hitTestRectangle(this, door))
			{
			  gameState = OVER;
			}  
		}
		
		//with Hedgehog
		if (sprites[i] instanceof Hedgehog && hitTestCircle(this, sprites[i]) && sprites[i].state === sprites[i].NORMAL)
		{
			var hedgehog = sprites[i];
			if (this.vy > 0) //If the player comes at the hedgehog from above, squash the hedgehog
			{
				blockCircle(this, hedgehog, true);
				hedgehogsSquashed++;
				hedgehog.state = hedgehog.SQUASHED;
				hedgehog.update();  
				hedgehog.deathcounter = 60;
			}
			else //Otherwise, hedgehog eats cat
			{
				gameState = OVER;
			}
		}
		
		//with Box
		if (sprites[i] instanceof Box)
		{
			var collisionSide = blockRectangle(this, sprites[i], false);
    
			if(collisionSide === "bottom" && this.vy >= 0)
			{
				//Tell the game that the cat is on the ground if 
				//it's standing on top of a platform
				this.isOnGround = true;

				//Neutralize gravity by applying its
				//exact opposite force to the character's vy
				this.vy = -this.gravity;
			}
			else if(collisionSide === "top" && this.vy <= 0)
			{
				this.vy = 0;
			}
			else if(collisionSide === "right" && this.vx >= 0)
			{
				this.vx = 0;
			}
			else if(collisionSide === "left" && this.vx <= 0)
			{
				this.vx = 0;
			}
			if(collisionSide !== "bottom" && this.vy > 0)
			{
				this.isOnGround = false;
			}
		}
	}
  

  
  
  
    //Screen boundaries
	//Left
	if (this.x < 0)
	{
		this.vx = 0;
		this.x = 0;
	}
	//Up
	if (this.y < 0)
	{
		this.vy = 0;
		this.y = 0;
	}
	//Right
	if (this.x + this.width > canvas.width)
	{
		this.vx = 0;
		this.x = canvas.width - this.width;
	}
	//Down
	if (this.y + this.height > canvas.height)
	{
		this.vy = 0;
		this.y = canvas.height - this.height;
		this.isOnGround = true;
		this.vy = -this.gravity;
	}
}