import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MoneyOutputTransactionsViewComponent } from './money-output-transactions-view/money-output-transactions-view.component';
import { MoneyOutputTransactionsDeleteComponent } from './money-output-transactions-delete/money-output-transactions-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MoneyOutputDetailsDto } from 'src/app/models/Dtos/moneyOutputDetailsDto';
import { MoneyOutputService } from 'src/app/services/money-output.service';
import { Moment } from 'moment';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { CancellationService } from 'src/app/services/cancellation.service';
import { GetSumsDto } from 'src/app/models/Dtos/getSumsDto';
import { SafeBox } from 'src/app/models/safeBox';
import { SafeBoxService } from 'src/app/services/safe-box.service';
const moment = _moment;

@Component({
  selector: 'app-money-output-transactions',
  templateUrl: './money-output-transactions.component.html',
  styleUrls: ['./money-output-transactions.component.scss'],
})
export class MoneyOutputTransactionsComponent {
  moneyOutputDetailsDto: MoneyOutputDetailsDto[] = [];
 // getSumsDto:GetSumsDto[]= [];
  getSumsDto:GetSumsDto={
    'totalCancellationAmount':0,
    'totalCentralPayAmount':0,
    'totalCustomerPayAmount':0,
    'totalExpenditureAmount':0,
    'totalFutureMoneyAmount':0,
    'totalIncomingMoneyAmount':0,
    'totalMoneyDepositedAmount':0,
    'totalMoneyOutputAmount':0
  };

  dataLoaded = false;
  searchHide = false;
  filterText: '';
  dateNow: FormControl;
  displayedColumns: string[] = [
    'date',
    'userNameSurname',
    'totalAmount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<MoneyOutputDetailsDto> =
    new MatTableDataSource<MoneyOutputDetailsDto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  day = moment().format('YYYY-MM-DD');

 // totalCancellationAmountData:any;
  totalCancellationAmount:number;

  constructor(
    private moneyOutputService: MoneyOutputService,
    private safeBoxService:SafeBoxService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.getAllMoneyOutputDetailByDay();
    this.deneme();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalAmount() {
    return this.moneyOutputDetailsDto
      .map((t) => t.totalAmount)
      .reduce((acc, value) => acc + value, 0);
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.day = date.format('YYYY-MM-DD');
    this.getAllMoneyOutputDetailByDay();
    this.deneme();
  }



  getAllMoneyOutputDetailByDay() {
    this.moneyOutputService
      .getAllMoneyOutputDetailByDay(this.day)
      .subscribe(
        (response) => {
          this.moneyOutputDetailsDto = response.data;
          this.dataSource = new MatTableDataSource<MoneyOutputDetailsDto>(
            this.moneyOutputDetailsDto
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

  deneme() {
    this.safeBoxService
      .totalSumsByDay(this.day)
      .subscribe(
        (response) => {
this.getSumsDto=response.data;


        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }



  openAddDialog() {
    this.dialog
      .open(MoneyOutputTransactionsViewComponent, {
        width: '25%',
        data: { status: true },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllMoneyOutputDetailByDay();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(MoneyOutputTransactionsViewComponent, {
        width: '25%',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllMoneyOutputDetailByDay();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(MoneyOutputTransactionsDeleteComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllMoneyOutputDetailByDay();
        }
      });
  }


  exportXlsx() {
    let element = document.getElementById('moneyOutputTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kasa Çıkışlar');
    XLSX.writeFile(wb, 'Kasa Çıkışlar.xlsx');
  }
}
