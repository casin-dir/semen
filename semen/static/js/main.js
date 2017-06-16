// markup
function fitFontSize() {
    var currentWidth = window.innerWidth;
    var currentHeight = window.innerHeight;
    var initScale = 20;
    var widthScale = currentWidth / 1440;
    var heightScale = currentHeight / 860;
    var currentScale = Math.min(widthScale, heightScale);
    var fontSize = currentScale * initScale;
    document.documentElement.style.fontSize = fontSize + 'px';
}

function initMarkup() {
  fitFontSize();
  window.addEventListener('resize', fitFontSize);
}

function ready() {
    initMarkup();
};

document.addEventListener("DOMContentLoaded", ready);