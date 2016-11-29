
const {version} = require('./package');

console.log(version)

var el_url = document.getElementById("url");
el_url.value = version;
