require('./hover-status')
require('./context-menu')

const { ipcRenderer } = require('electron')
const { config } = require('../config');

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

        //mini2016.exe old appkey ids uid ids:1,2,3 uid:232
        //mini2016.exe new appkey dataUrl cburl tmpurl mgrurl
        const spawn = require('child_process').spawn;
        let exec = spawn(config.printer_path, reqdata, {});
        exec.stdout.on('data', function(data){
            console.log('stdout: ' + data)
        });

    },
    showReport : (type, ids, uid) => {
        console.log(type + ids + uid)
    }
}
