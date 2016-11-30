
const {version} = require('./package');
const {config, saveConfig} = require('./config');
const {remote} = require('electron');

var el_ip = document.getElementById("ip");
var el_path = document.getElementById("path");
var el_webport = document.getElementById("webport");
var el_dataport = document.getElementById("dataport");
var el_adv = document.getElementById("adv");

el_ip.value = config.server.ip;
el_webport.value = config.server.port;
el_path.value = config.server.path;

console.log(config)

function save_config(){
  saveConfig(el_ip.value, el_webport.value, el_path.value)

  remote.getCurrentWindow().close()
}

function toogle_adv(){
  console.log(el_adv.style.display)
  if(el_adv.style.display=='block'){
    remote.getCurrentWindow().setSize(500, 350)
    el_adv.style.display = "none"
  }else{
    remote.getCurrentWindow().setSize(500, 480)
    el_adv.style.display = "block"
  }
}
