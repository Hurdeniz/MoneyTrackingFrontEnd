import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";


import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MonetaryDeficitComponent } from './components/monetary-deficit/monetary-deficit.component';

@NgModule({
  declarations: [
    AppComponent,



  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      progressBar:true,
      closeButton:true,
      timeOut:3000,
      positionClass: 'toast-bottom-right', //alt sağda göster.
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true},
    {provide: 'apiUrl',useValue:'https://localhost:7256/api/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
