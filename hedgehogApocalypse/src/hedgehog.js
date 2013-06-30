Hedgehog.prototype = new spriteObject();
Hedgehog.prototype.constructor = Hedgehog;
function Hedgehog(column, row)
{
	spriteObject.call(this);
	this.NORMAL = [1,0];
	this.SQUASHED = [2, 0];
	this.state = this.NORMAL;
	this.speed = 1;
	this.vx = this.speed;
	this.deathcounter = -1; //Used for the transition stage between the hedgehog getting squashed, and it disappearing.
	this.x = column * SIZE;
	this.y = row * SIZE;
}

Hedgehog.prototype.update = function()
{
	this.sourceX = this.state[0] * this.sourceWidth;
	this.sourceY = this.state[1] * this.sourceHeight;
	
	 if(this.state === this.NORMAL)
    {
      this.x += this.vx;
      this.y += this.vy;
    }
    
	if (this.deathcounter > 0)
	{
		this.deathcounter--;
	}
	if (this.deathcounter === 0)
	{
		removeObject(this, sprites);
	}
	
    //Check whether the hedgehog is at a cell corner
    if(Math.floor(this.x) % SIZE === 0 && Math.floor(this.y) % SIZE === 0)
    {
      //Change the hedgehog's direction if there's no BOX under it
      
      //Find the hedgehog's column and row in the array
	  var hedgehogColumn = Math.floor(this.x / SIZE);
	  var hedgehogRow = Math.floor(this.y / SIZE);
	
	  if(hedgehogRow < ROWS - 1)
	  { 
	    var thingBelowLeft = levelMaps[levelCounter][hedgehogRow + 1][hedgehogColumn - 1];
	    var thingBelowRight = levelMaps[levelCounter][hedgehogRow + 1][hedgehogColumn + 1];
		    
        if(thingBelowLeft !== BOX || thingBelowRight !== BOX)
        {
          this.vx *= -1;
        }
      }
		  
      if(hedgehogColumn > 0)
      {
        var thingToTheLeft = levelMaps[levelCounter][hedgehogRow][hedgehogColumn - 1];
        if(thingToTheLeft === BOX || thingToTheLeft === GRASS)
        {
          this.vx *= -1;
        }
      } 
		  
      if(hedgehogColumn < COLUMNS - 1)
      {
        var thingToTheRight = levelMaps[levelCounter][hedgehogRow][hedgehogColumn + 1];
        if(thingToTheRight === BOX || thingToTheRight === GRASS)
        {
          this.vx *= -1;
        }
      }     
    }
}