const { app, BrowserWindow } = require('electron');
const askForPermission = require('./askForPermission.js');

let mainWindow;

async function createWindow() {
  await askForPermission("camera");
  await askForPermission("microphone");
  await askForPermission("screen");

  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true,
    }
  })

  return window;
}

(async () => {

  app.whenReady()
    .then(async () => {
      mainWindow = await createWindow();
      await mainWindow.loadURL(`file:///${__dirname}/renderer.html`);

      mainWindow.webContents.openDevTools();
    })
    .catch(error => {
      console.error(error)
    })

})();
