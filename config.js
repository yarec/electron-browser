
var fs=require('fs');
var process=require('process');

const {remote} = require('electron');
const {app} = remote.require('electron');

const config_file = './config.json'
const old_config_file = '../config.dll'
const prod_config_file = '../config.prod.json'
try {
  var fs = require('fs');
  var content = fs.readFileSync(config_file);
  var config = JSON.parse(content);

  if (fs.existsSync(prod_config_file)) {
    const json= require('./jsonfile');
    var file = new json.read(prod_config_file)
    config_prod = file.data
    config.home_url = "http://" + config_prod.server.url +"/"+ config_prod.server.path
    //console.log(config)
  }else if(fs.existsSync(old_config_file)){
    var content_xml = fs.readFileSync(old_config_file, 'utf8');
    var matches = content_xml.match(/<server .* path="(.*)" url="(.*)".*>/)
    config.home_url = "http://" + matches[2] +"/"+ matches[1]
    //console.log(matches);
  }

} catch (err) {
  console.log(err.message)
  app.quit()
  err.message = "cache err"+ ': ' + err.message;
  //throw err;
}

exports.config = config;
