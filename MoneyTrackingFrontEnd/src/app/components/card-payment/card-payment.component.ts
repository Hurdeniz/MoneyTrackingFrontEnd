import { Component, OnInit, ViewChild } from '@angular/core';
import { CardPaymentDeleteComponent } from './card-payment-delete/card-payment-delete.component';
import { CardPaymentViewComponent } from './card-payment-view/card-payment-view.component';
import { CardPaymentFilterComponent } from './card-payment-filter/card-payment-filter.component';
import { AuthService } from 'src/app/services/auth.service';
import { CardPaymentService } from 'src/app/services/card-payment.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CardPaymetDetailsDto } from 'src/app/models/Dtos/cardPaymentDetailsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss'],
})
export class CardPaymentComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  cardPaymnetDetailsDto: CardPaymetDetailsDto[] = [];
  dataLoaded = false;
  searchHide = false;
  isAuthenticated: boolean = false;
  userId: number;
  filterText: '';
  role: string[] = [];
  displayedColumns: string[] = [
    'date',
    'bankName',
    'amount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<CardPaymetDetailsDto> =
    new MatTableDataSource<CardPaymetDetailsDto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  add: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  list: boolean = false;



  constructor(
    private cardPaymentService: CardPaymentService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getAllCardPaymentDetailByUserIdAndDate();

  }
  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }
  getTotalAmount() {
    return this.cardPaymnetDetailsDto.map(t => t.amount).reduce((acc, value) => acc + value, 0);
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
      let rol = Object.keys(decode).filter((x) =>
        x.endsWith('/role')
      )[0];
      this.role = decode[rol];
    }

    const arrayControl = Array.isArray(this.role);
    if (arrayControl == false) {
      if (this.role.toString() == 'Admin') {
        this.add = true;
        this.delete = true;
        this.update = true;
        this.list = true;
      }
      if (this.role.toString() == 'Staff') {
        this.add = true;
        this.delete = true;
        this.update = true;
        this.list = true;
      }
    }
    else {
      this.role.forEach(element => {
        if (element == 'Admin' || element == 'Staff') {
          this.add = true;
          this.delete = true;
          this.update = true;
          this.list = true;
        }

        if (element == 'CardPayment.Add') {
          this.add = true;
        }
        if (element == 'CardPayment.Delete') {
          this.delete = true;
        }
        if (element == 'CardPayment.Update') {
          this.update = true;
        }
        if (element == 'CardPayment.GetAllCardPaymentDetailByUserIdAndDate') {
          this.list = true;
        }
      })

    }
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
          this.cardPaymnetDetailsDto = response.data;
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
        width: '400px',
        data: { status: true, userId: this.userId },
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
        width: '400px',
        data: { status: false, row },
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
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllCardPaymentDetailByUserIdAndDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllCardPaymentDetailByUserIdAndDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(CardPaymentDeleteComponent, {
        width: '450px',
        data: row,
        disableClose: true
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
    XLSX.utils.book_append_sheet(wb, ws, 'Kart İşlemleri');
    XLSX.writeFile(wb, 'Kredi Kartı İşlemleri.xlsx');
  }

}
