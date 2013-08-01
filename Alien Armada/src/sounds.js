
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


//If the player pressed on one of the sound control buttons
$('#muteMusic').on("click", toggleMusic);
$('#muteEffects').on("click", toggleEffects);

//toggleMusic/toggleEffects called both by the buttons and keyboard shortcuts (S and E for Music and Effects, respectively)
function toggleMusic() {
	if (music.muted)//If it was muted, then unmute it
	{
		music.muted = false;
		muteMusic.innerHTML = "Mute music";
	}	
	else
	{
		music.muted = true;
		muteMusic.innerHTML = "<span>Un</span>mute music"; 
	}
};

function toggleEffects(){
	if (shootSound.muted)//If it was muted, then unmute it
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

//If player moved the master volume slider
$('#volAll').on("input", function() {
	console.log(this.value);
	currVol.innerHTML = this.value + "%"; //Change the text to the side
	music.volume = parseInt(this.value, 10); //Set the music volume to the value
	shootSound.volume = explosionSound.volume = (music.volume *.75).toFixed(2); //Set the shooting and exploding sounds to be a bit quieter
});

//If the player hit + or - keyboard shortcuts
function changeSound(direction) {
	var newvol;
	if (direction === "up") 
		{ newvol = .05; }
	else
		{ newvol = -.05; }
		
	//As long as the new volume won't go above 100% or below 0%
	if ((music.volume + newvol <= 1) && (music.volume + newvol >= 0))
	{
		music.volume = (music.volume + newvol).toFixed(2);	//Then set the new volume equal to current volume plus/minus 5%, depending on whether they pressed + or -
		shootSound.volume =	explosionSound.volume = (music.volume * .75).toFixed(2); //Shootsound and explosionSound multiplied by a constant to be a bit lower
		
		$('#volAll').val((music.volume * 100)); //Move the slider over
		currVol.innerHTML = (music.volume * 100) + "%"; //Change the text value for the slider
	}
};