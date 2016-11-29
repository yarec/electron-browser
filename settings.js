
const {version} = require('./package');
const {config} = require('./config');

var el_url = document.getElementById("ip");
el_url.value = config.home_url;

console.log(config)

function save_config(){
  var ip = el_url.value;
  console.log(ip)
}
