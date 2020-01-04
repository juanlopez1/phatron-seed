const dotenv = require('dotenv');
const { app, BrowserWindow } = require('electron');

dotenv.config({ path: '.env.prod' });

const {
  ELECTRON_DEV_TOOLS, ELECTRON_FULL_SCREEN, ELECTRON_REMOVE_MENU, ELECTRON_WINDOW_HEIGHT, ELECTRON_WINDOW_WIDTH
} = process.env;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: Number(ELECTRON_WINDOW_WIDTH),
    height: Number(ELECTRON_WINDOW_HEIGHT),
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('../dist/index.html');

  if (ELECTRON_DEV_TOOLS === 'true') {
    mainWindow.webContents.openDevTools();
  }

  if (ELECTRON_REMOVE_MENU === 'true') {
    mainWindow.removeMenu();
  }

  mainWindow.setFullScreen(ELECTRON_FULL_SCREEN === 'true');
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
