
var fs=require('fs');
var process=require('process');

const {remote} = require('electron');
const {app} = remote.require('electron');

try {
  var content = fs.readFileSync('./config1.json');
  var config = JSON.parse(internalModule.stripBOM(content));
} catch (err) {
  alert(err.message)
  app.quit()
  err.message = "cache err"+ ': ' + err.message;
  //throw err;
}

exports.config = config;
