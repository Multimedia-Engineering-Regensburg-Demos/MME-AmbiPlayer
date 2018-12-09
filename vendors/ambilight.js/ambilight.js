/* eslint-env browser */

(function(context) {
  "use strict";

  const BOX_SHADOW_DEFAULT_COLOR = "rgb(255,255,255)",
    BOX_SHADOW_STRING = "0px 0px 70px 35px {{COLOR}}",
    IMAGE_DATA_VECTOR_LENGTH = 4;

  var shadowCanvas,
  shadowContext;

  function AmbilightContainer(el) {
    this.el = el;
    initContainer.call(this);
    setColor.call(this, BOX_SHADOW_DEFAULT_COLOR);
  }

  function getColorFromVideo(video) {
    let color = {
        r: 0,
        g: 0,
        b: 0,
      },
      pixels;
    shadowCanvas.width = video.videoWidth;
    shadowCanvas.height = video.videoHeight;
    shadowContext.drawImage(video, 0, 0);
    pixels = shadowContext.getImageData(0, 0,  shadowCanvas.width,shadowCanvas.height).data;
    for (let i = 0; i < pixels.length; i += IMAGE_DATA_VECTOR_LENGTH) {
      color.r += pixels[i];
      color.g += pixels[i + 1];
      color.b += pixels[i + 2];
    }

    color.r = parseInt(color.r / (pixels.length / IMAGE_DATA_VECTOR_LENGTH));
    color.g = parseInt(color.g / (pixels.length / IMAGE_DATA_VECTOR_LENGTH));
    color.b = parseInt(color.b / (pixels.length / IMAGE_DATA_VECTOR_LENGTH));
    return "rgb(" + color.r + "," + color.g + "," + color.b + ")";
  }

  AmbilightContainer.prototype.update = function(source) {
    let color;
    if (typeof source === "string") {
      color = source;
    }
    if (source instanceof HTMLVideoElement) {
      color = getColorFromVideo(source);
    }
    setColor.call(this, color);
  };

  function initContainer() {
    this.el.classList.add("ambilight-container");
  }

  function setColor(color) {
    this.el.style["box-shadow"] = BOX_SHADOW_STRING.replace("{{COLOR}}",
      color);
    this.el.style["border-color"] = color;
  }

  function createShadowCanvas() {
    shadowCanvas = document.createElement("canvas");
    shadowContext = shadowCanvas.getContext("2d");
    shadowCanvas.style["display"] = "none";
    document.body.appendChild(shadowCanvas);
  }

  context.AmbilightContainer = AmbilightContainer;
  createShadowCanvas();
}(window));