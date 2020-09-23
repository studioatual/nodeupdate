const {app, BrowserWindow} = require('electron')
const path = require('path')

function startApp() {
  console.log('ok')
  setTimeout(() => startApp(), 2000);
}

app.whenReady().then(() => {
  startApp()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) startApp()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})