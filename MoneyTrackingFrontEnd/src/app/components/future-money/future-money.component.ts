import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyDetailsDto } from 'src/app/models/Dtos/futureMoneyDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { FutureMoneyDeleteComponent } from './future-money-delete/future-money-delete.component';
import { FutureMoneyViewComponent } from './future-money-view/future-money-view.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-future-money',
  templateUrl: './future-money.component.html',
  styleUrls: ['./future-money.component.scss']
})
export class FutureMoneyComponent implements OnInit {
  futureMoneyDetailsDto: FutureMoneyDetailsDto[] = [];
  displayedColumns: string[] = ['futureMoneyRegistrationDate','typeOfOperation' , 'customerCode', 'customerNameSurname','promissoryNumber','transactionAmount', 'amountPaid','futureAmount','description', 'action'];
  dataSource: MatTableDataSource<FutureMoneyDetailsDto> = new MatTableDataSource<FutureMoneyDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  isAuthenticated: boolean = false;
  filterText: '';
  userId: number;
  status:boolean=true;
  jwtHelper: JwtHelperService = new JwtHelperService();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private futureMoneyService:FutureMoneyService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getAllFutureMoneyDetailByUserIdAndStatus();
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

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }


  getAllFutureMoneyDetailByUserIdAndStatus() {
    this.futureMoneyService.getAllFutureMoneyDetailByUserIdAndStatus(this.userId,this.status).subscribe(
      (response) => {
        this.showSpinner();
        this.futureMoneyDetailsDto = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<FutureMoneyDetailsDto>(
          this.futureMoneyDetailsDto
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
      .open(FutureMoneyViewComponent, {
        width: '40%',
        data: { status: true, userId: this.userId }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllFutureMoneyDetailByUserIdAndStatus();
        }
      });
  }


  openEditDialog(row: any) {
    this.dialog
      .open(FutureMoneyViewComponent, {
        width: '40%',
        data: { status: false, row }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllFutureMoneyDetailByUserIdAndStatus();
        }
      });
  }


  openDeleteDialog(row: any) {
    this.dialog
      .open(FutureMoneyDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllFutureMoneyDetailByUserIdAndStatus();
        }
      });
  }

  exportXlsx() {
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cardPaymnetDetailsDto) sadece data yazdırmak istersek
    let element = document.getElementById('futureMoneyTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Elden Gelecekler');

    XLSX.writeFile(wb, 'Elden Gelecek İşlemleri.xlsx');
  }



}
