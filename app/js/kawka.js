var Kawka = (function () {
  'use strict';

  var Kawka = function () {
    this.run();
  }

  Kawka.prototype = {
    URL: 'http://porannakawka.com/play/',

    song: {},
    shuffle: false,
    
    run: function () {
      this.last();
      this.getShuffle();
    },

    request: function (service) {
      var req = new XMLHttpRequest();
      req.open("POST", this.URL + service, false);
      
      var form = new FormData();
      form.append('tags[]', 0);
      req.send(form);

      if (req.status === 200) {
        this.song = JSON.parse(req.responseText)[0];
      } else {
        this.song = {};
      }
    },

    getSong: function() {
      return this.song;
    },
    
    getId: function () {
      return (this.song.hasOwnProperty('mid')) ? this.song.mid : 1;
    },

    getShuffle: function() {
      return (localStorage.getItem('shuffle')==="true");
    },

    last: function () {
      if(this.getShuffle()) this.rand();
      this.request('last');
    },

    next: function () {
      if(this.getShuffle()) this.rand();
      this.request('next/' + this.getId());
    },

    prev: function () {
      if(this.getShuffle()) this.rand();
      this.request('prev/' + this.getId());
    },

    rand: function () {
      this.request('rand/' + this.getId());
    }
  };

  return Kawka
})();