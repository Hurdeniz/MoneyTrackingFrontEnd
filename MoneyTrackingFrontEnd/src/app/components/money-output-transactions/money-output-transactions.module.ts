import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyOutputTransactionsRoutingModule } from './money-output-transactions-routing.module';
import { MoneyOutputTransactionsComponent } from './money-output-transactions.component';
import { MoneyOutputTransactionsViewComponent } from './money-output-transactions-view/money-output-transactions-view.component';
import { MoneyOutputTransactionsDeleteComponent } from './money-output-transactions-delete/money-output-transactions-delete.component';
import { MoneyOutputTransactionsFilterComponent } from './money-output-transactions-filter/money-output-transactions-filter.component';


@NgModule({
  declarations: [MoneyOutputTransactionsComponent, MoneyOutputTransactionsViewComponent, MoneyOutputTransactionsDeleteComponent, MoneyOutputTransactionsFilterComponent],
  imports: [
    CommonModule,
    MoneyOutputTransactionsRoutingModule
  ]
})
export class MoneyOutputTransactionsModule { }
