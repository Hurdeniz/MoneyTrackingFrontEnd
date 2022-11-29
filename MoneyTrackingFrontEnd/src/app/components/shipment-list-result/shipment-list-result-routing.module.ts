import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentListResultComponent } from './shipment-list-result.component';

const routes: Routes = [
  {path:'', component:ShipmentListResultComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentListResultRoutingModule { }
