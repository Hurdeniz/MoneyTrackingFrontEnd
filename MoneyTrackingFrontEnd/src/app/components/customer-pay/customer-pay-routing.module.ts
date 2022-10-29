import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPayComponent } from './customer-pay.component';

const routes: Routes = [
  {path:'' , component:CustomerPayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPayRoutingModule { }
