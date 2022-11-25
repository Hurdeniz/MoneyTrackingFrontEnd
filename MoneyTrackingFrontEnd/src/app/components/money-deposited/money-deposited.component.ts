import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MoneyDepositedDetailsDto } from 'src/app/models/Dtos/moneyDepositedDetailsDto';
import { MoneyDepositedService } from 'src/app/services/money-deposited.service';
import { MoneyDepositedDeleteComponent } from './money-deposited-delete/money-deposited-delete.component';
import { MoneyDepositedViewComponent } from './money-deposited-view/money-deposited-view.component';
import { MoneyDepositedFilterComponent } from './money-deposited-filter/money-deposited-filter.component';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllMoneyDepositedDetailByDate();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }
  getAllMoneyDepositedDetailByDate() {
    this.moneyDepositedService
      .getAllMoneyDepositedDetailByDate(this.startDate, this.endDate)
      .subscribe(
        (response) => {
          this.showSpinner();
          this.moneyDepositedDetailsDto = response.data;
          this.hideSpinner();
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
        data: { status: true }
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
        data: { status: false, row }
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
        width: '20%',
      })
      .afterClosed()
      .subscribe((value) => {
        this.startDate = value.startDate.format('YYYY-MM-DD');
        this.endDate = value.endDate.format('YYYY-MM-DD');
        this.getAllMoneyDepositedDetailByDate();
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(MoneyDepositedDeleteComponent, {
        width: '25%',
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
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cardPaymnetDetailsDto) sadece data yazdırmak istersek
    let element = document.getElementById('moneyDepositedTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Para Yatırma');

    XLSX.writeFile(wb, 'Para Yatırma İşlemleri.xlsx');
  }
}
