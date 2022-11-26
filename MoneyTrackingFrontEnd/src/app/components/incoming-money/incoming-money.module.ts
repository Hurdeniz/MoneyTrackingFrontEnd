import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomingMoneyRoutingModule } from './incoming-money-routing.module';
import { IncomingMoneyComponent } from './incoming-money.component';
import { IncomingMoneyDeleteComponent } from './incoming-money-delete/incoming-money-delete.component';
import { IncomingMoneyViewComponent } from './incoming-money-view/incoming-money-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    IncomingMoneyComponent,
    IncomingMoneyDeleteComponent,
    IncomingMoneyViewComponent,
  ],
  imports: [
    CommonModule,
    IncomingMoneyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class IncomingMoneyModule {}
