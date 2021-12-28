import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { SaleService } from '../../services/sale.service';
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
  constructor(private saleS:SaleService) { }

  ngOnInit(): void {
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.getSale(this.today);
  }
  getSale(date){
    this.total = 0;
    this.saleS.getSales(date).then(res=>{
      this.sales = res
      for(let key in this.sales){
        this.total += this.sales[key].cost
        //console.log(this.sales[key])
      }
      console.log(this.total)
    })
  }

}
