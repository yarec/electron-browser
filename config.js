
var fs=require('fs');
var process=require('process');

const {remote} = require('electron');
const {app} = remote.require('electron');

const config_file = './config.json'
const prod_config_file = '../config.prod.json'

function gen_home_url(cfg){
    return "http://" + cfg.server.ip + ":" + cfg.server.port+"/"+ cfg.server.path
}
try {
  var fs = require('fs');
  var content = fs.readFileSync(config_file);
  var config = JSON.parse(content);

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
  }else if(fs.existsSync(config.exec_map["config.dll"])){
    var content_xml = fs.readFileSync(config.exec_map["config.dll"], 'utf8');
    var matches = content_xml.match(/<server .* path="(.*)" url="(.*)".*>/)
    config.server.ip = matches[2]
    config.server.port = 80
    config.server.path = matches[1]
    //console.log(matches);
  }

  config.home_url_ori = config.home_url = gen_home_url(config)
  //config.home_url = "http://114.215.168.201/mini2015/t.html"
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

  //console.log(config.exec_map["config.dll"])

  var tpl = fs.readFileSync("config.dll.tpl", 'utf8');
  tpl = tpl.replace(/\$ip/g, ip)
  tpl = tpl.replace(/\$port/g, port)
  tpl = tpl.replace(/\$path/g, path)

  fs.writeFileSync(config.exec_map["config.dll"], tpl)
  //console.log(tpl)
};
exports.config = config;
