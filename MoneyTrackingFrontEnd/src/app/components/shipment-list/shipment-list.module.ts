import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ShipmentListRoutingModule } from './shipment-list-routing.module';
import { ShipmentListComponent } from './shipment-list.component';
import { ShipmentListViewComponent } from './shipment-list-view/shipment-list-view.component';
import { ShipmentListDeleteComponent } from './shipment-list-delete/shipment-list-delete.component';
import { ShipmentListEnterResultComponent } from './shipment-list-enter-result/shipment-list-enter-result.component';


import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    ShipmentListComponent,
    ShipmentListViewComponent,
    ShipmentListDeleteComponent,
    ShipmentListEnterResultComponent,

  ],
  imports: [
    CommonModule,
    ShipmentListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatSidenavModule,
    MatCheckboxModule
  ]
})
export class ShipmentListModule { }
