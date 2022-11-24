import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CancellationDetailsDto } from 'src/app/models/Dtos/cancellationDetailsDto';
import { User } from 'src/app/models/user';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CancellationService } from 'src/app/services/cancellation.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CancellationFilterComponent } from './cancellation-filter/cancellation-filter.component';
import { CancellationViewComponent } from './cancellation-view/cancellation-view.component';
import { CancellationDeleteComponent } from './cancellation-delete/cancellation-delete.component';
const moment = _moment;
@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.scss'],
})
export class CancellationComponent implements OnInit {

  cancellationDetailsDto: CancellationDetailsDto[] = [];
  cancellationForm: FormGroup;
  displayedColumns: string[] = [
    'date',
    'userNameSurname',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'transactionAmount',
    'cancellationAmount',
    'description',
    'action'
  ];

  dataSource: MatTableDataSource<CancellationDetailsDto> =
    new MatTableDataSource<CancellationDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  dateNow: FormControl;
  dateInput: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDate = moment().format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');

  constructor(
    private cancellationService: CancellationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.getAllCancellationDetailByDate();
  }
  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.startDate = date.format('YYYY-MM-DD');
    this.endDate = date.format('YYYY-MM-DD');
    this.cancellationForm.controls['date'].setValue(this.dateInput);
    this.getAllCancellationDetailByDate();
  }
  getAllCancellationDetailByDate() {
    this.cancellationService
      .getAllCancellationDetailByDate(this.startDate, this.endDate)
      .subscribe(
        (response) => {
          this.cancellationDetailsDto = response.data;
          this.dataSource = new MatTableDataSource<CancellationDetailsDto>(
            this.cancellationDetailsDto
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
      .open(CancellationViewComponent, {
        width: '25%',
        data: { status: true },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllCancellationDetailByDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(CancellationViewComponent, {
        width: '25%',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllCancellationDetailByDate();
        }
      });
  }

  openFilterDialog() {
    this.dialog
      .open(CancellationFilterComponent, {
        width: '20%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllCancellationDetailByDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllCancellationDetailByDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(CancellationDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllCancellationDetailByDate();
        }
      });
  }

  exportXlsx() {
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cardPaymnetDetailsDto) sadece data yazdırmak istersek
    let element = document.getElementById('cancellationTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'İptal İşlemleri');

    XLSX.writeFile(wb, 'İptal İşlemleri.xlsx');
  }
}
