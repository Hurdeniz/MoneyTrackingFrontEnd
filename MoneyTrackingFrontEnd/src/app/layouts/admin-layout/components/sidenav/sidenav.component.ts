import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  isAuthenticated: boolean = false;
  userName: string;
  userRole: string[] = [];
  userRoleName:string;
  safetyBox:boolean=false;
  futureMoney:boolean=false;
  shipment:boolean=false;
  setting:boolean=false;
  adminShowAllForm: boolean = false;
  staffShowAllForm: boolean = false;
  serviceShowAllForm: boolean = false;
  moneyOutputTransactionShowForm: boolean = false;
  cardPaymentShowForm: boolean = false;
  expenditureShowForm: boolean = false;
  futureMoneyShowForm: boolean = false;
  moneyDepositedShowForm: boolean = false;
  customerPayShowForm: boolean = false;
  centralPayShowForm: boolean = false;
  cancellationShowForm: boolean = false;
  monetaryDeficitShowForm: boolean = false;
  noteShowForm: boolean = false;
  collectMoneyShowForm: boolean = false;
  moneyOutputShowForm: boolean = false;
  futureMoneyTransactionShowForm: boolean = false;
  incomingMoneyShowForm: boolean = false;
  futureMoneyCancellationShowForm: boolean = false;
  shipmentListAddShowForm: boolean = false;
  shipmentAndResearchListShowForm: boolean = false;
  researchListShowForm: boolean = false;
  shipmentListResultShowForm: boolean = false;
  satisfactionShowForm: boolean = false;
  staffShowForm: boolean = false;
  userShowForm: boolean = false;
  bankShowForm: boolean = false;
  staffEpisodeShowForm: boolean = false;
  staffTaskShowForm: boolean = false;



  constructor(
    private authService: AuthService,
    ) { }


  ngOnInit(): void {

    this.tokenAndUserControl();
  }

  tokenAndUserControl() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let name = Object.keys(decode).filter((x) =>
        x.endsWith('/name')
      )[0];
      this.userName = decode[name];
      let role = Object.keys(decode).filter((x) =>
        x.endsWith('/role')
      )[0];
      this.userRole = decode[role];
    }

    const arrayControl = Array.isArray(this.userRole);
    if (arrayControl == false) {
      if (this.userRole.toString() == 'AdminShowAllForm') {
        this.adminShowAllForm = true;
        this.userRoleName='Admin';
        this.safetyBox=true;
      }
      if (this.userRole.toString() == 'StaffShowAllForm') {
        this.staffShowAllForm = true;
        this.userRoleName='Kasa Personeli';
        this.safetyBox=true;
      }
      if (this.userRole.toString() == 'ServiceShowAllForm') {
        this.serviceShowAllForm = true;
        this.userRoleName='Müşteri Hizmetleri';
        this.safetyBox=true;
      }

      if (this.userRole ) {
        this.adminShowAllForm = false;
        this.staffShowAllForm = false;
        this.serviceShowAllForm = false;
        this.userRoleName='Yetki Yok';

      }

    }
    else {
      this.userRole.forEach(element => {
        if (element == 'AdminShowAllForm') {
          this.adminShowAllForm = true;
          this.userRoleName='Admin';
          this.safetyBox=true;
        }
        if (this.userRole.toString() == 'StaffShowAllForm') {
          this.staffShowAllForm = true;
          this.userRoleName='Kasa Personeli';
          this.safetyBox=true;
        }
        if (this.userRole.toString() == 'ServiceShowAllForm') {
          this.serviceShowAllForm = true;
          this.userRoleName='Müşteri Hizmetleri';
          this.safetyBox=true;
        }
        if (element == 'MoneyOutputTransactionShowForm') {
          this.moneyOutputTransactionShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'CardPaymentShowForm') {
          this.cardPaymentShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'ExpenditureShowForm') {
          this.expenditureShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'FutureMoneyShowForm') {
          this.futureMoneyShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'MoneyDepositedShowForm') {
          this.moneyDepositedShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'CustomerPayShowForm') {
          this.customerPayShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'CentralPayShowForm') {
          this.centralPayShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'CancellationShowForm') {
          this.cancellationShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'MonetaryDeficitShowForm') {
          this.monetaryDeficitShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'NoteShowForm') {
          this.noteShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'CollectMoneyShowForm') {
          this.collectMoneyShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'MoneyOutputShowForm') {
          this.moneyOutputShowForm = true;
          this.safetyBox=true;
        }
        if (element == 'FutureMoneyTransactionShowForm') {
          this.futureMoneyTransactionShowForm = true;
        }
        if (element == 'IncomingMoneyShowForm') {
          this.incomingMoneyShowForm = true;
        }
        if (element == 'FutureMoneyCancellationShowForm') {
          this.futureMoneyCancellationShowForm = true;
        }
        if (element == 'ShipmentListAddShowForm') {

        this.shipmentListAddShowForm = true;
        }
        if (element == 'ShipmentAndResearchListShowForm') {
          this.shipmentAndResearchListShowForm = true;
        }
        if (element == 'ResearchListShowForm') {
          this.researchListShowForm = true;
        }
        if (element == 'ShipmentListResultShowForm') {
          this.shipmentListResultShowForm = true;
        }
        if (element == 'SatisfactionShowForm') {
          this.satisfactionShowForm = true;
        }
        if (element == 'StaffShowForm') {

        this.staffShowForm = true;
        }
        if (element == 'UserShowForm') {
          this.userShowForm = true;
        }
        if (element == 'BankShowForm') {
          this.bankShowForm = true;
        }
        if (element == 'StaffEpisodeShowForm') {
          this.staffEpisodeShowForm = true;
        }
        if (element == 'StaffTaskShowForm') {
          this.staffTaskShowForm = true;
        }
      });
    }
  }



}
