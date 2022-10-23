import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPaymentRoutingModule } from './card-payment-routing.module';
import { CardPaymentViewComponent } from './card-payment-view/card-payment-view.component';
import { CardPaymentDeleteComponent } from './card-payment-delete/card-payment-delete.component';


@NgModule({
  declarations: [
    CardPaymentViewComponent,
    CardPaymentDeleteComponent
  ],
  imports: [
    CommonModule,
    CardPaymentRoutingModule
  ]
})
export class CardPaymentModule { }
