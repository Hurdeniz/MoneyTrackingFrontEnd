import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SafeBox } from 'src/app/models/safeBox';


import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { SafeBoxService } from 'src/app/services/safe-box.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SafeBoxDeleteComponent } from './safe-box-delete/safe-box-delete.component';
import { SafeBoxFilterComponent } from './safe-box-filter/safe-box-filter.component';
const moment = _moment;

@Component({
  selector: 'app-safe-box',
  templateUrl: './safe-box.component.html',
  styleUrls: ['./safe-box.component.scss']
})
export class SafeBoxComponent {
  jwtHelper: JwtHelperService = new JwtHelperService();
  safeBox: SafeBox[] = [];
  dataLoaded = false;
  searchHide = false;
  userId: number;
  filterText: '';
  displayedColumns: string[] = [
    'date',
    'totalSafeBoxAmount',
    'totalMoneyOutputAmount',
    'totalCancellationAmount',
    'totalFutureMoneyAmount',
    'totalFutureMoneyCancellationAmount',
    'totalIncomingMoneyAmount',
    'totalCentralPayAmount',
    'totalCustomerPayAmount',
    'totalMonetaryDepositedAmount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<SafeBox> =
    new MatTableDataSource<SafeBox>();
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
    private safeBoxService: SafeBoxService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllSafeBoxByDate();
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

    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin' ) {
          this.add = true;
          this.delete = true;
          this.update = true;
          this.list = true;
        }
        if (element == 'SafeBox.Add') {
          this.add = true;
        }
        if (element == 'SafeBox.Delete') {
          this.delete = true;
        }
        if (element == 'SafeBox.Update') {
          this.update = true;
        }
        if (element == 'SafeBox.GetAllSafeBoxByDate') {
          this.list = true;
        }
      });
    }
  }

  getAllSafeBoxByDate() {
    this.safeBoxService
      .getAllSafeBoxByDate(
        this.startDate,
        this.endDate
      )
      .subscribe(
        (response) => {
          this.safeBox = response.data;
          this.dataSource = new MatTableDataSource<SafeBox>(
            this.safeBox
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

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getSafeBoxAmountTotals(){
    return this.safeBox.map(t => t.totalSafeBoxAmount).reduce((acc, value) => acc + value, 0);
  }

  getTotalMoneyOutputAmount() {
   return this.safeBox.map(t => t.totalMoneyOutputAmount).reduce((acc, value) => acc + value, 0);
  }

  getCancellationAmountTotals(){
    return this.safeBox.map(t => t.totalCancellationAmount).reduce((acc, value) => acc + value, 0);
  }

  getFutureMoneyAmountTotals(){
    return this.safeBox.map(t => t.totalFutureMoneyAmount).reduce((acc, value) => acc + value, 0);
  }

  getFutureMoneyCancellationAmountTotals(){
    return this.safeBox.map(t => t.totalFutureMoneyCancellationAmount).reduce((acc, value) => acc + value, 0);
  }

  getIncomingMoneyAmountTotals(){
   return this.safeBox.map(t => t.totalIncomingMoneyAmount).reduce((acc, value) => acc + value, 0);
  }

  getCentralPayAmountTotals(){
    return this.safeBox.map(t => t.totalCentralPayAmount).reduce((acc, value) => acc + value, 0);
   }

  getCustomerPayAmountTotals(){
    return this.safeBox.map(t => t.totalCustomerPayAmount).reduce((acc, value) => acc + value, 0);
  }

  getMonetaryDepositedAmountTotals(){
    return this.safeBox.map(t => t.totalMonetaryDepositedAmount).reduce((acc, value) => acc + value, 0);
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(SafeBoxDeleteComponent, {
        width: '450px',
        data: row,
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllSafeBoxByDate();
        }
      });
  }

  openFilterDialog() {
    this.dialog
      .open(SafeBoxFilterComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllSafeBoxByDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllSafeBoxByDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('safeBoxTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Günlük Kasa Rapor');
    XLSX.writeFile(wb, 'Günlük Kasa Rapor.xlsx');
  }



}
