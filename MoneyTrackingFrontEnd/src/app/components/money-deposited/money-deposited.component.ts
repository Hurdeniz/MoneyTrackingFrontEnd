import { Component, OnInit, ViewChild } from '@angular/core';
import { MoneyDepositedDeleteComponent } from './money-deposited-delete/money-deposited-delete.component';
import { MoneyDepositedViewComponent } from './money-deposited-view/money-deposited-view.component';
import { MoneyDepositedFilterComponent } from './money-deposited-filter/money-deposited-filter.component';
import { MoneyDepositedService } from 'src/app/services/money-deposited.service';
import { ToastrService } from 'ngx-toastr';
import { MoneyDepositedDetailsDto } from 'src/app/models/Dtos/moneyDepositedDetailsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-money-deposited',
  templateUrl: './money-deposited.component.html',
  styleUrls: ['./money-deposited.component.scss'],
})
export class MoneyDepositedComponent implements OnInit {
  moneyDepositedDetailsDto: MoneyDepositedDetailsDto[] = [];
  displayedColumns: string[] = [
    'date',
    'bankName',
    'amount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<MoneyDepositedDetailsDto> =
    new MatTableDataSource<MoneyDepositedDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');

  constructor(
    private moneyDepositedService: MoneyDepositedService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllMoneyDepositedDetailByDate();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalAmount() {
    return this.moneyDepositedDetailsDto
      .map((t) => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }

  getAllMoneyDepositedDetailByDate() {
    this.moneyDepositedService
      .getAllMoneyDepositedDetailByDate(this.startDate, this.endDate)
      .subscribe(
        (response) => {
          this.moneyDepositedDetailsDto = response.data;
          this.dataSource = new MatTableDataSource<MoneyDepositedDetailsDto>(
            this.moneyDepositedDetailsDto
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
      .open(MoneyDepositedViewComponent, {
        width: '25%',
        data: { status: true },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllMoneyDepositedDetailByDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(MoneyDepositedViewComponent, {
        width: '25%',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllMoneyDepositedDetailByDate();
        }
      });
  }

  openFilterDialog() {
    this.dialog
      .open(MoneyDepositedFilterComponent, {
        width: '25%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllMoneyDepositedDetailByDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllMoneyDepositedDetailByDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(MoneyDepositedDeleteComponent, {
        width: '35%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllMoneyDepositedDetailByDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('moneyDepositedTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Para Yatırma');
    XLSX.writeFile(wb, 'Para Yatırma İşlemleri.xlsx');
  }
}
