
//Load the 3 sound effects (Music, shooting, and explosions)
var music = new Audio();
music.src = "../sounds/music.mp3";
music.load();

var shootSound = new Audio();
shootSound.src = "../sounds/shoot.mp3";
shootSound.load();

var explosionSound = new Audio();
explosionSound.src = "../sounds/explosion.mp3";
explosionSound.load();

//toggleMusic/toggleEffects called both by the buttons (handled in Exploration.js) and keyboard shortcuts (S and E for Music and Effects, respectively)
function toggleMusic() {
	if (music.muted)//If it was muted, 
	{
		music.muted = false; //then unmute it
		muteMusic.innerHTML = "Mute music"; //And change the button text
	}	
	else //Otherwise, it wasn't muted
	{
		music.muted = true; //so mute it
		muteMusic.innerHTML = "<span>Un</span>mute music"; //And change the button text
	}
};

function toggleEffects(){
	if (shootSound.muted)
	{
		shootSound.muted = explosionSound.muted = false;
		muteEffects.innerHTML = "Mute effects";
	}	
	else
	{
		shootSound.muted = explosionSound.muted = true;
		muteEffects.innerHTML = "<span>Un</span>mute effects"; 
	}
}

//If the player hit + or - keyboard shortcuts
function changeSound(direction) {
	var newvol = .05; //Set newvol as a positive value by default
	if (direction === "down")//If they hit a - key
		{ newvol = -.05; } //change newvol to be a negative value
		
	//Ensure that the new volume won't go above 100% or below 0%
	if ((music.volume + newvol <= 1) && (music.volume + newvol >= 0))
	{
		music.volume = (music.volume + newvol).toFixed(2);	//Then set the new volume equal to current volume plus/minus 5%, depending on whether they pressed + or -
		shootSound.volume =	explosionSound.volume = (music.volume * .75).toFixed(2); //Shootsound and explosionSound multiplied by a constant to be a bit lower
		
		$('#volAll').val((music.volume * 100)); //Move the slider over
		currVol.innerHTML = (music.volume * 100) + "%"; //Change the text value for the slider
	}
};