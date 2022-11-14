import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CardPaymetDetailsDto } from 'src/app/models/Dtos/cardPaymentDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { CardPaymentService } from 'src/app/services/card-payment.service';
import { CardPaymentDeleteComponent } from './card-payment-delete/card-payment-delete.component';
import { CardPaymentViewComponent } from './card-payment-view/card-payment-view.component';
import * as XLSX from 'xlsx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { CardPaymentFilterComponent } from './card-payment-filter/card-payment-filter.component';

const moment = _moment;

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss'],
})
export class CardPaymentComponent implements OnInit {
  cardPaymnetDetailsDto: CardPaymetDetailsDto[] = [];
  cardForm: FormGroup;

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
  dateHide = false;
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
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.showDate();
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
      let userName = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
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
  showDate() {
    this.cardForm = this.formBuilder.group({
      startDate: [moment().subtract(7, 'days').format('YYYY-MM-DD')],
      endDate: [moment().format('YYYY-MM-DD')],
    });
  }

  showDataByDate() {
    let a: Moment = this.cardForm.get('startDate').value;
    let b: Moment = this.cardForm.get('endDate').value;
    this.startDate = a.format('YYYY-MM-DD');
    this.endDate = b.format('YYYY-MM-DD');
    this.getAllCardPaymentDetailByUserIdAndDate();
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
          console.log(this.cardPaymnetDetailsDto);
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
        data: { status: true, userId: this.userId },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllCardPaymentDetailByUserIdAndDate();
        }
      });
  }

  openEditDialog(data: any) {
    this.dialog
      .open(CardPaymentViewComponent, {
        width: '25%',
        data: { status: false, data },
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

  openDeleteDialog(data: any) {
    this.dialog
      .open(CardPaymentDeleteComponent, {
        width: '25%',
        data: data,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllCardPaymentDetailByUserIdAndDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('cardPaymentTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Kredi Kartı İşlemleri.xlsx');
  }

  printPage() {
    window.print();
  }
}
