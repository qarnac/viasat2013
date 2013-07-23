Settings = function() {
//Win conditions	
	this.winscore = true;
	this.winscoreNum = 160;
	
	this.wintime = false;
	this.wintimeNum = 100;
	
	this.winship = false;
	this.winshipNum = 2;
	
	this.winconds = 1;
	
	
//Powerups
	this.repairspawns = false;
	this.repairscore = false;
	this.repairmother = false;

	this.bombspawns = false;
	this.bombscore = false;
	this.bombtime = false;

	this.scoreupspawns = false;
	this.scoreupscore = false;
	this.scoreuptime = false;

	this.slowspawns = false;
	this.slowscore = false;
	this.slowtime = false;

	
//Player
	this.model = "grey";
	this.missiles = "straight";
	this.damage = 1;
	this.lives = 3;
	
	
//Aliens
	this.alienbounty = 1;
	this.alienhealth = 1;
	this.aliengrowth = 0;
	
	
//Motherships
	this.motherspawns = "one";
	this.motherbounty = 20;
	this.motherhealth = 20;
	this.spawn = 40;

}