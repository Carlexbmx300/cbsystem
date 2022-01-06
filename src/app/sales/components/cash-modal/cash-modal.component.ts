import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CashService } from '../../services/cash.service';
import { formatDate } from '@angular/common';
import { CASH } from '../../interfaces/cash.interface';
@Component({
  selector: 'app-cash-modal',
  templateUrl: './cash-modal.component.html',
  styleUrls: ['./cash-modal.component.scss']
})
export class CashModalComponent implements OnInit {
cash:CASH;
status:string;
title:string;
money:number = 0;
moneyIn:number = 0;
open:boolean = false;
gloss:string;
type:string;
today:string;

  constructor(public modalRef: MdbModalRef<CashModalComponent>,
    private cashS:CashService) { }

  ngOnInit(): void {
    this.today = formatDate(new Date(), 'YYYY-MM-dd', 'en')
    this.getCash()
  }
  getCash(){
    if(this.cashS.isCashOpen() && this.cashS.getLocalCash().status !='CLOSED'){
      this.cash = this.cashS.getLocalCash();
      this.title = 'Caja abierta'
      this.money = this.cash.totalCash
      this.open = true;
      this.type = 'open'
    }else if(this.cashS.isCashOpen() && this.cashS.getLocalCash().status =='CLOSED'){
        this.title = 'Aperturar caja'
        this.open = false;
        this.type = 'open'
    }else if (!this.cashS.isCashOpen()){
      this.title = 'Aperturar caja'
        this.open = false;
        this.type = 'open'
    }
  }
  saveCash(){
    if(this.type == 'open'){
      let data = {
        totalCash:this.money,
        opened:{
          cash:this.money,
          hour:formatDate(new Date(), 'HH:mm', 'en')
        },
        expense:[],
        income:[],
        status:'OPENED',
        salesIncome:0,
        date:formatDate(new Date(), 'YYYY-MM-dd', 'en'),
        ticketNumber:1
      }
      this.cashS.addCash(data).then(()=>{
        this.modalRef.close({status:'OPENED'})
      })
    }else{
      let data = {
        closed:{
          cash:this.money,
          hour:formatDate(new Date(), 'HH:mm', 'en')
        },
        status:'CLOSED'
      }
      this.cash.closed = data.closed;
      this.cash.status = data.status
      this.cashS.addCash(this.cash).then(()=>{
        this.modalRef.close({status:'CLOSED'})
      })
    }
    
    
  }
  addCash(type:string){
    let data = {
        cash:this.moneyIn,
        hour:formatDate(new Date(), 'HH:mm', 'en'),
        gloss:this.gloss
    }
    if(type == 'INCOME'){
     this.cash.income.push(data);
     this.cash.totalCash += this.moneyIn
      
    }else if(type == 'EXPENSE'){
      this.cash.expense.push(data);
      this.cash.totalCash -= this.moneyIn
    }
    this.cashS.addCash(this.cash).then(()=>{
      this.modalRef.close()
    })
  }
  close(){
    if(this.type == 'close'){
      this.open = false;
      this.title = 'Terminar operaciones'
    }else{
      this.open = true;
    }
  }
}
