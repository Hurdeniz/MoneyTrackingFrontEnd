import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CardPaymentRoutingModule } from './card-payment-routing.module';
import { CardPaymentViewComponent } from './card-payment-view/card-payment-view.component';
import { CardPaymentDeleteComponent } from './card-payment-delete/card-payment-delete.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
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
    ToastrModule.forRoot({
      progressBar:true,
      closeButton:true,
      timeOut:3000
    //  positionClass: 'toast-bottom-right', //alt sağda göster.
    }),

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CardPaymentModule { }
