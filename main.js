const { join } = require('node:path')
const { app, BrowserWindow, Menu, dialog } = require('electron')

const isMac = process.platform === 'darwin'

const icon = process.platform === 'win32'
  ? join(__dirname, './icons/icon.ico')
  : join(__dirname, './icons/icon.png')

app.disableHardwareAcceleration()

function createWindow() {
  // Create main browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 1024,
    minHeight: 768,
    width: 1280,
    height: 800,
    icon,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadFile('./app/index.html')

  const licenseWindow = () => {
    const license = new BrowserWindow({
      parent: mainWindow,
      minHeight: 600,
      minWidth: 800,
      title: 'Show eula',
      modal: true,
      icon,
    })

    license.setMenuBarVisibility(false)
    license.loadFile(join(__dirname, 'eula.txt'))
    license.once('ready-to-show', () => license.show())
  }

  /** @type {import('electron').MenuItemConstructorOptions[]} */
  const labelMenu = isMac ? [{
    label: app.name, submenu: [{ role: 'quit' }]
  }] : []

  /** @type {import('electron').MenuItemConstructorOptions[]} */
  const menuApp = [
    ...labelMenu,
    {
      label: 'file',
      submenu: [
        {
          label: 'about',
          accelerator: 'F1',
          click() {
            dialog.showMessageBoxSync({
              icon,
              type: 'info',
              title: app.name,
              buttons: ['OK'],
              detail: '', // add detail
              message: '' // add message
            })
          }
        },
        {
          label: 'show terms',
          accelerator: isMac ? 'Comand+L' : 'Ctrl+L',
          click() { licenseWindow() }
        },
        { role: isMac ? 'close' : 'quit' }
      ]
    },
  ]

  const menu = Menu.buildFromTemplate(menuApp)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})
