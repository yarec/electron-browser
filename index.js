
const {app, BrowserWindow} = require('electron');
//var BrowserWindow = require('browser-window')

var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 1330, height: 920, frame: false })
  // mainWindow.loadURL('file://' + require('path').join(__dirname, 'browser.html'))
  mainWindow.loadURL('file://' + __dirname + '/browser.html');
  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
