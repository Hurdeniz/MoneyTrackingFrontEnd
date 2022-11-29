import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShipmentListResultRoutingModule } from './shipment-list-result-routing.module';
import { ShipmentListResultComponent } from './shipment-list-result.component';
import { ShipmentListResultFilterComponent } from './shipment-list-result-filter/shipment-list-result-filter.component';
import { ShipmentListEnterResultComponent } from './shipment-list-enter-result/shipment-list-enter-result.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShipmentListResultComponent,
    ShipmentListResultFilterComponent,
    ShipmentListEnterResultComponent,
  ],
  imports: [
    CommonModule,
    ShipmentListResultRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class ShipmentListResultModule {}
