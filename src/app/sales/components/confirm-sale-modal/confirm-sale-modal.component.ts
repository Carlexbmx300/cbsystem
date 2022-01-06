import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CASH } from '../../interfaces/cash.interface';
import { CashService } from '../../services/cash.service';
import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';
@Component({
  selector: 'app-confirm-sale-modal',
  templateUrl: './confirm-sale-modal.component.html',
  styleUrls: ['./confirm-sale-modal.component.scss']
})
export class ConfirmSaleModalComponent implements OnInit {
saleData:any;
salesCant:number;
cash:CASH
  constructor(public modalRef: MdbModalRef<ConfirmSaleModalComponent>,
    private saleS:SaleService,
    private ps:ProductService,
    private cashS:CashService,
    private as:AlertService) { }

  ngOnInit(): void {
    
    this.getTodayCash()
    this.getSales()
   /* if(this.saleData.status == 'PAY'){
      this.getSales()
    }else{ 
      this.getTodayTables()
    }*/
    
  }
  getTodayCash(){
    /*this.cashS.getTodayCash().then((res:any)=>{
      this.cash = res
    })*/
    if(this.cashS.isCashOpen()){
      this.cash = this.cashS.getLocalCash()
      
    }
  }
  getSales(){
    this.saleS.getSales(this.cash.date).then(res=>{
      //console.log(res)
      if(res){
        this.salesCant = Object.keys(res).length
      }else{
        this.salesCant = 0
      }
      //console.log(this.salesCant)
    })
  }
  getTodayTables(){
    this.saleS.getTodayTables().then(res=>{
      //console.log(res)
      if(res){
        this.salesCant = Object.keys(res).length
      }else{
        this.salesCant = 0 
      }
      
    })
  }
  saveSale(){
    const data = {
      [this.saleData.ticketNumber]:this.saleData
    }
    this.cash.totalCash += this.saleData.cost;
    this.cash.salesIncome += this.saleData.cost;
    
    
    if(this.saleData.status == 'PAY'){
      this.saleS.confirmSale(data, this.saleData.date).then(()=>{
        this.cash.ticketNumber +=1 ;
        this.ps.updateStock(this.saleData)
        this.cashS.addCash(this.cash);
        this.as.mensajeCorrecto('Venta realizada','Se realizo la venta correctamente')
        this.modalRef.close({sale:true})
      })
    }else{
      this.saleData.status = 'PAY';
      this.saleS.confirmSale(data, this.saleData.date).then(()=>{
        this.ps.updateStock(this.saleData)
        this.cashS.addCash(this.cash);
        this.as.mensajeCorrecto('Venta realizada','Se realizo la venta correctamente')
        this.modalRef.close({sale:true, table:true})
      })
    }
    
  }
}
