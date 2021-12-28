import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PRODUCT } from 'src/app/shared/interfaces/product.interface';
import { ConfigService } from 'src/app/shared/services/config.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-flavors-modal',
  templateUrl: './flavors-modal.component.html',
  styleUrls: ['./flavors-modal.component.scss']
})
export class FlavorsModalComponent implements OnInit {
flavorsList:any;
product:PRODUCT;
flavorForm:FormGroup;
  constructor(public modalRef: MdbModalRef<FlavorsModalComponent>,
    private cs:ConfigService,
    private fb:FormBuilder,
    private ps:ProductService) { }

  ngOnInit(): void {
    this.getFlavors()
    this.initForm()
    if(this.product.flavors){
      this.addFlavors(this.product.flavors.length)
      this.flavor.patchValue(this.product.flavors)
    }else{
      this.addFlavors()
    }
    
  }
  getFlavors(){
    this.cs.config('flavors').then(res=>{
      this.flavorsList = res
    })
  }
  get flavor(){
    return this.flavorForm.get('flavors') as FormArray
  }
  addFlavors(cant = 1){
    for (let index = 0; index < cant; index++) {
      const flavor = this.fb.group({
        name: ['', Validators.required],
        price: ['', Validators.required]
      });
      this.flavor.push(flavor);
    }
  }
  removeItem(index: any, type: any) {
    type.removeAt(index);
  }
  initForm(){
    this.flavorForm = this.fb.group({
      flavors:this.fb.array([])
    })
  }
  saveFlavors(){
    this.ps.updateProduct(this.product.id, this.flavorForm.value)
  }
}
