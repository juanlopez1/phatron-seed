const dotenv = require('dotenv');
const {app, BrowserWindow} = require('electron');

const env = dotenv.config();
process.env = {...process.env, ...env.parsed};

let window;

const createWindow = () => {
    window = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadFile('./src/index.html');

    if (process.env.DISPLAY_DEV_TOOLS === 'true') {
        window.webContents.openDevTools();
    }
    if (process.env.HIDE_WINDOW_MENU_BAR === 'true') {
        window.removeMenu();
    }
    window.setFullScreen(process.env.SET_FULLSCREEN === 'true');

    // Emitted when the window is closed.
    window.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this eve;nt occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (window === null) {
        createWindow();
    }
});
