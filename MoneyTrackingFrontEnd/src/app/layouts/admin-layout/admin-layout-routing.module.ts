import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from 'src/app/guards/login.guard';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  {path:"",component:AdminLayoutComponent,children:[
    { path: "", redirectTo: "Dashboard", pathMatch: "full" },
    {path:'Dashboard' ,canActivate:[LoginGuard], component:DashboardComponent},
    {
      path: "Bank",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/bank/bank.module").then(m => m.BankModule)
    },
    {
      path: "CardPayment",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/card-payment/card-payment.module").then(m => m.CardPaymentModule)
    },
    {
      path: "Cancellation",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/cancellation/cancellation.module").then(m => m.CancellationModule)
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
      path: "StaffEpisode",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/staff-episode/staff-episode.module").then(m => m.StaffEpisodeModule)
    },
    {
      path: "StaffTask",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/staff-task/staff-task.module").then(m => m.StaffTaskModule)
    },
    {
      path: "ShipmentListAdd",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/shipment-list/shipment-list.module").then(m => m.ShipmentListModule)
    },
    {
      path: "ShipmentListResult",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/shipment-list-result/shipment-list-result.module").then(m => m.ShipmentListResultModule)
    },
    {
      path: "ResearchListAdd",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/research-list/research-list.module").then(m => m.ResearchListModule)
    },
    {
      path: "ShipmentResearchList",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/shipment-research-list/shipment-research-list.module").then(m => m.ShipmentResearchListModule)
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
    {
      path: "MoneyOutputTransactions",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/money-output-transactions/money-output-transactions.module").then(m => m.MoneyOutputTransactionsModule)
    },
    {
      path: "FutureMoneyTransactions",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/future-money-transactions/future-money-transactions.module").then(m => m.FutureMoneyTransactionsModule)
    },
    {
      path: "IncomingMoney",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/incoming-money/incoming-money.module").then(m => m.IncomingMoneyModule)
    },
    {
      path: "FutureMoneyCancellation",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/future-money-cancellation/future-money-cancellation.module").then(m => m.FutureMoneyCancellationModule)
    },
    {
      path: "Satisfaction",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/satifaction/satifaction.module").then(m => m.SatifactionModule)
    },
    {
      path: "User",
      canActivate:[LoginGuard],
       loadChildren: () => import ("../../components/user/user.module").then(m => m.UserModule)
    },

  ]

},

// {path:"", component:AdminLayoutComponent},
//   {
//     path: "Bank",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/bank/bank.module").then(m => m.BankModule)
//   },
//   {
//     path: "CardPayment",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/card-payment/card-payment.module").then(m => m.CardPaymentModule)
//   },
//   {
//     path: "Cancellation",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/cancellation/cancellation.module").then(m => m.CancellationModule)
//   },
//   {
//     path: "Expenditure",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/expenditure/expenditure.module").then(m => m.ExpenditureModule)
//   },
//   {
//     path: "FutureMoney",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/future-money/future-money.module").then(m => m.FutureMoneyModule)
//   },
//   {
//     path: "MoneyDeposited",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/money-deposited/money-deposited.module").then(m => m.MoneyDepositedModule)
//   },
//   {
//     path: "CustomerPay",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/customer-pay/customer-pay.module").then(m => m.CustomerPayModule)
//   },
//   {
//     path: "CentralPay",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/central-pay/central-pay.module").then(m => m.CentralPayModule)
//   },
//   {
//     path: "MonetaryDeficit",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/monetary-deficit/monetary-deficit.module").then(m => m.MonetaryDeficitModule)
//   },
//   {
//     path: "Note",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/note/note.module").then(m => m.NoteModule)
//   },
//   {
//     path: "Staff",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/staff/staff.module").then(m => m.StaffModule)
//   },
//   {
//     path: "StaffEpisode",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/staff-episode/staff-episode.module").then(m => m.StaffEpisodeModule)
//   },
//   {
//     path: "StaffTask",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/staff-task/staff-task.module").then(m => m.StaffTaskModule)
//   },
//   {
//     path: "ShipmentListAdd",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/shipment-list/shipment-list.module").then(m => m.ShipmentListModule)
//   },
//   {
//     path: "ShipmentListResult",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/shipment-list-result/shipment-list-result.module").then(m => m.ShipmentListResultModule)
//   },
//   {
//     path: "ResearchListAdd",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/research-list/research-list.module").then(m => m.ResearchListModule)
//   },
//   {
//     path: "ShipmentResearchList",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/shipment-research-list/shipment-research-list.module").then(m => m.ShipmentResearchListModule)
//   },
//   {
//     path: "CollectMoney",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/collect-money/collect-money.module").then(m => m.CollectMoneyModule)
//   },
//   {
//     path: "MoneyOutput",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/money-output/money-output.module").then(m => m.MoneyOutputModule)
//   },
//   {
//     path: "MoneyOutputTransactions",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/money-output-transactions/money-output-transactions.module").then(m => m.MoneyOutputTransactionsModule)
//   },
//   {
//     path: "FutureMoneyTransactions",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/future-money-transactions/future-money-transactions.module").then(m => m.FutureMoneyTransactionsModule)
//   },
//   {
//     path: "IncomingMoney",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/incoming-money/incoming-money.module").then(m => m.IncomingMoneyModule)
//   },
//   {
//     path: "FutureMoneyCancellation",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/future-money-cancellation/future-money-cancellation.module").then(m => m.FutureMoneyCancellationModule)
//   },
//   {
//     path: "Satisfaction",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/satifaction/satifaction.module").then(m => m.SatifactionModule)
//   },
//   {
//     path: "User",
//     canActivate:[LoginGuard],
//      loadChildren: () => import ("../../components/user/user.module").then(m => m.UserModule)
//   },









];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
