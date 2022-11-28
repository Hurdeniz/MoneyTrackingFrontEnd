import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollectMoneyRoutingModule } from './collect-money-routing.module';
import { CollectMoneyComponent } from './collect-money.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CollectMoneyComponent],
  imports: [
    CommonModule,
    CollectMoneyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class CollectMoneyModule {}
