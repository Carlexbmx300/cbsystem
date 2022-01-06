// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const { PosPrinter } = require('electron-pos-printer')
//const {PosPrinter} = remote.require("electron-pos-printer");
const path = require('path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
    }
  })
  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/dist/cbsiystem/index.html`)
  let list = mainWindow.webContents.getPrinters();
  console.log('printers available are: ', list)
  // Open the DevTools.
   mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
})
ipcMain.on('print',(event, arg)=>{
  //const data = JSON.parse(arg)
  //console.log(arg)
  const options = {
    preview: false,               // Preview in window or print                  // Number of copies to print
    printerName: 'EPSON TM-U220 Receipt',        // printerName: string, check with webContent.getPrinters()
    width: '230px',               //  width of content body
    margin: '20px',
    silent:true 
    ,
   pageSize: { height: 301000, width: 71000 }
      // page size
 }
  
  //console.log(data)
  console.log(arg)
  PosPrinter.print(arg,options).then(()=>{
    console.log('print done')
  }).catch(error=>console.log('error here: ',error))
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. Tu también puedes ponerlos en archivos separados y requerirlos aquí.