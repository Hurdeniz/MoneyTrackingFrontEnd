import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyDetailsDto } from 'src/app/models/Dtos/futureMoneyDetailsDto';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { FutureMoneyTransactionsDeleteComponent } from './future-money-transactions-delete/future-money-transactions-delete.component';
import { FutureMoneyTransactionsViewComponent } from './future-money-transactions-view/future-money-transactions-view.component';
import * as XLSX from 'xlsx';
import { IncomingMoneyComponent } from './incoming-money/incoming-money.component';
import { PartialIncomingMoneyComponent } from './partial-incoming-money/partial-incoming-money.component';

@Component({
  selector: 'app-future-money-transactions',
  templateUrl: './future-money-transactions.component.html',
  styleUrls: ['./future-money-transactions.component.scss']
})
export class FutureMoneyTransactionsComponent implements OnInit {
  futureMoneyDetailsDto: FutureMoneyDetailsDto[] = [];
  displayedColumns: string[] = ['userNameSurname','futureMoneyRegistrationDate','typeOfOperation' , 'customerCode', 'customerNameSurname','promissoryNumber','transactionAmount', 'amountPaid','futureAmount','description', 'action'];
  dataSource: MatTableDataSource<FutureMoneyDetailsDto> = new MatTableDataSource<FutureMoneyDetailsDto>();
  dataLoaded = false;
  searchHide = false;

  filterText: '';

  status:boolean=true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private futureMoneyService:FutureMoneyService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllFutureMoneyDetailByStatus();
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


  getAllFutureMoneyDetailByStatus() {
    this.futureMoneyService.getAllFutureMoneyDetailByStatus(this.status).subscribe(
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
      .open(FutureMoneyTransactionsViewComponent, {
        width: '40%',
        data: { status: true }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }


  openEditDialog(row: any) {
    this.dialog
      .open(FutureMoneyTransactionsViewComponent, {
        width: '40%',
        data: { status: false, row }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }


  openDeleteDialog(row: any) {
    this.dialog
      .open(FutureMoneyTransactionsDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }

  openIncomingDialog(row: any) {
    this.dialog
      .open(IncomingMoneyComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'incoming') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }

  openPartialIncomingDialog(row: any) {
    this.dialog
      .open(PartialIncomingMoneyComponent, {
        width: '40%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'partialincoming') {
          this.getAllFutureMoneyDetailByStatus();
        }
      });
  }


  exportXlsx() {

    let element = document.getElementById('futureMoneyTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Elden Gelecekler');

    XLSX.writeFile(wb, 'Elden Gelecek İşlemleri.xlsx');
  }

}
