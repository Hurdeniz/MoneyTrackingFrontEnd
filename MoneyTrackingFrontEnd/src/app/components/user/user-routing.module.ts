import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMenuSettingComponent } from './user-menu-setting/user-menu-setting.component';
import { UserOperationsSettingComponent } from './user-operations-setting/user-operations-setting.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent},
  { path: 'UserOperations/:id', component: UserOperationsSettingComponent },
  { path: 'UserMenu/:id', component: UserMenuSettingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {

}
