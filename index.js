const {app, BrowserWindow, Menu, Tray, Notification, shell } = require('electron')
const log = require('electron-log');
const { autoUpdater } = require('electron-updater')
const path = require('path')
const express = require('express')

autoUpdater.autoDownload = false

const server = express()
let mainTray = {};

server.get('/', (req, res) => {
  return res.send('ok')
})

function callNotification() {
  const notify = new Notification({
    title: 'FBS Api Started!',
    body: `O endereço do servidor: \n http://localhost:3333`,
    icon: path.resolve(__dirname, 'assets', 'icon.png')
  })
  notify.show()
}

function startApp() {
  const contextMenu = Menu.buildFromTemplate([
    {
      type: 'normal',
      label: 'Abrir Endereço da Api',
      icon: path.resolve(__dirname, 'assets', 'share.png'),
      click: () => shell.openExternal('http://localhost:3333'),
      enabled: true
    },
    {
      type: 'normal',
      label: 'Fechar FBS Api',
      icon: path.resolve(__dirname, 'assets', 'power-off.png'),
      role: 'quit',
      enabled: true,
    }    
  ]);
  mainTray.setContextMenu(contextMenu);
  mainTray.setToolTip('FBS Api Software.')
  server.listen(3333, () => console.log('Server is started http://localhost:3333'))
  callNotification()
}

app.whenReady().then(() => {
  mainTray = new Tray(path.resolve(__dirname, 'assets', 'icon.png'));
  startApp()
  
  // Check for new version
  autoUpdater.checkForUpdatesAndNotify()

  // Not available an update
  autoUpdater.on('update-not-available', updateNotAvailable)

  // Available an update
  autoUpdater.on('update-available', updateAvailable)

  // Track download progress on autoUpdater
  autoUpdater.on('download-progress', updateDownloadProgress)

  // Listen for completed update download
  autoUpdater.on('update-downloaded', updateDownloaded)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) startApp()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

const updateNotAvailable = () => {  
  setTimeout(() => {
    autoUpdater.checkForUpdatesAndNotify()
  }, 60000)
}

const updateAvailable = () => {
  const notify = new Notification({
    title: 'Aviso de Atualização!',
    body: 'Foi encontrado uma nova versão e será feito o download.',
    icon: path.resolve(__dirname, 'assets', 'icon.png')
  })
  notify.show()

  autoUpdater.downloadUpdate()
}

const updateDownloadProgress = (progressObj) => {
  log.info(`Progresso do Download: ${progressObj.percent}`)
}

const updateDownloaded = () => {
  const notify = new Notification({
    title: 'Aviso de Atualização!',
    body: 'Download da nova versão efetuado. \n O software está sendo reiniciado para atualizar.',
    icon: path.resolve(__dirname, 'assets', 'icon.png')
  })
  notify.show()
  autoUpdater.quitAndInstall()
}