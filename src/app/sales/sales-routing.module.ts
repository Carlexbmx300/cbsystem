import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';
import { SaleComponent } from "./pages/sale/sale.component";

const routes: Routes = [
  {
    path:'',
    children:[
        {path:'sales', component:SaleComponent},
        {path:'reports', component:ReportsComponent},
        {path:'**', redirectTo:'sales'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
