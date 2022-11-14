import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MoneyOutputDetailsDto } from 'src/app/models/Dtos/moneyOutputDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { MoneyOutputService } from 'src/app/services/money-output.service';
import { MoneyOutputDeleteComponent } from './money-output-delete/money-output-delete.component';
import { MoneyOutputViewComponent } from './money-output-view/money-output-view.component';

@Component({
  selector: 'app-money-output',
  templateUrl: './money-output.component.html',
  styleUrls: ['./money-output.component.scss']
})
export class MoneyOutputComponent implements OnInit {
  moneyOutputDetailsDto: MoneyOutputDetailsDto[] = [];

  displayedColumns: string[] = ['date', 'totalAmount', 'description', 'action'];

  dataSource: MatTableDataSource<MoneyOutputDetailsDto> =
    new MatTableDataSource<MoneyOutputDetailsDto>();

  dataLoaded = false;
  searchHide = false;
  isAuthenticated: boolean = false;
  filterText: '';
  userId: number;
  date:Date = new Date();
  jwtHelper: JwtHelperService = new JwtHelperService();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private moneyOutputService:MoneyOutputService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getByMoneyOutputDate();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userName = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
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

  getByMoneyOutputDate() {
    debugger
    this.moneyOutputService.getByMoneyOutputDate(this.date).subscribe(
      (response) => {
        this.showSpinner();
        this.moneyOutputDetailsDto = response.data;
        this.hideSpinner();
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

  openAddDialog() {
    this.dialog
      .open(MoneyOutputViewComponent, {
        width: '25%',

      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getByMoneyOutputDate();
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
          this.getByMoneyOutputDate();
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
          this.getByMoneyOutputDate();
        }
      });
  }


}
