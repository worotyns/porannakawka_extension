'use strict';

var events = {
  'next': function(){
    _kawka.next();
    _events.trigger('song');
  },
  'prev': function() {
    _kawka.prev();
    _events.trigger('song');
  },
  'mute': function() {
    _player.toggleMute();
  },
  'shuffle': function() {
    var shuffle = localStorage.getItem("shuffle");
    if(shuffle === null){
      localStorage.setItem("shuffle", "true");
    }else{
      localStorage.setItem("shuffle", (shuffle==="true") ? "false" : "true" );
    }
  },
  'play': function() {
    _player.togglePlay();
  },
  'song': function(){
    
  },
  'api': function() {
    _player.apiIsReady = true;
  },
  'launch': function(){
    if(!_player.isPlayed()){
      _events.trigger('song');
    }
  },
};

var _player = new Player();
var _kawka = new Kawka();
var _events = new Events(events);

function onYouTubeIframeAPIReady() {
  _events.trigger('api');
}

chrome.browserAction.setPopup({popup: 'app/popup.html' });