import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MoneyOutputRoutingModule } from './money-output-routing.module';
import { MoneyOutputComponent } from './money-output.component';
import { MoneyOutputViewComponent } from './money-output-view/money-output-view.component';
import { MoneyOutputDeleteComponent } from './money-output-delete/money-output-delete.component';
import { MoneyOutputFilterComponent } from './money-output-filter/money-output-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MoneyOutputComponent,
    MoneyOutputDeleteComponent,
    MoneyOutputViewComponent,
    MoneyOutputFilterComponent,
  ],
  imports: [
    CommonModule,
    MoneyOutputRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class MoneyOutputModule {}
