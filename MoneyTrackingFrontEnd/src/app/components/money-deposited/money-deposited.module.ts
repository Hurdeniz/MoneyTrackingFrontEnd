import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoneyDepositedViewComponent } from './money-deposited-view/money-deposited-view.component';
import { MoneyDepositedDeleteComponent } from './money-deposited-delete/money-deposited-delete.component';
import { MoneyDepositedRoutingModule } from './money-deposited-routing.module';
import { MoneyDepositedComponent } from './money-deposited.component';
import { MoneyDepositedFilterComponent } from './money-deposited-filter/money-deposited-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MoneyDepositedComponent,
    MoneyDepositedViewComponent,
    MoneyDepositedDeleteComponent,
    MoneyDepositedFilterComponent,
  ],
  imports: [
    CommonModule,
    MoneyDepositedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class MoneyDepositedModule {}
