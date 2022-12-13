import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoneyOutputTransactionsComponent } from './money-output-transactions.component';

const routes: Routes = [
  {path:'' , component:MoneyOutputTransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyOutputTransactionsRoutingModule { }
