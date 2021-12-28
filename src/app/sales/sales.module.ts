import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { SaleComponent } from './pages/sale/sale.component';
import { ProductsComponent } from "./components/products/products.component";
import { FormsModule } from '@angular/forms';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { DetailComponent } from './components/detail/detail.component';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { FlavorsComponent } from './components/flavors/flavors.component';
import { ConfirmSaleModalComponent } from './components/confirm-sale-modal/confirm-sale-modal.component';
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { OrderTableModalComponent } from './components/order-table-modal/order-table-modal.component';
import { ReportsComponent } from './pages/reports/reports.component';


@NgModule({
  declarations: [
    SaleComponent,
    ProductsComponent,
    DetailComponent,
    FlavorsComponent,
    ConfirmSaleModalComponent,
    NoteModalComponent,
    OrderTableModalComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    MdbCollapseModule,
    MdbTooltipModule,
    MdbFormsModule
  ]
})
export class SalesModule { }
