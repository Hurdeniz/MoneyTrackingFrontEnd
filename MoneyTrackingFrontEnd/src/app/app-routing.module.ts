import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {
    path: "",
    canActivate:[LoginGuard],
    loadChildren: () => import ("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
  },
  {
    path: "login",
    loadChildren: () => import ("./layouts/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
