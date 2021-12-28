import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TABLE } from 'src/app/shared/interfaces/sale.interface';
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
  constructor(public modalRef: MdbModalRef<OrderTableModalComponent>,
    private ts:TablesService,
    private ps:ProductService) { }

  ngOnInit(): void {
    console.log(this.saleData)
    this.getTables() 
  }
  getTables(){
    this.ts.getTables().subscribe(res=>{
      this.tables = res.filter(val=>val.free);
      console.log(this.tables)
    })
  }
  saveTable(){
    console.log(this.table)
    this.saleData.status='PENDING'
    const data = {
      free:false,
      saleData:this.saleData
    }
    this.ts.updateTable(this.table, data).then(()=>{
      this.ps.updateStock(data.saleData)
      this.modalRef.close({sale:true})
    })
  }
}
