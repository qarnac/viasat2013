$(document).ready(function(){
    $('#menu').accordion({heightStyle: "fill"}); //Do the accordion feature -- collapsing categories. "fill" means they fill the table size, no bigger and no smaller

//Win conditions -- When someone has clicked on an input under the "How can the player win?" paragraph
	$('#winoptions input').on("click", function() {
		
		
		
		switch ($(this).attr('id')) //Switch based on which option was selected
		{
			case ("score"):
				$('#scorenum').prop("disabled", !$(this).is(':checked')); //Toggle the text field (to input what a winning score will be)
				break;
				
			case("time"):
				$('#timenum').prop("disabled", !$(this).is(':checked')); //Toggle the text field (to input what a winning time will be)
				break;
				
			case("ship"):
				$('#shipnum').prop("disabled", !$(this).is(':checked')); //Toggle the text field (to input what a winning quantity of motherships will be)
				break;
				
			case ("set"):
				//When they click on the Apply button, set the win condition values to what are in the text fields. Need to parse to int, they are strings by default
				scoreNeededToWin = parseInt($('#scorenum').val(), 10);
				timeToWin = parseInt($('#timenum').val(), 10);
				shipsToWin = parseInt($('#shipnum').val(), 10);
				
				conditionsNeeded = $('#winconds').val();
				break;	

			default:
				break;
		}
		//Depending on how many win conditions are checked, adjust how big the maximum requirement can be -- ie, if only "Reach a high score" is checked, player shouldn't be allowed to require all 3 win conditions"
		$('#winconds').attr('max', $('#winoptions input:checkbox:checked').length);//Change the max always
		$('#winconds').attr('value', Math.min($('#winconds').attr('value'), $('#winconds').attr('max')));//Change current if it's greater than max
		$('#wincondsNum').val($('#winconds').val());		
	});
	//Separate from the others because "input" is more responsive than "click" for range sliders, but doesn't work for checkboxes
	$('#winconds').on("input", function() {
		$('#wincondsNum').val(this.value);	
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
		}
		else if (repairtype === "timebased")
		{
			repairSpawn = timer + Math.round(Math.random()*60*30+10); //Spawn between 10 and 40 seconds
			console.log("Set to " + (repairSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
		}
	});

// Bomb
	//Inner options
	$('#bomboptions').append("<dd><input type='radio' name='bombtype' id='scorebased' value='scorebased' >Spawn based on score<br>	<dd><input type='radio' name='bombtype' id='timebased' >Spawn based on time<br>");
	$('#bomboptions').hide();
	//When the player clicks on the "Bomb" option, either show or hide the inner options.
	$('#bombspawns').on("click", function(){
		$('#bomboptions').toggle();
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
		}
		else if (bombtype === "timebased")
		{
			bombSpawn = timer + Math.round(Math.random()*60*40); //Spawn anywhere between 0 and 40 seconds
			console.log("Set to " + (bombSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
		}
	});

//Scoreup
	//Inner options
	$('#scoreupoptions').append("<dd><input type='radio' name='scoreuptype' id='scorebased' value='scorebased'>Spawn based on score<br>	<dd><input type='radio' name='scoreuptype' id='timebased' >Spawn based on time<br>");
	$('#scoreupoptions').hide();
	//When the player clicks on the "scoreup" option, either show or hide the inner options.
	$('#scoreupspawns').on("click", function(){
		$('#scoreupoptions').toggle();
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
		}
		else if (scoreuptype === "timebased")
		{
			scoreupSpawn = timer + Math.round(Math.random()*60*30+10); //Spawn between 10 and 40 seconds
			console.log("Set to " + (scoreupSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
		}
	});	
	
//Slow
	//Inner options
	$('#slowoptions').append("<dd><input type='radio' name='slowtype' id='scorebased' value='scorebased'>Spawn based on score<br>	<dd><input type='radio' name='slowtype' id='timebased' >Spawn based on time<br>");
	$('#slowoptions').hide();
	//When the player clicks on the "slow" option, either show or hide the inner options.
	$('#slowspawns').on("click", function(){
		$('#slowoptions').toggle();
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
		}
		else if (slowtype === "timebased")
		{
			slowSpawn = timer + Math.round(Math.random()*60*30+10); //Spawn between 10 and 40 seconds
			console.log("Set to " + (slowSpawn/60).toFixed(0) + " seconds"); //Diagnostic, just making sure that it works as intended.
		}
	});	
	
	
//Ship appearance -- When a player clicks on a radio button (within #shipchoices), change the sourceX depending on what the button ID was.
	$('#shipchoices input').on("click", function(){
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
		$('#missileDam').val(this.value);
	});
	
//Grant lives as requested -
	$('#extraLives').val(lives); //Set the text value to the amount of lives by default
	$('#setlives').on("click", function(){ //When the "Apply" button is clicked, then set lives equal to the amount in the text field.
		lives = $('#extraLives').val();
	});


//Alter alien health - Change the text box on the slider change. Actual health values set in the AlienEntity.js constructor.
	$('#alienHealth').on("input", function(){
		$('#alienHP').val(this.value);
	});

//Aliens grow stronger at what intervals? - Change text box depending on slider. If slider = 0, text is "never".
	$('#alienGrowth').on("input", function(){
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
	
//Alter mothership health - Change the text box on the slider change. Actual health value set in makeMother function.
	$('#motherHealth').on("input", function(){
		$('#motherHP').val(this.value);
	});
/*//Mothership score value
	$('#motherbounty').on("input", function(){
	
	});
*/

//Change mothership spawn rates
	$('#motherRate').on("input", function(){
		$('#motherRateNum').val(this.value);
		
	});
});