
const {app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const AutoUpdater = require('./auto-updater');
const {handleSquirrelEvent }= require('./squirrel');
const { log } = require('./log');

if (handleSquirrelEvent()) {
   return;
}

var mainWindow = null
var settingsWindow = null

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (shouldQuit) {
  app.quit()
}

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

function init(){
    mainWindow = new BrowserWindow({ width: 1030, height: 920, frame: false})

    mainWindow.loadURL('file://' + __dirname + '/browser.html');
    mainWindow.maximize()
    mainWindow.on('closed', function() {
      mainWindow = null
      app.quit()
    })
}

function initSetting(){
  if(settingsWindow!=null){
    return;
  }
  settingsWindow = new BrowserWindow( {
    width:      500,
    heght:      180,
    autoHideMenuBar: true,
    resizable:  true,
    'skip-taskbar': true
  } );
  settingsWindow.setSize(500, 350)
  settingsWindow.loadURL( 'file://' + __dirname + '/settings.html' );
  settingsWindow.on( 'closed', function() {
    settingsWindow = null;
  } );
}

app.on('ready', function () {
  init()
  AutoUpdater(mainWindow);

  globalShortcut.register('F9', function () {
    mainWindow.webContents.send('global-shortcut', 0);
  });
  globalShortcut.register('F10', function () {
    initSetting()
  });
  globalShortcut.register('F11', function () {
    mainWindow.webContents.send('global-shortcut', 0);
  });
  globalShortcut.register('F12', function () {
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
