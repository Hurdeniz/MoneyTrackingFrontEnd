import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found/not-found.component';
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
  {
    path:"notFound" , component:NotFoundComponent
  },
  {
    path:"**",redirectTo:"notFound",pathMatch:"full"
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
