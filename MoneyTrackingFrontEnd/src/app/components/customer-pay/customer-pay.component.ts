import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerPayViewComponent } from './customer-pay-view/customer-pay-view.component';
import { CustomerPayDeleteComponent } from './customer-pay-delete/customer-pay-delete.component';
import { CustomerPayFilterComponent } from './customer-pay-filter/customer-pay-filter.component';
import { CustomerPay } from 'src/app/models/customerPay';
import { CustomerPayService } from 'src/app/services/customer-pay.service';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private customerPayService: CustomerPayService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCustomerPayDetailByDate();
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
        width: '25%',
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
        width: '25%',
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
        width: '25%',
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
        width: '30%',
        data: row,
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
