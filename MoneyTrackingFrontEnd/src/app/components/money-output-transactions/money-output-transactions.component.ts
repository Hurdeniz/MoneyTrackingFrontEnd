import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MoneyOutputTransactionsViewComponent } from './money-output-transactions-view/money-output-transactions-view.component';
import { MoneyOutputTransactionsDeleteComponent } from './money-output-transactions-delete/money-output-transactions-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MoneyOutputDetailsDto } from 'src/app/models/Dtos/moneyOutputDetailsDto';
import { MoneyOutputService } from 'src/app/services/money-output.service';
import { Moment } from 'moment';
import { GetTotalsDto } from 'src/app/models/Dtos/getTotalsDto';
import { SafeBoxService } from 'src/app/services/safe-box.service';
import { SafeBoxInformationComponent } from './safe-box-information/safe-box-information.component';
import { CardPaymentInformationComponent } from './card-payment-information/card-payment-information.component';
import { CardPaymentService } from 'src/app/services/card-payment.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { Count } from 'src/app/models/Dtos/count';
const moment = _moment;




@Component({
  selector: 'app-money-output-transactions',
  templateUrl: './money-output-transactions.component.html',
  styleUrls: ['./money-output-transactions.component.scss'],
})
export class MoneyOutputTransactionsComponent {
  jwtHelper: JwtHelperService = new JwtHelperService();
  moneyOutputDetailsDto: MoneyOutputDetailsDto[] = [];
  getTotalsDto: GetTotalsDto = {
    'totalCancellationAmount': 0,
    'totalCentralPayAmount': 0,
    'totalCustomerPayAmount': 0,
    'totalExpenditureAmount': 0,
    'totalFutureMoneyAmount': 0,
    'totalFutureMoneyCancellationAmount': 0,
    'totalIncomingMoneyAmount': 0,
    'totalMoneyDepositedAmount': 0,
    'totalMoneyOutputAmount': 0,
    'turnover': 0,
  };
  cardPaymentCountDto: Count;
  safeBoxCountDto: Count;
  safeBoxForm: FormGroup;
  totalSafeBox: number;
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  dateNow: FormControl;
  displayedColumns: string[] = [
    'date',
    'userNameSurname',
    'totalAmount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<MoneyOutputDetailsDto> =
    new MatTableDataSource<MoneyOutputDetailsDto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  day = moment().format('YYYY-MM-DD');
  isAuthenticated: boolean = false;
  userRole: string[] = [];
  add: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  list: boolean = false;
  moneyOutputAdd: boolean = false;
  totalsByDayList: boolean = false;
  cardPaymentInformation: boolean = false;
  safeBoxInformation: boolean = false;
  totalFutureMoneyCancellationAmountStatus: boolean = true;
  totalCancellationAmountStatus: boolean = true;
  totalFutureMoneyAmountStatus: boolean = true;
  totalIncomingMoneyAmountStatus:boolean=true;
  totalCentralPayAmountStatus:boolean=true;
  totalCustomerPayAmountStatus:boolean=true;
  totalMoneyDepositedAmountStatus:boolean=true;

  constructor(
    private moneyOutputService: MoneyOutputService,
    private safeBoxService: SafeBoxService,
    private cardPaymentService: CardPaymentService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );

    this.getAllMoneyOutputDetailByDay();
    this.totalsByDay();
    this.createSafeBoxForm();
    this.cardPaymentCount();
    this.safeBoxCount();
  }

  tokenAndUserControl() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let role = Object.keys(decode).filter((x) =>
        x.endsWith('/role')
      )[0];
      this.userRole = decode[role];
    }

    const arrayControl = Array.isArray(this.userRole);
    if (arrayControl == false) {
      if (this.userRole.toString() == 'Admin') {
        this.add = true;
        this.delete = true;
        this.update = true;
        this.list = true;
        this.moneyOutputAdd = true;
        this.totalsByDayList = true;
        this.cardPaymentInformation = true;
        this.safeBoxInformation = true;
      }
    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin') {
          this.add = true;
          this.delete = true;
          this.update = true;
          this.list = true;
          this.moneyOutputAdd = true;
          this.totalsByDayList = true;
          this.cardPaymentInformation = true;
          this.safeBoxInformation = true;
        }

      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalAmount() {
    return this.moneyOutputDetailsDto
      .map((t) => t.totalAmount)
      .reduce((acc, value) => acc + value, 0);
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.day = date.format('YYYY-MM-DD');
    this.getAllMoneyOutputDetailByDay();
    this.totalsByDay();
    this.cardPaymentCount();
    this.safeBoxCount();

  }

  getAllMoneyOutputDetailByDay() {
    this.moneyOutputService
      .getAllMoneyOutputDetailByDay(this.day)
      .subscribe(
        (response) => {
          this.moneyOutputDetailsDto = response.data;
          this.dataSource = new MatTableDataSource<MoneyOutputDetailsDto>(
            this.moneyOutputDetailsDto
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataLoaded = true;
        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }

  cardPaymentCount() {
    this.cardPaymentService.getCountByDate(this.day).subscribe((response) => {
      this.cardPaymentCountDto = response.data;
    })
  }

  safeBoxCount() {
    this.safeBoxService.countByDate(this.day).subscribe((response) => {
      this.safeBoxCountDto = response.data;
    })
  }

  totalsByDay() {
    this.safeBoxService
      .totalsByDay(this.day)
      .subscribe(
        (response) => {
          this.getTotalsDto = response.data;
          if (this.getTotalsDto.totalFutureMoneyCancellationAmount == 0) {
            this.totalFutureMoneyCancellationAmountStatus = false;
          }
          if (this.getTotalsDto.totalCancellationAmount == 0) {
            this.totalCancellationAmountStatus = false;
          }
          if (this.getTotalsDto.totalFutureMoneyAmount == 0) {
            this.totalFutureMoneyAmountStatus = false;
          }
          if (this.getTotalsDto.totalIncomingMoneyAmount == 0) {
            this.totalIncomingMoneyAmountStatus = false;
          }
          if (this.getTotalsDto.totalCentralPayAmount == 0) {
            this.totalCentralPayAmountStatus = false;
          }
          if (this.getTotalsDto.totalCustomerPayAmount == 0) {
            this.totalCustomerPayAmountStatus = false;
          }
          if (this.getTotalsDto.totalMoneyDepositedAmount == 0) {
            this.totalMoneyDepositedAmountStatus = false;
          }
          this.totalSafeBox = (this.getTotalsDto.totalMoneyOutputAmount + this.getTotalsDto.turnover + this.getTotalsDto.totalIncomingMoneyAmount + this.getTotalsDto.totalFutureMoneyCancellationAmount) - (this.getTotalsDto.totalCancellationAmount + this.getTotalsDto.totalFutureMoneyAmount + this.getTotalsDto.totalCentralPayAmount + this.getTotalsDto.totalCustomerPayAmount + this.getTotalsDto.totalMoneyDepositedAmount);
          this.createSafeBoxForm();

        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }

  createSafeBoxForm() {
    this.safeBoxForm = this.formBuilder.group({
      totalMoneyOutputAmount: [this.getTotalsDto.totalMoneyOutputAmount],
      totalCancellationAmount: [this.getTotalsDto.totalCancellationAmount],
      totalFutureMoneyAmount: [this.getTotalsDto.totalFutureMoneyAmount],
      totalFutureMoneyCancellationAmount: [this.getTotalsDto.totalFutureMoneyCancellationAmount],
      totalIncomingMoneyAmount: [this.getTotalsDto.totalIncomingMoneyAmount],
      totalCentralPayAmount: [this.getTotalsDto.totalCentralPayAmount],
      totalCustomerPayAmount: [this.getTotalsDto.totalCustomerPayAmount],
      totalMonetaryDepositedAmount: [this.getTotalsDto.totalMoneyDepositedAmount],
      totalSafeBoxAmount: [this.totalSafeBox],
      date: [this.day],
      description: [''],
    });

  }

  addSafeBox() {
    if (this.safeBoxForm.valid) {
      let safeBoxModel = Object.assign({}, this.safeBoxForm.value);
      this.safeBoxService.add(safeBoxModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.safeBoxForm.reset();

        },
        (responseError) => {
          if (responseError.error.ValidationErrors == undefined) {
            this.toastrService.error(responseError.error, 'Dikkat');
          } else {
            if (responseError.error.ValidationErrors.length > 0) {
              for (
                let i = 0;
                i < responseError.error.ValidationErrors.length;
                i++
              ) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }


  openAddDialog() {
    if (this.safeBoxCountDto.count > 0) {
      this.toastrService.info('Günlük Kasa Çıkışı Kayıdı Vardır. Kasa Çıkışı Ekleyemezsiniz. Önce Günlük Kasa Kaydını Silin.', 'Bilgi')
    }
    else {
    this.dialog
      .open(MoneyOutputTransactionsViewComponent, {
        width: '25%',
        data: { status: true , date:this.day},
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllMoneyOutputDetailByDay();
          this.totalsByDay();
        }
      });
    }
  }

  openEditDialog(row: any) {
    if (this.safeBoxCountDto.count > 0) {
      this.toastrService.info('Günlük Kasa Çıkışı Kayıdı Vardır.Kasa Çıkışında Düzenleme Yapamazsınız. Önce Günlük Kasa Kaydını Silin.', 'Bilgi')
    }
    else {
    this.dialog
      .open(MoneyOutputTransactionsViewComponent, {
        width: '25%',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllMoneyOutputDetailByDay();
          this.totalsByDay();
        }
      });
    }
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(MoneyOutputTransactionsDeleteComponent, {
        width: '30%',
        data: row,
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllMoneyOutputDetailByDay();
          this.totalsByDay();
        }
      });
  }

  openSafeBoxInformationDialog() {
    this.dialog
      .open(SafeBoxInformationComponent, {
        width: '500px',
        data: { getSums: this.getTotalsDto, date: this.day, totalSafeBox: this.totalSafeBox }
      })

  }

  openCardPaymentInformationDialog() {
    if (this.cardPaymentCountDto.count == 0) {
      this.toastrService.info('Kayıtlı Kredi Kartı Bilgisi Yoktur', 'Bilgi')
    }
    else {
      this.dialog
        .open(CardPaymentInformationComponent, {
          width: '300px',
          data: this.day
        });
    }
  }


  exportXlsx() {
    let element = document.getElementById('moneyOutputTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kasa Çıkışlar');
    XLSX.writeFile(wb, 'Kasa Çıkışlar.xlsx');
  }
}
