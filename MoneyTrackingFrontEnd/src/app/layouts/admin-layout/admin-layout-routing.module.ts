import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from 'src/app/guards/login.guard';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
  {path:"", component:AdminLayoutComponent,children:[
    {
      path: "cardPayments",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/card-payment/card-payment.module").then(m => m.CardPaymentModule)
    },

  ]

},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
