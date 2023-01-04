import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { UserOperationsSettingComponent } from './user-operations-setting/user-operations-setting.component';
import { UserViewComponent } from './user-view/user-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPasswordResetComponent } from './user-password-reset/user-password-reset.component';
import { UserStatusComponent } from './user-status/user-status.component';


@NgModule({
  declarations: [
    UserComponent,
    UserOperationsSettingComponent,
    UserViewComponent,
    UserPasswordResetComponent,
    UserStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
