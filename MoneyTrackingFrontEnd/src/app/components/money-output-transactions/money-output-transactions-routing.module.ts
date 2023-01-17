import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { MoneyOutputTransactionsComponent } from './money-output-transactions.component';

const routes: Routes = [
  {path:'' , component:MoneyOutputTransactionsComponent},
  {
    path: "SafeBoxDetails",
    canActivate:[LoginGuard],
     loadChildren: () => import ("../../components/safe-box/safe-box.module").then(m => m.SafeBoxModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyOutputTransactionsRoutingModule { }
