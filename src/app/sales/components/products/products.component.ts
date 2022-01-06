import { Component, OnInit,AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { PRODUCT } from 'src/app/shared/interfaces/product.interface';
import { ConfigService } from 'src/app/shared/services/config.service';
import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FlavorsComponent } from "../flavors/flavors.component";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,AfterViewInit, OnDestroy {
categories:any;
productList:PRODUCT[];
products:PRODUCT[];
categorie:string = 'CAFETERIA';
openFlavors:any;
sale = []
modalRef: MdbModalRef<FlavorsComponent>;
stockSubscribe;
cancelSubscribe;
  constructor(private cs:ConfigService,
    private ps:ProductService,
    private saleS:SaleService,
    private modalService: MdbModalService) {
      
     }

  ngOnInit(): void {
    this.getConfig()
    this.getProducts() 
    //this.categorie = 'CAFETERIA'
    this.productByCategory(this.categorie)
    this.getDetail();
    
  }
  ngAfterViewInit():void{
    //this.collapse.toggle(); 
    
  }
  ngOnDestroy(): void {
      this.stockSubscribe.unsubscribe();
      this.cancelSubscribe.unsubscribe();
  }
  getDetail(){
    this.cancelSubscribe=this.saleS.cancelSale().subscribe(res=>{
     
      this.getProducts()
    })
    this.stockSubscribe=this.saleS.getStock().subscribe(res=>{
      this.productList.find(item=>{
        if(item.id == res.id && item.limited == true){
          //console.log(item)
          item.stock+=1;
        }
      })
    })
  }
  getConfig(){
    this.cs.config('categories').then(res=>{
      this.categories = res;
    })
  }
  getProducts(){
    this.ps.getProducts().subscribe(res=>{
      this.productList = res;
      //console.log(this.productList)
    }) 
  }
  openFlavorsModal(product) {
    this.modalRef = this.modalService.open(FlavorsComponent,{
      modalClass:'modal-md',
      containerClass:'center',
      data:{product:product}
    })
  }
  productByCategory(cat){
    let p = []
    if(this.productList){
      p = this.productList.filter(val=>val.category == cat)
      //console.log(this.products)
    }
    if(p[0]){
      this.products = p
      return true
    }else{
      return false
    }
  // return this.products
    
  }
  addSale(p, type){
    if(p.limited){
      p.stock -= 1;
      //console.log(p)
    }
    if(type != 'Sabores'){
      this.saleS.addDetail(p)
    }else{
      this.openFlavorsModal(p);
    }
    
  }
}
