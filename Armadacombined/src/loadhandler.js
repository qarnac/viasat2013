

function loadHandler()
{ 
 
  assetsLoaded++;
  if(assetsLoaded === assetsToLoad.length)
  {
    //Remove the load event listener from the image and sounds
    image.removeEventListener("load", loadHandler, false);
    music.removeEventListener("canplaythrough", loadHandler, false);
    shootSound.removeEventListener("canplaythrough", loadHandler, false);
    explosionSound.removeEventListener("canplaythrough", loadHandler, false);
    console.log(assetsLoaded + "/" + assetsToLoad.length + " assets loaded");
    //Play the music
    music.play();
	
	//Set default volumes
	music.volume = shootSound.volume = explosionSound.volume= .3;
    
    //Start the game 
    gameState = OPTIONSMENU;
  }
}