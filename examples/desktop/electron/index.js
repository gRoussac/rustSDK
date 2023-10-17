const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    icon: path.join(__dirname, 'favicon.png'),
  });

  win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        '../../frontend/angular/dist/casper/index.html'
      ),
      protocol: 'file:',
      slashes: true,
    })
  );
}

app.on('ready', createWindow);
