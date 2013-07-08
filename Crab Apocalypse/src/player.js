Astronaut.prototype = new spriteObject();
Astronaut.prototype.constructor = Astronaut;
function Astronaut(column, row){
	spriteObject.call(this);
	
	this.x = column * SIZE;
	this.y = row * SIZE;
	this.lives = 1; //When this reaches 0, game is over. Player loses a life when they hit a monster or the monster's fireball
}

Astronaut.prototype.update = function()
{
	//End the game if the player ran out of lives
	if (this.lives === 0)
	{
		gameState = OVER;
	}

  //JT: if just standing still
	if (this.isOnGround)
	{
		this.sourceX = 0;
	}
	
  //Left
  if(moveLeft && !moveRight)
  {
	
	this.sourceX = 128;
    this.accelerationX = -0.2;
    this.friction = 1;
  }
  //Right
  if(moveRight && !moveLeft)
  {
	this.sourceX = 64;
    this.accelerationX = 0.2;
    this.friction = 1;
  }
  //Space
  if(jump && this.isOnGround)
  {
	this.sourceX = 192;
    this.vy += this.jumpForce;
    this.isOnGround = false;
    this.friction = 1;
  }

  //Set the astronaut's acceleration, friction and gravity 
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
  
  //Move the astronaut
	this.x += this.vx;
	this.y += this.vy;
  
	//Collisions
	for (var i = 0; i < sprites.length; i++)
	{
		//With fireball (from some crabmonsters)
		if (sprites[i] instanceof Fireball && hitTestRectangle(sprites[i], this))
		{
			this.lives--;
			removeObject(sprites[i], sprites);
			i--;
		}
		
		//with Door
		if (sprites[i] === door)
		{
			//Test collision with the right side of the door. That way, the player is standing all the way inside of it, not just barely touching the edge.
			if (hitTestRectangle(door, this) && crabsRemaining === 0)
			{
			  //gameState = OVER;
			  gameState = LEVEL_COMPLETE;
			}  
		}
		
		//with Crab
		if (sprites[i] instanceof Crab && hitTestCircle(this, sprites[i]) && sprites[i].state === sprites[i].NORMAL)
		{
			var crab = sprites[i];
			if (this.vy > 0) //If the player comes at the crab from above, squash the crab
			{
				blockCircle(this, crab, true);
				crabsRemaining--;
				crab.state = crab.SQUASHED;
				crab.update();  
				crab.deathcounter = 60; //There will be a 60-frame delay where the crab has a different sprite, before disappearing.
			}
			else //Otherwise, crab eats astronaut
			{
				this.lives--;
			}
		}
		
		//with Box
		if (sprites[i] instanceof Box)
		{
			var collisionSide = blockRectangle(this, sprites[i], false);
    
			if(collisionSide === "bottom" && this.vy >= 0)
			{
				//Tell the game that the astronaut is on the ground if 
				//it's standing on top of a platform
				this.isOnGround = true;

				//Neutralize gravity by applying its
				//exact opposite force to the character's vy
				this.vy = -this.gravity;
			}
			
			//If colliding from the top, the left, or the right, neutralize the velocity.
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
			
			//If the player hasn't landed on something, then it is still in the air.
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
	if (this.x + this.width > gameWorld.width)
	{
		this.vx = 0;
		this.x = gameWorld.width - this.width;
	}
	//Down
	if (this.y + this.height > gameWorld.height)
	{
		this.vy = 0;
		this.y = gameWorld.height - this.height;
		this.isOnGround = true;
		this.vy = -this.gravity;
	}
	
	
	//Scroll the camera
	if(this.x < camera.leftInnerBoundary())
	{
		camera.x = Math.floor(this.x - (camera.width / 4));
	}
	if(this.y < camera.topInnerBoundary())
	{
		camera.y = Math.floor(this.y - (camera.height / 4));
	}
	if(this.x + this.width > camera.rightInnerBoundary())
	{
		camera.x = Math.floor(this.x + this.width - (camera.width / 4 * 3));
	}
	if(this.y + this.height > camera.bottomInnerBoundary())
	{
		camera.y = Math.floor(this.y + this.height - (camera.height / 4 * 3));
	}

	//The camera's gameWorld boundaries
	/* The and-not condition in these checks make it so that, for any map that can fit entirely within the canvas (ie, the camera goes out of bounds on both the left AND the right), 
	the camera will be allowed to scroll past the gameworld for the sake of staying centered on the middle of the map.
	Larger maps will not allow that behavior, only ones that're smaller.
	*/
	if((camera.x < gameWorld.x) && !(camera.x + camera.width > gameWorld.x + gameWorld.width))
	{
		camera.x = gameWorld.x;
	}
	if((camera.x + camera.width > gameWorld.x + gameWorld.width) && !(camera.x < gameWorld.x))
	{
		camera.x = gameWorld.x + gameWorld.width - camera.width;
	}
	
	if((camera.y < gameWorld.y) && !(camera.y + camera.height > gameWorld.height))
	{
		camera.y = gameWorld.y;
	}
	if((camera.y + camera.height > gameWorld.height) && !(camera.y < gameWorld.y))
	{
		camera.y = gameWorld.height - camera.height;
	}  
	
}