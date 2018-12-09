/* eslint-env browser */

var AmbiPlayer = AmbiPlayer || {};

AmbiPlayer.App = (function() {
  "use strict";

  var that = {},
    player;

  function init() {
    let videoEl = document.querySelector("#player");
    player = AmbiPlayer.VideoPlayer(videoEl).init();
  }

  that.init = init;
  return that;
}());

AmbiPlayer.App.init();