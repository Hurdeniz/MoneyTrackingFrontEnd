import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectMoneyComponent } from './collect-money.component';

const routes: Routes = [
  {path:'',component:CollectMoneyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectMoneyRoutingModule { }
