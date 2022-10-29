import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoneyDepositedComponent } from './money-deposited.component';

const routes: Routes = [
  {path:'' , component:MoneyDepositedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyDepositedRoutingModule { }
