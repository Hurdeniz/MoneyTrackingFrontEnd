import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CardPaymentRoutingModule } from './card-payment-routing.module';
import { CardPaymentViewComponent } from './card-payment-view/card-payment-view.component';
import { CardPaymentDeleteComponent } from './card-payment-delete/card-payment-delete.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { CardPaymentComponent } from './card-payment.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [
    CardPaymentComponent,
    CardPaymentViewComponent,
    CardPaymentDeleteComponent
  ],
  imports: [
    CommonModule,
    CardPaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule,
    MatProgressBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule


  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class CardPaymentModule { }
