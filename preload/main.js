require('./hover-status')
require('./context-menu')

console.log("preload main ...")

const { ipcRenderer } = require('electron')

global.kt = {
    params: [],
    clearReportParam : () => {
        kt.params = []
    },
    addReportParam : (key, value) => {
        kt.params[key] = value
    },
    print2: (str) => {
        console.log(kt.params)
        /*
        const spawn = require('child_process').spawn;
        let exec = spawn('gvim', [], {});
        exec.stdout.on('data', function(data){
            console.log('stdout: ' + data)
        });
        */
    },
    showReport : (type, ids, uid) => {
        console.log(type + ids + uid)
    }
}
