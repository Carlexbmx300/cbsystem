import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfigService } from "src/app/shared/services/config.service";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { CATEGORIES } from 'src/app/shared/interfaces/config.interface';
import { PRODUCT } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-form-product-modal',
  templateUrl: './form-product-modal.component.html',
  styleUrls: ['./form-product-modal.component.scss']
})
export class FormProductModalComponent implements OnInit {
productForm:FormGroup
categories:any;
types:any;
typeArray:boolean = false;
idProduct:string;
typeForm:string;
pres:any
  constructor(public modalRef: MdbModalRef<FormProductModalComponent>,
    private cs:ConfigService,
    private fb:FormBuilder,
    private ps:ProductService ) { }

  ngOnInit(): void {
    this.getConfig();
    this.initForm();
    if(this.typeForm == 'update'){
     
      
      this.editForm()
    }
    //console.log(this.typeForm)
  }
  getConfig(){
    this.cs.config('categories').then(res=>{
      this.categories = res
      //console.log(this.categories)
    })
    this.cs.config('types').then(res=>{
      this.types = res;
      
    })
  }
  getType(){
    let type;
   /* for(let key in this.types){
      if(t.target.value==key){
        type = this.types[key];
        this.pres = type
      }
    }*/
    if(!this.types){
      return;
    }
    this.pres = this.types[this.type.value]
    //return type;
  }
  initForm(){
    this.productForm = this.fb.group({
      name:['', Validators.required],
      category:['',Validators.required],
      type:['', Validators.required],
      presentation: ['', Validators.required],
      price:['', Validators.required],
      stock:['', Validators.required],
      limited:false,
      area:['', Validators.required]
    })
  }
  editForm(){
  /*  this.productForm = this.fb.group({
      name:['', Validators.required],
      category:['',Validators.required],
      type:['', Validators.required],
      presentation:   this.fb.array([])||this.fb.group({})
    })*/
    this.ps.getProduct(this.idProduct).then((a:PRODUCT)=>{
      //console.log(a)
      //this.checkType(this.getType(a.type))
      /*if(a.type == 'Sabores'){
        this.addFlavors(a.presentation.length)
      }else if(a.type == 'Unico'){
        //this.addPresentation(a.presentation.length)
        const pres = this.fb.group({
          enable:['',Validators.required],
          type:['',Validators.required],
          price:['',Validators.required],
          limited:['',Validators.required],
         
      });
     //pres.patchValue(a.presentation)
     //console.log(pres.value)
    // a.presentation = pres.value
      //this.presentation.setValue(pres)
      //this.presentation.setValue(a)
      //console.log(this.presentation['controls'] = new FormGroup(a.presentation))
      //this.presentation.setValue(new FormGroup(a.presentation))
      //this.setTypes()
      }else{
        console.log('unicoUpdate')
        this.addPresentation(a.presentation.length)
      }*/
     
      //
     //
     
      this.productForm.patchValue(a);
      this.getType() 
      
      
      
      
      
    })
  }
  get type(){
    return this.productForm.get('type')
  }
  get presentation(){
    return this.productForm.get('presentation');
  }
  addFlavors(cant =1){
    let flavorsArray = this.presentation as FormArray;
    for (let index = 0; index < cant; index++) {
      const flavor = this.fb.group({
        name: ['', Validators.required],
        price: ['', Validators.required]
      });
      flavorsArray.push(flavor);
    }
   
  }
  addPresentation(cant =1){
    let pressArray = this.presentation as FormArray;
    for (let index = 0; index < cant; index++) {
      const pres = this.fb.group({
          enable:['',Validators.required],
          type:['',Validators.required],
          price:['',Validators.required],
          limited:['',Validators.required],
          stock:['',Validators.required]
      });
      pressArray.push(pres);
    }
   
  }
  addAmount(data){
     
      let presentationArray = this.presentation as FormArray;
      for(let key in data){
        let pres = this.fb.group({
          enable:data[key],
          type:key,
          price:[{value:0, disabled:!data[key]}],
          limited:false,
          stock:[{value:0, disabled:true}]
         
        })
        presentationArray.push(pres)
      }
  }
  addUnique(){

  }
  removeItem(index: any, type: any) {
    type.removeAt(index);
  }
  saveProduct(){
    //console.log(this.productForm.value);
    if(this.typeForm == 'create'){
      this.ps.addProduct(this.productForm.value).then(a=>{
        this.productForm.reset();
        this.modalRef.close();
        //console.log('guardado')
      });
    }else if(this.typeForm == 'update'){
      this.ps.updateProduct(this.idProduct, this.productForm.value).then(a=>{
        this.modalRef.close()
      })
    }
    
  }
  checkType(data){
    if(typeof data === 'object'){
      this.typeArray = true;
      return this.typeArray;
    }else{
    
      this.typeArray = false;
      return this.typeArray;
    }
  }
  setTypes(){
   
    if(this.presentation){
      this.productForm.removeControl('presentation')
    }
    //this.checkType(data)
    let group:any=[];
   
    let k = this.type.value;
    let data = this.getType();
    console.log(k)
   if(this.checkType(data)){
   /*   for(let key in data){
        let pres = this.fb.group({
          enable:data[key],
          type:key,
          price:[{value:0, disabled:!data[key]}],
          limited:false,
          stock:[{value:0, disabled:true}]
         
        })
        
        group.push(pres)
      }*/
      this.productForm.addControl('presentation', new FormArray([]))
      if(this.presentation){
        this.addAmount(data)
      }
      
    }else if(!this.checkType(data) && k == 'Unico'){
      let pres = this.fb.group({
        enable:data, 
        type:k,
        price:[0, Validators.required],
        limited:false,
        stock:[{value:0, disabled:true}]
       
      })
      this.productForm.addControl('presentation', pres)
    }else if(!this.checkType(data) && k == 'Sabores'){
      //console.log(this.addFlavors())
      this.productForm.addControl('presentation', new FormArray([]))
      if(this.presentation){
        this.addFlavors();
      }
      
    }
  }
  enablePrice(e, i, type){
    if(type.value.enable){
      type.controls.price.enable();
    }else{
      type.controls.price.disable();
    }
    if(type.value.limited){
      type.controls.stock.enable();
    }else{
      type.controls.stock.disable();
    }
  }
  enableStock(e){
    
    if(e.target.checked){
      this.presentation['controls'].stock.enable();
    }else{
      this.presentation['controls'].stock.disable();
    }
  }

}
