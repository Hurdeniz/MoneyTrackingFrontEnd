import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerPayRoutingModule } from './customer-pay-routing.module';
import { CustomerPayComponent } from './customer-pay.component';
import { CustomerPayViewComponent } from './customer-pay-view/customer-pay-view.component';
import { CustomerPayDeleteComponent } from './customer-pay-delete/customer-pay-delete.component';


import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';




@NgModule({
  declarations: [CustomerPayComponent, CustomerPayViewComponent, CustomerPayDeleteComponent],
  imports: [
    CommonModule,
    CustomerPayRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class CustomerPayModule { }
