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

    this.data = {};

    this.data.device = {};
    this.data.device.name = null;
    this.data.device.type = null;
    this.data.device.crashes = null;

    this.showStepClass = 'screen-2__step_visible';
    this.showDeviceNamesClass = 'screen-2__devices-names_visible';
    this.activeTypeClass = 'screen-2__device-type_selected';

    this.html = {};

    this.html.currentType = null;
    this.html.currentName = null;
    this.html.currentCrashes = [];

    this.html.types = document.querySelectorAll('[device-type-btn]');
    this.html.names = document.querySelectorAll('[device-name-btn]');
    this.html.crashes = document.querySelectorAll('[device-crash-btn]');

    this.html.calculateScreen = document.getElementById('calculate-cost');
    this.html.namesContainers = document.querySelectorAll('[device-type-id]');
    this.html.crashesContainers = document.querySelectorAll('[device-name-id]');

    for (var i = 0; i < this.html.types.length; i++) {
        var typeBlock = this.html.types[i];
        typeBlock.addEventListener('click', function(){
            self.onSelectType(this);
        })
    }

    for (var i = 0; i < this.html.names.length; i++) {
        var nameBlock = this.html.names[i];
        nameBlock.addEventListener('click', function(){
            var nameId = this.getAttribute('device-name-btn');
            self.onSelectName(nameId);
        })
    }

    for (var i = 0; i < this.html.crashes.length; i++) {
        var crashBlock = this.html.crashes[i];
        crashBlock.addEventListener('click', function(){
            var crashId = this.getAttribute('device-crash-btn');
            self.onSelectCrash(crashId);
        })
    }


}

UI.resetCurrentFromStep = function(step){
    var self = this;


    if(this.html.currentName){
        // this.html.currentName
        // unselect current name & hide names block
    }

    if (self.html.currentType) {
        self.html.currentType.classList.remove(self.activeTypeClass);
    }

    this.html.currentType = null;
}

UI.onSelectType = function(typeBlock){
    var self = this;

    self.resetCurrentFromStep(0);

    self.html.currentType = typeBlock;
    self.html.currentType.classList.add(self.activeTypeClass);

    self.data.device.type = typeBlock.getAttribute('device-type-btn');

    if (self.html.currentName) {

    }

}

UI.onSelectName = function(nameId){
    console.log('select name ' + nameId);
}

UI.onSelectCrash = function(crashId){
    console.log('select crash ' + crashId);
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
