import { Component, OnInit, ViewChild } from '@angular/core';
import { MoneyOutputDeleteComponent } from './money-output-delete/money-output-delete.component';
import { MoneyOutputViewComponent } from './money-output-view/money-output-view.component';
import { MoneyOutputFilterComponent } from './money-output-filter/money-output-filter.component';
import { AuthService } from 'src/app/services/auth.service';
import { MoneyOutputService } from 'src/app/services/money-output.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MoneyOutputDetailsDto } from 'src/app/models/Dtos/moneyOutputDetailsDto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-money-output',
  templateUrl: './money-output.component.html',
  styleUrls: ['./money-output.component.scss']
})
export class MoneyOutputComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  moneyOutputDetailsDto: MoneyOutputDetailsDto[] = [];
  dataLoaded = false;
  searchHide = false;
  isAuthenticated: boolean = false;
  filterText: '';
  userId: number;
  displayedColumns: string[] = ['date', 'totalAmount', 'description', 'action'];
  dataSource: MatTableDataSource<MoneyOutputDetailsDto> =
    new MatTableDataSource<MoneyOutputDetailsDto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');

  constructor(
    private moneyOutputService:MoneyOutputService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.refresh();

  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalAmount() {
    return this.moneyOutputDetailsDto.map(t => t.totalAmount).reduce((acc, value) => acc + value, 0);
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


  getAll()
  {

  }
  openAddDialog() {
    this.dialog
      .open(MoneyOutputViewComponent, {
        width: '25%',

      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {

        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(MoneyOutputViewComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {

        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(MoneyOutputDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {

        }
      });
  }
  openFilterDialog() {
    this.dialog
      .open(MoneyOutputFilterComponent, {
        width: '25%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {

        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');

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
