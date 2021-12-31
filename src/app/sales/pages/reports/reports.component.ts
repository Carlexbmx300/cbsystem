import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { SaleService } from '../../services/sale.service';
import { CashService } from '../../services/cash.service';
import { CASH } from '../../interfaces/cash.interface';
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
  constructor(private saleS:SaleService,
    private cashS:CashService) { }

  ngOnInit(): void {
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.getSale(this.today);
  }
  getSale(date){
    this.total = 0;
    this.saleS.getSales(date).then(res=>{
      this.sales = res
      for(let key in this.sales){
        if(this.sales[key].status != 'CANCELLED'){
          this.total += this.sales[key].cost
        }
      }
    })
    this.cashS.getCash(date).then((res:any)=>{
      this.cash = res;
      this.totalIncomes = this.cash.income.reduce((sum, value)=>(sum +value.cash), 0)
      this.totalExpenses = this.cash.expense.reduce((sum, value)=>(sum +value.cash), 0)

      console.log(this.totalExpenses, this.totalIncomes)
    })

  }

}
