import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormProductModalComponent } from './components/form-product-modal/form-product-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FlavorsModalComponent } from './components/flavors-modal/flavors-modal.component';




@NgModule({
  declarations: [
  
    ProductsComponent,
    FormProductModalComponent,
    FlavorsModalComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MdbFormsModule
  ]
})
export class ProductsModule { }
