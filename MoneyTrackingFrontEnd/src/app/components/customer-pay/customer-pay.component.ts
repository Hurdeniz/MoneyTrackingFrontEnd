import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerPayViewComponent } from './customer-pay-view/customer-pay-view.component';
import { CustomerPayDeleteComponent } from './customer-pay-delete/customer-pay-delete.component';
import { CustomerPayFilterComponent } from './customer-pay-filter/customer-pay-filter.component';
import { CustomerPay } from 'src/app/models/customerPay';
import { CustomerPayService } from 'src/app/services/customer-pay.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-customer-pay',
  templateUrl: './customer-pay.component.html',
  styleUrls: ['./customer-pay.component.scss'],
})
export class CustomerPayComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  customerPay: CustomerPay[] = [];
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  displayedColumns: string[] = [
    'date',
    'customerName',
    'amount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<CustomerPay> =
    new MatTableDataSource<CustomerPay>();
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
    private customerPayService: CustomerPayService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllCustomerPayDetailByDate();
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
        if (element == 'CustomerPay.Add') {
          this.add = true;
        }
        if (element == 'CustomerPay.Delete') {
          this.delete = true;
        }
        if (element == 'CustomerPay.Update') {
          this.update = true;
        }
        if (element == 'CustomerPay.GetAllCustomerPayDetailByDate') {
          this.list = true;
        }
      })
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalCost() {
    return this.customerPay
      .map((t) => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }

  getAllCustomerPayDetailByDate() {
    this.customerPayService
      .getAllCustomerPayDetailByDate(this.startDate, this.endDate)
      .subscribe(
        (response) => {
          this.customerPay = response.data;
          this.dataSource = new MatTableDataSource<CustomerPay>(
            this.customerPay
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
      .open(CustomerPayViewComponent, {
        width: '400px',
        data: { status: true },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllCustomerPayDetailByDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(CustomerPayViewComponent, {
        width: '400px',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllCustomerPayDetailByDate();
        }
      });
  }

  openFilterDialog() {
    this.dialog
      .open(CustomerPayFilterComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllCustomerPayDetailByDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllCustomerPayDetailByDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(CustomerPayDeleteComponent, {
        width: '450px',
        data: row,
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllCustomerPayDetailByDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('customerPayTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Firma Ödemeleri');
    XLSX.writeFile(wb, 'Firma Ödeme İşlemleri.xlsx');
  }
}
