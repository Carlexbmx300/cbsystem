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

  constructor(public modalRef: MdbModalRef<CashModalComponent>,
    private cashS:CashService) { }

  ngOnInit(): void {
    this.getCash()
  }
  getCash(){
    this.cashS.getTodayCash().then((res:any)=>{
      if(res.status == 'OPEN'){
        this.title = 'Aperturar caja'
        this.open = false;
        this.type = 'open'
      }else if(res.status == 'OPENED'){
        this.title = 'Caja abierta'
        this.money = res.totalCash
        this.cash = res;
        this.open = true;
        this.type = 'open'
      }
    })
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
        salesIncome:0
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
      this.cashS.addCash(data).then(()=>{
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
    console.log(this.type)
    if(this.type == 'close'){
      this.open = false;
      this.title = 'Terminar operaciones'
    }else{
      this.open = true;
    }
  }
}
