import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  name: string;
  icon: string;
  path:string;
}

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
      name:'İptal İşlemi',
      icon:'receipt_long',
      path:'Cancellation'
    },
    {
      name:'Kasa Açık',
      icon:'receipt_long',
      path:'MonetaryDeficit'
    },
    {
      name:'Notlar',
      icon:'receipt_long',
      path:'Note'
    },
    {
      name:'Kasa Topla',
      icon:'receipt_long',
      path:'CollectMoney'
    },
    {
      name:'Kasa Çıkış',
      icon:'receipt_long',
      path:'MoneyOutput'
    },
  ];
  futureMoney:RouteInfo[]=[
    {
      name:'E-Gelecek',
      icon:'receipt_long',
      path:'FutureMoneyTransactions'
    },
    {
      name:'E-Gelen',
      icon:'receipt_long',
      path:'IncomingMoney'
    },

  ];
  shipping:RouteInfo[]=[
    {
      name:'Sevkiyat Listesi ',
      icon:'credit_card',
      path:'ShipmentList'
    },
    {
      name:'Sor Listesi',
      icon:'receipt_long',
      path:'ResearchList'
    },
    {
      name:'Sevkiyatlar',
      icon:'receipt_long',
      path:'ShipmentResearchList'
    },
    {
      name:'Memnuniyet',
      icon:'receipt_long',
      path:'Satisfaction'
    }

  ];
  staff:RouteInfo[]=[
    {
      name:'Personeller ',
      icon:'credit_card',
      path:'Staff'
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
