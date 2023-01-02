import { Component, OnInit, ViewChild } from '@angular/core';
import { CentralPayViewComponent } from './central-pay-view/central-pay-view.component';
import { CentralPayDeleteComponent } from './central-pay-delete/central-pay-delete.component';
import { CentralPayFilterComponent } from './central-pay-filter/central-pay-filter.component';
import { CentralPayService } from 'src/app/services/central-pay.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CentralPay } from 'src/app/models/centralPay';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
const moment = _moment;

@Component({
  selector: 'app-central-pay',
  templateUrl: './central-pay.component.html',
  styleUrls: ['./central-pay.component.scss'],
})
export class CentralPayComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  centralPay: CentralPay[] = [];
  displayedColumns: string[] = ['date', 'amount', 'description', 'action'];
  dataSource: MatTableDataSource<CentralPay> =
    new MatTableDataSource<CentralPay>();
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
    private centralPayService: CentralPayService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllCentralPayDetailByDate();
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
        if (element == 'CentralPay.Add') {
          this.add = true;
        }
        if (element == 'CentralPay.Delete') {
          this.delete = true;
        }
        if (element == 'CentralPay.Update') {
          this.update = true;
        }
        if (element == 'CentralPay.GetAllCentralPayDetailByDate') {
          this.list = true;
        }
      })
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }
  getTotalAmount() {
    return this.centralPay.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  getAllCentralPayDetailByDate() {
    this.centralPayService
      .getAllCentralPayDetailByDate(this.startDate, this.endDate)
      .subscribe(
        (response) => {
          this.centralPay = response.data;
          this.dataSource = new MatTableDataSource<CentralPay>(this.centralPay);
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
      .open(CentralPayViewComponent, {
        width: '400px',
        data: { status: true },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllCentralPayDetailByDate();
        }
      });
  }
  openEditDialog(row: any) {
    this.dialog
      .open(CentralPayViewComponent, {
        width: '400px',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllCentralPayDetailByDate();
        }
      });
  }
  openFilterDialog() {
    this.dialog
      .open(CentralPayFilterComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllCentralPayDetailByDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllCentralPayDetailByDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(CentralPayDeleteComponent, {
        width: '450px',
        data: row,
        disableClose:true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllCentralPayDetailByDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('centralPayTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Merkez Ödemeleri');
    XLSX.writeFile(wb, 'Merkez Ödeme İşlemleri.xlsx');
  }
}
