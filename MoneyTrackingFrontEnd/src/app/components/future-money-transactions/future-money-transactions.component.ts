import { Component, OnInit, ViewChild } from '@angular/core';
import { FutureMoneyTransactionsDeleteComponent } from './future-money-transactions-delete/future-money-transactions-delete.component';
import { FutureMoneyTransactionsViewComponent } from './future-money-transactions-view/future-money-transactions-view.component';
import { FutureMoneyCancellationComponent } from './future-money-cancellation/future-money-cancellation.component';
import { IncomingMoneyComponent } from './incoming-money/incoming-money.component';
import { PartialIncomingMoneyComponent } from './partial-incoming-money/partial-incoming-money.component';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyDetailsDto } from 'src/app/models/Dtos/futureMoneyDetailsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-future-money-transactions',
  templateUrl: './future-money-transactions.component.html',
  styleUrls: ['./future-money-transactions.component.scss'],
})
export class FutureMoneyTransactionsComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  futureMoneyDetailsDto: FutureMoneyDetailsDto[] = [];
  displayedColumns: string[] = [
    'userNameSurname',
    'futureMoneyRegistrationDate',
    'typeOfOperation',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'transactionAmount',
    'amountPaid',
    'futureAmount',
    'description',
    'actions',
  ];
  dataSource: MatTableDataSource<FutureMoneyDetailsDto> =
    new MatTableDataSource<FutureMoneyDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  status: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAuthenticated: boolean = false;
  userRole: string[] = [];
  futureMoneyAdd: boolean = false;
  futureMoneyDelete: boolean = false;
  futureMoneyUpdate: boolean = false;
  futureMoneyList: boolean = false;
  incomingMoneyAdd: boolean = false;
  partialIncomingMoneyAdd: boolean = false;

  constructor(
    private futureMoneyService: FutureMoneyService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllFutureMoneyDetailByStatus();
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
        this.futureMoneyAdd = true;
        this.futureMoneyDelete = true;
        this.futureMoneyUpdate = true;
        this.futureMoneyList = true;
        this.incomingMoneyAdd = true;
        this.partialIncomingMoneyAdd = true;
      }

    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin') {
          this.futureMoneyAdd = true;
          this.futureMoneyDelete = true;
          this.futureMoneyUpdate = true;
          this.futureMoneyList = true;
          this.incomingMoneyAdd = true;
          this.partialIncomingMoneyAdd = true;
        }
        if (element == 'FutureMoney.Add') {
          this.futureMoneyAdd = true;
        }
        if (element == 'FutureMoney.Delete') {
          this.futureMoneyDelete = true;
        }
        if (element == 'FutureMoney.Update') {
          this.futureMoneyUpdate = true;
        }
        if (element == 'FutureMoney.GetAllFutureMoneyDetailByStatus') {
          this.futureMoneyList = true;
        }
        if (element == 'IncomingMoney.Add') {
          this.incomingMoneyAdd = true;
        }
        if (element == 'IncomingMoney.PartialAdd') {
          this.partialIncomingMoneyAdd = true;
        }
      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }
  getTotalAmountPaid() {
    return this.futureMoneyDetailsDto.map(t => t.amountPaid).reduce((acc, value) => acc + value, 0);
  }
  getTotalTransactionAmount() {
    return this.futureMoneyDetailsDto.map(t => t.transactionAmount).reduce((acc, value) => acc + value, 0);
  }
  getTotalFutureAmount() {
    return this.futureMoneyDetailsDto.map(t => t.futureAmount).reduce((acc, value) => acc + value, 0);
  }

  getAllFutureMoneyDetailByStatus() {
    this.futureMoneyService
      .getAllFutureMoneyDetailByStatus(this.status)
      .subscribe(
        (response) => {
          this.futureMoneyDetailsDto = response.data;
          this.dataSource = new MatTableDataSource<FutureMoneyDetailsDto>(
            this.futureMoneyDetailsDto
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

  openAddDialog() {
    this.dialog
      .open(FutureMoneyTransactionsViewComponent, {
        width: '600px',
        data: { status: true },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(FutureMoneyTransactionsViewComponent, {
        width: '600px',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(FutureMoneyTransactionsDeleteComponent, {
        width: '500px',
        data: row,
        disableClose:true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }

  openFutureMoneyCancellationDialog(row: any) {
    this.dialog
      .open(FutureMoneyCancellationComponent, {
        width: '350px',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'futuremoneycancellation') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }


  openIncomingDialog(row: any) {
    this.dialog
      .open(IncomingMoneyComponent, {
        width: '350px',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'incoming') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }

  openPartialIncomingDialog(row: any) {
    this.dialog
      .open(PartialIncomingMoneyComponent, {
        width: '600px',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'partialincoming') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('futureMoneyTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Elden Gelecekler');
    XLSX.writeFile(wb, 'Elden Gelecek İşlemleri.xlsx');
  }
}
