import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from 'src/app/guards/login.guard';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
  {path:"", component:AdminLayoutComponent,children:[
    {
      path: "CardPayment",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/card-payment/card-payment.module").then(m => m.CardPaymentModule)
    },
    {
      path: "Expenditure",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/expenditure/expenditure.module").then(m => m.ExpenditureModule)
    },
    {
      path: "FutureMoney",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/future-money/future-money.module").then(m => m.FutureMoneyModule)
    },
    {
      path: "MoneyDeposited",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/money-deposited/money-deposited.module").then(m => m.MoneyDepositedModule)
    },
    {
      path: "CustomerPay",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/customer-pay/customer-pay.module").then(m => m.CustomerPayModule)
    },
    {
      path: "CentralPay",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/central-pay/central-pay.module").then(m => m.CentralPayModule)
    },

  ]

},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
