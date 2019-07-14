import { app, BrowserWindow } from 'electron'

const onReady = async () => {
  let win: BrowserWindow | null
  win = new BrowserWindow();
  win.loadURL('http://localhost:8080');

  // ChromiumのDevツールを開く
  win.webContents.openDevTools();

  win.on('closed', function() {
    win = null;
  });

}
app.once('ready', onReady)
app.on('window-all-closed', () => { app.quit() })
