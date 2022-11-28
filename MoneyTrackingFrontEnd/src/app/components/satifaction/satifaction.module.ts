import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SatifactionRoutingModule } from './satifaction-routing.module';
import { SatifactionComponent } from './satifaction.component';
import { SatisfactionViewComponent } from './satisfaction-view/satisfaction-view.component';
import { SatisfactionDeleteComponent } from './satisfaction-delete/satisfaction-delete.component';
import { SatisfactionFilterComponent } from './satisfaction-filter/satisfaction-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SatifactionComponent,
    SatisfactionViewComponent,
    SatisfactionDeleteComponent,
    SatisfactionFilterComponent,
  ],
  imports: [
    CommonModule,
    SatifactionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class SatifactionModule {}
