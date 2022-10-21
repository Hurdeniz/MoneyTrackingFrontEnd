import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar:true,
      closeButton:true,
      timeOut:3000
    //  positionClass: 'toast-bottom-right', //alt sağda göster.
    }),
  ],
  providers: [
    {provide: 'apiUrl',useValue:'https://localhost:7256/api/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
