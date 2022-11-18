import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FutureMoneyTransactionsRoutingModule } from './future-money-transactions-routing.module';
import { FutureMoneyTransactionsComponent } from './future-money-transactions.component';
import { FutureMoneyTransactionsViewComponent } from './future-money-transactions-view/future-money-transactions-view.component';
import { FutureMoneyTransactionsDeleteComponent } from './future-money-transactions-delete/future-money-transactions-delete.component';
import { IncomingMoneyComponent } from './incoming-money/incoming-money.component';
import { PartialIncomingMoneyComponent } from './partial-incoming-money/partial-incoming-money.component';


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
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';







@NgModule({
  declarations: [
    FutureMoneyTransactionsComponent,
    FutureMoneyTransactionsViewComponent,
    FutureMoneyTransactionsDeleteComponent,
    IncomingMoneyComponent,
    PartialIncomingMoneyComponent
  ],
  imports: [
    CommonModule,
    FutureMoneyTransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatTooltipModule,
    MatDatepickerModule
  ]
})
export class FutureMoneyTransactionsModule { }
