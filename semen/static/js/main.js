// markup
var Markup = {};

Markup.fitFontSize = function() {
    var currentWidth = window.innerWidth;
    var currentHeight = window.innerHeight;
    var initScale = 20;
    var widthScale = currentWidth / 1440;
    var heightScale = currentHeight / 860;
    var currentScale = Math.min(widthScale, heightScale);
    var fontSize = currentScale * initScale;
    document.documentElement.style.fontSize = fontSize + 'px';
}

Markup.init = function() {
  this.fitFontSize();
  window.addEventListener('resize', this.fitFontSize);
}

//UI

var UI = {};

UI.init = function(){
    var self = this;

    this.showStepClass = 'screen-2__step_visible';
    this.showDeviceNamesClass = 'screen-2__devices-names_visible';

    this.html = {};
    this.html.calculateScreen = document.getElementById('calculate-cost');

    this.data = {};

    this.data.device = {};
    this.data.device.name = null;
    this.data.device.type = null;
    this.data.device.crashes = null;

    this.html.types = document.querySelectorAll('[device-type-btn]');
    for (var i = 0; i < this.html.types.length; i++) {
        var typeBlock = this.html.types[i];
        typeBlock.addEventListener('click', function(){
            var typeId = this.getAttribute('device-type-btn');
            self.onSelectType(typeId);
        })
    }


}

UI.onSelectType = function(typeId){
    
}


function ready() {
    Markup.init();
    UI.init();
};

document.addEventListener("DOMContentLoaded", ready);












/////////////
function sendTestData(){
    var clientName = document.getElementById('test-name').value;
    var clientPhone = document.getElementById('test-phone').value;
    var clientAddress = document.getElementById('test-addres').value;
    var clientCrashes = document.getElementById('test-crashes').value.split(' ');
    var csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;


    console.log(clientName);
    console.log(clientPhone);
    console.log(clientAddress);
    console.log(clientCrashes);

    var xhr = new XMLHttpRequest();

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/order');
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.timeout = 10000;
    xhr.setRequestHeader("X-CSRFToken", csrfToken);

    xhr.send(JSON.stringify({
        name: clientName,
        phone: clientPhone,
        address: clientAddress,
        crashes: clientCrashes
    }));

    xhr.onreadystatechange = function() { // (3)
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      } else {
        alert(xhr.responseText);
      }
    }

    xhr.ontimeout = function(){
        alert('timeout')
    }
}

document.getElementById('test-send').addEventListener('click', function(){
    sendTestData();
});
