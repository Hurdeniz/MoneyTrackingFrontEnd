import { Component, OnInit, ViewChild } from '@angular/core';
import { FutureMoneyTransactionsDeleteComponent } from './future-money-transactions-delete/future-money-transactions-delete.component';
import { FutureMoneyTransactionsViewComponent } from './future-money-transactions-view/future-money-transactions-view.component';
import { IncomingMoneyComponent } from './incoming-money/incoming-money.component';
import { PartialIncomingMoneyComponent } from './partial-incoming-money/partial-incoming-money.component';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyDetailsDto } from 'src/app/models/Dtos/futureMoneyDetailsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-future-money-transactions',
  templateUrl: './future-money-transactions.component.html',
  styleUrls: ['./future-money-transactions.component.scss'],
})
export class FutureMoneyTransactionsComponent implements OnInit {
  futureMoneyDetailsDto: FutureMoneyDetailsDto[] = [];
  displayedColumns: string[] = [
    'userNameSurname',
    'futureMoneyRegistrationDate',
    'typeOfOperation',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'transactionAmount',
    'amountPaid',
    'futureAmount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<FutureMoneyDetailsDto> =
    new MatTableDataSource<FutureMoneyDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  status: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private futureMoneyService: FutureMoneyService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAllFutureMoneyDetailByStatus();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }
  getTotalAmountPaid() {
    return this.futureMoneyDetailsDto.map(t => t.amountPaid).reduce((acc, value) => acc + value, 0);
  }
  getTotalTransactionAmount() {
    return this.futureMoneyDetailsDto.map(t => t.transactionAmount).reduce((acc, value) => acc + value, 0);
  }
  getTotalFutureAmount() {
    return this.futureMoneyDetailsDto.map(t => t.futureAmount).reduce((acc, value) => acc + value, 0);
  }

  getAllFutureMoneyDetailByStatus() {
    this.futureMoneyService
      .getAllFutureMoneyDetailByStatus(this.status)
      .subscribe(
        (response) => {
          this.futureMoneyDetailsDto = response.data;
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
        data: { status: true },
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
        data: { status: false, row },
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
        width: '30%',
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
