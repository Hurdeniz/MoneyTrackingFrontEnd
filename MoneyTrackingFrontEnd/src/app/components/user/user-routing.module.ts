import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOperationsSettingComponent } from './user-operations-setting/user-operations-setting.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent},
  { path: 'UserOperations/:id', component: UserOperationsSettingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {

}
