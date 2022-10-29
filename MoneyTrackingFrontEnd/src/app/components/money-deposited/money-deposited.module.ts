import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoneyDepositedViewComponent } from './money-deposited-view/money-deposited-view.component';
import { MoneyDepositedDeleteComponent } from './money-deposited-delete/money-deposited-delete.component';
import { MoneyDepositedRoutingModule } from './money-deposited-routing.module';


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
import {MatTableModule} from '@angular/material/table';
import { MoneyDepositedComponent } from './money-deposited.component';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [
    MoneyDepositedComponent,
    MoneyDepositedViewComponent,
    MoneyDepositedDeleteComponent
  ],
  imports: [
    CommonModule,
    MoneyDepositedRoutingModule,
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
    MatTableModule,
    MatTooltipModule

  ]
})
export class MoneyDepositedModule { }
