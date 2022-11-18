import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FutureMoneyTransactionsComponent } from './future-money-transactions.component';

const routes: Routes = [
  {path:'',component:FutureMoneyTransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutureMoneyTransactionsRoutingModule { }
