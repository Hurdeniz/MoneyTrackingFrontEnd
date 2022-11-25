import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerPay } from 'src/app/models/customerPay';
import { CustomerPayService } from 'src/app/services/customer-pay.service';
import { CustomerPayDeleteComponent } from './customer-pay-delete/customer-pay-delete.component';
import { CustomerPayViewComponent } from './customer-pay-view/customer-pay-view.component';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { CustomerPayFilterComponent } from './customer-pay-filter/customer-pay-filter.component';
const moment = _moment;

@Component({
  selector: 'app-customer-pay',
  templateUrl: './customer-pay.component.html',
  styleUrls: ['./customer-pay.component.scss']
})
export class CustomerPayComponent implements OnInit {
  customerPay:CustomerPay[]=[];
  displayedColumns: string[] = [
    'date',
    'customerName',
    'amount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<CustomerPay> =
  new MatTableDataSource<CustomerPay>();
 dataLoaded = false;
 searchHide = false;
 filterText: '';
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
 endDate = moment().format('YYYY-MM-DD');
  constructor(
    private customerPayService:CustomerPayService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  this.getAllCustomerPayDetailByDate();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }

  getAllCustomerPayDetailByDate() {
    this.customerPayService.getAllCustomerPayDetailByDate(this.startDate,this.endDate).subscribe(
      (response) => {
        this.showSpinner();
        this.customerPay = response.data;
        this.hideSpinner();
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
        data: { status: true }
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
        data: { status: false, row }
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
        width: '20%',
      })
      .afterClosed()
      .subscribe((value) => {
        this.startDate = value.startDate.format('YYYY-MM-DD');
        this.endDate = value.endDate.format('YYYY-MM-DD');
        this.getAllCustomerPayDetailByDate();
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(CustomerPayDeleteComponent, {
        width: '25%',
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
