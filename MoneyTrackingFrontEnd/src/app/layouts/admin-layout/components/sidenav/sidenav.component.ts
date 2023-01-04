import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

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
      name:'Günlük Kasa',
      icon:'credit_card',
      path:'MoneyOutputTransactions'
    },
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
    {
      name:'E-Gelecek İptal',
      icon:'receipt_long',
      path:'FutureMoneyCancellation'
    },

  ];
  shipping:RouteInfo[]=[
    {
      name:'Sevkiyat Oluştur',
      icon:'credit_card',
      path:'ShipmentList'
    },
    {
      name:'Sor Oluştur',
      icon:'receipt_long',
      path:'ResearchList'
    },
    {
      name:'Sevkiyat Sonuç',
      icon:'receipt_long',
      path:'ShipmentListResult'
    },
    {
      name:'Sevkiyat Listesi',
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
      path:'User'
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
    },
    {
      name:'Banka Ekle',
      icon:'',
      path:'Bank'
    },
    {
      name:'Bölüm Ekle',
      icon:'',
      path:'StaffEpisode'
    },
    {
      name:'Görev Ekle',
      icon:'',
      path:'StaffTask'
    }



  ];

  elem:any;

  constructor(@Inject(DOCUMENT) private document: any) { }


  ngOnInit(): void {
    this.elem = document.documentElement;
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

   /* Close fullscreen */
   closeFullscreen() {
    if (document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
