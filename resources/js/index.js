/* eslint-env browser */

import VideoPlayer from "./utils/VideoPlayer.js";

var player;

function init() {
    let videoEl = document.querySelector("#player");
    player = new VideoPlayer(videoEl);
}

init();