import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeBoxRoutingModule } from './safe-box-routing.module';
import { SafeBoxComponent } from './safe-box.component';
import { SharedModule } from '../shared/shared.module';
import { SafeBoxDeleteComponent } from './safe-box-delete/safe-box-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeBoxFilterComponent } from './safe-box-filter/safe-box-filter.component';


@NgModule({
  declarations: [SafeBoxComponent, SafeBoxDeleteComponent,SafeBoxFilterComponent],
  imports: [
    CommonModule,
    SafeBoxRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SafeBoxModule { }
