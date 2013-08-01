$(document).ready(function(){
    $('#menu').accordion({heightStyle: "fill"}); //Do the accordion feature -- collapsing categories. "fill" means they fill the table size, no bigger and no smaller
	$('#unlock').hide(); //Hide the unlock button (shows when the "Restart with current settings" button is hidden)

	//If the player pressed on one of the sound control buttons, either mute or unmute it (controlled in sounds.js)
	$('#muteMusic').on("click", toggleMusic);
	$('#muteEffects').on("click", toggleEffects);

	//If player moved the master volume slider
	$('#volAll').on("input", function() {
		currVol.innerHTML = this.value + "%"; //Change the text to the side
		music.volume = parseInt(this.value, 10); //Set the music volume to the value
		shootSound.volume = explosionSound.volume = (music.volume *.75).toFixed(2); //Set the shooting and exploding sounds to be a bit quieter
	});
	
//Win conditions -- When someone has clicked on an input under the "How can the player win?" paragraph
	$('#winoptions input').on("change", function() {
		
		switch ($(this).attr('id')) //Switch based on which option was selected
		{
			case ("score"):
				$('#scorenum').prop("disabled", !$(this).is(':checked')); //Toggle the text field (to input what a winning score will be)
				newSettings.winscore = $('#score').prop('checked'); //Toggle the Settings object value
				break;

			case ("scorenum"):
				newSettings.winscoreNum =  parseInt(this.value, 10);
				break;
				
			case("time"):
				$('#timenum').prop("disabled", !$(this).is(':checked')); //Toggle the text field (to input what a winning time will be)
				newSettings.wintime = $('#time').prop('checked');
				break;
				
			case ("timenum"):
				newSettings.wintimeNum =  parseInt(this.value, 10);
				break;
				
			case("ship"):
				$('#shipnum').prop("disabled", !$(this).is(':checked')); //Toggle the text field (to input what a winning quantity of motherships will be)
				newSettings.winship = $('#ship').prop('checked');
				break;
			
			case ("shipnum"):
				newSettings.winshipNum =  parseInt(this.value, 10);
				break;
				
			case ("winconds"):
				newSettings.wincondsneeded =  parseInt(this.value, 10);
				break;
		
			default:
				break;
		}
		//Depending on how many win conditions are checked, adjust how big the maximum requirement can be -- ie, if only "Reach a high score" is checked, player shouldn't be allowed to require all 3 win conditions"
		$('#winconds').attr('max', $('#winoptions input:checkbox:checked').length);//Change the max always
		
		$('#winconds').attr('value', Math.min($('#winconds').attr('value'), $('#winconds').attr('max')));//Change current if it's greater than max
		$('#wincondsNum').val($('#winconds').val());		
		newSettings.wincondsneeded = $('#wincondsNum').val(); //Change the Settings value
	});
	
	//Separate from the others because "input" is more responsive than "click" for range sliders, but doesn't work for checkboxes
	$('#winconds').on("input", function() {
		$('#wincondsNum').val(parseInt(this.value, 10));	
		newSettings.wincondsneeded = $('#wincondsNum').val(); //Change the Settings value
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
		if (!$('#repairspawns').prop('checked'))
		{
			newSettings.repairspawns = "no";
		}
	});
	
	//When one of the repair options has been selected
	$('#repairoptions input').on("click", function()
	{
		//Set a variable (used in controlPowerups function in main js file)
		powerupOption.repairtype = $(this).attr('id');
		
		//Whenever they select a spawn type, give a new score/time at which to spawn.
		if (powerupOption.repairtype === "scorebased")
		{
			powerupOption.repairSpawn = gameConditions.score + Math.round(Math.random()*30+10); //Spawn anywhere between 10 and 40 score
			console.log("Set to " + powerupOption.repairSpawn + " score") //Diagnostic, just making sure that it works as intended.
			newSettings.repairspawns = "score";
		}
		else if (powerupOption.repairtype === "bosskill")
		{
			powerupOption.repairSpawn = gameConditions.timer + Math.round(Math.random()*60*30+10); //Spawn between 10 and 40 seconds
			console.log("Set to " + (powerupOption.repairSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
			newSettings.repairspawns = "boss";
		}
	});

// Bomb
	//Inner options
	$('#bomboptions').hide();
	//When the player clicks on the "Bomb" option, either show or hide the inner options.
	$('#bombspawns').on("click", function(){
		$('#bomboptions').toggle();
		if (!$('#bombspawns').prop('checked'))
		{
			newSettings.bombspawns = "no";
		}
	});
	//When one of the bomb options has been selected
	$('#bomboptions input').on("click", function()
	{
		//Set a variable (used in controlPowerups function in main js file)
		powerupOption.bombtype = $(this).attr('id'); 
		
		//Whenever they select a spawn type, give a new score/time at which to spawn.
		if (powerupOption.bombtype === "scorebased")
		{
			powerupOption.bombSpawn = gameConditions.score + Math.round(Math.random()*40); //Spawn anywhere between 0 and 40 score
			console.log("Set to " + powerupOption.bombSpawn + " score") //Diagnostic, just making sure that it works as intended.
			newSettings.bombspawns = "score";
		}
		else if (powerupOption.bombtype === "timebased")
		{
			powerupOption.bombSpawn = gameConditions.timer + Math.round(Math.random()*60*40); //Spawn anywhere between 0 and 40 seconds
			console.log("Set to " + (powerupOption.bombSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.

			newSettings.bombspawns = "time";
		}
	});

//Scoreup
	//Inner options
	$('#scoreupoptions').hide();
	//When the player clicks on the "scoreup" option, either show or hide the inner options.
	$('#scoreupspawns').on("click", function(){
		$('#scoreupoptions').toggle();
		if (!$('#scoreupspawns').prop('checked'))
		{
			newSettings.scoreupspawns = "no";
		}
	});
	//When one of the scoreup options has been selected
	$('#scoreupoptions input').on("click", function()
	{
		//Set a variable (used in controlPowerups function in main js file)
		powerupOption.scoreuptype = $(this).attr('id');
		
		//Whenever they select a spawn type, give a new score/time at which to spawn.
		if (powerupOption.scoreuptype === "scorebased")
		{
			powerupOption.scoreupSpawn = gameConditions.score + Math.round(Math.random()*30+10); //Spawn anywhere between 10 and 40 score
			console.log("Set to " + powerupOption.scoreupSpawn + " score") //Diagnostic, just making sure that it works as intended.
			newSettings.scoreupspawns = "score";
		}
		else if (powerupOption.scoreuptype === "timebased")
		{
			powerupOption.scoreupSpawn = gameConditions.timer + Math.round(Math.random()*60*30+10); //Spawn between 10 and 40 seconds
			console.log("Set to " + (powerupOption.scoreupSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
			newSettings.scoreupspawns = "time";
		}
	});	
	
//Slow
	//Inner options

	$('#slowoptions').hide();
	//When the player clicks on the "slow" option, either show or hide the inner options.
	$('#slowspawns').on("click", function(){
		$('#slowoptions').toggle();
		if (!$('#slowspawns').prop('checked'))
		{
			newSettings.slowspawns = "no";
		}
	});
	//When one of the slow options has been selected
	$('#slowoptions input').on("click", function()
	{
		//Set a variable (used in controlPowerups function in main js file)
		powerupOption.slowtype = $(this).attr('id');
		
		//Whenever they select a spawn type, give a new score/time at which to spawn.
		if (powerupOption.slowtype === "scorebased")
		{
			powerupOption.slowSpawn = gameConditions.score + Math.round(Math.random()*30+10); //Spawn anywhere between 10 and 40 score
			console.log("Set to " + powerupOption.slowSpawn + " score") //Diagnostic, just making sure that it works as intended.
			newSettings.slowspawns = "score";
		}
		else if (powerupOption.slowtype === "timebased")
		{
			powerupOption.slowSpawn = gameConditions.timer + Math.round(Math.random()*60*30+10); //Spawn between 10 and 40 seconds
			console.log("Set to " + (powerupOption.slowSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
			newSettings.slowspawns = "time";
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
				break;
		}
	});
//Ship firing types -- When the player has clicked on one of the choices for how the ship fires, change "model" depending on which it was -- Actual behavior decided by model is done in MissileEntity.js
	$('#missilechoices input').on("click", function(){
	newSettings.firingType = $(this).attr('id');
	switch($(this).attr('id'))
	{
		case "straight":
			cannon.firingType = 0;
			break;
		case "seeker":
			cannon.firingType= 1;
			break;
		case "spread":
			cannon.firingType = 2;
			break;
	}});
	
//Ship damage -- When the player moves the slider for missile damage, change the text box next to it (Actual damage is set in MissileEntity.js, in the constructor.
	$('#missileDamage').on("input", function(){
		$('#missileDamagenum').val(parseInt(this.value, 10));
		newSettings.damage = parseInt(this.value, 10);
	});
	
//Grant lives as requested -
	$('#extraLives').on("change", function() {
		gameConditions.lives = newSettings.lives = $('#extraLives').val();	
	});

//Alien bounty
	$('#alienbounty').on("change", function() 
	{
		newSettings.alienbounty = parseInt(this.value, 10);	
	});

//Alter alien health - Change the text box on the slider change. Actual health values set in the AlienEntity.js constructor.
	$('#alienHealth').on("input", function(){
		$('#alienHealthnum').val(parseInt(this.value, 10));
		newSettings.alienhealth = parseInt(this.value, 10);
		
	});

//Aliens grow stronger at what intervals? - Change text box depending on slider. If slider = 0, text is "never".
	$('#alienGrowth').on("input", function(){
		newSettings.aliengrowth = parseInt($(this).val(), 10);
		$('#alienGrowthNum').val(newSettings.aliengrowth? "Every " + newSettings.aliengrowth + " points" : "Never");
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
	newSettings.motherbounty = parseInt(this.value, 10);	
});
	
//Alter mothership health - Change the text box on the slider change. Actual health value set in makeMother function.
	$('#motherHealth').on("input", function(){
		$('#motherHealthnum').val(parseInt(this.value, 10));
		newSettings.motherhealth = parseInt(this.value, 10);
	});

//Change mothership spawn rates
	$('#motherRate').on("input", function(){
		$('#motherRateNum').val(parseInt(this.value, 10));
		newSettings.spawn =  parseInt(this.value, 10);
	});
});






//Buttons to restart the game
$('.resetbuttons').on("click", function() {
	//Figure out which setting file to pick from. By default, use the defaultsettings. Unless the player chose to restart with their custom settings
	settingFile = defaultSettings;
	if ($(this).attr('id') === "restart")
	{
		settingFile = newSettings;
	}

//Reset thevariables
	alienOption.timer = 0; //The timer keeping track of when to spawn aliens
	alienOption.frequency = 100; //How often aliens spawn
	gameConditions.lives = settingFile.lives; //Player's lives
	gameConditions.score = 0;	//Score
	gameConditions.timer = 0;	//Time
	mothershipOption.called = false; //If a mothership has spawned yet
	gameConditions.ships = 0;	//How many motherships have spawned already
	mothershipOption.scoreToMother = 5;	//How long until the next mothership
	gameConditions.winConditions = 0;	//How many win conditions the player has met.
	gameState = PLAYING;	//Gamestate
	gameOverMessage.visible = false;	//Hide "Earth saved!"/"Earth destroyed!" message
	
	
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
	switch(settingFile.repairspawns)
	{
		case("no"):
			$('#repairspawns').prop('checked', false);
			$('#repairoptions #scorebased').prop('checked', false);
			$('#repairoptions #bosskill').prop('checked', false);
			break;
		case ("score"):
			$('#repairspawns').prop('checked', true);
			$('#repairoptions #scorebased').prop('checked', true);
			$('#repairoptions #bosskill').prop('checked', false);
			break;
		case("boss"):
			$('#repairspawns').prop('checked', true);
			$('#repairoptions #scorebased').prop('checked', false);
			$('#repairoptions #bosskill').prop('checked', true);
			break;
	}
	switch(settingFile.bombspawns)
	{
		case("no"):
			$('#bombspawns').prop('checked', false);
			$('#bomboptions #scorebased').prop('checked', false);
			$('#bomboptions #bosskill').prop('checked', false);
			break;
		case ("score"):
			$('#bombspawns').prop('checked', true);
			$('#bomboptions #scorebased').prop('checked', true);
			$('#bomboptions #bosskill').prop('checked', false);
			break;
		case("boss"):
			$('#bombspawns').prop('checked', true);
			$('#bomboptions #scorebased').prop('checked', false);
			$('#bomboptions #bosskill').prop('checked', true);
			break;
	}
	switch(settingFile.scoreupspawns)
	{
		case("no"):
			$('#scoreupspawns').prop('checked', false);
			$('#scoreupoptions #scorebased').prop('checked', false);
			$('#scoreupoptions #bosskill').prop('checked', false);
			break;
		case ("score"):
			$('#scoreupspawns').prop('checked', true);
			$('#scoreupoptions #scorebased').prop('checked', true);
			$('#scoreupoptions #bosskill').prop('checked', false);
			break;
		case("boss"):
			$('#scoreupspawns').prop('checked', true);
			$('#scoreupoptions #scorebased').prop('checked', false);
			$('#scoreupoptions #bosskill').prop('checked', true);
			break;
	}
	switch(settingFile.slowspawns)
	{
		case("no"):
			$('#slowspawns').prop('checked', false);
			$('#slowoptions #scorebased').prop('checked', false);
			$('#slowoptions #bosskill').prop('checked', false);
			break;
		case ("score"):
			$('#slowspawns').prop('checked', true);
			$('#slowoptions #scorebased').prop('checked', true);
			$('#slowoptions #bosskill').prop('checked', false);
			break;
		case("boss"):
			$('#slowspawns').prop('checked', true);
			$('#slowoptions #scorebased').prop('checked', false);
			$('#slowoptions #bosskill').prop('checked', true);
			break;
	}
	
	
	/*Update powerup spawn values.
	Calculate a score at which to spawn the powerup, and a time. Multiply each one respectively by the boolean value for whether or not it will spawn that way (ie, the result will be 0 for the non-active one). 
	Otherwise, they will spawn at whatever score/time was last set -- which could've been quite a ways into the game already.
	*/
	powerupOption.repairSpawn = 	 (gameConditions.score + Math.round(Math.random()*30+10)* (settingFile.repairspawns === "score"));
	powerupOption.bombSpawn = 	((gameConditions.score + Math.round(Math.random()*40+6))* (settingFile.bombspawns === "score"))		+ (gameConditions.timer + Math.round(Math.random()*60*10+20))* (settingFile.bombspawns === "time");
	powerupOption.scoreupSpawn = 	((gameConditions.score + Math.round(Math.random()*40+6))* (settingFile.scoreupspawns === "score")) 	+ (gameConditions.timer + Math.round(Math.random()*60*10+20))*(settingFile.scoreupspawns === "time");
	powerupOption.slowSpawn = 	((gameConditions.score + Math.round(Math.random()*30+20))* (settingFile.slowspawns === "score")) 	+ (gameConditions.timer + Math.round(Math.random()*60*10+20))*(settingFile.slowspawns === "time");

//Player's ship category
	$('#' + settingFile.model).click() //.model is a string. grey, teal, red. The aesthetic model for the player's ship.
	$('#' + settingFile.firingType).click() //.firingType is a string. straight, seeker, spread. The type of missiles that're fired.
	$('#missileDamage').val(settingFile.damage);
	$('#missileDamagenum').val(settingFile.damage);
	$('#extraLives').val(settingFile.lives);
	
//Alien category
	//Alien 
	$('#alienOption.bounty').val(settingFile.alienbounty);
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
	
	
	if ($(this).attr('id') === "restart") //If they clicked the "Restart with current settings" button
	{
		$("input").attr("disabled", true);		//Lock all of the options
		$('#volAll').attr("disabled", false);	//Manually unlock the volume slider (because that should always be accessible)
		$(this).hide();				//Hide this button
		$('#unlock').show();			//Show the Unlock button instead
	}
	else //If the player chose the "Reset everything" button OR the "Unlock options" button
	{
		$("input").attr("disabled", false); //Unlock all of the options (that got locked because of the Restart button)
		$('#scorenum').prop('disabled', !(settingFile.winscore));	//Manually lock the 3 inputs that should probably be locked (input values for win conditions)
		$('#timenum').prop('disabled', !(settingFile.wintime));		//Manually lock the 3 inputs that should probably be locked (input values for win conditions)
		$('#shipnum').prop('disabled', !(settingFile.winship));		//Manually lock the 3 inputs that should probably be locked (input values for win conditions)

		$('#restart').show(); //Make sure the "Restart with current settings" button is shown
		$('#unlock').hide(); //and that the Unlock button is hidden (resetting will unlock everything anyway)
		
		newSettings = defaultSettings;
	}
	
});

$('#unlock').on("click", function() //If they click on the "Unlock the settings" button`
{
	$(this).hide(); //Hide this button
	$('#restart').show(); //Show the "Restrt with current settings" button
	$("input").attr("disabled", false); //Unlock all of the options (that got locked because of the Restart button)
	$('#scorenum').prop('disabled', !($('#score').prop('checked')));	//Manually lock the 3 inputs that should probably be locked (input values for win conditions)
	$('#timenum').prop('disabled', !($('#time').prop('checked')));		//Manually lock the 3 inputs that should probably be locked (input values for win conditions)
	$('#shipnum').prop('disabled', !($('#ship').prop('checked')));		//Manually lock the 3 inputs that should probably be locked (input values for win conditions)

});