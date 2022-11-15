import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExpenditureDetailsDto } from 'src/app/models/Dtos/expenditureDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { ExpenditureDeleteComponent } from './expenditure-delete/expenditure-delete.component';
import { ExpenditureViewComponent } from './expenditure-view/expenditure-view.component';
import * as XLSX from 'xlsx';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpenditureFilterComponent } from './expenditure-filter/expenditure-filter.component';

const moment = _moment;
@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss'],
})
export class ExpenditureComponent implements OnInit {
  expenditureDetailsDto: ExpenditureDetailsDto[] = [];
  displayedColumns: string[] = ['date', 'amount', 'description', 'action'];
  dataSource: MatTableDataSource<ExpenditureDetailsDto> =
    new MatTableDataSource<ExpenditureDetailsDto>();
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
    private expenditureService:ExpenditureService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.getAllExpenditureDetailByUserIdAndDate();

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

  getAllExpenditureDetailByUserIdAndDate() {
    this.expenditureService.getAllExpenditureDetailByUserIdAndDate(this.userId,this.startDate,this.endDate).subscribe(
      (response) => {
        this.showSpinner();
        this.expenditureDetailsDto = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<ExpenditureDetailsDto>(
          this.expenditureDetailsDto
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
      .open(ExpenditureViewComponent, {
        width: '25%',
        data: { status: true, userId: this.userId },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllExpenditureDetailByUserIdAndDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(ExpenditureViewComponent, {
        width: '25%',
        data: { status: false, row }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllExpenditureDetailByUserIdAndDate();
        }
      });
  }

  openFilterDialog() {
    this.dialog
      .open(ExpenditureFilterComponent, {
        width: '20%',
      })
      .afterClosed()
      .subscribe((value) => {
        this.startDate = value.startDate.format('YYYY-MM-DD');
        this.endDate = value.endDate.format('YYYY-MM-DD');
        this.getAllExpenditureDetailByUserIdAndDate();
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(ExpenditureDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllExpenditureDetailByUserIdAndDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('expenditureTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Masraflar');

    XLSX.writeFile(wb, 'Masraf Çıkışları.xlsx');
  }




}
