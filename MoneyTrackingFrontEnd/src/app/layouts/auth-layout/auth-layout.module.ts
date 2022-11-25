import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';


import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';

import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from 'src/app/components/shared/shared.module';



@NgModule({
  declarations: [
    AuthLayoutComponent

  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthLayoutModule { }
