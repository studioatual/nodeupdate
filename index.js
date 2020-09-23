const {app, BrowserWindow} = require('electron')
const path = require('path')
const express = require('express')
const server = express()

server.get('/', (req, res) => {
  return res.send('ok')
})

function startApp() {
  server.listen(3333, () => console.log('Server is started http://localhost:3333'))
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