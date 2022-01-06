import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent,
    children:[
      {
        path:'product', loadChildren: () => import('../products/products.module').then(m=>m.ProductsModule)
      },
      {
        path:'user', loadChildren: ()=> import('../user/user.module').then(m=>m.UserModule)
      },
      {
        path:'sale', loadChildren: ()=> import('../sales/sales.module').then(m=>m.SalesModule)
      },
      {
        path:'**', redirectTo:'sale'
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
