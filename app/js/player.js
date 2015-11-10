'use strict';
var Player = (function() {

  var Player = function() {
    this.run();    
  };

  Player.prototype = {
    player: null,    
    shuffle: false,
    apiIsReady: false,
    
    run: function() {
      var self = this;
      var checkPlayer = setInterval(function() {
          if (self.apiIsReady === true) {
              self.init();
              clearInterval(checkPlayer);
          }
      }, 250);
    },
    
    init: function() {
      var self = this;
      this.player = new YT.Player('player', {
        events: {
          'onReady': function() {
             self.onReady();
           },
           'onError': function() {
             self.onError();
           },
           'onStateChange': function(event) {
             self.onStateChange(event);
           }
        }
      });

    },
    
    onStateChange: function(event){
      if(event.data === YT.PlayerState.ENDED) {          
          _events.trigger('prev');
      }
    },
    
    onReady: function(){
      var self = this;
      _events.eventHandler.addEventListener('song', function(event){
        self.onSongChange();
      });
    },
    
    onError: function(){
      _events.trigger('prev');
    },
    
    onSongChange: function() {
      var song = _kawka.getSong();
      this.load(song.vid);
      this.play();
    },
    
    getStatus: function() {
      return {
        play: this.isPlayed ? true : false,
        shuffle: _kawka.getShuffle() || false,
        mute: this.player.isMuted() || false
      }
    },
    
    isPlayed: function() {
      return (this.player.getPlayerState() === YT.PlayerState.PLAYING);
    },
    
    load: function(url) {
     this.player.loadVideoById({
        videoId: url
      });
    },                 

    togglePlay: function() {
      return (this.isPlayed()) ? this.pause() : this.play();
    },
                      
    play: function() {
      this.player.playVideo();
    },

    pause: function() {
      this.player.pauseVideo();
    },
    
    toggleMute: function() {
      (this.player.isMuted()) ? this.unmute() : this.mute();
    },
    
    mute: function() {
      this.player.mute();
    },
    
    unmute: function() {
      this.player.unMute();
    }
    
  };
  return Player;
})();