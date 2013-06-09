

//Option buttons
var muteMusic = document.querySelector("#muteMusic");
var muteEffects= document.querySelector("#muteEffects");
var volAll = document.querySelector("#volAll");
var currVol = document.querySelector("#currVol");

muteMusic.addEventListener("click", function(event) {controlSound("music");}, false);
muteEffects.addEventListener("click", function(event) {controlSound("effects");}, false);
volAll.addEventListener("click", function(event) {controlSound("all");}, false);
//End option buttons

function controlSound(target) //Overarching volume control function
{
	if (target === "music") //If they pressed the "(Un)Mute music" button
	{
		music.muted = !music.muted; //Change the muted status
		if (music.muted) { muteMusic.innerHTML = "Unmute music"; } //Update button
		else {muteMusic.innerHTML = "Mute music"; } //Update button
	}
	if (target === "effects") //If they pressed the "(Un)Mute effects" button
	{
		explosionSound.muted = shootSound.muted = !shootSound.muted; //Change the muted status
		if (shootSound.muted) { muteEffects.innerHTML = "Unmute effects"; } //Update button
		else {muteEffects.innerHTML = "Mute effects"; } //Update button
	}
	if (target === "all") //If they changed the "Master" slider
	{
		var newvol = volAll.value/100; //Save the new volume on a 0-1 scale
		if (newvol === 0) //If it's 0, then they want everything muted
		{
			music.muted = shootSound.muted = explosionSound.muted = true; //Mute everything
			muteMusic.innerHTML = muteEffects.innerHTML = "unmute"; //Update buttons
		}
		else if (newvol <= 1) //Otherwise, change to this percentage
		{
			music.volume = newvol;
			shootSound.volume =	explosionSound.volume = newvol *.75; //Shootsound and explosionSound multiplied by a constant to be a bit lower
			if (!shootSound.muted) {muteEffects.innerHTML = "mute"; } //Update button
			if (!music.muted) {muteMusic.innerHTML = "mute"; } //Update button
			currVol.innerHTML = Math.round(newvol*100) + "%"; //Update text saying what the volume is presently at
		}
	}
}