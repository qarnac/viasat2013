Settings = function() {
//Win conditions	

	//winX is whether or not the game is winnable with X.
	//winXNum is the value for that win condition
	//e.g. if wintime === true, then player wins by surviving for wintimeNum seconds.
	this.winscore = true;
	this.winscoreNum = 160; //Reach a high score
	
	this.wintime = false;
	this.wintimeNum = 100; //Survive a set amount of time
	
	this.winship = false;
	this.winshipNum = 2;  //Destroy an amount of motherships
	
	this.wincondsneeded = 1; //How many win conditions must be met in order to win
	
	
//Powerups
//"no" means they don't spawn. "score" means they spawn based on score. "time" means they spawn based on time.
	this.repairspawns = "no"; //can also be "boss", spawning after a boss kill
	this.bombspawns = "no";
	this.scoreupspawns = "no";
	this.slowspawns = "no";

	
//Player
	this.model = "grey";	//Aesthetics
	this.firingType = 0; //0 fires 1 missile to the side, 1 fires 2 at an angle, 2 fires missiles that seek motherships
	this.damage = 1;
	this.lives = 3;
	
	
//Aliens
	this.alienbounty = 1; //How much score each alien is worth
	this.alienhealth = 1; //Base amount of health an alien has
	this.aliengrowth = 0; //0 === disabled. Else, give aliens an extra health every time the score is evenly divisible by this.
	
	
//Motherships
	this.motherspawns = "one";
	this.motherbounty = 20;
	this.motherhealth = 20;
	this.spawn = 40;
}