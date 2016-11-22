const {autoUpdater, ipcRenderer, ipcMain} = require('electron');
//const ms = require('ms');

const notify = require('./notify'); // eslint-disable-line no-unused-vars
const {version} = require('./package');
const isDev = require('./isdev');

// accepted values: `osx`, `win32`
// https://nuts.gitbook.com/update-windows.html
const platform = process.platform === 'darwin' ?
  'osx' :
  process.platform;
const FEED_URL = `http://114.215.168.201:5000/update/${platform}`;
let isInit = false;

function init() {
  autoUpdater.on('error', (err, msg) => {
    console.error('Error fetching updates', msg + ' (' + err.stack + ')');
  });

  autoUpdater.setFeedURL(`${FEED_URL}/${version}`);

  if(!isDev){
    setTimeout(() => {
      console.log("try update : " + new Date())
      autoUpdater.checkForUpdates();
    }, 10000);

    setInterval(() => {
      console.log("try update(i) : " + new Date())
      autoUpdater.checkForUpdates();
    }, 1800000);
  }else{
    autoUpdater.checkForUpdates();
    console.log("auto-updater in dev")
  }

  isInit = true;
}

module.exports = function (win) {
  if (!isInit) {
    init();
  }

  const {rpc} = win;

  const onupdate = (ev, releaseNotes, releaseName) => {
    console.log("on update")
    ipcMain.emit('update available', {releaseNotes, releaseName});
  };

  autoUpdater.on('update-downloaded', onupdate);

  ipcMain.once('quit and install', () => {
    autoUpdater.quitAndInstall();
  });

  win.on('close', () => {
    autoUpdater.removeListener('update-downloaded', onupdate);
  });
};
