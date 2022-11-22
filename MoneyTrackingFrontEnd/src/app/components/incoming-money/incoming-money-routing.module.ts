import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomingMoneyComponent } from './incoming-money.component';

const routes: Routes = [
  {path:'' , component:IncomingMoneyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomingMoneyRoutingModule { }
