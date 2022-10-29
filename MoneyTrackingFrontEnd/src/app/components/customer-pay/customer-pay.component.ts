import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerPay } from 'src/app/models/customerPay';
import { CustomerPayService } from 'src/app/services/customer-pay.service';
import { CustomerPayDeleteComponent } from './customer-pay-delete/customer-pay-delete.component';
import { CustomerPayViewComponent } from './customer-pay-view/customer-pay-view.component';

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
 isAuthenticated: boolean = false;
 filterText: '';
 jwtHelper: JwtHelperService = new JwtHelperService();
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  constructor(
    private customerPayService:CustomerPayService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  filterCardPayments() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }

  getAll() {
    this.customerPayService.getAll().subscribe(
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
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAll();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(CustomerPayViewComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAll();
        }
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
          this.getAll();
        }
      });
  }


}
