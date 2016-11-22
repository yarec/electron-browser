var path = require('path');
var cp = require('child_process');

const {app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const AutoUpdater = require('./auto-updater');


var handleSquirrelEvent = function() {
   if (process.platform != 'win32') {
      return false;
   }

   function executeSquirrelCommand(args, done) {
      var updateDotExe = path.resolve(path.dirname(process.execPath),
         '..', 'update.exe');
      var child = cp.spawn(updateDotExe, args, { detached: true });
      child.on('close', function(code) {
         done();
      });
   };

   function install(done) {
      var target = path.basename(process.execPath);
      executeSquirrelCommand(["--createShortcut", target], done);
   };

   function uninstall(done) {
      var target = path.basename(process.execPath);
      executeSquirrelCommand(["--removeShortcut", target], done);
   };

   var squirrelEvent = process.argv[1];
   switch (squirrelEvent) {
      case '--squirrel-install':
         install(app.quit);
         return true;
      case '--squirrel-updated':
         install(app.quit);
         return true;
      case '--squirrel-obsolete':
         app.quit();
         return true;
      case '--squirrel-uninstall':
         uninstall(app.quit);
         return true;
   }

   return false;
};

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
    mainWindow = new BrowserWindow({ width: 1030, height: 920, frame: false })

    mainWindow.loadURL('file://' + __dirname + '/browser.html');
    //mainWindow.maximize()
    mainWindow.on('closed', function() {
      mainWindow = null
      app.quit()
    })
}
app.on('ready', function () {

    init()

    AutoUpdater(mainWindow);


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
