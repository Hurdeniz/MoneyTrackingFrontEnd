import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomingMoneyRoutingModule } from './incoming-money-routing.module';
import { IncomingMoneyComponent } from './incoming-money.component';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomingMoneyDeleteComponent } from './incoming-money-delete/incoming-money-delete.component';
import { IncomingMoneyViewComponent } from './incoming-money-view/incoming-money-view.component';



@NgModule({
  declarations: [
    IncomingMoneyComponent,
    IncomingMoneyDeleteComponent,
    IncomingMoneyViewComponent,
  ],
  imports: [
    CommonModule,
    IncomingMoneyRoutingModule,
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
export class IncomingMoneyModule { }
