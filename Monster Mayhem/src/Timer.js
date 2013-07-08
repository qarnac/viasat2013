var gameTimer =
{
  time: 0,
  interval: undefined,
  
  start: function()
  {
    var self = this;
		this.interval = setInterval(function(){self.tick();}, 1000);
  },
  
  tick: function()
  {
    this.time--;
  },
  
  //"stop" is really just a pause, it can be resumed with "start", does not reset anything.
  stop: function()
  {
    clearInterval(this.interval);
  },
  
  reset: function()
  {
    this.time = 0;
  }
  
};