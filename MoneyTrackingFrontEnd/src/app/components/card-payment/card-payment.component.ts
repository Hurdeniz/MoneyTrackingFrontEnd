import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CardPaymetDetailsDto } from 'src/app/models/Dtos/cardPaymentDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { CardPaymentService } from 'src/app/services/card-payment.service';
import { CardPaymentDeleteComponent } from './card-payment-delete/card-payment-delete.component';
import { CardPaymentViewComponent } from './card-payment-view/card-payment-view.component';
import { CardPaymentFilterComponent } from './card-payment-filter/card-payment-filter.component';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss'],
})
export class CardPaymentComponent implements OnInit {
  cardPaymnetDetailsDto: CardPaymetDetailsDto[] = [];
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
  jwtHelper: JwtHelperService = new JwtHelperService();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');

  constructor(
    private cardPaymentService: CardPaymentService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.getAllCardPaymentDetailByUserIdAndDate();
  }
  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }
  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];

    }
  }
  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  getAllCardPaymentDetailByUserIdAndDate() {
    this.cardPaymentService
      .getAllCardPaymentDetailByUserIdAndDate(
        this.userId,
        this.startDate,
        this.endDate
      )
      .subscribe(
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
        data: { status: true, userId: this.userId }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllCardPaymentDetailByUserIdAndDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(CardPaymentViewComponent, {
        width: '25%',
        data: { status: false, row }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllCardPaymentDetailByUserIdAndDate();
        }
      });
  }

  openFilterDialog() {
    this.dialog
      .open(CardPaymentFilterComponent, {
        width: '20%',
      })
      .afterClosed()
      .subscribe((value) => {
        this.startDate = value.startDate.format('YYYY-MM-DD');
        this.endDate = value.endDate.format('YYYY-MM-DD');
        this.getAllCardPaymentDetailByUserIdAndDate();
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
          this.getAllCardPaymentDetailByUserIdAndDate();
        }
      });
  }

  exportXlsx() {
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cardPaymnetDetailsDto) sadece data yazdırmak istersek
    let element = document.getElementById('cardPaymentTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kart İşlemleri');

    XLSX.writeFile(wb, 'Kredi Kartı İşlemleri.xlsx');
  }





  printPage() {
    window.print();
  }
}
