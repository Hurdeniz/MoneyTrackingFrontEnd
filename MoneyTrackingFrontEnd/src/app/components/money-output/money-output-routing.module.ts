import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoneyOutputComponent } from './money-output.component';

const routes: Routes = [
  {path:'' ,component:MoneyOutputComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyOutputRoutingModule { }
