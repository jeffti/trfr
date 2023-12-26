"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const axios_1 = __importDefault(require("axios"));
const LED = new onoff_1.Gpio(4, 'out');
setTimeout(resetStatus, 0);
const blinkInterval = setInterval(checkStatus, 1000);
const instance = axios_1.default.create({
    baseURL: 'http://admin.cleean.com.br:8080/api/v1'
});
function checkStatus() {
    instance.get('/status/1', {
        timeout: 5000
    })
        .then(function (response) {
        if (response.status !== 200) {
            console.log('Invalid server status', response.status);
            return;
        }
        var payload = response.data;
        if (payload.activate) {
            LED.writeSync(0);
            console.log('Active server status');
            setTimeout(resetStatus, 500);
            console.log('Clearing server status');
            instance.put('/status/1', {
                timeout: 5000
            })
                .then(function (response) {
                console.log('Cleared server status', response.data);
            })
                .catch(function (reason) {
                console.log('Failure clearing server status', reason);
            });
        }
        else {
            console.log('Inactive server status');
        }
    })
        .catch(function (reason) {
        console.log('Failed requesting server status', reason);
    });
    console.log('Requesting server status');
}
function resetStatus() {
    LED.writeSync(1);
    console.log('Reset local status');
}
function endOperation() {
    clearInterval(blinkInterval);
    LED.writeSync(1);
    LED.unexport();
}
setTimeout(endOperation, 150000);
