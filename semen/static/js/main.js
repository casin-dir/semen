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
    this.data.device.cost = 0;
    this.data.device.time = 0;

    this.showStepClass = 'screen-2__step_visible';
    this.showDeviceNamesClass = 'screen-2__devices-names_visible';
    this.showDeviceCrashesClass = 'screen-2__crashes-names_visible';

    this.showDeviceDescClass = 'screen-2__order-description_visible';
    this.showCrashesSelectedButtonClass = 'button_visible';

    this.activeTypeClass = 'screen-2__device-type_selected';
    this.activeNameClass = 'screen-2__device-name_selected';
    this.activeCrashClass = 'screen-2__crash_selected';

    this.html = {};

    this.html.currentType = null;
    this.html.currentName = null;
    this.html.currentCrashes = [];

    this.html.currentNamesContainer = null;
    this.html.currentCrashesContainer = null;

    this.html.crashesDesc = document.querySelectorAll('[select-param="device-crashes-desc"]')[0];
    this.html.buttonSelectedCrashes = document.querySelectorAll('[select-param="device-selected-crashes-button"]')[0];

    this.html.deviceCrashCost = document.querySelectorAll('[select-param="device-crash-cost"]')[0];
    this.html.deviceCrashTime = document.querySelectorAll('[select-param="device-crash-time"]')[0];

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
    self.data.device.crashes = [];
    self.updateCrashesDesc();
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

    var crashId = crashBlock.getAttribute('device-crash-btn');
    var crashIndex = self.data.device.crashes.indexOf(crashId);

    if (crashIndex >= 0) {
        self.data.device.crashes.splice(crashIndex, 1);
    }else{
        self.data.device.crashes.push(crashId);
    }

    crashIndex = self.html.currentCrashes.indexOf(crashBlock);

    if (crashIndex >= 0) {
        var oldCrashBlock = self.html.currentCrashes.splice(crashIndex, 1)[0];
        oldCrashBlock.classList.remove(self.activeCrashClass);
    }else{
        crashBlock.classList.add(self.activeCrashClass);
        self.html.currentCrashes.push(crashBlock);
    }

    self.updateCrashesDesc();
}

UI.updateCrashesDesc = function(){

    function getPrefixMinutes(minutes){
        var prefixes = {
            '1': 'минута',
            '2': 'минуты',
            '3': 'минуты',
            '4': 'минуты',
        }

        if (minutes >= 10 & minutes <= 20) {
            return 'минут';
        }

        var remnant = (minutes % 10).toString();
        return prefixes[remnant] || 'минут';
    }

    function getPrefixHours(hours){
        var prefixes = {
            '1': 'час',
            '2': 'часа',
            '3': 'часа',
            '4': 'часа',
        }

        if (hours >= 10 & hours <= 20) {
            return 'часов';
        }

        var remnant = (hours % 10).toString();
        return prefixes[remnant] || 'часов';
    }

    var self = this;

    if (self.html.currentCrashes.length === 0){
        self.html.crashesDesc.classList.remove(self.showDeviceDescClass);
        self.html.buttonSelectedCrashes.classList.remove(self.showCrashesSelectedButtonClass);
        return;
    }

    var totalTime = 0;
    var totalCost = 0;

    for (var i = 0; i < self.html.currentCrashes.length; i++) {
        var crash = self.html.currentCrashes[i];
        var crashTime = parseInt(crash.getAttribute('crash-time'));
        var crashCost = parseInt(crash.getAttribute('crash-cost'));
        totalTime += crashTime;
        totalCost += crashCost;
    }

    self.html.crashesDesc.classList.add(self.showDeviceDescClass);
    self.html.buttonSelectedCrashes.classList.add(self.showCrashesSelectedButtonClass);

    var hours = Math.floor(totalTime / 60);

    if (hours > 0) {
        var minutes = totalTime - 60*hours;

        if (minutes === 0) {
            this.html.deviceCrashTime.innerHTML = hours + ' ' + getPrefixHours(hours);
        }else{
            this.html.deviceCrashTime.innerHTML = hours + ' ' + getPrefixHours(hours) + ' ' + minutes + ' ' + getPrefixMinutes(minutes);
        }
    }else{
        this.html.deviceCrashTime.innerHTML = totalTime + ' ' + getPrefixMinutes(totalTime);
    }

    this.html.deviceCrashCost.innerHTML = totalCost + ' ₽';
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
