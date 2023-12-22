"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 8080;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Your Raspberry Pi HTTP server is listening at http://localhost:".concat(port));
});
//# sourceMappingURL=startup.js.map