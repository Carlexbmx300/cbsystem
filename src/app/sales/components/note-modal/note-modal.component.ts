import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PrintService } from "../../services/print.service";
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
printList=[]
  constructor(public modalRef: MdbModalRef<NoteModalComponent>,
    public ps:PrintService
    ) { }

  ngOnInit(): void {
    console.log(this.type)
    if(this.detail.note){
      this.note = this.detail.note
    }
    if(this.type == 'print'){
      console.log(this.detail)
      this.printList = this.detail
    }
  }
  saveNote(){
    this.detail['note'] = this.note
    this.modalRef.close();
  }
  print(){
    console.log(this.printList)
    this.ps.print()
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
