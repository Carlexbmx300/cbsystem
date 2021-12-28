import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PRODUCT } from 'src/app/shared/interfaces/product.interface';
import { FormProductModalComponent } from "../../components/form-product-modal/form-product-modal.component";
import { FlavorsModalComponent } from "src/app/products/components/flavors-modal/flavors-modal.component";
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  modalRef: MdbModalRef<FormProductModalComponent>;
  modalFlavorRef: MdbModalRef<FlavorsModalComponent>;
  products:PRODUCT[]
  constructor(private modalService: MdbModalService,
    private ps:ProductService) { }

  ngOnInit(): void {
    this.getProd()
  }
  
  openModal() {
    this.modalRef = this.modalService.open(FormProductModalComponent,{
      modalClass:'modal-lg',
      containerClass:'center',
      data:{typeForm:'create'}
    })
  }
  openFlavorsModal(product) {
    this.modalFlavorRef = this.modalService.open(FlavorsModalComponent,{
      modalClass:'modal-md',
      containerClass:'center',
      data:{product:product}
    })
  }
  openUpdateModal(id){
    this.modalRef = this.modalService.open(FormProductModalComponent,{
      modalClass:'modal-lg',
      containerClass:'center',
      data:{idProduct:id, typeForm:'update'}
    })
  }

  getProd(){
    this.ps.getProducts().subscribe(res=>{
      this.products = res;
    })
  }

}
