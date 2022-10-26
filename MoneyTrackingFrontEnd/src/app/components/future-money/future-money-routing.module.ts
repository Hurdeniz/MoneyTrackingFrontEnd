import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FutureMoneyComponent } from './future-money.component';

const routes: Routes = [
  {path:'' , component:FutureMoneyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutureMoneyRoutingModule { }
