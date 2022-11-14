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
    {
      path: "MonetaryDeficit",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/monetary-deficit/monetary-deficit.module").then(m => m.MonetaryDeficitModule)
    },
    {
      path: "Note",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/note/note.module").then(m => m.NoteModule)
    },
    {
      path: "Staff",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/staff/staff.module").then(m => m.StaffModule)
    },

    {
      path: "ShipmentList",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/shipment-list/shipment-list.module").then(m => m.ShipmentListModule)
    },
    {
      path: "ResearchList",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/research-list/research-list.module").then(m => m.ResearchListModule)
    },
    {
      path: "CollectMoney",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/collect-money/collect-money.module").then(m => m.CollectMoneyModule)
    },
    {
      path: "MoneyOutput",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/money-output/money-output.module").then(m => m.MoneyOutputModule)
    },

  ]

},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
