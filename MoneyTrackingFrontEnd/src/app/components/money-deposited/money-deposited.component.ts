import { Component, OnInit, ViewChild } from '@angular/core';
import { MoneyDepositedDeleteComponent } from './money-deposited-delete/money-deposited-delete.component';
import { MoneyDepositedViewComponent } from './money-deposited-view/money-deposited-view.component';
import { MoneyDepositedFilterComponent } from './money-deposited-filter/money-deposited-filter.component';
import { MoneyDepositedService } from 'src/app/services/money-deposited.service';
import { ToastrService } from 'ngx-toastr';
import { MoneyDepositedDetailsDto } from 'src/app/models/Dtos/moneyDepositedDetailsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
const moment = _moment;

@Component({
  selector: 'app-money-deposited',
  templateUrl: './money-deposited.component.html',
  styleUrls: ['./money-deposited.component.scss'],
})
export class MoneyDepositedComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  moneyDepositedDetailsDto: MoneyDepositedDetailsDto[] = [];
  displayedColumns: string[] = [
    'date',
    'bankName',
    'amount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<MoneyDepositedDetailsDto> =
    new MatTableDataSource<MoneyDepositedDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  isAuthenticated: boolean = false;
  userRole: string[] = [];
  add: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  list: boolean = false;

  constructor(
    private moneyDepositedService: MoneyDepositedService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllMoneyDepositedDetailByDate();
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
      }
    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin') {
          this.add = true;
          this.delete = true;
          this.update = true;
          this.list = true;
        }
        if (element == 'MoneyDeposited.Add') {
          this.add = true;
        }
        if (element == 'MoneyDeposited.Delete') {
          this.delete = true;
        }
        if (element == 'MoneyDeposited.Update') {
          this.update = true;
        }
        if (element == 'MoneyDeposited.GetAllMoneyDepositedDetailByDate') {
          this.list = true;
        }
      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalAmount() {
    return this.moneyDepositedDetailsDto
      .map((t) => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }

  getAllMoneyDepositedDetailByDate() {
    this.moneyDepositedService
      .getAllMoneyDepositedDetailByDate(this.startDate, this.endDate)
      .subscribe(
        (response) => {
          this.moneyDepositedDetailsDto = response.data;
          this.dataSource = new MatTableDataSource<MoneyDepositedDetailsDto>(
            this.moneyDepositedDetailsDto
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
      .open(MoneyDepositedViewComponent, {
        width: '400px',
        data: { status: true },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllMoneyDepositedDetailByDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(MoneyDepositedViewComponent, {
        width: '400px',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllMoneyDepositedDetailByDate();
        }
      });
  }

  openFilterDialog() {
    this.dialog
      .open(MoneyDepositedFilterComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllMoneyDepositedDetailByDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllMoneyDepositedDetailByDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(MoneyDepositedDeleteComponent, {
        width: '480px',
        data: row,
        disableClose:true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllMoneyDepositedDetailByDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('moneyDepositedTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Para Yatırma');
    XLSX.writeFile(wb, 'Para Yatırma İşlemleri.xlsx');
  }
}
