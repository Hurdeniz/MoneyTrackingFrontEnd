import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentResearchListComponent } from './shipment-research-list.component';

const routes: Routes = [
  {path:'' , component:ShipmentResearchListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentResearchListRoutingModule { }
