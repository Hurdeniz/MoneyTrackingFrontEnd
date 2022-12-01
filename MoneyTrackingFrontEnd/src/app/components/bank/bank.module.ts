import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank.component';
import { BankViewComponent } from './bank-view/bank-view.component';
import { BankDeleteComponent } from './bank-delete/bank-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BankComponent,
    BankViewComponent,
    BankDeleteComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BankModule { }
