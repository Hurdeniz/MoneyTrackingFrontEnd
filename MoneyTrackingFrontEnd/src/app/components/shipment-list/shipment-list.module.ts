import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShipmentListRoutingModule } from './shipment-list-routing.module';
import { ShipmentListComponent } from './shipment-list.component';
import { ShipmentListViewComponent } from './shipment-list-view/shipment-list-view.component';
import { ShipmentListDeleteComponent } from './shipment-list-delete/shipment-list-delete.component';
import { ShipmentListEnterResultComponent } from './shipment-list-enter-result/shipment-list-enter-result.component';
import { ShipmentListFilterComponent } from './shipment-list-filter/shipment-list-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShipmentListComponent,
    ShipmentListViewComponent,
    ShipmentListDeleteComponent,
    ShipmentListEnterResultComponent,
    ShipmentListFilterComponent,
  ],
  imports: [
    CommonModule,
    ShipmentListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShipmentListModule {}
