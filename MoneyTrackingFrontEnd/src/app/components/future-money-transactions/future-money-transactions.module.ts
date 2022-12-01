import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FutureMoneyTransactionsRoutingModule } from './future-money-transactions-routing.module';
import { FutureMoneyTransactionsComponent } from './future-money-transactions.component';
import { FutureMoneyTransactionsViewComponent } from './future-money-transactions-view/future-money-transactions-view.component';
import { FutureMoneyTransactionsDeleteComponent } from './future-money-transactions-delete/future-money-transactions-delete.component';
import { IncomingMoneyComponent } from './incoming-money/incoming-money.component';
import { PartialIncomingMoneyComponent } from './partial-incoming-money/partial-incoming-money.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FutureMoneyTransactionsComponent,
    FutureMoneyTransactionsViewComponent,
    FutureMoneyTransactionsDeleteComponent,
    IncomingMoneyComponent,
    PartialIncomingMoneyComponent
  ],
  imports: [
    CommonModule,
    FutureMoneyTransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class FutureMoneyTransactionsModule { }
