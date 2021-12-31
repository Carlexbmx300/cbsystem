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
    
    silent:true 
      // page size
 }
  const data = [  
    {
      type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: 'SAMPLE HEADING',
      style: `text-align:center;`,
      css: {"font-weight": "700", "font-size": "18px"}
   },{
      type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
      value: 'Secondary text',
      style: `text-align:left;color: red;`,
      css: {"text-decoration": "underline", "font-size": "10px"}
   },
    {
      type: 'barCode',
      value: 'HB4587896',
      height: 12,                     // height of barcode, applicable only to bar and QR codes
      width: 1,                       // width of barcode, applicable only to bar and QR codes
      displayValue: true,             // Display value below barcode
      fontsize: 8,
   },{
     type: 'qrCode',
      value: 'https://github.com/Hubertformin/electron-pos-printer',
      height: 55,
      width: 55,
      style: 'margin: 10 20px 20 20px'
    },{
       type: 'table',
       // style the table
       style: 'border: 1px solid #ddd',
       // list of the columns to be rendered in the table header
       tableHeader: ['Animal', 'Age'],
       // multi dimensional array depicting the rows and columns of the table body
       tableBody: [
           ['Cat', 2],
           ['Dog', 4],
           ['Horse', 12],
           ['Pig', 4],
       ],
       // list of columns to be rendered in the table footer
       tableFooter: ['Animal', 'Age'],
       // custom style for the table header
       tableHeaderStyle: 'background-color: #000; color: white;',
       // custom style for the table body
       tableBodyStyle: 'border: 0.5px solid #ddd',
       // custom style for the table footer
       tableFooterStyle: 'background-color: #000; color: white;',
    }
  ]
  //console.log(data)
  console.log('print')
  PosPrinter.print(data,options).then(()=>{
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