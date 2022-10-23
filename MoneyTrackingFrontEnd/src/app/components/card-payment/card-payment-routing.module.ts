import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPaymentViewComponent } from './card-payment-view/card-payment-view.component';
import { CardPaymentComponent } from './card-payment.component';

const routes: Routes = [
  {path:'', component:CardPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardPaymentRoutingModule { }
