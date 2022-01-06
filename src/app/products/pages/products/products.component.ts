import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PRODUCT } from 'src/app/shared/interfaces/product.interface';
import { FormProductModalComponent } from "../../components/form-product-modal/form-product-modal.component";
import { FlavorsModalComponent } from "src/app/products/components/flavors-modal/flavors-modal.component";
import { ProductService } from '../../services/product.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { AlertService } from 'src/app/shared/services/alert.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  modalRef: MdbModalRef<FormProductModalComponent>;
  modalFlavorRef: MdbModalRef<FlavorsModalComponent>;
  products:PRODUCT[]
  categories:any;
  categorie:string = 'CAFETERIA';
  pass:string = '';
  show:boolean = false;
  constructor(private modalService: MdbModalService,
    private ps:ProductService,
    private configS:ConfigService,
    private as:AlertService) { }

  ngOnInit(): void {
    this.show = false
    this.pass = '';
    this.getProd()
    this.getConfig()
  }
  getConfig(){
    this.configS.config('categories').then(res=>{
      this.categories = res;
    })
  }
  access(){
    if(this.pass == 'admincasablanca2022'){
      this.show = true;
    }else{
      this.as.mensajeAdvertencia2('ERROR!!!','Clave de acceso incorrecta')
      this.show = false
    }
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
      this.products = res.filter(val=>val.category == this.categorie);
    })
  }
  deleteProd(id){
    this.as.confirmDeleteAlert().then(res=>{
      if(res.isConfirmed){
        this.ps.deleteProduct(id);
      }
    })
  }

}
