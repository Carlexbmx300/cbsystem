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

  print(data){
    //let el = require('electron').ipcRenderer
    for(let key in data.areas){
      let det = []
      data.areas[key].forEach((a, index)=>{
       
        det.push([(index+1), a.name+' '+((a.presentation !== 'Unico')?a.presentation:'')+' '+((a.note !== undefined)?'('+a.note+')':''), a.cant])
      })
     
      const p = [
        {
          type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
          value: data.date+' '+data.hour,
          style: `text-align:center;`,
          css: {"font-weight": "700", "font-size": "15px"}
        },
        {
          type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
          value: data.saleType,
          style: `text-align:left;`,
          css: {"font-weight": "700", "font-size": "15px"}
        },
        {
          type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
          value: key + '-TK: '+data.ticket,
          style: `text-align:center;`,
          css: {"font-weight": "700", "font-size": "15px"}
        },{
          type: 'table',
          // style the table
          style: 'border: 1px solid #ddd;margin-bottom:10px',
          // list of the columns to be rendered in the table header
          tableHeader: ['#', 'Descripcion', 'Cnt'],
          // multi dimensional array depicting the rows and columns of the table body
          tableBody: det,
          // list of columns to be rendered in the table footer
         
          // custom style for the table header
          tableHeaderStyle: 'background-color: #fff; color: black;',
          // custom style for the table body
          tableBodyStyle: 'border: 0.5px solid #ddd; color:black; font-size:13px; font-weight:700'
          // custom style for the table foote
       }
      ]
      //console.log(p)
      this._ipc.send('print', p)
    }
    
   
    //this.ipc.send('print', JSON.stringify(data))
    //this.ipc.send('print')
    
  }
}
