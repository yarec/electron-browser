
const {app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const AutoUpdater = require('./auto-updater');
const {handleSquirrelEvent }= require('./squirrel');
const { log } = require('./log');

if (handleSquirrelEvent()) {
   return;
}

var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

function init(){
  log('eeee')
    mainWindow = new BrowserWindow({ width: 1030, height: 920, frame: false })

    mainWindow.loadURL('file://' + __dirname + '/browser.html');
    mainWindow.maximize()
    mainWindow.on('closed', function() {
      mainWindow = null
      app.quit()
    })
}

app.on('ready', function () {
  init()
  AutoUpdater(mainWindow);

  globalShortcut.register('F9', function () {
    mainWindow.webContents.send('global-shortcut', 0);
  });
  globalShortcut.register('ctrl+shift+1', function () {
    mainWindow.webContents.send('global-shortcut', 0);
  });
  globalShortcut.register('ctrl+shift+2', function () {
    mainWindow.webContents.send('global-shortcut', 1);
  });

})

ipcMain.on('global-shortcut', function (arg) {
  //alert(arg)
  console.log(arg)
});
