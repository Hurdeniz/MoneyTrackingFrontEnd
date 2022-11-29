import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShipmentResearchListRoutingModule } from './shipment-research-list-routing.module';
import { ShipmentResearchListComponent } from './shipment-research-list.component';
import { ShipmentResearchListFilterComponent } from './shipment-research-list-filter/shipment-research-list-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShipmentResearchListComponent,
    ShipmentResearchListFilterComponent,
  ],
  imports: [
    CommonModule,
    ShipmentResearchListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class ShipmentResearchListModule {}
