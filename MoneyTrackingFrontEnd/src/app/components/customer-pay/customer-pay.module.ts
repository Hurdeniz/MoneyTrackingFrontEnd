import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerPayRoutingModule } from './customer-pay-routing.module';
import { CustomerPayComponent } from './customer-pay.component';
import { CustomerPayViewComponent } from './customer-pay-view/customer-pay-view.component';
import { CustomerPayDeleteComponent } from './customer-pay-delete/customer-pay-delete.component';
import { CustomerPayFilterComponent } from './customer-pay-filter/customer-pay-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomerPayComponent,
    CustomerPayViewComponent,
    CustomerPayDeleteComponent,
    CustomerPayFilterComponent,
  ],
  imports: [
    CommonModule,
    CustomerPayRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class CustomerPayModule {}
