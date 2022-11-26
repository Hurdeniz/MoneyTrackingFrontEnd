import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CentralPayRoutingModule } from './central-pay-routing.module';
import { CentralPayComponent } from './central-pay.component';
import { CentralPayViewComponent } from './central-pay-view/central-pay-view.component';
import { CentralPayDeleteComponent } from './central-pay-delete/central-pay-delete.component';
import { CentralPayFilterComponent } from './central-pay-filter/central-pay-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CentralPayComponent,
    CentralPayViewComponent,
    CentralPayDeleteComponent,
    CentralPayFilterComponent,
  ],
  imports: [
    CommonModule,
    CentralPayRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class CentralPayModule {}
