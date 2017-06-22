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
    this.data.device.crashes = [];

    this.showStepClass = 'screen-2__step_visible';
    this.showDeviceNamesClass = 'screen-2__devices-names_visible';
    this.showDeviceCrashesClass = 'screen-2__crashes-names_visible';

    this.activeTypeClass = 'screen-2__device-type_selected';
    this.activeNameClass = 'screen-2__device-name_selected';
    this.activeCrashClass = 'screen-2__crash_selected';

    this.html = {};

    this.html.currentType = null;
    this.html.currentName = null;
    this.html.currentCrashes = [];

    this.html.currentNamesContainer = null;
    this.html.currentCrashesContainer = null;

    this.html.step2 = document.getElementById('calc-step-2');
    this.html.step3 = document.getElementById('calc-step-3');

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
            self.onSelectName(this);
        })
    }

    for (var i = 0; i < this.html.crashes.length; i++) {
        var crashBlock = this.html.crashes[i];
        crashBlock.addEventListener('click', function(){
            self.onSelectCrash(this);
        })
    }


}

UI.resetCurrentType = function(){
    var self = this;

    if (self.html.currentType) {
        self.html.currentType.classList.remove(self.activeTypeClass);
    }
    this.data.device.type = null;
    self.html.currentType = null;
}

UI.resetCurrentName = function(hideContainer){
    var self = this;

    if (hideContainer) {
        self.html.step2.classList.remove(self.showStepClass);
    }

    if (self.html.currentNamesContainer && hideContainer) {
        self.html.currentNamesContainer.classList.remove(self.showDeviceNamesClass);
        self.html.currentNamesContainer = null;
    }

    if(self.html.currentName){
        self.html.currentName.classList.remove(self.activeNameClass);
    }

    self.html.currentName = null;
    self.data.device.name = null;
}

UI.resetCurrentCrashes = function(hideContainer){
    var self = this;

    if (hideContainer) {
        self.html.step3.classList.remove(self.showStepClass);
    }

    if (self.html.currentCrashesContainer && hideContainer) {
        self.html.currentCrashesContainer.classList.remove(self.showDeviceCrashesClass);
        self.html.currentCrashesContainer = null;
    }

    for (var i = 0; i < self.html.currentCrashes.length; i++) {
        var crashBlock = self.html.currentCrashes[i];
        crashBlock.classList.remove(self.activeCrashClass);
    }

    self.html.currentCrashes = [];
    this.data.device.crashes = [];
}

UI.onSelectType = function(typeBlock){
    var self = this;

    self.resetCurrentType();
    self.resetCurrentName(true);
    self.resetCurrentCrashes(true);

    self.html.currentType = typeBlock;
    self.html.currentType.classList.add(self.activeTypeClass);

    self.data.device.type = typeBlock.getAttribute('device-type-btn');

    for(var i = 0; i < self.html.namesContainers.length; i++){
        var nameContainer = self.html.namesContainers[i];
        var deviceTypeId = nameContainer.getAttribute('device-type-id');

        if (deviceTypeId === self.data.device.type) {
            self.html.step2.classList.add(self.showStepClass);
            nameContainer.classList.add(self.showDeviceNamesClass);
            self.html.currentNamesContainer = nameContainer;
        }
    }
}

UI.onSelectName = function(nameBlock){
    var self = this;

    self.resetCurrentName(false);
    self.resetCurrentCrashes(true);

    self.html.currentName = nameBlock;
    self.html.currentName.classList.add(self.activeNameClass);

    self.data.device.name = nameBlock.getAttribute('device-name-btn');

    for (var i = 0; i < this.html.crashesContainers.length; i++) {
        var crashContainer = this.html.crashesContainers[i];
        var deviceNameId = crashContainer.getAttribute('device-name-id');

        if (deviceNameId === self.data.device.name) {
            self.html.step3.classList.add(self.showStepClass);
            crashContainer.classList.add(self.showDeviceCrashesClass);
            self.html.currentCrashesContainer = crashContainer;
        }
    }
}

UI.onSelectCrash = function(crashBlock){
    var self = this;
    self.html.currentCrashes.push(crashBlock);

    crashBlock.classList.add(self.activeCrashClass);

    var crashId = crashBlock.getAttribute('device-crash-btn');

    self.data.device.crashes.push(crashId);
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
