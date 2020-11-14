const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        minWidth: 768,
        width: 800,
        height: 600,
        show: false,
        title: 'CPU Scheduler',
        icon: '/favicon.ico',
        useContentSize: true,
    });
    const startURL = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('page-title-updated', (e) => {
        e.preventDefault();
    });
}
app.on('ready', createWindow);
