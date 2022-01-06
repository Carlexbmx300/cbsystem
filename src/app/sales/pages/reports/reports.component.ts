import { Component, OnInit } from '@angular/core';
import { formatDate, KeyValue } from '@angular/common';
import { SaleService } from '../../services/sale.service';
import { CashService } from '../../services/cash.service';
import { CASH } from '../../interfaces/cash.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  date: Date = new Date();
  today;
  sales;
  total:number;
  cash:CASH
  totalIncomes:number = 0;
  totalExpenses:number = 0;
  detailIndex:any = 0;
  table:string = 'sales'
  pass:string = '';
  show:boolean = false;
  reverseKeyOrder = (
    a: KeyValue<string, string>,
    b: KeyValue<string, string>
  ): number => {
    return parseInt(a.key) < parseInt(b.key) ? -1 : parseInt(b.key) < parseInt(a.key) ? 1 : 0;
  };
  constructor(private saleS:SaleService,
    private cashS:CashService,
    private as:AlertService) { }

  ngOnInit(): void {
    this.pass = '';
    this.show = false;
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.getSale(this.today);
  }
  access(){
    if(this.pass == 'admincasablanca2022'){
      this.show = true;
    }else{
      this.as.mensajeAdvertencia2('ERROR!!!','Clave de acceso incorrecta')
      this.show = false
    }
  }
  getSale(date){
    this.table = 'sales'
    this.total = 0;
    this.saleS.getSales(date).then((res:any)=>{
      
      this.sales = res
      for(let key in this.sales){
        
        if(this.sales[key].status != 'CANCELLED'){
          this.total += this.sales[key].cost
        }
      }
    })
    this.cashS.getCash(date).then((res:any)=>{
      this.cash = res;
      if(this.cash){
      
      this.totalIncomes = this.cash.income.reduce((sum, value)=>(sum +value.cash), 0)
      this.totalExpenses = this.cash.expense.reduce((sum, value)=>(sum +value.cash), 0)
      }
    })

  }
  showDetail(i){
    if(i != this.detailIndex){ 
      this.detailIndex = i
    }else{
      this.detailIndex = 0
    }
  }
  changeTable(e){
    
    this.table = e.target.value
  }
}
