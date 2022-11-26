import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenditureComponent } from './expenditure.component';
import { ExpenditureViewComponent } from './expenditure-view/expenditure-view.component';
import { ExpenditureDeleteComponent } from './expenditure-delete/expenditure-delete.component';
import { ExpenditureRoutingModule } from './expenditure-routing.module';
import { ExpenditureFilterComponent } from './expenditure-filter/expenditure-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ExpenditureComponent,
    ExpenditureViewComponent,
    ExpenditureDeleteComponent,
    ExpenditureFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExpenditureRoutingModule,
    SharedModule,
  ],
})
export class ExpenditureModule {}
