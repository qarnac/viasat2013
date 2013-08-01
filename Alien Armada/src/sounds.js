
var music = new Audio();
music.src = "../sounds/music.mp3";
music.load();

var shootSound = new Audio();
shootSound.src = "../sounds/shoot.mp3";
shootSound.load();

var explosionSound = new Audio();
explosionSound.src = "../sounds/explosion.mp3";
explosionSound.load();


//Option buttons
var muteMusic = document.querySelector("#muteMusic");  	 //Music button
var muteEffects= document.querySelector("#muteEffects"); //Effects button
var volAll = document.querySelector("#volAll");		//Slider
var currVol = document.querySelector("#currVol");   //Text output

muteMusic.addEventListener("click", controlSound, false);
muteEffects.addEventListener("click", controlSound, false);
volAll.addEventListener("input", controlSound, false);


//End option buttons


function controlSound(event) //Overarching volume control function
{
	
	//In the case of a key shortcut being pressed
	if (event === "muteMusic" || event === "muteEffects") { target = event; }
	else if (event === "PLUS" || event === "MINUS") { target = "keyAll"; }
	
	//Else, one of the buttons or the slider has changed
	else {	target = event.target.id; } 
	
	if (target === "muteMusic") //If they pressed the "(Un)Mute music" button, or the S key
	{
		music.muted = !music.muted; //Change the muted status
		if (music.muted) { muteMusic.innerHTML = "<span>Un</span>mute music"; } //Update button
		else 			 { muteMusic.innerHTML = "Mute music"; } //Update button
	}
	
	else if (target === "muteEffects") //If they pressed the "(Un)Mute effects" button, or the E key
	{
		explosionSound.muted = shootSound.muted = !shootSound.muted; //Change the muted status
		if (shootSound.muted) { muteEffects.innerHTML = "<span>Un</span>mute effects"; } //Update button
		else 				  { muteEffects.innerHTML = "Mute effects"; } //Update button
	}
	
	else if (target === "volAll") //If they changed the "Master" slider
	{
		var newvol = volAll.value/100; //Save the new volume on a 0-1 scale
		if (newvol <= 1) //Otherwise, change to this percentage
		{
			music.volume = newvol;
			shootSound.volume =	explosionSound.volume = (music.volume * newvol *.75).toFixed(2); //Shootsound and explosionSound multiplied by a constant to be a bit lower
			currVol.innerHTML = Math.round(newvol*100) + "%"; //Update text saying what the volume is presently at
		}
	}
	
	else if (target === "keyAll") //If they hit the + or - keys
	{
		if (event === "PLUS" && music.volume < .96) 
		{
			var newvol = .05;
		}
		else if (event === "MINUS" && music.volume > .04)
		{
			var newvol = -.05;
		}
	
		if ((music.volume + newvol <= 1) && (music.volume + newvol >= 0)) 
		{
			music.volume = newvol;
			shootSound.volume =	explosionSound.volume = (music.volume * newvol *.75).toFixed(2); //Shootsound and explosionSound multiplied by a constant to be a bit lower			
			currVol.innerHTML = Math.round(shootSound.volume*100) + "%"; //Update text saying what the volume is presently at
		}
	}
}