import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenditureDeleteComponent } from './expenditure-delete/expenditure-delete.component';
import { ExpenditureViewComponent } from './expenditure-view/expenditure-view.component';
import { ExpenditureFilterComponent } from './expenditure-filter/expenditure-filter.component';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ExpenditureDetailsDto } from 'src/app/models/Dtos/expenditureDetailsDto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss'],
})
export class ExpenditureComponent implements OnInit {
  expenditureDetailsDto: ExpenditureDetailsDto[] = [];
  displayedColumns: string[] = ['date', 'amount', 'description', 'action'];
  dataLoaded = false;
  searchHide = false;
  isAuthenticated: boolean = false;
  filterText: '';
  userId: number;
  dataSource: MatTableDataSource<ExpenditureDetailsDto> =
    new MatTableDataSource<ExpenditureDetailsDto>();
  jwtHelper: JwtHelperService = new JwtHelperService();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');

  constructor(
    private expenditureService: ExpenditureService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.getAllExpenditureDetailByUserIdAndDate();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalCost() {
    return this.expenditureDetailsDto
      .map((t) => t.amount)
      .reduce((acc, value) => acc + value, 0);
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

  getAllExpenditureDetailByUserIdAndDate() {
    this.expenditureService
      .getAllExpenditureDetailByUserIdAndDate(
        this.userId,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (response) => {
          this.expenditureDetailsDto = response.data;
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
        data: { status: false, row },
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
        width: '25%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllExpenditureDetailByUserIdAndDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllExpenditureDetailByUserIdAndDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(ExpenditureDeleteComponent, {
        width: '30%',
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
