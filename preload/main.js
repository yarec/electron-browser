require('./hover-status')
require('./context-menu')

const { ipcRenderer } = require('electron')
const { config } = require('../config');
const { log } = require('../log');

global.kt = {
    params: [],
    clearReportParam : () => {
        kt.params = []
    },
    addReportParam : (key, value) => {
        kt.params[key] = value
    },
    print2: (dataUrl, cburl, tmpurl, appkey, mgrurl) => {
        var reqdata = ['new', appkey, dataUrl, cburl, tmpurl, mgrurl]
        for(p in kt.params){
          var arg = p+':'+ kt.params[p]
          reqdata.push(arg)
        }
        //log(reqdata.join(' '))

        //mini2016.exe old appkey ids uid ids:1,2,3 uid:232
        //mini2016.exe new appkey dataUrl cburl tmpurl mgrurl
        const spawn = require('child_process').spawn;
        let exec = spawn(config.exec_map["mini2016.exe"], reqdata, {});
        exec.stdout.on('data', function(data){
            console.log('stdout: ' + data)
        });

    },
    showReport : (type, ids, uid) => {
        console.log(type + ids + uid)
    },
    downloadFile : (url, type, o) =>{
      console.log(url)

      var http = require('http'),
      fs = require('fs'),
      path= require("path");

      var dlpath = 'download'
      if(!fs.existsSync(dlpath)){
        var creats = fs.mkdirSync(dlpath, 0777);
      }
      var fname = path.basename(url)
      console.log(fname)
      var request = http.get(url, function(response) {
        if (response.statusCode === 200) {
          var file = fs.createWriteStream(dlpath + "/"+fname);
          response.pipe(file);

          const spawn = require('child_process').spawn;
          var arg = '/select,download\\'+fname.replace(/"/g,"");
          console.log(arg)
          let exec = spawn('explorer', [arg], {});
          exec.stdout.on('data', function(data){
            console.log('stdout: ' + data)
          });

          return true
        }else{
          console.log("download error: " + response.statusCode )
        }
        // Add timeout.
        request.setTimeout(120000, function () {
          console.log("download timeout ...")
          request.abort();
        });
      });

      //return true
    },
    run : (cmd) => {
      /*
      path= require("path");
      var fname = path.basename(cmd)

      const spawn = require('child_process').spawn;
      var arg = '/select,download\\'+fname.replace(/"/g,"");
      console.log(arg)
      let exec = spawn('explorer', [arg], {});
      exec.stdout.on('data', function(data){
        console.log('stdout: ' + data)
      });
      */

      if(config.exec_map[cmd]){
        cmd = config.exec_map[cmd]
      }
      console.log("run: " + cmd)

      const spawn = require('child_process').spawn;
      let exec = spawn(cmd, [], {});
    },
    ConfigValue: 80,
    config: {},
    setConfig: (channel, name, value) => {
      console.log(channel, name, value)
      kt.config[channel+"."+name] = value

      var path = '../config.prod.json'
      const json= require('../jsonfile');
      var file = new json.File(path)

      for(p in kt.config){
        file.set(p, kt.config[p] )
      }
      file.writeSync()

    },
    appVersion: (appname) => {
      return 5;
    }

  }
