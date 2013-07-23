$(document).ready(function(){
    $('#menu').accordion({heightStyle: "fill"}); //Do the accordion feature -- collapsing categories. "fill" means they fill the table size, no bigger and no smaller

//Win conditions -- When someone has clicked on an input under the "How can the player win?" paragraph
	$('#winoptions input').on("change", function() {
		
		switch ($(this).attr('id')) //Switch based on which option was selected
		{
			case ("score"):
				$('#scorenum').prop("disabled", !$(this).is(':checked')); //Toggle the text field (to input what a winning score will be)
				newSettings.winscore = $('#score').prop('checked'); //Toggle the Settings object value
				break;

			case ("scorenum"):
				scoreNeededToWin = newSettings.winscoreNum = this.value;
				console.log(this.value);
				break;
				
			case("time"):
				$('#timenum').prop("disabled", !$(this).is(':checked')); //Toggle the text field (to input what a winning time will be)
				newSettings.wintime = $('#time').prop('checked');
				break;
				
			case ("timenum"):
				timeToWin = newSettings.wintimeNum = this.value;
				console.log(this.value);
				break;
				
			case("ship"):
				$('#shipnum').prop("disabled", !$(this).is(':checked')); //Toggle the text field (to input what a winning quantity of motherships will be)
				newSettings.winship = $('#ship').prop('checked');
				break;
			
			case ("shipnum"):
				shipsToWin = newSettings.winshipNum = this.value;
				console.log(this.value);
				break;
				
			case ("winconds"):
				conditionsNeeded = newSettings.winconds = this.value;
				console.log(this.value);
				break;
		
			default:
				break;
		}
		//Depending on how many win conditions are checked, adjust how big the maximum requirement can be -- ie, if only "Reach a high score" is checked, player shouldn't be allowed to require all 3 win conditions"
		$('#winconds').attr('max', $('#winoptions input:checkbox:checked').length);//Change the max always
		
		$('#winconds').attr('value', Math.min($('#winconds').attr('value'), $('#winconds').attr('max')));//Change current if it's greater than max
		$('#wincondsNum').val($('#winconds').val());		
		newSettings.winconds = $('#wincondsNum').val(); //Change the Settings value
	});
	
	//Separate from the others because "input" is more responsive than "click" for range sliders, but doesn't work for checkboxes
	$('#winconds').on("input", function() {
		$('#wincondsNum').val(this.value);	
		newSettings.winconds = $('#wincondsNum').val(); //Change the Settings value
	});
	
/*
As of now, the powerup options are all clones of each other.
Toggling any of the checkboxes will decide whether or not they spawn. And inner radio menus appear to let the player choose how they will spawn.
*/
	
//Repair
	//Inner options
	$('#repairoptions').hide(); //Hide that sub-menu by default
	$('#repairspawns').on("click", function(){
		$('#repairoptions').toggle(); 	//When the player clicks on the "repair" option, either show or hide the inner options.
		newSettings.repairspawns = $('#repairspawns').prop('checked');
	});
	
	//When one of the repair options has been selected
	$('#repairoptions input').on("click", function()
	{
		//Set a variable (used in controlPowerups function in main js file)
		repairtype = $(this).attr('id');
		
		//Whenever they select a spawn type, give a new score/time at which to spawn.
		if (repairtype === "scorebased")
		{
			repairSpawn = score + Math.round(Math.random()*30+10); //Spawn anywhere between 10 and 40 score
			console.log("Set to " + repairSpawn + " score") //Diagnostic, just making sure that it works as intended.
			newSettings.repairscore = true;
			newSettings.repairmother = false;
		}
		else if (repairtype === "timebased")
		{
			repairSpawn = timer + Math.round(Math.random()*60*30+10); //Spawn between 10 and 40 seconds
			console.log("Set to " + (repairSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
			newSettings.repairscore = false;
			newSettings.repairmother = true;
		}
	});

// Bomb
	//Inner options
	$('#bomboptions').hide();
	//When the player clicks on the "Bomb" option, either show or hide the inner options.
	$('#bombspawns').on("click", function(){
		$('#bomboptions').toggle();
		newSettings.bombspawns = $('#bombspawns').prop('checked');
	});
	//When one of the bomb options has been selected
	$('#bomboptions input').on("click", function()
	{
		//Set a variable (used in controlPowerups function in main js file)
		bombtype = $(this).attr('id');
		
		//Whenever they select a spawn type, give a new score/time at which to spawn.
		if (bombtype === "scorebased")
		{
			bombSpawn = score + Math.round(Math.random()*40); //Spawn anywhere between 0 and 40 score
			console.log("Set to " + bombSpawn + " score") //Diagnostic, just making sure that it works as intended.
			newSettings.bombscore = true;
			newSettings.bombtime= false;
		}
		else if (bombtype === "timebased")
		{
			bombSpawn = timer + Math.round(Math.random()*60*40); //Spawn anywhere between 0 and 40 seconds
			console.log("Set to " + (bombSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
			newSettings.bombscore = false;
			newSettings.bombtime= true;
		}
	});

//Scoreup
	//Inner options
	$('#scoreupoptions').hide();
	//When the player clicks on the "scoreup" option, either show or hide the inner options.
	$('#scoreupspawns').on("click", function(){
		$('#scoreupoptions').toggle();
		newSettings.scoreupspawns = $('#scoreupspawns').prop('checked');
	});
	//When one of the scoreup options has been selected
	$('#scoreupoptions input').on("click", function()
	{
		//Set a variable (used in controlPowerups function in main js file)
		scoreuptype = $(this).attr('id');
		
		//Whenever they select a spawn type, give a new score/time at which to spawn.
		if (scoreuptype === "scorebased")
		{
			scoreupSpawn = score + Math.round(Math.random()*30+10); //Spawn anywhere between 10 and 40 score
			console.log("Set to " + scoreupSpawn + " score") //Diagnostic, just making sure that it works as intended.
			newSettings.scoreupscore = true;
			newSettings.scoreuptime= false;
		}
		else if (scoreuptype === "timebased")
		{
			scoreupSpawn = timer + Math.round(Math.random()*60*30+10); //Spawn between 10 and 40 seconds
			console.log("Set to " + (scoreupSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
			newSettings.scoreupscore = false;
			newSettings.scoreuptime= true;
		}
	});	
	
//Slow
	//Inner options

	$('#slowoptions').hide();
	//When the player clicks on the "slow" option, either show or hide the inner options.
	$('#slowspawns').on("click", function(){
		$('#slowoptions').toggle();
		newSettings.bombspawns = $('#bombspawns').prop('checked');
	});
	//When one of the slow options has been selected
	$('#slowoptions input').on("click", function()
	{
		//Set a variable (used in controlPowerups function in main js file)
		slowtype = $(this).attr('id');
		
		//Whenever they select a spawn type, give a new score/time at which to spawn.
		if (slowtype === "scorebased")
		{
			slowSpawn = score + Math.round(Math.random()*30+10); //Spawn anywhere between 10 and 40 score
			console.log("Set to " + slowSpawn + " score") //Diagnostic, just making sure that it works as intended.
			newSettings.slowscore = true;
			newSettings.slowtime= false;
		}
		else if (slowtype === "timebased")
		{
			slowSpawn = timer + Math.round(Math.random()*60*30+10); //Spawn between 10 and 40 seconds
			console.log("Set to " + (slowSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
			newSettings.slowscore = false;
			newSettings.slowtime= true;
		}
	});	
	
	
//Ship appearance -- When a player clicks on a radio button (within #shipchoices), change the sourceX depending on what the button ID was.
	$('#shipchoices input').on("click", function(){
		newSettings.model = $(this).attr('id');
		switch ($(this).attr('id'))
		{
			case "grey":
				cannon.sourceX = 0;
				break;
			case "teal":
				cannon.sourceX = 544;
				break;
			case "red":
				cannon.sourceX = 512;
				break;
			default:
				console.log("Error?");
				break;
		}
	});
//Ship firing types -- When the player has clicked on one of the choices for how the ship fires, change "model" depending on which it was -- Actual behavior decided by model is done in MissileEntity.js
	$('#missilechoices input').on("click", function(){
	newSettings.missiles = $(this).attr('id');
	switch($(this).attr('id'))
	{
		case "straight":
			cannon.model = 0;
			break;
		case "seeker":
			cannon.model = 1;
			break;
		case "spread":
			cannon.model = 2;
			break;
	}});
	
//Ship damage -- When the player moves the slider for missile damage, change the text box next to it (Actual damage is set in MissileEntity.js, in the constructor.
	$('#missileDamage').on("input", function(){
		$('#missileDamagenum').val(this.value);
		newSettings.damage = $(this).val();
	});
	
//Grant lives as requested -
	$('#extraLives').on("change", function() {
		lives = newSettings.lives = $('#extraLives').val();	
	});

//Alien bounty
	$('#alienbounty').on("change", function() 
	{
		newSettings.alienbounty = this.value;	
	});

//Alter alien health - Change the text box on the slider change. Actual health values set in the AlienEntity.js constructor.
	$('#alienHealth').on("input", function(){
		$('#alienHealthnum').val(this.value);
		newSettings.alienhealth = this.value;
	});

//Aliens grow stronger at what intervals? - Change text box depending on slider. If slider = 0, text is "never".
	$('#alienGrowth').on("input", function(){
		newSettings.aliengrowth = this.value;
		if (this.value === "0")
		{
			$('#alienGrowthNum').val("Never");
		}
		else 
		{
			$('#alienGrowthNum').val("Every " + this.value + " points");
			alienGrowthRate = this.value;
		}
	});

//Mothership existence (None, one, multiple)
	$('#multiplemothers').hide(); //By default, hide the section relevant to multiple spawns
	$("input[name='mothers']").on("click", function(){
		newSettings.motherspawns = $(this).attr('id');
		switch($(this).attr('id'))
		{
			case "no":
				$('#mothersection').hide();
				break;
			case "one":
				$('#mothersection').show();
				$('#multiplemothers').hide();
				break;
			case "many":
				$('#mothersection').show();
				$('#multiplemothers').show();
				break;
		}			
	});
	
//Mothership bounty
$('#motherbounty').on("change", function() 
{
	newSettings.motherbounty = this.value;	
});
	
//Alter mothership health - Change the text box on the slider change. Actual health value set in makeMother function.
	$('#motherHealth').on("input", function(){
		$('#motherHealthnum').val(this.value);
		newSettings.motherhealth = this.value;
	});

//Change mothership spawn rates
	$('#motherRate').on("input", function(){
		$('#motherRateNum').val(this.value);
		newSettings.spawn = this.value;
	});
});






//Buttons to restart the game
$('.resetbuttons').on("click", function() {
	settingFile = defaultSettings;
	if ($(this).attr('id') === "restart")
	{
		console.log("hi");
		settingFile = newSettings;
	}

//Set all of the options.
//Winning conditions category	
	$('#score').prop('checked', settingFile.winscore);
	$('#scorenum').prop('disabled', !(settingFile.winscore));
	$('#scorenum').val(settingFile.winscoreNum);
	
	$('#time').prop('checked', settingFile.wintime);
	$('#timenum').prop('disabled', !(settingFile.wintime));
	$('#timenum').val(settingFile.wintimeNum);

	$('#ship').prop('checked', settingFile.winship);
	$('#shipnum').prop('disabled', !(settingFile.winship));
	$('#shipnum').val(settingFile.winshipNum);
	
//Powerups category
	//Repair
	$('#repairspawns').prop('checked', settingFile.repairspawns);
	$('#repairoptions #scorebased').prop('checked', settingFile.repairscore);
	$('#repairoptions #bosskill').prop('checked', settingFile.repairmother);
	
	//Bomb
	$('#bombspawns').prop('checked', settingFile.bombspawns);
	$('#bomboptions #scorebased').prop('checked', settingFile.bombscore);
	$('#bomboptions #timebased').prop('checked', settingFile.bombtime);
	
	//Scoreup
	$('#scoreupspawns').prop('checked', settingFile.scoreupspawns);
	$('#scoreupoptions #scorebased').prop('checked', settingFile.scoreupscore);
	$('#scoreupoptions #timebased').prop('checked', settingFile.scoreuptime);
	
	//Slow
	$('#slowspawns').prop('checked', settingFile.slowspawns);
	$('#slowoptions #scorebased').prop('checked', settingFile.slowscore);
	$('#slowoptions #timebased').prop('checked', settingFile.slowtime);
	
	/*Update powerup spawn values.
	Calculate a score at which to spawn the powerup, and a time. Multiply each one respectively by the boolean value for whether or not it will spawn that way (ie, the result will be 0 for the non-active one). 
	Otherwise, they will spawn at whatever score/time was last set -- which could've been quite a ways into the game already.
	*/
	repairSpawn = 	 (score + Math.round(Math.random()*30+10)*settingFile.repairscore);
	bombSpawn = 	((score + Math.round(Math.random()*40+6))*settingFile.bombscore)		+ (timer + Math.round(Math.random()*60*10+20))*settingFile.bombtime;
	scoreupSpawn = 	((score + Math.round(Math.random()*40+6))*settingFile.scoreupscore) 	+ (timer + Math.round(Math.random()*60*10+20))*settingFile.scoreuptime;
	slowSpawn = 	((score + Math.round(Math.random()*30+20))*settingFile.slowscore) 		+ (timer + Math.round(Math.random()*60*10+20))*settingFile.slowtime;

//Player's ship category
	$('#' + settingFile.model).click() //.model is a string. grey, teal, red. The aesthetic model for the player's ship.
	$('#' + settingFile.missiles).click() //.missiles is a string. straight, seeker, spread. The type of missiles that're fired.
	$('#missileDamage').val(settingFile.damage);
	$('#missileDamagenum').val(settingFile.damage);
	$('#extraLives').val(settingFile.lives);
	
//Alien category
	//Alien 
	$('#alienbounty').val(settingFile.alienbounty);
	$('#alienHealth').val(settingFile.alienhealth);
	$('#alienHealthnum').val(settingFile.alienhealth);
	$('#alienGrowth').val(settingFile.aliengrowth);
	$('#alienGrowthNum').val("Never");
	$('#alienGrowthNum').val(settingFile.aliengrowth ? "Every " + settingFile.aliengrowth + " points" : "Never"); //if aliengrowth is non-zero, then put "Every X score" in the box, else put "Never" in the box instead
	
	//Mothership 
	$('#' + settingFile.motherspawns).click(); //string. no, one, many. The checkbox for whether motherships spawn or not
	$('#motherbounty').val(settingFile.motherbounty);
	$('#motherHealth').val(settingFile.motherhealth);
	$('#motherHealthnum').val(settingFile.motherhealth);
	$('#motherRate').val(settingFile.spawn);
	$('#motherRateNum').val(settingFile.spawn);
	
	
//Get rid of any aliens or powerups on screen
	for (var i = 0; i < sprites.length; i++)
	{
		if (sprites[i] instanceof Alien || sprites[i] instanceof Powerup)
		{
			removeObject(sprites[i], sprites);
			i--;
		}	
	}
	
//Reset all the other variables
	alienTimer = 0; //The timer keeping track of when to spawn aliens
	alienFrequency = 100; //How often aliens spawn
	lives = $('#extraLives').val(); //Player's lives
	score = 0;	//Score
	timer = 0;	//Time
	motherShipCalled = false; //If a mothership has spawned yet
	mothershipsKilled = 0;	//How many motherships have spawned already
	scoreToMotherShip = 5;	//How long until the next mothership
	winConditions = 0;	//How many win conditions the player has met.
	gameState = PLAYING;	//Gamestate
	gameOverMessage.visible = false;	//Hide "Earth saved!"/"Earth destroyed!" message
});