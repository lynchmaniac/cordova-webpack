#! /usr/bin/env node
console.log("console.log output");
var shell = require("shelljs");
shell.exec("cordova create cordova");
shell.cd('cordova');
shell.exec("cordova platform add android");
shell.cd('..');
shell.exec("npm run webpack");
shell.cd('cordova');
shell.exec("cordova prepare android");
shell.exec("cordova run android");
shell.cd('..');
