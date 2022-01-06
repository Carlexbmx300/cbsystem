import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PRODUCT } from 'src/app/shared/interfaces/product.interface';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-flavors',
  templateUrl: './flavors.component.html',
  styleUrls: ['./flavors.component.scss']
})
export class FlavorsComponent implements OnInit {
  product:PRODUCT;
  constructor(public modalRef: MdbModalRef<FlavorsComponent>,
    private saleS:SaleService) { }

  ngOnInit(): void {
  }
  addSale(f){
    const p = {
      id: this.product.id,
      name: this.product.name+' '+f.name,
      presentation: this.product.presentation,
      price:f.price,
      stock:this.product.stock,
      area:this.product.area
    }
    this.saleS.addDetail(p)
  }
}
