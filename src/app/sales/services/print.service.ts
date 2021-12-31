import { Injectable } from '@angular/core';
//import { ipcRenderer } from 'electron';
import { IpcRenderer } from "electron";
@Injectable({
  providedIn: 'root'
})
export class PrintService {
  private _ipc: IpcRenderer | undefined = void 0;
  constructor() { 
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  } 

  print(){
    //let el = require('electron').ipcRenderer
    const data = [
      {type:'text', value:'this is a sample print job', style:'font-size:16px;color:black'},
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
      }
    ];
    //this.ipc.send('print', JSON.stringify(data))
    //this.ipc.send('print')
    this._ipc.send('print', data)
  }
}
