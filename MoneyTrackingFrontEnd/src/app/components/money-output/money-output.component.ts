import { Component, OnInit, ViewChild } from '@angular/core';
import { MoneyOutputDeleteComponent } from './money-output-delete/money-output-delete.component';
import { MoneyOutputViewComponent } from './money-output-view/money-output-view.component';
import { MoneyOutputFilterComponent } from './money-output-filter/money-output-filter.component';
import { AuthService } from 'src/app/services/auth.service';
import { MoneyOutputService } from 'src/app/services/money-output.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MoneyOutput } from 'src/app/models/moneyOutput';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-money-output',
  templateUrl: './money-output.component.html',
  styleUrls: ['./money-output.component.scss'],
})
export class MoneyOutputComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  moneyOutput: MoneyOutput[] = [];
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  displayedColumns: string[] = ['date', 'totalAmount', 'description', 'action'];
  dataSource: MatTableDataSource<MoneyOutput> =
    new MatTableDataSource<MoneyOutput>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  isAuthenticated: boolean = false;
  userId: number;
  userRole: string[] = [];
  add: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  list: boolean = false;

  constructor(
    private moneyOutputService: MoneyOutputService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllMoneyOutputDetailByUserIdAndDate();
  }

  tokenAndUserControl() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];
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
      if (this.userRole.toString() == 'Staff') {
        this.add = true;
        this.delete = true;
        this.update = true;
        this.list = true;
      }

    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin' || element == 'Staff') {
          this.add = true;
          this.delete = true;
          this.update = true;
          this.list = true;
        }
        if (element == 'MoneyOutput.Add') {
          this.add = true;
        }
        if (element == 'MoneyOutput.Delete') {
          this.delete = true;
        }
        if (element == 'MoneyOutput.Update') {
          this.update = true;
        }
        if (element == 'MoneyOutput.GetAllMoneyOutputDetailByUserIdAndDate') {
          this.list = true;
        }
      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalAmount() {
    return this.moneyOutput
      .map((t) => t.totalAmount)
      .reduce((acc, value) => acc + value, 0);
  }

  getAllMoneyOutputDetailByUserIdAndDate() {
    this.moneyOutputService
      .getAllMoneyOutputDetailByUserIdAndDate(
        this.userId,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (response) => {
          this.moneyOutput = response.data;
          this.dataSource = new MatTableDataSource<MoneyOutput>(
            this.moneyOutput
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
      .open(MoneyOutputViewComponent, {
        width: '400px',
        data: { status: true, userId: this.userId },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllMoneyOutputDetailByUserIdAndDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(MoneyOutputViewComponent, {
        width: '400px',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllMoneyOutputDetailByUserIdAndDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(MoneyOutputDeleteComponent, {
        width: '450px',
        data: row,
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllMoneyOutputDetailByUserIdAndDate();
        }
      });
  }
  openFilterDialog() {
    this.dialog
      .open(MoneyOutputFilterComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllMoneyOutputDetailByUserIdAndDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllMoneyOutputDetailByUserIdAndDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('moneyOutputTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kasa Çıkışlar');
    XLSX.writeFile(wb, 'Kasa Çıkışlar.xlsx');
  }
}
