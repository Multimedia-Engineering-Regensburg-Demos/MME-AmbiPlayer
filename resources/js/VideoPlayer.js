/* eslint-env browser */

var AmbiPlayer = AmbiPlayer || {};

AmbiPlayer.VideoPlayer = function(videoEl) {
  "use strict";
  var that = new EventTarget(),
    playerEl,
    controls = {
      uploadEl: null,
      seekbarEl: null,
      playButton: null,
      stopButton: null,
      uploadButton: null,
      timeLabel: null,
    };

  function init() {
    initPlayer();
    initControls();
    initEvents();
    return that;
  }

  function initPlayer() {
    playerEl = videoEl.querySelector("video");
  }

  function initControls() {
    controls.uploadEl = videoEl.querySelector(".upload");
    controls.seekbarEl = videoEl.querySelector(".seekbar");
    controls.playButton = videoEl.querySelector(".button.play");
    controls.stopButton = videoEl.querySelector(".button.stop");
    controls.uploadButton = videoEl.querySelector(".button.file");
    controls.timeLabel = videoEl.querySelector(".label.time");
  }

  function initEvents() {
    controls.uploadEl.addEventListener("change", onVideoFileSelected);
    controls.seekbarEl.addEventListener("change", onSeekbarChanged);
    controls.playButton.addEventListener("click", onPlayButtonClicked);
    controls.stopButton.addEventListener("click", onStopButtonClicked);
    controls.uploadButton.addEventListener("click", onFileButtonClicked);
    playerEl.addEventListener("timeupdate", onVideoTimeChanged);
    playerEl.addEventListener("ended", onVideoEnded);
  }

  function setFile(file) {
    let fileURL = URL.createObjectURL(file);
    playerEl.src = fileURL;
  }

  function syncVideoTime() {
    let seekbarPositon = controls.seekbarEl.value / parseInt(controls.seekbarEl
        .max),
      selectedPosition = playerEl.duration * seekbarPositon;
    if (selectedPosition) {
      playerEl.currentTime = selectedPosition;
    }
  }

  function syncSeekbar() {
    let seekbarMax = parseInt(controls.seekbarEl.max),
      value = (seekbarMax / playerEl.duration) * playerEl.currentTime;
    controls.seekbarEl.value = value;
  }

  function syncTimeLabel() {
    let currentTime = playerEl.currentTime,
      minutes = parseInt(currentTime / 60),
      seconds = parseInt(currentTime % 60);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    controls.timeLabel.innerHTML = minutes + ":" + seconds;
  }

  function play() {
    playerEl.play();
    controls.playButton.classList.remove("paused");
  }

  function pause() {
    playerEl.pause();
    controls.playButton.classList.add("paused");
  }

  function stop() {
    pause();
    playerEl.currentTime = 0;
  }

  function onVideoFileSelected() {
    let file = controls.uploadEl.files[0];
    if (file && file.type === "video/mp4") {
      setFile(file);
      stop();
    }
  }

  function onSeekbarChanged() {
    syncVideoTime();
    syncTimeLabel();
  }

  function onVideoTimeChanged() {
    let event = new Event("videoFrameChanged");
    event.data = playerEl;
    that.dispatchEvent(event); 
    syncSeekbar();
    syncTimeLabel();
  }

  function onVideoEnded() {
    stop();
  }

  function onPlayButtonClicked() {
    if (playerEl.paused === true) {
      play();
    } else {
      pause();
    }
  }

  function onStopButtonClicked() {
    stop();
  }

  function onFileButtonClicked() {
    controls.uploadEl.click();
  }

  that.init = init;
  return that;
};