import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyOutputTransactionsRoutingModule } from './money-output-transactions-routing.module';
import { MoneyOutputTransactionsComponent } from './money-output-transactions.component';
import { MoneyOutputTransactionsViewComponent } from './money-output-transactions-view/money-output-transactions-view.component';
import { MoneyOutputTransactionsDeleteComponent } from './money-output-transactions-delete/money-output-transactions-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SafeBoxInformationComponent } from './safe-box-information/safe-box-information.component';
import { CardPaymentInformationComponent } from './card-payment-information/card-payment-information.component';


@NgModule({
  declarations: [MoneyOutputTransactionsComponent, MoneyOutputTransactionsViewComponent, MoneyOutputTransactionsDeleteComponent, SafeBoxInformationComponent, CardPaymentInformationComponent],
  imports: [
    CommonModule,
    MoneyOutputTransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MoneyOutputTransactionsModule { }
