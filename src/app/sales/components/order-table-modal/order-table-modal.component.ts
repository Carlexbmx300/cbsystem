import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TABLE } from 'src/app/shared/interfaces/sale.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CASH } from '../../interfaces/cash.interface';
import { CashService } from '../../services/cash.service';
import { ProductService } from '../../services/product.service';
import { TablesService } from '../../services/tables.service';
@Component({
  selector: 'app-order-table-modal',
  templateUrl: './order-table-modal.component.html',
  styleUrls: ['./order-table-modal.component.scss']
})
export class OrderTableModalComponent implements OnInit {
saleData;
tables:TABLE[];
table:string = '';
cash:CASH;
  constructor(public modalRef: MdbModalRef<OrderTableModalComponent>,
    private ts:TablesService,
    private ps:ProductService,
    private cashS:CashService,
    private as:AlertService) { }

  ngOnInit(): void {
    this.getTables() 
    this.cash = this.cashS.getLocalCash()
  }
  getTables(){
    this.ts.getTables().subscribe(res=>{
      res.sort((a, b) => {
        if(parseInt(a.id) > parseInt(b.id)) {
          return 1;
        } else if(parseInt(a.id) < parseInt(b.id)) {
          return -1;
        } else {
          return 0;
        }
      });
      this.tables = res.filter(val=>val.free);
    })
  }
  saveTable(){
    this.saleData.status='PENDING'
    const data = {
      free:false,
      saleData:this.saleData
    }
    this.cash.ticketNumber += 1;
    this.cashS.addCash(this.cash)
    this.ts.updateTable(this.table, data).then(()=>{
      this.as.mensajeCorrecto('Mesa guardada','Se agrego registro de mesa correctamente')
      this.ps.updateStock(data.saleData)
      this.modalRef.close({sale:true})
    })
  }
}
