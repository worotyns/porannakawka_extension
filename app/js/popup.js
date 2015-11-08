var App = (function(){
  'use strict';
    
  var App = function(){
    this.run();
  }
    
  App.prototype = {
    
    backgroundApp: chrome.extension.getBackgroundPage(),
    document: document,
    
    run: function() {
      this.bindEvents();
      this.bindListeners();
      this.backgroundApp._events.trigger('launch');
    },

    bindEvents: function() {
      var self = this;
      var elements = document.getElementsByClassName('player');
      for (var i = elements.length - 1; i >= 0; i--) {
        elements[i].addEventListener('click', function(){
          self.onClick(this);
        });
      };
    },
    
    bindListeners: function() {
      var self = this;
      
      this.backgroundApp._events.eventHandler.addEventListener('song', function(event){
        self.onSongChange();
      });
      
      this.backgroundApp._events.eventHandler.addEventListener('launch', function(event){
        self.onLaunch();
      });
    },
    
    onLaunch: function() {
      var status = this.backgroundApp._player.getStatus();
      document.getElementById('play').classList.toggle("green", status.play);
      document.getElementById('shuffle').classList.toggle("green", status.shuffle);
      document.getElementById('mute').classList.toggle("green", status.mute);
      this.setTitle();
    },
    
    setTitle: function() {
      document.getElementsByClassName('title')[0].innerHTML = this.backgroundApp._kawka.getSong().title;
    },
    
    onSongChange: function() {
      this.setTitle();
    },
    
    onClick: function(el) {
       if(!el.classList.contains('no-toggle')) el.classList.toggle("green");
       this.backgroundApp._events.trigger(el.dataset.command, {el: el});
    }
  };
     
  return App
})();

new App();