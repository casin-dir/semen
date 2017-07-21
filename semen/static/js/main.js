// masked_input_1.4-min.js
(function(a){a.MaskedInput=function(f){if(!f||!f.elm||!f.format){return null}if(!(this instanceof a.MaskedInput)){return new a.MaskedInput(f)}var o=this,d=f.elm,s=f.format,i=f.allowed||"0123456789",h=f.allowedfx||function(){return true},p=f.separator||"/:-",n=f.typeon||"_YMDhms",c=f.onbadkey||function(){},q=f.onfilled||function(){},w=f.badkeywait||0,A=f.hasOwnProperty("preserve")?!!f.preserve:true,l=true,y=false,t=s,j=(function(){if(window.addEventListener){return function(E,C,D,B){E.addEventListener(C,D,(B===undefined)?false:B)}}if(window.attachEvent){return function(D,B,C){D.attachEvent("on"+B,C)}}return function(D,B,C){D["on"+B]=C}}()),u=function(){for(var B=d.value.length-1;B>=0;B--){for(var D=0,C=n.length;D<C;D++){if(d.value[B]===n[D]){return false}}}return true},x=function(C){try{C.focus();if(C.selectionStart>=0){return C.selectionStart}if(document.selection){var B=document.selection.createRange();return -B.moveStart("character",-C.value.length)}return -1}catch(D){return -1}},b=function(C,E){try{if(C.selectionStart){C.focus();C.setSelectionRange(E,E)}else{if(C.createTextRange){var B=C.createTextRange();B.move("character",E);B.select()}}}catch(D){return false}return true},m=function(D){D=D||window.event;var C="",E=D.which,B=D.type;if(E===undefined||E===null){E=D.keyCode}if(E===undefined||E===null){return""}switch(E){case 8:C="bksp";break;case 46:C=(B==="keydown")?"del":".";break;case 16:C="shift";break;case 0:case 9:case 13:C="etc";break;case 37:case 38:case 39:case 40:C=(!D.shiftKey&&(D.charCode!==39&&D.charCode!==undefined))?"etc":String.fromCharCode(E);break;default:C=String.fromCharCode(E);break}return C},v=function(B,C){if(B.preventDefault){B.preventDefault()}B.returnValue=C||false},k=function(B){var D=x(d),F=d.value,E="",C=true;switch(C){case (i.indexOf(B)!==-1):D=D+1;if(D>s.length){return false}while(p.indexOf(F.charAt(D-1))!==-1&&D<=s.length){D=D+1}if(!h(B,D)){c(B);return false}E=F.substr(0,D-1)+B+F.substr(D);if(i.indexOf(F.charAt(D))===-1&&n.indexOf(F.charAt(D))===-1){D=D+1}break;case (B==="bksp"):D=D-1;if(D<0){return false}while(i.indexOf(F.charAt(D))===-1&&n.indexOf(F.charAt(D))===-1&&D>1){D=D-1}E=F.substr(0,D)+s.substr(D,1)+F.substr(D+1);break;case (B==="del"):if(D>=F.length){return false}while(p.indexOf(F.charAt(D))!==-1&&F.charAt(D)!==""){D=D+1}E=F.substr(0,D)+s.substr(D,1)+F.substr(D+1);D=D+1;break;case (B==="etc"):return true;default:return false}d.value="";d.value=E;b(d,D);return false},g=function(B){if(i.indexOf(B)===-1&&B!=="bksp"&&B!=="del"&&B!=="etc"){var C=x(d);y=true;c(B);setTimeout(function(){y=false;b(d,C)},w);return false}return true},z=function(C){if(!l){return true}C=C||event;if(y){v(C);return false}var B=m(C);if((C.metaKey||C.ctrlKey)&&(B==="X"||B==="V")){v(C);return false}if(C.metaKey||C.ctrlKey){return true}if(d.value===""){d.value=s;b(d,0)}if(B==="bksp"||B==="del"){k(B);v(C);return false}return true},e=function(C){if(!l){return true}C=C||event;if(y){v(C);return false}var B=m(C);if(B==="etc"||C.metaKey||C.ctrlKey||C.altKey){return true}if(B!=="bksp"&&B!=="del"&&B!=="shift"){if(!g(B)){v(C);return false}if(k(B)){if(u()){q()}v(C,true);return true}if(u()){q()}v(C);return false}return false},r=function(){if(!d.tagName||(d.tagName.toUpperCase()!=="INPUT"&&d.tagName.toUpperCase()!=="TEXTAREA")){return null}if(!A||d.value===""){d.value=s}j(d,"keydown",function(B){z(B)});j(d,"keypress",function(B){e(B)});j(d,"focus",function(){t=d.value});j(d,"blur",function(){if(d.value!==t&&d.onchange){d.onchange()}});return o};o.resetField=function(){d.value=s};o.setAllowed=function(B){i=B;o.resetField()};o.setFormat=function(B){s=B;o.resetField()};o.setSeparator=function(B){p=B;o.resetField()};o.setTypeon=function(B){n=B;o.resetField()};o.setEnabled=function(B){l=B};return r()}}(window));

function checkMobile() {
  var check = false;
  // eslint-disable-next-line
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function calculateScrollOffset(elem, additionalOffset, alignment) {
        var body = document.body,
            html = document.documentElement;

        var elemRect = elem.getBoundingClientRect();
        var clientHeight = html.clientHeight;
        var documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

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

Markup.fitFontSize = function () {
    var currentWidth = window.innerWidth;
    var currentHeight = window.innerHeight;
    var initScale = 20;
    var widthScale = currentWidth / 1440;
    var heightScale = currentHeight / 860;
    var currentScale = Math.min(widthScale, heightScale);
    var fontSize = currentScale * initScale;
    document.documentElement.style.fontSize = fontSize + 'px';
};

Markup.init = function () {
    this.fitFontSize();
    window.addEventListener('resize', this.fitFontSize);
};

//UI

var UI = {};

UI.init = function () {
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

    this.modalWindowOpenClass = 'modal-window_open';

    this.showDeviceDescClass = 'screen-2__order-description_visible';
    this.showCrashesSelectedButtonClass = 'button_visible_block';

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
        typeBlock.addEventListener('click', function () {
            self.onSelectType(this);
        })
    }

    for (var i = 0; i < this.html.names.length; i++) {
        var nameBlock = this.html.names[i];
        nameBlock.addEventListener('click', function () {
            self.onSelectName(this);
        })
    }

    for (var i = 0; i < this.html.crashes.length; i++) {
        var crashBlock = this.html.crashes[i];
        crashBlock.addEventListener('click', function () {
            self.onSelectCrash(this);
        })
    }

    self.html.buttonSelectedCrashes.addEventListener('click', function () {
        self.onClickReady();
    });

    self.html.showMapCheckbox.addEventListener('click', function () {
        self.data.device.showMap = !self.data.device.showMap;
        self.updateMapVisibility();
        // Map.userGeolocation();
    });

    self.html.buttonOrder.addEventListener('click', function () {
        self.onOrder();
    });


    this.html.clientName.onkeypress = function (e) {
        var re = /[A-Za-zА-Яа-я]/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };

    this.html.clientPhone.onkeypress = function (e) {
        var re = /[\d]/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };

    this.html.clientName.onfocus = function () {
        self.html.clientName.classList.remove(self.errorTextInputClass);
    };

    this.html.clientPhone.onfocus = function () {
        self.html.clientPhone.classList.remove(self.errorTextInputClass);
    };

    this.html.calculateCostBtn.addEventListener('click', function () {
        self.updateScrollPosition(self.html.step1);
    });

    this.html.requestCallBtn.addEventListener('click', function () {

    });

    // Up button
    var pointElement = document.getElementById('calc-step-1');
    var showButtonUpFrom = calculateScrollOffset(pointElement, 0, 'top');
    var buttonUpElem = document.getElementById('go-to-top-button');

    buttonUpElem.addEventListener('click', function(){
        scrollToY(calculateScrollOffset(pointElement, 0, 'middle'), 1000, 'easeInOutSine');
    });

    function updateBtnUpVisibility(){
        var scrollY = window.scrollY || document.documentElement.scrollTop;
        buttonUpElem.style.display = scrollY > showButtonUpFrom ? 'block' : 'none';
    }

    window.addEventListener('scroll', updateBtnUpVisibility);
    updateBtnUpVisibility();
};

UI.resetCurrentType = function () {
    var self = this;

    if (self.html.currentType) {
        self.html.currentType.classList.remove(self.activeTypeClass);
    }
    this.data.device.type = null;
    self.html.currentType = null;
};

UI.resetCurrentName = function (hideContainer) {
    var self = this;

    if (hideContainer) {
        self.html.step2.classList.remove(self.showStepClass);
    }

    if (self.html.currentNamesContainer && hideContainer) {
        self.html.currentNamesContainer.classList.remove(self.showDeviceNamesClass);
        self.html.currentNamesContainer = null;
    }

    if (self.html.currentName) {
        self.html.currentName.classList.remove(self.activeNameClass);
    }

    self.html.currentName = null;
    self.data.device.name = null;
};

UI.resetCurrentCrashes = function (hideContainer) {
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
};

UI.onSelectType = function (typeBlock) {
    var self = this;

    self.resetCurrentType();
    self.resetCurrentName(true);
    self.resetCurrentCrashes(true);

    self.html.currentType = typeBlock;
    self.html.currentType.classList.add(self.activeTypeClass);

    self.data.device.type = typeBlock.getAttribute('device-type-btn');

    for (var i = 0; i < self.html.namesContainers.length; i++) {
        var nameContainer = self.html.namesContainers[i];
        var deviceTypeId = nameContainer.getAttribute('device-type-id');

        if (deviceTypeId === self.data.device.type) {
            self.html.step2.classList.add(self.showStepClass);
            nameContainer.classList.add(self.showDeviceNamesClass);
            self.html.currentNamesContainer = nameContainer;
        }
    }

    self.updateScrollPosition(this.html.step2);
};

UI.onSelectName = function (nameBlock) {
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
};

UI.onSelectCrash = function (crashBlock) {
    var self = this;

    var crashId = crashBlock.getAttribute('device-crash-btn');
    var crashIndex = self.data.device.crashes.indexOf(crashId);

    if (crashIndex >= 0) {
        self.data.device.crashes.splice(crashIndex, 1);
    } else {
        self.data.device.crashes.push(crashId);
    }

    crashIndex = self.html.currentCrashes.indexOf(crashBlock);

    if (crashIndex >= 0) {
        var oldCrashBlock = self.html.currentCrashes.splice(crashIndex, 1)[0];
        oldCrashBlock.classList.remove(self.activeCrashClass);
    } else {
        crashBlock.classList.add(self.activeCrashClass);
        self.html.currentCrashes.push(crashBlock);
    }

    self.updateCrashesDesc();
};

UI.updateCrashesDesc = function () {

    function getPrefixMinutes(minutes) {
        var prefixes = {
            '1': 'минуту',
            '2': 'минуты',
            '3': 'минуты',
            '4': 'минуты',
        };

        if (minutes >= 10 & minutes <= 20) {
            return 'минут';
        }

        var remnant = (minutes % 10).toString();
        return prefixes[remnant] || 'минут';
    }

    function getPrefixHours(hours) {
        var prefixes = {
            '1': 'час',
            '2': 'часа',
            '3': 'часа',
            '4': 'часа',
        };

        if (hours >= 10 & hours <= 20) {
            return 'часов';
        }

        var remnant = (hours % 10).toString();
        return prefixes[remnant] || 'часов';
    }

    var self = this;

    self.html.map.classList.remove(self.showStepClass);

    if (self.html.currentCrashes.length === 0) {
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
        var minutes = totalTime - 60 * hours;

        if (minutes === 0) {
            self.html.deviceCrashTime.innerHTML = hours + ' ' + getPrefixHours(hours);
        } else {
            self.html.deviceCrashTime.innerHTML = hours + ' ' + getPrefixHours(hours) + ' ' + minutes + ' ' + getPrefixMinutes(minutes);
        }
    } else {
        self.html.deviceCrashTime.innerHTML = totalTime + ' ' + getPrefixMinutes(totalTime);
    }

    self.html.deviceCrashCost.innerHTML = totalCost + ' ₽';
};

UI.onClickReady = function () {
    var self = this;
    self.html.map.classList.add(this.showStepClass);
    self.html.buttonSelectedCrashes.classList.remove(this.showCrashesSelectedButtonClass);
    if (Map.map) {
        self.updateMapVisibility();
        Map.userGeolocation();
    }
    self.updateScrollPosition(this.html.step4);
};

UI.updateMapVisibility = function () {
    var self = this;

    if (self.data.device.showMap) {
        self.html.orderForm.classList.add(self.rightOrderFormClass);
        self.html.mapContainer.classList.add(self.showMapClass);
        self.html.showMapCheckbox.classList.add(self.activeCheckboxClass);
    } else {
        self.html.orderForm.classList.remove(self.rightOrderFormClass);
        self.html.mapContainer.classList.remove(self.showMapClass);
        self.html.showMapCheckbox.classList.remove(self.activeCheckboxClass);
    }

    if (Map.map) {
        Map.map.container.fitToViewport();
    }
};

UI.onOrder = function () {

    var self = this;

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

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            self.openModal("bad-modal");
        } else {
            self.openModal("thanks-modal");
        }
    };

    xhr.ontimeout = function () {
        self.openModal("bad-modal");
    }
};

UI.updateScrollPosition = function (elem) {


    scrollToY(calculateScrollOffset(elem, 0, 'middle'), 1000, 'easeInOutSine');
}

UI.openModal = function (modalID) {
    document.getElementById(modalID).classList.add(this.modalWindowOpenClass);
}

UI.closeModal = function (modalID) {
    document.getElementById(modalID).classList.remove(this.modalWindowOpenClass);
}


// Map
var Map = {};

Map.saveCoords = function () {
    var self = Map;
    if (self.coords) {
        var newCoords = [self.coords[0].toFixed(6), self.coords[1].toFixed(6)];
        self.userPlacemark.geometry.setCoordinates(newCoords);
    }
};

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
    self.searchControl.options.set('noPlacemark', true);

    self.userPlacemark = new ymaps.Placemark([55.76, 37.64], {}, {
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
};

Map.userGeolocation = function () {
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
};





function ready() {
    if (checkMobile()) {
        document.getElementsByTagName('html')[0].classList.add('mobile');
    }
    Markup.init();
    UI.init();
    ymaps.ready(Map.init);
    try {
        __PushNotifications.init();
    } catch (e){

    }
    MaskedInput({
        elm: document.getElementById('client-phone'),
        format: '+7 (___) ___-__-__',
        separator: '+7 ()-'
    });

    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/test.feedback?limit=' + 20 + '&offset=' + 43);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.timeout = 10000;
    xhr.setRequestHeader("X-CSRFToken", document.getElementsByName('csrfmiddlewaretoken')[0].value);

    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log('Error');
        } else {
            console.log(xhr);
        }
    };

    xhr.ontimeout = function () {
        console.log('Error');
    }


};

document.addEventListener("DOMContentLoaded", ready);


