#! /usr/bin/env node
console.log("console.log output 2");
var shell = require("shelljs");
var fs = require('fs');
let configFile = fs.readFileSync('package.json');
let config = JSON.parse(configFile);
let version = config.version;
console.log(version);

var xml2js = require('xml2js');
var builder = new xml2js.Builder();
var parser = new xml2js.Parser();
var filePath = __dirname + '/specifics/config.xml';
console.log(filePath);
fs.readFile(__dirname + '/specifics/config.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
      console.log(result.widget.$.version);
            result.widget.$.version = result.widget.$.version.replace("@@VERSION_NAME@@", version);
      console.log(result.widget.$.version);
            var xml = builder.buildObject(result);
            fs.writeFileSync('./cordova/config.xml', xml);
        });
});
