'use strict';
var fs = require('fs');

exports.log = function log(msg){
  var logfile = "app.log"
  fs.appendFile(logfile, msg + "\n", function(err) {
    if(err) {
      return console.log(err);
    }
  });
}
