import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FutureMoneyRoutingModule } from './future-money-routing.module';
import { FutureMoneyViewComponent } from './future-money-view/future-money-view.component';
import { FutureMoneyDeleteComponent } from './future-money-delete/future-money-delete.component';
import { FutureMoneyComponent } from './future-money.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FutureMoneyComponent,
    FutureMoneyViewComponent,
    FutureMoneyDeleteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FutureMoneyRoutingModule,
    SharedModule,
  ],
})
export class FutureMoneyModule {}
