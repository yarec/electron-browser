
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

  config.home_url_ori = config.home_url = "http://" + config.server.ip + ":" + config.server.port+"/"+ config.server.path
  //var exec_map_keys = Object.keys(config.exec_map)
  for(var key in config.exec_map){
    config.exec_map[key] = config.libdir + "/" + key
  }

  if (fs.existsSync(prod_config_file)) {
    const json= require('./jsonfile');
    var file = new json.read(prod_config_file)
    config_prod = file.data
    config.server.ip = config_prod.server.ip
    config.server.port = config_prod.server.port
    config.server.path = config_prod.server.path
    config.home_url = "http://" + config_prod.server.ip + ":"+ config_prod.server.port +"/"+ config_prod.server.path
  }else if(fs.existsSync(old_config_file)){
    var content_xml = fs.readFileSync(old_config_file, 'utf8');
    var matches = content_xml.match(/<server .* path="(.*)" url="(.*)".*>/)
    config.home_url = "http://" + matches[2] +"/"+ matches[1]
    //console.log(matches);
  }

  console.log(config)

} catch (err) {
  console.log(err.message)
  app.quit()
  err.message = "cache err"+ ': ' + err.message;
  //throw err;
}

exports.saveConfig = function(ip, port, path){

  var matches = ip.match(/.*?([\da-zA-Z]+\.[\da-zA-Z]+\.[\da-zA-Z]+\.[\da-zA-Z]+).*/)
  ip = matches[1]

  console.log(ip + port + path)
  var cfg_path = '../config.prod.json'
  const json= require('./jsonfile');
  var file = new json.File(cfg_path)

  file.set("server.ip", ip)
  file.set("server.port", port)
  file.set("server.path", path)
  file.writeSync()

  console.log(config.exec_map["config.dll"])

  var tpl = fs.readFileSync("config.dll.tpl", 'utf8');
  tpl = tpl.replace(/\$ip/g, ip)
  tpl = tpl.replace(/\$port/g, port)
  tpl = tpl.replace(/\$path/g, path)

  fs.writeFileSync(config.exec_map["config.dll"], tpl)
  //console.log(tpl)
};
exports.config = config;
