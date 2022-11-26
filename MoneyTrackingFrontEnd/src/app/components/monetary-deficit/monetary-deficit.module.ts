import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MonetaryDeficitRoutingModule } from './monetary-deficit-routing.module';
import { MonetaryDeficitComponent } from './monetary-deficit.component';

import { MonetaryDeficitViewComponent } from './monetary-deficit-view/monetary-deficit-view.component';
import { MonetaryDeficitDeleteComponent } from './monetary-deficit-delete/monetary-deficit-delete.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MonetaryDeficitComponent,
    MonetaryDeficitViewComponent,
    MonetaryDeficitDeleteComponent,
  ],
  imports: [
    CommonModule,
    MonetaryDeficitRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class MonetaryDeficitModule {}
