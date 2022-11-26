import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CardPaymentRoutingModule } from './card-payment-routing.module';
import { CardPaymentComponent } from './card-payment.component';
import { CardPaymentViewComponent } from './card-payment-view/card-payment-view.component';
import { CardPaymentDeleteComponent } from './card-payment-delete/card-payment-delete.component';
import { CardPaymentFilterComponent } from './card-payment-filter/card-payment-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CardPaymentComponent,
    CardPaymentViewComponent,
    CardPaymentDeleteComponent,
    CardPaymentFilterComponent
  ],
  imports: [
    CommonModule,
    CardPaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]


})
export class CardPaymentModule { }
