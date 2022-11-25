import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FutureMoneyTransactionsRoutingModule } from './future-money-transactions-routing.module';
import { FutureMoneyTransactionsComponent } from './future-money-transactions.component';
import { FutureMoneyTransactionsViewComponent } from './future-money-transactions-view/future-money-transactions-view.component';
import { FutureMoneyTransactionsDeleteComponent } from './future-money-transactions-delete/future-money-transactions-delete.component';
import { IncomingMoneyComponent } from './incoming-money/incoming-money.component';
import { PartialIncomingMoneyComponent } from './partial-incoming-money/partial-incoming-money.component';


import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
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
