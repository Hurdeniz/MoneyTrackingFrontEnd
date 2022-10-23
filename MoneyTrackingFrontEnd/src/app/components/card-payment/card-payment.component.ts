import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Bank } from 'src/app/models/bank';
import { CardPaymetDetailsDto } from 'src/app/models/Dtos/cardPaymentDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { CardPaymentService } from 'src/app/services/card-payment.service';
import { CardPaymentDeleteComponent } from './card-payment-delete/card-payment-delete.component';
import { CardPaymentViewComponent } from './card-payment-view/card-payment-view.component';


@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit {
  cardPaymnetDetailsDto: CardPaymetDetailsDto[] = [];
  banks: Bank[] = [];

  displayedColumns: string[] = [
    'date',
    'bankName',
    'amount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<CardPaymetDetailsDto> =
  new MatTableDataSource<CardPaymetDetailsDto>();
dataLoaded = false;
searchHide = false;
isAuthenticated: boolean = false;
filterText: '';
userId: number;
userName: string;
jwtHelper: JwtHelperService = new JwtHelperService();
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(
    private cardPaymentService: CardPaymentService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getAllCardPaymnetDetailByUserId(this.userId);
  }
  filterCardPayments() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }
  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userName = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];
      this.userName = decode[userName];
    }
  }

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }

  getAllCardPaymnetDetailByUserId(userId: number) {
    this.cardPaymentService.getAllCardPaymentDetailByUserId(userId).subscribe(
      (response) => {
        this.showSpinner();
        this.cardPaymnetDetailsDto = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<CardPaymetDetailsDto>(
          this.cardPaymnetDetailsDto
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
      .open(CardPaymentViewComponent, {
        width: '25%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllCardPaymnetDetailByUserId(this.userId);
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(CardPaymentViewComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllCardPaymnetDetailByUserId(this.userId);
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(CardPaymentDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllCardPaymnetDetailByUserId(this.userId);
        }
      });
  }

}
