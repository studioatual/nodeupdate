const {app, BrowserWindow, Menu, Tray, Notification, shell } = require('electron')
const log = require('electron-log')
const { autoUpdater } = require('electron-updater')
const path = require('path')
const server = require('./src')

autoUpdater.autoDownload = false

let mainTray = {};
const api_port = process.env.FBS_API_PORT;

function callNotification() {
  const notify = new Notification({
    title: 'FBS Api Started!',
    body: `O endereço do servidor: \n http://localhost:${api_port}`,
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
      click: () => shell.openExternal(`http://localhost:${api_port}`),
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
  server.start(api_port)
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