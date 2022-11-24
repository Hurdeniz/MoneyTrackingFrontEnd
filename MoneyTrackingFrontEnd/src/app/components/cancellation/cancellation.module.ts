import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancellationRoutingModule } from './cancellation-routing.module';
import { CancellationComponent } from './cancellation.component';
import { CancellationViewComponent } from './cancellation-view/cancellation-view.component';
import { CancellationDeleteComponent } from './cancellation-delete/cancellation-delete.component';
import { CancellationFilterComponent } from './cancellation-filter/cancellation-filter.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CancellationComponent,
    CancellationViewComponent,
    CancellationDeleteComponent,
    CancellationFilterComponent
  ],
  imports: [
    CommonModule,
    CancellationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule

  ]
})
export class CancellationModule { }
