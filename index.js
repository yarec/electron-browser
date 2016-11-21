
const {app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 1030, height: 920, frame: false })

  // mainWindow.loadURL('file://' + require('path').join(__dirname, 'browser.html'))
  mainWindow.loadURL('file://' + __dirname + '/browser.html');
  mainWindow.maximize()
  mainWindow.on('closed', function() {
    mainWindow = null
  })

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
