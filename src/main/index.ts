import { app, ipcMain, BrowserWindow } from 'electron'

const onReady = async () => {
  let win: BrowserWindow | null

}
app.once('ready', onReady)
app.on('window-all-closed', () => { app.quite() })
