
var fs=require('fs');
var process=require('process');

const {remote} = require('electron');
const {app} = remote.require('electron');

const config_file = './config.json'
const prod_config_file = '../config.prod.json'
try {
  var fs = require('fs');
  var content = ""
  var config = {}

  if (fs.existsSync(prod_config_file)) {
    const json= require('./jsonfile');
    var file = new json.read(prod_config_file)
    config = file.data
    config.home_url = "http://" + config.server.url +"/"+ config.server.path
    config.printer_path = "release/mini2016.exe"
    console.log(config)
  }else{
    content = fs.readFileSync(config_file);
    config = JSON.parse(content);
  }

} catch (err) {
  console.log(err.message)
  app.quit()
  err.message = "cache err"+ ': ' + err.message;
  //throw err;
}

exports.config = config;
