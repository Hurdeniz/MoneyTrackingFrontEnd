import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from 'src/app/guards/login.guard';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
  {path:"", component:AdminLayoutComponent,children:[
    {
      path: "CardPayment",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/card-payment/card-payment.module").then(m => m.CardPaymentModule)
    },
    {
      path: "Expenditure",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/expenditure/expenditure.module").then(m => m.ExpenditureModule)
    },

  ]

},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
