$(document).ready(function(){
    $('#menu').accordion();
	//$('#lives').val(lives);

//Repair
	//Inner options
	$('#repairoptions').append("<dd>How would you like the repairs to spawn?</dd> <form id='repairs'> <dd><input type='radio' name='repairtype' id='scorebased' value='scorebased'>Based on score<br>	<dd><input type='radio' name='repairtype' id='timebased' >Based on time<br> </form>");
	$('#repairoptions').hide();
	//When the player clicks on the "repair" option, either show or hide the inner options.
	$('#repairspawns').on("click", function(){
		$('#repairoptions').toggle();
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
	$('#bomboptions').append("<dd>How would you like the bombs to spawn?</dd> <form id='bombs'> <dd><input type='radio' name='bombtype' id='scorebased' value='scorebased' >Based on score<br>	<dd><input type='radio' name='bombtype' id='timebased' >Based on time<br> </form>");
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
	$('#scoreupoptions').append("<dd>How would you like the scoreups to spawn?</dd> <form id='scoreups'> <dd><input type='radio' name='scoreuptype' id='scorebased' value='scorebased'>Based on score<br>	<dd><input type='radio' name='scoreuptype' id='timebased' >Based on time<br> </form>");
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
	$('#slowoptions').append("<dd>How would you like the slows to spawn?</dd> <form id='slows'> <dd><input type='radio' name='slowtype' id='scorebased' value='scorebased'>Based on score<br>	<dd><input type='radio' name='slowtype' id='timebased' >Based on time<br> </form>");
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
	
	
//Ship appearance
	$('#shipchoices input').on("click", function(){
		//console.log($(this).attr('id'));
		switch ($(this).attr('id'))
		{
			case "grey":
				cannon.sourceX = 0;
				console.log("Grey!!");
				break;
			case "teal":
				cannon.sourceX = 544;
				console.log("Teal!!");
				break;
			case "red":
				cannon.sourceX = 512;
				console.log("Red!!");
				break;
			default:
				console.log("Error?");
				break;
		}
	});
	
	
});