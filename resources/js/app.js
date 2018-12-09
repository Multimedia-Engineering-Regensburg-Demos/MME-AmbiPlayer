/* eslint-env browser */
/* global AmbilightContainer */

var AmbiPlayer = AmbiPlayer || {};

AmbiPlayer.App = (function() {
  "use strict";

  var that = {},
    player,
    ambiPlayer;

  function init() {
    let videoEl = document.querySelector("#player");
    player = AmbiPlayer.VideoPlayer(videoEl).init();
    player.addEventListener("videoFrameChanged", onVideoFrameChanged);
    ambiPlayer = new AmbilightContainer(videoEl);
  }

  function onVideoFrameChanged(event) {
    ambiPlayer.update(event.data);
  }

  that.init = init;
  return that;
}());

AmbiPlayer.App.init();