  'use strict';

  var Events = (function() {
    
    var Events = function(events) {
      this.events = events || {};
      this.run();
    };
    
    Events.prototype = {
  
      eventHandler: document.createElement('p'),
  
      events: null,
  
      run: function() {
        this.bindEvents();
      },
  
      bindEvents: function() {
        for (var event in this.events) {
          if (this.events.hasOwnProperty(event)) {
            this.eventHandler.addEventListener(event, this.events[event]);
          }
        }
      },
  
      trigger: function(event, options) {
        this.eventHandler.dispatchEvent(new CustomEvent(event, {
          'detail': options
        }));
      }
  
    };
  
    return Events;
  
  })();