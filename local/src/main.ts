import { app, BrowserWindow } from 'electron';
import { Util } from './util';
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        title: 'electron + typescript',
        width: 800,
        height: 600,
        webPreferences: {
            preload: Util.getPathResource('preload.js'),
            contextIsolation: false
        }
    })

    // win.loadFile('index.html')
    win.loadURL('http://localhost:3000/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
