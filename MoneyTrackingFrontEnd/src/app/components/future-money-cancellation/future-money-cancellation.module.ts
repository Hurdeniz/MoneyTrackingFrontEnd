import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutureMoneyCancellationRoutingModule } from './future-money-cancellation-routing.module';
import { FutureMoneyCancellationComponent } from './future-money-cancellation.component';
import { FutureMoneyCancellationDeleteComponent } from './future-money-cancellation-delete/future-money-cancellation-delete.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FutureMoneyCancellationComponent,
    FutureMoneyCancellationDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FutureMoneyCancellationRoutingModule,
    SharedModule
  ]
})
export class FutureMoneyCancellationModule { }
