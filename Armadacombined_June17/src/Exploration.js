$(document).ready(function(){
    $('#menu').accordion();
	//$('#lives').val(lives);
	
	
	$('#bomboptions').append("<dd>How would you like the bombs to spawn?</dd> <form> <dd><input type='radio' name='bombtype' id='scorebased'>Based on score<br>	<dd><input type='radio' name='bombtype' id='timebased' >Based on time<br> <dd><input type='radio' name='bombtype' id='random'>Randomly<br> </form>");
	$('#bomboptions').hide();
	//When the player clicks on the "Bomb" option, either show or hide the inner options.
	$('#bombspawns').on("click", function(){
		$('#bomboptions').toggle();
	});
	
	//When one of the bomb options has been selected
	$('#bomboptions input').on("click", function()
	{
		//Print which one it is (just to show that it works)
		console.log($(this).attr('id'));
	});
	
	$('#setlives').click(function(){
		lives = parseInt($('#lives').attr('value'), 10);
	});
	
	
});