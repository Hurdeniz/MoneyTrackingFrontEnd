import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  name: string;
  icon: string;
  path:string;
}

// export const ROUTES: RouteInfo[] = [
//   {
//     name:'Kredi KartıAS',
//     icon:'credit_card',
//     path:'/cardPayments'

//   },
//   {
//     name:'Masraf',
//     icon:'receipt_long',
//     path:''
//   },
//   {
//     name:'E-Gelecek',
//     icon:'receipt_long',
//     path:''
//   },
//   {
//     name:'Para Yatırma',
//     icon:'receipt_long',
//     path:''
//   },
//   {
//     name:'Firma Ödemesi',
//     icon:'receipt_long',
//     path:''
//   },
//   {
//     name:'Merkez Ödemesi',
//     icon:'receipt_long',
//     path:''
//   },
//   {
//     name:'Kasa Açık',
//     icon:'receipt_long',
//     path:''
//   },
//   {
//     name:'Notlar',
//     icon:'receipt_long',
//     path:''
//   },
//   {
//     name:'Kasa Topla',
//     icon:'receipt_long',
//     path:''
//   },
//   {
//     name:'Kasa Çıkış',
//     icon:'receipt_long',
//     path:''
//   },
// ]


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  safetyBox:RouteInfo[]=[
    {
      name:'Kredi Kartı',
      icon:'credit_card',
      path:'CardPayment'
    },
    {
      name:'Masraf',
      icon:'receipt_long',
      path:'Expenditure'
    },
    {
      name:'E-Gelecek',
      icon:'receipt_long',
      path:'FutureMoney'
    },
    {
      name:'Para Yatırma',
      icon:'receipt_long',
      path:'MoneyDeposited'
    },
    {
      name:'Firma Ödemesi',
      icon:'receipt_long',
      path:'CustomerPay'
    },
    {
      name:'Merkez Ödemesi',
      icon:'receipt_long',
      path:'CentralPay'
    },
    {
      name:'Kasa Açık',
      icon:'receipt_long',
      path:''
    },
    {
      name:'Notlar',
      icon:'receipt_long',
      path:''
    },
    {
      name:'Kasa Topla',
      icon:'receipt_long',
      path:''
    },
    {
      name:'Kasa Çıkış',
      icon:'receipt_long',
      path:''
    },
  ];
  shipping:RouteInfo[]=[
    {
      name:'Sevkiyat Listesi ',
      icon:'credit_card',
      path:'cardPayments'
    },
    {
      name:'Sor Listesi',
      icon:'receipt_long',
      path:''
    },
    {
      name:'Sevkiyatlar',
      icon:'receipt_long',
      path:''
    },
    {
      name:'Memnuniyet',
      icon:'receipt_long',
      path:''
    }

  ];
  staff:RouteInfo[]=[
    {
      name:'Personeller ',
      icon:'credit_card',
      path:''
    },
    {
      name:'Shift',
      icon:'receipt_long',
      path:''
    },


  ];
  user:RouteInfo[]=[
    {
      name:'Kulanıcılar',
      icon:'credit_card',
      path:''
    }



  ];
  setting:RouteInfo[]=[
    {
      name:'Profil Ayarları',
      icon:'credit_card',
      path:''
    },
    {
      name:'Şifre Değiştir',
      icon:'credit_card',
      path:''
    }



  ];



  constructor() { }

  ngOnInit(): void {

  }

}
