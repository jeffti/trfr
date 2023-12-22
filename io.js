"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onoff_1 = require("onoff");
var LED = new onoff_1.Gpio(4, 'out');
var blinkInterval = setInterval(blinkLED, 1000);
var c = 0;
function blinkLED() {
    if (LED.readSync() === 0) {
        if (c < 5) {
            c++;
            return;
        }
        LED.writeSync(1);
        c = 0;
    }
    else {
        LED.writeSync(0);
    }
}
function endBlink() {
    clearInterval(blinkInterval);
    LED.writeSync(0);
    LED.unexport();
}
setTimeout(endBlink, 1500000);
//# sourceMappingURL=io.js.map