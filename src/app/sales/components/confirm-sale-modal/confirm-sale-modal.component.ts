import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
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
  constructor(public modalRef: MdbModalRef<ConfirmSaleModalComponent>,
    private saleS:SaleService,
    private ps:ProductService) { }

  ngOnInit(): void {
    console.log(this.saleData)
    this.getSales()
   /* if(this.saleData.status == 'PAY'){
      this.getSales()
    }else{
      this.getTodayTables()
    }*/
    
  }
  getSales(){
    this.saleS.getTodaySales().then(res=>{
      //console.log(res)
      if(res){
        this.salesCant = Object.keys(res).length
      }else{
        this.salesCant = 0
      }
      console.log(this.salesCant)
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
      console.log(this.salesCant)
    })
  }
  saveSale(){
    const data = {
      [this.salesCant + 1]:this.saleData
    }
    if(this.saleData.status == 'PAY'){
      this.saleS.confirmSale(data).then(()=>{
        this.ps.updateStock(this.saleData)
        this.modalRef.close({sale:true})
      })
    }else{
      this.saleData.status = 'PAY';
      this.saleS.confirmSale(data).then(()=>{
        this.ps.updateStock(this.saleData)
        this.modalRef.close({sale:true, table:true})
      })
    }
    
  }
}
