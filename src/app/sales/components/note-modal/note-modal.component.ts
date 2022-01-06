import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PrintService } from "../../services/print.service";
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss']
})
export class NoteModalComponent implements OnInit {
detail;
index:number;
type:string;
note:string;
printList=[];
sale;
saleType;
  constructor(public modalRef: MdbModalRef<NoteModalComponent>,
    public ps:PrintService
    ) { }

  ngOnInit(): void {
    if(this.detail.note){
      this.note = this.detail.note
    }
    if(this.type == 'print'){
      this.printList = this.detail
    }
  }
  saveNote(){
    this.detail['note'] = this.note
    this.modalRef.close();
  }
  print(){
    let print = {}
    let list = this.printList
    /*for(let i=0;i<this.printList.length; i++){
      this.detail[i]['print']=this.detail[i].cant
      if(!print[this.printList[i].area]){
        print[this.printList[i].area]=[];
        print[this.printList[i].area].push(this.printList[i])
      }else{
        print[this.printList[i].area].push(this.printList[i])
      }
    }*/
    let printList = []
    this.printList.forEach(a=>{
     if(!a.print || a.print < a.cant){
      let printData = {
        cant:(!a.print)?a.cant:a.cant-a.print,
        name:a.name,
        note:a.note,
        presentation:a.presentation,
        area:a.area
      }
       printList.push(printData)
       a.print = a.cant
       //console.log(a)
     }
    })
    if(printList.length > 0){
      printList.forEach(b=>{
        if(!print[b.area]){
          print[b.area]=[];
          print[b.area].push(b)
        }else{
          print[b.area].push(b)
        }
      })
      let printData = {
        saleType:(this.sale.status == 'PENDING')?'Mesa '+this.saleType:'Para llevar',
        hour:formatDate(new Date(), 'HH:mm', 'en'),
        date:formatDate(new Date(), 'YYYY-MM-dd', 'en'),
        ticket:this.sale.ticketNumber,
        areas:print
      }
      this.ps.print(printData)
    }else{
      console.log('comanda ya impresa')
    }
    this.modalRef.close()
    //let ps = new PrintService()
    //ps.print()
    
  }
  removeItem(id){
    this.printList = this.printList.filter(val=>val.id !== id)
  }
  addItem(item){
    this.printList.push(item)
  }
}
