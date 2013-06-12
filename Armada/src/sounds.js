
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
volAll.addEventListener("click", controlSound, false);


//End option buttons


function controlSound(event) //Overarching volume control function
{
	target = event.target.id;
	if (target === "muteMusic") //If they pressed the "(Un)Mute music" button
	{
		music.muted = !music.muted; //Change the muted status
		if (music.muted) { muteMusic.innerHTML = "Unmute music"; } //Update button
		else {muteMusic.innerHTML = "Mute music"; } //Update button
	}
	if (target === "muteEffects") //If they pressed the "(Un)Mute effects" button
	{
		explosionSound.muted = shootSound.muted = !shootSound.muted; //Change the muted status
		if (shootSound.muted) { muteEffects.innerHTML = "Unmute effects"; } //Update button
		else {muteEffects.innerHTML = "Mute effects"; } //Update button
	}
	if (target === "volAll") //If they changed the "Master" slider
	{
		var newvol = volAll.value/100; //Save the new volume on a 0-1 scale
		console.log ("Newvol: " + newvol);
		if (newvol === 0) //If it's 0, then they want everything muted
		{
			music.muted = shootSound.muted = explosionSound.muted = true; //Mute everything
			muteMusic.innerHTML = muteEffects.innerHTML = "Unmute music"; //Update buttons
		}
		else if (newvol <= 1) //Otherwise, change to this percentage
		{
			music.volume = newvol;
			shootSound.volume =	explosionSound.volume = newvol *.75; //Shootsound and explosionSound multiplied by a constant to be a bit lower
			console.log("Music vol: " + music.volume.toFixed(2) + "       Sound vol: " + shootSound.volume.toFixed(2));
			if (!shootSound.muted) {muteEffects.innerHTML = "Mute effects"; } //Update button
			if (!music.muted) {muteMusic.innerHTML = "Mute music"; } //Update button
			currVol.innerHTML = Math.round(newvol*100) + "%"; //Update text saying what the volume is presently at
		}
	}
}