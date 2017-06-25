window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function scrollToY(scrollTargetY, speed, easing) {

    var scrollY = window.scrollY || document.documentElement.scrollTop,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            window.scrollTo(0, scrollTargetY);
        }
    }

    tick();
}

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
    this.data.device.showMap = false;
    this.data.device.address = null;

    this.showStepClass = 'screen-2__step_visible';
    this.showDeviceNamesClass = 'screen-2__devices-names_visible';
    this.showDeviceCrashesClass = 'screen-2__crashes-names_visible';

    this.showDeviceDescClass = 'screen-2__order-description_visible';
    this.showCrashesSelectedButtonClass = 'button_visible';

    this.showMapClass = 'screen-2__map-container_visible';
    this.rightOrderFormClass = 'screen-2__order-container_right';
    this.activeCheckboxClass = 'checkbox__checkbox_active';

    this.activeTypeClass = 'screen-2__device-type_selected';
    this.activeNameClass = 'screen-2__device-name_selected';
    this.activeCrashClass = 'screen-2__crash_selected';

    this.errorTextInputClass = 'text-input__input_error';

    this.html = {};

    this.html.currentType = null;
    this.html.currentName = null;
    this.html.currentCrashes = [];

    this.html.currentNamesContainer = null;
    this.html.currentCrashesContainer = null;

    this.html.crashesDesc = document.querySelectorAll('[select-param="device-crashes-desc"]')[0];
    this.html.buttonSelectedCrashes = document.querySelectorAll('[select-param="device-selected-crashes-button"]')[0];

    self.html.buttonOrder = document.getElementById('button_order');

    this.html.deviceCrashCost = document.querySelectorAll('[select-param="device-crash-cost"]')[0];
    this.html.deviceCrashTime = document.querySelectorAll('[select-param="device-crash-time"]')[0];

    this.html.clientName = document.getElementById('client-name');
    this.html.clientPhone = document.getElementById('client-phone');

    this.html.orderForm = document.querySelectorAll('[select-param="order-form-contacts"]')[0];
    this.html.mapContainer = document.getElementById('map');
    this.html.showMapCheckbox = document.querySelectorAll('[select-param="show-map-checkbox"]')[0];

    this.html.map = document.querySelectorAll('[select-param="order-form"]')[0];

    this.html.step1 = document.getElementById('calc-step-1');
    this.html.step2 = document.getElementById('calc-step-2');
    this.html.step3 = document.getElementById('calc-step-3');
    this.html.step4 = document.getElementById('screen-2__order');

    this.html.types = document.querySelectorAll('[device-type-btn]');
    this.html.names = document.querySelectorAll('[device-name-btn]');
    this.html.crashes = document.querySelectorAll('[device-crash-btn]');

    this.html.calculateScreen = document.getElementById('calculate-cost');
    this.html.namesContainers = document.querySelectorAll('[device-type-id]');
    this.html.crashesContainers = document.querySelectorAll('[device-name-id]');

    this.html.calculateCostBtn = document.getElementById('screen-1__calculate-cost');
    this.html.requestCallBtn = document.getElementById('screen-1__request-call');

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

    self.html.buttonSelectedCrashes.addEventListener('click', function(){
        self.onClickReady();
    })

    self.html.showMapCheckbox.addEventListener('click', function(){
        self.data.device.showMap = !self.data.device.showMap;
        self.updateMapVisibility();
        // Map.userGeolocation();
    })

    self.html.buttonOrder.addEventListener('click', function(){
        self.onOrder();
    })


    this.html.clientName.onkeypress = function(e){
        var re =  /[A-Za-zА-Яа-я]/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    }

    this.html.clientPhone.onkeypress = function(e){
        var re = /[\d]/;
        if(!re.test(e.key)){
            e.preventDefault();
        }
    }

    this.html.clientName.onfocus = function(){
        self.html.clientName.classList.remove(self.errorTextInputClass);
    }

    this.html.clientPhone.onfocus = function(){
        self.html.clientPhone.classList.remove(self.errorTextInputClass);
    }

    this.html.calculateCostBtn.addEventListener('click', function(){
        self.updateScrollPosition(self.html.step1);
    });

    this.html.requestCallBtn.addEventListener('click', function(){
        
    });
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
    self.html.map.classList.remove(self.showStepClass);
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

    self.updateScrollPosition(this.html.step2);
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

    self.updateScrollPosition(this.html.step3);
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
            '1': 'минуту',
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

    self.html.map.classList.remove(self.showStepClass);

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
            self.html.deviceCrashTime.innerHTML = hours + ' ' + getPrefixHours(hours);
        }else{
            self.html.deviceCrashTime.innerHTML = hours + ' ' + getPrefixHours(hours) + ' ' + minutes + ' ' + getPrefixMinutes(minutes);
        }
    }else{
        self.html.deviceCrashTime.innerHTML = totalTime + ' ' + getPrefixMinutes(totalTime);
    }

    self.html.deviceCrashCost.innerHTML = totalCost + ' ₽';
}

UI.onClickReady = function(){
    var self = this;
    self.html.map.classList.add(this.showStepClass);
    self.html.buttonSelectedCrashes.classList.remove(this.showCrashesSelectedButtonClass);
    if (Map.map) {
        self.updateMapVisibility();
        Map.userGeolocation();
    }
    self.updateScrollPosition(this.html.step4);
}

UI.updateMapVisibility = function(){
    var self = this;

    if (self.data.device.showMap) {
        self.html.orderForm.classList.add(self.rightOrderFormClass);
        self.html.mapContainer.classList.add(self.showMapClass);
        self.html.showMapCheckbox.classList.add(self.activeCheckboxClass);
    }else{
        self.html.orderForm.classList.remove(self.rightOrderFormClass);
        self.html.mapContainer.classList.remove(self.showMapClass);
        self.html.showMapCheckbox.classList.remove(self.activeCheckboxClass);
    }

    if (Map.map) {
        Map.map.container.fitToViewport();
    }
}

UI.onOrder = function(){

    var error = false;

    var clientName = this.html.clientName.value;
    var nameRe = /[A-Za-zА-Яа-я\ ]+/;
    if (!nameRe.test(clientName)) {
        error = true;
        this.html.clientName.classList.add(this.errorTextInputClass);
    }

    var clientPhone = this.html.clientPhone.value;
    var phoneRe = /[\d]+/;
    if (!phoneRe.test(clientPhone)) {
        error = true;
        this.html.clientPhone.classList.add(this.errorTextInputClass);
    }

    if (error) {
        return;
    }

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/order');
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.timeout = 10000;
    xhr.setRequestHeader("X-CSRFToken", document.getElementsByName('csrfmiddlewaretoken')[0].value);

    xhr.send(JSON.stringify({
        name: clientName,
        phone: clientPhone,
        coords: this.data.device.showMap ? Map.coords : null,
        crashes: this.data.device.crashes
    }));

    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      } else {
        alert(xhr.responseText);
      }
    }

    xhr.ontimeout = function(){
        alert('timeout');
    }
}

UI.updateScrollPosition = function(elem){

    function calculateScrollOffset(elem, additionalOffset, alignment) {
      var body = document.body,
          html = document.documentElement;

      var elemRect = elem.getBoundingClientRect();
      var clientHeight = html.clientHeight;
      var documentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                                     html.clientHeight, html.scrollHeight, html.offsetHeight );

      additionalOffset = additionalOffset || 0;

      var scrollPosition;
      if (alignment === 'bottom') {
        scrollPosition = elemRect.bottom - clientHeight;
      } else if (alignment === 'middle') {
        scrollPosition = elemRect.bottom - clientHeight / 2 - elemRect.height / 2;
      } else { // top and default
        scrollPosition = elemRect.top;
      }

      var maxScrollPosition = documentHeight - clientHeight;
      return Math.min(scrollPosition + additionalOffset + window.pageYOffset,
                      maxScrollPosition);
    }

    scrollToY(calculateScrollOffset(elem, 0, 'middle'), 1000, 'easeInOutSine');
}


// Map
var Map = {};

Map.saveCoords = function (){ 
    var self = Map;
    if (self.coords) {
        var newCoords = [self.coords[0].toFixed(6), self.coords[1].toFixed(6)];  
        self.userPlacemark.geometry.setCoordinates(newCoords);
    }
}

Map.init = function () {
    var self = Map;

    self.coords = null;

    self.INITIAL_COORDS = [55.76, 37.64];

    self.map = new ymaps.Map('map', {
        center: self.INITIAL_COORDS, // Москва
        zoom: 10,
        controls: ['zoomControl', 'searchControl', 'geolocationControl']
    }, {});


    self.searchControl = self.map.controls.get('searchControl');
    self.searchControl.options.set('float', 'left');
    self.searchControl.options.set('noPlacemark' , true);

    self.userPlacemark = new ymaps.Placemark([55.76, 37.64],{}, {
        iconLayout: 'default#image',
        iconImageHref: '/static/icons/placemark.svg',
        iconImageSize: [50, 50],
        iconImageOffset: [-25, -50],
        draggable: true 
    }); 

    self.map.geoObjects.add(self.userPlacemark);      

    //Отслеживаем событие перемещения метки
    self.userPlacemark.events.add("dragend", function (e) {            
        self.coords = this.geometry.getCoordinates();
        self.saveCoords();
    }, self.userPlacemark);

    //Отслеживаем событие щелчка по карте
    self.map.events.add('click', function (e) {        
        self.coords = e.get('coords');
        self.saveCoords();
    });

    self.searchControl.events.add("resultshow", function (e) {
        self.coords = self.searchControl.getResultsArray()[0].geometry.getCoordinates();
        self.saveCoords();
    });
 
    //Ослеживаем событие изменения области просмотра карты - масштаб и центр карты
    self.map.events.add('boundschange', function (event) {
        if (event.get('newZoom') != event.get('oldZoom')) {     
            self.saveCoords();
        }

        if (event.get('newCenter') != event.get('oldCenter')) {    
            self.saveCoords();
        }
    });
}

Map.userGeolocation = function() {
    var self = this;

    var geolocation = ymaps.geolocation;
        
    geolocation.get({
        provider: 'yandex',
        mapStateAutoApply: true
    }).then(function (result) {
        self.coords = result.geoObjects.position;
        self.saveCoords();
        self.map.setCenter(self.coords, 18);
    });

    geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        self.coords = result.geoObjects.position;
        self.saveCoords();
        self.map.setCenter(self.coords, 18);
    });
}


function ready() {
    Markup.init();
    UI.init();
    ymaps.ready(Map.init);
};

document.addEventListener("DOMContentLoaded", ready);






// https://yandex.ru/maps/?ll=37.685199%2C55.800577&z=12&ol=geo&mode=routes&rtext=55.788714%2C37.790972~55.821254%2C37.570959&rtt=auto


